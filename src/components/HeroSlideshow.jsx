import { useState, useEffect } from 'react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80',
    alt: 'Healthy Hair'
  },
  {
    url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80',
    alt: 'Hair Care'
  },
  {
    url: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&q=80',
    alt: 'Hair Treatment'
  },
  {
    url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80',
    alt: 'Oil Application'
  }
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const transitionTimer = setInterval(() => {
      setIsTransitioning(true);
      
      // Pre-load next image
      const img = new Image();
      const nextIndex = (currentSlide + 1) % slides.length;
      img.src = slides[nextIndex].url;
      
      setTimeout(() => {
        setCurrentSlide(nextIndex);
        setNextSlide((nextIndex + 1) % slides.length);
        setIsTransitioning(false);
      }, 1500); // Duration of the cross-fade
    }, 7000); // Time between transitions

    return () => {
      clearInterval(transitionTimer);
    };
  }, [currentSlide]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark overlay that's always present */}
      <div className="absolute inset-0 bg-black/40 z-20"></div>
      
      {/* Current Slide */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out
                   ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Gradient overlays for better text visibility */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>
        
        {/* Background pattern for added texture */}
        <div className="absolute inset-0 bg-[url('/src/assets/textures/dot-pattern.svg')] opacity-10 z-[5]"></div>
        
        <img
          src={slides[currentSlide].url}
          alt={slides[currentSlide].alt}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 
                   transition-transform duration-[8000ms] ease-out filter brightness-75"
          style={{
            transform: isTransitioning ? 'scale(1.1)' : 'scale(1.05)',
          }}
        />
      </div>

      {/* Next Slide (for smooth transition) */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out
                   ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Gradient overlays for better text visibility */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>
        
        {/* Background pattern for added texture */}
        <div className="absolute inset-0 bg-[url('/src/assets/textures/dot-pattern.svg')] opacity-10 z-[5]"></div>
        
        <img
          src={slides[nextSlide].url}
          alt={slides[nextSlide].alt}
          className="absolute inset-0 w-full h-full object-cover object-center transform
                   transition-transform duration-[8000ms] ease-out filter brightness-75"
          style={{
            transform: isTransitioning ? 'scale(1.05)' : 'scale(1.1)',
          }}
        />
      </div>
    </div>
  );
};

export default HeroSlideshow;
