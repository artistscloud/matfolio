
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-matteblack-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
            <p className="text-matteblack-200 text-sm leading-relaxed">
              A creative portfolio showcasing work across AI, Body Language, and Design & Development.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-matteblack-200 hover:text-white transition-all-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-matteblack-200 hover:text-white transition-all-300 text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-matteblack-200 hover:text-white transition-all-300 text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Industries</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/#ai" className="text-matteblack-200 hover:text-white transition-all-300 text-sm">
                  AI
                </Link>
              </li>
              <li>
                <Link to="/#body-language" className="text-matteblack-200 hover:text-white transition-all-300 text-sm">
                  Body Language
                </Link>
              </li>
              <li>
                <Link to="/#dev-design" className="text-matteblack-200 hover:text-white transition-all-300 text-sm">
                  Dev/Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-matteblack-200 hover:text-white transition-all-300">
                <Github size={20} />
              </a>
              <a href="#" className="text-matteblack-200 hover:text-white transition-all-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-matteblack-200 hover:text-white transition-all-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-matteblack-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-matteblack-300 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-matteblack-300 hover:text-white text-sm transition-all-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-matteblack-300 hover:text-white text-sm transition-all-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
