
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Trending', path: '/trending' },
    { title: 'Categories', path: '/categories' },
    { title: 'Deals', path: '/deals' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gloprice-darkerBg/80 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex ml-4 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Search */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Input
                  className="w-full bg-gray-800 border-0 text-gray-200 pl-10 pr-4 py-2 rounded-full"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>
          )}

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {!isMobile && (
              <>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Bell className="h-5 w-5" />
                </Button>
              </>
            )}
            
            <Link to="/login">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white md:hidden"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        {isMobile && (
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="relative w-full">
              <Input
                className="w-full bg-gray-800 border-0 text-gray-200 pl-10 pr-4 py-2 rounded-full"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </form>
        )}

        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && (
          <nav className="mt-3 border-t border-gray-800 py-2 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
