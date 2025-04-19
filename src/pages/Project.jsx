import Terminal from "@/components/Terminal";
import FileSystem from "@/components/FileSystem";
import CodeEditor from "@/components/CodeEditor";
import { io } from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { projectAction } from "@/store/main";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { FaChevronRight } from "react-icons/fa";

export default function Project() {
  const [soc, setSoc] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState('350px');
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [containerInfo, setContainerInfo] = useState({ name: "", secondaryPort: "" });
  const params = useParams();
  const token = useSelector((state) => state.misc.token);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTemplateAndRunContainer() {
      const containerId = params.projectId;
      
      // Fetch container information
      try {
        const containerRes = await fetch(
          `${import.meta.env.VITE_API_URL}/container/getContainerById/${containerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.token,
            },
          }
        );
        if (containerRes.ok) {
          const containerData = await containerRes.json();
          setContainerInfo({
            name: containerData.name || "",
            secondaryPort: containerData.secondaryPort || ""
          })
        }
      } catch (error) {
        console.error("Failed to fetch container information:", error);
      }
      
      // Fetch template name
      try {
        const templateRes = await fetch(
          `${import.meta.env.VITE_API_URL}/container/templateName/${containerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.token,
            },
          }
        );
        if (templateRes.ok) {
          const templateData = await templateRes.json();
          setTemplateName(templateData.templateName);
        }
      } catch (error) {
        console.error("Failed to fetch template name:", error);
      }

      // Run container
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/container/runcontainer/${containerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.token,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const socket = io(`${import.meta.env.VITE_API_URL_SOCKET}:${data.port}`);

        socket.on("connect", () => {
          setSoc(socket);
          dispatch(projectAction.setPort(data.port));
        });
      } else {
        setSoc(false);
      }
    }
    fetchTemplateAndRunContainer();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-900">
      {soc === null ? (
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
              <div className="absolute inset-0 animate-pulse rounded-full h-12 w-12 border-4 border-transparent border-t-blue-400/30"></div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-lg text-gray-200 font-medium tracking-wide">Loading Project</p>
              <p className="text-sm text-gray-400">Please wait while we set up your workspace...</p>
            </div>
          </div>
        </div>
      ) : soc === false ? (
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-red-500/20">
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-xl text-gray-200 font-medium">Error Fetching Project</p>
              <p className="text-gray-400">"{params.projectId}" could not be loaded</p>
              <Link 
                to="/"
                className="inline-block mt-4 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-colors"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 mt-2">
            <div className="px-4 py-1.5 bg-zinc-800/90 backdrop-blur-sm rounded-lg border border-zinc-700 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-gray-200">
                  {templateName || "Loading template..."}  |
                </span>
                <span className="text-sm font-medium text-blue-400">{containerInfo.name}</span>
              </div>
            </div>
          </div>
          <div className="h-14 bg-gray-900 flex items-center justify-between px-6 shadow-md border-b border-gray-800">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white tracking-wide hover:text-gray-200 transition-colors">
                TERMINUS
              </span>
            </Link>
            <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-4 py-2 rounded-lg
                        border border-gray-700 hover:border-gray-600
                        text-gray-300 hover:text-white 
                        transition-all duration-200 bg-gray-800/50
                        hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 
                           group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowHelp(v => !v)}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Show help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              {showHelp && (
                <div className="absolute right-0 top-full mt-2 w-72 p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-xl z-50">
                  <button
                    onClick={() => setShowHelp(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                    aria-label="Close help"
                  >
                    &times;
                  </button>
                  <h4 className="text-sm font-medium text-gray-200 mb-2">File & Folder Creation Help</h4>
                  <div className="space-y-2 text-xs text-gray-400">
                    <p><strong>Creating files in folders:</strong></p>
                    <p>To create a file inside a folder, use the format:</p>
                    <code className="block bg-gray-900 p-2 rounded mt-1 text-gray-300">folder_name/file_name</code>
                    <p><strong>Example:</strong> src/index.js</p>
                    <p className="mt-2"><strong>Note:</strong> The same format applies when creating new folders.</p>
                    {containerInfo.secondaryPort && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p><strong>Secondary Port:</strong></p>
                        <code className="block bg-gray-900 p-2 rounded mt-1 text-blue-300">{containerInfo.secondaryPort}</code>
                        <p className="mt-1 text-gray-300">Run a server on port 4001 inside your container.</p>
                        <code className="block bg-gray-900 p-2 rounded mt-1 text-gray-300">{`${import.meta.env.VITE_API_URL}/${containerInfo.secondaryPort}`}</code>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
          <div
            className="h-[calc(100vh-3.5rem)] w-full flex relative"
          >
            {/* Show button when sidebar is hidden */}
            {isSidebarHidden && (
              <button
                onClick={() => setIsSidebarHidden(false)}
                className="absolute left-0 top-4 z-10 p-2 bg-zinc-800 hover:bg-zinc-700 
                         text-gray-400 hover:text-gray-200 rounded-r-lg transition-all duration-200
                         border border-l-0 border-zinc-700"
                title="Show Sidebar"
              >
                <FaChevronRight size={14} />
              </button>
            )}
            <div 
              id="our-fileSystem" 
              className={`h-full transition-all duration-300 ease-in-out ${
                isSidebarHidden ? 'w-0 opacity-0' : 'w-64 opacity-100'
              } bg-zinc-800 border-r border-zinc-700 overflow-hidden`}
            >
              <FileSystem 
                socket={soc} 
                onSidebarToggle={setIsSidebarHidden} 
                isHidden={isSidebarHidden}
              />
            </div>
            <div className={`flex flex-col h-full transition-all duration-300 ease-in-out ${
              isSidebarHidden ? 'w-full' : 'flex-grow'
            }`}>
              <div
                id="our-codeEditor"
                className="w-full flex-grow overflow-auto border-b border-gray-800"
                style={{ height: `calc(100vh - ${terminalHeight})` }}
              >
                <CodeEditor socket={soc} />
              </div>
              <div 
                id="our-terminal" 
                className="w-full overflow-hidden transition-all duration-300 ease-in-out bg-zinc-900 border-t border-zinc-700"
                style={{ height: terminalHeight }}
              >
                <Terminal 
                  socket={soc}
                  onHeightChange={setTerminalHeight}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
