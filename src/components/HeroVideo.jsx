import { useEffect, useRef } from 'react'

const HeroVideo = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Multiple overlay layers for depth and sophistication */}
      <div className="absolute inset-0 bg-gradient-to-b from-reginify-navy-950/90 via-reginify-navy-900/80 to-reginify-navy-950/95 z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(193,155,118,0.08),transparent_70%)] z-20"></div>
      <div className="absolute inset-0 bg-[url('/src/assets/textures/noise.png')] opacity-[0.03] z-20"></div>
      
      {/* Animated light beam effect */}
      <div className="absolute inset-0 overflow-hidden z-20">
        <div className="absolute -inset-[10%] bg-gradient-to-tr from-reginify-gold/0 via-reginify-gold/5 to-reginify-gold/0 
                      rotate-12 transform translate-y-full animate-beam"></div>
      </div>
      
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default HeroVideo
