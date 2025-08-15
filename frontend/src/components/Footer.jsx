import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaHeart, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmazonPay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pt-16 pb-12 px-6 border-t-2 border-blue-600">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 tracking-tight">
                RentMyProperty
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-base tracking-normal">
              Find your perfect property in the best locations. We connect tenants with property owners for a seamless renting experience.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4 pt-3">
              {[
                { 
                  icon: <FaFacebookF size={16} />, 
                  color: 'bg-blue-600 hover:bg-blue-700',
                  link: 'https://www.facebook.com/share/1GNTLxixe4/'
                },
                { 
                  icon: <FaInstagram size={16} />, 
                  color: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600',
                  link: 'https://www.instagram.com/rentmyproperty.com_india?igsh=ZmY2cmJ4bjg3d2R0'
                },
                { 
                  icon: <FaLinkedinIn size={16} />, 
                  color: 'bg-blue-700 hover:bg-blue-800',
                  link: '#' 
                },
                { 
                  icon: <FaWhatsapp size={16} />, 
                  color: 'bg-green-500 hover:bg-green-600',
                  link: 'https://wa.me/+917830063882' 
                },
              ].map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item.color} text-white w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  aria-label={`Social media link ${index}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 mb-7 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-[3px] after:bg-gradient-to-r from-blue-500 to-cyan-400 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {['Home', 'Find Property', 'List Your Property', 'How It Works', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                <li key={item} className="group">
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-blue-300 transition-all duration-300 flex items-center text-base leading-normal tracking-normal group-hover:pl-2"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:pl-8">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 mb-7 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-[3px] after:bg-gradient-to-r from-blue-500 to-cyan-400 after:rounded-full">
              Contact Us
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 hover:text-blue-300 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-lg shadow-lg flex-shrink-0 mt-0.5 group-hover:rotate-6 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <p className="text-gray-400 text-base leading-relaxed tracking-normal group-hover:text-blue-300">Sector 66, Mohali, Punjab, India</p>
              </div>
              <div className="flex items-center gap-4 hover:text-blue-300 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-lg shadow-lg flex-shrink-0 group-hover:rotate-6 transition-transform duration-300">
                  <FaPhone className="text-white text-sm" />
                </div>
                <a href="tel:+917830063882" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 text-base leading-relaxed">+91 7830063882</a>
              </div>
              <div className="flex items-center gap-4 hover:text-blue-300 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-lg shadow-lg flex-shrink-0 group-hover:rotate-6 transition-transform duration-300">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <a href="mailto:rentmyproperty.org.in@gmail.com" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 text-base leading-relaxed">rentmyproperty.org.in@gmail.com</a>
              </div>
              <div className="flex items-center gap-4 hover:text-blue-300 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-lg shadow-lg flex-shrink-0 group-hover:rotate-6 transition-transform duration-300">
                  <FaClock className="text-white text-sm" />
                </div>
                <p className="text-gray-400 text-base leading-relaxed group-hover:text-blue-300">Monday-Sunday: 9AM - 7PM</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-8">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 mb-7 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-[3px] after:bg-gradient-to-r from-blue-500 to-cyan-400 after:rounded-full">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-6 text-base leading-normal tracking-normal">
              Subscribe to get updates on new properties and offers
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-5 py-3.5 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-500 text-base transition-all duration-300 hover:shadow-lg focus:shadow-lg"
                  required 
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-blue-800 pt-10">
          <div className="flex    items-center justify-center">
            <p className="text-gray-500 text-md tracking-normal">
              © {new Date().getFullYear()} RentMyProperty. All Rights Reserved 
            </p>
       
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;