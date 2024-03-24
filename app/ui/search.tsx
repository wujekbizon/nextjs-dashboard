'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  /*
    How Debouncing Works:

    Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, 
    a timer starts.
    Wait: If a new event occurs before the timer expires, the timer is reset.
    Execution: If the timer reaches the end of its countdown, the debounced function is executed.
  */

  const handleSearch = useDebouncedCallback((term: string) => {
    /*
      URLSearchParams is a Web API that provides utility methods for manipulating 
      the URL query parameters. Instead of creating a complex string literal, 
      you can use it to get the params string like ?page=1&query=a.
    */
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {/* defaultValue vs. value / Controlled vs. Uncontrolled If you're using
      state to manage the value of an input, you'd use the value attribute to
      make it a controlled component. This means React would manage the input's
      state. However, since you're not using state, you can use defaultValue.
      This means the native input will manage its own state. This is okay since
      you're saving the search query to the URL instead of state. 
      */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
