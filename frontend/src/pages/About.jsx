import React from "react";
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaKey, 
  FaShieldAlt, 
  FaSearchDollar,
  FaHandshake,
  FaBuilding,
  FaClipboardCheck,
  FaUsers,
  FaChartLine,
  FaMobileAlt,
  FaCalendarAlt,
  FaWallet
} from "react-icons/fa";

const About = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
            Why We're Different
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Redefining Rental <br className="hidden md:block"/> Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge technology with personalized service to make finding your perfect home effortless.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-0 items-stretch bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 transform hover:shadow-2xl transition-shadow duration-300">
          {/* Image Column */}
          <div className="lg:w-1/2 relative group overflow-hidden">
            <div className="relative h-full min-h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Modern apartment interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent"></div>
              
              {/* Floating Testimonial */}
              <div className="absolute bottom-8 left-8 bg-white p-5 rounded-xl shadow-lg max-w-xs border-l-4 border-blue-500">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaHandshake className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2 italic">
                      "Found my dream apartment in just 3 days with their help!"
                    </p>
                    <p className="text-sm text-gray-500">- Sarah J., satisfied client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
            <div className="mb-2 flex items-center">
              <div className="w-12 h-1 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-blue-600">OUR APPROACH</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-snug">
              Smart Solutions for <br className="hidden sm:block"/> Modern Renters
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We've reimagined the rental process from the ground up, eliminating pain points and creating a seamless journey from search to move-in. Our platform combines AI-powered recommendations with human expertise to deliver unmatched service.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {[
                { icon: <FaHome className="text-blue-600" />, title: "Curated Listings", desc: "Hand-picked properties that meet our 50-point quality checklist" },
                { icon: <FaShieldAlt className="text-blue-600" />, title: "Verified Owners", desc: "Every listing undergoes strict verification to prevent scams" },
                { icon: <FaMapMarkerAlt className="text-blue-600" />, title: "Area Insights", desc: "Neighborhood reports with schools, transit, and amenities" },
                { icon: <FaKey className="text-blue-600" />, title: "Digital Process", desc: "eSign documents, schedule tours, and pay rent online" }
              ].map((feature, index) => (
                <div key={index} className="p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 border border-gray-100 hover:border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-11">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex-1 text-center flex items-center justify-center space-x-2">
                <span>Browse Properties</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex-1 text-center">
                Contact Agent
              </button>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 text-center">
          <div className="mb-2 flex items-center justify-center">
            <div className="w-12 h-1 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-blue-600">OUR PROCESS</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Simple Steps to Your New Home</h3>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            We've streamlined the rental process into four easy steps, saving you time and reducing stress.
          </p>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Progress line */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-1 bg-blue-100"></div>
            <div className="hidden md:block absolute top-8 left-1/2 right-1/4 h-1 bg-blue-100"></div>
            <div className="hidden md:block absolute top-8 left-3/4 right-1/4 h-1 bg-blue-100"></div>

            {[
              { icon: <FaSearchDollar className="text-white text-xl" />, step: "1", title: "Tell Us Your Needs", desc: "Complete our quick questionnaire about your preferences and budget" },
              { icon: <FaCalendarAlt className="text-white text-xl" />, step: "2", title: "Schedule Tours", desc: "Book viewings that fit your schedule with our virtual assistant" },
              { icon: <FaClipboardCheck className="text-white text-xl" />, step: "3", title: "Review & Apply", desc: "Compare properties and submit digital applications in minutes" },
              { icon: <FaKey className="text-white text-xl" />, step: "4", title: "Move In", desc: "Sign your lease digitally and get keys with our concierge service" }
            ].map((step, index) => (
              <div key={index} className="relative z-10">
                <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <div className="absolute -top-2 -right-2 bg-white text-blue-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                    {step.step}
                  </div>
                  {step.icon}
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-3">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Value Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">More Reasons to Choose Us</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We go beyond basic listings to provide comprehensive support throughout your rental journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FaBuilding className="text-blue-600 text-2xl" />, title: "Property Variety", desc: "From luxury condos to affordable studios, we offer diverse options across all price ranges and neighborhoods." },
              { icon: <FaUsers className="text-blue-600 text-2xl" />, title: "Dedicated Support", desc: "Get assigned a personal rental concierge available via chat, email, or phone." },
              { icon: <FaChartLine className="text-blue-600 text-2xl" />, title: "Market Insights", desc: "Receive monthly reports on rental trends in your preferred areas." },
              { icon: <FaMobileAlt className="text-blue-600 text-2xl" />, title: "Mobile Experience", desc: "Our app lets you tour properties virtually and get instant notifications." },
              { icon: <FaWallet className="text-blue-600 text-2xl" />, title: "Financial Tools", desc: "Rent calculators, budgeting guides, and credit improvement tips." },
              { icon: <FaShieldAlt className="text-blue-600 text-2xl" />, title: "Renter Protection", desc: "Free legal review of leases and dispute resolution assistance." }
            ].map((item, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300"></div>
                <div className="bg-blue-50 p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  {item.icon}
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
                <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">By The Numbers</h3>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Our performance speaks for itself - here's what we've accomplished for our clients.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "98%", label: "Satisfaction", desc: "Customer satisfaction rate" },
                { value: "24h", label: "Response Time", desc: "Average for initial inquiries" },
                { value: "15min", label: "Applications", desc: "Average time to complete" },
                { value: "200+", label: "Partners", desc: "Property management firms" },
              ].map((stat, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="font-medium text-blue-100 mb-1">{stat.label}</div>
                  <div className="text-xs text-blue-200">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;