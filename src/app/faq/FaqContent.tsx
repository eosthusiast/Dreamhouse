"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import PageBackground from "@/components/PageBackground";
import { Fraunces, Nunito, Playfair_Display } from "next/font/google";

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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const QUESTIONS = [
  {
    q: "How do I apply?",
    a: 'We regularly add new future chapters, so even if you can\u2019t make the date of the next one, you can fill in our short <a href="https://forms.gle/SPc8q7K1UsmV5iWF9" target="_blank" rel="noopener noreferrer" style="color:#e8806a;text-decoration:none">application form</a> — it takes about 5 minutes. We review every application personally and will be in touch.',
    html: true,
  },
  {
    q: "Do I need to be working on something specific to apply?",
    a: "Creative energy will be high, and you\u2019ll be surrounded by a bunch of inspiring people who may just have the missing ideas, or skills you\u2019ve been waiting for. So whilst you do not need a formal project or business, it\u2019s a super fun place to be in an active creative, designing the next chapter, building a business, learning something, etc. Dream House works best for people who have something they want to move forward, even if that thing is still taking shape.",
  },
  {
    q: "What does a typical day look like?",
    a: "The collective group will bring together their gifts and preferences and design this. Typically it could include mornings intention setting, time dedicated to focused work, lunch and learns, group workouts, collaboration & brainstorming, discussing the world\u2019s problems and how we could be of service, playing, exploring spirituality, evenings for communal meals, connection and workshops. Everyone participating only in what they want to.",
  },
  {
    q: "How much alone time will I have?",
    a: "As much as you need. The house is designed with communal and private spaces. You won\u2019t be expected to be \u201con\u201d at all times. We all have say in how the space is designed, functions and activated. We all have private rooms, and a lot of land to explore to be alone too.",
  },
  {
    q: "What\u2019s the gender and background composition of the cohort?",
    a: "We\u2019re intentional about cohort composition, including gender balance and professional diversity. We don\u2019t publish specific targets, but community dynamics are something we think carefully about in the selection process. We design this believing you will be genuinely excited to meet everyone, and have a deep connection with at least 3 people.",
  },
  {
    q: "Can I bring my partner or a friend?",
    a: "Dream House is designed as a community experience where relationships form organically from scratch. Bringing a pre-existing partner or close friend can change the group dynamics in ways that diminish the experience for everyone. We ask that each participant apply individually, so that they come on their own merit, and will add to the experience. Couples are welcome as long as they have both individually been approved.",
  },
  {
    q: "What if I need to leave early or arrive late?",
    a: "We ask everyone to arrive for the opening weekend. We will only be allowing those who can commit to the whole time, though if you have some trips during the day that may take you away for a few days that is allowed. The community experience compounds over time, the magic of week four is built on weeks one through three.",
  },
  {
    q: "Is this a business networking event?",
    a: "No, though many residents do find that professional relationships emerge organically. We\u2019re not building LinkedIn connections; we\u2019re building relationships. If those relationships turn into collaborations, referrals, or business, that\u2019s a natural byproduct of genuine connection, not the goal. Many businesses, collaborations and advisorships have formed from past Dream Houses based on deep care, respect and friendship.",
  },
  {
    q: "What happens after Dream House?",
    a: "Hopefully you leave inspired and expanded in some way, and you are encouraged to bring that into your life in whatever unique shape or form it needs to for you. You have ongoing support from Carolin, including an integration coaching session, should you desire it. You leave deeply connected with those that you met and let those relationships take form in the way that it most makes sense for your life. Or maybe, you end up at another Dream House together ;)",
  },
];

export default function FaqContent() {
  const [open, setOpen] = useState<number | null>(0);
  const wrapperClass = `${fraunces.variable} ${nunito.variable} ${playfair.variable}`;
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#fdf8f0";
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

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
      data-page-wrapper
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
            minHeight: "25vh",
            padding: "6rem 1.5rem 1.5rem",
            textAlign: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.8rem, 6.3vw, 5.6rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-dark)",
              marginBottom: "1.25rem",
            }}
          >
            Questions
          </motion.h1>
        </section>

        {/* Banner photo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            position: "relative",
            width: "100vw",
            height: "55vh",
            overflow: "hidden",
            marginBottom: "3rem",
          }}
        >
          <Image
            src="/images/sections/pexels-wolfram.jpg"
            alt="Mountain landscape"
            fill
            priority
            style={{
              objectFit: "cover",
              filter: "saturate(0.85)",
            }}
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(253,248,240,0.08) 0%, rgba(253,248,240,0.18) 100%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Content container */}
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem) 6rem" }}>
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
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
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
                    id={`faq-question-${i}`}
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
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      {"html" in item && item.html ? (
                        <p
                          dangerouslySetInnerHTML={{ __html: item.a }}
                          style={{
                            fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                            lineHeight: 1.85,
                            color: "var(--text-mid)",
                            padding: "1.25rem 0 1.75rem 2rem",
                          }}
                        />
                      ) : (
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
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Apply CTA */}
          <div style={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "5rem", position: "relative" }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,128,106,0.10) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <motion.a
              href="https://forms.gle/SPc8q7K1UsmV5iWF9"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(232,128,106,0.45)" }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-nunito)",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#fdf8f0",
                background: "linear-gradient(135deg, #e8806a, #c95f45)",
                padding: "0.85rem 2.5rem",
                borderRadius: "999px",
                textDecoration: "none",
                position: "relative",
                boxShadow: "0 4px 24px rgba(232,128,106,0.35)",
              }}
            >
              Apply here
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
