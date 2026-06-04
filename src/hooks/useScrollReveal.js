import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}, dependencies = []) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    // Observe the element and all children with .reveal class
    const revealElements = element.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    if (element.classList.contains('reveal')) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, ...dependencies]);

  return ref;
}
