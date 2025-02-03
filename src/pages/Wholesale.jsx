import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createWholesaleInquiry } from '../services/shopifyService';
import { ArrowLongRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Wholesale = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: 'salon',
    monthlyVolume: 'less_than_50',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createWholesaleInquiry(formData);
      setSuccess(true);
      setFormData({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: 'salon',
        monthlyVolume: 'less_than_50',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-reginify-gold/5 to-reginify-navy/5 pt-8 md:pt-20 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(212,175,55,0.15),transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(0,32,91,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-reginify-gold/20 to-transparent rounded-full blur-3xl" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-garet text-reginify-navy mb-6 leading-tight relative z-10">
                  Join Our
                  <span className="block text-reginify-gold">Wholesale Family</span>
                </h1>
              </div>
              <p className="text-lg text-reginify-navy/70 mb-8 font-garet-book max-w-xl leading-relaxed">
                Partner with us to bring luxury hair care to your business. 
                Complete the form to start your wholesale journey with Regenefi.
              </p>
              <div className="space-y-6 text-reginify-navy/70">
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-white to-reginify-gold/5 hover:from-reginify-gold/10 hover:to-white transition-all duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-reginify-gold/20 to-reginify-gold/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-reginify-gold font-garet">01</span>
                  </div>
                  <p className="font-garet-book">Complete the wholesale application form</p>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-white to-reginify-gold/5 hover:from-reginify-gold/10 hover:to-white transition-all duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-reginify-gold/20 to-reginify-gold/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-reginify-gold font-garet">02</span>
                  </div>
                  <p className="font-garet-book">Our team will review your application</p>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-white to-reginify-gold/5 hover:from-reginify-gold/10 hover:to-white transition-all duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-reginify-gold/20 to-reginify-gold/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-reginify-gold font-garet">03</span>
                  </div>
                  <p className="font-garet-book">Get access to wholesale pricing and benefits</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white to-reginify-gold/5 backdrop-blur-lg rounded-2xl shadow-xl shadow-reginify-navy/5 p-8 md:p-12 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-reginify-gold/10 rounded-2xl" />
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 border-2 border-reginify-gold/20 rounded-bl-3xl" />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-16 h-16 border-2 border-reginify-gold/20 rounded-tr-3xl" />
              </div>

              {success ? (
                <div className="text-center py-12">
                  <div className="relative inline-block">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6 relative z-10" />
                    <div className="absolute inset-0 bg-green-100 rounded-full filter blur-xl" />
                  </div>
                  <h3 className="text-2xl font-garet text-reginify-navy mb-4">
                    Application Submitted!
                  </h3>
                  <p className="text-reginify-navy/70 font-garet-book">
                    Thank you for your interest. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-garet text-reginify-navy mb-2">
                        Business Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-reginify-gold/20 
                                 focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                                 text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-garet text-reginify-navy mb-2">
                        Contact Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-reginify-gold/20 
                                 focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                                 text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-garet text-reginify-navy mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-reginify-gold/20 
                                 focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                                 text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-garet text-reginify-navy mb-2">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-reginify-gold/20 
                                 focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                                 text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-garet text-reginify-navy mb-2">
                        Business Type *
                      </label>
                      <select
                        required
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-reginify-gold/20 
                                 focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                                 text-reginify-navy bg-white/50 appearance-none
                                 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23D4AF37%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
                                 bg-[length:24px] bg-[right_8px_center] bg-no-repeat"
                      >
                        <option value="salon">Salon</option>
                        <option value="spa">Spa</option>
                        <option value="retailer">Retailer</option>
                        <option value="distributor">Distributor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-garet text-reginify-navy mb-2">
                        Monthly Volume *
                      </label>
                      <select
                        required
                        name="monthlyVolume"
                        value={formData.monthlyVolume}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-reginify-gold/20 
                                 focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                                 text-reginify-navy bg-white/50 appearance-none
                                 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23D4AF37%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
                                 bg-[length:24px] bg-[right_8px_center] bg-no-repeat"
                      >
                        <option value="less_than_50">Less than 50 units</option>
                        <option value="50_to_100">50-100 units</option>
                        <option value="100_to_500">100-500 units</option>
                        <option value="more_than_500">More than 500 units</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-garet text-reginify-navy mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-reginify-gold/20 
                               focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                               text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                      placeholder="Tell us about your business..."
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-8 py-4 bg-gradient-to-r from-reginify-gold to-reginify-gold/90 text-reginify-navy rounded-lg
                               font-garet text-sm uppercase tracking-wider transition-all duration-300
                               hover:shadow-lg hover:shadow-reginify-gold/20 hover:from-reginify-gold/90 hover:to-reginify-gold
                               disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center space-x-2 relative overflow-hidden"
                    >
                      <span className="relative z-10">{loading ? 'Submitting...' : 'Submit Application'}</span>
                      {!loading && (
                        <ArrowLongRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-reginify-gold/10 transition-all duration-300" />
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wholesale;
