import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getArticleByHandle } from '../services/shopifyBlog';
import { ArrowLeftIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

const BlogPost = () => {
  const { handle } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleByHandle(handle);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-reginify-gold"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-garet text-reginify-navy mb-4">Article Not Found</h1>
        <p className="text-reginify-navy/70 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 bg-reginify-gold text-white rounded-lg
                    hover:bg-reginify-gold/90 transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] bg-reginify-navy overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-reginify-navy/60 z-10"></div>
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <motion.div 
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-garet text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{article.publishedAt}</span>
              </div>
              {article.category && (
                <div className="flex items-center gap-2">
                  <TagIcon className="w-5 h-5" />
                  <span>{article.category}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <motion.article 
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-reginify-navy/10">
          <div className="w-12 h-12 rounded-full bg-reginify-cream flex items-center justify-center">
            <span className="text-reginify-gold font-medium text-lg">
              {article.author[0]}
            </span>
          </div>
          <div>
            <div className="font-medium text-reginify-navy">{article.author}</div>
            <div className="text-sm text-reginify-navy/60">Author</div>
          </div>
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-lg max-w-none prose-headings:font-garet prose-headings:text-reginify-navy
                     prose-p:text-reginify-navy/80 prose-p:font-garet-book prose-a:text-reginify-gold
                     prose-strong:text-reginify-navy prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-reginify-navy/10">
            <h2 className="text-sm uppercase tracking-wider text-reginify-navy/60 mb-4">
              Tagged with
            </h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-reginify-cream text-reginify-navy rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.article>

      {/* Back to Blog */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 bg-reginify-navy text-white rounded-lg
                    hover:bg-reginify-gold transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
