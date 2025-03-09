
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import IndustryShowcase from '@/components/IndustryShowcase';

const Index: React.FC = () => {
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-16">
        <Hero />
        <IndustryShowcase />
        
        <section className="bg-matteblack-800 text-white py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to Start a Project?</h2>
              <p className="text-matteblack-200 mb-10">
                Let's collaborate to bring your vision to life. Whether it's AI, body language consulting, or design and development, we're here to help.
              </p>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-forest-600 text-white rounded-md font-medium shadow-md hover:bg-forest-700 transition-all-300"
              >
                Explore Projects
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
