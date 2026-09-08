import React from 'react';
import { Link } from 'react-router-dom';
import { 
  RocketIcon, 
  BrainIcon, 
  BriefcaseIcon, 
  ChevronRightIcon,
  StarIcon,
  UsersIcon,
  TrendingUpIcon,
  AwardIcon
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <BrainIcon className="w-8 h-8 text-blue-600" />,
      title: "Interest-based Assessment",
      description: "Answer a few questions about your likes and passions. We'll help match your interests with career paths that excite you.",
      gradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: <UsersIcon className="w-8 h-8 text-purple-600" />,
      title: "Personality Analysis",
      description: "Understand your strengths and behavioral traits to discover careers that naturally suit your personality type.",
      gradient: "from-purple-50 to-pink-50"
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8 text-green-600" />,
      title: "Smart Career Recommendations",
      description: "Get a curated list of careers with salary info, growth scope, and education path based on your unique profile.",
      gradient: "from-green-50 to-emerald-50"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "Career Compass helped me discover my passion for programming. Now I'm living my dream!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      content: "The personality analysis was spot-on. It gave me confidence to pursue my career change.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "Amazing recommendations! Found my ideal career path in just 10 minutes.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=800&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)"
          }}
        />
        
        <div className="relative z-10 text-center py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <RocketIcon className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm font-medium">AI-Powered Career Guidance</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Discover Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Ideal Career Path
              </span>
            </h1>
            
            <p className="text-gray-200 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Career Finder helps you find the best career options based on your interests, skills, and personality.
              Take a short assessment and explore personalized recommendations tailored for you.
            </p>
            
            <Link to="/assessment">
              <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center gap-2 cursor-pointer">
                Get Started
                <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Career Finder Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Three simple steps to find your perfect career match
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Career Paths</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Industry Experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 text-lg">
              Join thousands who found their dream career with Career Finder
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Image Background */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=600&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.85)"
          }}
        />
        
        <div className="relative z-10 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <AwardIcon className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take the First Step?
            </h2>
            <p className="text-gray-100 text-xl mb-8">
              Start your personalized career assessment now and take charge of your future!
            </p>
            <Link to="/assessment">
              <button className="group bg-white text-blue-700 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center gap-2">
                Take Assessment
                <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}