import { gql } from '@apollo/client';
import { shopifyClient } from '../utils/shopifyClient';

const GET_ARTICLES = gql`
  query GetArticles($first: Int!) {
    blogs(first: 10) {
      edges {
        node {
          handle
          title
          articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
            edges {
              node {
                id
                title
                handle
                excerpt
                content
                publishedAt
                image {
                  url
                  altText
                }
                author {
                  name
                }
                blog {
                  title
                }
                tags
              }
            }
          }
        }
      }
    }
  }
`;

export const getArticles = async (first = 6) => {
  try {
    console.log('Fetching articles with Apollo client...');
    const { data } = await shopifyClient.query({
      query: GET_ARTICLES,
      variables: { first }
    });
    
    console.log('Raw blog data:', data);
    
    // Get all blogs and their articles
    const blogs = data.blogs.edges || [];
    console.log('Found blogs:', blogs.map(b => b.node.title));
    
    // Get articles from all blogs
    const allArticles = blogs.flatMap(blog => 
      blog.node.articles.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        excerpt: node.excerpt || node.content.substring(0, 150) + '...',
        content: node.content,
        publishedAt: new Date(node.publishedAt),
        image: node.image?.url || '/images/blog-placeholder.jpg',
        imageAlt: node.image?.altText || node.title,
        author: node.author?.name || 'Regenefi Team',
        blogTitle: node.blog.title,
        tags: node.tags || []
      }))
    );
    
    // Sort by publish date
    allArticles.sort((a, b) => b.publishedAt - a.publishedAt);
    
    console.log('Processed articles:', allArticles);
    return allArticles;
  } catch (error) {
    console.error('Error fetching Shopify blog articles:', error);
    return [];
  }
};

const GET_ARTICLE = gql`
  query GetArticle($handle: String!) {
    blogs(first: 10) {
      edges {
        node {
          articles(first: 1, query: $handle) {
            edges {
              node {
                id
                title
                handle
                content
                publishedAt
                image {
                  url
                  altText
                }
                author {
                  name
                }
                blog {
                  title
                }
                tags
              }
            }
          }
        }
      }
    }
  }
`;

export const getArticleByHandle = async (handle) => {
  try {
    const { data } = await shopifyClient.query({
      query: GET_ARTICLE,
      variables: { handle }
    });

    const articles = data.blogs.edges.flatMap(blog => 
      blog.node.articles.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        content: node.content,
        publishedAt: new Date(node.publishedAt),
        image: node.image?.url || '/images/blog-placeholder.jpg',
        imageAlt: node.image?.altText || node.title,
        author: node.author?.name || 'Regenefi Team',
        blogTitle: node.blog.title,
        tags: node.tags || []
      }))
    );

    return articles.find(article => article.handle === handle) || null;
  } catch (error) {
    console.error('Error fetching Shopify blog article:', error);
    return null;
  }
};
