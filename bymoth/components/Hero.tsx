"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  return (
    <section id="home" className="h-screen flex items-center justify-center" ref={heroRef}>
      <div className="text-center">
        <h2 className="text-5xl font-extrabold mb-4">Experience the Sound</h2>
        <p className="text-lg mb-6">Join us for unforgettable music events!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Image
            src="/foto1.jpg"
            alt="Event 1"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
            priority
          />
          <video
            autoPlay
            loop
            muted
            className="w-full rounded-lg shadow-lg"
          >
            <source src="/videos/event-promo.mp4" type="video/mp4" />
          </video>
          <Image
            src="/foto2.jpg"
            alt="Event 2"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}