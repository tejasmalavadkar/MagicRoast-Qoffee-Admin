import { useCallback, useRef, useEffect } from 'react';

// Hook for lazy loading images with Intersection Observer
export function useImageLazyLoading() {
  const imageRefs = useRef(new Map());

  const observeImage = useCallback((element, src) => {
    if (!element || !src) return;

    // Store the src in data attribute
    element.dataset.src = src;
    element.classList.add('lazy');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px' // Load images 50px before they come into view
    });

    observer.observe(element);
    imageRefs.current.set(element, observer);
  }, []);

  const unobserveImage = useCallback((element) => {
    if (imageRefs.current.has(element)) {
      const observer = imageRefs.current.get(element);
      observer.unobserve(element);
      imageRefs.current.delete(element);
    }
  }, []);

  // Cleanup function
  useEffect(() => {
    return () => {
      imageRefs.current.forEach((observer, element) => {
        observer.unobserve(element);
      });
      imageRefs.current.clear();
    };
  }, []);

  return { observeImage, unobserveImage };
}

// Hook for lazy loading components
export function useComponentLazyLoading() {
  const componentRefs = useRef(new Map());

  const observeComponent = useCallback((element, callback) => {
    if (!element || typeof callback !== 'function') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of element is visible
    });

    observer.observe(element);
    componentRefs.current.set(element, observer);
  }, []);

  const unobserveComponent = useCallback((element) => {
    if (componentRefs.current.has(element)) {
      const observer = componentRefs.current.get(element);
      observer.unobserve(element);
      componentRefs.current.delete(element);
    }
  }, []);

  // Cleanup function
  useEffect(() => {
    return () => {
      componentRefs.current.forEach((observer, element) => {
        observer.unobserve(element);
      });
      componentRefs.current.clear();
    };
  }, []);

  return { observeComponent, unobserveComponent };
}

// CSS for lazy loading images
export const lazyImageCSS = `
  .lazy {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  
  .lazy-loaded {
    opacity: 1;
  }
  
  img[data-src] {
    background-color: #f3f4f6;
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// Usage example component
export function LazyImage({ src, alt, className = '', ...props }) {
  const { observeImage } = useImageLazyLoading();
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && src) {
      observeImage(imgRef.current, src);
    }
  }, [src, observeImage]);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={`lazy ${className}`}
      {...props}
    />
  );
}