"use client";

import { motion } from "motion/react";
import Navigation from "@/components/layout/Navigation";

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
  return (
    <main
      className="min-h-screen selection:bg-warm-gold/20"
      style={{ backgroundColor: "#fbf0e0", color: "#1a1a1a" }}
    >
      <Navigation variant="light" />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[30vh] px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-[6.3rem] lg:text-[7.7rem] font-playfair tracking-tight leading-none mb-6"
          style={{ color: "rgba(26,26,26,1)" }}
        >
          Questions
        </motion.h1>
      </section>

      {/* Content container */}
      <div className="max-w-[750px] mx-auto px-8 md:px-6 pb-24">
        {/* Divider */}
        <div className="flex justify-center my-6 md:my-10">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Questions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-10">
            {QUESTIONS.map((item, i) => (
              <div key={i}>
                <p
                  className="text-lg md:text-xl mb-3"
                  style={{ color: "rgba(26,26,26,1)" }}
                >
                  {item.q}
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "rgba(26,26,26,0.90)" }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
