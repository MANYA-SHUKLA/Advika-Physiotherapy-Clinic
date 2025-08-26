"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function Services() {
  const services = [
    {
      title: "Joint Pain",
      description:
        "Relieves stiffness, improves mobility, and reduces pain in affected joints.",
      icon: "/joint.png",
    },
    {
      title: "Muscle Weakness",
      description:
        "Strengthens muscles through targeted exercises and rehabilitation.",
      icon: "/muscle.svg",
    },
    {
      title: "Paralysis treatment",
      description:
        "Restores movement and function with specialized physiotherapy techniques.",
      icon: "/paralysis1.png",
    },
    {
      title: "Bell's Palsy Treatment",
      description:
        "Improves facial muscle strength and coordination after nerve weakness.",
      icon: "/bells-palsy.png",
    },
    {
      title: "Cerebral Palsy Treatment",
      description:
        "Enhances mobility, balance, and daily function in children and adults.",
      icon: "/cerebral-palsy.svg",
    },
    {
      title: "Spinal Cord Injury Treatment",
      description:
        "Aids recovery, independence, and prevention of complications.",
      icon: "/spinal-cord.png",
    },
    {
      title: "Osteoarthritis Treatment",
      description:
        "Reduces pain, improves flexibility, and strengthens supporting muscles.",
      icon: "/arthritis.png",
    },
    {
      title: "Post Operative Care",
      description:
        "Accelerates recovery, restores strength, and prevents stiffness after surgery.",
      icon: "/care.svg",
    },
    {
      title: "Stroke Physical Therapy",
      description:
        "Rebuilds movement, balance, and daily living skills after stroke.",
      icon: "/stroke.svg",
    },
  ];

  const controls = useAnimation();
  const [paused, setPaused] = useState(false);

  // Run animation on mount
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section className="bg-[#f8f7f5] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Subtitle */}
        <p className="text-sm tracking-widest text-gray-900 mb-3 uppercase">
          Try Today
        </p>

        {/* Title with entry + hover effect */}
        <motion.h2
          className="text-5xl md:text-7xl font-libertinus text-green-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          whileHover={{ scale: 1.05, color: "#16a34a" }}
        >
          Exceptional Experience
        </motion.h2>

        {/* Carousel */}
        <motion.div
          className="flex gap-6"
          animate={{ x: paused ? 0 : ["0%", "-100%"] }}
          transition={{
            repeat: paused ? 0 : Infinity,
            duration: 15,
            ease: "linear",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...services, ...services].map((service, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white border-1 shadow-sm rounded-xl p-8 
                         transition-all duration-300 ease-in-out 
                         hover:bg-green-100 hover:shadow-lg hover:scale-105"
            >
              <div className="flex justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-900 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm group-hover:text-green-800 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
