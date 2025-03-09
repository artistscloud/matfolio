
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Eye } from 'lucide-react';

interface IndustryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  id: string;
  isReversed?: boolean;
}

const Industry: React.FC<IndustryProps> = ({
  title,
  description,
  icon,
  color,
  id,
  isReversed = false,
}) => {
  return (
    <section
      id={id}
      className={`py-20 ${isReversed ? 'bg-matteblack-50' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
            isReversed ? 'md:flex-row-reverse' : ''
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${color}`}>
              {icon}
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-matteblack-800">
              {title}
            </h2>
            <p className="text-lg text-matteblack-600 leading-relaxed">
              {description}
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-block"
            >
              <a
                href={`/projects#${id}`}
                className="font-medium text-forest-600 flex items-center space-x-2 group"
              >
                <span>View related projects</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`bg-gradient-to-br ${isReversed ? 'order-first md:order-last' : ''} ${color} rounded-2xl overflow-hidden shadow-lg aspect-video flex items-center justify-center`}
          >
            <div className="p-8 text-center">
              <div className="text-white text-9xl opacity-30 flex justify-center">
                {icon}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const IndustryShowcase: React.FC = () => {
  return (
    <div id="industries">
      <Industry
        id="ai"
        title="Artificial Intelligence"
        description="Developing innovative AI solutions that transform industries and enhance human capabilities. From machine learning to natural language processing, our AI projects are designed to solve complex problems with elegant solutions."
        icon={<Brain size={48} className="text-white" />}
        color="from-forest-500 to-forest-700"
        isReversed={false}
      />

      <Industry
        id="body-language"
        title="Body Language"
        description="Exploring the silent language of human communication. Our body language expertise helps individuals and organizations understand nonverbal cues, improve interpersonal interactions, and develop authentic presence in any setting."
        icon={<Eye size={48} className="text-white" />}
        color="from-matteblack-700 to-matteblack-900"
        isReversed={true}
      />

      <Industry
        id="dev-design"
        title="Development & Design"
        description="Creating digital experiences that merge aesthetics with functionality. Our development and design philosophy centers on user-focused solutions, clean code, and intuitive interfaces that delight users and fulfill business objectives."
        icon={<Code size={48} className="text-white" />}
        color="from-forest-500 to-forest-700"
        isReversed={false}
      />
    </div>
  );
};

export default IndustryShowcase;
