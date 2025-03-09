
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

// Sample project data - in a real application, this would come from a CMS or API
const projectsData = [
  {
    id: 'ai-1',
    title: 'Neural Network Visualization',
    category: 'ai',
    description: 'An interactive visualization tool for neural networks that helps explain complex AI concepts to non-technical audiences.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    tags: ['Machine Learning', 'Data Visualization', 'Education'],
  },
  {
    id: 'ai-2',
    title: 'Sentiment Analysis Platform',
    category: 'ai',
    description: 'A platform that analyzes customer feedback across multiple channels to provide actionable insights for businesses.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tags: ['NLP', 'Business Intelligence', 'Customer Experience'],
  },
  {
    id: 'body-1',
    title: 'Nonverbal Communication Training',
    category: 'body-language',
    description: 'A comprehensive training program for executives to improve their nonverbal communication skills in professional settings.',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    tags: ['Executive Training', 'Communication', 'Leadership'],
  },
  {
    id: 'body-2',
    title: 'Micro-Expression Detection Tool',
    category: 'body-language',
    description: 'Software that helps detect and analyze micro-expressions for research and training purposes.',
    imageUrl: 'https://images.unsplash.com/photo-1489533119213-66a5cd877091',
    tags: ['Facial Recognition', 'Psychology', 'Research'],
  },
  {
    id: 'dev-1',
    title: 'E-commerce Platform Redesign',
    category: 'dev-design',
    description: 'A complete redesign and development of an e-commerce platform focused on user experience and conversion optimization.',
    imageUrl: 'https://images.unsplash.com/photo-1523540939399-141cbff6a8d7',
    tags: ['UX/UI', 'E-commerce', 'Frontend'],
  },
  {
    id: 'dev-2',
    title: 'Mobile App for Health Tracking',
    category: 'dev-design',
    description: 'A mobile application designed to help users track their health metrics and set wellness goals.',
    imageUrl: 'https://images.unsplash.com/photo-1510511336377-1a9d3abcbd3e',
    tags: ['Mobile Development', 'Health Tech', 'UX Design'],
  },
];

interface ProjectCardProps {
  project: typeof projectsData[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all-300"
    >
      <div className="h-56 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-all-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-matteblack-100 text-matteblack-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-medium text-matteblack-800 mb-2">
          {project.title}
        </h3>
        <p className="text-matteblack-600 mb-4">
          {project.description}
        </p>
        <motion.a
          href={`/projects/${project.id}`}
          whileHover={{ x: 5 }}
          className="inline-flex items-center font-medium text-forest-600"
        >
          <span>View Project</span>
          <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === filter));
    }
  }, [filter]);

  // Check for hash in URL to set initial filter
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === 'ai' || hash === 'body-language' || hash === 'dev-design') {
      setFilter(hash);
    }
  }, []);

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
              Projects
            </h1>
            <p className="text-lg text-matteblack-600 max-w-3xl mx-auto">
              Explore my portfolio of work across different industries and disciplines
            </p>
          </motion.div>

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
                All Projects
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
                onClick={() => setFilter('body-language')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all-300 ${
                  filter === 'body-language'
                    ? 'bg-forest-600 text-white'
                    : 'bg-matteblack-100 text-matteblack-700 hover:bg-matteblack-200'
                }`}
              >
                Body Language
              </button>
              <button
                onClick={() => setFilter('dev-design')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all-300 ${
                  filter === 'dev-design'
                    ? 'bg-forest-600 text-white'
                    : 'bg-matteblack-100 text-matteblack-700 hover:bg-matteblack-200'
                }`}
              >
                Dev/Design
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-matteblack-600">No projects found with the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
