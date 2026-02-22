'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const REVEAL_EASE = [0.16, 1, 0.3, 1];

const directionOffset = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  distance = 40,
  duration = 0.7,
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });
  const d = directionOffset[direction] || directionOffset.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration, delay, ease: REVEAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up', distance = 30 }) {
  const d = directionOffset[direction] || directionOffset.up;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: d.x * distance, y: d.y * distance },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: REVEAL_EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ target, suffix = '', duration = 2000, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}

export function DrawPath({ d, color = '#D4A843', strokeWidth = 2, duration = 1.5, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      initial={{ pathLength: 0 }}
      animate={isInView ? { pathLength: 1 } : undefined}
      transition={{ duration, ease: REVEAL_EASE }}
      className={className}
    />
  );
}

export function Parallax({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
