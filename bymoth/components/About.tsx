"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation (left to right)
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Paragraph animation (fade in)
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-[#ead8b5]" ref={aboutRef}>
      <div className="container mx-auto px-4">
        <h2
          className="text-5xl sm:text-6xl font-bold text-[#1e1e1a] sticky top-0 bg-[#ead8b5] py-4 z-10"
          ref={titleRef}
        >
          About MOTH
        </h2>
        <div className="pt-10" ref={textRef}>
          <p className="text-lg max-w-2xl mx-auto text-center text-[#1e1e1a]">
            Mints On The House is more than an event production company — we’re a vibrant community united by a deep love for house music, connection, and creative expression.

            Born from the belief that music and art have the power to bring souls together, we craft unforgettable experiences where rhythm meets intention, and every beat opens the door to something deeper. Our events are a celebration of freedom, inclusivity, and the magic that happens when people come together to move, feel, and connect.
          </p>
        </div>
      </div>
    </section>
  );
}