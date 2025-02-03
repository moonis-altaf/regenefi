import { useState, useEffect } from 'react'

const LoadingScreen = ({ onLoadComplete }) => {
  const [showRipple, setShowRipple] = useState(false)
  
  useEffect(() => {
    // Start ripple effect after drop animation
    const rippleTimer = setTimeout(() => {
      setShowRipple(true)
    }, 1500)

    // Trigger load complete after animations
    const loadTimer = setTimeout(() => {
      onLoadComplete()
    }, 2500)

    return () => {
      clearTimeout(rippleTimer)
      clearTimeout(loadTimer)
    }
  }, [onLoadComplete])

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative">
        {/* Main drop */}
        <div className="w-16 h-16 animate-initial-drop">
          <div className="w-full h-full bg-gradient-to-b from-reginify-gold to-reginify-gold/80 
                         rounded-t-full rounded-b-[40%] shadow-lg relative
                         before:absolute before:inset-0 before:bg-white/20 
                         before:rounded-t-full before:rounded-b-[40%]">
            {/* Highlight effect */}
            <div className="absolute w-3 h-3 bg-white/40 rounded-full top-3 left-3"></div>
          </div>
        </div>
        
        {/* Ripple effect */}
        {showRipple && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <div className="w-full h-full border-4 border-reginify-gold/60 rounded-full animate-ripple"></div>
            </div>
            <div className="w-16 h-16 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 delay-200">
              <div className="w-full h-full border-4 border-reginify-gold/40 rounded-full animate-ripple"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadingScreen
