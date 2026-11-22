import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { gymConfig, type Goal, type LocationId, type Months, type PlanType } from './config/gymConfig';
import { directionsUrl, fitnessBlueprint, inr, planQuote, safeText, validFullName, validIndianMobile, waLink, type Activity, type SexForEquation } from './lib/core';

const d = gymConfig;
const ease = [0.22, 1, 0.36, 1] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {diagonal ? <path d="M5 19 19 5M8 5h11v11" /> : <path d="M3 12h18m-7-7 7 7-7 7" />}
  </svg>;
}

function Wordmark() {
  return <a className="bt-brand" href="#top" aria-label="Body Tech Gym, back to top">
    <span className="bt-brand-glyph" aria-hidden="true">BT<span>.</span></span>
    <span className="bt-brand-name"><strong>BODY TECH</strong><small>TRAINING CULTURE / RAJNANDGAON</small></span>
  </a>;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }}
    whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.13 }}
    transition={{ duration: 0.68, ease }}>{children}</motion.div>;
}

const links: [string, string][] = [
  ['The club', '#club'], ['Training', '#training'], ['Membership', '#membership'], ['Locations', '#locations'],
];

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="bt-header" id="top">
    <div className="bt-header-inner">
      <Wordmark />
      <nav className="bt-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="bt-header-cta" href="#visit">YOUR FIRST VISIT <Arrow diagonal /></a>
      <button className="bt-menu-trigger" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open} aria-controls="bt-mobile-nav" onClick={() => setOpen(!open)}>
        <span>{open ? 'CLOSE' : 'MENU'}</span><span className="bt-menu-lines" aria-hidden="true"><i /><i /></span>
      </button>
    </div>
    <AnimatePresence>
      {open && <motion.nav id="bt-mobile-nav" className="bt-mobile-nav" aria-label="Mobile navigation"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2 }}>
        {links.map(([label, href], index) =>
          <a href={href} key={href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{label}<Arrow diagonal /></a>)}
        <a href="#visit" className="bt-mobile-nav-cta" onClick={() => setOpen(false)}>REQUEST A VISIT <Arrow diagonal /></a>
      </motion.nav>}
    </AnimatePresence>
  </header>;
}

function Hero() {
  const photo = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  return <section className="bt-hero" aria-labelledby="bt-hero-title">
    <div className="bt-hero-copy">
      <div className="bt-kicker"><span className="bt-kicker-mark" /> BODY TECH GYM <span>RAJNANDGAON / INDIA</span></div>
      <div className="bt-hero-main">
        <p className="bt-hero-pre">A PLACE TO TRAIN. A REASON TO RETURN.</p>
        <h1 id="bt-hero-title"><span>THE WORK</span><span>IS <em>YOURS.</em></span></h1>
        <p className="bt-hero-description">More than a place to work out. Find the training rhythm that moves your everyday forward, right here in Rajnandgaon.</p>
        <div className="bt-hero-actions">
          <a className="bt-button bt-button-dark" href="#visit">REQUEST A FIRST VISIT <Arrow diagonal /></a>
          <a className="bt-text-link" href="#training">EXPLORE TRAINING <Arrow /></a>
        </div>
      </div>
      <div className="bt-hero-bottom"><span>RAJNANDGAON, CHHATTISGARH</span><span>SCROLL TO EXPLORE ↓</span></div>
    </div>
    <div className="bt-hero-photo" ref={photo}>
      <motion.img src={d.media.hero} alt="Illustrative BODYTECH training campaign scene, not a photograph of the actual gym premises"
        width="1200" height="1600" fetchPriority="high" decoding="async" style={reduce ? undefined : { y: photoY }} />
      <div className="bt-hero-photo-top"><span>BT / TRAINING CULTURE</span><span>01 / 04</span></div>
      <div className="bt-hero-photo-bottom"><span>BUILD THE HABIT.</span><span>CAMPAIGN VISUAL / CONCEPT</span></div>
    </div>
  </section>;
}

function Signal() {
  return <div className="bt-signal" aria-label="Training philosophy">
    <span>SHOW UP</span><i aria-hidden="true" /><span>MOVE WITH PURPOSE</span><i aria-hidden="true" /><span>KEEP GOING</span>
  </div>;
}

function Club() {
  return <section className="bt-club bt-section" id="club" aria-labelledby="bt-club-title">
    <div className="bt-container">
      <div className="bt-section-label"><span>01 / THE CLUB</span><span>BUILT AROUND REAL LIFE</span></div>
      <div className="bt-club-intro">
        <Reveal><h2 id="bt-club-title">STRENGTH IS<br /><em>A PRACTICE.</em><br />NOT A POSE.</h2></Reveal>
        <div className="bt-club-aside"><p>There is no one right starting point. The only thing that matters is finding a routine you can return to.</p><a href="#training" className="bt-underlink">FIND YOUR TRAINING DIRECTION <Arrow diagonal /></a></div>
      </div>
      <div className="bt-club-gallery">
        <figure className="bt-club-gallery-primary">
          <img src={d.media.facility} alt="Illustrative strength training environment, not the real Body Tech premises" loading="lazy" decoding="async" width="800" height="1000" />
          <figcaption>01 / THE PLACE FOR PROGRESS</figcaption>
        </figure>
        <div className="bt-club-gallery-editorial">
          <span className="bt-club-big-index" aria-hidden="true">BT / 01</span>
          <p>A first session. A better habit. A little more confidence every week. That's the kind of progress worth coming back for.</p>
          <figure><img src={d.media.performance} loading="lazy" decoding="async" width="640" height="460"
            alt="Illustrative BODYTECH athletic performance campaign portrait" /><figcaption>CAMPAIGN CONCEPT / NOT ACTUAL MEMBERS</figcaption></figure>
        </div>
      </div>
    </div>
  </section>;
}

type Programme = { number: string; title: string; eyebrow: string; short: string; details: string; points: string[]; image: string; alt: string; goal: Goal };
const programmes: Programme[] = [
  { number: '01', title: 'STRENGTH + CARDIO', eyebrow: 'FIND YOUR FOUNDATION', short: 'Build strength for every day.', details: 'Explore resistance training and conditioning with a focus on useful, repeatable progress.', points: ['Strength and resistance', 'Cardio conditioning', 'Getting started enquiries'], image: d.media.facility, alt: 'Illustrative strength and cardio studio', goal: 'Muscle & Strength' },
  { number: '02', title: 'PERSONAL COACHING', eyebrow: 'MAKE EVERY REP COUNT', short: 'Direction makes a difference.', details: 'Ask about guidance tailored to your starting point, goals and trainer availability.', points: ['Goal conversations', 'Training guidance', 'Availability on request'], image: d.media.coaching, alt: 'Illustrative personal training coaching session', goal: 'Beginner Kickstart' },
  { number: '03', title: 'YOGA + MOVEMENT', eyebrow: 'MOVE WITH INTENTION', short: 'Strength has more than one form.', details: 'Ask the gym about mobility, yoga and movement sessions at your preferred location.', points: ['Yoga and movement', 'Mobility exploration', 'Batch details on request'], image: d.media.mobility, alt: 'Illustrative yoga and mobility practice', goal: 'Power Yoga & Mobility' },
  { number: '04', title: 'TRAIN TOGETHER', eyebrow: 'SHARED CONSISTENCY', short: 'A routine worth sharing.', details: 'Find out about couple training and shared fitness options before committing.', points: ['Couple enquiries', 'Shared training goals', 'Membership terms on request'], image: d.media.couple, alt: 'Illustrative couple exercising together', goal: 'Couple Fitness' },
];

function Training({ onGoal }: { onGoal: (goal: Goal) => void }) {
  const [active, setActive] = useState(0);
  const selected = programmes[active];
  const reduced = useReducedMotion();
  return <section className="bt-training bt-section" id="training" aria-labelledby="bt-training-title">
    <div className="bt-container">
      <div className="bt-section-label bt-section-label-light"><span>02 / TRAIN YOUR WAY</span><span>THE RIGHT START IS YOURS TO CHOOSE</span></div>
      <div className="bt-training-heading"><Reveal><h2 id="bt-training-title">BUILT FOR<br /><em>YOUR KIND OF</em> STRONG.</h2></Reveal><p>Choose a direction. Ask the team what’s available before you commit.</p></div>
      <div className="bt-programme-grid">
        <div className="bt-programme-tabs" role="tablist" aria-label="Explore training areas">
          {programmes.map((p, index) => <button type="button" role="tab" id={'bt-tab-' + index} key={p.number}
            aria-controls="bt-programme-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1}
            className={active === index ? 'bt-programme-tab active' : 'bt-programme-tab'}
            onClick={() => setActive(index)}
            onKeyDown={event => {
              let next = index;
              if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % programmes.length;
              else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + programmes.length - 1) % programmes.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = programmes.length - 1;
              else return;
              event.preventDefault(); setActive(next); document.getElementById('bt-tab-' + next)?.focus();
            }}><span className="bt-programme-num">{p.number}</span><span className="bt-programme-name">{p.title}</span><span className="bt-programme-tab-arrow"><Arrow diagonal /></span></button>)}
        </div>
        <div className="bt-programme-stage" role="tabpanel" id="bt-programme-panel" aria-labelledby={'bt-tab-' + active} tabIndex={0}>
          <AnimatePresence mode="wait">
            <motion.div key={selected.number} className="bt-programme-scene"
              initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.24, ease }}>
              <div className="bt-programme-photo"><img src={selected.image} alt={selected.alt + ' — conceptual imagery, not a verified Body Tech photograph'}
                width="800" height="960" decoding="async" loading="lazy" /><span>BODYTECH / TRAINING STUDIES {selected.number}</span></div>
              <div className="bt-programme-detail">
                <span className="bt-overline">{selected.eyebrow}</span>
                <h3>{selected.short}</h3>
                <p>{selected.details}</p>
                <ul>{selected.points.map(point => <li key={point}>{point}</li>)}</ul>
                <button type="button" onClick={() => onGoal(selected.goal)} className="bt-underlink">ASK ABOUT THIS TRAINING <Arrow diagonal /></button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>;
}

function Story() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  return <section className="bt-story bt-section" aria-labelledby="bt-story-title">
    <div className="bt-container">
      <div className="bt-section-label"><span>03 / THE MINDSET</span><span>A ROUTINE, NOT A REINVENTION</span></div>
      <Reveal><h2 id="bt-story-title">YOU DON'T HAVE<br />TO BE READY.<br /><em>JUST BEGIN.</em></h2></Reveal>
      <div className="bt-story-grid">
        <div className="bt-story-main-photo" ref={stage}>
          <motion.img src={d.media.performance} loading="lazy" decoding="async" width="900" height="1200"
            alt="Illustrative athletic campaign portrait representing effort and training"
            style={reduced ? undefined : { scale: imageScale }} />
          <span>BODYTECH CAMPAIGN / CONCEPT VISUAL 03</span>
        </div>
        <div className="bt-story-side">
          <span className="bt-story-side-number">03 / 03</span>
          <p>We don't believe every fitness journey needs a dramatic beginning. Sometimes it starts with a simple question: when can I come in?</p>
          <a className="bt-button bt-button-dark" href="#visit">TAKE THE FIRST STEP <Arrow diagonal /></a>
          <figure><img src={d.media.couple} loading="lazy" decoding="async" width="700" height="600"
            alt="Illustrative BODYTECH campaign showing people training together" /><figcaption>TRAINING TOGETHER / CONCEPT IMAGERY</figcaption></figure>
        </div>
      </div>
    </div>
  </section>;
}

function FirstVisit({ chosenGoal, revision }: { chosenGoal: Goal; revision: number }) {
  const nameId = useId(); const phoneId = useId();
  const [name, setName] = useState(''); const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState<Goal>(chosenGoal);
  const [location, setLocation] = useState<LocationId>('anupam');
  const [slot, setSlot] = useState<string>('morning');
  const [errors, setErrors] = useState<{name?: string; phone?: string}>({});
  const [message, setMessage] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (revision > 0) { setGoal(chosenGoal); setMessage(null); } }, [chosenGoal, revision]);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = safeText(name, 50);
    const digits = phone.replace(/\D/g, '');
    const nextErrors: typeof errors = {};
    if (!validFullName(cleanName)) nextErrors.name = 'Please enter your full name.';
    if (!validIndianMobile(digits)) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    setErrors(nextErrors);
    if (nextErrors.name) { nameRef.current?.focus(); return; }
    if (nextErrors.phone) { phoneRef.current?.focus(); return; }
    const selected = d.locations.find(item => item.id === location);
    const time = d.slots.find(item => item.id === slot);
    setMessage('Hello Body Tech Gym. My name is ' + cleanName + '. I would like to enquire about my first visit. Phone: +91 ' + digits + '. Training goal: ' + goal + '. Preferred location: ' + (selected?.short ?? 'Please advise') + '. Time preference: ' + (time?.label ?? 'Please advise') + '. Please confirm availability, pricing and any applicable terms.');
  };
  return <section className="bt-visit bt-section" id="visit" aria-labelledby="bt-visit-title">
    <div className="bt-container">
      <div className="bt-section-label bt-section-label-light"><span>04 / BEGIN HERE</span><span>NO PAYMENT OR AUTOMATIC BOOKING</span></div>
      <div className="bt-visit-heading"><Reveal><h2 id="bt-visit-title">MAKE YOUR<br /><em>FIRST MOVE.</em></h2></Reveal><p>One short enquiry. The Body Tech team confirms the details directly. No fake booking slots or surprise payments.</p></div>
      <div className="bt-visit-grid">
        <div className="bt-visit-guidance">
          <span className="bt-overline">HOW THE FIRST VISIT WORKS</span>
          <ol>
            <li><span>01</span><div><strong>SHARE YOUR DIRECTION</strong><p>Tell us what you want to work toward.</p></div></li>
            <li><span>02</span><div><strong>TALK TO THE GYM</strong><p>Send your prepared enquiry through WhatsApp.</p></div></li>
            <li><span>03</span><div><strong>VISIT WHEN CONFIRMED</strong><p>Confirm the branch, timings and current terms before arriving.</p></div></li>
          </ol>
          <p className="bt-visit-truth">This website is an independent presentation concept. Training availability, pricing and any introductory offers require confirmation from the gym.</p>
        </div>
        <div className="bt-form-pane">
          <div className="bt-form-title"><strong>YOUR VISIT REQUEST</strong><span>01 / 01</span></div>
          {message ? <div className="bt-message-ready" role="status" aria-live="polite">
            <span className="bt-overline">YOUR MESSAGE IS READY</span>
            <h3>ONE LAST STEP.</h3>
            <p>Your enquiry has not been sent yet. Tap below to open WhatsApp and send it to the gym.</p>
            <a className="bt-button bt-button-acid" href={waLink(message)} target="_blank" rel="noopener noreferrer">OPEN WHATSAPP <Arrow diagonal /></a>
            <button type="button" className="bt-underlink" onClick={() => setMessage(null)}>EDIT MY DETAILS <Arrow /></button>
          </div> : <form className="bt-visit-form" onSubmit={submit} noValidate>
            <div className="bt-field"><label htmlFor={nameId}>FULL NAME <span>*</span></label><input id={nameId} ref={nameRef} required
              autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? nameId + '-error' : undefined} />
              {errors.name && <small id={nameId + '-error'} className="bt-field-error">{errors.name}</small>}</div>
            <div className="bt-field"><label htmlFor={phoneId}>MOBILE NUMBER <span>*</span></label><div className="bt-phone-field">
              <span>+91</span><input id={phoneId} ref={phoneRef} required inputMode="numeric" autoComplete="tel-national"
                value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile" maxLength={14}
                aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? phoneId + '-error' : undefined} /></div>
              {errors.phone && <small id={phoneId + '-error'} className="bt-field-error">{errors.phone}</small>}</div>
            <div className="bt-field bt-field-row"><label>YOUR TRAINING FOCUS
              <select value={goal} onChange={e => setGoal(e.target.value as Goal)}>{d.goals.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
              <label>PREFERRED LOCATION<select value={location} onChange={e => setLocation(e.target.value as LocationId)}>
                {d.locations.map(item => <option key={item.id} value={item.id}>{item.short}</option>)}</select></label></div>
            <div className="bt-field"><label htmlFor="bt-slot">PREFERRED TIME</label><select id="bt-slot" value={slot} onChange={e => setSlot(e.target.value)}>
              {d.slots.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
            <p className="bt-form-privacy">We do not store your form details on this website. You review and send your own message through WhatsApp.</p>
            <button className="bt-button bt-button-acid bt-submit" type="submit">PREPARE MY ENQUIRY <Arrow diagonal /></button>
          </form>}
        </div>
      </div>
    </div>
  </section>;
}

function Membership() {
  const [type, setType] = useState<PlanType>('individual');
  const [months, setMonths] = useState<Months>(3);
  const [coach, setCoach] = useState(false);
  const quote = planQuote(type, months, coach);
  return <section className="bt-membership bt-section" id="membership" aria-labelledby="bt-membership-title">
    <div className="bt-container">
      <div className="bt-section-label"><span>05 / MEMBERSHIP EXPLORER</span><span>ESTIMATES ONLY / NOT OFFICIAL FEES</span></div>
      <div className="bt-membership-heading"><Reveal><h2 id="bt-membership-title">A PLAN THAT<br /><em>FITS THE WORK.</em></h2></Reveal><p>Explore illustrative membership scenarios, then ask the gym for accurate pricing and terms.</p></div>
      <div className="bt-membership-grid">
        <div className="bt-membership-controls">
          <span className="bt-overline">01 / TRAINING STYLE</span>
          <div className="bt-segment" role="group" aria-label="Membership type">
            <button type="button" className={type === 'individual' ? 'active' : ''} aria-pressed={type === 'individual'} onClick={() => setType('individual')}>INDIVIDUAL</button>
            <button type="button" className={type === 'couple' ? 'active' : ''} aria-pressed={type === 'couple'} onClick={() => setType('couple')}>COUPLE</button>
          </div>
          <span className="bt-overline">02 / DURATION</span>
          <div className="bt-durations" role="group" aria-label="Membership months">
            {([1, 3, 6, 12] as Months[]).map(value =>
              <button key={value} type="button" className={months === value ? 'active' : ''} aria-pressed={months === value} onClick={() => setMonths(value)}>
                <strong>{value}</strong><small>{value === 1 ? 'MONTH' : 'MONTHS'}</small>
              </button>)}
          </div>
          <label className="bt-coach-toggle"><input type="checkbox" checked={coach} onChange={e => setCoach(e.target.checked)} />
            <span>INCLUDE ILLUSTRATIVE TRAINER ADD-ON</span></label>
          <p className="bt-membership-warning">All figures are demonstration examples, not approved Body Tech Gym prices or an offer to purchase. Confirm current fees directly with the club.</p>
        </div>
        <div className="bt-membership-result">
          <div className="bt-membership-result-top"><span>ILLUSTRATIVE TOTAL</span><span>{type.toUpperCase()} / {months} MO</span></div>
          <strong className="bt-membership-price">{inr(quote.total)}</strong>
          <span className="bt-membership-per">DEMO AMOUNT ONLY / NOT A QUOTE</span>
          <div className="bt-membership-facts"><div><span>DURATION</span><strong>{months} MONTH{months > 1 ? 'S' : ''}</strong></div>
            <div><span>OPTION</span><strong>{coach ? 'WITH TRAINER ADD-ON' : 'STANDARD SCENARIO'}</strong></div></div>
          <a href={waLink('Hello Body Tech Gym, I would like current membership details for ' + type + ' training for ' + months + ' month(s). Please share official pricing, what is included and availability.')} target="_blank" rel="noopener noreferrer" className="bt-button bt-button-acid">ASK FOR OFFICIAL PRICING <Arrow diagonal /></a>
        </div>
      </div>
    </div>
  </section>;
}

function FitnessCompass() {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState('170'); const [weight, setWeight] = useState('70'); const [age, setAge] = useState('27');
  const [sex, setSex] = useState<SexForEquation>('male'); const [activity, setActivity] = useState<Activity>('moderate');
  const [goal, setGoal] = useState<Goal>('Muscle & Strength');
  const result = fitnessBlueprint({ height: Number(height), weight: Number(weight), age: Number(age), sex, activity, goal });
  return <section className="bt-compass" aria-label="Optional fitness planning utility">
    <div className="bt-container"><div className="bt-compass-header"><div><span className="bt-overline">OPTIONAL / TRAINING COMPASS</span><h2>KNOW YOUR<br />STARTING POINT.</h2></div>
      <button type="button" className="bt-underlink" aria-expanded={expanded} aria-controls="bt-compass-panel" onClick={() => setExpanded(value => !value)}>{expanded ? 'CLOSE TOOL' : 'EXPLORE TOOL'} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button></div>
      {expanded && <div id="bt-compass-panel" className="bt-compass-panel"><div className="bt-compass-fields">
        <label>HEIGHT (CM)<input type="number" min="120" max="230" value={height} onChange={e => setHeight(e.target.value)} /></label>
        <label>WEIGHT (KG)<input type="number" min="30" max="300" value={weight} onChange={e => setWeight(e.target.value)} /></label>
        <label>AGE (18+)<input type="number" min="18" max="85" value={age} onChange={e => setAge(e.target.value)} /></label>
        <label>SEX FOR EQUATION<select value={sex} onChange={e => setSex(e.target.value as SexForEquation)}><option value="male">Male</option><option value="female">Female</option></select></label>
        <label>ACTIVITY<select value={activity} onChange={e => setActivity(e.target.value as Activity)}><option value="sedentary">Mostly seated</option><option value="light">Lightly active</option><option value="moderate">Moderately active</option><option value="active">Very active</option></select></label>
        <label>GOAL<select value={goal} onChange={e => setGoal(e.target.value as Goal)}>{d.goals.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
      </div><div className="bt-compass-result" aria-live="polite">{result ? <>
        <span>ESTIMATED DAILY ENERGY FOR MAINTENANCE</span><strong>{result.maintenance.toLocaleString('en-IN')} <small>KCAL</small></strong>
        <p>Illustrative calculation only. BMI: {result.bmi.toFixed(1)} ({result.bmiCategory}). Not medical advice, a diagnosis, or an individualized diet prescription.</p></>
        : <p>Enter values within the displayed ranges to see the estimate.</p>}</div></div>}
    </div>
  </section>;
}

const faqs: [string, string][] = [
  ['Can I visit before joining?', 'Send a first-visit enquiry to the team through WhatsApp. Availability, any introductory access and applicable terms must be confirmed directly.'],
  ['What membership plans are available?', 'The interactive amounts on this concept site are examples only. Contact the gym for its current official fees and inclusions.'],
  ['Does Body Tech have personal coaching?', 'You can enquire about personal coaching and available trainers. Specific availability has not been independently confirmed.'],
  ['Which branch should I visit?', 'Public directories list Anupam Nagar and Srishti Colony. Confirm your preferred branch and programme with the team before travelling.'],
  ['Are class times shown live?', 'No. This website does not connect to a live timetable or occupancy system. Ask the gym to confirm the latest opening hours and sessions.'],
];

function Locations() {
  const [active, setActive] = useState<LocationId>('anupam'); const [faq, setFaq] = useState<number | null>(0);
  const location = d.locations.find(item => item.id === active) ?? d.locations[0];
  return <section className="bt-locations bt-section" id="locations" aria-labelledby="bt-locations-title"><div className="bt-container">
    <div className="bt-section-label"><span>06 / FIND US</span><span>IN RAJNANDGAON</span></div>
    <div className="bt-location-heading"><Reveal><h2 id="bt-locations-title">REAL ROOTS.<br /><em>RIGHT HERE.</em></h2></Reveal><p>Two locations appear in public listings. Check with the team which branch is operating your preferred programme.</p></div>
    <div className="bt-location-grid">
      <div className="bt-location-selector" role="group" aria-label="Select publicly listed gym location">{d.locations.map((item, index) =>
        <button type="button" key={item.id} className={active === item.id ? 'active' : ''} aria-pressed={active === item.id} onClick={() => setActive(item.id)}>
          <span>0{index + 1} / LISTED LOCATION</span><strong>{item.short}</strong><small>{item.landmark}</small><Arrow diagonal /></button>)}</div>
      <div className="bt-location-details"><span className="bt-overline">CURRENTLY VIEWING / {location.short.toUpperCase()}</span>
        <h3>{location.landmark}</h3><p>{location.address}</p><small>{location.status}</small>
        <div className="bt-location-actions"><a className="bt-button bt-button-dark" href={directionsUrl(active)} target="_blank" rel="noopener noreferrer">OPEN GOOGLE MAPS <Arrow diagonal /></a>
          <a className="bt-underlink" href={d.contact.tel}>CALL THE GYM <Arrow /></a></div>
      </div>
    </div>
    <div className="bt-faq"><div><span className="bt-overline">THE DETAILS / FAQ</span><h3>GOOD QUESTIONS.<br /><em>STRAIGHT ANSWERS.</em></h3>
      <a className="bt-underlink" href={waLink('Hello Body Tech Gym, I have a question about training and membership.')} target="_blank" rel="noopener noreferrer">ASK THE TEAM <Arrow diagonal /></a></div>
      <div className="bt-faq-list">{faqs.map(([question, answer], index) =>
        <div key={question} className="bt-faq-item"><button type="button" aria-expanded={faq === index} aria-controls={'bt-faq-' + index}
          onClick={() => setFaq(faq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong><i aria-hidden="true">{faq === index ? '−' : '+'}</i></button>
          {faq === index && <div id={'bt-faq-' + index}><p>{answer}</p></div>}</div>)}</div>
    </div>
  </div></section>;
}

function Footer() {
  return <footer className="bt-footer"><div className="bt-container"><span className="bt-overline">MAKE A START / BODY TECH GYM</span>
    <div className="bt-footer-main"><h2>YOUR NEXT<br /><em>CHAPTER.</em></h2><div><p>The next session starts with a conversation. Find out what training at Body Tech could look like for you.</p>
      <a className="bt-button bt-button-acid" href="#visit">REQUEST YOUR FIRST VISIT <Arrow diagonal /></a></div></div>
    <div className="bt-footer-bottom"><Wordmark /><span>© {new Date().getFullYear()} BODY TECH GYM / CONCEPT EXPERIENCE</span><a href={d.contact.tel}>{d.contact.display}</a><a href="#top">BACK TO TOP ↑</a></div>
    <p className="bt-legal">Independent concept presentation by Divex Labs. Generated campaign imagery does not depict the gym's actual premises, trainers or members. Membership figures are illustrative; offers, programmes, times and branch operations require owner confirmation. No visitor form data is stored on this website.</p>
  </div></footer>;
}

function MobileAction() {
  return <div className="bt-mobile-action" aria-label="Quick contact actions"><a href={d.contact.tel}>CALL</a>
    <a href={waLink('Hello Body Tech Gym, I would like to enquire about joining.')} target="_blank" rel="noopener noreferrer">WHATSAPP</a>
    <a href="#visit">FIRST VISIT <Arrow diagonal /></a></div>;
}

export default function App() {
  const [selected, setSelected] = useState<{ goal: Goal; revision: number }>({ goal: 'Beginner Kickstart', revision: 0 });
  const goToGoal = (goal: Goal) => {
    setSelected(previous => ({ goal, revision: previous.revision + 1 }));
    document.getElementById('visit')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  };
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <><a href="#main" className="bt-skip">Skip to main content</a><motion.div className="bt-scroll-indicator" aria-hidden="true" style={{ scaleX: progress }} />
    <Header /><main id="main"><Hero /><Signal /><Club /><Training onGoal={goToGoal} /><Story />
      <FirstVisit chosenGoal={selected.goal} revision={selected.revision} /><Membership /><FitnessCompass /><Locations /></main>
    <Footer /><MobileAction /></>;
}
