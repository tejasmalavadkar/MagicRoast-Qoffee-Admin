import { useCallback, useRef, useEffect, useState } from 'react';

// Custom hook for debouncing function calls
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// Custom hook for throttling function calls
export function useThrottle(callback, delay) {
  const lastExecTime = useRef(0);
  const timeoutRef = useRef(null);

  const throttledCallback = useCallback((...args) => {
    const now = Date.now();
    
    if (now - lastExecTime.current >= delay) {
      lastExecTime.current = now;
      callback(...args);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        lastExecTime.current = Date.now();
        callback(...args);
      }, delay - (now - lastExecTime.current));
    }
  }, [callback, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

// Custom hook for lazy loading images
export function useLazyLoading() {
  const observerRef = useRef(null);

  const lazyLoad = useCallback((imageElement) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observerRef.current.unobserve(img);
          }
        });
      });
    }
    
    if (imageElement) {
      observerRef.current.observe(imageElement);
    }
  }, []);

  return lazyLoad;
}

// Custom hook for measuring component render performance
export function useRenderPerformance(componentName) {
  const renderCount = useRef(0);
  const startTime = useRef(null);

  useEffect(() => {
    if (startTime.current === null) {
      startTime.current = Date.now();
    }
    
    renderCount.current += 1;
    const currentTime = Date.now();
    const renderTime = currentTime - startTime.current;
    
    if (import.meta.env.DEV) {
      console.log(`[${componentName}] Render #${renderCount.current} - ${renderTime}ms`);
    }
    
    startTime.current = currentTime;
  });

  return renderCount.current;
}

// Custom hook for preventing unnecessary re-renders
export function useStableCallback(callback) {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

// Custom hook for efficient state updates with batching
export function useStateWithBatching(initialState) {
  const [state, setState] = useState(initialState);
  const batchedUpdates = useRef([]);
  const timeoutRef = useRef(null);

  const updateState = useCallback((updater) => {
    batchedUpdates.current.push(updater);
    
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setState(prevState => {
          let newState = prevState;
          batchedUpdates.current.forEach(updater => {
            newState = typeof updater === 'function' ? updater(newState) : updater;
          });
          return newState;
        });
        
        batchedUpdates.current = [];
        timeoutRef.current = null;
      }, 0);
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [state, updateState];
}