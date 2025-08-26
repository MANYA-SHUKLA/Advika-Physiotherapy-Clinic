"use client";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a34] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo + Mission + Map */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Advika Clinic</h2>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Helping you move better, recover faster, and live pain-free with expert physiotherapy care.
          </p>
          <div className="w-full h-40 md:h-48 rounded-md overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.5684061131738!2d77.4210811!3d28.7025545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1cf52a6bbf5%3A0x6f22d64d1b688621!2sAdvika%20Physiotherapy%20Clinic!5e0!3m2!1sen!2sin!4v1754459893909!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "Our Services", href: "/services" },
              { name: "Meet the Team", href: "/team" },
              { name: "Patient Testimonials", href: "/testimonials" },
              { name: "Book Appointment", href: "/booking" },
              { name: "Contact Us", href: "/contact" },
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="hover:text-white hover:translate-x-1 transition inline-block"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 text-[#34d399]" />
              <span>
                D 008, Ajnara Integrity, Raj Nagar Extension,<br />
                Ghaziabad, Uttar Pradesh 201017
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#34d399]" />
              <a href="tel:+917381019858" className="hover:text-white">
                +91 73810 19858
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#34d399]" />
              <a href="mailto:info@advikaclinic.com" className="hover:text-white">
                swati6213@gmail.com
              </a>
            </li>
          </ul>

          {/* Socials */}
          <div className="flex gap-4 mt-5">
            <a href="" aria-label="Facebook" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/advikaphysiotherapyclinic?igsh=MWNqZWdhYWd1MmVmeA==" aria-label="Instagram" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/dr-swati-sharma-pt-a597a81b1/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Informed</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe for clinic updates, new treatments, and health tips.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34d399]"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#34d399] text-gray-900 font-medium hover:bg-[#2bb983] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} Advika Physiotherapy Clinic. All rights reserved. |{" "}
          <a href="/privacy" className="hover:text-white">Privacy Policy</a> |{" "}
          <a href="/terms" className="hover:text-white">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
