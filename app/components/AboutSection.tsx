"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function AboutSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section className="bg-[#f8f7f5] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 items-stretch gap-12">
        {/* Left Content */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="uppercase text-sm tracking-widest text-[#6d7a5d] mb-4">
              Physiotherapy
            </p>

            {/* Animated Heading */}
            <motion.h2
              className="text-4xl md:text-6xl font-libertinus text-green-700 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              whileHover={{ scale: 1.05, color: "#16a34a" }}
            >
              Excellence in care, <br /> delivered with pride
            </motion.h2>

            <p className="text-gray-900 text-lg leading-relaxed mb-6">
              We are committed to providing the highest standards of service,
              where compassion meets expertise. Every step of your journey with
              us is guided by dedication, integrity, and a genuine focus on your
              well-being.
            </p>
          </div>

          {/* Bottom Image with overlay */}
          <div className="relative w-full h-[250px] md:h-[300px] rounded overflow-hidden shadow-lg group">
            <Image
              src="/about-2.webp"
              alt="Additional Physiotherapy"
              fill
              className="object-cover"
            />
            {/* Shadow overlay */}
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0"></div>
          </div>
        </div>

        {/* Right Image with overlay */}
        <div className="relative w-full h-[500px] rounded overflow-hidden shadow-lg group">
          <Image
            src="/about-1.avif"
            alt="Physiotherapy Session"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0"></div>
        </div>
      </div>
    </section>
  );
}
