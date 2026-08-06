import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export const MagneticButton = ({ children, className = '' }: any) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Disable magnetic GSAP physics on touch devices so touch/click events navigate instantly
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const el = buttonRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!hovered) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.4;
      const y = (e.clientY - top - height / 2) * 0.4;
      gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      setHovered(false);
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    const onMouseEnter = () => setHovered(true);

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseenter", onMouseEnter);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [hovered]);

  return (
    <div ref={buttonRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
