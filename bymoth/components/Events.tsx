"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  title: string;
  date: string;
  link: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'MOTH at NYC',
    date: 'July 25, 2025',
    link: 'https://ra.co/events/2167964',
    image: '/event1.png',
  },
  // {
  //   id: 2,
  //   title: 'Electro Nights',
  //   date: 'July 20, 2025',
  //   link: 'https://ticketlink.com/electronights',
  //   image: '/Flyer1.png',
  // },
];

export default function Events() {
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eventsRef.current) {
      (gsap.utils.toArray('.event-card') as HTMLElement[]).forEach((card: HTMLElement, index: number) => {
        console.log(`Setting up animation for card ${index + 1}, ID: ${card.dataset.eventId}`); // Debug: Track setup
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onEnter: () => console.log(`Card ${index + 1} entered viewport`), // Debug: Track trigger
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
    <section
      id="events"
      className="min-h-screen py-20 bg-[url('/moth1.jpg')] bg-fixed bg-cover bg-center overflow-x-hidden"
      ref={eventsRef}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center font-myfont mb-12 text-white">Upcoming Events</h2>
        <div className="space-y-24">
          {events.map((event, index) => (
            <div
              key={event.id}
              data-event-id={event.id} // Debug: Add event ID for tracking
              className="event-card sticky top-[10vh] bg-gray-900/80 p-6 rounded-lg shadow-xl w-[280px] md:w-[320px] mx-auto"
              style={{ top: `${10 + index * 5}vh` }}
            >
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={event.image}
                  alt={`${event.title} Flyer`}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 280px, 320px"
                  priority={index === 0}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{event.title}</h3>
              <p className="text-gray-300 mb-4">{event.date}</p>
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