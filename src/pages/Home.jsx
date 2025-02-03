import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import HeroVideo from '../components/HeroVideo'
import { motion } from 'framer-motion';
import { 
  BeakerIcon, 
  SparklesIcon,
  HeartIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  SparklesIcon as SparklesIcon2
} from '@heroicons/react/24/outline'
import ProductDebug from '../components/ProductDebug'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/ingredients-carousel.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  const features = [
    {
      icon: BeakerIcon,
      title: "Scientific Formulation",
      description: "Carefully balanced blend of natural oils, backed by scientific research.",
      delay: 0.2
    },
    {
      icon: SparklesIcon,
      title: "Premium Ingredients",
      description: "Sourced from the finest natural ingredients for maximum effectiveness.",
      delay: 0.4
    },
    {
      icon: CheckBadgeIcon,
      title: "Visible Results",
      description: "See noticeable improvements in hair strength and shine within weeks.",
      delay: 0.6
    }
  ]

  const ingredients = [
    {
      name: "Moroccan Argan Oil",
      description: "Rich in vitamin E and essential fatty acids, this 'liquid gold' penetrates the hair shaft to nourish and protect from within.",
      image: "/images/ingredients/argan.png",
      color: "from-amber-400/20 to-amber-600/20",
      delay: 0.2
    },
    {
      name: "Indian Castor Oil",
      description: "Packed with ricinoleic acid and omega-6 fatty acids, promoting scalp health and encouraging robust hair growth.",
      image: "/images/ingredients/castor_new.png",
      color: "from-emerald-400/20 to-emerald-600/20",
      delay: 0.4
    },
    {
      name: "Black Seed Oil",
      description: "Ancient remedy rich in antioxidants and anti-inflammatory properties, helping to maintain scalp health and hair vitality.",
      image: "/images/ingredients/blackseed.png",
      color: "from-violet-400/20 to-violet-600/20",
      delay: 0.6
    }
  ];

  const diversityCards = [
    {
      image: "https://images.unsplash.com/photo-1618517047922-d18a5a36c109?w=800&auto=format&fit=crop&q=60",
      title: "Men's Hair Care",
      description: "Strengthen and revitalize",
      delay: 0.2
    },
    {
      image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&auto=format&fit=crop&q=60",
      title: "Women's Hair Care",
      description: "Nourish and enhance",
      delay: 0.4
    },
    {
      image: "https://images.unsplash.com/photo-1584297091622-af8e5bd80b13?w=800&auto=format&fit=crop&q=60",
      title: "Natural Hair Care",
      description: "Moisturize and define",
      delay: 0.6
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-0">
          <HeroVideo />
          
          {/* Content */}
          <div className="relative z-30 container mx-auto px-4 pt-8 sm:pt-0">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Decorative elements */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent via-reginify-gold to-transparent"></div>
                  <h2 className="text-sm uppercase tracking-[0.2em] text-reginify-gold mb-4 font-garet-book">
                    Premium Hair Care
                  </h2>
                  <div className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent via-reginify-gold to-transparent"></div>
                </div>

                {/* Main heading with enhanced typography */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-garet text-white mb-6 tracking-wider leading-tight">
                  <span className="block mb-4 text-white/90">Transform Your Hair With</span>
                  <span className="block relative">
                    <span className="relative inline-block">
                      <span className="relative z-10 text-reginify-gold">Nature's Finest Oils</span>
                      <div className="absolute -inset-x-6 -inset-y-3 bg-reginify-navy-950/50 blur-xl -z-10"></div>
                    </span>
                  </span>
                </h1>

                {/* Description with improved readability */}
                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed
                            font-garet-book tracking-wide">
                  Experience our scientifically formulated blend of premium natural oils,
                  designed to nourish and revitalize your hair for lasting beauty and strength.
                </p>

                {/* CTA buttons with enhanced styling */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Link 
                      to="/product" 
                      className="group relative w-full sm:w-auto px-8 py-4 bg-reginify-gold text-reginify-navy rounded-full 
                               font-garet text-sm uppercase tracking-[0.15em] transition-all duration-300
                               hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:bg-white flex justify-center items-center
                               overflow-hidden"
                    >
                      <span className="relative z-10 inline-flex items-center">
                        Shop Now
                        <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-reginify-gold to-white transition-transform duration-700"></div>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Link 
                      to="/about" 
                      className="w-full sm:w-auto px-8 py-4 text-white hover:text-reginify-gold border border-white/30
                               hover:border-reginify-gold rounded-full flex justify-center items-center
                               font-garet text-sm uppercase tracking-[0.15em] transition-all duration-300
                               hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center z-20"
          >
            <div className="text-white/50 text-sm uppercase tracking-widest mb-2">Scroll</div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-reginify-gold rounded-full"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="pt-32 pb-24 bg-white relative">
          {/* Logo Break */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
              <img 
                src="/images/logo.png" 
                alt="Regenefi Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(193,155,118,0.1),transparent_70%)]"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-reginify-gold/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-reginify-gold/30 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row gap-8 relative px-4 sm:px-6 lg:px-0">
              {/* Left Content Box */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 bg-reginify-gold/10 rounded-3xl p-10 flex flex-col justify-center min-h-[400px] lg:self-start"
              >
                <div className="max-w-[80%]">
                  <span className="text-sm uppercase tracking-widest text-reginify-gold mb-4 font-garet-book">
                    Why Choose Us
                  </span>
                  <h3 className="text-3xl md:text-4xl font-garet text-reginify-navy mb-6">
                    The Regenefi Difference
                  </h3>
                  <p className="text-base text-black font-garet-book leading-relaxed">
                    Discover what sets our premium hair oil apart and why thousands trust Regenefi for their hair care needs
                  </p>
                </div>
              </motion.div>

              {/* Right Features Grid - Overlapping */}
              <div className="lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:-ml-16 lg:mt-16 relative z-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: feature.delay }}
                    className="group"
                  >
                    <div className="h-full rounded-2xl p-6 sm:p-8 bg-white border-2 border-reginify-navy/20 
                                transition-all duration-300 hover:border-reginify-navy
                                hover:shadow-lg hover:scale-105">
                      {/* Icon Container - Enhanced for mobile */}
                      <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-xl 
                                  bg-reginify-gold/10 text-reginify-gold mb-5 sm:mb-6 
                                  group-hover:scale-110 transition-transform duration-300
                                  relative">
                        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        <div className="absolute inset-0 bg-reginify-gold/5 rounded-xl 
                                    transform rotate-45 group-hover:rotate-90 transition-transform duration-500
                                    sm:hidden"></div>
                      </div>
                      
                      {/* Content - Enhanced for mobile */}
                      <div className="relative">
                        <h3 className="text-xl sm:text-2xl font-garet text-reginify-navy mb-3 sm:mb-4
                                   group-hover:text-reginify-gold transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-black/80 font-garet-book text-sm sm:text-base leading-relaxed
                                  group-hover:text-black transition-colors duration-300">
                          {feature.description}
                        </p>
                        
                        {/* Mobile-only decorative element */}
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-12 
                                    bg-gradient-to-b from-transparent via-reginify-gold/20 to-transparent 
                                    rounded-full sm:hidden"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Shop Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16"
            >
              <Link
                to="/product"
                className="inline-flex items-center px-8 py-4 bg-reginify-navy text-white
                          rounded-full font-garet text-lg tracking-wider hover:bg-reginify-gold 
                          hover:text-reginify-navy transition-all duration-300 group shadow-lg"
              >
                Shop Now
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-reginify-gold/5 to-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(193,155,118,0.1),transparent_70%)]"></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-reginify-gold/30 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm uppercase tracking-[0.2em] text-reginify-gold mb-4 font-garet-book">
                  For Every Hair Type
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-garet text-reginify-navy mb-6">
                  Beauty in Diversity
                </h3>
                <p className="text-reginify-navy/80 font-garet-book max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  Our unique formula is designed to work harmoniously with all hair types, 
                  delivering exceptional results for everyone.
                </p>
              </motion.div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {diversityCards.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item.delay }}
                  className="group relative"
                >
                  {/* Image Container */}
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-reginify-navy/80 to-transparent 
                                z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transform scale-105 
                              group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
                      <h4 className="text-2xl sm:text-3xl font-garet text-white mb-2 
                                 transform group-hover:-translate-y-1 transition-transform duration-500">
                        {item.title}
                      </h4>
                      <p className="text-white/90 font-garet-book text-sm sm:text-base
                                transform group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -inset-px rounded-2xl border border-white/10 pointer-events-none"></div>
                  <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-reginify-gold/20 to-white/20 blur"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12 sm:mt-16"
            >
              <Link
                to="/product"
                className="inline-flex items-center px-8 py-4 bg-reginify-navy text-white
                        rounded-full font-garet text-lg tracking-wider hover:bg-reginify-gold 
                        hover:text-reginify-navy transition-all duration-300 group"
              >
                Discover More
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Perfect Blend Section */}
        <section className="relative py-24 sm:py-32 bg-reginify-navy overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-reginify-gold/30 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm uppercase tracking-[0.2em] text-reginify-gold mb-4 font-garet-book">
                  Our Secret Formula
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-garet text-white mb-6">
                  The Perfect Blend
                </h3>
                <p className="text-white/80 font-garet-book max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  We've carefully selected and combined nature's most potent oils to create 
                  a unique formula that delivers exceptional results.
                </p>
              </motion.div>
            </div>

            {/* Ingredients Grid - Desktop */}
            <div className="hidden md:grid grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: ingredient.delay }}
                  className="group"
                >
                  <div className={`h-full bg-gradient-to-br ${ingredient.color} backdrop-blur-sm rounded-2xl p-8 
                              border border-white/10 group-hover:border-reginify-gold/40
                              transition-all duration-300 relative overflow-hidden`}>
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-pattern-grid opacity-20"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Image Container */}
                      <div className="w-24 h-24 mb-6 mx-auto relative">
                        <div className="absolute inset-0 bg-reginify-gold/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="absolute inset-0 bg-white/90 rounded-full"></div>
                        <img 
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="relative z-10 w-full h-full object-cover rounded-full border-2 border-reginify-gold/30 
                                   group-hover:border-reginify-gold group-hover:scale-105 transition-all duration-300
                                   p-2"
                          onError={(e) => {
                            console.error(`Error loading image: ${ingredient.image}`);
                            e.target.src = "/images/placeholders/benefit2.svg";
                          }}
                        />
                      </div>
                      
                      <h3 className="text-2xl font-garet text-white text-center mb-4 group-hover:text-reginify-gold transition-colors duration-300">
                        {ingredient.name}
                      </h3>
                      <p className="text-white/80 font-garet-book leading-relaxed text-center group-hover:text-white transition-colors duration-300">
                        {ingredient.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ingredients Carousel - Mobile */}
            <div className="md:hidden -mt-4 mb-12">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Pagination]}
                className="ingredients-swiper"
                loop={true}
                loopedSlides={3}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                cardsEffect={{
                  slideShadows: false,
                  perSlideRotate: 5,
                  perSlideOffset: 8,
                }}
              >
                {ingredients.map((ingredient, index) => (
                  <SwiperSlide key={ingredient.name}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="p-4"
                    >
                      <div className={`bg-gradient-to-br ${ingredient.color} backdrop-blur-sm rounded-2xl p-8 
                                  border border-white/10 relative overflow-hidden`}>
                        {/* Decorative Background */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0 bg-pattern-grid opacity-20"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Image Container */}
                          <div className="w-32 h-32 mb-6 mx-auto relative">
                            <div className="absolute inset-0 bg-reginify-gold/20 rounded-full blur-xl"></div>
                            <div className="absolute inset-0 bg-white/90 rounded-full"></div>
                            <img 
                              src={ingredient.image}
                              alt={ingredient.name}
                              className="relative z-10 w-full h-full object-cover rounded-full border-2 border-reginify-gold/30 
                                       p-2"
                              onError={(e) => {
                                console.error(`Error loading image: ${ingredient.image}`);
                                e.target.src = "/images/placeholders/benefit2.svg";
                              }}
                            />
                          </div>
                          
                          <h3 className="text-2xl font-garet text-white text-center mb-4">
                            {ingredient.name}
                          </h3>
                          <p className="text-white/80 font-garet-book leading-relaxed text-center">
                            {ingredient.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Wholesale Section */}
        <section className="relative py-24 sm:py-32 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-20%,_rgba(212,175,55,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[url('/src/assets/textures/grid.svg')] opacity-[0.03]"></div>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-reginify-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-reginify-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block px-4 py-2 rounded-full bg-reginify-gold/10 text-reginify-gold 
                                text-sm font-garet-book tracking-wider mb-6">
                    Business Opportunity
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-garet text-reginify-navy mb-6 leading-tight">
                    Grow Your Business with{' '}
                    <span className="text-reginify-gold">Regenefi</span>
                  </h2>
                  <p className="text-reginify-navy/80 text-lg sm:text-xl font-garet-book leading-relaxed mb-8 max-w-2xl lg:max-w-none">
                    Join our network of premium salons and beauty shops. Offer your clients the finest hair care products 
                    while growing your business with our attractive wholesale program.
                  </p>

                  {/* Benefits List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                    {[
                      {
                        title: "Competitive Pricing",
                        description: "Exclusive wholesale rates for maximum profit margins"
                      },
                      {
                        title: "Flexible Orders",
                        description: "Low minimum order quantities with bulk discounts"
                      },
                      {
                        title: "Marketing Support",
                        description: "Free marketing materials and product training"
                      },
                      {
                        title: "Priority Support",
                        description: "Dedicated account manager for wholesale partners"
                      }
                    ].map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3 bg-white rounded-xl p-4 shadow-lg shadow-reginify-navy/5"
                      >
                        <CheckBadgeIcon className="w-5 h-5 text-reginify-gold shrink-0 mt-1" />
                        <div>
                          <h3 className="text-reginify-navy font-garet text-lg mb-1">{benefit.title}</h3>
                          <p className="text-reginify-navy/70 font-garet-book text-sm">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link
                      to="/wholesale"
                      className="group relative inline-flex items-center px-8 py-4 bg-reginify-navy text-white 
                               rounded-full overflow-hidden transition-all duration-300 shadow-lg shadow-reginify-navy/20"
                    >
                      <span className="relative z-10 flex items-center text-lg font-garet">
                        Join Our Network
                        <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-reginify-navy-800 via-reginify-navy to-reginify-navy-800 
                                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Image/Stats Section */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      {
                        number: "200+",
                        label: "Partner Salons",
                        color: "from-amber-50 to-amber-100"
                      },
                      {
                        number: "95%",
                        label: "Partner Satisfaction",
                        color: "from-emerald-50 to-emerald-100"
                      },
                      {
                        number: "48h",
                        label: "Fast Delivery",
                        color: "from-blue-50 to-blue-100"
                      },
                      {
                        number: "30%",
                        label: "Profit Margins",
                        color: "from-violet-50 to-violet-100"
                      }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                        className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 
                                  border border-white group hover:border-reginify-gold/20 
                                  transition-all duration-300 shadow-lg shadow-reginify-navy/5`}
                      >
                        <h3 className="text-3xl sm:text-4xl font-garet text-reginify-navy mb-2 group-hover:text-reginify-gold transition-colors duration-300">
                          {stat.number}
                        </h3>
                        <p className="text-reginify-navy/70 font-garet-book text-sm sm:text-base">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-xl shadow-reginify-navy/5 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-reginify-gold/10 flex items-center justify-center">
                        <img
                          src="/images/placeholders/avatar1.svg"
                          alt="Salon Owner"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-reginify-navy/90 font-garet-book italic mb-4">
                          "Partnering with Regenefi has transformed our salon's retail revenue. The products practically 
                          sell themselves, and our clients love the results!"
                        </p>
                        <div>
                          <h4 className="text-reginify-navy font-garet">Sarah Johnson</h4>
                          <p className="text-reginify-navy/70 font-garet-book text-sm">Owner, Luxe Hair Studio</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default Home
