/* -------------------------------------------------------------------------- */
/*  /app/page.tsx — page d'accueil tout-en-un (aucun composant externe)        */
/*  Next.js 13/14 + Tailwind + Framer-Motion, full TypeScript                 */
/* -------------------------------------------------------------------------- */
"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ============================== 1. MÉTADONNÉES ============================ */

const LOGO = (
  <span className="text-2xl font-extrabold tracking-tight">
    MH<span className="text-blue-400">NET</span>
  </span>
);

type Star = { x: number; y: number; size: number; twinkle: number };

type Section =
  | {
      id: string;
      icon: string;
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

const SECTIONS: readonly Section[] = [
  {
    id: "services",
    icon: "🧽",
    title: "Nos Services",
    content:
      "Nettoyage textile premium avec technologie galactique pour un résultat éclatant.",
  },
  {
    id: "about",
    icon: "🎯",
    title: "À Propos",
    content:
      "Fort d'une expérience stellaire, MHNET redéfinit le nettoyage professionnel.",
  },
  {
    id: "advantages",
    icon: "⚡️",
    title: "Avantages",
    list: [
      "Injection cosmique pour un nettoyage ultra-profond",
      "Déstabilisation des taches tenaces",
      "Séchage rapide par aspiration gravitationnelle",
      "Produits éco-compatibles",
      "Textiles rénovés instantanément",
    ],
  },
  {
    id: "engagement",
    icon: "🤝",
    title: "Notre Engagement",
    content:
      "Ponctualité sidérale et professionnalisme garantis. Votre satisfaction est notre mission.",
  },
] as const;

const PRICING = [
  { prestation: "Fauteuil", prix: "70 CHF" },
  { prestation: "Canapé 2 places", prix: "120 CHF" },
  { prestation: "Canapé 3 places", prix: "150 CHF" },
  { prestation: "Tapis (standard)", prix: "dès 90 CHF" },
  { prestation: "Matelas 1 place", prix: "90 CHF" },
  { prestation: "Matelas 2 places", prix: "120 CHF" },
  { prestation: "Matelas King Size", prix: "150 CHF" },
  { prestation: "Intérieur voiture complet", prix: "140 CHF" },
] as const;

/* =========================== 2. SOUS-FONCTIONS ============================ */

function GalaxyBackground() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 150 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random() * 2 + 1,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#001f3f] via-[#001229] to-[#000814]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.y}%`,
            left: `${s.x}%`,
          }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: s.twinkle,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(50);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setRatio(Math.max(0, Math.min(100, ((clientX - left) / width) * 100)));
  }, []);

  const start = (e: React.PointerEvent) => {
    update(e.clientX);
    const move = (ev: PointerEvent) => update(ev.clientX);
    const end = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
  };

  return (
    <div
      ref={ref}
      onPointerDown={start}
      className="relative mx-auto w-full max-w-4xl cursor-ew-resize select-none"
    >
      <Image
        src={before}
        alt="Avant nettoyage"
        width={1920}
        height={1080}
        className="w-full rounded-lg shadow-lg"
        priority
      />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden rounded-lg"
        style={{ width: `${ratio}%` }}
      >
        <Image
          src={after}
          alt="Après nettoyage"
          width={1920}
          height={1080}
          className="w-full"
        />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-white"
        style={{ left: `${ratio}%` }}
      />
      <span className="absolute top-2 left-2 font-semibold text-white">Avant</span>
      <span
        className="absolute top-2 font-semibold text-white"
        style={{ left: `calc(${ratio}% + 8px)` }}
      >
        Après
      </span>
    </div>
  );
}

/* ================================ 3. PAGE ================================ */

export default function Home() {
  const [drawer, setDrawer] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* ESC ferme le menu mobile */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute top-0 left-0 m-2 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Aller au contenu
      </a>

      <GalaxyBackground />

      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-blue-400"
        aria-hidden
      />

      {/* ----------------------------- NAVBAR ----------------------------- */}
      <header className="sticky top-0 z-40 bg-[#001229]/80 backdrop-blur-md">
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-7xl items-center justify-between p-6"
        >
          <Link href="/" aria-label="Accueil">
            {LOGO}
          </Link>

          <ul className="hidden gap-8 text-base font-medium md:flex">
            {SECTIONS.map(({ id, title }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  className="transition hover:text-blue-400"
                >
                  {title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#tarifs"
                className="rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Tarifs
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="rounded-full border-2 border-blue-400 px-4 py-2 text-blue-400 transition hover:bg-[#001229]/20"
              >
                Devis
              </Link>
            </li>
          </ul>

          <button
            onClick={() => setDrawer(true)}
            className="p-2 text-2xl md:hidden"
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>
        </nav>
      </header>

      {/* ---------------------------- DRAWER ------------------------------ */}
      <AnimatePresence>
        {drawer && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[#001229]/90 p-6 backdrop-blur"
          >
            <button
              onClick={() => setDrawer(false)}
              aria-label="Fermer le menu"
              className="mb-6 text-2xl"
            >
              ✕
            </button>
            <ul className="flex flex-col gap-4 text-lg">
              {SECTIONS.map(({ id, icon, title }) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    onClick={() => setDrawer(false)}
                    className="flex items-center gap-2 transition hover:text-blue-400"
                  >
                    {icon} {title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="#tarifs"
                  onClick={() => setDrawer(false)}
                  className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700"
                >
                  Voir les tarifs
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ------------------------------ HERO ------------------------------ */}
      <section
        id="hero"
        className="relative py-24 text-center text-white lg:py-32"
      >
        <div className="mx-auto max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            Réinvention&nbsp;du&nbsp;Textile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg text-gray-300"
          >
            Nettoyage professionnel ultra-performant, respectueux des textiles et
            de l’environnement.
          </motion.p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#services"
              className="rounded-full bg-blue-600 px-6 py-3 font-semibold shadow transition hover:bg-blue-700"
            >
              En savoir plus
            </Link>
            <Link
              href="#tarifs"
              className="rounded-full border-2 border-blue-400 px-6 py-3 font-semibold text-blue-400 transition hover:bg-[#001229]/20"
            >
              Nos tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------- AVANT / APRÈS ---------------------------- */}
      <section className="py-20">
        <h2 className="mb-8 text-center text-3xl font-extrabold">
          Avant&nbsp;/&nbsp;Après
        </h2>
        <BeforeAfterSlider before="/photo(1).jpeg" after="/photo(3).jpeg" />
      </section>

      {/* --------------------------- CONTENU ------------------------------ */}
      <main id="main" className="space-y-20 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <motion.article
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col rounded-3xl bg-[#001229]/60 p-8 shadow-lg backdrop-blur-md transition hover:shadow-2xl"
            >
              <header className="mb-4 flex items-center gap-3">
                <span className="text-4xl">{s.icon}</span>
                <h3 className="text-2xl font-bold">{s.title}</h3>
              </header>

              {"list" in s && s.list ? (
                <ul className="list-inside list-disc space-y-2 text-gray-300">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">{s.content}</p>
              )}
            </motion.article>
          ))}
        </div>

        {/* -------------------------- TARIFS ----------------------------- */}
        <section id="tarifs" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-4xl font-extrabold">Tarifs</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PRICING.map(({ prestation, prix }) => (
                <motion.div
                  key={prestation}
                  whileHover={{ scale: 1.03 }}
                  className="flex flex-col justify-between rounded-3xl bg-[#001229]/70 p-6 shadow-lg backdrop-blur-md transition hover:shadow-2xl"
                >
                  <h3 className="mb-4 text-2xl font-bold">{prestation}</h3>
                  <p className="mb-6 text-xl font-semibold text-blue-400">
                    {prix}
                  </p>
                  <Link
                    href="#contact"
                    className="mt-auto rounded-full bg-blue-600 px-4 py-2 text-center font-medium transition hover:bg-blue-700"
                  >
                    Réserver
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------- FOOTER ----------------------------- */}
      <footer
        id="contact"
        className="bg-[#001229] py-16 text-center text-white"
      >
        <div className="mx-auto flex max-w-xl flex-col gap-6 px-6">
          <h2 className="text-3xl font-extrabold">Besoin d’un devis&nbsp;?</h2>
          <p className="text-lg text-gray-300">
            Contactez-nous dès maintenant pour un devis gratuit.
          </p>
          <Link
            href="mailto:contact@mhnet.com"
            className="mx-auto inline-block rounded-full border-2 border-blue-400 px-8 py-4 font-semibold transition hover:bg-[#001229]/20"
          >
            Demander un devis
          </Link>
          <p className="pt-8 text-sm text-gray-500">
            © {new Date().getFullYear()} MHNET • Tous droits réservés
          </p>
        </div>
      </footer>
    </>
  );
}
