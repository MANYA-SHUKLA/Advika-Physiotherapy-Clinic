"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const openWhatsApp = () => {
    const phoneNumber = "918005586588";
    const message = "Hello, I would like to book an appointment or get more information about your services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };


  const isActiveLink = (href: string): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
  
      <div className="bg-[#0c332d] text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
              </svg>
              <span>swati6213@gmail.com</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>91+ 7381019858</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <a href="#" className="text-white hover:text-[#39ff14] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#39ff14] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#39ff14] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3.7 14.077c-1.75.362-5.453.362-7.203 0-1.896-.391-2.117-1.538-2.246-2.077-.02-.086-.029-.176-.029-.265v-2.97c0-.182.108-.35.27-.431l2.5-1.423c.094-.055.204-.055.298 0l2.5 1.423c.161.081.27.25.27.431v2.97c0 .089-.01.179-.03.265-.056.244-.172.642-1.017.898.26.432.908 1.01 1.746 1.45 1.28.663 2.954.785 3.787.580.138-.034.265-.111.354-.223a.476.476 0 00.107-.417c-.151-.693-1.126-1.153-1.806-1.344zm-2.55-3.392l-2.2-1.26 4.792-.027 1.408.805-4 .46v.022z"/>
                </svg>
              </a>
             
              <button onClick={openWhatsApp} className="text-white hover:text-[#39ff14] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                </svg>
              </button>
            </div>
            <div className="hidden md:block h-4 w-px bg-white/30"></div>
            <Link href="/booking" className="text-white hover:text-[#39ff14] text-sm font-medium transition-colors">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
           
            <Link href="/" className="flex items-center">
              <div className="relative h-16 flex items-center">
                 <Image
                  src={isScrolled ? "/logomain.png" : "/logomain.png"}
                  alt="Advika Physiotherapy Clinic Logo"
                  width={160}
                  height={64}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

           
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`relative font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-[#245b52]' : 'text-black hover:text-[#39ff14]'} ${isActiveLink('/') ? 'text-[#245b52] font-semibold' : ''}`}
              >
                Home
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#245b52] transition-all duration-300 ${isActiveLink('/') ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>

             
              <div 
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className={`relative flex items-center font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-[#245b52]' : 'text-black hover:text-[#39ff14]'} ${isActiveLink('/services') || isActiveLink('/team') || isActiveLink('/testimonials') || isActiveLink('/pricing') || isActiveLink('/booking') ? 'text-[#245b52] font-semibold' : ''}`}>
                  Pages
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#245b52] transition-all duration-300 ${isActiveLink('/services') || isActiveLink('/team') || isActiveLink('/testimonials') || isActiveLink('/pricing') || isActiveLink('/booking') ? 'w-full' : 'group-hover:w-full'}`}></span>
                </button>

               
                <div
                  className={`absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                >
                  {[
                    { name: "Our Services", href: "/services" },
                   
                    { name: "Testimonials", href: "/testimonials" },
                    { name: "Pricing", href: "/pricing" },
                    { name: "Online Booking", href: "/booking" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={`block px-6 py-3 text-gray-700 hover:bg-[#f0f7ee] hover:text-[#245b52] transition-all duration-300 border-b border-gray-100 last:border-b-0 ${isActiveLink(item.href) ? 'bg-[#f0f7ee] text-[#245b52] font-medium' : ''}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>              
              <Link 
                href="/contact" 
                className={`relative font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-[#245b52]' : 'text-black hover:text-[#39ff14]'} ${isActiveLink('/contact') ? 'text-[#245b52] font-semibold' : ''}`}
              >
                Contact
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#245b52] transition-all duration-300 ${isActiveLink('/contact') ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>

              
              <div className="flex items-center space-x-4 ml-6">
                <Link
                  href="/home-services"
                  className="relative px-5 py-2.5 rounded-full font-medium text-white bg-[#245b52] overflow-hidden group shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <span className="relative z-10">Home Services</span>
                  <div className="absolute inset-0 bg-[#1a443d] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                </Link>
                <Link
                  href="/contact"
                  className="relative px-5 py-2.5 rounded-full font-medium text-[#245b52] bg-white border-2 border-[#245b52] overflow-hidden group shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <span className="relative z-10">Talk To Us</span>
                  <div className="absolute inset-0 bg-[#245b52] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                  <div className="absolute inset-0 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    Talk To Us
                  </div>
                </Link>
              </div>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#39ff14] focus:outline-none`}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

       
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-b-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link
                href="/"
                className={`block py-3 px-4 font-medium transition-colors border-b border-gray-100 ${isActiveLink('/') ? 'text-[#245b52] bg-[#f0f7ee]' : 'text-gray-800 hover:text-[#245b52] hover:bg-[#f0f7ee]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
             
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex justify-between items-center w-full py-3 px-4 font-medium ${isActiveLink('/services') || isActiveLink('/team') || isActiveLink('/testimonials') || isActiveLink('/pricing') || isActiveLink('/booking') ? 'text-[#245b52] bg-[#f0f7ee]' : 'text-gray-800'}`}
                >
                  Pages
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                  {[
                    { name: "Our Services", href: "/services" },
                    { name: "Our Team", href: "/team" },
                    { name: "Testimonials", href: "/testimonials" },
                    { name: "Pricing", href: "/pricing" },
                    { name: "Online Booking", href: "/booking" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={`block py-2 px-8 transition-colors duration-300 ${isActiveLink(item.href) ? 'text-[#245b52] bg-[#f0f7ee] font-medium' : 'text-gray-600 hover:text-[#245b52] hover:bg-[#f0f7ee]'}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className={`block py-3 px-4 font-medium transition-colors border-b border-gray-100 ${isActiveLink('/about') ? 'text-[#245b52] bg-[#f0f7ee]' : 'text-gray-800 hover:text-[#245b52] hover:bg-[#f0f7ee]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <Link
                href="/contact"
                className={`block py-3 px-4 font-medium transition-colors border-b border-gray-100 ${isActiveLink('/contact') ? 'text-[#245b52] bg-[#f0f7ee]' : 'text-gray-800 hover:text-[#245b52] hover:bg-[#f0f7ee]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-gray-200 mt-2 space-y-3">
                <Link
                  href="/home-services"
                  className="block text-center px-5 py-3 rounded-full font-medium text-white bg-[#245b52] hover:bg-[#1a443d] transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home Services
                </Link>
                <Link
                  href="/contact"
                  className="block text-center px-5 py-3 rounded-full font-medium text-[#245b52] bg-white border-2 border-[#245b52] hover:bg-[#245b52] hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Talk To Us
                </Link>
                <button
                  onClick={openWhatsApp}
                  className="w-full text-center px-5 py-3 rounded-full font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
                >
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}