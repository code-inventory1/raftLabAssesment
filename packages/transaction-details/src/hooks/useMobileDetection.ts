import { useState, useEffect } from 'react';

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const screenWidth = window.innerWidth;

      // Multiple detection methods
      const mobileUserAgentRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
      const isMobileUserAgent = mobileUserAgentRegex.test(userAgent);
      const isSmallScreen = screenWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Final determination
      const detectedMobile = isMobileUserAgent || (isSmallScreen && isTouchDevice);

      console.log('🔍 Mobile Detection:', {
        userAgent: userAgent.substring(0, 50),
        screenWidth,
        isMobileUserAgent,
        isSmallScreen,
        isTouchDevice,
        detectedMobile
      });

      setIsMobile(detectedMobile);
    };

    detectMobile();

    // Re-detect on window resize
    const handleResize = () => detectMobile();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};