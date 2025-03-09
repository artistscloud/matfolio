
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, LogOut, FileText, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

// Sample blog post data - in a real app, this would be stored in a database
const initialBlogPosts = [
  {
    id: 'ai-trends-2023',
    title: 'Top AI Trends to Watch in 2023',
    category: 'AI',
    excerpt: 'Explore the most influential artificial intelligence trends that are shaping industries and transforming how businesses operate.',
    content: 'This is the full content of the blog post. In a real application, this would be much longer and formatted with rich text.',
    date: '2023-06-15',
    author: 'Jane Smith',
    imageUrl: 'https://images.unsplash.com/photo-1677442135309-cc775fcbb539',
  },
  {
    id: 'nonverbal-communication',
    title: 'The Power of Nonverbal Communication in Leadership',
    category: 'Body Language',
    excerpt: 'How understanding and mastering nonverbal cues can significantly improve your effectiveness as a leader.',
    content: 'This is the full content of the blog post. In a real application, this would be much longer and formatted with rich text.',
    date: '2023-05-22',
    author: 'John Doe',
    imageUrl: 'https://images.unsplash.com/photo-1557425529-b1ae9c141e7f',
  },
];

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  
  // For blog post form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    // In a real app, we would fetch data from an API
    // For this demo, we're using the static data
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setBlogPosts(JSON.parse(storedPosts));
    } else {
      setBlogPosts(initialBlogPosts);
      localStorage.setItem('blogPosts', JSON.stringify(initialBlogPosts));
    }
  }, [user, navigate]);

  const handleNewPost = () => {
    setCurrentPost(null);
    setTitle('');
    setCategory('');
    setExcerpt('');
    setContent('');
    setImageUrl('');
    setIsEditing(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setTitle(post.title);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setImageUrl(post.imageUrl);
    setIsEditing(true);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = blogPosts.filter(post => post.id !== postId);
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      toast.success('Post deleted successfully');
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    
    if (currentPost) {
      // Update existing post
      const updatedPosts = blogPosts.map(post => {
        if (post.id === currentPost.id) {
          return {
            ...post,
            title,
            category,
            excerpt,
            content,
            imageUrl,
          };
        }
        return post;
      });
      
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      toast.success('Post updated successfully');
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title,
        category,
        excerpt,
        content,
        date: today,
        author: user?.username || 'Admin',
        imageUrl,
      };
      
      const updatedPosts = [...blogPosts, newPost];
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      toast.success('New post created successfully');
    }
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentPost(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null; // This will be handled by the useEffect redirect
  }

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold text-matteblack-800"
            >
              Admin Dashboard
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </motion.div>
          </div>

          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-matteblack-800">
                  {currentPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                  <X size={18} />
                </Button>
              </div>
              
              <form onSubmit={handleSavePost} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-matteblack-700 mb-1">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-matteblack-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="AI">AI</option>
                    <option value="Body Language">Body Language</option>
                    <option value="Dev/Design">Dev/Design</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-matteblack-700 mb-1">
                    Excerpt
                  </label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary of the post"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-matteblack-700 mb-1">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Full post content"
                    rows={8}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-matteblack-700 mb-1">
                    Image URL
                  </label>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" type="button" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-forest-600 hover:bg-forest-700 text-white">
                    {currentPost ? 'Update Post' : 'Create Post'}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-matteblack-800">Blog Posts</h2>
                <Button onClick={handleNewPost} className="bg-forest-600 hover:bg-forest-700 text-white">
                  <Plus size={16} className="mr-2" />
                  New Post
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="min-w-full">
                  <div className="bg-forest-50 px-6 py-3 text-left text-xs font-medium text-forest-600 uppercase tracking-wider">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">Title</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {blogPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-4 group hover:bg-gray-50"
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-6 font-medium text-matteblack-700 truncate">
                            {post.title}
                          </div>
                          <div className="col-span-2 text-sm text-matteblack-500">
                            {post.category}
                          </div>
                          <div className="col-span-2 text-sm text-matteblack-500">
                            {post.date}
                          </div>
                          <div className="col-span-2 flex justify-end space-x-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditPost(post)}
                              className="text-forest-600 hover:text-forest-700 hover:bg-forest-50"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {blogPosts.length === 0 && (
                      <div className="px-6 py-8 text-center text-matteblack-500">
                        <FileText className="mx-auto h-8 w-8 text-matteblack-400 mb-2" />
                        <p>No blog posts found.</p>
                        <p className="text-sm mt-1">Create your first post to get started!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
