import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Property", href: "/property" },
    { name: "About", href: "/about" },
    {
      name: "Contact Us",
      href: null, // no default navigation
      onClick: (e) => {
        e.preventDefault(); // stop default link behavior
        window.open("https://wa.me/+917830063882", "_blank");
      },
    },
  ];

  const socialMediaLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1GNTLxixe4/",
      icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
      color: "text-blue-600 hover:text-blue-800",
      scale: "scale-125",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/+917830063882",
      icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
      color: "text-green-600 hover:text-green-800",
      scale: "scale-110",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/rentmyproperty.com_india?igsh=ZmY2cmJ4bjg3d2R0",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      color: "text-purple-600 hover:text-purple-800",
      scale: "scale-100",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
      color: "text-blue-700 hover:text-blue-900",
      scale: "scale-100",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* This div acts as a spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-16 md:h-18"></div>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 shadow-sm ${
          scrolled
            ? "py-3 backdrop-blur-sm bg-gradient-to-r from-blue-50/90 to-indigo-50/90"
            : "py-3 backdrop-blur-sm bg-gradient-to-r from-blue-50/90 to-indigo-50/90"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 md:h-12">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                    Rent
                  </span>
                  MyProperty
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className="text-gray-800 hover:text-blue-600 text-lg font-medium relative group transition-colors duration-300"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* CTA Buttons & Social Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex space-x-4">
                {socialMediaLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} transition-colors duration-300`}
                    aria-label={social.name}
                  >
                    <svg
                      className={`w-6 h-6 ${social.scale}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d={social.icon}
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                ))}
              </div>

              <button
                onClick={() => (window.location.href = "http://localhost:5174")}
                className="relative bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Admin Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-800 hover:bg-blue-100 transition-all"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 rounded-xl bg-gradient-to-b from-blue-50 to-indigo-50 shadow-lg overflow-hidden">
              <div className="px-2 pt-2 pb-4 space-y-5 flex items-center flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={item.onClick}
                    className="block text-gray-800 hover:text-blue-600 hover:bg-blue-100/50 px-4 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}

                <div className="flex justify-center space-x-4 py-3 text-xl">
                  {socialMediaLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} p-2 transition-colors duration-300 text-lg`}
                      aria-label={social.name}
                    >
                      <svg
                        className={`w-6 h-6 ${social.scale}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d={social.icon}
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  ))}
                </div>

                <button
                onClick={() => (window.location.href = "http://localhost:5173")}
                className="relative bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Admin Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
