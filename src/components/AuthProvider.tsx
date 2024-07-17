"use client";

import { ClerkProvider } from '@clerk/nextjs';
import { HTMLAttributes } from 'react';

export default function AuthProvider({ children }: HTMLAttributes<HTMLElement>) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}