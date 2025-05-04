import { WobbleCard } from "@/components/ui/wobble-card";
import { TailwindcssButtons } from "@/components/ui/tailwindcss-buttons";
import { HoverEffect } from "@/components/ui/card_container";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import React from "react";
import { useNavigate } from "react-router-dom";
import CreateContButton  from  "@/components/dashboard/CreateContainer"
import {useSelector} from "react-redux";
import { Server, Command, BarChart2, Plus, Settings2 } from "lucide-react";



function Home() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.misc.token);
  const [error, setError] = useState(null);
  

const getContainerStatus = async (containerId) => { 
  const response = await fetch(`${import.meta.env.VITE_API_URL}/container/details/${containerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
  });
  const details = await response.json();
  return {
    status: details.status, 
    cpu: details.cpuUsagePercentage, 
    memory: details.memoryUsagePercentage, 
    memoryUsage: details.memoryUsage,
    memoryLimit: details.memoryLimit,
    memoryUsageMB: details.memoryUsageMB,
    memoryLimitMB: details.memoryLimitMB,
    containerUptime: details.containerUptime
  };
};

useEffect(() => {
  const fetchContainers = async () => {
    try {
      const tok = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`${import.meta.env.VITE_API_URL}/container/listcontainers`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tok.token,
        },
      });
      let data = await response.json();
      const userContainers = await Promise.all(data.map(async (container) => {
        const details = await getContainerStatus(container.id);
        return {
          id: container.id,
          title: container.name,
          lastUsed: container.lastUsed,
          link: `project/${container.id}`,
          Status: details.status,
          CPU: details.cpu,
          Memory: details.memory,
          MemoryUsage: details.memoryUsage,
          MemoryLimit: details.memoryLimit,
          MemoryUsageMB: details.memoryUsageMB,
          MemoryLimitMB: details.memoryLimitMB,
          Uptime: details.containerUptime
        };
      }));
      console.log(userContainers)
      setProjects(userContainers);
      if (data === null) {
        console.log("empytyjhbj")
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  fetchContainers();
}, []);


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-sm p-8 mb-8 border-2 border-gray-100">
        <div className="flex items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gray-50 rounded-xl shadow-sm border-2 border-gray-100">
                <Server className="w-7 h-7 text-gray-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Container Dashboard
                </h1>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Command className="w-4 h-4" />
                    <span className="text-sm">Manage</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BarChart2 className="w-4 h-4" />
                    <span className="text-sm">Monitor</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Settings2 className="w-4 h-4" />
                    <span className="text-sm">Configure</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 pl-[52px] border-l-2 border-gray-100">
              Manage and monitor your container infrastructure. Create, deploy, and scale your development environments with ease.
            </p>
          </div>

          {/* Enhanced Create Container Button */}
          <div className="flex-shrink-0">
            <CreateContButton templateDefault={"undefined"}>
              <button 
                className="flex items-center gap-2 px-6 py-3 rounded-xl
                          bg-gray-900 text-white hover:bg-gray-800 
                          transition-all duration-200 group border-2 border-gray-800
                          hover:shadow-lg"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Create Container</span>
              </button>
            </CreateContButton>
          </div>
        </div>
      </div>

      <div>
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
              {/* Container Status Overview */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-t-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Container Status</h3>
                  <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Overview
                  </span>
                </div>
                <div className="mt-4 flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Total</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">{projects.length}</span>
                  </div>
                  <div className="h-px bg-gray-100"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Running</span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-base font-bold text-gray-800">
                        {projects.filter(p => p.Status === 'running').length}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Stopped</span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                      <span className="text-base font-bold text-gray-800">
                        {projects.filter(p => p.Status === 'exited').length}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Other</span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
                      <span className="text-base font-bold text-gray-800">
                        {projects.filter(p => !['running', 'exited'].includes(p.Status)).length}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Resource Usage Overview */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-t-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Resource Usage</h3>
                  <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Performance
                  </span>
                </div>
                <div className="mt-4 flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Command className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Avg CPU</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {projects.length > 0 
                        ? (projects.reduce((acc, curr) => acc + (parseFloat(curr.CPU?.replace('%', '') || 0)), 0) / projects.length).toFixed(2)
                        : 0}%
                    </span>
                  </div>
                  <div className="h-px bg-gray-100"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Total Memory</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {(() => {
                        const totalMemoryMB = Math.round(projects.reduce((acc, curr) => acc + (curr.MemoryUsage / 1024 / 1024 || 0), 0));
                        return totalMemoryMB >= 1000 
                          ? (totalMemoryMB / 1024).toFixed(2) + ' GB'
                          : totalMemoryMB + ' MB';
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Command className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Highest Mem %</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {projects.length > 0 
                        ? Math.max(...projects.map(p => parseFloat(p.Memory?.replace('%', '') || 0))).toFixed(2)
                        : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Avg Mem %</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {projects.length > 0 
                        ? (projects.reduce((acc, curr) => acc + (parseFloat(curr.Memory?.replace('%', '') || 0)), 0) / projects.length).toFixed(2)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Container Details */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-t-4 border-gray-600">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Container Details</h3>
                  <span className="bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    System Info
                  </span>
                </div>
                <div className="mt-4 flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Memory Usage</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {(() => {
                        let memoryMB;
                        if (projects.length > 0 && projects[0].MemoryUsageMB) {
                          memoryMB = projects.reduce((acc, curr) => acc + (parseFloat(curr.MemoryUsageMB) || 0), 0);
                        } else {
                          memoryMB = Math.round(projects.reduce((acc, curr) => acc + (curr.MemoryUsage / 1024 / 1024 || 0), 0));
                        }
                        return memoryMB >= 1000 
                          ? (memoryMB / 1024).toFixed(2) + ' GB'
                          : memoryMB.toFixed(2) + ' MB';
                      })()}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Memory Limit</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {(() => {
                        if (projects.length > 0) {
                          // Get the memory limit in MB
                          let memLimitMB;
                          if (projects[0].MemoryLimitMB) {
                            memLimitMB = parseFloat(projects[0].MemoryLimitMB);
                          } else if (projects[0].MemoryLimit) {
                            memLimitMB = (projects[0].MemoryLimit / (1024 * 1024));
                          } else {
                            return 'N/A';
                          }
                          
                          // Convert to GB if needed
                          return memLimitMB >= 1000
                            ? (memLimitMB / 1024).toFixed(2) + ' GB'
                            : memLimitMB.toFixed(2) + ' MB';
                        }
                        return 'N/A';
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Memory Utilization</span>
                    </div>
                    <span className="text-base font-bold text-gray-800">
                      {(() => {
                        if (projects.length > 0) {
                          // Calculate average memory utilization across all containers
                          const totalMemUsage = projects.reduce((acc, curr) => {
                            const memPct = parseFloat(curr.Memory?.replace('%', '') || 0);
                            return acc + memPct;
                          }, 0);
                          
                          const avgMemUsage = totalMemUsage / projects.length;
                          
                          // Determine indicator color based on average usage
                          let indicatorClass = "bg-green-500";
                          if (avgMemUsage > 75) indicatorClass = "bg-red-500";
                          else if (avgMemUsage > 50) indicatorClass = "bg-yellow-500";
                          
                          return (
                            <div className="flex items-center">
                              <span className={`w-2 h-2 rounded-full ${indicatorClass} mr-2`}></span>
                              <span>{avgMemUsage.toFixed(1)}%</span>
                            </div>
                          );
                        }
                        return 'N/A';
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Containers Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-bold text-gray-800">Recent Containers</h2>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Last 3
                    </span>
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <TailwindcssButtons idx={1} onClick={() => navigate("/containers")}>
                      Show all
                    </TailwindcssButtons>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <HoverEffect limit={3} />
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
