import React from "react";
import "./AboutUs.css";
import { Mail, Github, Globe, Code, Server, Shield, BarChart } from 'lucide-react';
import HimanshuPhoto from '../../assets/Him.png';
import AdarshPhoto from '../../assets/adarsh.jpeg';

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 20%), radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 20%)'
        }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="inline-block w-16 h-16 p-3 rounded-full bg-white bg-opacity-10 mb-6 backdrop-blur-sm shadow-2xl">
              <Globe className="w-full h-full text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white text-center mb-3 tracking-tight">About Terminus</h1>
            <p className="text-white opacity-80 max-w-xl text-center text-lg">Your Ultimate Container Management Platform</p>
            
            <div className="mt-8 flex justify-center">
              <a 
                href="https://github.com/VublleCodeHub8/Main-Progress.git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-lg hover:bg-white/20 transition-colors duration-300"
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-white">View Our Project Repository</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <h2 className="text-3xl font-bold text-gray-800 pb-2 border-b-2 border-black">Our Mission</h2>
              <div className="absolute -bottom-1 left-1/2 w-16 h-1 bg-black transform -translate-x-1/2 rounded-full"></div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <p className="text-lg text-gray-600 leading-relaxed">
                Terminus is dedicated to revolutionizing container management by providing a powerful, 
                user-friendly platform that enables developers and organizations to deploy, manage, 
                and scale their containerized applications with unprecedented ease and efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="relative inline-block mb-12 mx-auto text-center w-full">
            <h2 className="text-3xl font-bold text-center text-gray-800 pb-2 border-b-2 border-black inline-block">Why Choose Terminus</h2>
            <div className="absolute -bottom-1 left-1/2 w-16 h-1 bg-black transform -translate-x-1/2 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px] border border-gray-100">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Server className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center pb-2 border-b border-gray-100">Simplified Management</h3>
              <p className="text-gray-600 mt-4">
                Intuitive interface for managing containers, making deployment and scaling effortless.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px] border border-gray-100">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center pb-2 border-b border-gray-100">Advanced Security</h3>
              <p className="text-gray-600 mt-4">
                Enterprise-grade security features to protect your containers and applications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px] border border-gray-100">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BarChart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center pb-2 border-b border-gray-100">Real-time Monitoring</h3>
              <p className="text-gray-600 mt-4">
                Comprehensive monitoring and analytics for your containerized applications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Developers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-black mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Streamlined deployment process
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-black mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Automated scaling capabilities
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-black mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Integrated development tools
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Organizations</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-black mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cost-effective scaling
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-black mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Enhanced security controls
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-black mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Comprehensive monitoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-96 h-96 border border-black rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%)`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Team Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h2 className="text-4xl font-bold text-gray-800 pb-3 border-b-2 border-black inline-block">Meet Our Team</h2>
              <div className="absolute -bottom-1.5 left-1/2 w-24 h-1 bg-black transform -translate-x-1/2 rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">Passionate developers committed to revolutionizing container management</p>
          </div>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              {/* Black accent bar */}
              <div className="absolute h-2 w-full bg-black top-0 left-0"></div>
              
              <div className="p-8 pb-6 flex flex-col items-center">
                {/* Photo Container */}
                <div className="relative">
                  {/* Decorative circles */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-black shadow-lg relative z-10 group-hover:border-gray-800 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent z-10"></div>
                    <img 
                      src={HimanshuPhoto}
                      alt="Himanshu Saraswat"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=Himanshu+Saraswat&background=random&size=200`;
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-1">Himanshu Saraswat</h3>
                <p className="text-gray-600 mb-4 pb-2 border-b border-gray-200 inline-block">Full Stack Developer</p>
                
                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2 my-4">
                  {['React', 'Node.js', 'Docker'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 hover:bg-black hover:text-white transition-colors duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Contact Button */}
                <a 
                  href="mailto:himanshu.s22@iiits.in" 
                  className="mt-4 flex items-center gap-2 text-gray-600 hover:text-black transition-all duration-300 group-hover:font-medium"
                >
                  <Mail className="h-4 w-4" />
                  <span className="group-hover:underline">himanshu.s22@iiits.in</span>
                </a>
                
                {/* GitHub Link */}
                <a 
                  href="https://github.com/Himanshu-Saraswat-01122004" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg translate-y-4 group-hover:translate-y-0"
                >
                  <Github className="h-4 w-4" />
                  <span>View GitHub</span>
                </a>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              {/* Black accent bar */}
              <div className="absolute h-2 w-full bg-black top-0 left-0"></div>
              
              <div className="p-8 pb-6 flex flex-col items-center">
                {/* Photo Container */}
                <div className="relative">
                  {/* Decorative circles */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-black shadow-lg relative z-10 group-hover:border-gray-800 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent z-10"></div>
                    <img 
                      src={AdarshPhoto}
                      alt="Adarsh Singh"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=Adarsh+Singh&background=random&size=200`;
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-1">Adarsh Singh</h3>
                <p className="text-gray-600 mb-4 pb-2 border-b border-gray-200 inline-block">Full Stack Developer</p>
                
                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2 my-4">
                  {['React', 'MongoDB', 'AWS'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 hover:bg-black hover:text-white transition-colors duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Contact Button */}
                <a 
                  href="mailto:adarsh.s22@iiits.in" 
                  className="mt-4 flex items-center gap-2 text-gray-600 hover:text-black transition-all duration-300 group-hover:font-medium"
                >
                  <Mail className="h-4 w-4" />
                  <span className="group-hover:underline">adarsh.s22@iiits.in</span>
                </a>
                
                {/* GitHub Link */}
                <a 
                  href="https://github.com/Adarsh0427" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg translate-y-4 group-hover:translate-y-0"
                >
                  <Github className="h-4 w-4" />
                  <span>View GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <h2 className="text-3xl font-bold text-gray-800 pb-2 border-b-2 border-black">Start Your Journey with Terminus</h2>
              <div className="absolute -bottom-1 left-1/2 w-16 h-1 bg-black transform -translate-x-1/2 rounded-full"></div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <p className="text-lg text-gray-600 mb-4">
                Ready to transform your container management experience? Get in touch with our team today.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                <a 
                  href="https://github.com/VublleCodeHub8/Main-Progress.git" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-all duration-300"
                >
                  <Github className="h-5 w-5" />
                  <span>VublleCodeHub8/Main-Progress.git</span>
                </a>
              </div>
            </div>
            
            <div className="space-x-4">
              <a 
                href="/contact" 
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
              >
                Contact Us
              </a>
              <a 
                href="/documentation" 
                className="inline-block bg-white text-black border border-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;