"use client";

import { motion } from "motion/react";
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

const VALUE_COLORS: Record<string, string> = {
  "Dare to Suck": "#e8806a",
  "Radiate Kindness": "#e8b84b",
  "Explore with Curiosity": "#8cb89a",
  "Abundant Playfulness": "#b8a8d4",
  "Make Meaningful Connections": "#9ec8e0",
};

const DREAM_LETTERS = [
  { letter: "D", color: "#e8806a" },
  { letter: "R", color: "#e8b84b" },
  { letter: "E", color: "#8cb89a" },
  { letter: "A", color: "#b8a8d4" },
  { letter: "M", color: "#9ec8e0" },
];

const VALUES = [
  {
    title: "Dare to Suck",
    subtitle:
      "The best creative work lives on the other side of the attempt that might fail. And the best life lives on the other side of the plan you let go of.",
    paragraphs: [
      "We celebrate the try. The half-finished idea shared before it\u2019s ready. The pitch that falls apart in the room. We don\u2019t wait for perfect \u2014 we trust that showing up imperfectly is how we get anywhere worth going.",
      "But Daring to Suck is also this: releasing the grip. Trusting that you don\u2019t need to engineer the outcome to make it good. Some of the most important things that will happen to you this month are not on any agenda. They will arrive sideways, at dinner, in a conversation you didn\u2019t plan. Let them.",
      "Perfectionism is just fear with better posture. Control is just fear with a spreadsheet. We see through both.",
    ],
    closing:
      "Walk through the door before you\u2019re ready. Then see what the door had in mind.",
  },
  {
    title: "Radiate Kindness",
    subtitle:
      "Not performative niceness \u2014 the real thing. And not just within these walls.",
    paragraphs: [
      "The kind that notices when someone\u2019s gone quiet and asks. The kind that holds space for a hard Tuesday alongside a golden one. The kind that remembers what you mentioned once, weeks ago, and checks in.",
      "But we also believe that kindness is not a private practice. The people in this house are here because they sense there\u2019s a more intelligent, more humane way to live \u2014 and they want to build it. Radiating kindness means bringing that same warmth into your work, your leadership, the things you create and send into the world. It is a posture, not just a feeling. A moral stance, not just a mood.",
      "You will not be required to be okay when you are not. You will only be required to be honest about it.",
    ],
    closing:
      "We hold the good days and the hard ones with the same two hands \u2014 and then we take those hands back into the world.",
  },
  {
    title: "Explore with Curiosity",
    subtitle:
      "We stay open. To the idea that arrived sideways. To the answer that arrived before we knew the question. To the thing that\u2019s trying to emerge if we\u2019d only stop planning long enough to notice it.",
    paragraphs: [
      "Curiosity here means more than intellectual openness. It means trusting the process over the plan. It means sitting with not-knowing long enough for something true to surface. The most interesting things rarely arrive when summoned \u2014 they arrive when you\u2019ve finally stopped trying to summon them and started paying attention to what\u2019s already in the room.",
      "We don\u2019t have it all figured out. None of us do. That\u2019s not a problem. That\u2019s the whole point of being here.",
    ],
    closing:
      "Ask the question. Especially the one that feels too simple, too strange, or too honest. Then wait. Something worth waiting for is coming.",
  },
  {
    title: "Abundant Playfulness",
    subtitle: "Life is too short and work is too serious not to play.",
    paragraphs: [
      "We bring levity to the heavy stuff, delight to the ordinary, and a willingness to be a little \u2014 or a lot \u2014 ridiculous when the moment calls for it.",
      "The dance hall is not decorative. The laughter at dinner is not a distraction. The game that breaks out on a Tuesday afternoon is doing more work than it looks like.",
      "Play is not the opposite of depth. It is how depth arrives without crushing you.",
    ],
    closing: "Delight is a spiritual practice. We take it very seriously.",
  },
  {
    title: "Make Meaningful Connections",
    subtitle:
      "Not connections as transactions. Connections as the actual point. And connections that ripple outward \u2014 beyond this valley, beyond this month, into the world you\u2019re building.",
    paragraphs: [
      "We are here to know each other. The real version. The one that comes out at 11pm when the conversation goes somewhere unexpected and nobody wants to leave.",
      "But meaningful connection at Dream House has always had a second dimension. The people in this room are not just here for themselves. They are founders, makers, builders, thinkers \u2014 people who want to do something with their one life that actually matters. The connections made here are not souvenirs. They are the beginning of collaborations, projects, movements, friendships that go on to change things.",
      "We connect deeply with each other in service of something larger than ourselves. That is what makes this more than a lovely month in Portugal.",
    ],
    closing:
      "We are here to be known. And then, known, to go and do the thing we came here to do.",
  },
];

export default function ValuesContent() {
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
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-dark)",
              marginBottom: "1.25rem",
            }}
          >
            <em style={{ color: "var(--coral)", fontStyle: "italic" }}>DREAM</em>
            <br />
            Values
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-soft)",
              maxWidth: "480px",
              marginBottom: "3rem",
            }}
          >
            Every house has a heartbeat. Ours has five.
          </motion.p>
        </section>

        {/* Content container */}
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 2rem 6rem" }}>

          {/* Divider */}
          <hr style={{ border: "none", height: "1px", background: "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)", margin: "0 auto 3rem", maxWidth: "480px" }} />

          {/* Intro */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "clamp(1.05rem, 2vw, 1.2rem)", lineHeight: 1.85, color: "var(--text-mid)" }}>
              <p>
                These aren&apos;t rules posted on a wall. They&apos;re not a code
                of conduct. They&apos;re the living, breathing agreement we make
                with each other the moment we walk through the door &mdash; the
                invisible architecture that holds everything else up.
              </p>
              <p>
                When in doubt, return here. When lost, return here. When
                you&apos;ve had a hard day and can&apos;t remember why you came
                &mdash; return here.
              </p>
            </div>
          </motion.section>

          {/* Values */}
          {VALUES.map((value, idx) => {
            const accent = VALUE_COLORS[value.title];
            return (
              <div key={value.title}>
                {/* Coloured rule divider */}
                <div style={{ display: "flex", justifyContent: "center", margin: "3rem auto" }}>
                  <div style={{ width: "80px", height: "1px", backgroundColor: `${accent}66` }} />
                </div>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ marginBottom: 0 }}
                >
                  {/* Value title with left accent bar */}
                  <h2
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "clamp(2rem, 5vw, 3.2rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.15,
                      color: "var(--text-dark)",
                      borderLeft: `4px solid ${accent}`,
                      paddingLeft: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {value.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1.65,
                      color: "var(--text-soft)",
                      marginBottom: "2rem",
                    }}
                  >
                    {value.subtitle}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.85, color: "var(--text-mid)", marginBottom: "1.75rem" }}>
                    {value.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "clamp(1rem, 2vw, 1.15rem)",
                      fontStyle: "italic",
                      lineHeight: 1.65,
                      color: accent,
                      opacity: 0.7,
                    }}
                  >
                    {value.closing}
                  </p>
                </motion.section>
              </div>
            );
          })}

          {/* Final divider */}
          <div style={{ display: "flex", justifyContent: "center", margin: "3rem auto" }}>
            <div style={{ width: "80px", height: "1px", background: "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)" }} />
          </div>

          {/* Closing — D·R·E·A·M reveal */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ marginBottom: "5rem", textAlign: "center" }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                fontStyle: "italic",
                color: "var(--text-soft)",
                marginBottom: "1rem",
              }}
            >
              These five things, held together, spell something.
            </p>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                fontStyle: "italic",
                color: "var(--text-soft)",
                marginBottom: "2.5rem",
              }}
            >
              Not by accident.
            </p>

            {/* Animated D·R·E·A·M */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.3em",
                marginBottom: "2rem",
              }}
            >
              {DREAM_LETTERS.map((item, i) => (
                <motion.span
                  key={item.letter}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  animate={{
                    textShadow: [
                      `0 0 0px ${item.color}00`,
                      `0 0 20px ${item.color}88`,
                      `0 0 0px ${item.color}00`,
                    ],
                  }}
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: item.color,
                    display: "inline-block",
                  }}
                >
                  {item.letter}
                </motion.span>
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                fontStyle: "italic",
                color: "var(--text-soft)",
              }}
            >
              Go build one.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
