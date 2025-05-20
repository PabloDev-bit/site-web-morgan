'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// Données des sections
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

// Fond étoilé animé
function BackgroundSpace() {
  const [stars] = useState(
    () =>
      Array.from({ length: 120 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random() * 2 + 1,
      }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#000020] via-[#000010] to-[#000018]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ width: s.size, height: s.size, top: `${s.y}%`, left: `${s.x}%` }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.twinkle, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState('services');
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Scroll-spy
  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActive(sec.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <BackgroundSpace />

      {/* Progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-teal-400 origin-left z-50"
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#00001a]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
            MHNET
          </h1>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8">
            {sections.map((sec) => (
              <li key={sec.id}>
                <Link
                  href={`#${sec.id}`}
                  className={`text-lg transition-colors ${
                    active === sec.id
                      ? 'text-teal-300 font-semibold'
                      : 'text-cyan-200 hover:text-teal-300'
                  }`}
                >
                  {sec.icon} {sec.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden text-2xl text-cyan-200 focus:outline-none"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden md:hidden bg-[#00001a]/90 backdrop-blur-md"
            >
              <ul className="flex flex-col items-center gap-6 py-4">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <Link
                      href={`#${sec.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-cyan-200 hover:text-teal-300"
                    >
                      {sec.icon} {sec.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <header className="h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight
                       bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent"
          >
            Réinvention
            <br />
            du Textile
          </h1>
          <motion.p
            className="mt-4 text-base sm:text-lg md:text-xl text-cyan-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Services de nettoyage professionnel ultra-performants,
            <br />
            respectueux de vos textiles et de l’environnement.
          </motion.p>
        </motion.div>

        {/* Flèche incitative */}
        <Link href="#services">
          <motion.div
            className="mt-12 text-3xl sm:text-4xl text-cyan-200 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⬇️
          </motion.div>
        </Link>
      </header>

      {/* Contenu en grille */}
      <main className="relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {sections.map((sec) => (
            <motion.div
              key={sec.id}
              id={sec.id}
              className="bg-[#00001a]/40 rounded-xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl sm:text-4xl mr-3">{sec.icon}</span>
                <h2 className="text-xl sm:text-2xl font-bold
                               bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                  {sec.title}
                </h2>
              </div>
              {sec.list ? (
                <ul className="list-disc list-inside space-y-2 text-cyan-200 text-sm sm:text-base">
                  {sec.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-cyan-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="py-16 text-center bg-[#000015] mt-12 relative z-10 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-base sm:text-lg text-cyan-200 mb-6">
          Envie de textile impeccable ? Demandez un devis dès maintenant !
        </p>
        <Link
          href="#contact"
          className="inline-block px-6 sm:px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-full font-semibold transition-colors text-sm sm:text-base"
        >
          Contactez-nous
        </Link>
      </motion.footer>
    </div>
  );
}
