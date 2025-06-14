"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

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
            onEnter: () => console.log('Title entered viewport'),
          },
        }
      );
    }

    // Paragraph animation (SplitText, words slide up)
    if (textRef.current) {
      const paragraphs = textRef.current.querySelectorAll('p');
      paragraphs.forEach((p, index) => {
        const split = new SplitText(p, { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onEnter: () => console.log(`Paragraph ${index + 1} animation triggered`),
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // Note: SplitText instances are automatically cleaned up by GSAP
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-[#cd2027]" ref={aboutRef}>
      <div className="container mx-auto px-4">
        <h2
          className="text-5xl sm:text-6xl font-bold font-myfont text-[#1e1e1a] sticky top-0 bg-[#cd2027] py-4 z-10"
          ref={titleRef}
        >
          About MOTH
        </h2>
        <div className="pt-10" ref={textRef}>
          <p className="text-xl max-w-2xl mx-auto text-center text-[#1e1e1a] font-joorick tracking-wider">
            Mints On The House is more than an event production company — we’re a vibrant community united by a deep love for house music, connection, and creative expression.
          </p>
          <p className="text-xl max-w-2xl mx-auto text-center text-[#1e1e1a] mt-4 font-joorick tracking-wider">
            Born from the belief that music and art have the power to bring souls together, we craft unforgettable experiences where rhythm meets intention, and every beat opens the door to something deeper. Our events are a celebration of freedom, inclusivity, and the magic that happens when people come together to move, feel, and connect.
          </p>
        </div>
      </div>
    </section>
  );
}