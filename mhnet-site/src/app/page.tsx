'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

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

const pricing = [
  { prestation: 'Fauteuil', standard: '70 CHF', supplement: '90 CHF' },
  { prestation: 'Canapé 2 places', standard: '120 CHF', supplement: '140 CHF' },
  { prestation: 'Canapé 3 places', standard: '150 CHF', supplement: '170 CHF' },
  { prestation: 'Canapé 4 places', standard: '170 CHF', supplement: '190 CHF' },
  { prestation: 'Canapé 5 places', standard: '180 CHF', supplement: '200 CHF' },
  { prestation: 'Tapis (standard)', standard: 'dès 90 CHF', supplement: 'jusqu’à 140 CHF' },
  { prestation: 'Moquette (5–10 m²)', standard: '130 CHF', supplement: '160 CHF' },
  { prestation: 'Matelas 1 place', standard: '90 CHF', supplement: '110 CHF' },
  { prestation: 'Matelas 2 places', standard: '120 CHF', supplement: '150 CHF' },
  { prestation: 'Matelas King Size', standard: '150 CHF', supplement: '180 CHF' },
  { prestation: 'Intérieur voiture complet', standard: '140 CHF', supplement: 'jusqu’à 200 CHF selon état' },
  { prestation: 'OFFRE Canapé 3pl + tapis', standard: '220 CHF', supplement: '250 CHF' },
  { prestation: 'OFFRE Canapé 5pl + grand tapis', standard: '250 CHF', supplement: '280 CHF' },
  { prestation: 'OFFRE Canapé + tapis + voiture', standard: '330 CHF', supplement: '380 CHF' },
];

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#000020] via-[#000010] to-[#000018]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
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

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActive(sec.id);
        }
      });
      setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <BackgroundSpace />

      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-teal-400 origin-left z-50" />

      <nav className="sticky top-0 z-40 bg-[#00001a]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
            MHNET
          </h1>
          <ul className="hidden md:flex gap-6 text-sm sm:text-base">
            {sections.map((sec) => (
              <li key={sec.id}>
                <Link
                  href={`#${sec.id}`}
                  className={`transition-colors ${
                    active === sec.id ? 'text-teal-300 font-semibold' : 'text-cyan-200 hover:text-teal-300'
                  }`}
                >
                  {sec.icon} {sec.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#tarifs"
                className="ml-2 px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition"
              >
                Tarifs
              </Link>
            </li>
          </ul>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen((prev) => !prev)} className="text-cyan-200 text-2xl focus:outline-none">
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden md:hidden px-6 pb-4"
            >
              <ul className="flex flex-col gap-4 text-cyan-200">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <Link
                      href={`#${sec.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 hover:text-teal-300"
                    >
                      {sec.icon} {sec.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="#tarifs"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 mt-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-center font-semibold transition"
                  >
                    Voir les tarifs
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header className="h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="max-w-3xl" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
            Réinvention<br />du Textile
          </h1>
          <motion.p className="mt-4 text-lg sm:text-xl text-cyan-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
            Services de nettoyage professionnel ultra-performants,<br />respectueux de vos textiles et de l’environnement.
          </motion.p>
        </motion.div>
        <Link href="#services">
          <motion.div className="mt-12 text-4xl text-cyan-200 cursor-pointer" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            ⬇️
          </motion.div>
        </Link>
      </header>

      <main className="relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec) => (
            <motion.div key={sec.id} id={sec.id} className="bg-[#00001a]/40 rounded-xl p-6 backdrop-blur-sm" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{sec.icon}</span>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">{sec.title}</h2>
              </div>
              {sec.list ? (
                <ul className="list-disc list-inside space-y-2 text-cyan-200">
                  {sec.list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <p className="text-cyan-200 text-base leading-relaxed whitespace-pre-line">{sec.content}</p>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      <section id="tarifs" className="relative z-10 bg-[#00001a]/20 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8">
            Tarifs MH Net – Nettoyage textile à domicile
          </h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-x-auto">
            <table className="min-w-full table-auto border-separate border-spacing-0">
              <thead>
                <tr className="bg-gradient-to-r from-teal-500 to-blue-500">
                  <th className="px-4 py-3 text-left text-sm sm:text-base font-medium text-white">Prestation</th>
                  <th className="px-4 py-3 text-center text-sm sm:text-base font-medium text-white">Tarif standard</th>
                  <th className="px-4 py-3 text-center text-sm sm:text-base font-medium text-white">Supplément</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#000015]/40' : 'bg-[#000015]/20'}>
                    <td className="px-4 py-3 text-sm sm:text-base">{row.prestation}</td>
                    <td className="px-4 py-3 text-center text-sm sm:text-base">{row.standard}</td>
                    <td className="px-4 py-3 text-center text-sm sm:text-base">{row.supplement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <motion.footer className="py-16 text-center bg-[#000015] mt-12 relative z-10 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
        <p className="text-base sm:text-lg text-cyan-200 mb-6">
          Envie de textile impeccable ? Demandez un devis dès maintenant !
        </p>
        <Link href="#contact" className="inline-block px-6 sm:px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-full font-semibold transition-colors text-sm sm:text-base">
          Contactez-nous
        </Link>
      </motion.footer>
    </div>
  );
}