import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';
import { arrayOfZeros, isLeapYear } from '../_utils/arrayOfZeros';
import { headers } from 'next/headers';

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

export async function signInWithOAuth(provider) {
  const origin = (await headers().get('origin')) + '/auth/callback';
  // const origin = 'http://localhost:3000/auth/callback';

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: origin,
    },
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  } else {
    return redirect(data.url);
  }
}

// export async function getUser(email) {
//   const { data } = await supabase
//     .from('users')
//     .select('*')
//     .eq('email', email)
//     .single();

//   // if no user, handle in the sign-in callback
//   return data;
// }

// export async function createUser(newUser) {
//   const { data, error } = await supabase.from('users').insert([newUser]);

//   if (error) {
//     console.log(error);
//     throw new Error('User could not be created');
//   }
//   return data;
// }

export async function updateData(mins, user_id) {
  const supabase = await createClient();
  // #combine (get totals + increment streak) + get singulars
  let [
    { data: totals, error: totalsError },
    { data: singulars, error: singularsError },
  ] = await Promise.all([
    supabase.rpc('increment_streak_and_update_totals', {
      user_id,
      mins,
    }),
    supabase.rpc('insert_singular', { user_id, mins }),
  ]);
  if (totalsError) {
    console.log(totalsError);
    throw new Error('Totals Update Error');
  }
  if (singularsError) {
    console.log(singularsError);
    throw new Error('Singulars Update Error');
  }
  totals = totals[0];
  const streak = totals?.streak;
  const activity = isLeapYear ? totals.activity_leap : totals.activity;
  console.log('api-activity', activity.length);

  // console.log('totals', totals);
  return { singulars, totals, streak, activity };
}

export async function moveDataFromCookiesAfterRegistration(
  totals,
  singulars,
  user_id
) {
  console.log('test api supabase');
  const supabase = await createClient();
  // The Check!
  let cookiesWereTransferred = false;
  const { data, error } = await supabase
    .from('totals')
    .insert({ cookies_transferred: true, total_mins: 0, total_count: 0 })
    .eq('user_id', user_id)
    .select();
  if (error) {
    console.error('Cookies will not be transferred', error);
    return { totalsError: error, singularsError: error };
  } else {
    cookiesWereTransferred = true;
    console.log('Cookies were transferred!', data);
  }

  let totalsError;
  let singularsError;
  if (totals) {
    const { error } = await supabase
      .from('totals')
      .update(totals)
      .eq('user_id', user_id);
    if (error) {
      console.error(error);
      totalsError = error;
      throw new Error('Totals Error');
    }
  }

  if (singulars) {
    const { error } = await supabase
      .from('singulars')
      .upsert(singulars)
      .eq('user_id', user_id);
    if (error) {
      console.error(error);
      singularsError = error;
      throw new Error('Singulars Error');
    }
  }
  return {
    totals,
    singulars,
    totalsError,
    singularsError,
    cookiesWereTransferred,
  };
}

export async function getData(user_id) {
  const supabase = await createClient();
  console.log('start getData');
  console.log('user_id', user_id);
  const [
    { data: singulars, error: singularsError },
    { data: totals, error: totalsError },
  ] = await Promise.all([
    supabase.from('singulars').select('*').eq('user_id', user_id),
    supabase.from('totals').select('*').eq('user_id', user_id),
  ]);
  console.log('1');
  // if (!singulars && !totals) await updateTotal(0, user_id);
  // console.log(singulars, totals);

  if (singularsError || totalsError) {
    console.error(singularsError || totalsError);
    throw new Error('Data could not be retrieved');
  }

  return { singulars, totals };
}

export async function clearData(user_id) {
  const supabase = await createClient();
  console.log('arr', arrayOfZeros.length);
  const data = await Promise.all([
    supabase.from('singulars').delete().eq('user_id', user_id),
    supabase
      .from('totals')
      .update({
        total_mins: 0,
        total_count: 0,
        streak: 0,
        last_time: null,
        activity_leap: arrayOfZeros, // todo проверка leap
      })
      .eq('user_id', user_id),
  ]);
  console.log('data', data);
  return data;
}

export async function OLDupdateData(mins, user_id) {
  const supabase = await createClient();
  const her = await supabase
    .from('singulars')
    .insert({ mins, user_id })
    .select('*')
    .eq('user_id', user_id);

  console.log('her', her);

  // #combine (get totals + increment streak) + get singulars
  let [
    {
      data: [getData],
      error: streakError,
    },
    { data: singulars, error: postSingularError },
  ] = await Promise.all([
    supabase.rpc('increment_streak', {
      user_id,
    }),
    supabase.from('singulars').select('*').eq('user_id', user_id),
  ]);
  if (postSingularError) {
    console.log(postSingularError);
    throw new Error('Post Singular Error');
  }
  if (streakError) {
    console.log('Ошибка при увеличении streak:', streakError);
    throw new Error('Get Totals Error');
  }
  const streak = getData?.streak;

  // #if totals has data, increase total_mins and increment total_count
  if (!isNaN(getData?.total_mins) && !isNaN(getData?.total_count)) {
    const newTotalMins = getData.total_mins + mins;
    const newTotalCount = getData.total_count + 1;
    // console.log(newTotalMins, newTotalCount);
    let { data: totals, error } = await supabase
      .from('totals')
      .update({ total_mins: newTotalMins, total_count: newTotalCount })
      .eq('user_id', user_id)
      .select();
    if (error) {
      console.error(error);
      throw new Error('Totals Error');
    }
    // console.log('totals', totals);
    totals = totals[0];
    return { singulars, totals, streak };
    // if
  } else {
    let { data: totals, error } = await supabase
      .from('totals')
      .insert([{ total_mins: mins, total_count: 1 }])
      .select();
    if (error) {
      console.error(error);
      throw new Error('Totals Error');
    }
    totals = totals[0];

    // console.log('totals', totals);
    return { singulars, totals, streak };
  }
}
