import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionWrapper({ id, children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id={id}
      className={`py-16 lg:py-24 scroll-mt-16 ${className}`}
      style={{ borderBottom: '1px solid rgba(26, 26, 46, 0.8)' }}
    >
      <motion.div
        className="max-w-[1200px] mx-auto px-5 lg:px-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
