import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { BotVisual, SoftwareVisual, WebVisual } from '../visuals/ProductVisuals';

gsap.registerPlugin(ScrollTrigger);

const stories = [
  { title: 'A site people remember.', copy: 'Clear structure, deliberate design, and a fast build—working together from the start.', Visual: WebVisual },
  { title: 'A bot that earns its place.', copy: 'Support, moderation, roles, and integrations handled quietly in the background.', Visual: BotVisual },
  { title: 'Software shaped around the job.', copy: 'Focused tools that remove repeated work without becoming another system to manage.', Visual: SoftwareVisual },
] as const;

export function CinematicSequence() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    const pinElement = pin.current;
    if (!section || !pinElement) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const gsapContext = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.story-panel', section);
        const copies = gsap.utils.toArray<HTMLElement>('.story-copy', section);
        const [webPanel, botPanel, softwarePanel] = panels;
        const [webCopy, botCopy, softwareCopy] = copies;
        if (!webPanel || !botPanel || !softwarePanel || !webCopy || !botCopy || !softwareCopy) return;
        if (motionQuery.matches) {
          gsap.set([...panels, ...copies], { autoAlpha: 0 });
          gsap.set([webPanel, webCopy], { autoAlpha: 1 });
          return;
        }

        gsap.set(panels, { autoAlpha: 0, scale: .94, y: 50 });
        gsap.set(copies, { autoAlpha: 0, y: 24 });
        gsap.set([webPanel, webCopy], { autoAlpha: 1, scale: 1, y: 0 });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 3.6}`,
            pin: pinElement,
            scrub: .65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(webPanel, { autoAlpha: 0, scale: 1.05, y: -42, duration: .22 }, .22)
          .to(webCopy, { autoAlpha: 0, y: -20, duration: .14 }, .22)
          .to(botPanel, { autoAlpha: 1, scale: 1, y: 0, duration: .25 }, .31)
          .to(botCopy, { autoAlpha: 1, y: 0, duration: .18 }, .36)
          .to('.story-stage', { backgroundColor: '#0d1016', duration: .2 }, .31)
          .to(botPanel, { autoAlpha: 0, scale: .96, y: -36, duration: .2 }, .58)
          .to(botCopy, { autoAlpha: 0, y: -20, duration: .14 }, .58)
          .to(softwarePanel, { autoAlpha: 1, scale: 1, y: 0, duration: .25 }, .67)
          .to(softwareCopy, { autoAlpha: 1, y: 0, duration: .18 }, .72)
          .to('.story-stage', { backgroundColor: '#eaf1ff', duration: .22 }, .65)
          .to('.story-progress i', { scaleX: 1, duration: 1 }, 0);
      });

      media.add('(max-width: 767px)', () => {
        gsap.set('.story-panel, .story-copy', { clearProps: 'all' });
      });

      return () => media.revert();
    }, section);

    return () => gsapContext.revert();
  }, []);

  return (
    <section className="story" id="cinematic" ref={root} aria-labelledby="story-heading">
      <div className="story__pin" ref={pin}>
        <header className="story__heading"><h2 id="story-heading">Three ways to build better.</h2><p>One studio, moving from idea to working product.</p></header>
        <div className="story-stage">
          {stories.map(({ title, copy, Visual }) => <div className="story-panel" key={title}><Visual /><article className="story-copy"><h3>{title}</h3><p>{copy}</p></article></div>)}
        </div>
        <div className="story-progress"><i /></div>
      </div>
    </section>
  );
}
