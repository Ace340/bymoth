"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Lista de imágenes (duplicada para simular bucle)
const images: { src: string; alt: string }[] = [
  { src: '/foto1.jpg', alt: 'Event 1' },
  { src: '/foto2.jpg', alt: 'Event 2' },
  { src: '/foto3.jpg', alt: 'Event 3' },
  { src: '/foto4.jpg', alt: 'Event 4' },
  { src: '/foto5.jpg', alt: 'Event 5' },
  { src: '/foto1.jpg', alt: 'Event 1' },
  { src: '/foto2.jpg', alt: 'Event 2' },
  { src: '/foto3.jpg', alt: 'Event 3' },
  { src: '/foto4.jpg', alt: 'Event 4' },
  { src: '/foto5.jpg', alt: 'Event 5' },
];

export default function HeroFramer() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => {
      const newCount = prev + 1;
      console.log(`Imagen cargada, total: ${newCount}/${images.length}`);
      return newCount;
    });
  };

  // Animación del carrusel
  useEffect(() => {
    if (imagesLoaded !== images.length || !carouselRef.current || showIntro) {
      console.log('Esperando carga de imágenes, carouselRef o fin de intro');
      return;
    }

    console.log('Iniciando animación del carrusel');

    const totalWidth = carouselRef.current.scrollWidth / 2;
    let x = 0;

    const animate = () => {
      x -= 0.5; // Velocidad aumentada
      if (Math.abs(x) > totalWidth) {
        x += totalWidth;
        console.log('Reiniciando carrusel, x:', x);
      }
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${x}px)`;
        // console.log('Moviendo carrusel, x:', x);
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      x = 0;
      console.log('Redimensionando, reiniciando x');
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(0px)`;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Limpiando animación');
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, showIntro]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animación inicial */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1914]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            onAnimationComplete={() => setShowIntro(false)}
          >
            {/* Contenedor centrado para el texto */}
            <div className="flex items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] px-4">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-myfont text-white text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                Who the F*ck Eat Mints?
              </motion.h1>
            </div>
            {/* Capas de transición (cierre vertical) */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-black"
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              transition={{ duration: 0.8, delay: 1.5, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1/2 bg-black"
              initial={{ y: 0 }}
              animate={{ y: '100%' }}
              transition={{ duration: 0.8, delay: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <section id="home" className="h-screen flex items-center justify-center bg-[#1a1914] overflow-x-hidden" ref={heroRef}>
        <div className="text-center max-w-[100vw]">
          <h2 className="text-4xl sm:text-5xl font-extrabold font-myfont mb-4 text-white">Who the F*ck Eat Mints?</h2>
          <p className="text-base sm:text-lg font-joorick mb-6 text-white">by MOTH</p>
          <div className="overflow-hidden max-w-[100vw]">
            <div className="flex space-x-2" ref={carouselRef}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] h-[225px] sm:w-[400px] sm:h-[300px] relative bg-white p-2 rounded-lg shadow-lg border-4 border-[#eddab8]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-md"
                    priority={index === 0}
                    sizes="(max-width: 640px) 300px, 400px"
                    quality={85}
                    onLoad={handleImageLoad}
                    onError={() => console.error(`Error cargando imagen ${image.src}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}