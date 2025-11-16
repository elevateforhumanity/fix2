/**
 * ARIA Live Region Component
 * For screen reader announcements
 */

import { useEffect, useState } from 'react';

interface LiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive' | 'off';
  clearAfter?: number;
}

export default function LiveRegion({
  message,
  politeness = 'polite',
  clearAfter = 5000,
}: LiveRegionProps) {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);

    if (clearAfter > 0) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);

      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  );
}

/**
 * Hook for managing live region announcements
 */
export function useLiveRegion() {
  const [message, setMessage] = useState('');
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>(
    'polite'
  );

  const announce = (text: string, level: 'polite' | 'assertive' = 'polite') => {
    setPoliteness(level);
    setMessage(text);
  };

  return {
    message,
    politeness,
    announce,
    LiveRegion: () => <LiveRegion message={message} politeness={politeness} />,
  };
}
