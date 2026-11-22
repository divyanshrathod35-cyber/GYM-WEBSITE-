import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const chapters = [
  {
    number: '01',
    label: 'THE DECISION',
    title: 'SHOW UP.',
    description: 'Progress begins before the first rep. Start with the decision to show up.',
    image: '/media/bodytech-editorial-strength.webp',
    alt: 'Illustrative BODYTECH campaign image of an athlete preparing to lift, not a photograph of the actual gym.',
  },
  {
    number: '02',
    label: 'THE PRACTICE',
    title: 'DO THE WORK.',
    description: 'Strength is built through focused sessions, useful guidance and consistency.',
    image: '/media/bodytech-editorial-power.webp',
    alt: 'Illustrative BODYTECH athletic campaign concept, not a photograph of an actual club member.',
  },
  {
    number: '03',
    label: 'THE RETURN',
    title: 'COME BACK.',
    description: 'The best routine is the one you can return to. Find your place to begin.',
    image: '/media/bodytech-editorial-recovery.webp',
    alt: 'Illustrative BODYTECH training campaign concept, not a photograph of Body Tech facilities.',
  },
] as const;

type Chapter = (typeof chapters)[number];

function TrainingChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const section = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start end', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.09, 1.035]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section
      ref={section}
      className={index === 1 ? 'bt-story-chapter bt-story-chapter--reverse' : 'bt-story-chapter'}
      aria-labelledby={'bt-story-title-' + index}
    >
      <div className="bt-story-copy">
        <span className="bt-story-index">{chapter.number} / 03 &nbsp; {chapter.label}</span>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id={'bt-story-title-' + index}>{chapter.title}</h2>
          <p>{chapter.description}</p>
          {index === 2 ? (
            <a className="bt-story-link" href="#visit">
              REQUEST YOUR FIRST VISIT <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="bt-story-next" aria-hidden="true">THE PROCESS CONTINUES ↓</span>
          )}
        </motion.div>
      </div>
      <figure className="bt-story-visual">
        <motion.img
          src={chapter.image}
          alt={chapter.alt}
          width={1500}
          height={860}
          loading="lazy"
          decoding="async"
          style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
        />
        <figcaption>BODYTECH ORIGINAL SERIES / CAMPAIGN CONCEPT</figcaption>
      </figure>
    </section>
  );
}

/**
 * BODYTECH editorial narrative: individual readable chapters in document flow.
 * No superimposed headings, scroll locking, oversized decorative initials,
 * or dependence on animation to access content.
 */
export default function CinematicSequence() {
  return (
    <section className="bt-story" aria-label="The Body Tech approach to training">
      <header className="bt-story-intro">
        <span>BODYTECH / THE TRAINING CULTURE</span>
        <p>THREE DECISIONS. ONE DIRECTION.</p>
      </header>
      {chapters.map((chapter, index) => (
        <TrainingChapter key={chapter.number} chapter={chapter} index={index} />
      ))}
      <div className="bt-story-outro" aria-hidden="true">THE WORK CONTINUES / BODYTECH</div>
    </section>
  );
}
