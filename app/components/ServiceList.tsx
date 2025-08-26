"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function ServiceList() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  const services = [
    {
      number: "01",
      title: "Post-Surgery Recovery",
      description:
        "Guided rehabilitation programs designed to restore strength, mobility, and confidence after surgery, ensuring a smooth and safe recovery.",
    },
    {
      number: "02",
      title: "Chronic Pain Relief",
      description:
        "Personalized therapies that target the root cause of persistent pain, helping you regain comfort, function, and quality of life.",
    },
    {
      number: "03",
      title: "Sports Injury Rehab",
      description:
        "Specialized treatment plans to accelerate healing, prevent re-injury, and get athletes back to peak performance with confidence.",
    },
  ];

  return (
    <section className="bg-[#f8f7f5] py-20">
      <div className="max-w-7xl mx-auto px-10 md:px-15">
        {/* Subtitle */}
        <motion.p
          className="uppercase text-sm tracking-widest text-green-900 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          What we offer
        </motion.p>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-libertinus text-green-700 mb-15"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          whileHover={{ scale: 1.02, color: "#16a34a" }}
        >
          Exceptional Physiotherapy <br /> Care for Your Wellness
        </motion.h2>

        <motion.hr
          className="border-green-300 mb-12"
          initial={{ opacity: 0 }}
          animate={controls}
        />

        {/* Service Items */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group flex flex-col md:flex-row md:items-center md:justify-between border-b border-green-200 pb-8 transition"
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Left - Number & Title */}
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <span className="text-6xl font-extralight text-green-200 transition-colors duration-300 group-hover:text-green-900">
                  {service.number}
                </span>
                <h3 className="text-3xl font-medium text-green-800 transition-colors duration-300 group-hover:text-green-900">
                  {service.title}
                </h3>
              </div>

              {/* Right - Description + Arrow */}
              <div className="flex items-center justify-between md:w-2/3">
                <p className="text-green-900 text-base leading-relaxed transition-colors duration-300 group-hover:text-green-800">
                  {service.description}
                </p>
                <button className="ml-4 w-10 h-10 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition">
                  →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
