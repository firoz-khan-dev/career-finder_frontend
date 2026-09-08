import React, { useEffect, useState } from 'react';
import {
  CompassIcon,
  TargetIcon,
  BrainIcon,
  RocketIcon,
  UsersIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  AwardIcon,
  ChevronRightIcon,
  SparklesIcon,
  LightbulbIcon,
  HeartHandshakeIcon
} from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <SparklesIcon className="w-10 h-10" />,
      title: "Personalized Assessment",
      description: "We evaluate your interests, hobbies, and personality to give you a tailored list of career options.",
      gradient: "from-purple-500 to-pink-500",
      color: "purple"
    },
    {
      icon: <BrainIcon className="w-10 h-10" />,
      title: "Insightful Guidance",
      description: "Understand your natural strengths and traits through our smart personality-based recommendation engine.",
      gradient: "from-blue-500 to-cyan-500",
      color: "blue"
    },
    {
      icon: <RocketIcon className="w-10 h-10" />,
      title: "Explore Opportunities",
      description: "Learn about diverse career paths, salary insights, future growth, and required education—all in one place.",
      gradient: "from-green-500 to-emerald-500",
      color: "green"
    }
  ];

  const stats = [
    { value: "10K+", label: "Users Guided", icon: <UsersIcon className="w-6 h-6" /> },
    { value: "500+", label: "Career Paths", icon: <TrendingUpIcon className="w-6 h-6" /> },
    { value: "95%", label: "Success Rate", icon: <AwardIcon className="w-6 h-6" /> },
    { value: "50+", label: "Expert Partners", icon: <CheckCircleIcon className="w-6 h-6" /> }
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Career Psychologist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      bio: "PhD in Industrial Psychology with 15+ years of experience"
    },
    {
      name: "James Wilson",
      role: "Tech Career Coach",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      bio: "Helped 5000+ students land their dream tech jobs"
    },
    {
      name: "Priya Sharma",
      role: "Education Consultant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      bio: "Expert in career transitions and skill development"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">

      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 animate-fade-in">
            <CompassIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Our Story</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Career Finder
            </span>
          </h1>

          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            At Career Finder, our mission is to help students and individuals discover the right career path
            based on their interests, strengths, and goals. We believe that everyone deserves a fulfilling
            career — and it starts with self-awareness.
          </p>
        </div>

        {/* Wave Decoration */}
        <div className="relative bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div id="mission" className="animate-on-scroll group" style={{ opacity: isVisible.mission ? 1 : 0, transform: isVisible.mission ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease-out' }}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <TargetIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower individuals with personalized career guidance, helping them discover paths
                  that align with their unique strengths, interests, and aspirations. We strive to make
                  career decisions clearer, easier, and more fulfilling for everyone.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div id="vision" className="animate-on-scroll" style={{ opacity: isVisible.vision ? 1 : 0, transform: isVisible.vision ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease-out 0.2s' }}>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <LightbulbIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  We aim to empower the next generation with clarity and confidence to make informed
                  career decisions. Whether you're a student, a graduate, or someone exploring new
                  options — Career Finder is your guide to a meaningful future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Makes Us Different?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover how Career Finder stands out in helping you find your perfect career path
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                className="animate-on-scroll group"
                style={{
                  opacity: isVisible[`feature-${index}`] ? 1 : 0,
                  transform: isVisible[`feature-${index}`] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`
                }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100">
                  <div className={`bg-gradient-to-r ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white animate-on-scroll"
                style={{
                  opacity: isVisible?.[`team-${index}`] !== false ? 1 : 0,
                  transform: isVisible?.[`team-${index}`] !== false
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Experts
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dedicated professionals committed to your career success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center animate-on-scroll"
                style={{
                  opacity: isVisible?.[`team-${index}`] !== false ? 1 : 0,
                  transform: isVisible?.[`team-${index}`] !== false
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`
                }}
              >
                <div className="relative mb-4 inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:border-blue-500 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=400&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <HeartHandshakeIcon className="w-16 h-16 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful individuals who found their path with Career Finder
          </p>
          <button className="group bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
            Take the Assessment
            <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}