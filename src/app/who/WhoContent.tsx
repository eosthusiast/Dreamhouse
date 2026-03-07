"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";

export default function WhoContent() {
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
          Who Is This For?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl font-playfair italic"
          style={{ color: "rgba(26,26,26,0.77)" }}
        >
          You already know.
        </motion.p>
      </section>

      {/* Content container */}
      <div className="max-w-[750px] mx-auto px-8 md:px-6 pb-24">
        {/* Divider */}
        <div className="flex justify-center my-6 md:my-10">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Interested CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18 text-center"
        >
          <h2
            className="text-4xl md:text-5xl mb-6 leading-tight font-playfair"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            You&apos;re interested then?
          </h2>
          <a
            href="https://forms.gle/SPc8q7K1UsmV5iWF9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl md:text-2xl font-playfair italic text-warm-gold hover:underline transition-colors duration-300"
          >
            Click here
          </a>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Ambitious Weirdos */}
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
            This is for the
            <br />
            ambitious weirdos.
          </h2>

          <p
            className="text-base md:text-lg leading-loose mb-6 tracking-wide font-playfair italic"
            style={{ color: "rgba(26,26,26,0.90)" }}
          >
            The Genuinely Good Eggs.
            <br />
            The Kind · The Curious · The Mischievous
            <br />
            The Morally Ambitious · The Creatives
            <br />
            The Wonderers · The Builders · The Dreamers
          </p>

          <p
            className="text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            The ones who are done waiting for life to get interesting
            <br className="hidden md:block" />
            {" "}and have decided to make it that way themselves.
          </p>

          <div className="text-left">
            <ul
              className="space-y-3 text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: "rgba(26,26,26,1)" }}
            >
              {[
                "You want to experiment with how to live more fully",
                "You want to figure out how to be of greater service to the world",
                "You\u2019re ready to dream bigger than you\u2019ve let yourself before",
                "You believe joy and ambition belong in the same room",
                "You\u2019re genuinely interested in other people \u2014 not just networking, actually interested",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-warm-gold mt-1.5 text-xs">&#x2726;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p
            className="text-lg md:text-xl leading-relaxed font-playfair italic"
            style={{ color: "rgba(26,26,26,0.77)" }}
          >
            You don&apos;t need to have it figured out.
            <br />
            You just need to be willing to show up and find out.
          </p>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Not For You */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-8 md:mb-10 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            This probably
            <br />
            isn&apos;t for you if
          </h2>

          <div className="space-y-7">
            {[
              {
                title: "You need alcohol to have fun",
                body: "Dream House runs on something different. Genuine connection, deep conversation, and a dance hall that doesn\u2019t need a bar to get going.",
              },
              {
                title: "You\u2019re looking for a conference, a vacation, or a structured curriculum",
                body: "Dream House is a container, not a course. What you get out of it depends entirely on what you bring.",
              },
              {
                title: "You need every outcome guaranteed before you arrive",
                body: "The most important things that will happen to you here aren\u2019t on any agenda. They arrive sideways.",
              },
              {
                title: "You want to observe from the edges",
                body: "Everyone here contributes. That\u2019s not optional \u2014 it\u2019s the whole point.",
              },
              {
                title: "This is someone else\u2019s idea of your yes",
                body: "This has to come from you. Fully, freely, and genuinely.",
              },
            ].map((item) => (
              <div key={item.title} className="group">
                <p
                  className="text-lg md:text-xl mb-2 group-hover:text-warm-gold transition-colors duration-500 flex items-start gap-4"
                  style={{ color: "rgba(26,26,26,1)" }}
                >
                  <span className="text-warm-gold mt-1.5 text-xs">&#x2726;</span>
                  <span>{item.title}</span>
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed pl-7"
                  style={{ color: "rgba(26,26,26,0.90)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Different Fields */}
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
            Different fields.
            <br />
            Same orientation.
          </h2>

          <p
            className="text-lg md:text-xl leading-relaxed mb-8 text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            Founders, writers, designers, artists, researchers, builders,
            makers, coaches, strategists, photographers and everything in
            between. They come from different fields and different cities. What
            unites them isn&apos;t what they do. It&apos;s how they do it: with
            care, with curiosity, and with the quiet conviction that their work
            should mean something.
          </p>

          <p
            className="text-xl md:text-2xl mb-7 font-playfair italic text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            You might be a great fit if you
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Have something you\u2019re building that matters to you",
                body: "A project, a business, a body of work \u2014 and you want a month of real momentum on it",
              },
              {
                title: "Miss the kind of community you had earlier in life",
                body: "When interesting people were just around \u2014 and you haven\u2019t quite found that again since",
              },
              {
                title: "Get genuinely energised by people who think differently to you",
                body: "Not as a networking strategy. Just because other minds are one of life\u2019s great pleasures",
              },
              {
                title: "Are willing to be seen \u2014 and to see others \u2014 honestly",
                body: "The real version. Not the polished one",
              },
              {
                title: "Are ready to spend a month living beautifully instead of just efficiently",
                body: "Because those two things were never supposed to be opposites",
              },
            ].map((item) => (
              <div key={item.title}>
                <p
                  className="text-lg md:text-xl mb-1 flex items-start gap-3"
                  style={{ color: "rgba(26,26,26,1)" }}
                >
                  <span className="text-warm-gold text-xs mt-2">&#x2727;</span>
                  <span>{item.title}</span>
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed pl-6"
                  style={{ color: "rgba(26,26,26,0.90)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Who Am I */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <h2
            className="text-4xl md:text-5xl mb-8 md:mb-10 leading-tight font-playfair text-center"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            Who am I?
          </h2>

          <div className="mb-8">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl mb-8">
              <Image
                src="/Dreamhouse/images/who/carolin-beach-1.png"
                alt="Carolin Fleissner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 576px"
                priority
              />
            </div>

            <p
              className="text-2xl md:text-4xl mb-6 font-playfair italic text-center"
              style={{ color: "rgba(26,26,26,1)" }}
            >
              I&apos;m Carolin Fleissner
            </p>

            <div
              className="space-y-4 text-lg md:text-xl leading-relaxed"
              style={{ color: "rgba(26,26,26,1)" }}
            >
              <p>
                The Dream House was born from my lifelong fascination with what
                makes humans dream bigger, do the impossible, and live with more
                presence, vitality, and love.
              </p>
              <p>
                It emerged from a decade spent building intentional teams and
                cultures{" "}
                <em style={{ color: "rgba(26,26,26,0.77)" }}>
                  (which resulted in creating a multi-billion-dollar company that
                  taught cars to drive themselves.)
                </em>
              </p>
              <p>
                Combined with the last few years that I have spent immersing
                myself in transformational containers around the world. After
                witnessing how culture can drive billion-dollar innovation, I
                became fascinated by how it might shape more loving, creative,
                and conscious ways of living.
              </p>
              <p
                className="font-playfair italic text-xl md:text-2xl py-2"
                style={{ color: "rgba(26,26,26,1)" }}
              >
                This is my passionate project. A gift.
              </p>
              <p>
                I don&apos;t quite know why I pour so much of myself into
                building this, and yet, I know that I have to. That magic is
                waiting on the other side of it.
              </p>
              <p>
                I&apos;ll be in residence with you, not just coordinating from
                the sidelines. This is a shared experience, not a service.
              </p>
            </div>
          </div>

          {/* Additional photos */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-xl">
              <Image
                src="/Dreamhouse/images/who/carolin-beach-2.png"
                alt="Carolin at the beach"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 280px"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-xl">
              <Image
                src="/Dreamhouse/images/who/carolin-singing.png"
                alt="Carolin singing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 280px"
              />
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="flex justify-center my-12 md:my-18">
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,26,26,0.30)" }} />
        </div>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 text-center"
        >
          <p
            className="text-lg md:text-xl leading-relaxed mb-7"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            In 2025, we ran our first experiment. People called it
          </p>

          <div className="space-y-4 mb-10">
            {[
              "a home for inspiring people to be inspired",
              "a manifestation accelerator",
              "a container for miracles",
              "the most fertile soil for transformation",
            ].map((quote) => (
              <p
                key={quote}
                className="text-base md:text-xl font-playfair italic hover:text-warm-gold transition-colors duration-700 cursor-default"
                style={{ color: "rgba(26,26,26,0.64)" }}
              >
                &ldquo;{quote}&rdquo;
              </p>
            ))}
          </div>

          <div
            className="space-y-2 text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            <p>Some fell in love.</p>
            <p>Some launched companies.</p>
            <p>Others met parts of themselves they&apos;d never known.</p>
          </div>

          <p
            className="text-base md:text-xl leading-relaxed font-playfair italic"
            style={{ color: "rgba(26,26,26,1)" }}
          >
            It was the kind of place where
            <br />
            everything felt possible.
          </p>
          <p
            className="text-sm md:text-base mt-4 font-playfair italic"
            style={{ color: "rgba(26,26,26,0.51)" }}
          >
            As it does when you&apos;re surrounded by the right community.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
