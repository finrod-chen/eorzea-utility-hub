import { useEffect, useRef } from 'react';

interface KoFiWidgetProps {
  className?: string;
}

export default function KoFiWidget({ className = '' }: KoFiWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (typeof kofiwidget2 !== 'undefined' && containerRef.current) {
        kofiwidget2.init('請我喝杯咖啡！', '#181729', 'J3J71YZHHS');
        kofiwidget2.draw();
      }
    };
    document.head.appendChild(script);

    return () => {
      // cleanup on unmount
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`kofiwidget2 ${className}`}
      style={{ display: 'inline-block' }}
    />
  );
}
