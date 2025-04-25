import React, { useState, useEffect } from "react";
import { HoverEffect } from "@/components/dashboard/TemplateCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Filter, ArrowUpDown } from "lucide-react";

// Add this gradient text component
const GradientText = ({ children, className = "" }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black ${className}`}>
    {children}
  </span>
);

// Card components for public projects
export const PublicCard = ({ className, children }) => {
  return (
    <div
      className={`rounded-2xl h-full w-full p-6 overflow-hidden bg-white 
                  border-2 border-gray-200 
                  transition-all duration-300 ease-in-out 
                  group-hover:border-gray-300 group-hover:shadow-lg 
                  relative z-20 ${className}`}
    >
      <div className="relative z-50 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export const PublicCardTitle = ({ className, children }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Globe className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
      <h2 className={`text-xl font-bold text-gray-800 
                       group-hover:text-black transition-colors duration-200 ${className}`}>
        {children}
      </h2>
    </div>
  );
};

export const PublicCardDescription = ({ owner, className, children }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Owner Tag */}
      <div className="flex items-center gap-2 mb-4 bg-gray-100 rounded-lg p-3 border border-gray-200">
        <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">
          {owner.charAt(0).toUpperCase()}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-gray-800">Created by</span>
          <span className="text-sm text-gray-600">{owner}</span>
        </div>
      </div>

      {/* Description */}
      <p className={`text-gray-600 text-sm leading-relaxed mb-6 
                     group-hover:text-gray-700 transition-colors duration-200 ${className}`}>
        {children}
      </p>

      {/* Action Button */}
      <div className="mt-auto">
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center justify-between group/button"
        >
          <span className="text-sm font-medium text-gray-600 group-hover/button:text-black">
            Open Project
          </span>
          <svg className="w-4 h-4 text-gray-500 group-hover/button:text-black" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

// Create a custom HoverEffect component for public projects
export const PublicHoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {items.map((item, idx) => (
        <a 
          key={idx} 
          href={`${import.meta.env.VITE_API_URL_SOCKET}:${item.port}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
            <PublicCard>
              <PublicCardTitle>{item.title}</PublicCardTitle>
              <PublicCardDescription owner={item.owner}>{item.description}</PublicCardDescription>
            </PublicCard>
          </motion.div>
        </a>
      ))}
    </div>
  );
};

const Public = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title"); // title, owner

  useEffect(() => {
    const fetchPublicProjects = async () => {
      try {
        const tok = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getallpublic`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tok.token,
          },
        });
        
        const data = await response.json();
        
        // Filter to only include projects with flag=true (public projects)
        const publicProjects = data
          .filter(project => project.flag === true)
          .map(project => ({
            title: project.title || "Untitled Project",
            description: project.description || "No description provided",
            owner: project.owner || "Anonymous",
            port: project.port || ""
          }));
        
        setProjects(publicProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching public projects:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPublicProjects();
  }, []);

  const filteredAndSortedProjects = projects
    .filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "owner") return a.owner.localeCompare(b.owner);
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="p-8">
      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 relative"
      >
        {/* Background decoration */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-full opacity-50 blur-3xl" />
        
        {/* Main header content */}
        <div className="relative">
          {/* Title section */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-100 rounded-xl shadow-sm">
              <Globe className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-gray-500 uppercase tracking-wider mb-1"
              >
                Discover Projects
              </motion.div>
              <h1 className="text-5xl font-bold">
                <GradientText>Public Projects</GradientText>
              </h1>
            </div>
          </div>

          {/* Description section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 max-w-3xl"
          >
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore publicly shared projects from our community. Discover what others are building
              and get inspired for your next creation.
            </p>
            
            {/* Key features */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Live projects
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Interactive demos
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Community creations
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced search section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-auto">
            <h2 className="text-2xl font-bold mb-2">
              <GradientText>Explore Public Projects</GradientText>
            </h2>
            <p className="text-gray-500">
              {searchQuery 
                ? `Found ${filteredAndSortedProjects.length} projects matching your search`
                : 'Browse public projects from our community'}
            </p>
          </div>

          {/* Search and filter controls */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search public projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 
                          border-gray-200 focus:outline-none focus:border-gray-400 
                          transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-xl border-2 
                          border-gray-200 focus:outline-none focus:border-gray-400
                          transition-all duration-200 cursor-pointer"
              >
                <option value="title">Sort by Title</option>
                <option value="owner">Sort by Creator</option>
              </select>
              <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3 bg-white rounded-xl p-6 shadow-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-700" />
              <span className="text-gray-700">Loading projects...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center h-64">
            <div className="bg-gray-100 rounded-xl p-8 max-w-md text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Projects</h3>
              <p className="text-gray-600">{error.message || "Failed to load public projects"}</p>
            </div>
          </div>
        ) : filteredAndSortedProjects.length === 0 ? (
          <div className="flex justify-center h-64">
            <div className="bg-gray-100 rounded-xl p-8 max-w-md text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchQuery ? "No matching projects" : "No public projects available"}
              </h3>
              <p className="text-gray-600">
                {searchQuery ? "Try adjusting your search terms" : "Check back later for new public projects"}
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <PublicHoverEffect items={filteredAndSortedProjects} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Public;