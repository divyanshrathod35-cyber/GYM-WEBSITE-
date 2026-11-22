import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const cinema = [
  {
    src: '/media/bodytech-editorial-strength.webp',
    label: '01 / THE INTENTION',
    headline: 'SHOW UP.',
    subline: 'Your next chapter starts with the decision to begin.',
  },
  {
    src: '/media/bodytech-editorial-power.webp',
    label: '02 / THE EFFORT',
    headline: 'DO THE WORK.',
    subline: 'The small decisions become the bigger change.',
  },
  {
    src: '/media/bodytech-editorial-recovery.webp',
    label: '03 / THE RETURN',
    headline: 'COME BACK.',
    subline: 'Consistency deserves a place in your routine.',
  },
];

/**
 * BODYTECH / A bespoke native-scroll, editorial film sequence.
 * No scroll hijacking, autoplay media, canvas rendering, or layout animation.
 * All creative imagery is labelled illustrative and must not imply real premises.
 */
export default function CinematicSequence() {
  const section = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });
  const photographScale = useTransform(scrollYProgress, [0, 0.48, 1], [1.08, 1, 1.04]);
  const numberShift = useTransform(scrollYProgress, [0, 1], [0, -155]);
  const titleOne = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const titleTwo = useTransform(scrollYProgress, [0.30, 0.42, 0.67, 0.76], [0, 1, 1, 0]);
  const titleThree = useTransform(scrollYProgress, [0.73, 0.85, 1], [0, 1, 1]);
  const revealOne = useTransform(scrollYProgress, [0, .28, .39], [1, 1, 0]);
  const revealTwo = useTransform(scrollYProgress, [.3, .44, .69, .79], [0, 1, 1, 0]);
  const revealThree = useTransform(scrollYProgress, [.7, .86, 1], [0, 1, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const images = [revealOne, revealTwo, revealThree];
  const titles = [titleOne, titleTwo, titleThree];
  return (
    <section className="bt-cinema" ref={section} aria-label="Body Tech training mindset: show up, do the work, come back">
      <div className="bt-cinema-stage">
        <div className="bt-cinema-north" aria-hidden="true">
          <span>BODYTECH / ORIGINAL SERIES</span>
          <span>RAJNANDGAON, CHHATTISGARH</span>
        </div>
        <div className="bt-cinema-visual">
          {cinema.map((frame, index) => (
            <motion.div
              className={`bt-cinema-frame bt-cinema-frame-${index + 1}`}
              key={frame.label}
              style={reduceMotion ? undefined : { opacity: images[index], scale: photographScale }}
            >
              <img src={frame.src} alt={`Illustrative BODYTECH-branded athletic campaign concept ${index + 1}; not a photograph of Body Tech Gym, its employees or members`} loading="lazy" decoding="async" width="1500" height="860" />
            </motion.div>
          ))}
          <div className="bt-cinema-shade" aria-hidden="true" />
        </div>
        <motion.span className="bt-cinema-giant" aria-hidden="true" style={reduceMotion ? undefined : { y: numberShift }}>BT.</motion.span>
        <div className="bt-cinema-copy">
          <span className="bt-cinema-kicker">THE PROCESS / 001 — 003</span>
          <div className="bt-cinema-headlines">
            {cinema.map((frame, index) => (
              <motion.div
                className={`bt-cinema-headline bt-cinema-headline-${index + 1}`}
                key={frame.headline}
                style={reduceMotion ? undefined : { opacity: titles[index] }}
              >
                <span className="bt-cinema-label">{frame.label}</span>
                <h2>{frame.headline}</h2>
                <p>{frame.subline}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bt-cinema-bottom">
          <span>CAMPAIGN CONCEPT / NOT ACTUAL CLUB PHOTOGRAPHY</span>
          <motion.div className="bt-cinema-progress" aria-hidden="true"><motion.i style={reduceMotion ? undefined : { scaleX: lineScale }} /></motion.div>
          <a href="#visit">MAKE YOUR FIRST MOVE <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
