"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const navItems = [
    { label: 'Home', href: '#' },
    { 
      label: 'About', 
      href: '#',
      dropdown: ['About MCA', 'Vision & Mission', 'Organization Structure', 'Annual Reports']
    },
    { 
      label: 'Programmes', 
      href: '#',
      dropdown: ['PM Internship', 'Digital India', 'Skill Development', 'Innovation Hub']
    },
    { 
      label: 'Resources', 
      href: '#',
      dropdown: ['Guidelines', 'FAQs', 'Downloads', 'Useful Links']
    },
    { label: 'News & Updates', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">MCA</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Ministry of Corporate Affairs</h1>
              <p className="text-sm text-gray-600">Government of India</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </button>
                
                {item.dropdown && activeDropdown === index && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="block py-2 text-gray-700 hover:text-blue-600">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;