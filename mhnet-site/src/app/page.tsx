'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// Define each section's data
const sections = [
  {
    id: 'services',
    title: 'Nos Services',
    icon: '🧽',
    content: `Nettoyage professionnel textile haut de gamme pour canapés, tapis, matelas, moquettes et intérieurs de véhicules. Nous utilisons des injecteurs-extracteurs professionnels pour un nettoyage en profondeur, rapide et respectueux des matériaux.`,
  },
  {
    id: 'about',
    title: 'À Propos',
    icon: '🎯',
    content: `Après plusieurs années d’expérience dans le secteur de l’aéronautique, nous avons mis notre savoir-faire, notre rigueur et notre sens du détail au service des particuliers et professionnels. Notre passion pour la qualité se traduit par un nettoyage textile haut de gamme, éliminant allergènes et impuretés pour un environnement plus sain.`,
  },
  {
    id: 'advantages',
    title: 'Avantages',
    icon: '⚡️',
    list: [
      'Injection ciblée au cœur des fibres pour un nettoyage optimal',
      'Détachement et élimination des taches les plus tenaces',
      'Aspiration puissante garantissant un séchage rapide',
      'Produits adaptés et respectueux de chaque surface',
      'Résultat immédiat : textiles rafraîchis et assainis',
    ],
  },
  {
    id: 'engagement',
    title: 'Notre Engagement',
    icon: '🤝',
    content: `Nous intervenons à domicile sur rendez-vous, avec professionnalisme, ponctualité et souci du détail. Votre satisfaction est notre priorité et chaque prestation est réalisée dans le respect de vos besoins.`,
  },
];

// Animated starfield background
function BackgroundSpace() {
  const [stars] = useState(() =>
    Array.from({ length: 120 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      twinkle: Math.random() * 2 + 1,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#000020] via-[#000010] to-[#000018]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ width: star.size, height: star.size, top: `${star.y}%`, left: `${star.x}%` }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: star.twinkle, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState('services');
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Update active nav link
  useEffect(() => {
    const onScroll = () => {
      const midY = window.scrollY + window.innerHeight / 2;
      sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (midY >= top && midY < bottom) setActive(sec.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal animation for sections
  const reveal = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Background */}
      <BackgroundSpace />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-teal-400 origin-left z-50"
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#00001a]/70 backdrop-blur-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
          MHNET
        </h1>
        <ul className="flex gap-6">
          {sections.map(sec => (
            <li key={sec.id}>
              <Link
                href={`#${sec.id}`}
                className={`text-lg transition-colors ${active === sec.id ? 'text-teal-300 font-semibold' : 'text-cyan-200 hover:text-teal-300'}`}
              >
                {sec.icon} {sec.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Réinvention<br />du Textile
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl text-lg sm:text-xl text-cyan-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Services de nettoyage professionnel ultra-performants,<br />respectueux de vos textiles et de l’environnement.
        </motion.p>
      </header>

      {/* Content Sections */}
      <main className="relative z-10">
        {sections.map((sec, idx) => (
          <motion.section
            key={sec.id}
            id={sec.id}
            className={`py-24 px-6 sm:px-12 lg:px-24 ${idx % 2 === 0 ? '' : 'bg-[#00001a]/30'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
            }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-4xl mb-4">{sec.icon}</div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent mb-4">
                {sec.title}
              </h2>
              {sec.list ? (
                <ul className="list-disc list-inside space-y-3 text-lg text-cyan-200">
                  {sec.list.map((item, i) => (<li key={i}>{item}</li>))}
                </ul>
              ) : (
                <p className="text-lg text-cyan-200 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>
              )}
            </div>
          </motion.section>
        ))}
      </main>

      {/* Footer */}
      <motion.footer
        className="py-16 text-center bg-[#000015] mt-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-lg text-cyan-200 mb-6">
          Envie de textile impeccable ? Demandez un devis dès maintenant !
        </p>
        <Link
          href="#contact"
          className="inline-block px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-full font-semibold transition-colors"
        >
          Contactez-nous
        </Link>
      </motion.footer>
    </div>
  );
}