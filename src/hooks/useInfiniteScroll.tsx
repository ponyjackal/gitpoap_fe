import { useRef, useCallback } from 'react';

export const useInfiniteScroll = (callback: (() => void) | null, isFetching: boolean) => {
  // Here we use useRef to store a DOM node and the returned object will persist regardless of re-renders
  const observer = useRef<IntersectionObserver>();

  // useCallback takes a callback argument and an array dependency list and returns a memoized callback
  // which is guaranteed to have the same reference
  const loadingZone = useCallback(
    (node: Element | null) => {
      if (!callback || isFetching) return;

      // stop watching targets, you can think of it as a reset
      if (observer.current) observer.current.disconnect();

      // create a new intersection observer and execute the callback incase of an intersecting event
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });

      // If there is a node, let the intersection observer watch that node
      if (node) observer.current.observe(node);
    },
    [callback, isFetching],
  );

  // Return reference to the last element
  return [loadingZone];
};
