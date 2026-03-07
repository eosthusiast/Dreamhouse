"use client";

import { motion } from "motion/react";
import Navigation from "@/components/layout/Navigation";

export default function ValuesContent() {
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
          The DREAM Values
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl font-playfair italic"
          style={{ color: "rgba(26,26,26,0.77)" }}
        >
          Every house has a heartbeat. Ours has five.
        </motion.p>
      </section>

      {/* Content container */}
      <div className="max-w-[750px] mx-auto px-8 md:px-6 pb-24">
        {/* Divider */}
        <div className="flex justify-center my-6 md:my-10">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Intro */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <div
            className="space-y-6 text-lg md:text-xl leading-relaxed"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
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
        {[
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
            subtitle:
              "Life is too short and work is too serious not to play.",
            paragraphs: [
              "We bring levity to the heavy stuff, delight to the ordinary, and a willingness to be a little \u2014 or a lot \u2014 ridiculous when the moment calls for it.",
              "The dance hall is not decorative. The laughter at dinner is not a distraction. The game that breaks out on a Tuesday afternoon is doing more work than it looks like.",
              "Play is not the opposite of depth. It is how depth arrives without crushing you.",
            ],
            closing:
              "Delight is a spiritual practice. We take it very seriously.",
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
        ].map((value) => (
          <div key={value.title}>
            {/* Divider */}
            <div className="flex justify-center my-12 md:my-18">
              <div
                className="w-16 h-px"
                style={{ backgroundColor: "rgba(26,26,26,0.30)" }}
              />
            </div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-0"
            >
              <h2
                className="text-4xl md:text-5xl mb-4 md:mb-6 leading-tight font-playfair text-center"
                style={{ color: "rgba(26,26,26,1)" }}
              >
                {value.title}
              </h2>

              <p
                className="text-lg md:text-xl leading-relaxed text-center mb-8 font-playfair italic"
                style={{ color: "rgba(26,26,26,0.77)" }}
              >
                {value.subtitle}
              </p>

              <div
                className="space-y-6 text-lg md:text-xl leading-relaxed mb-8"
                style={{ color: "rgba(26,26,26,0.90)" }}
              >
                {value.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <p
                className="text-lg md:text-xl leading-relaxed font-playfair italic"
                style={{ color: "rgba(26,26,26,0.77)" }}
              >
                {value.closing}
              </p>
            </motion.section>
          </div>
        ))}

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
          <p
            className="text-lg md:text-xl leading-relaxed mb-4 font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            These five things, held together, spell something.
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed mb-8 font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            Not by accident.
          </p>

          <p
            className="text-3xl md:text-5xl font-playfair tracking-widest mb-8"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            D · R · E · A · M
          </p>

          <p
            className="text-xl md:text-2xl font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            Go build one.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
