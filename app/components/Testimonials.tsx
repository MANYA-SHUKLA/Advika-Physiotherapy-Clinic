"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The doctor and atmosphere is very good. Doctor is doing good job with complete dedication. I earlier visited two more centers for my slip disc related pain issue but could get relax in my pain only here. Highly recommended.",
      name: "Mohit Agarwal",
      image: "/mohitaggarwal.png",
    },
    {
      quote:
        "Advika Physiotherapy Clinic is a one stop solution for all Physiotherapy treatments & Dr. Swati Sharma is expert in handling her patients with care & humbleness.",
      name: "Sandeep Mishra",
      image: "/sandeepmishra.png",
    },
    {
      quote:
        "Excellent experience at Advik Phyisotherpy Clinic. The physiotherapists is knowledgeable, friendly, and truly care about the patients' well-being. The facility is clean, modern, and well-equipped.",
      name: "Himansu Maheshwari",
      image: "/himanshu.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide every 2s (faster)
  useEffect(() => {
    if (!paused) {
      const timer = setInterval(nextTestimonial, 2000); // 2 seconds
      return () => clearInterval(timer);
    }
  }, [paused]);

  return (
    <section className="bg-[#f8f7f5] py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-libertinus text-green-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          whileHover={{ scale: 1.05, color: "#16a34a" }}
        >
          What our patients say
        </motion.h2>

        {/* Testimonial Card */}
        <div className="relative h-[300px] md:h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute bg-white shadow-lg rounded-xl p-10 w-full hover:scale-105 transition-transform duration-300"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <p className="text-xl md:text-2xl text-[#1e3a8a] italic leading-relaxed mb-8 group-hover:text-[#2563eb] transition-colors">
                “{testimonials[current].quote}”
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden transition-transform duration-300 hover:scale-110">
                  <Image
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#1e3a8a] group-hover:text-[#2563eb] transition-colors">
                    {testimonials[current].name}
                  </h3>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition"
          >
            ←
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
