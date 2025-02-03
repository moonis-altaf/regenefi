import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_HANDLE } from '../graphql/queries';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  BeakerIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  TruckIcon,
  CheckIcon,
  HeartIcon,
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/20/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ClockIcon, UserGroupIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const Product = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showViewCart, setShowViewCart] = useState(false);

  const handleQuantityChange = (delta) => {
    setQuantity(prevQuantity => {
      const newQuantity = Math.max(1, prevQuantity + delta);
      console.log('New quantity:', newQuantity);
      return newQuantity;
    });
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    
    try {
      setAddingToCart(true);
      
      // Get the current quantity before any state updates
      const quantityToAdd = quantity;
      console.log('Adding to cart with quantity:', quantityToAdd);
      
      const success = await addItem(selectedVariant.id, quantityToAdd);
      
      if (success) {
        setAddToCartSuccess(true);
        setShowViewCart(true);
        // Only reset quantity after successful add
        setQuantity(1);
        
        setTimeout(() => {
          setAddToCartSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_HANDLE, {
    variables: { handle },
    onCompleted: (data) => {
      if (data.product?.variants?.edges?.length > 0) {
        setSelectedVariant(data.product.variants.edges[0].node);
      }
    }
  });

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-xl text-reginify-navy">Loading product...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-red-600">Error loading product. Please try again later.</div>
    </div>
  );

  if (!data?.product) {
    navigate('/');
    return null;
  }

  const { product } = data;
  const images = product.images.edges.map(edge => ({
    src: edge.node.originalSrc,
    alt: edge.node.altText || product.title
  }));

  return (
    <main className="flex-grow">
      <section className="relative py-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-cream-50 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,_rgba(212,175,55,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,_rgba(212,175,55,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-pattern-grid opacity-5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Mobile Product Info Header */}
            <div className="lg:hidden order-1 space-y-4">
              <div className="inline-block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-reginify-gold/10 text-reginify-gold">
                  Premium Collection
                </span>
              </div>
              <h1 className="text-3xl font-garet text-reginify-navy">
                {product.title}
                <span className="block text-lg text-reginify-navy/60 mt-2">Luxury Hair Treatment</span>
              </h1>
              <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className="h-5 w-5 text-reginify-gold"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-medium text-reginify-navy">4.9</span>
                  <span className="text-gray-600"> (128 reviews)</span>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="relative order-2 lg:order-1">
              {/* Desktop View */}
              <div className="hidden lg:block sticky top-8 space-y-6">
                <motion.div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.1),transparent_70%)]" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-reginify-gold shadow-lg">
                        Premium Collection
                      </span>
                    </div>
                    <motion.img
                      key={selectedImage}
                      src={images[selectedImage]?.src}
                      alt={images[selectedImage]?.alt}
                      className="w-full h-full object-contain p-8 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-xl overflow-hidden aspect-square bg-white shadow-md 
                                ${selectedImage === index ? 'ring-2 ring-reginify-gold' : 'ring-1 ring-gray-200'}
                                hover:shadow-lg transition-shadow duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={image.src} alt={image.alt} className="w-full h-full object-contain p-2" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Image Carousel */}
              <div className="lg:hidden">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
                  pagination={{ clickable: true }}
                  className="product-swiper rounded-2xl overflow-hidden shadow-lg"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="aspect-square bg-gradient-to-br from-white to-cream-50">
                        <img src={image.src} alt={image.alt} className="w-full h-full object-contain p-4" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Product Info */}
            <div className="order-3 lg:order-2">
              {/* Desktop Product Info */}
              <div className="hidden lg:block sticky top-8">
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-reginify-gold/10 text-reginify-gold">
                    Premium Collection
                  </span>
                </div>
                <h1 className="text-4xl font-garet text-reginify-navy mb-2">
                  {product.title}
                  <span className="block text-xl text-reginify-navy/60 mt-2">Luxury Hair Treatment</span>
                </h1>
                <div className="flex items-center space-x-4 mb-6 bg-white/50 backdrop-blur-sm rounded-xl p-3 inline-flex">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon key={rating} className="h-5 w-5 text-reginify-gold" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-reginify-navy">4.9</span>
                    <span className="text-gray-600"> (128 reviews)</span>
                  </div>
                </div>
                <div className="prose prose-lg text-gray-600 font-garet-book mb-8" 
                     dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                />
              </div>

              {/* Shared Product Info (Mobile & Desktop) */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 
                              bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between sm:block">
                    <div>
                      <p className="text-3xl font-garet text-reginify-navy">
                        £{selectedVariant?.priceV2?.amount || product.priceRange.minVariantPrice.amount}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-sm text-gray-500">100ml bottle</span>
                        <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-sm text-reginify-gold">In Stock</span>
                      </div>
                    </div>
                    <div className="flex items-center sm:hidden bg-gray-50 rounded-full h-8">
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className="w-8 h-8 flex items-center justify-center text-reginify-navy 
                                 hover:text-reginify-navy-800 transition-colors rounded-full"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-garet text-sm">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className="w-8 h-8 flex items-center justify-center text-reginify-navy 
                                 hover:text-reginify-navy-800 transition-colors rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* Desktop Quantity Controls */}
                  <div className="hidden sm:flex items-center space-x-4 bg-gray-50 rounded-full px-4 py-2 shadow-inner">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="w-8 h-8 flex items-center justify-center text-reginify-navy hover:text-reginify-navy-800 
                               transition-colors rounded-full hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-garet">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="w-8 h-8 flex items-center justify-center text-reginify-navy hover:text-reginify-navy-800 
                               transition-colors rounded-full hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || !selectedVariant}
                    className="w-full bg-gradient-to-r from-reginify-navy via-reginify-navy-800 to-reginify-navy 
                             text-white py-4 px-8 rounded-full font-garet 
                             hover:shadow-lg hover:scale-[1.02] transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed shadow-lg group
                             relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,_rgba(255,255,255,0.2),transparent_50%)]" />
                    <span className="relative z-10 flex items-center justify-center">
                      {addingToCart ? (
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : addToCartSuccess ? (
                        <CheckIcon className="w-6 h-6" />
                      ) : (
                        <>
                          <ShoppingCartIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                          Add to Bag
                        </>
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showViewCart && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to="/cart"
                          className="w-full bg-white border-2 border-reginify-navy text-reginify-navy py-4 px-8 
                                   rounded-full font-garet flex items-center justify-center gap-2
                                   hover:bg-reginify-navy hover:text-white transition-all duration-300
                                   group shadow-sm"
                        >
                          <span>View Cart</span>
                          <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Description */}
                <div className="lg:hidden bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                  <h3 className="font-garet text-lg text-reginify-navy mb-3">Product Description</h3>
                  <div className="prose prose-sm text-gray-600 font-garet-book" 
                       dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                  />
                </div>

                {/* Desktop Benefits */}
                <div className="hidden lg:grid grid-cols-2 gap-4">
                  {[
                    { icon: BeakerIcon, text: "100% Natural Ingredients" },
                    { icon: SparklesIcon, text: "Promotes Hair Growth" },
                    { icon: ShieldCheckIcon, text: "Dermatologically Tested" },
                    { icon: TruckIcon, text: "Free Shipping Over £50" }
                  ].map((benefit, index) => (
                    <div key={index} 
                         className="flex items-center space-x-2 text-sm text-gray-600 bg-white/50 backdrop-blur-sm 
                                  rounded-xl p-3 shadow-sm">
                      <benefit.icon className="h-5 w-5 text-reginify-gold" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-reginify-navy to-[#1B365D] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-reginify-gold font-garet-book text-sm tracking-wider uppercase block">
                Application Guide
              </span>
              <h2 className="text-3xl md:text-4xl font-garet text-white">
                Perfect Your Hair Care Ritual
              </h2>
              <div className="w-24 h-px bg-reginify-gold/50 mx-auto" />
            </motion.div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Apply to Damp Hair",
                description: "After washing, apply 2-3 drops to damp hair focusing on mid-lengths and ends.",
                tip: "Use on towel-dried hair for best absorption"
              },
              {
                step: "02",
                title: "Massage Gently",
                description: "Gently massage the oil into your hair and scalp using circular motions.",
                tip: "Spend 2-3 minutes massaging thoroughly"
              },
              {
                step: "03",
                title: "Style as Desired",
                description: "Style your hair as usual. Can be used on dry hair for extra shine.",
                tip: "Perfect for pre-styling heat protection"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10
                         transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
              >
                {/* Step Number */}
                <div className="absolute -top-4 right-4 md:-right-4 w-12 h-12 bg-reginify-gold rounded-full 
                              flex items-center justify-center transform transition-transform duration-300
                              group-hover:scale-110 shadow-lg">
                  <span className="font-garet text-reginify-navy">{item.step}</span>
                </div>

                {/* Content */}
                <div className="mt-2">
                  <h3 className="text-xl font-garet text-white mb-3">{item.title}</h3>
                  <p className="text-white/80 font-garet-book mb-4 text-sm md:text-base">
                    {item.description}
                  </p>
                  
                  {/* Tip Box */}
                  <div className="bg-white/10 rounded-lg p-3 flex items-start gap-2">
                    <div className="text-reginify-gold">
                      <SparklesIcon className="w-5 h-5 mt-0.5" />
                    </div>
                    <p className="text-white/90 text-sm">
                      <span className="text-reginify-gold font-medium">Pro Tip: </span>
                      {item.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Results Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,_rgba(212,175,55,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_120%,_rgba(212,175,55,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center justify-center gap-2 bg-reginify-navy/5 px-4 py-2 rounded-full">
                <BeakerIcon className="w-5 h-5 text-reginify-navy" />
                <span className="text-reginify-navy font-garet-book text-sm tracking-wider uppercase">
                  Clinical Study Results
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-garet text-reginify-navy">
                Proven Effectiveness
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                In a 12-week clinical study with 100 participants, our formula demonstrated significant improvements in hair health and growth.
              </p>
            </motion.div>
          </div>

          {/* Clinical Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                percentage: "92%",
                description: "Reported visible improvement in hair thickness",
                weeks: 8
              },
              {
                percentage: "87%",
                description: "Experienced reduced hair breakage",
                weeks: 4
              },
              {
                percentage: "95%",
                description: "Noticed healthier, more manageable hair",
                weeks: 12
              },
              {
                percentage: "89%",
                description: "Saw increased hair growth and density",
                weeks: 12
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100
                         hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="text-4xl md:text-5xl font-garet text-reginify-gold font-bold group-hover:scale-110 transition-transform">
                    {stat.percentage}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">
                    {stat.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-reginify-navy/5 px-3 py-1 rounded-full">
                    <ClockIcon className="w-4 h-4 text-reginify-navy" />
                    <span className="text-sm text-reginify-navy">
                      {stat.weeks} weeks
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Study Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Study Methodology */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-garet text-reginify-navy mb-4">Study Methodology</h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: UserGroupIcon,
                    title: "Participants",
                    description: "100 individuals aged 25-55 with various hair types"
                  },
                  {
                    icon: ClockIcon,
                    title: "Duration",
                    description: "12-week controlled clinical study"
                  },
                  {
                    icon: ChartBarIcon,
                    title: "Measurements",
                    description: "Weekly progress tracking using advanced imaging technology"
                  },
                  {
                    icon: BeakerIcon,
                    title: "Evaluation",
                    description: "Conducted by independent dermatologists"
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-reginify-navy/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-reginify-navy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-reginify-navy">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scientific Validation */}
            <div className="space-y-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckBadgeIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-garet text-lg text-reginify-navy mb-2">Dermatologically Tested</h4>
                    <p className="text-sm text-gray-600">
                      Our formula has been extensively tested and validated by leading dermatologists for safety and efficacy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-garet text-lg text-reginify-navy mb-2">Published Research</h4>
                    <p className="text-sm text-gray-600">
                      Results have been documented in peer-reviewed scientific journals and presented at international conferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
    </main>
  );
};

export default Product;
