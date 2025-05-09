"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  title: string;
  date: string;
  link: string;
}

const events: Event[] = [
  { id: 1, title: 'Summer Beats 2025', date: 'June 15, 2025', link: 'https://ticketlink.com/summerbeats' },
  { id: 2, title: 'Electro Nights', date: 'July 20, 2025', link: 'https://ticketlink.com/electronights' },
];

export default function Events() {
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eventsRef.current) {
      (gsap.utils.toArray('.event-card') as HTMLElement[]).forEach((card: HTMLElement, index: number) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="events" className="py-20" ref={eventsRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="event-card bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-400 mb-4">{event.date}</p>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
              >
                Buy Tickets
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}