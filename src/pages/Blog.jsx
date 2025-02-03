import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getArticles } from '../services/shopifyBlog';
import { 
  ArrowRightIcon, 
  CalendarIcon, 
  TagIcon, 
  UserIcon,
  ChevronRightIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('Starting to fetch articles...');
        setLoading(true);
        setError(null);
        
        const fetchedArticles = await getArticles(7);
        console.log('Fetched articles:', fetchedArticles);
        
        if (Array.isArray(fetchedArticles) && fetchedArticles.length > 0) {
          setFeaturedPost(fetchedArticles[0]);
          setArticles(fetchedArticles.slice(1));
          console.log('Set featured post:', fetchedArticles[0]);
          console.log('Set articles:', fetchedArticles.slice(1));
        } else {
          console.log('No articles found or invalid response');
          setError('No articles found. Please check back later.');
        }
      } catch (error) {
        console.error('Error in fetchArticles:', error);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Format date helper
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Estimate read time helper
  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/)?.length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-reginify-cream/10">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(193,155,118,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-5"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-reginify-gold/10 text-reginify-gold text-sm font-medium mb-6">
              The Journal
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-garet text-reginify-navy mb-6 tracking-wider leading-tight">
              Discover the Art of
              <span className="block text-reginify-gold mt-2">Hair Care Excellence</span>
            </h1>
            <div className="w-20 h-px bg-reginify-gold/30 mx-auto mb-6"></div>
            <p className="text-lg text-reginify-navy/70 font-garet-book leading-relaxed">
              Expert insights, tips, and the latest trends in premium hair care,
              curated by industry professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-reginify-gold"></div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-reginify-navy/70 text-lg">{error}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(20,28,78,0.05)]
                           transform hover:shadow-[0_4px_25px_-5px_rgba(20,28,78,0.1)] transition-all duration-500
                           bg-white"
                {...fadeInUp}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden">
                    <div className="absolute inset-0 bg-reginify-navy/10"></div>
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    {/* Category Tag */}
                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-reginify-navy
                                     shadow-sm">
                          {featuredPost.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-reginify-gold/30 via-reginify-gold to-reginify-gold/30"></div>
                    
                    {/* Featured Badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-reginify-gold/10 text-reginify-gold font-medium mb-6">
                      Featured Article
                    </span>
                    
                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-garet text-reginify-navy mb-4 leading-tight hover:text-reginify-gold transition-colors">
                      {featuredPost.title}
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-reginify-navy/70 mb-6 font-garet-book leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-reginify-navy/60">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(featuredPost.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>{getReadTime(featuredPost.content)}</span>
                      </div>
                    </div>
                    
                    {/* Author and CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-reginify-cream flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-reginify-gold" />
                        </div>
                        <div>
                          <p className="text-reginify-navy font-medium">{featuredPost.author}</p>
                          <p className="text-sm text-reginify-navy/50">Author</p>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${featuredPost.handle}`}
                        className="inline-flex items-center whitespace-nowrap px-5 py-2.5 bg-reginify-gold/10 rounded-full
                                 text-reginify-gold hover:bg-reginify-gold hover:text-white transition-all duration-300
                                 group text-sm font-medium"
                      >
                        Read Article
                        <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Recent Articles Grid */}
          {articles.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
              <motion.div 
                className="flex justify-between items-end mb-12"
                {...fadeInUp}
              >
                <div>
                  <span className="text-sm text-reginify-gold uppercase tracking-wider font-medium mb-2 block">
                    Latest Articles
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-garet text-reginify-navy tracking-wider">
                    Explore Our Collection
                  </h2>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles.map((article, index) => (
                  <motion.article 
                    key={article.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(20,28,78,0.05)]
                             hover:shadow-[0_4px_25px_-5px_rgba(20,28,78,0.1)] transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${article.handle}`} className="block">
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.imageAlt}
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        {article.tags && article.tags.length > 0 && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-reginify-navy
                                         shadow-sm">
                              {article.tags[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-reginify-navy/50 mb-3">
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ClockIcon className="w-3.5 h-3.5" />
                            <span>{getReadTime(article.content)}</span>
                          </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-garet text-reginify-navy mb-2 leading-tight group-hover:text-reginify-gold transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-reginify-navy/70 text-xs sm:text-sm mb-4 line-clamp-2 font-garet-book">
                          {article.excerpt}
                        </p>
                        <div className="inline-flex items-center text-xs sm:text-sm text-reginify-gold group/link">
                          Read Article
                          <ChevronRightIcon className="w-3.5 h-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
