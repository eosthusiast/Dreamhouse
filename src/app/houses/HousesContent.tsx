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

const PHASE_COLORS = ["#e8806a", "#e8b84b", "#8cb89a", "#b8a8d4"];

const PHASES = [
  {
    phase: "Phase I · Week One",
    title: "Connection",
    subtitle: "Safety. Identity. Landing.",
    body: "We begin by arriving, truly arriving. Establishing safety, structure, and the feeling of home. Connecting to mind, body, spirit, heart, nature. To each other. To yourself. This is where the masks begin to soften.",
  },
  {
    phase: "Phase II · Week Two",
    title: "Exploration",
    subtitle: "Wonder. Edges. The unknown.",
    body: "We begin to move. Test limits. Gather information. Differentiate. Step into the unfamiliar, in your work, your conversations, your sense of what\u2019s possible. Leave the comfort zone, gently but deliberately.",
  },
  {
    phase: "Phase III · Week Three",
    title: "Expansion",
    subtitle: "MAGIK. Heat. Breakthrough.",
    body: "Witness what ignites when we bring heat. Incubate, create, release. Break the patterns that no longer serve you. This is the week of transformation, the one that earns the name.",
  },
  {
    phase: "Phase IV · Week Four",
    title: "Integration",
    subtitle: "Ground. Reorganise. Carry forward.",
    body: "Stabilise what was gained. Reorganise around a new level of coherence. Make it real, plan, commit, account. Leave not just changed, but anchored in that change.",
  },
];

const PRICING_TIERS = [
  {
    tier: "\u20AC3,000 \u2014 The Foundation Tier",
    desc: "This covers everything. Venue, food, chef, operations etc.",
    accent: "#e8806a",
  },
  {
    tier: "Between the two \u2014 The Sustaining Tier",
    desc: "Anything above the floor helps cover the personal costs of creating this experience, and funds financial aid so others who couldn\u2019t otherwise attend, can.",
    accent: "#e8b84b",
  },
  {
    tier: "\u20AC10,000 \u2014 The Generous Tier",
    desc: "If there is surplus, it flows back into the experience itself, and into projects that support local communities.",
    accent: "#8cb89a",
  },
];

function ThinRule() {
  return (
    <hr
      style={{
        border: "none",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)",
        margin: "3rem auto",
        maxWidth: "480px",
      }}
    />
  );
}

export default function HousesContent() {
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
            <em style={{ color: "var(--coral)", fontStyle: "italic" }}>Houses</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-soft)",
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <span>Past: El Salvador February 2025</span>
          </motion.div>
        </section>

        {/* Content container */}
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 2rem 6rem" }}>
          {/* Portugal Chapter */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.54rem, 3.15vw, 2.45rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              Next chapter:{" "}
              <a
                href="https://maps.app.goo.gl/2i8Y1mDy1rbo8vun6"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--coral)",
                  textDecoration: "none",
                }}
              >
                Fools Valley, Portugal
              </a>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                fontStyle: "italic",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              4th July &ndash; 2nd August 2026
            </p>
          </motion.section>

          <ThinRule />

          {/* The Enchanted Valley */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              The Enchanted Valley
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.85, color: "var(--text-mid)" }}>
              <p>Deep in Portugal, there is a place called Fools Valley.</p>
              <p>
                Down a road that feels like it&apos;s keeping a secret. Past the
                olive groves. Into a private valley that somehow manages to be
                thirty minutes from Lisbon and twenty from the Atlantic and feel
                like neither. Like something older. Something that was waiting.
              </p>
              <p>
                This is your home for the month. Not a hotel. Not a venue. A home
                with a pool, a pond, a sauna, a dance hall, a co-working space
                where ideas arrive easily, and a private chef who conjures three
                nourishing meals a day from things that grew nearby.
              </p>
              <p>
                Everything here is designed, quietly and carefully, to bring you
                back to yourself. Your circadian rhythm, the one the modern world
                quietly broke slowly returns. You sleep deeply. Think clearly. Feel
                more like yourself, or perhaps like the person you always suspected
                you could be.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem 1rem",
                justifyContent: "center",
                marginTop: "2.5rem",
                color: "var(--text-soft)",
                fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              }}
            >
              {[
                "Private bedrooms", "Co-working space", "Sauna & pool",
                "Private pond", "Dance hall", "Private chef",
                "3 meals daily", "Workshop spaces",
                "30 min from Lisbon", "20 min from the Ocean",
                "Alcohol & Cigarette free",
              ].map((item, i) => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {i > 0 && <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>·</span>}
                  {item}
                </span>
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                color: "var(--text-soft)",
                textAlign: "center",
                marginTop: "2.5rem",
                lineHeight: 1.7,
              }}
            >
              Enough structure to hold you.
              <br />
              Enough spaciousness to surprise you.
            </p>
          </motion.section>

          <ThinRule />

          {/* Shape of the Month */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              The Shape of the Month
            </h2>

            <div
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.85,
                color: "var(--text-mid)",
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                Every real transformation moves through four rooms.
                <br />
                We&apos;ve made space for all of them.
              </p>
              <p>
                This isn&apos;t a schedule. It&apos;s an arc. A living, breathing
                container that holds you differently as the month unfolds &mdash;
                moving from roots, to edges, to fire, to ground.
              </p>
            </div>

            {/* Phases */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {PHASES.map((phase, i) => {
                const accent = PHASE_COLORS[i];
                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Numbered circle badge */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: "2.4rem",
                        height: "2.4rem",
                        borderRadius: "50%",
                        backgroundColor: `${accent}22`,
                        border: `2px solid ${accent}66`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-nunito)",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: accent,
                        marginTop: "0.2rem",
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Content with left accent border */}
                    <div
                      style={{
                        borderLeft: `3px solid ${accent}55`,
                        paddingLeft: "1.25rem",
                        flex: 1,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-nunito)",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          color: accent,
                          marginBottom: "0.5rem",
                          opacity: 0.85,
                        }}
                      >
                        {phase.phase}
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-fraunces)",
                          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                          fontWeight: 400,
                          color: "var(--text-dark)",
                          marginBottom: "0.35rem",
                        }}
                      >
                        {phase.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-fraunces)",
                          fontSize: "1rem",
                          fontStyle: "italic",
                          color: "var(--text-soft)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {phase.subtitle}
                      </p>
                      <p
                        style={{
                          fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                          lineHeight: 1.8,
                          color: "var(--text-mid)",
                        }}
                      >
                        {phase.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <ThinRule />

          {/* Rituals & Rhythms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              The Rituals &amp; the Rhythms
            </h2>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "2.5rem",
              }}
            >
              Enough structure to hold you, enough spaciousness to surprise you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {[
                { icon: "🌙", title: "The Opening Ceremony: A Mystery School for Connection", body: "Your first weekend together is a mystery school for connection. Everyone must arrive by 12pm on July 4th. It\u2019s super important we open the experience together." },
                { icon: "🪄", title: "Whiteboard", body: "A whiteboard that each of you is encouraged to fill with your ideas and offerings." },
                { icon: "🍵", title: "Daily Rituals", body: "Sunrise tea ceremonies, morning intention settings, movement, lunch & learns\u2026" },
                { icon: "💻", title: "Deep Work", body: "Opportunities created to get into deep focus with supportive accountability and collaboration if useful. It could be your most productive month of the year." },
                { icon: "✨", title: "Peer Workshops", body: "Everyone in this house knows something the others don\u2019t. We make structured space for that exchange. You will teach. You will be taught. Often by the person you least expected." },
                { icon: "🌿", title: "Giving Back", body: "Opportunities to give back to the local community. Being of service." },
                { icon: "🔮", title: "Community & Hosting", body: "Some days the valley belongs only to us \u2014 intimate, held, sacred. Other days we open the gates and invite our wider European community in. Both are part of the magic." },
              ].map((ritual) => (
                <motion.div
                  key={ritual.title}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
                >
                  <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>
                    {ritual.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "clamp(1rem, 2vw, 1.15rem)",
                        fontWeight: 400,
                        color: "var(--text-dark)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {ritual.title}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
                        lineHeight: 1.75,
                        color: "var(--text-mid)",
                      }}
                    >
                      {ritual.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <ThinRule />

          {/* French Castle */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                marginBottom: "1.5rem",
              }}
            >
              And Then &mdash; A French Castle
            </h2>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.85,
                color: "var(--text-mid)",
              }}
            >
              For those who wish to continue the story, an invitation awaits. The
              week immediately after Portugal, a curated festival in a stunning
              ch&acirc;teau in France. The same spirit. A grander stage. Optional.
              Beautiful. And for the right person, inevitable.
            </p>
          </motion.section>

          <ThinRule />

          {/* Economics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              The Economics of a
              <br />
              Month Well Lived
            </h2>

            <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.85, color: "var(--text-mid)", marginBottom: "1.5rem" }}>
              Here is some context before the numbers. People spend, on average:
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { amount: "\u20AC5,000", desc: "on Burning Man \u2014 one week" },
                { amount: "\u20AC3,000", desc: "on a mystery school \u2014 one week" },
                { amount: "\u20AC3,000", desc: "on a retreat \u2014 one week" },
                { amount: "\u20AC3,000", desc: "on a conference \u2014 a few days" },
                { amount: "\u20AC4,000+", desc: "on an accelerator \u2014 an intensive week" },
                { amount: "\u20AC2,000", desc: "on a festival \u2014 a long weekend" },
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", fontSize: "clamp(1rem, 2vw, 1.1rem)" }}>
                  <span style={{ color: "var(--gold)", fontSize: "0.65rem", marginTop: "0.45rem", flexShrink: 0 }}>✦</span>
                  <span style={{ color: "var(--text-dark)" }}>
                    <strong>{item.amount}</strong>{" "}
                    <span style={{ color: "var(--text-mid)" }}>{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.85, color: "var(--text-mid)", marginBottom: "1.5rem" }}>
              Some of them are extraordinary. None of them are a month in a
              private valley with a private chef, your own room, daily rituals,
              deep work, genuine community, and a mystery school opening ceremony,
              twenty minutes from the Atlantic.
            </p>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                color: "var(--text-dark)",
              }}
            >
              Dream House is a month. And it runs on a sliding scale.
            </p>
          </motion.section>

          <ThinRule />

          {/* Pricing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "0.75rem",
              }}
            >
              Choose Your Investment
            </h2>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "0.75rem",
              }}
            >
              &euro;3,000 &ndash; &euro;10,000
            </p>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "2.5rem",
              }}
            >
              You decide what you pay. Truly.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              {PRICING_TIERS.map((item) => (
                <div
                  key={item.tier}
                  style={{
                    backgroundColor: `${item.accent}0f`,
                    borderTop: `3px solid ${item.accent}88`,
                    borderRadius: "12px",
                    padding: "1.5rem 1.75rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                      fontWeight: 400,
                      color: "var(--text-dark)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.tier}
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
                      lineHeight: 1.75,
                      color: "var(--text-mid)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.15rem)",
                fontWeight: 400,
                color: "var(--text-dark)",
                marginBottom: "0.4rem",
              }}
            >
              Financial Aid Available
            </p>
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
                lineHeight: 1.75,
                color: "var(--text-mid)",
                marginBottom: "2rem",
              }}
            >
              Send Carolin a message. This is dependant on others paying above
              the foundational tier.
            </p>

            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                lineHeight: 1.85,
                color: "var(--text-soft)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p>
                This is a not-for-profit. There is no profit motive here. The
                sliding scale exists because we believe the right people
                shouldn&apos;t be kept away by money, and those who have more of
                it can help make that possible. Pricing is honour-based. We trust
                you to know which number feels right to you.
              </p>
              <p>
                Any money left over goes to financial aid for future participants,
                and to community work in the local environment.
              </p>
            </div>
          </motion.section>

          <ThinRule />

          {/* Closing */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ marginBottom: "5rem", textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                color: "var(--text-soft)",
                lineHeight: 2,
                marginBottom: "2rem",
              }}
            >
              <p>The valley is waiting.</p>
              <p>The chef is sharpening their knives.</p>
              <p>The pond is still.</p>
              <p>The sauna is warm.</p>
            </div>

            <div
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                lineHeight: 1.85,
                color: "var(--text-mid)",
                marginBottom: "2rem",
              }}
            >
              <p>The masks are ready to dissolve.</p>
              <p>The magic is ready to sparkle.</p>
            </div>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                fontWeight: 400,
                color: "var(--text-dark)",
              }}
            >
              All that&apos;s missing is you.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
