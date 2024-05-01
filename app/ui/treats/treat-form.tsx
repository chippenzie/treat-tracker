'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createTreat } from '@/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = {message: '', errors: {}}
  const [state, dispatch] = useFormState(createTreat, initialState);

  return (
    <form action={dispatch} >
      <div className="rounded-md p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter treat name"
                aria-describedby='name-error'
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name && state.errors?.name.map((error: string) => (
                <p className='mt-2 texst-sm text-red-500' key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Period
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="period"
                name="period"
                type="number"
                placeholder="Enter period"
                aria-describedby='period-error'
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div id="period-error" aria-live="polite" aria-atomic="true">
              {state.errors?.period && state.errors?.period.map((error: string) => (
                <p className='mt-2 texst-sm text-red-500' key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit">Create Treat</Button>
        <div id="form-error" aria-live='polite' aria-atomic='true'>
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        </div>
      </div>
    </form>
  );
}
