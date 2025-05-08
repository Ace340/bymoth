"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Spotify } from 'react-spotify-embed';
// import InstagramEmbed from 'react-instagram-embed';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

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

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const playlistsRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación para Hero
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

    // Animación para About
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

    // Animación para Eventos
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

    // Animación para Playlists
    if (playlistsRef.current) {
      gsap.fromTo(
        playlistsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: playlistsRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animación para Instagram
    if (instagramRef.current) {
      gsap.fromTo(
        instagramRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: instagramRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Limpieza
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Head>
        <title>Musical Events | Epic Sound Productions</title>
        <meta name="description" content="Epic Sound Productions - Your premier music event producer" />
      </Head>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 z-50">
        <nav className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Epic Sound Productions</h1>
          <ul className="flex space-x-6">
            <li><Link href="#home" className="hover:text-purple-400">Home</Link></li>
            <li><Link href="#about" className="hover:text-purple-400">About</Link></li>
            <li><Link href="#events" className="hover:text-purple-400">Events</Link></li>
            <li><Link href="#playlists" className="hover:text-purple-400">Playlists</Link></li>
            <li><Link href="#instagram" className="hover:text-purple-400">Instagram</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section with Gallery */}
      <section id="home" className="h-screen flex items-center justify-center" ref={heroRef}>
        <div className="text-center">
          <h2 className="text-5xl font-extrabold mb-4">Experience the Sound</h2>
          <p className="text-lg mb-6">Join us for unforgettable music events!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Image
              src="/images/event1.jpg"
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
              src="/images/event2.jpg"
              alt="Event 2"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800" ref={aboutRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">About Us</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Epic Sound Productions has been creating unforgettable music experiences since 2010. We specialize in bringing top artists and vibrant crowds together for events that resonate for a lifetime.
          </p>
        </div>
      </section>

      {/* Events Section */}
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

      {/* Spotify Playlists Section */}
      <section id="playlists" className="py-20 bg-gray-800" ref={playlistsRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">Our Playlists</h2>
          <div className="max-w-2xl mx-auto">
            {/* <Spotify link="https://open.spotify.com/playlist/your-playlist-id" /> */}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section id="instagram" className="py-20" ref={instagramRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">Follow Us on Instagram</h2>
          <div className="max-w-2xl mx-auto">
            {/* <InstagramEmbed
              url="https://www.instagram.com/p/your-post-id/"
              clientAccessToken="your-instagram-access-token"
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
            /> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black text-center">
        <p>© 2025 Epic Sound Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}