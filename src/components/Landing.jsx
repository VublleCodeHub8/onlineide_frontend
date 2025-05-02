import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

const Landing = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Animation constants for consistency
  const transitionBase = { duration: 0.4 };
  const hoverTransition = { ...transitionBase, ease: [0.25, 0.1, 0.25, 1] };
  const hoverScaleAmount = 1.05;
  
  // Testimonial animation settings for consistency
  const testimonialSpring = {
    type: "spring",
    stiffness: 70,
    damping: 15,
    mass: 1.2,
    ease: [0.25, 0.1, 0.25, 1]
  };
  
  const handleAuth = () => {
    navigate("/auth");
  };
  
  // Testimonial data
  const testimonials = [
    {
      quote: "This project is a brilliant demonstration of how students can apply real-world concepts in a practical way. Loved the UI and the functionality!",
      author: "Prof. Piyush Joshi",
      role: "Faculty Advisor, IIIT Sri City",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg"
    },
    {
      quote: "As a fellow student, I found the platform very easy to use and super helpful for collaborating on assignments. Great work by the dev team!",
      author: "Priya Sharma",
      role: "B.Tech CSE, Batch of 2026",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      quote: "I tested the app as part of our internal hackathon—it performed flawlessly. Really impressed by the deployment and design choices.",
      author: "Amit Raj",
      role: "Software Intern, TCS iON",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg"
    },
    {
      quote: "Their attention to detail and smooth UX stands out. It’s great to see student-built products with this level of polish.",
      author: "Sneha Iyer",
      role: "UX Designer, Bangalore Institute of Technology",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      quote: "This is a fantastic initiative. The tool solves a genuine problem we face during our lab sessions. Well done!",
      author: "Ravi Teja",
      role: "Lab Assistant, IIIT Hyderabad",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg"
    }
  ];
  
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Increased time to allow for smoother transitions
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Calculate positions for the circular testimonial display
  const getPositionStyles = (index) => {
    const isActive = index === activeTestimonial;
    const totalItems = testimonials.length;
    const angleStep = (2 * Math.PI) / totalItems;
    
    // When active, the testimonial should be centered
    if (isActive) {
      return {
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
        zIndex: 10
      };
    }
    
    // Calculate position in the circle
    const normalizedIndex = (index - activeTestimonial + totalItems) % totalItems;
    const angle = normalizedIndex * angleStep;
    const radius = 150; // Increased radius for smoother visual orbit
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Scale gets smaller as items are further from the active item
    const distanceFromActive = Math.min(normalizedIndex, totalItems - normalizedIndex);
    const scale = 0.65 - (distanceFromActive * 0.05); // Smoother scale reduction
    const zIndex = totalItems - normalizedIndex;
    
    return {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
      left: '50%',
      top: '50%',
      zIndex
    };
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>

      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col">
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo or Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ...transitionBase }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl backdrop-blur-sm flex items-center justify-center border border-gray-800 shadow-lg shadow-gray-900/30 hover:shadow-gray-900/50 transform hover:scale-105 transition-all duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>

            {/* Headings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-white to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                TERMINUS
              </h1>
              <p className="text-xl text-blue-200">Where Code Meets Cloud</p>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-400 mt-8 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              A powerful cloud development environment that revolutionizes how you code. 
              Build, test, and deploy with unprecedented ease and efficiency.
            </motion.p>

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {[
                { 
                  icon: "⚡", 
                  title: "Lightning Fast", 
                  desc: "Zero setup time, instant development environment",
                  gradient: "from-yellow-400 to-orange-500" 
                },
                { 
                  icon: "🔒", 
                  title: "Secure Platform", 
                  desc: "Enterprise-grade security for your code",
                  gradient: "from-blue-400 to-blue-600" 
                },
                { 
                  icon: "🚀", 
                  title: "Rapid Deployment", 
                  desc: "From development to production in minutes",
                  gradient: "from-purple-400 to-indigo-600" 
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  {/* Animated border gradient */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r rounded-3xl blur opacity-20 group-hover:opacity-70 transition duration-300"
                      style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, 
                             '--tw-gradient-from': feature.gradient.split(' ')[0].replace('from-', ''), 
                             '--tw-gradient-to': feature.gradient.split(' ')[1].replace('to-', '')}} 
                  />
                  
                  <div className="relative backdrop-blur-sm bg-black/50 rounded-3xl p-6 border border-white/10 hover:bg-black/60 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-3xl bg-gradient-to-br border border-white/10 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg" 
                         style={{backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`, 
                               '--tw-gradient-from': feature.gradient.split(' ')[0].replace('from-', ''), 
                               '--tw-gradient-to': feature.gradient.split(' ')[1].replace('to-', '')}}>
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={handleAuth}
                whileHover={{ scale: hoverScaleAmount }}
                transition={hoverTransition}
                className="px-8 py-4 bg-white text-black rounded-3xl font-medium hover:bg-gray-200 transition-all duration-300 transform hover:shadow-lg hover:shadow-white/10"
              >
                Launch Terminus
              </motion.button>
              <motion.button
                onClick={handleAuth}
                whileHover={{ scale: hoverScaleAmount }}
                transition={hoverTransition}
                className="px-8 py-4 bg-white/10 text-white rounded-3xl font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
              >
                Explore Features
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="py-20"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Powerful tools to accelerate your development workflow</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Feature 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={hoverTransition}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg">Containerized Environments</h3>
                </div>
                <p className="text-gray-400 pl-16">Isolated development environments ensure consistency across team members and eliminate "works on my machine" problems. Every project runs in its own container with all dependencies pre-configured.</p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={hoverTransition}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg">Advanced Security</h3>
                </div>
                <p className="text-gray-400 pl-16">Enterprise-grade security with role-based access control, encrypted data storage, and secure networking. Keep your intellectual property protected while enabling collaboration.</p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={hoverTransition}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg">Seamless Integration</h3>
                </div>
                <p className="text-gray-400 pl-16">Connect with your favorite tools and services. Integrates with GitHub, GitLab, Bitbucket, and major CI/CD pipelines to streamline your workflow from code to production.</p>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={hoverTransition}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-white font-bold text-lg mr-2">Team Collaboration</h3>
                    <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full animate-pulse">Coming Soon</span>
                  </div>
                </div>
                <p className="text-gray-400 pl-16">Real-time collaboration with integrated commenting, shared terminals, and version control. Multiple developers can work on the same codebase simultaneously without conflicts.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="py-20 relative overflow-hidden"
        >
          {/* Animated background gradients */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">How It Works</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">Get started in minutes with our simple workflow</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {[
                {
                  number: "01",
                  title: "Create Container",
                  description: "Choose from pre-configured templates or build from scratch",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  ),
                  gradient: "from-blue-400 to-indigo-500"
                },
                {
                  number: "02",
                  title: "Code & Build",
                  description: "Write code with our powerful editor and integrated tools",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  ),
                  gradient: "from-indigo-400 to-purple-500"
                },
                {
                  number: "03",
                  title: "Test & Deploy",
                  description: "Run your application and deploy with a single click",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  gradient: "from-purple-400 to-pink-500"
                },
                {
                  number: "04",
                  title: "Share & Collaborate",
                  description: "Invite team members and work together in real-time",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  ),
                  gradient: "from-pink-400 to-blue-500"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  {/* Connecting lines between steps */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform -translate-y-1/2 z-0"></div>
                  )}
                  
                  {/* Glowing border effect */}
                  <div
                    className="absolute -inset-0.5 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"
                    style={{
                      background: `linear-gradient(90deg, ${step.gradient.split(' ')[0].replace('from-', '')}, ${step.gradient.split(' ')[1].replace('to-', '')})`
                    }}
                  ></div>
                  
                  <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-3xl border border-white/10 p-8 transition-all duration-300 group-hover:shadow-xl h-full">
                    {/* Circular step number with gradient */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${step.gradient.split(' ')[0].replace('from-', '')}, ${step.gradient.split(' ')[1].replace('to-', '')})`
                      }}
                    >
                      {step.icon}
                    </div>
                    
                    <h3 className="text-white text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-blue-100/80 text-center">{step.description}</p>
                    
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 group-hover:-translate-y-2">
                      <div className="text-blue-400 font-mono font-bold text-sm">{step.number}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="py-24 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-sm"></div>
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
          <div className="absolute -top-20 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">What People Say</h2>
              <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">Hear from developers who've transformed their workflow with Terminus</p>
            </div>
            
            {/* Dynamic circular testimonial display */}
            <div className="relative h-[500px] max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    ...getPositionStyles(index),
                    opacity: index === activeTestimonial ? 1 : 0.7,
                    filter: index === activeTestimonial ? 'blur(0px)' : 'blur(0.5px)'
                  }}
                  transition={testimonialSpring}
                  whileHover={{
                    scale: index === activeTestimonial ? 1.02 : 0.75,
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => setActiveTestimonial(index)}
                  className={`absolute cursor-pointer transition-all duration-500 ${
                    index === activeTestimonial
                      ? 'w-full max-w-md shadow-xl'
                      : 'w-20 h-20 rounded-full overflow-hidden shadow-md'
                  }`}
                >
                  {index === activeTestimonial ? (
                    <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl">
                      <div className="flex items-start mb-6">
                        <div className="relative mr-4">
                          <div className="absolute -inset-1 rounded-full blur-sm bg-gradient-to-r from-blue-400 to-purple-500 opacity-70"></div>
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            className="relative w-16 h-16 rounded-full object-cover border-2 border-white/10"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{testimonial.author}</h3>
                          <p className="text-blue-200/80 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-white/90 italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
                      
                      {/* Dots indicator */}
                      <div className="flex justify-center space-x-2 mt-6">
                        {testimonials.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTestimonial(dotIndex);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                              dotIndex === activeTestimonial
                                ? 'bg-blue-400 w-6'
                                : 'bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to testimonial ${dotIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full h-full relative"
                      title={`${testimonial.author}, ${testimonial.role}`}
                    >
                      <div className="absolute -inset-0.5 rounded-full blur-sm bg-gradient-to-r from-blue-400 to-purple-500 opacity-40 group-hover:opacity-70"></div>
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-full h-full object-cover rounded-full border border-white/20"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technology Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="py-24 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-sm"></div>
          <div className="absolute -top-20 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">Technology Stack</h2>
              <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">Powerful languages to bring your ideas to life</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
              {/* Current Languages */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-white text-lg font-bold mb-1">C/C++</h3>
                  <span className="text-xs text-blue-300 font-medium px-2 py-1 bg-blue-900/30 rounded-full mb-2">Available</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">🐍</div>
                  <h3 className="text-white text-lg font-bold mb-1">Python</h3>
                  <span className="text-xs text-blue-300 font-medium px-2 py-1 bg-blue-900/30 rounded-full mb-2">Available</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.25, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-white text-lg font-bold mb-1">Node.js</h3>
                  <span className="text-xs text-blue-300 font-medium px-2 py-1 bg-blue-900/30 rounded-full mb-2">Available</span>
                </div>
              </motion.div>
              
              {/* Coming Soon Languages */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">☕</div>
                  <h3 className="text-white text-lg font-bold mb-1">Java</h3>
                  <span className="text-xs text-purple-300 font-medium px-2 py-1 bg-purple-900/30 rounded-full mb-2">Coming Soon</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">🦀</div>
                  <h3 className="text-white text-lg font-bold mb-1">Rust</h3>
                  <span className="text-xs text-purple-300 font-medium px-2 py-1 bg-purple-900/30 rounded-full mb-2">Coming Soon</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">🐹</div>
                  <h3 className="text-white text-lg font-bold mb-1">Go</h3>
                  <span className="text-xs text-purple-300 font-medium px-2 py-1 bg-purple-900/30 rounded-full mb-2">Coming Soon</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="py-24 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">Everything you need to know about Terminus</p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "What is Terminus?",
                  answer: "Terminus is a cloud-based IDE (Integrated Development Environment) that allows you to code, build, and deploy applications directly from your browser without any local setup requirements."
                },
                {
                  question: "What programming languages are supported?",
                  answer: "Terminus currently supports C/C++, Python, and Node.js with Java, Go, and Rust coming soon. We're continuously adding support for more languages based on user feedback."
                },
                {
                  question: "Do I need to install anything to use Terminus?",
                  answer: "No! That's the beauty of Terminus. Everything runs in the cloud, so you only need a modern web browser and an internet connection to start coding immediately."
                },
                {
                  question: "How does collaboration work?",
                  answer: "Terminus enables real-time collaboration with team members. You can share your workspace, code together simultaneously, use shared terminals, and communicate through integrated chat and commenting features."
                },
                {
                  question: "Is my code secure in the cloud?",
                  answer: "Absolutely. We implement enterprise-grade security measures including encrypted data storage, secure networking, and role-based access controls to ensure your code and intellectual property remain protected."
                },
                {
                  question: "Can I connect to my GitHub or other version control repositories?",
                  answer: "Yes! Terminus integrates seamlessly with major version control services including GitHub, GitLab, and Bitbucket, allowing you to clone, push, and pull directly from your cloud environment."
                }
              ].map((faq, index) => (
                <FaqAccordion key={index} question={faq.question} answer={faq.answer} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="border-t border-white/10 bg-black/80 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              {/* Logo & Description */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-xl backdrop-blur-sm flex items-center justify-center border border-gray-800 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">TERMINUS</span>
                </div>
                <p className="text-gray-400 text-sm">
                  The future of cloud development environment. Build, test, and deploy with unprecedented ease.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.162 5.656a8.383 8.383 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.72.83-2.688 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.73 1.86 3.48a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.1 4.211 4.211 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.395 8.395 0 01-6.19 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.495 8.495 0 002.087-2.165z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-white font-semibold mb-4">Products</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cloud IDE</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Containers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Templates</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Deployment</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Collaboration</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Community</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Status</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
                </ul>
              </div>

              {/* Stay Updated */}
              <div>
                <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-400 text-sm mb-4">Get the latest news and updates from our team.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-white/5 border border-white/10 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 rounded-r-md hover:opacity-90 transition-opacity">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm">
                &copy; 2024 Terminus. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// FAQ Accordion Component
const FaqAccordion = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + (index * 0.1), duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between gap-4 group-hover:bg-white/5 transition-all duration-300"
        >
          <h3 className="text-lg font-medium text-blue-100">{question}</h3>
          <div className="text-blue-300 flex-shrink-0">
            {isOpen ? <IoChevronUpOutline size={20} /> : <IoChevronDownOutline size={20} />}
          </div>
        </button>
        
        <motion.div 
          initial={false}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{
            height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
            opacity: { duration: 0.3, delay: isOpen ? 0.1 : 0 }
          }}
          className="overflow-hidden"
        >
          <div className="p-6 pt-0 text-gray-300 border-t border-white/5">
            {answer}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Landing;
