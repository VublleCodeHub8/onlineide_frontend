import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { AlertTriangle, Bug, Send, AlertCircle, CheckCircle, X, HelpCircle, Code, Terminal, FileCode } from 'lucide-react';
import Popup from '@/components/Popup';

const BugReport = () => {
  const token = useSelector((state) => state.misc.token);

  const [formData, setFormData] = useState({
    name: '',
    email: token.email,
    type: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  // Bug type options with enhanced visual presentation
  const bugTypes = [
    { 
      value: 'functional', 
      label: 'Functional Bug', 
      icon: <Bug className="h-5 w-5" />,
      description: 'Features not working as expected'
    },
    { 
      value: 'performance', 
      label: 'Performance Issue', 
      icon: <AlertCircle className="h-5 w-5" />,
      description: 'Slow performance or resource problems'
    },
    { 
      value: 'ui', 
      label: 'UI/UX Issue', 
      icon: <HelpCircle className="h-5 w-5" />,
      description: 'Problems with interface or user experience'
    },
    { 
      value: 'security', 
      label: 'Security Vulnerability', 
      icon: <AlertTriangle className="h-5 w-5" />,
      description: 'Security concerns or potential vulnerabilities'
    },
    { 
      value: 'crash', 
      label: 'System Crash', 
      icon: <X className="h-5 w-5" />,
      description: 'Application freezes or crashes'
    },
    { 
      value: 'other', 
      label: 'Other', 
      icon: <CheckCircle className="h-5 w-5" />,
      description: 'Any other issue not listed above'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/addbugreport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit bug report');
      }

      setFormData({
        name: '',
        type: '',
        email: token.email,
        description: ''
      });

      setPopupMessage("Bug report submitted successfully!");
      setPopupType("success");
      setPopupVisible(true);
    } catch (error) {
      setPopupMessage("Failed to submit bug report. Please try again.");
      setPopupType("error");
      setPopupVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 20%), radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 20%)'
        }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="inline-block w-16 h-16 p-3 rounded-full bg-white bg-opacity-10 mb-6 backdrop-blur-sm shadow-2xl">
              <Bug className="h-full w-full text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white text-center mb-3 tracking-tight">Report a Bug</h1>
            <p className="text-white opacity-80 max-w-xl text-center text-lg">
              Help us improve by reporting any issues you encounter. Your feedback is valuable in making our system better.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Form Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                           transition-all duration-300 bg-gray-50 hover:bg-white transform hover:shadow-md"
                  placeholder="Enter your name"
                />
              </div>

              {/* Enhanced Visual Bug Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Bug Type
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bugTypes.map((type) => (
                    <div 
                      key={type.value}
                      onClick={() => setFormData({...formData, type: type.value})}
                      className={`relative p-4 rounded-lg border ${formData.type === type.value 
                        ? 'border-black bg-gradient-to-r from-gray-100 to-gray-200 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'} 
                        cursor-pointer transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <input 
                        type="radio" 
                        name="type" 
                        value={type.value} 
                        checked={formData.type === type.value}
                        onChange={handleChange}
                        className="sr-only" 
                        required={formData.type === ''}
                      />
                      
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${formData.type === type.value ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${formData.type === type.value ? 'text-black' : 'text-gray-700'}`}>
                              {type.label}
                            </span>
                            {formData.type === type.value && (
                              <span className="h-3 w-3 bg-black rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                        </div>
                      </div>
                      
                      {formData.type === type.value && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-black rounded-full flex items-center justify-center shadow-md">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Enhanced Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                             transition-all duration-300 bg-gray-50 hover:bg-white resize-none hover:shadow-md"
                    placeholder="Please describe the bug in detail. Include steps to reproduce if possible."
                  ></textarea>
                  <div className="absolute bottom-3 right-3 opacity-20">
                    <Terminal className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 flex items-center gap-2 bg-gray-100 p-2 rounded-md">
                  <HelpCircle className="h-4 w-4" />
                  <span>Be as specific as possible. Include steps to reproduce the issue.</span>
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-black text-white py-3.5 rounded-lg font-medium flex items-center justify-center gap-2
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'} 
                  transition duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Report...
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Bug Report
                  </>
                )}
              </button>
            </form>

            {/* Enhanced Guidelines */}
            <div className="mt-10 p-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-inner border border-gray-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
              <h3 className="text-base font-bold text-black mb-5 pl-4 border-l-4 border-black">
                Guidelines for Submitting a Bug Report
              </h3>
              <ul className="space-y-4 ml-2">
                {[
                  { text: 'Be as specific as possible in your description', icon: <Code className="h-5 w-5" /> },
                  { text: 'Include steps to reproduce the bug', icon: <Terminal className="h-5 w-5" /> },
                  { text: 'Mention any error messages you encountered', icon: <AlertCircle className="h-5 w-5" /> },
                  { text: 'Describe the expected behavior vs actual behavior', icon: <FileCode className="h-5 w-5" /> },
                  { text: 'Include your browser and operating system information if relevant', icon: <HelpCircle className="h-5 w-5" /> }
                ].map((item, index) => (
                  <li key={index} className="flex items-start p-3 bg-white rounded-lg shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-3 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      <Popup
        visible={popupVisible}
        message={popupMessage}
        onClose={() => setPopupVisible(false)}
        type={popupType}
      />
    </div>
  );
};

export default BugReport;