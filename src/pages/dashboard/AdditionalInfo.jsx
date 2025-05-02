import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MapPin, Briefcase, Github, Twitter, Linkedin, Globe, Send, HelpCircle, CheckCircle, User, Link } from 'lucide-react';
import Popup from '@/components/Popup';
const AdditionalInfo = () => {
  const token = useSelector((state) => state.misc.token);
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    location: '',
    occupation: '',
    socialLinks: {
      github: '',
      twitter: '',
      linkedin: '',
      website: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social-')) {
      const platform = name.replace('social-', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/updateadditionalinfo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update additional information');
      }

      setPopupMessage("Additional information updated successfully!");
      setPopupType("success");
      setPopupVisible(true);
      
      // Reset form after successful submission
      setFormData({
        location: '',
        occupation: '',
        socialLinks: {
          github: '',
          twitter: '',
          linkedin: '',
          website: ''
        }
      });
    } catch (error) {
      setPopupMessage("Failed to update information. Please try again.");
      setPopupType("error");
      setPopupVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <User className="h-full w-full text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white text-center mb-3 tracking-tight">Additional Information</h1>
            <p className="text-white opacity-80 max-w-xl text-center text-lg">
              Complete your profile by adding additional information and social links.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Field */}
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                           transition-all duration-300 bg-gray-50 hover:bg-white transform hover:shadow-md"
                  placeholder="Enter your location"
                />
              </div>

              {/* Occupation Field */}
              <div className="space-y-2">
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  <Briefcase className="h-4 w-4" />
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                           transition-all duration-300 bg-gray-50 hover:bg-white transform hover:shadow-md"
                  placeholder="Enter your occupation"
                />
              </div>

              {/* Social Links Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 text-black border-b border-gray-200 pb-2 inline-block">Social Links</h3>
                
                {/* GitHub */}
                <div className="space-y-2">
                  <label htmlFor="social-github" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="social-github"
                      name="social-github"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                              transition-all duration-300 bg-gray-50 hover:bg-white transform hover:shadow-md"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                {/* Twitter */}
                <div className="space-y-2">
                  <label htmlFor="social-twitter" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    <Twitter className="h-4 w-4" />
                    Twitter Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="social-twitter"
                      name="social-twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                              transition-all duration-300 bg-gray-50 hover:bg-white transform hover:shadow-md"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <label htmlFor="social-linkedin" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="social-linkedin"
                      name="social-linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                              transition-all duration-300 bg-gray-50 hover:bg-white transform hover:shadow-md"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                {/* Personal Website */}
                <div className="space-y-2">
                  <label htmlFor="social-website" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    <Globe className="h-4 w-4" />
                    Personal Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="social-website"
                      name="social-website"
                      value={formData.socialLinks.website}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                              transition-all duration-300 bg-gray-50 hover:bg-white transform hover:shadow-md"
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
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
                    Updating Information...
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Update Information
                  </>
                )}
              </button>
            </form>

            {/* Guidelines */}
            <div className="mt-10 p-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-inner border border-gray-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
              <h3 className="text-base font-bold text-black mb-5 pl-4 border-l-4 border-black">
                Tips for Your Profile
              </h3>
              <ul className="space-y-4 ml-2">
                {[
                  { text: 'Add your current location to help with networking', icon: <MapPin className="h-5 w-5" /> },
                  { text: 'Include your current occupation or role', icon: <Briefcase className="h-5 w-5" /> },
                  { text: 'Link your professional social profiles', icon: <Link className="h-5 w-5" /> },
                  { text: 'Make sure all URLs are complete and valid', icon: <Globe className="h-5 w-5" /> },
                  { text: 'Keep your information up to date', icon: <CheckCircle className="h-5 w-5" /> }
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

export default AdditionalInfo;