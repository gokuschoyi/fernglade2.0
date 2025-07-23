import { useRef, useEffect, useState } from 'react';
import { LumaSplatsThree } from '@lumaai/luma-web';
import { LUMA_MODEL_SOURCE } from '../constants';

type CacheEntry = {
  model: LumaSplatsThree;
  loadPromise: Promise<LumaSplatsThree>;
};

// Global cache for loaded Luma models
const lumaModelCache = new Map<string, CacheEntry>();

export const useLumaModel = (onProgress: (progress: number) => void, onLoaded: () => void) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<Error | null>(null)
  // const modelRef = useRef<LumaSplatsThree | null>(null)

  const [model, setModel] = useState<LumaSplatsThree | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const onProgressRef = useRef(onProgress);
  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onLoadedRef.current = onLoaded;
  }, [onProgress, onLoaded]);

  useEffect(() => {
    let splats: LumaSplatsThree;
    let isCancelled = false;

    const loadModel = async () => {
      setError(null);

      // Check cache first
      const cached = lumaModelCache.get(LUMA_MODEL_SOURCE);
      if (cached) {
        // console.log('Using cached Luma model')
        const cached = lumaModelCache.get(LUMA_MODEL_SOURCE)!;
        setModel(cached.model);
        onLoadedRef.current();
        onProgressRef.current(1);
        return;
      }
      onProgressRef.current(0);
      // Create new model instance
      splats = new LumaSplatsThree({
        source: LUMA_MODEL_SOURCE,
        // loadingAnimationEnabled: true,
        // particleRevealEnabled: true,
        enableThreeShaderIntegration: false,
      });

      // Create load promise
      const loadPromise = new Promise<LumaSplatsThree>((resolve) => {
        splats.onLoad = (splats) => {
          if (!isCancelled) {
            setModel(splats);
            onLoadedRef.current();
            onProgressRef.current(1);
            resolve(splats);
          }
        };

        splats.onProgress = (e) => {
          if (!isCancelled) {
            onProgressRef.current(e.progress);
          }
        };

        splats.onInitialCameraTransform = (transform) => {
          console.log('Initial camera transform:', transform);
          // console.log('Initial camera transform:', transform);
        };
      });

      // Cache the model and promise
      lumaModelCache.set(LUMA_MODEL_SOURCE, { model: splats, loadPromise });

      try {
        await loadPromise;
      } catch (err) {
        console.error('Error during model load:', err);
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load model'));
        }
      }
    };

    loadModel();

    // Cleanup function to handle component unmount
    // and prevent memory leaks
    return () => {
      isCancelled = true;
      // The model is cached globally, so we don't dispose it on component unmount
      // to keep it available for other components or remounts.
      // If true component-level lifecycle is needed, disposal logic would go here.
    };
  }, [LUMA_MODEL_SOURCE]);

  return {
    model,
    error,
  };
};
