import React from 'react';

const IngredientModal = ({ isOpen, onClose, ingredient }) => {
  if (!isOpen) return null;

  const ingredients = {
    'Argan Oil': {
      title: 'Argan Oil',
      origin: 'Derived from the kernels of the argan tree native to Morocco',
      benefits: [
        'Rich in essential fatty acids and vitamin E',
        'Helps protect hair from damage',
        'Reduces frizz and adds shine',
        'Promotes elasticity and prevents breakage'
      ],
      composition: [
        'Vitamin E',
        'Fatty acids (oleic and linoleic)',
        'Antioxidants',
        'Omega-6 fatty acids'
      ],
      usage: 'Traditionally used by Moroccan women for centuries as a hair and skin treatment.',
      gradient: 'from-[#FFD700] to-[#D4AF37]'
    },
    'Jojoba Oil': {
      title: 'Jojoba Oil',
      origin: 'Extracted from the seeds of the jojoba plant native to southwestern North America',
      benefits: [
        'Moisturizes without leaving residue',
        'Balances scalp oil production',
        'Promotes healthy scalp conditions',
        'Strengthens hair follicles'
      ],
      composition: [
        'Vitamin B and E',
        'Minerals (zinc, copper, chromium)',
        'Iodine',
        'Fatty acids'
      ],
      usage: 'Similar in composition to our natural scalp oils, making it perfect for hair care.',
      gradient: 'from-[#98C379] to-[#85BB65]'
    },
    'Coconut Oil': {
      title: 'Coconut Oil',
      origin: 'Extracted from mature coconuts harvested from coconut palms',
      benefits: [
        'Penetrates deep into hair shaft',
        'Prevents protein loss',
        'Provides intense moisturization',
        'Protects from environmental damage'
      ],
      composition: [
        'Lauric acid',
        'Medium-chain fatty acids',
        'Vitamin E',
        'Antimicrobial properties'
      ],
      usage: 'Used for centuries in tropical regions for hair care and protection.',
      gradient: 'from-white to-[#F5F5F5]'
    },
    'Vitamin E': {
      title: 'Vitamin E',
      origin: 'Natural antioxidant found in various plant-based oils',
      benefits: [
        'Powerful antioxidant protection',
        'Repairs and builds tissue',
        'Promotes healthy hair growth',
        'Reduces oxidative stress'
      ],
      composition: [
        'Tocopherols',
        'Tocotrienols',
        'Antioxidant compounds',
        'Free radical neutralizers'
      ],
      usage: 'Essential nutrient for hair health, both applied topically and consumed.',
      gradient: 'from-[#FFB6B6] to-[#FF9999]'
    }
  };

  const info = ingredients[ingredient];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className={`relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 scale-100 opacity-100`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${info.gradient} p-6`}>
          <h3 className="text-2xl font-bold text-white mb-2">{info.title}</h3>
          <p className="text-white/90 text-sm">{info.origin}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Benefits */}
          <div>
            <h4 className="text-lg font-semibold text-reginify-navy mb-3">Benefits</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {info.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-reginify-gold mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-reginify-navy/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Composition */}
          <div>
            <h4 className="text-lg font-semibold text-reginify-navy mb-3">Key Components</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {info.composition.map((component, index) => (
                <div key={index} className="bg-reginify-cream/30 rounded-lg p-3 text-center">
                  <span className="text-sm text-reginify-navy/80">{component}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traditional Usage */}
          <div className="bg-reginify-cream/20 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-reginify-navy mb-2">Traditional Usage</h4>
            <p className="text-reginify-navy/80">{info.usage}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IngredientModal;
