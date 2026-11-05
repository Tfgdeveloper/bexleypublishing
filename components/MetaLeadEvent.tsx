'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
} 

export default function MetaLeadEvent() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    const track = () => {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
        fired.current = true;
        return true;
      }
      return false;
    };

    if (track()) return;

    // Agar pixel script abhi load nahi hua (direct page load), thodi der retry karein
    const interval = setInterval(() => {
      if (track()) clearInterval(interval);
    }, 300);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}