
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Layout from '@/components/Layout';

// This would typically come from a database or API
const blogPostsData = [
  {
    id: 'ai-trends-2023',
    title: 'Top AI Trends to Watch in 2023',
    category: 'AI',
    excerpt: 'Explore the most influential artificial intelligence trends that are shaping industries and transforming how businesses operate.',
    content: `
      <p>Artificial Intelligence continues to evolve at a rapid pace, transforming industries and creating new opportunities for innovation. In this article, we'll explore the most significant AI trends that are shaping the technological landscape in 2023.</p>
      
      <h2>1. Generative AI Goes Mainstream</h2>
      <p>Generative AI models like GPT-4 and DALL-E have captured public imagination with their ability to create human-like text, images, and even code. In 2023, we're seeing these technologies being integrated into mainstream products and services, from content creation tools to customer service applications.</p>
      
      <h2>2. AI in Healthcare Advances</h2>
      <p>The healthcare industry is witnessing unprecedented advancements through AI applications. From drug discovery to personalized treatment plans, AI is revolutionizing patient care and medical research. Machine learning algorithms are becoming increasingly adept at analyzing medical images, detecting patterns that might escape human observation.</p>
      
      <h2>3. Sustainable AI Initiatives</h2>
      <p>As awareness of AI's environmental impact grows, we're seeing a stronger focus on developing energy-efficient algorithms and computing infrastructure. Organizations are increasingly prioritizing sustainable AI practices that reduce carbon footprints while maintaining performance.</p>
      
      <h2>4. Enhanced AI Governance</h2>
      <p>With AI's growing influence comes increased scrutiny. Governments and organizations worldwide are developing more robust frameworks for AI governance, addressing concerns around ethics, privacy, and bias. Responsible AI is becoming a key consideration for businesses implementing AI solutions.</p>
      
      <h2>5. AI-Driven Automation Expansion</h2>
      <p>Automation powered by AI is extending beyond routine tasks to more complex processes, enabling organizations to optimize operations and redirect human resources to higher-value activities. This trend is particularly evident in manufacturing, logistics, and administrative functions.</p>
      
      <p>As AI continues to evolve, staying informed about these trends is essential for businesses looking to leverage the technology's potential. The organizations that successfully integrate AI into their strategies while addressing the associated challenges will be well-positioned for success in the increasingly competitive digital landscape.</p>
    `,
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
    content: `
      <p>Leadership extends far beyond spoken words. In fact, research suggests that nonverbal communication can account for up to 93% of the meaning conveyed in interpersonal interactions. For leaders, mastering the art of body language is not just beneficial—it's essential.</p>
      
      <h2>The Silent Language of Leadership</h2>
      <p>Every gesture, facial expression, and posture communicates something to those around you. As a leader, your nonverbal cues can either reinforce or undermine your verbal message. Understanding this silent language gives you a powerful tool to enhance your leadership effectiveness.</p>
      
      <h2>Building Trust Through Body Language</h2>
      <p>Trust is the foundation of effective leadership, and your nonverbal communication plays a crucial role in building it. Maintaining appropriate eye contact, offering an authentic smile, and displaying open posture all signal trustworthiness to your team members.</p>
      
      <h2>Conveying Confidence</h2>
      <p>In times of uncertainty, teams look to their leaders for stability and direction. Your body language can project the confidence needed to reassure your team, even when facing challenges. Standing tall, speaking with a measured pace, and using purposeful gestures all communicate confidence and competence.</p>
      
      <h2>Active Listening Through Nonverbal Cues</h2>
      <p>Effective leaders are also effective listeners. Your nonverbal behavior during conversations signals whether you're truly engaged or merely waiting for your turn to speak. Nodding appropriately, maintaining eye contact, and leaning slightly forward all demonstrate that you value what others are saying.</p>
      
      <h2>Cultural Considerations</h2>
      <p>It's important to recognize that nonverbal communication varies across cultures. What's considered appropriate in one cultural context may be perceived differently in another. Leaders in global organizations must be particularly sensitive to these differences to communicate effectively with diverse teams.</p>
      
      <p>By developing awareness of your own nonverbal communication and learning to read the cues of others, you can significantly enhance your leadership impact. Remember that authenticity is key—your body language should align with your words and values to create a cohesive and trustworthy leadership presence.</p>
    `,
    date: '2023-05-22',
    author: 'John Doe',
    imageUrl: 'https://images.unsplash.com/photo-1557425529-b1ae9c141e7f',
    readTime: '7 min read',
  },
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<typeof blogPostsData[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we're searching our static data
    setIsLoading(true);
    
    // Check localStorage first for custom posts from the dashboard
    const storedPosts = localStorage.getItem('blogPosts');
    let allPosts = blogPostsData;
    
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        allPosts = parsedPosts;
      } catch (error) {
        console.error('Failed to parse stored posts:', error);
      }
    }
    
    const foundPost = allPosts.find(p => p.id === id);
    setPost(foundPost || null);
    setIsLoading(false);
  }, [id]);

  // Format date to be more readable
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-24 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-matteblack-600">Loading article...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="pt-24 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="text-center py-16">
              <h1 className="text-2xl font-medium text-matteblack-800 mb-4">
                Article Not Found
              </h1>
              <p className="text-matteblack-600 mb-8">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center text-forest-600 hover:text-forest-700"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center text-matteblack-600 hover:text-forest-600 mb-8"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Articles
              </Link>

              <div className="mb-6">
                <span className="inline-block text-sm font-medium px-3 py-1 bg-forest-50 text-forest-600 rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-semibold text-matteblack-800 mb-6">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center text-matteblack-500 text-sm mb-8">
                  <div className="flex items-center mr-6">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center mr-6">
                    <User size={16} className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden mb-10">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="border-t border-gray-200 pt-8 mt-12">
                <h3 className="text-xl font-medium text-matteblack-800 mb-4">
                  Share this article
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="px-4 py-2 bg-[#1DA1F2] text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-all-300"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 bg-[#4267B2] text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-all-300"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 bg-[#0077B5] text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-all-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPost;
