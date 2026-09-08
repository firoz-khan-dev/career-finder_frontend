import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  InfoIcon, 
  PhoneIcon, 
  LogInIcon, 
  UserPlusIcon,
  LayoutDashboardIcon,
  ClipboardListIcon,
  ThumbsUpIcon,
  BookmarkIcon,
  BriefcaseIcon,
  FileTextIcon,
  BuildingIcon,
  PlusCircleIcon,
  ShieldIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  CompassIcon
} from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userRole = localStorage.getItem('role');
    setUser(loggedInUser);
    setRole(userRole);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const navLinks = {
    public: [
      { path: '/', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
      { path: '/about', label: 'About', icon: <InfoIcon className="w-4 h-4" /> },
      { path: '/contact', label: 'Contact', icon: <PhoneIcon className="w-4 h-4" /> }
    ],
    user: [
      { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon className="w-4 h-4" /> },
      { path: '/assessment', label: 'Assessment', icon: <ClipboardListIcon className="w-4 h-4" /> },
      { path: '/recommendations', label: 'Recommendations', icon: <ThumbsUpIcon className="w-4 h-4" /> },
      { path: '/saved-careers', label: 'Saved', icon: <BookmarkIcon className="w-4 h-4" /> },
      { path: '/jobs', label: 'Jobs', icon: <BriefcaseIcon className="w-4 h-4" /> },
      { path: '/upload-resume', label: 'Resume', icon: <FileTextIcon className="w-4 h-4" /> }
    ],
    employer: [
      { path: '/employer', label: 'Dashboard', icon: <BuildingIcon className="w-4 h-4" /> },
      { path: '/post-job', label: 'Post Job', icon: <PlusCircleIcon className="w-4 h-4" /> },
      { path: '/jobs', label: 'All Jobs', icon: <BriefcaseIcon className="w-4 h-4" /> }
    ],
    admin: [
      { path: '/admin', label: 'Admin Panel', icon: <ShieldIcon className="w-4 h-4" /> }
    ]
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon }) => (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
        isActive(to)
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      <span className="font-medium">{children}</span>
    </Link>
  );

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="group flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              <CompassIcon className="w-8 h-8 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
              <span>Career Finder</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Public Links */}
              { !user && navLinks.public.map((link) => (
                <NavLink key={link.path} to={link.path} icon={link.icon}>
                  {link.label}
                </NavLink>
              ))}

              {/* Role-based Links */}
              {user && role === 'user' && (
                <>
                  {navLinks.user.map((link) => (
                    <NavLink key={link.path} to={link.path} icon={link.icon}>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              {user && role === 'employer' && (
                <>
                  {navLinks.employer.map((link) => (
                    <NavLink key={link.path} to={link.path} icon={link.icon}>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              {user && role === 'admin' && (
                <>
                  {navLinks.admin.map((link) => (
                    <NavLink key={link.path} to={link.path} icon={link.icon}>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              {/* Authentication Section */}
              {!user ? (
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium"
                  >
                    <LogInIcon className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    Signup
                  </Link>
                </div>
              ) : (
                <div className="relative ml-4 pl-4 border-l border-gray-200">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-gray-700 font-medium hidden lg:inline">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-down">
                        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{role}</p>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <UserIcon className="w-4 h-4" />
                            Profile Settings
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOutIcon className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <MenuIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-xl rounded-b-2xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-slide-down">
            <div className="p-4 space-y-2">
              {/* Public Links */}
              {!user && navLinks.public.map((link) => (
                <NavLink key={link.path} to={link.path} icon={link.icon}>
                  {link.label}
                </NavLink>
              ))}

              {/* Role-based Links */}
              {user && role === 'user' && (
                <>
                  <div className="h-px bg-gray-200 my-2" />
                  {navLinks.user.map((link) => (
                    <NavLink key={link.path} to={link.path} icon={link.icon}>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              {user && role === 'employer' && (
                <>
                  <div className="h-px bg-gray-200 my-2" />
                  {navLinks.employer.map((link) => (
                    <NavLink key={link.path} to={link.path} icon={link.icon}>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              {user && role === 'admin' && (
                <>
                  <div className="h-px bg-gray-200 my-2" />
                  {navLinks.admin.map((link) => (
                    <NavLink key={link.path} to={link.path} icon={link.icon}>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              <div className="h-px bg-gray-200 my-2" />

              {/* Authentication Section for Mobile */}
              {!user ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium"
                  >
                    <LogInIcon className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium"
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    Signup
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{role}</p>
                    </div>
                  </div>
                  
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile Settings
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.2s ease-out;
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}