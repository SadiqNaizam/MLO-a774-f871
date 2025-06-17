import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  path: string;
}

const footerLinks: FooterLink[] = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact Support', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
];

const Footer: React.FC = () => {
  console.log('Footer loaded');

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-6" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Food Delivery App. All rights reserved.</p>
          <p className="mt-1">Built with care for hungry people.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;