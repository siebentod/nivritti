'use client';

import { useState } from 'react';
import { experimental_useFormState as useFormState } from 'react-dom';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import Link from 'next/link';

import { login, signInWithOAuth } from '@/app/_lib/actions';
import GoogleButton from './GoogleButton';
import GithubButton from './GithubButton';
import BackButton from './BackButton';
import Or from './Or';

const initialState = {
  message: '',
};

function SigninForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(login, initialState);

  const handleOAth = async (provider) => {
    setIsSubmitting(true);
    const { error } = await signInWithOAuth(provider);
    if (error) setIsSubmitting(false);
  };

  return (
    <>
      <main className="mx-auto w-min">
        <div className="mt-4 py-5 px-6 bg-zinc-800 border border-zinc-700 rounded-lg">
          <h1 className="text-3xl tracking-[-0.16px] text-zinc-50 font-bold mb-3.5 text-center">
            Sign In
          </h1>

          <form onSubmit={() => setIsSubmitting(true)}>
            <div className="mb-4 space-y-2">
              <label htmlFor="email" className="text-sm text-zinc-100">
                Email
              </label>
              <input
                className="auth-input"
                type="email"
                name="email"
                id="email"
                placeholder="user@example.com"
                autoFocus
                required
                disabled={isSubmitting || pending}
              />
            </div>
            <div className="mb-6 space-y-2">
              <label htmlFor="password" className="text-sm text-zinc-100">
                Password
              </label>
              <input
                className="auth-input"
                type="password"
                id="password"
                name="password"
                placeholder="••••••••••••"
                required
                disabled={isSubmitting || pending}
              />
            </div>
            {state}
            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting || pending}
              formAction={formAction}
            >
              <span className="inline-flex items-center justify-center visible gap-1 truncate">
                Login
              </span>
            </button>
            <Or />
          </form>
          <div className="flex flex-col items-center gap-4 mb-4 sm:flex-row">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOAth('github');
              }}
              className="w-full"
            >
              <GithubButton isSubmitting={isSubmitting || pending}>
                Sign in with Github
              </GithubButton>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOAth('google');
              }}
              className="w-full"
            >
              <GoogleButton isSubmitting={isSubmitting || pending}>
                Sign in with Google
              </GoogleButton>
            </form>
          </div>
          <div className="mt-4 text-center text-zinc-300">
            Doesn&apos;t have an account?{' '}
            <Link className="text-zinc-100 hover:text-zinc-200" href="/signup">
              Register
            </Link>
          </div>
        </div>
      </main>
      <BackButton />
    </>
  );
}

export default SigninForm;