'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

interface HeroTextTypeProps {
  line1?: string;
  line2?: string;
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
}

export default function HeroTextType({
  line1 = 'Tanishq Varshney',
  line2 = 'Software Developer',
  typingSpeed = 75,
  pauseDuration = 1500,
  deletingSpeed = 50,
  cursorCharacter = '_',
  cursorBlinkDuration = 0.5,
}: HeroTextTypeProps) {
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [phase, setPhase] = useState<'line1' | 'line2' | 'pause' | 'deleting'>('line1');
  const [charIndex, setCharIndex] = useState(0);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [cursorBlinkDuration, phase, displayedLine1, displayedLine2]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'line1') {
      if (charIndex < line1.length) {
        timeout = setTimeout(() => {
          setDisplayedLine1(prev => prev + line1[charIndex]);
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhase('line2');
          setCharIndex(0);
        }, 300); // brief pause before moving to line 2
      }
    } else if (phase === 'line2') {
      if (charIndex < line2.length) {
        timeout = setTimeout(() => {
          setDisplayedLine2(prev => prev + line2[charIndex]);
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhase('pause');
        }, 0);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => {
        setPhase('deleting');
      }, pauseDuration);
    } else if (phase === 'deleting') {
      if (displayedLine2.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedLine2(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else if (displayedLine1.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedLine1(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhase('line1');
          setCharIndex(0);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, charIndex, displayedLine1, displayedLine2, line1, line2, typingSpeed, pauseDuration, deletingSpeed]);

  const showCursorOnLine1 = phase === 'line1' || (phase === 'deleting' && displayedLine2.length === 0 && displayedLine1.length > 0);
  const showCursorOnLine2 = phase === 'line2' || phase === 'pause' || (phase === 'deleting' && displayedLine2.length > 0);

  return (
    <div className="text-center">
      <h1 className="text-8xl font-bold tracking-tighter mb-4 text-white">
        {displayedLine1}
        {showCursorOnLine1 && (
          <span ref={cursorRef} className="text-type__cursor text-white ml-0.5">
            {cursorCharacter}
          </span>
        )}
      </h1>
      <p className="text-2xl font-light text-gray-400 min-h-[1.5em]">
        {displayedLine2}
        {showCursorOnLine2 && (
          <span ref={cursorRef} className="text-type__cursor text-gray-400 ml-0.5">
            {cursorCharacter}
          </span>
        )}
      </p>
    </div>
  );
}
