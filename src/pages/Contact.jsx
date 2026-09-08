import React, { useState } from 'react';
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  MessageCircleIcon,
  HeadphonesIcon,
  BuildingIcon,
  GlobeIcon
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const contactInfo = [
    {
      icon: <MailIcon className="w-6 h-6" />,
      title: "Email Us",
      details: "support@careerfinder.com",
      sub: "careers@careerfinder.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Call Us",
      details: "+91 98765 43210",
      sub: "+91 12345 67890",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Visit Us",
      details: "Career Finder HQ",
      sub: "New Delhi, India",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: "Working Hours",
      details: "Monday - Friday",
      sub: "9:00 AM - 6:00 PM",
      gradient: "from-orange-500 to-red-500"
    }
  ];


  const socialLinks = [
    { icon: <FaFacebook className="w-5 h-5" />, name: "Facebook", color: "hover:bg-blue-600", url: "#" },
    { icon: <FaTwitter className="w-5 h-5" />, name: "Twitter", color: "hover:bg-sky-500", url: "#" },
    { icon: <FaLinkedin className="w-5 h-5" />, name: "LinkedIn", color: "hover:bg-blue-700", url: "#" },
    { icon: <FaInstagram className="w-5 h-5" />, name: "Instagram", color: "hover:bg-pink-600", url: "#" }
  ];

  const faqs = [
    { q: "How does the assessment work?", a: "Our AI-powered assessment analyzes your interests, skills, and personality to provide personalized career recommendations." },
    { q: "Is the service free?", a: "Yes, basic career assessment and recommendations are completely free!" },
    { q: "How accurate are the recommendations?", a: "With 95% success rate, our recommendations are highly accurate based on user feedback." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=400&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 animate-fade-in">
            <MessageCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Get in Touch</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Contact{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Us
            </span>
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hi —
            feel free to reach out.
          </p>
        </div>

        <div className="relative bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-r ${info.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{info.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-600 font-medium">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-slide-down">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <p className="text-green-700">Message sent successfully! We'll contact you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
                      }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircleIcon className="w-4 h-4" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
                      }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircleIcon className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us what you're thinking..."
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${errors.message ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
                      }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircleIcon className="w-4 h-4" /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <SendIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Info & Map */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100">
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.789826282699!2d77.2287403150818!3d28.63527848241819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b2b9e5a3%3A0x8f4e7b8f5c5e5b5!2sNew%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BuildingIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Career Finder Headquarters</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <GlobeIcon className="w-5 h-5 text-blue-600" />
                  Connect With Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`bg-gray-100 p-3 rounded-full text-gray-600 ${social.color} transition-all duration-300 transform hover:scale-110 hover:text-white shadow-md`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HeadphonesIcon className="w-5 h-5 text-blue-600" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="group cursor-pointer">
                      <p className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {faq.q}
                      </p>
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                      {index < faqs.length - 1 && <hr className="mt-3 border-gray-200" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Career Tips
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Subscribe to our newsletter for exclusive career advice and job opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </div>
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
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        
        .animate-on-scroll {
          opacity: 0;
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}