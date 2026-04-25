'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import './Shuffle.css';

gsap.registerPlugin();

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  ease?: string | ((t: number) => number);
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: 'random' | 'evenodd';
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
  /** When true, plays the shuffle (for scroll-based visibility) */
  active?: boolean;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  ease = 'power3.out',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  respectReducedMotion = true,
  triggerOnHover = true,
  active = true,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef<SplitType | null>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<((e: Event) => void) | null>(null);
  const hasPlayedForActiveRef = useRef(false);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  const rand = useCallback((set: string) => set.charAt(Math.floor(Math.random() * set.length)) || '', []);

  const teardown = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (wrappersRef.current.length && ref.current) {
      wrappersRef.current.forEach((wrap) => {
        const inner = wrap.firstElementChild as HTMLElement | null;
        const orig = inner?.querySelector('[data-orig="1"]') as HTMLElement | null;
        if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);
      });
      wrappersRef.current = [];
    }
    try {
      splitRef.current?.revert();
    } catch {
      /* ignore */
    }
    splitRef.current = null;
    playingRef.current = false;
  }, []);

  const removeHover = useCallback(() => {
    if (hoverHandlerRef.current && ref.current) {
      ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);
      hoverHandlerRef.current = null;
    }
  }, []);

  const build = useCallback(() => {
    if (!ref.current || !text || !fontsLoaded) return;

    teardown();

    const el = ref.current as HTMLElement;
    splitRef.current = new SplitType(el, {
      types: 'words,chars',
      charClass: 'shuffle-char',
    });

    const chars = (splitRef.current.chars || []) as HTMLElement[];
    wrappersRef.current = [];

    const rolls = Math.max(1, Math.floor(shuffleTimes));

    chars.forEach((ch) => {
      const parent = ch.parentElement;
      if (!parent) return;

      const w = ch.getBoundingClientRect().width;
      const h = ch.getBoundingClientRect().height;
      if (!w) return;

      const wrap = document.createElement('span');
      Object.assign(wrap.style, {
        display: 'inline-block',
        overflow: 'hidden',
        width: w + 'px',
        height: shuffleDirection === 'up' || shuffleDirection === 'down' ? h + 'px' : 'auto',
        verticalAlign: 'bottom',
      });

      const inner = document.createElement('span');
      Object.assign(inner.style, {
        display: 'inline-block',
        whiteSpace: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'normal' : 'nowrap',
        willChange: 'transform',
      });

      parent.insertBefore(wrap, ch);
      wrap.appendChild(inner);

      const firstOrig = ch.cloneNode(true) as HTMLElement;
      Object.assign(firstOrig.style, {
        display: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block',
        width: w + 'px',
        textAlign: 'center',
      });

      ch.setAttribute('data-orig', '1');
      Object.assign(ch.style, {
        display: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block',
        width: w + 'px',
        textAlign: 'center',
      });

      inner.appendChild(firstOrig);
      for (let k = 0; k < rolls; k++) {
        const c = ch.cloneNode(true) as HTMLElement;
        if (scrambleCharset) c.textContent = rand(scrambleCharset);
        Object.assign(c.style, {
          display: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block',
          width: w + 'px',
          textAlign: 'center',
        });
        inner.appendChild(c);
      }
      inner.appendChild(ch);

      const steps = rolls + 1;

      if (shuffleDirection === 'right' || shuffleDirection === 'down') {
        const firstCopy = inner.firstElementChild as HTMLElement | null;
        const real = inner.lastElementChild as HTMLElement | null;
        if (real) inner.insertBefore(real, inner.firstChild);
        if (firstCopy) inner.appendChild(firstCopy);
      }

      let startX = 0;
      let finalX = 0;
      let startY = 0;
      let finalY = 0;

      if (shuffleDirection === 'right') {
        startX = -steps * w;
        finalX = 0;
      } else if (shuffleDirection === 'left') {
        startX = 0;
        finalX = -steps * w;
      } else if (shuffleDirection === 'down') {
        startY = -steps * h;
        finalY = 0;
      } else if (shuffleDirection === 'up') {
        startY = 0;
        finalY = -steps * h;
      }

      if (shuffleDirection === 'left' || shuffleDirection === 'right') {
        gsap.set(inner, { x: startX, y: 0, force3D: true });
        inner.setAttribute('data-start-x', String(startX));
        inner.setAttribute('data-final-x', String(finalX));
      } else {
        gsap.set(inner, { x: 0, y: startY, force3D: true });
        inner.setAttribute('data-start-y', String(startY));
        inner.setAttribute('data-final-y', String(finalY));
      }

      if (colorFrom) inner.style.color = colorFrom;
      wrappersRef.current.push(wrap);
    });
  }, [text, fontsLoaded, shuffleDirection, shuffleTimes, scrambleCharset, colorFrom, colorTo, rand, teardown]);

  const inners = () => wrappersRef.current.map((w) => w.firstElementChild as HTMLElement);

  const randomizeScrambles = useCallback(() => {
    if (!scrambleCharset) return;
    wrappersRef.current.forEach((w) => {
      const strip = w.firstElementChild as HTMLElement;
      if (!strip) return;
      const kids = Array.from(strip.children) as HTMLElement[];
      for (let i = 1; i < kids.length - 1; i++) {
        kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
      }
    });
  }, [scrambleCharset]);

  const cleanupToStill = useCallback(() => {
    wrappersRef.current.forEach((w) => {
      const strip = w.firstElementChild as HTMLElement;
      if (!strip) return;
      const real = strip.querySelector('[data-orig="1"]') as HTMLElement | null;
      if (!real) return;
      strip.replaceChildren(real);
      strip.style.transform = 'none';
      strip.style.willChange = 'auto';
    });
  }, []);

  const armHover = useCallback(() => {
    if (!triggerOnHover || !ref.current) return;
    removeHover();
    const handler = () => {
      if (playingRef.current) return;
      build();
      if (scrambleCharset) randomizeScrambles();
      play();
    };
    hoverHandlerRef.current = handler;
    ref.current.addEventListener('mouseenter', handler);
  }, [triggerOnHover, build, randomizeScrambles, removeHover]);

  const play = useCallback(() => {
    const strips = inners();
    if (!strips.length) return;

    playingRef.current = true;
    const isVertical = shuffleDirection === 'up' || shuffleDirection === 'down';

    const tl = gsap.timeline({
      smoothChildTiming: true,
      repeat: 0,
      onComplete: () => {
        playingRef.current = false;
        cleanupToStill();
        if (colorTo) gsap.set(strips, { color: colorTo });
        onShuffleComplete?.();
        armHover();
      },
    });

    const addTween = (targets: HTMLElement[], at: number) => {
      const vars: Record<string, unknown> = {
        duration,
        ease,
        force3D: true,
        stagger: animationMode === 'evenodd' ? stagger : 0,
      };
      if (isVertical) {
        vars.y = (i: number, t: HTMLElement) => parseFloat(t.getAttribute('data-final-y') || '0');
      } else {
        vars.x = (i: number, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0');
      }
      tl.to(targets, vars as gsap.TweenVars, at);
      if (colorFrom && colorTo) {
        tl.to(targets, { color: colorTo, duration, ease } as gsap.TweenVars, at);
      }
    };

    if (animationMode === 'evenodd') {
      const odd = strips.filter((_, i) => i % 2 === 1);
      const even = strips.filter((_, i) => i % 2 === 0);
      const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
      const evenStart = odd.length ? oddTotal * 0.7 : 0;
      if (odd.length) addTween(odd, 0);
      if (even.length) addTween(even, evenStart);
    } else {
      strips.forEach((strip) => {
        const vars: Record<string, unknown> = {
          duration,
          ease,
          force3D: true,
        };
        if (isVertical) {
          vars.y = parseFloat(strip.getAttribute('data-final-y') || '0');
        } else {
          vars.x = parseFloat(strip.getAttribute('data-final-x') || '0');
        }
        tl.to(strip, vars as gsap.TweenVars, Math.random() * 0.1);
        if (colorFrom && colorTo) {
          tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease } as gsap.TweenVars, 0);
        }
      });
    }

    tlRef.current = tl;
  }, [
    shuffleDirection,
    duration,
    ease,
    animationMode,
    stagger,
    colorFrom,
    colorTo,
    cleanupToStill,
    onShuffleComplete,
    armHover,
  ]);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;

    if (
      respectReducedMotion &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setReady(true);
      return;
    }

    if (active && !hasPlayedForActiveRef.current) {
      hasPlayedForActiveRef.current = true;
      teardown();
      setReady(false);
      build();
      if (scrambleCharset) randomizeScrambles();
      play();
      setReady(true);
    }
  }, [
    active,
    text,
    fontsLoaded,
    build,
    play,
    randomizeScrambles,
    teardown,
    scrambleCharset,
    respectReducedMotion,
  ]);

  useEffect(() => {
    if (!active) {
      hasPlayedForActiveRef.current = false;
      teardown();
      removeHover();
    }
  }, [active, teardown, removeHover]);

  useEffect(() => {
    if (active && ready) {
      armHover();
    }
    return () => removeHover();
  }, [active, ready, armHover, removeHover]);

  const commonStyle: React.CSSProperties = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
  const classes = useMemo(() => `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`.trim(), [ready, className]);
  const Tag = tag || 'p';

  return React.createElement(
    Tag as keyof React.JSX.IntrinsicElements,
    { ref: ref as React.RefObject<HTMLElement>, className: classes, style: commonStyle },
    text
  );
};

export default Shuffle;
