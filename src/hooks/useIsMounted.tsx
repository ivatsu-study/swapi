import { useEffect, useRef } from 'react';

/**
 * Custom hook which detects component mount
 * @return {Object} isMounted
 */

interface MountType {
  current: boolean,
}

const useIsMounted = (): MountType => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

export default useIsMounted;
