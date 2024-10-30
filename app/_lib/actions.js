'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '../_lib/supabase/server';
import {
  updateData as apiUpdateData,
  getData as apiGetData,
  moveDataFromCookiesAfterRegistration as apiMoveDataFromCookiesAfterRegistration,
  signInWithOAuth as apiSignInWithOAuth,
  clearData as apiClearData,
  getUser as apiGetUser,
} from './apiSupabase';

export async function getUser() {
  const { data, error } = await apiGetUser();
  return { data, error };
}

export async function login(formData) {
  const supabase = await createClient();

  // you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect('/?login=error');
  }
  revalidatePath('/', 'layout');
  redirect('/?login=success');
}

export async function signup(formData) {
  const supabase = await createClient();

  const userData = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        user_name: formData.username,
      },
    },
  };

  const { error } = await supabase.auth.signUp(userData);

  if (error) {
    console.log('error', error);
    revalidatePath('/', 'layout');
    redirect('/?registration=error');
  } else {
    revalidatePath('/', 'layout');
    redirect('/?registration=email-sent');
  }
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function getData(user_id) {
  // console.log('action init', user_id);
  const { singulars, totals } = await apiGetData(user_id);
  // console.log('action end', user_id);
  return { singulars, totals };
}

export async function updateData(mins, user_id) {
  const { singulars, totals, streak, activity } = await apiUpdateData(
    mins,
    user_id
  );
  return { singulars, totals, streak, activity };
}

export async function clearData(user_id) {
  return await apiClearData(user_id);
}

export async function moveDataFromCookiesAfterRegistration(
  totals,
  singulars,
  user_id
) {
  console.log('test action');
  const { totalsError, singularsError } =
    await apiMoveDataFromCookiesAfterRegistration(totals, singulars, user_id);
  return { totalsError, singularsError };
}

export async function signInWithOAuth(provider) {
  return await apiSignInWithOAuth(provider);
}
