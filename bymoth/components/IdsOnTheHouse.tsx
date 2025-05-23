"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface SpotifyEmbed {
  id: number;
  title: string;
  embedUrl: string;
}

const spotifyEmbeds: SpotifyEmbed[] = [
  {
    id: 1,
    title: 'IDs On The House',
    embedUrl: 'https://open.spotify.com/embed/playlist/2zNTfqwQuW2gGZUNM3lGxm?utm_source=generator',
  },
];

export default function IdsOnTheHouse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Animate left image
      if (imageRef.current) {
        console.log('Setting up animation for image'); // Debug: Track image animation
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onEnter: () => console.log('Image entered viewport'),
            },
          }
        );
      }

      // Animate Spotify cards
      (gsap.utils.toArray('.spotify-card') as HTMLElement[]).forEach((card: HTMLElement, index: number) => {
        console.log(`Setting up animation for Spotify card ${index + 1}, ID: ${card.dataset.embedId}`); // Debug: Track card animation
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
              onEnter: () => console.log(`Spotify card ${index + 1} entered viewport`),
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
      id="ids-on-the-house"
      className="min-h-screen py-20 bg-[url('/background.jpg')] bg-fixed bg-cover bg-center overflow-x-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-white">Id's on the House</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Image + Text */}
          <div className="flex flex-col items-center md:items-start">
            <div
              ref={imageRef}
              className="relative w-[280px] md:w-[320px] h-64 mb-6"
            >
              <Image
                src="/ids-poster.jpg"
                alt="Id's on the House Poster"
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 280px, 320px"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-semibold mb-4 text-white">Discover New Beats</h3>
              <p className="text-lg text-gray-300">
                Explore our curated playlists and tracks, handpicked to elevate your vibe. From electronic to chill, we’ve got you covered.
              </p>
            </div>
          </div>

          {/* Right Side: Spotify Embeds */}
          <div className="flex flex-col space-y-6">
            {spotifyEmbeds.map((embed) => (
              <div
                key={embed.id}
                data-embed-id={embed.id}
                className="spotify-card bg-gray-900/80 p-4 rounded-lg shadow-xl w-full max-w-[320px] mx-auto"
              >
                <h4 className="text-xl font-semibold mb-2 text-white">{embed.title}</h4>
                <iframe
                  src={embed.embedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-md"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}