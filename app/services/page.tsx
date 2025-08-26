"use client";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      title: "Joint Pain Recovery",
      description:
        "Comprehensive rehabilitation programs designed to restore mobility, reduce pain, and help you return to daily activities after surgery.",
      icon: "/joint.svg",
      image: "/joint-pain.jpeg",
    },
    {
      title: "Muscle Rehabilitation",
      description:
        "Personalized physiotherapy treatments that target the root cause of pain to bring long-term relief and improved lifestyle.",
      icon: "/muscle.svg",
      image: "/muscle-rehabilitation.jpeg",
    },
    {
      title: "Paralysis Recovery",
      description:
        "Specialized rehab sessions to improve strength, motor control, and independence after paralysis.",
      icon: "/paralysis.svg",
      image: "/paralysis.png",
    },
    {
      title: "Bells Palsy Treatment",
      description:
        "Exercises and therapies designed to stimulate facial muscles and accelerate recovery from Bell's Palsy.",
      icon: "/bells-palsy.png",
      image: "/bells-palsy.webp",
    },
    {
      title: "Cerebral Palsy Care",
      description:
        "Gentle care and mobility-focused therapies to support children with cerebral palsy in leading independent lives.",
      icon: "/cerebral-palsy.svg",
      image: "/cerebral-palsy.jpeg",
    },
    {
      title: "Spinal Cord Injury",
      description:
        "Targeted rehabilitation to restore function, build strength, and maximize mobility after spinal cord injuries.",
      icon: "/spinalcord.svg",
      image: "/spinal-cord.webp",
    },
    {
      title: "Osteoarthritis Management",
      description:
        "Holistic treatment plans to reduce pain, strengthen joints, and improve mobility for osteoarthritis patients.",
      icon: "/arthritis.svg",
      image: "/osteoarthritis.webp",
    },
    {
      title: "Post Operative Care",
      description:
        "Comprehensive recovery programs with guided exercises to ensure smooth healing after surgery.",
      icon: "/care.svg",
      image: "/post-operative.jpeg",
    },
    {
      title: "Stroke Physical Therapy",
      description:
        "Neurological physiotherapy to regain motor skills, balance, and confidence after a stroke.",
      icon: "/stroke.svg",
      image: "/stroke.jpeg",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#f8f7f5] pt-28 pb-16 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-libertinus text-green-700 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          whileHover={{ scale: 1.05, color: "#16a34a" }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-gray-900 max-w-5xl mx-auto font-extrabold text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } }}
        >
          We provide specialized physiotherapy services designed to help you
          recover faster, move better, and live pain-free.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-500 hover:scale-105"
            >
              {/* Background image on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition duration-500"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>

              {/* Content */}
              <div className="relative z-10 bg-white/90 group-hover:bg-black/80 transition duration-500 p-8 h-full flex flex-col items-center text-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-20 h-20 mb-6 transition duration-500 group-hover:filter group-hover:invert group-hover:brightness-150 group-hover:hue-rotate-60"
                />
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-[#39ff14] transition duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-[#39ff14] leading-relaxed transition duration-500">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1e3a34] via-[#245b52] to-[#2f5f4a] text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-libertinus mb-6">
            Ready to start your recovery journey?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Book your appointment today and take the first step towards pain-free living.
          </p>
          <a
            href="/booking"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#34d399] to-[#059669] text-white text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300"
          >
            Book an Appointment
          </a>
        </div>
      </section>
    </main>
  );
}
