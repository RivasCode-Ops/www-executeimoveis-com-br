import { useRef, useState, useEffect, ReactNode } from 'react';

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  className?: string;
  threshold?: number;
}

export default function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  className = '',
  threshold = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getInitialTransform = (): string => {
    switch (direction) {
      case 'up':    return `translateY(${distance}px)`;
      case 'down':  return `translateY(-${distance}px)`;
      case 'left':  return `translateX(-${distance}px)`;
      case 'right': return `translateX(${distance}px)`;
      default:      return 'translateY(0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : getInitialTransform(),
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
