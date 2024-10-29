'use client';

import Link from 'next/link';
import GithubButton from './GithubButton';
import Or from './Or';
import BackButton from './BackButton';
import GoogleButton from './GoogleButton';
import { useForm } from 'react-hook-form';
import { signup } from '@/app/_lib/actions';
import { signInWithOAuth } from '@/app/_lib/actions';
import Cookies from 'js-cookie';

function SignupForm() {
  const {
    register,
    formState: { isSubmitting, errors },
    getValues,
    handleSubmit,
  } = useForm();
  console.log('isSubmitting', isSubmitting);

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-секундная задержка
    await signup(data);
    // if (error) {
    //   setError('root', {
    //     message: error.message,
    //   });
    // }
  };

  const handleOAth = async (provider) => {
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
      if (cookieName.includes('auth-token-code-verifier'))
        Cookies.remove(cookieName);
    }
    await signInWithOAuth(provider);
  };

  return (
    <>
      <main className="mx-auto w-min">
        <div className="mt-2.5 pt-3 pb-2.5 px-6 bg-zinc-800 border border-zinc-700 rounded-lg">
          <h1 className="text-3xl tracking-[-0.16px] text-zinc-50 font-bold mb-3 text-center">
            Sign Up
          </h1>

          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 space-y-1">
              <label htmlFor="username" className="text-sm text-zinc-100">
                Username
              </label>
              <input
                className="auth-input"
                type="username"
                id="username"
                placeholder="user"
                disabled={isSubmitting}
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username needs a minimum of 3 characters',
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-2 space-y-1">
              <label htmlFor="email" className="text-sm text-zinc-100">
                Email
              </label>
              <input
                className="auth-input"
                type="email"
                id="email"
                placeholder="user@example.com"
                disabled={isSubmitting}
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please provide a valid email address',
                  },
                })}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-2 space-y-1">
              <label htmlFor="password" className="text-sm text-zinc-100">
                Password
              </label>
              <input
                className="auth-input"
                type="password"
                id="password"
                placeholder="••••••••••••"
                disabled={isSubmitting}
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Password needs a minimum of 8 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-2.5 space-y-1">
              <label htmlFor="password" className="text-sm text-zinc-100">
                Confirm Password
              </label>
              <input
                className="auth-input"
                type="password"
                id="passwordConfirm"
                placeholder="••••••••••••"
                disabled={isSubmitting}
                {...register('passwordConfirm', {
                  required: 'This field is required',
                  validate: (value) =>
                    value === getValues().password || 'Passwords need to match',
                })}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting}
            >
              <span className="inline-flex items-center justify-center visible gap-1 truncate">
                {isSubmitting ? 'Signing up...' : 'Register'}
              </span>
            </button>
            <Or />
          </form>
          <div className="flex flex-col items-center gap-4 mb-3 sm:flex-row">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOAth('github');
              }}
              className="w-full"
            >
              <GithubButton isSubmitting={isSubmitting}>
                Sign up with GitHub
              </GithubButton>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOAth('google');
              }}
              className="w-full"
            >
              <GoogleButton isSubmitting={isSubmitting}>
                Sign up with Google
              </GoogleButton>
            </form>
          </div>
          <div className="text-center text-zinc-300">
            Already have an account?{' '}
            <Link className="text-zinc-100 hover:text-zinc-200" href="/signin">
              Login
            </Link>
          </div>
        </div>
      </main>
      <BackButton />
    </>
  );
}

export default SignupForm;
