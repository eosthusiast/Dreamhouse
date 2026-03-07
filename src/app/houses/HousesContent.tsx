"use client";

import { motion } from "motion/react";
import Navigation from "@/components/layout/Navigation";

export default function HousesContent() {
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
          Houses
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl font-playfair italic"
          style={{ color: "rgba(26,26,26,0.77)" }}
        >
          <p>Future: Portugal July 2026</p>
          <p>Past: El Salvador February 2025</p>
        </motion.div>
      </section>

      {/* Content container */}
      <div className="max-w-[750px] mx-auto px-8 md:px-6 pb-24">
        {/* Divider */}
        <div className="flex justify-center my-6 md:my-10">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Portugal Chapter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-4 md:mb-6 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            Portugal Chapter
          </h2>
          <p
            className="text-lg md:text-xl text-center mb-2 font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            4th July &ndash; 2nd August 2025
          </p>
          <p className="text-center mb-8">
            <a
              href="https://maps.app.goo.gl/2i8Y1mDy1rbo8vun6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-xl md:text-2xl"
              style={{ color: "#8a6a4a" }}
            >
              Fools Valley, Portugal
            </a>
          </p>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* The Enchanted Valley */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-6 md:mb-8 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            The Enchanted Valley
          </h2>

          <div
            className="space-y-6 text-lg md:text-xl leading-relaxed"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            <p>
              Deep in Portugal, there is a place called Fools Valley.
            </p>
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

          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-10 text-base md:text-lg"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            {[
              "Private bedrooms",
              "Co-working space",
              "Sauna & pool",
              "Private pond",
              "Dance hall",
              "Private chef",
              "3 meals daily",
              "Workshop spaces",
              "30 min from Lisbon",
              "20 min from the Ocean",
              "Alcohol & Cigarette free",
            ].map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && <span className="text-warm-gold text-xs">·</span>}
                {item}
              </span>
            ))}
          </div>

          <p
            className="text-center mt-10 text-lg md:text-xl font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            Enough structure to hold you.
            <br />
            Enough spaciousness to surprise you.
          </p>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* The Shape of the Month */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-6 md:mb-8 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            The Shape of the Month
          </h2>

          <div
            className="space-y-4 text-lg md:text-xl leading-relaxed text-center mb-12"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            <p>
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
          <div className="space-y-12">
            {[
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
            ].map((phase) => (
              <div key={phase.phase}>
                <p
                  className="text-sm md:text-base uppercase tracking-widest mb-2"
                  style={{ color: "rgba(26,26,26,0.50)" }}
                >
                  {phase.phase}
                </p>
                <h3
                  className="text-3xl md:text-4xl font-playfair mb-2"
                  style={{ color: "rgba(26,26,26,1)" }}
                >
                  {phase.title}
                </h3>
                <p
                  className="text-base md:text-lg font-playfair italic mb-4"
                  style={{ color: "rgba(26,26,26,0.77)" }}
                >
                  {phase.subtitle}
                </p>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{ color: "rgba(26,26,26,0.90)" }}
                >
                  {phase.body}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Rituals & Rhythms */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-6 md:mb-8 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            The Rituals & the Rhythms
          </h2>

          <p
            className="text-lg md:text-xl leading-relaxed text-center mb-10"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            Enough structure to hold you, enough spaciousness to surprise you.
          </p>

          <div className="space-y-8">
            {[
              {
                icon: "\uD83C\uDF19",
                title: "The Opening Ceremony: A Mystery School for Connection",
                body: "Your first weekend together is a mystery school for connection. Everyone must arrive by 12pm on July 4th. It\u2019s super important we open the experience together.",
              },
              {
                icon: "\uD83E\uDE84",
                title: "Whiteboard",
                body: "A whiteboard that each of you is encouraged to fill with your ideas and offerings.",
              },
              {
                icon: "\uD83C\uDF75",
                title: "Daily Rituals",
                body: "Sunrise tea ceremonies, morning intention settings, movement, lunch & learns\u2026",
              },
              {
                icon: "\uD83D\uDCBB",
                title: "Deep Work",
                body: "Opportunities created to get into deep focus with supportive accountability and collaboration if useful. It could be your most productive month of the year.",
              },
              {
                icon: "\u2728",
                title: "Peer Workshops",
                body: "Everyone in this house knows something the others don\u2019t. We make structured space for that exchange. You will teach. You will be taught. Often by the person you least expected.",
              },
              {
                icon: "\uD83C\uDF3F",
                title: "Giving Back",
                body: "Opportunities to give back to the local community. Being of service.",
              },
              {
                icon: "\uD83D\uDD2E",
                title: "Community & Hosting",
                body: "Some days the valley belongs only to us \u2014 intimate, held, sacred. Other days we open the gates and invite our wider European community in. Both are part of the magic.",
              },
            ].map((ritual) => (
              <div key={ritual.title} className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{ritual.icon}</span>
                <div>
                  <p
                    className="text-lg md:text-xl mb-1"
                    style={{ color: "rgba(26,26,26,1)" }}
                  >
                    {ritual.title}
                  </p>
                  <p
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: "rgba(26,26,26,0.90)" }}
                  >
                    {ritual.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* French Castle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18 text-center"
        >
          <h2
            className="text-4xl md:text-5xl mb-6 md:mb-8 leading-tight font-playfair"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            And Then &mdash; A French Castle
          </h2>

          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            For those who wish to continue the story, an invitation awaits. The
            week immediately after Portugal, a curated festival in a stunning
            ch&acirc;teau in France. The same spirit. A grander stage. Optional.
            Beautiful. And for the right person, inevitable.
          </p>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Economics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-6 md:mb-8 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            The Economics of a
            <br />
            Month Well Lived
          </h2>

          <p
            className="text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            Here is some context before the numbers. People spend, on average:
          </p>

          <ul className="space-y-3 text-lg md:text-xl leading-relaxed mb-8">
            {[
              { amount: "\u20AC5,000", desc: "on Burning Man \u2014 one week" },
              { amount: "\u20AC3,000", desc: "on a mystery school \u2014 one week" },
              { amount: "\u20AC3,000", desc: "on a retreat \u2014 one week" },
              { amount: "\u20AC3,000", desc: "on a conference \u2014 a few days" },
              { amount: "\u20AC4,000+", desc: "on an accelerator \u2014 an intensive week" },
              { amount: "\u20AC2,000", desc: "on a festival \u2014 a long weekend" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-warm-gold mt-1.5 text-xs">&#x2726;</span>
                <span style={{ color: "rgba(26,26,26,1)" }}>
                  <strong>{item.amount}</strong>{" "}
                  <span style={{ color: "rgba(26,26,26,0.90)" }}>{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>

          <p
            className="text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            Some of them are extraordinary. None of them are a month in a
            private valley with a private chef, your own room, daily rituals,
            deep work, genuine community, and a mystery school opening ceremony,
            twenty minutes from the Atlantic.
          </p>

          <p
            className="text-xl md:text-2xl font-playfair italic"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            Dream House is a month. And it runs on a sliding scale.
          </p>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Pricing */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-4 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            Choose Your Investment
          </h2>
          <p
            className="text-2xl md:text-3xl mb-8 md:mb-10 font-playfair text-center"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            &euro;3,000 &ndash; &euro;10,000
          </p>

          <p
            className="text-lg md:text-xl leading-relaxed text-center mb-10 font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            You decide what you pay. Truly.
          </p>

          <div className="space-y-8 mb-10">
            {[
              {
                tier: "\u20AC3,000 \u2014 The Foundation Tier",
                desc: "This covers everything. Venue, food, chef, operations etc.",
              },
              {
                tier: "Between the two \u2014 The Sustaining Tier",
                desc: "Anything above the floor helps cover the personal costs of creating this experience, and funds financial aid so others who couldn\u2019t otherwise attend, can.",
              },
              {
                tier: "\u20AC10,000 \u2014 The Generous Tier",
                desc: "If there is surplus, it flows back into the experience itself, and into projects that support local communities.",
              },
            ].map((item) => (
              <div key={item.tier}>
                <p
                  className="text-lg md:text-xl mb-1"
                  style={{ color: "rgba(26,26,26,1)" }}
                >
                  {item.tier}
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "rgba(26,26,26,0.90)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-lg md:text-xl mb-2"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            Financial Aid Available
          </p>
          <p
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            Send Carolin a message. This is dependant on others paying above
            the foundational tier.
          </p>

          <div
            className="text-base md:text-lg leading-relaxed font-playfair italic space-y-4"
            style={{ color: "rgba(26,26,26,0.77)" }}
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

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Closing */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 text-center"
        >
          <div
            className="space-y-2 text-lg md:text-xl leading-relaxed mb-10 font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            <p>The valley is waiting.</p>
            <p>The chef is sharpening their knives.</p>
            <p>The pond is still.</p>
            <p>The sauna is warm.</p>
          </div>

          <div
            className="space-y-2 text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            <p>The masks are ready to dissolve.</p>
            <p>The magic is ready to sparkle.</p>
          </div>

          <p
            className="text-2xl md:text-3xl font-playfair"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            All that&apos;s missing is you.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
