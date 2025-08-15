import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden mt-[-100px]">
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
            filter: "hue-rotate(-10deg) saturate(1.2) brightness(0.9)"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/60 to-blue-900/60"></div>
      </div>
      
      {/* Subtle Animated Blue Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-soft-light filter blur-[100px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-soft-light filter blur-[100px] opacity-10 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-300 rounded-full mix-blend-soft-light filter blur-[90px] opacity-10 animate-pulse-slow animation-delay-4000"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-blue-300/30 mb-8">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              RentMyProperty
            </h2>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Rental Property</span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Find your Rentals Properties in the best locations. Filter by preferences to find exactly what you need.          </p>
        </div>
        
        {/* Dual Button Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-300/30 transform transition-all duration-300 hover:shadow-2xl animate-scale-in">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* List Property Button */}
              <button className="group relative bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 flex items-center cursor-pointer"  onClick={() => window.location.href = '/property-registration'}>
                <div className="bg-white/20 p-3 rounded-lg mr-4 transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">List Your Property</div>
                  <div className="text-blue-100 text-sm opacity-80 mt-1">Get tenants fast!</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              {/* Tenant Form Button */}
              <button className="group relative bg-gradient-to-br from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 flex items-center cursor-pointer" onClick={() => window.location.href = '/tenet-information'}>
                <div className="bg-white/20 p-3 rounded-lg mr-4 transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">Find a Property</div>
                  <div className="text-cyan-100 text-sm opacity-80 mt-1">Fill tenant form</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* <div className="bg-gradient-to-r from-blue-600/80 via-indigo-700/80 to-teal-600/80 p-5">
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div className="flex items-center text-white/90 text-sm">
                
              </div>
              <div className="flex items-center text-white/90 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Verified landlords & tenants</span>
              </div>
              <div className="flex items-center text-white/90 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure transactions</span>
              </div>
            </div>
          </div> */}
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in">
          <div className="text-center bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-blue-300/30">
            <div className="text-3xl font-bold text-white mb-2">15K+</div>
            <div className="text-blue-200 text-sm">Properties Listed</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-blue-300/30">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-blue-200 text-sm">Satisfaction Rate</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-blue-300/30">
            <div className="text-3xl font-bold text-white mb-2">24h</div>
            <div className="text-blue-200 text-sm">Avg. Response Time</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-blue-300/30">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-blue-200 text-sm">Prime Locations</div>
          </div>
        </div>
      </div>
      
      {/* Watermark */}
      <div className="absolute bottom-6 right-6 text-blue-200/30 text-sm">
        Premium Real Estate Solutions
      </div>
      
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.3s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;