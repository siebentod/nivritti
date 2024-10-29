function LoggedAs({ data }) {
  let provider;
  if (data.user.app_metadata.provider)
    provider = data.user.app_metadata.provider;
  provider = provider[0].toUpperCase() + provider.slice(1);

  let username;
  if (data.user.user_metadata.user_name)
    username = data.user.user_metadata.user_name;
  let email;
  if (data.user.email) email = data.user.email;
  let fullName;
  if (data.user.user_metadata.name) fullName = data.user.user_metadata.name;

  return (
    <div>
      Logged as{' '}
      {username && provider === 'Email' ? (
        <span>
          <span className="text-yellow">{username}</span>
        </span>
      ) : username && provider ? (
        <span>
          <span className="text-yellow">{username}</span> ({provider})
        </span>
      ) : fullName ? (
        <span>
          <span className="text-yellow">{fullName}</span> ({provider})
        </span>
      ) : email ? (
        <span className="text-yellow">{email}</span>
      ) : (
        ''
      )}
    </div>
  );
}

export default LoggedAs;
