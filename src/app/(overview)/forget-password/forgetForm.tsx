"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const ForgetForm: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/');
  }
 
  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password. 
  // Upon successful reset, the user will be 
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          // Set the active session to 
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage);
      });
  }


  return (
      <form 
        onSubmit={!successfulCreation ? create : reset } 
        className="flex flex-col items-stretch space-y-8 bg-white p-5 rounded-xl w-full max-w-lg"
      >

    {!successfulCreation && (
      <>
        <label htmlFor='email'>Please provide your email address</label>
        <Input
          type='email'
          placeholder='e.g john@doe.com'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Send password reset code
        </Button>
          {error && <p>{error}</p>}
      </>
    )}

    {successfulCreation && (
      <>
        <label htmlFor='password'>Enter your new password</label>
        <Input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label htmlFor='password'>Enter the password reset code that was sent to your email</label>
        <Input
          type='text'
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <Button type="reset">Reset</Button>
        {error && <p>{error}</p>}
        </>
      )}  
      {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
      </form>
  )
}

export default ForgetForm