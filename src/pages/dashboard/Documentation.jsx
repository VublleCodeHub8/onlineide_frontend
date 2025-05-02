import React, { useState, useEffect } from 'react';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const docs = [
    {
      category: 'Getting Started',
      items: [
        { title: 'Introduction', link: '#introduction' },
        { title: 'Quick Start Guide', link: '#quick-start' },
        { title: 'Installation', link: '#installation' },
      ]
    },
    {
      category: 'Container Operations',
      items: [
        { title: 'Creating Containers', link: '#create-container' },
        { title: 'Managing Containers', link: '#manage-container' },
        { title: 'Container Networking', link: '#container-network' },
        { title: 'Volume Management', link: '#volumes' },
      ]
    },
    {
      category: 'Templates & Images',
      items: [
        { title: 'Using Templates', link: '#templates' },
        { title: 'Custom Images', link: '#custom-images' },
        { title: 'Template Library', link: '#template-library' },
      ]
    },
    {
      category: 'Advanced Features',
      items: [
        { title: 'Security & Access', link: '#security' },
        { title: 'Monitoring Tools', link: '#monitoring' },
        { title: 'Auto-scaling', link: '#scaling' },
        { title: 'CI/CD Integration', link: '#cicd' },
        { title: 'Publishing Projects', link: '#publishing' },
        { title: 'Analytics', link: '#analytics' },
        { title: 'Profile Management', link: '#profile' },
        { title: 'Public Projects', link: '#public' },
        { title: 'Bug Reporting', link: '#bug-report' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 20%), radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 20%)'
        }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="inline-block w-16 h-16 p-3 rounded-full bg-white bg-opacity-10 mb-6 backdrop-blur-sm shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white text-center mb-3 tracking-tight">Documentation</h1>
            <p className="text-white opacity-80 max-w-xl text-center text-lg">Comprehensive guides to help you make the most of our platform</p>
          </div>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="sticky top-8">
                <nav className="space-y-8">
                  {docs.map((section, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-lg">
                      <h3 className="font-semibold text-black mb-4 pb-2 border-b border-gray-200">{section.category}</h3>
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="transition-all duration-200">
                            <a 
                              href={item.link} 
                              className={`flex items-center p-2 rounded-md transition-colors duration-300 ${activeSection === item.link.substring(1) ? 'text-black bg-gray-100 font-medium' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-all duration-200 ${activeSection === item.link.substring(1) ? 'bg-black w-2 h-2' : 'bg-gray-400'}`}></span>
                              <span>{item.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
                <section id="introduction" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Introduction</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    Welcome to our comprehensive container management platform documentation. This guide provides detailed information about creating, managing, and optimizing your containerized applications.
                  </p>
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl border border-gray-300 mt-6">
                    <h3 className="text-xl font-semibold text-black mb-5 pl-4 border-l-4 border-black">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Intuitive container management interface",
                        "Pre-built templates for quick deployment",
                        "Advanced monitoring and scaling capabilities",
                        "Robust security features"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section id="create-container" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Creating Containers</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold mb-4">Using the Dashboard</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li>Navigate to the Containers section</li>
                        <li>Click on "Create New Container"</li>
                        <li>Select a template or start from scratch</li>
                        <li>Configure container settings</li>
                        <li>Deploy your container</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md border border-gray-300">
                      <h3 className="text-xl font-semibold mb-4 text-black pl-4 border-l-4 border-black">Step-by-Step Project Creation Guide</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li><span className="font-medium">Access Home or Container Section:</span> Navigate to the home page or container section in the dashboard.</li>
                        <li><span className="font-medium">Create New Container:</span> Click on "Create New Container" button.</li>
                        <li><span className="font-medium">Choose Template:</span> Select the appropriate template for your project.</li>
                        <li><span className="font-medium">Name Your Container:</span> Enter a name for your container 
                          <span className="text-red-600 font-medium"> (important: name must be lowercase without any special characters)</span>.</li>
                        <li><span className="font-medium">Source Code Options:</span> Either pull your code from GitHub repository or write your code directly in the editor.</li>
                        <li><span className="font-medium">Server Configuration:</span> If your project requires a server, ensure it runs on port 4001 and is configured in host mode in your application's config file.</li>
                        <li><span className="font-medium">Access Your Application:</span> Use the URL provided in the help button to access your running application.</li>
                      </ol>
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 rounded-lg shadow-inner border border-gray-300 mt-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
                        <p className="text-black font-semibold pl-4 flex items-center">⚠️ Important Note:</p>
                        <p className="text-gray-700 pl-4 mt-2">Make sure your container name is in lowercase and does not contain any special characters to avoid configuration issues.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="templates" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Using Templates</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="bg-black w-12 h-12 flex items-center justify-center rounded-full mb-5 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-center">Programming Language Templates</h3>
                      <ul className="space-y-3 text-gray-700">
                        {['C++ Development', 'Python Environment', 'JavaScript/Node.js', 'More coming soon...'].map((item, index) => (
                          <li key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors duration-200">
                            <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="bg-black w-12 h-12 flex items-center justify-center rounded-full mb-5 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-center">System Templates</h3>
                      <ul className="space-y-3 text-gray-700">
                        {['Ubuntu (Latest)', 'Alpine Linux', 'Custom Base Images'].map((item, index) => (
                          <li key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors duration-200">
                            <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-inner border border-gray-300 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-16 h-16">
                      <div className="absolute transform rotate-45 bg-black text-white font-bold text-xs py-1 right-[-35px] top-[32px] w-[170px] text-center shadow-lg">PRO TIP</div>
                    </div>
                    <h3 className="text-lg font-semibold text-black mb-3 pl-4 border-l-4 border-black">Customize Your Deployment</h3>
                    <p className="text-gray-700 leading-relaxed">Use template variables to customize your deployment. Check our template reference for all available options.</p>
                  </div>
                </section>

                <section id="monitoring" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Monitoring Tools</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Resource Usage",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        ),
                        items: ["CPU metrics", "Memory usage", "Disk I/O"]
                      },
                      {
                        title: "Logs",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        ),
                        items: ["Real-time logs", "Log aggregation", "Search & filter"]
                      },
                      {
                        title: "Alerts",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        ),
                        items: ["Custom thresholds", "Email notifications", "Webhook integration"]
                      }
                    ].map((card, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <div className="bg-black w-12 h-12 flex items-center justify-center rounded-full mb-5 mx-auto text-white">
                          {card.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-center">{card.title}</h3>
                        <ul className="space-y-3 text-gray-700">
                          {card.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors duration-200">
                              <svg className="h-5 w-5 text-black mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="publishing" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Publishing Projects</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold mb-4">Sharing Your Work</h3>
                      <p className="text-gray-700 mb-4">
                        Publishing your project allows you to showcase your work to the community and collaborators.
                        Follow these steps to publish your project:
                      </p>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li><span className="font-medium">Navigate to your project:</span> Go to the project page of the container you want to publish.</li>
                        <li><span className="font-medium">Find the Publish option:</span> Look for the "Publish" button in your project dashboard.</li>
                        <li><span className="font-medium">Configure visibility:</span> <span className="text-red-600 font-medium">Make sure to set your project as "Public" - otherwise, no one will be able to see it.</span></li>
                        <li><span className="font-medium">Add description and tags:</span> Include relevant information to help others discover and understand your project.</li>
                        <li><span className="font-medium">Submit for publishing:</span> Click the "Publish" button to finalize the process.</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md border border-gray-300">
                      <h3 className="text-xl font-semibold mb-4 text-black pl-4 border-l-4 border-black">Benefits of Publishing</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Showcase your work to the global community</li>
                        <li>Receive feedback from other developers</li>
                        <li>Build your portfolio with shareable project links</li>
                        <li>Enable collaboration opportunities</li>
                      </ul>
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 rounded-lg shadow-inner border border-gray-300 mt-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
                        <p className="text-black font-semibold pl-4 flex items-center">⚠️ Visibility Control:</p>
                        <p className="text-gray-700 pl-4 mt-2">Remember that only public projects can be discovered and viewed by other users. You can change the visibility settings at any time.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="analytics" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Analytics</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold mb-4">Usage Statistics</h3>
                      <p className="text-gray-700 mb-4">
                        Get valuable insights into your container usage patterns and resource consumption with our comprehensive analytics dashboard.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Key Metrics Available</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Container usage over time</li>
                            <li>Resource utilization by template</li>
                            <li>Monthly usage statistics</li>
                            <li>Performance trends and insights</li>
                          </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Benefits</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Optimize resource allocation</li>
                            <li>Track spending and usage patterns</li>
                            <li>Identify performance bottlenecks</li>
                            <li>Make data-driven decisions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md border border-gray-300">
                      <h3 className="text-xl font-semibold mb-4 text-black pl-4 border-l-4 border-black">How to Access Analytics</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li>Navigate to the Dashboard</li>
                        <li>Click on the "Analytics" section in the sidebar</li>
                        <li>View your comprehensive usage metrics and statistics</li>
                        <li>Use the date filters to analyze specific time periods</li>
                        <li>Export reports for your records or presentations</li>
                      </ol>
                    </div>
                  </div>
                </section>
                
                <section id="profile" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Profile Management</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                      <p className="text-gray-700 mb-4">
                        Manage your profile information, customize your experience, and track your contribution activity.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Profile Information</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Update personal details</li>
                            <li>Change profile picture</li>
                            <li>Manage contact information</li>
                            <li>Update social media links</li>
                          </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Activity Tracking</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>View contribution history</li>
                            <li>Track activity heatmap</li>
                            <li>Monitor project interactions</li>
                            <li>Review container creation history</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md border border-gray-300">
                      <h3 className="text-xl font-semibold mb-4 text-black pl-4 border-l-4 border-black">Managing Your Profile</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li>Navigate to the "Profile" section from the dashboard sidebar</li>
                        <li>Click on "Edit Profile" to modify your personal information</li>
                        <li>Update your professional details, skills, and bio</li>
                        <li>Add social media links to connect with the community</li>
                        <li>Save your changes to update your profile</li>
                      </ol>
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 rounded-lg shadow-inner border border-gray-300 mt-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
                        <p className="text-black font-semibold pl-4 flex items-center">⚠️ Privacy Tip:</p>
                        <p className="text-gray-700 pl-4 mt-2">Control what information is visible to the public by adjusting your profile's privacy settings.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="public" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Public Projects</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold mb-4">Exploring Community Projects</h3>
                      <p className="text-gray-700 mb-4">
                        Discover and learn from projects shared by other users in the community. Get inspired, collaborate, and build upon existing work.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Features</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Browse projects by category</li>
                            <li>Filter by language or technology</li>
                            <li>Follow favorite creators</li>
                            <li>Fork projects for your own use</li>
                          </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Benefits</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Learn from real-world examples</li>
                            <li>Find solutions to common problems</li>
                            <li>Connect with like-minded developers</li>
                            <li>Accelerate your learning through example code</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md border border-gray-300">
                      <h3 className="text-xl font-semibold mb-4 text-black pl-4 border-l-4 border-black">How to Access Public Projects</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li>Click on the "Public" section in the main navigation</li>
                        <li>Browse through the featured projects or use the search functionality</li>
                        <li>Filter projects based on your interests or requirements</li>
                        <li>Click on a project to view its details, code, and documentation</li>
                        <li>Fork interesting projects to your account for further exploration</li>
                      </ol>
                    </div>
                  </div>
                </section>
                
                <section id="bug-report" className="mb-16 scroll-mt-8">
                  <h2 className="text-3xl font-bold mb-6 text-black border-b border-gray-200 pb-3 inline-block">Bug Reporting</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold mb-4">Report Issues</h3>
                      <p className="text-gray-700 mb-4">
                        Help improve the platform by reporting bugs or issues you encounter during your use of the system.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Types of Bugs You Can Report</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Functional bugs</li>
                            <li>Performance issues</li>
                            <li>UI/UX problems</li>
                            <li>Security vulnerabilities</li>
                            <li>System crashes</li>
                          </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-semibold mb-3">Effective Reporting Tips</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Be specific about the issue</li>
                            <li>Include steps to reproduce</li>
                            <li>Mention your environment details</li>
                            <li>Provide screenshots if applicable</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md border border-gray-300">
                      <h3 className="text-xl font-semibold mb-4 text-black pl-4 border-l-4 border-black">Submitting a Bug Report</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li>Navigate to the "Bug Report" section in the dashboard</li>
                        <li>Fill in your name and contact details</li>
                        <li>Select the type of bug you're reporting</li>
                        <li>Provide a detailed description of the issue</li>
                        <li>Submit your report and wait for confirmation</li>
                      </ol>
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 rounded-lg shadow-inner border border-gray-300 mt-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
                        <p className="text-black font-semibold pl-4 flex items-center">⚠️ Important Note:</p>
                        <p className="text-gray-700 pl-4 mt-2">The more details you provide in your bug report, the easier it will be for our team to identify and fix the issue.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;