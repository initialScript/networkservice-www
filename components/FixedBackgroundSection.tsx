'use client';

import React, { useEffect, useRef } from 'react';

const FixedBackgroundSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          // Optional: Add parallax effect or trigger animations
          console.log('Section is visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full max-w-7xl mx-auto min-h-[550px] overflow-hidden rounded-2xl ">
      {/* Fixed Background with proper z-index */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://networkservice-info.com/wp-content/uploads/2024/08/jeshoots-com-sMKUYIasyDM-unsplash1.jpg")',
        }}
      />
      
      {/* Additional blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="text-center text-white">

          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8">
           Maintenance & réparation <br /> informatique
          </h2>
          
          <div className="max-w-3xl mx-auto bg-black/30 rounded-xl p-3 backdrop-blur-sm">
            <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/EzkOjdTx77c"
                title="Installation caméra de surveillance"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedBackgroundSection;