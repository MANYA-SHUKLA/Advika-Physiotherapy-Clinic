"use client";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const openWhatsApp = () => {
    const phoneNumber = "918005586588";
    const message = "Hello, I would like to book an appointment or get more information about your services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage("Please enter your email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-[#1e3a34] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
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
            
            <button onClick={openWhatsApp} aria-label="WhatsApp" className="hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .160 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
              </svg>
            </button>
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Informed</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe for clinic updates, new treatments, and health tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34d399]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#34d399] text-gray-900 font-medium hover:bg-[#2bb983] transition disabled:opacity-70"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`mt-2 text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
          <button
            onClick={openWhatsApp}
            className="w-full mt-4 px-5 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.150-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .160 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
            </svg>
            Message on WhatsApp
          </button>
        </div>
      </div>

      
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