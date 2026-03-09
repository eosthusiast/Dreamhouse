"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "@/components/layout/Navigation";
import PageBackground from "@/components/PageBackground";
import { Fraunces, Nunito } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const QUESTIONS = [
  {
    q: "Do I need to be working on something specific to apply?",
    a: "Not in the sense of a formal project or business. But you should be in an active creative or professional season \u2014 making something, building something, figuring something out. Dream House works best for people who have something they want to move forward, even if that thing is still taking shape.",
  },
  {
    q: "What does a typical day look like?",
    a: "There\u2019s a gentle daily rhythm: mornings dedicated to focused work, afternoons more open for collaboration or exploration, evenings for communal meals and connection. We have a light facilitation structure \u2014 morning check-ins, occasional shared practices \u2014 but we protect your autonomy. This is not a bootcamp.",
  },
  {
    q: "How much alone time will I have?",
    a: "As much as you need. The house is designed with communal and private spaces. You won\u2019t be expected to be \u201con\u201d at all times. Introverts thrive here; in fact, some of our most enthusiastic early interest has come from people who identify as introverted and crave meaningful social connection rather than constant social activity.",
  },
  {
    q: "What\u2019s the gender and background composition of the cohort?",
    a: "We\u2019re intentional about cohort composition, including gender balance and professional diversity. We don\u2019t publish specific targets, but community dynamics are something we think carefully about in the selection process.",
  },
  {
    q: "Can I bring my partner or a friend?",
    a: "Dream House is designed as a community experience where relationships form organically from scratch. Bringing a pre-existing partner or close friend can change the group dynamics in ways that diminish the experience for everyone. We ask that each participant apply individually.",
  },
  {
    q: "What if I need to leave early or arrive late?",
    a: "We ask for a full-month commitment. The community experience compounds over time \u2014 the magic of week four is built on weeks one through three. If there are extenuating circumstances, reach out and we\u2019ll talk.",
  },
  {
    q: "Is this a business networking event?",
    a: "No \u2014 though many residents do find that professional relationships emerge organically. We\u2019re not building LinkedIn connections; we\u2019re building relationships. If those relationships turn into collaborations, referrals, or business, that\u2019s a natural byproduct of genuine connection, not the goal.",
  },
  {
    q: "What happens after Dream House?",
    a: "The cohort becomes a lifelong community. Many alumni report that the relationships formed during their month in residence remain among the most important of their professional and personal lives. We facilitate ongoing connection after the experience ends.",
  },
];

export default function FaqContent() {
  const [open, setOpen] = useState<number | null>(null);
  const wrapperClass = `${fraunces.variable} ${nunito.variable}`;

  return (
    <div
      className={wrapperClass}
      style={{
        ["--cream" as string]: "#fdf8f0",
        ["--coral" as string]: "#e8806a",
        ["--terra" as string]: "#c95f45",
        ["--gold" as string]: "#e8b84b",
        ["--sage" as string]: "#8cb89a",
        ["--lavender" as string]: "#b8a8d4",
        ["--text-dark" as string]: "#231810",
        ["--text-mid" as string]: "#5a3828",
        ["--text-soft" as string]: "#8a6050",
        backgroundColor: "var(--cream)",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <PageBackground />

      <div style={{ position: "relative", zIndex: 3 }}>
        <Navigation variant="light" />

        {/* Hero */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "35vh",
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--coral)",
              marginBottom: "1.25rem",
              opacity: 0.9,
            }}
          >
            Dream House
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(4rem, 9vw, 8rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-dark)",
              marginBottom: "1.25rem",
            }}
          >
            <em style={{ fontStyle: "italic" }}>Questions</em>
          </motion.h1>
        </section>

        {/* Content container */}
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 2rem 6rem" }}>
          {/* Divider */}
          <hr style={{ border: "none", height: "1px", background: "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)", margin: "0 auto 3rem", maxWidth: "480px" }} />

          {/* Accordion */}
          <div>
            {QUESTIONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1.75rem 0",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid rgba(232,128,106,0.12)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      color: "var(--gold)",
                      fontSize: "0.8rem",
                      flexShrink: 0,
                      paddingTop: "0.25rem",
                    }}
                  >
                    ✦
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: "var(--text-dark)",
                      flex: 1,
                    }}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      flexShrink: 0,
                      fontSize: "1rem",
                      color: "var(--text-soft)",
                      paddingTop: "0.2rem",
                    }}
                  >
                    ▾
                  </motion.span>
                </button>

                {/* Answer expand */}
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                          lineHeight: 1.85,
                          color: "var(--text-mid)",
                          padding: "1.25rem 0 1.75rem 2rem",
                        }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div style={{ paddingBottom: "2rem" }} />
        </div>
      </div>
    </div>
  );
}
