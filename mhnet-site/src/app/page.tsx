/* -------------------------------------------------------------------------- */
/* /app/page.tsx — page d'accueil tout-en-un (composants internes)          */
/* Next.js 13/14 + Tailwind + Framer-Motion, full TypeScript                 */
/* Version avec design et structure améliorés                               */
/* -------------------------------------------------------------------------- */
"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useAnimation, // Pour un contrôle plus fin des animations
} from "framer-motion";
import { useInView } from "react-intersection-observer"; // Pour déclencher les animations au scroll
import Link from "next/link";
import Image from "next/image";

/* ============================== 1. MÉTADONNÉES ET TYPES ============================ */

const LOGO_TEXT = {
  main: "MH",
  accent: "NET",
};

type Star = { id: number; x: number; y: number; size: number; twinkleDuration: number; opacity: number };

type SectionData =
  | {
      id: string;
      icon: string; // Peut être un emoji ou un chemin vers une icône SVG
      title: string;
      content: string;
      list?: undefined;
    }
  | {
      id: string;
      icon: string;
      title: string;
      list: readonly string[];
      content?: undefined;
    };

const SECTIONS_DATA: readonly SectionData[] = [
  {
    id: "services",
    icon: "✨", // Émojis peuvent être stylisés ou remplacés par des SVG
    title: "Services Galactiques",
    content:
      "Notre technologie de nettoyage textile issue des confins de la galaxie garantit une pureté et un éclat inégalés pour tous vos tissus.",
  },
  {
    id: "about",
    icon: "🚀",
    title: "Notre Mission Stellaire",
    content:
      "Forts d'une décennie d'exploration dans l'art du nettoyage, MHNET redéfinit l'excellence avec une précision et une passion cosmiques.",
  },
  {
    id: "advantages",
    icon: "💎",
    title: "Avantages Cosmiques",
    list: [
      "Nettoyage en ultra-profondeur par injection nébulaire.",
      "Désintégration des taches rebelles au niveau atomique.",
      "Séchage hyper-rapide par vortex gravitationnel contrôlé.",
      "Solutions de nettoyage bio-synthétiques respectueuses de l'écosystème.",
      "Régénération instantanée des fibres textiles, aspect neuf garanti.",
    ],
  },
  {
    id: "engagement",
    icon: "🛡️",
    title: "Engagement Interstellaire",
    content:
      "Ponctualité à la vitesse de la lumière et professionnalisme d'un autre monde. Votre satisfaction est notre constellation directrice.",
  },
] as const;

const PRICING_DATA = [
  { prestation: "Fauteuil Astro", prix: "70 CHF" },
  { prestation: "Canapé Nova (2p)", prix: "120 CHF" },
  { prestation: "Canapé Supernova (3p)", prix: "150 CHF" },
  { prestation: "Tapis Nébuleuse (std)", prix: "dès 90 CHF" },
  { prestation: "Matelas Pulsar (1p)", prix: "90 CHF" },
  { prestation: "Matelas Quasar (2p)", prix: "120 CHF" },
  { prestation: "Matelas Galaxie (King)", prix: "150 CHF" },
  { prestation: "Navette Spatiale (Int. voiture)", prix: "140 CHF" },
] as const;

// Couleurs thématiques (peuvent être étendues dans Tailwind config)
const THEME_COLORS = {
  primary: "text-blue-400",
  primaryBg: "bg-blue-600",
  primaryHoverBg: "hover:bg-blue-500",
  darkBg: "bg-[#0a192f]", // Un bleu nuit plus profond
  cardBg: "bg-[#11224e]/70", // Bleu nuit pour les cartes, plus saturé
  cardHoverBg: "hover:bg-[#11224e]/90",
  accentRing: "ring-blue-500/50",
};

/* =========================== 2. COMPOSANTS DE BASE ============================ */

function Logo() {
  return (
    <Link href="/" aria-label="Accueil - MHNET">
      <span className="text-3xl font-extrabold tracking-tighter">
        {LOGO_TEXT.main}
        <span className={THEME_COLORS.primary}>{LOGO_TEXT.accent}</span>
      </span>
    </Link>
  );
}

function GalaxyBackground() {
  const stars = useMemo<Star[]>(() =>
    Array.from({ length: 200 }, (_, i) => ({ // Plus d'étoiles
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5, // Tailles légèrement variées
      twinkleDuration: Math.random() * 3 + 2, // Durées de scintillement variées
      opacity: Math.random() * 0.5 + 0.3, // Opacité initiale variée
    })),
    []
  );

  // Parallax effect for stars based on scroll
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]); // Couche lente
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);  // Couche plus rapide

  return (
    <div className={`fixed inset-0 -z-20 pointer-events-none overflow-hidden ${THEME_COLORS.darkBg}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#001229] to-[#000814]" // Dégradé plus subtil
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }} // Animation de va-et-vient
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
      {stars.map((s, i) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white/80"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.y}%`,
            left: `${s.x}%`,
            y: i % 2 === 0 ? y1 : y2, // Appliquer différents effets de parallaxe
          }}
          animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3] }}
          transition={{
            duration: s.twinkleDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2, // Délais de départ aléatoires
          }}
        />
      ))}
    </div>
  );
}

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(50);

  const updateRatio = useCallback((newRatio: number) => {
    setRatio(Math.max(0, Math.min(100, newRatio)));
  }, []);

  const updatePositionFromClientX = useCallback(
    (clientX: number) => {
      const el = ref.current;
      if (!el) return;
      const { left, width } = el.getBoundingClientRect();
      const newRatio = ((clientX - left) / width) * 100;
      updateRatio(newRatio);
    },
    [updateRatio]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (ref.current) ref.current.focus();
    updatePositionFromClientX(e.clientX);
    const handlePointerMove = (ev: PointerEvent) => updatePositionFromClientX(ev.clientX);
    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newRatio = ratio;
      const step = 5;
      switch (e.key) {
        case "ArrowLeft": newRatio -= step; e.preventDefault(); break;
        case "ArrowRight": newRatio += step; e.preventDefault(); break;
        case "Home": newRatio = 0; e.preventDefault(); break;
        case "End": newRatio = 100; e.preventDefault(); break;
        default: return;
      }
      updateRatio(newRatio);
    },
    [ratio, updateRatio]
  );

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-orientation="horizontal"
      aria-valuenow={Math.round(ratio)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Comparateur d'images avant et après nettoyage"
      className={`relative mx-auto w-full max-w-5xl cursor-ew-resize select-none group focus:outline-none focus:ring-4 ${THEME_COLORS.accentRing} focus:ring-offset-4 focus:ring-offset-[#0a192f] rounded-xl shadow-2xl shadow-blue-500/20`}
    >
      <Image src={before} alt="Avant nettoyage" width={1920} height={1080} className="w-full rounded-xl" priority />
      <div className="absolute inset-y-0 left-0 overflow-hidden rounded-xl" style={{ width: `${ratio}%` }}>
        <Image
          src={after}
          alt="Après nettoyage"
          width={1920}
          height={1080}
          className="absolute inset-y-0 left-0 w-full max-w-none h-auto object-cover"
          style={{ width: ref.current ? `${ref.current.offsetWidth}px` : '100%' }}
        />
      </div>
      <div
        className={`absolute inset-y-0 w-2 bg-white/80 group-hover:bg-blue-300 group-focus:bg-blue-400 transition-colors duration-200 shadow-lg`}
        style={{ left: `${ratio}%`, transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 ${THEME_COLORS.accentRing} opacity-0 group-hover:opacity-100 group-focus:opacity-100 scale-75 group-hover:scale-100 group-focus:scale-100 transition-all duration-200 flex items-center justify-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>
      <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 text-white text-sm font-semibold rounded-md shadow-lg">Avant</span>
      <span className="absolute top-3 right-3 px-3 py-1 bg-black/60 text-white text-sm font-semibold rounded-md shadow-lg">Après</span>
    </div>
  );
}

/* =========================== 3. COMPOSANTS DE SECTION ============================ */

const sectionAnimationVariants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } },
};

function AnimatedSection({ children, className = "", delay = 0, id }: { children: React.ReactNode, className?: string, delay?: number, id?: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={{...sectionAnimationVariants, animate: {...sectionAnimationVariants.animate, transition: {...sectionAnimationVariants.animate.transition, delay }}}}
      initial="initial"
      animate={controls}
    >
      {children}
    </motion.section>
  );
}

function Hero() {
  return (
    <AnimatedSection className="relative min-h-[80vh] flex items-center justify-center text-center text-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Potentiellement un effet de nébuleuse subtil ici en plus du GalaxyBackground */}
      </div>
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl tracking-tighter" // Typo plus impactante
        >
          Réinvention Cosmique <span className="block sm:inline">du Soin Textile</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed" // Typo et espacement
        >
          MHNET fusionne technologie de pointe et savoir-faire interstellaire pour transcender le nettoyage textile traditionnel.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 100 }}
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6" // Espacement et responsive
        >
          <Link
            href="#services"
            className={`px-8 py-4 text-lg font-semibold rounded-lg ${THEME_COLORS.primaryBg} text-white shadow-lg ${THEME_COLORS.primaryHoverBg} transition-all duration-300 transform hover:scale-105 hover:shadow-blue-400/50`}
          >
            Explorer Nos Services
          </Link>
          <Link
            href="#tarifs"
            className={`px-8 py-4 text-lg font-semibold rounded-lg border-2 ${THEME_COLORS.primary} border-current transition-all duration-300 transform hover:scale-105 hover:bg-blue-400/10 hover:shadow-blue-400/30`}
          >
            Voir Nos Tarifs
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function SectionCard({ section, index }: { section: SectionData; index: number }) {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <motion.article
      id={section.id}
      custom={index}
      variants={cardVariants} // Animation d'entrée individuelle
      className={`flex flex-col rounded-2xl ${THEME_COLORS.cardBg} p-8 shadow-2xl shadow-black/30 backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 ${THEME_COLORS.cardHoverBg} hover:shadow-blue-500/40 hover:ring-blue-500/60 transform hover:-translate-y-2`}
    >
      <header className="mb-6 flex items-center gap-5">
        <motion.div 
          className="p-4 rounded-xl bg-blue-500/20 ring-1 ring-blue-400/40 shadow-inner"
          initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: index * 0.15 + 0.3, type: "spring", stiffness: 150 }}}
        >
          <span className="text-4xl block transform group-hover:rotate-12 transition-transform duration-300">{section.icon}</span>
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-100 tracking-tight">{section.title}</h3>
      </header>

      {section.list ? (
        <ul className="space-y-3 text-gray-300/90 flex-grow text-base">
          {section.list.map((item, idx) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: index * 0.15 + 0.4 + idx * 0.1 } }}
              className="flex items-start"
            >
              <span className={`mr-3.5 mt-1 ${THEME_COLORS.primary} text-lg`}>✦</span>
              {item}
            </motion.li>
          ))}
        </ul>
      ) : (
        <motion.p 
            className="text-gray-300/90 leading-relaxed flex-grow text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: index * 0.15 + 0.4 } }}
        >
          {section.content}
        </motion.p>
      )}
    </motion.article>
  );
}

function ContentDisplay() {
  return (
    <AnimatedSection className="py-24 lg:py-32" delay={0.2}>
      <div id="main-content-grid" className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 lg:gap-12">
        {SECTIONS_DATA.map((s, index) => (
          <SectionCard key={s.id} section={s} index={index} />
        ))}
      </div>
    </AnimatedSection>
  );
}

function PricingCard({ item, index }: { item: typeof PRICING_DATA[number]; index: number }) {
    const cardVariants = {
        initial: { opacity: 0, y: 50, filter: "blur(5px)" },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
        }),
    };
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className={`flex flex-col justify-between rounded-2xl ${THEME_COLORS.cardBg} p-8 shadow-xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 ${THEME_COLORS.cardHoverBg} hover:shadow-blue-500/50 hover:ring-blue-500/70 transform hover:scale-105`}
    >
      <div>
        <h3 className="mb-4 text-2xl font-bold text-gray-50 tracking-tight">{item.prestation}</h3>
        <p className={`mb-8 text-3xl font-extrabold ${THEME_COLORS.primary}`}>
          {item.prix}
        </p>
      </div>
      <Link
        href="#contact"
        className={`mt-auto block w-full rounded-lg ${THEME_COLORS.primaryBg} px-6 py-3.5 text-center text-lg font-semibold text-white shadow-md ${THEME_COLORS.primaryHoverBg} transition-all duration-300 hover:shadow-blue-400/60 transform hover:scale-105`}
      >
        Réserver cette Odyssée
      </Link>
    </motion.div>
  );
}

function PricingDisplay() {
  return (
    <AnimatedSection id="tarifs" className="py-24 lg:py-32" delay={0.3}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center text-4xl font-black text-white sm:text-5xl lg:text-6xl tracking-tighter">Nos Constellations Tarifaires</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {PRICING_DATA.map((p, index) => (
            <PricingCard key={p.prestation} item={p} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function PageFooter() {
  return (
    <AnimatedSection id="contact" className={`${THEME_COLORS.darkBg} py-20 lg:py-28 text-center border-t border-blue-500/20`} delay={0.4}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 text-white">
        <motion.h2 
            className="text-4xl font-black sm:text-5xl tracking-tighter"
            initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0, transition: {delay: 0.1}}}
        >
            Prêt pour un Devis <span className={THEME_COLORS.primary}>Stellaire</span>&nbsp;?
        </motion.h2>
        <motion.p 
            className="text-lg text-gray-300/90 leading-relaxed"
            initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.2}}}
        >
          Contactez notre équipage dès maintenant pour une estimation gratuite et personnalisée, adaptée à votre mission de nettoyage.
        </motion.p>
        <motion.div initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1, transition: {delay: 0.3, type: "spring"}}}>
            <Link
                href="mailto:contact@mhnet.com"
                className={`inline-block rounded-lg border-2 ${THEME_COLORS.primary} border-current px-10 py-4 text-lg font-semibold ${THEME_COLORS.primary} shadow-lg transition-all duration-300 hover:bg-blue-400/10 hover:shadow-blue-400/40 transform hover:scale-105`}
            >
                Demander Votre Devis Galactique
            </Link>
        </motion.div>
        <motion.p 
            className="pt-10 text-sm text-gray-500"
            initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.4}}}
        >
          © {new Date().getFullYear()} MHNET • Tous Droits Réservés Dans Cet Univers Et Les Autres.
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

/* ================================ 4. COMPOSANT DE PAGE PRINCIPAL ================================ */

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressBarScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, []);

  // Animation pour le corps de la page pour éviter le flash de contenu non stylisé
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="text-gray-200">
      <a
        href="#main-content-grid" // Cible le conteneur des sections principales
        className="sr-only focus:not-sr-only absolute top-0 left-0 m-3 rounded-md bg-blue-700 px-5 py-3 text-white font-semibold z-50 shadow-lg"
      >
        Aller au contenu principal
      </a>

      <GalaxyBackground />

      <motion.div
        style={{ scaleX: progressBarScaleX }}
        className={`fixed inset-x-0 top-0 z-[100] h-1.5 origin-left ${THEME_COLORS.primaryBg} shadow-lg shadow-blue-500/50`}
        aria-hidden
      />

      {/* ----- NAVBAR ----- */}
      <header className={`sticky top-0 z-40 ${THEME_COLORS.darkBg}/80 backdrop-blur-lg shadow-md border-b border-blue-500/20`}>
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:p-6"
        >
          <Logo />

          <ul className="hidden items-center gap-6 text-base font-medium md:flex lg:gap-8">
            {SECTIONS_DATA.map(({ id, title }) => (
              <li key={id}>
                <Link href={`#${id}`} className={`transition-colors duration-300 hover:${THEME_COLORS.primary}`}>
                  {title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#tarifs"
                className={`rounded-md ${THEME_COLORS.primaryBg} px-5 py-2.5 text-sm font-semibold text-white shadow-sm ${THEME_COLORS.primaryHoverBg} transition-all duration-300 hover:shadow-md`}
              >
                Tarifs
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className={`rounded-md border-2 ${THEME_COLORS.primary} border-current px-5 py-2.5 text-sm font-semibold ${THEME_COLORS.primary} transition-all duration-300 hover:bg-blue-400/10 hover:shadow-sm`}
              >
                Devis
              </Link>
            </li>
          </ul>

          <button
            onClick={() => setDrawerOpen(true)}
            className={`p-2 text-3xl ${THEME_COLORS.primary} md:hidden transition-transform hover:scale-110`}
            aria-label="Ouvrir le menu de navigation"
            aria-expanded={drawerOpen}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* ----- DRAWER (Mobile Menu) ----- */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed inset-y-0 left-0 z-50 w-72 ${THEME_COLORS.darkBg}/95 p-8 backdrop-blur-xl shadow-2xl border-r border-blue-500/30`}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex justify-between items-center mb-10">
              <Logo/>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Fermer le menu"
                className={`text-3xl ${THEME_COLORS.primary} transition-transform hover:rotate-90`}
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-5 text-lg">
              {SECTIONS_DATA.map(({ id, icon, title }) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-4 p-3 rounded-md transition-all duration-300 hover:bg-blue-500/10 hover:${THEME_COLORS.primary} group`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span> 
                    <span className="font-medium">{title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-5 border-t border-blue-500/20 mt-3">
                <Link
                  href="#tarifs"
                  onClick={() => setDrawerOpen(false)}
                  className={`block rounded-lg ${THEME_COLORS.primaryBg} px-5 py-3.5 text-center font-semibold text-white shadow-md ${THEME_COLORS.primaryHoverBg} transition-all duration-300`}
                >
                  Consulter les Tarifs
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ----- Contenu Principal de la Page ----- */}
      <main id="page-content" className="text-white">
        <Hero />
        
        <AnimatedSection className="py-24 lg:py-32 bg-black/20" delay={0.1}>
          <div className="container mx-auto px-6">
              <motion.h2 
                className="mb-16 text-center text-4xl font-black sm:text-5xl lg:text-6xl tracking-tighter"
                initial={{opacity: 0, y:20}} whileInView={{opacity:1, y:0, transition:{delay:0.1}}} viewport={{once: true}}
              >
                  Transformation <span className={THEME_COLORS.primary}>Visible</span> Instantanément
              </motion.h2>
              <BeforeAfterSlider before="/photo(1).jpeg" after="/photo(3).jpeg" />
          </div>
        </AnimatedSection>

        <ContentDisplay />
        <PricingDisplay />
      </main>

      <PageFooter />
    </motion.div>
  );
}