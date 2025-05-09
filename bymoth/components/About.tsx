"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-800" ref={aboutRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">About Us</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Epic Sound Productions has been creating unforgettable music experiences since 2010. We specialize in bringing top artists and vibrant crowds together for events that resonate for a lifetime.
        </p>
      </div>
    </section>
  );
}