
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';

// Sample blog data - in a real application, this would come from a CMS or API
const blogPostsData = [
  {
    id: 'ai-trends-2023',
    title: 'Top AI Trends to Watch in 2023',
    category: 'AI',
    excerpt: 'Explore the most influential artificial intelligence trends that are shaping industries and transforming how businesses operate.',
    date: '2023-06-15',
    author: 'Jane Smith',
    imageUrl: 'https://images.unsplash.com/photo-1677442135309-cc775fcbb539',
    readTime: '5 min read',
  },
  {
    id: 'nonverbal-communication',
    title: 'The Power of Nonverbal Communication in Leadership',
    category: 'Body Language',
    excerpt: 'How understanding and mastering nonverbal cues can significantly improve your effectiveness as a leader.',
    date: '2023-05-22',
    author: 'John Doe',
    imageUrl: 'https://images.unsplash.com/photo-1557425529-b1ae9c141e7f',
    readTime: '7 min read',
  },
  {
    id: 'ux-design-principles',
    title: 'Essential UX Design Principles Every Developer Should Know',
    category: 'Dev/Design',
    excerpt: 'A comprehensive guide to the fundamental UX design principles that can enhance your development projects.',
    date: '2023-04-10',
    author: 'Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    readTime: '8 min read',
  },
  {
    id: 'machine-learning-basics',
    title: 'Machine Learning Fundamentals: A Beginner\'s Guide',
    category: 'AI',
    excerpt: 'Break down complex machine learning concepts into digestible information for those just starting their AI journey.',
    date: '2023-03-05',
    author: 'Michael Chang',
    imageUrl: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b',
    readTime: '10 min read',
  },
  {
    id: 'reading-facial-expressions',
    title: 'How to Accurately Read Facial Expressions in Business Settings',
    category: 'Body Language',
    excerpt: 'Practical tips for interpreting facial expressions to better understand colleagues and clients in professional environments.',
    date: '2023-02-19',
    author: 'Emily Wilson',
    imageUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21',
    readTime: '6 min read',
  },
  {
    id: 'responsive-design-techniques',
    title: 'Advanced Responsive Design Techniques for Modern Websites',
    category: 'Dev/Design',
    excerpt: 'Innovative approaches to creating responsive designs that work seamlessly across all devices and screen sizes.',
    date: '2023-01-30',
    author: 'David Lee',
    imageUrl: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a',
    readTime: '9 min read',
  },
];

// Format date to be more readable
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

interface BlogPostCardProps {
  post: typeof blogPostsData[0];
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all-300"
    >
      <Link to={`/blog/${post.id}`} className="block">
        <div className="h-52 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-all-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium px-3 py-1 bg-forest-50 text-forest-600 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-matteblack-500">{post.readTime}</span>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-medium text-matteblack-800 mb-2 hover:text-forest-600 transition-all-300">
            {post.title}
          </h3>
        </Link>
        <p className="text-matteblack-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-matteblack-500">
            {formatDate(post.date)}
          </span>
          <span className="text-xs text-matteblack-500">By {post.author}</span>
        </div>
      </div>
    </motion.article>
  );
};

const FeaturedPost: React.FC = () => {
  const featuredPost = blogPostsData[0]; // Use first post as featured

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-xl overflow-hidden shadow-md"
      >
        <div className="lg:col-span-3 h-64 lg:h-auto overflow-hidden">
          <img
            src={featuredPost.imageUrl}
            alt={featuredPost.title}
            className="w-full h-full object-cover transition-all-300 hover:scale-105"
          />
        </div>
        <div className="lg:col-span-2 p-8 flex flex-col justify-center">
          <span className="text-sm font-medium px-3 py-1 bg-forest-50 text-forest-600 rounded-full inline-block mb-4 w-max">
            {featuredPost.category}
          </span>
          <Link to={`/blog/${featuredPost.id}`}>
            <h2 className="text-2xl md:text-3xl font-medium text-matteblack-800 mb-4 hover:text-forest-600 transition-all-300">
              {featuredPost.title}
            </h2>
          </Link>
          <p className="text-matteblack-600 mb-6">
            {featuredPost.excerpt}
          </p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-matteblack-500">
              {formatDate(featuredPost.date)}
            </span>
            <span className="text-sm text-matteblack-500">{featuredPost.readTime}</span>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            className="inline-block"
          >
            <Link
              to={`/blog/${featuredPost.id}`}
              className="font-medium text-forest-600 flex items-center space-x-2 group"
            >
              <span>Read Full Article</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredPosts = blogPostsData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filter === 'all' || post.category.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-matteblack-800 mb-4">
              Blog
            </h1>
            <p className="text-lg text-matteblack-600 max-w-3xl mx-auto">
              Insights, thoughts, and explorations across AI, Body Language, and Design & Development
            </p>
          </motion.div>

          <div className="mb-12 max-w-xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-matteblack-400 h-4 w-4" />
            </div>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all-300 ${
                  filter === 'all'
                    ? 'bg-forest-600 text-white'
                    : 'bg-matteblack-100 text-matteblack-700 hover:bg-matteblack-200'
                }`}
              >
                All Categories
              </button>
              <button
                onClick={() => setFilter('ai')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all-300 ${
                  filter === 'ai'
                    ? 'bg-forest-600 text-white'
                    : 'bg-matteblack-100 text-matteblack-700 hover:bg-matteblack-200'
                }`}
              >
                AI
              </button>
              <button
                onClick={() => setFilter('body language')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all-300 ${
                  filter === 'body language'
                    ? 'bg-forest-600 text-white'
                    : 'bg-matteblack-100 text-matteblack-700 hover:bg-matteblack-200'
                }`}
              >
                Body Language
              </button>
              <button
                onClick={() => setFilter('dev/design')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all-300 ${
                  filter === 'dev/design'
                    ? 'bg-forest-600 text-white'
                    : 'bg-matteblack-100 text-matteblack-700 hover:bg-matteblack-200'
                }`}
              >
                Dev/Design
              </button>
            </div>
          </div>

          {/* Display featured post */}
          {searchQuery === '' && filter === 'all' && <FeaturedPost />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-matteblack-600">No articles found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
