import Terminal from "@/components/Terminal";
import FileSystem from "@/components/FileSystem";
import CodeEditor from "@/components/CodeEditor";
import { io } from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { projectAction } from "@/store/main";
import { ArrowLeft, HelpCircle, X, Send } from "lucide-react";
import { FaChevronRight } from "react-icons/fa";

export default function Project() {
  const [soc, setSoc] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState('350px');
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [containerInfo, setContainerInfo] = useState({ name: "", secondaryPort: "", port: "" });
  const [username, setUsername] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [publicId, setPublicId] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [isTogglingPrivacy, setIsTogglingPrivacy] = useState(false);
  const [publishFormData, setPublishFormData] = useState({
    title: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingPublishStatus, setIsCheckingPublishStatus] = useState(true);
  const [isDeletingPublic, setIsDeletingPublic] = useState(false);
  const [errorType, setErrorType] = useState(null); // Track specific error types
  
  const params = useParams();
  const token = useSelector((state) => state.misc.token);
  const dispatch = useDispatch();

  // Function to check project privacy flag
  const checkPrivacyFlag = async () => {
    const containerId = params.projectId;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getpublicflag/${containerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsPrivate(!data.flag); // isPublic: true -> isPrivate: false
      }
    } catch (error) {
      console.error("Failed to check privacy flag:", error);
    }
  };

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
            secondaryPort: containerData.secondaryPort || "",
            port: containerData.secondaryPort
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
        // Handle specific error types
        if (res.status === 403) {
          const errorData = await res.json();
          setErrorType('unauthorized');
          console.error("Authorization error:", errorData.error);
        }
        setSoc(false);
      }
    }
    fetchTemplateAndRunContainer();

    const checkPublishStatus = async () => {
      const containerId = params.projectId;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getpublicstatus/${containerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.publishStatus) {
            setIsPublished(true);
            setIsPrivate(data.isPrivate || true); // Set privacy status
            setPublishFormData({
              title: data.title || "",
              description: data.description || ""
            });
          } else {
            setIsPublished(false);
            setIsPrivate(true); // Default to private if not published
          }
        }
      } catch (error) {
        console.error("Failed to check publish status:", error);
      }
    };

    // Check publish status on mount
    const checkStatus = async () => {
      setIsCheckingPublishStatus(true);
      try {
        await checkPublishStatus();
        await checkPrivacyFlag(); // Check privacy flag after publish status
      } finally {
        setIsCheckingPublishStatus(false);
      }
    };
    checkStatus();
  }, []);
  
  useEffect(() => {
    // Fetch user profile data to get username
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getProfileData`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.token,
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.name || "");
          // Set initial title to container name if available
          if (containerInfo.name) {
            setPublishFormData(prev => ({
              ...prev,
              title: containerInfo.name
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile data:", error);
      }
    };
    
    if (token && token.token) {
      fetchUserProfile();
    }
  }, [token, params.projectId, containerInfo.name]);

  const handlePublishFormChange = (e) => {
    const { name, value } = e.target;
    setPublishFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/addpublic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
        body: JSON.stringify({
          containerId: params.projectId,
          title: publishFormData.title,
          description: publishFormData.description,
          owner: username,
          port: containerInfo.port
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsPublished(true);
        setPublicId(data.id);
        setShowPublishForm(false);
        alert("Project published successfully!");
      } else {
        alert("Failed to publish project. Please try again.");
      }
    } catch (error) {
      console.error("Error publishing project:", error);
      alert("An error occurred while publishing the project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePublic = async () => {
    const containerId = params.projectId;
    if (!containerId) return;
    if (window.confirm("Are you sure you want to unpublish this project?")) {
      setIsDeletingPublic(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/deletepublic/${containerId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.token,
          }
        });
        
        if (response.ok) {
          setIsPublished(false);
          setPublicId(null);
          alert("Project unpublished successfully!");
        } else {
          alert("Failed to unpublish project. Please try again.");
        }
      } catch (error) {
        console.error("Error unpublishing project:", error);
        alert("An error occurred while unpublishing the project.");
      } finally {
        setIsDeletingPublic(false);
      }
    }
  };

  const togglePrivacy = async () => {
    const containerId = params.projectId;
    if (!containerId || !isPublished) return;
    
    setIsTogglingPrivacy(true);
    try {
      const endpoint = isPrivate 
        ? `${import.meta.env.VITE_API_URL}/user/makepublic/${containerId}` 
        : `${import.meta.env.VITE_API_URL}/user/makeprivate/${containerId}`;
      
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        }
      });
      
      if (response.ok) {
        // Get the new state (opposite of current state before the toggle)
        const newPrivateState = !isPrivate;
        // Fetch the latest privacy flag to ensure UI matches server state
        await checkPrivacyFlag();
        // Use the calculated new state for the alert message
        alert(`Project is now ${newPrivateState ? 'private' : 'public'}`);
      } else {
        alert(`Failed to change project visibility. Please try again.`);
      }
    } catch (error) {
      console.error("Error toggling project visibility:", error);
      alert("An error occurred while changing project visibility.");
    } finally {
      setIsTogglingPrivacy(false);
    }
  };

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
              {errorType === 'unauthorized' ? (
                <>
                  <p className="text-xl text-gray-200 font-medium">Access Denied</p>
                  <p className="text-gray-400">You don't have permission to access this container</p>
                  <p className="text-sm text-gray-500 mt-1">This container may belong to another user</p>
                </>
              ) : (
                <>
                  <p className="text-xl text-gray-200 font-medium">Error Fetching Project</p>
                  <p className="text-gray-400">"{params.projectId}" could not be loaded</p>
                </>
              )}
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
            {isCheckingPublishStatus ? (
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-gray-500 border-t-transparent"></span>
                <span className="text-gray-400">Checking status...</span>
              </div>
            ) : isPublished ? (
              <>
                <button
                  onClick={handleDeletePublic}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-700 text-red-500 bg-transparent hover:bg-red-700/10 font-medium transition-all duration-200 shadow-sm"
                  type="button"
                  disabled={isDeletingPublic}
                >
                  {isDeletingPublic ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent"></span>
                  ) : (
                    <span>Unpublish</span>
                  )}
                </button>
                <div 
                  className={`relative inline-flex h-9 w-28 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${isPrivate ? 'bg-red-500/20 border border-red-500' : 'bg-green-500/20 border border-green-500'}`}
                  onClick={!isTogglingPrivacy ? togglePrivacy : undefined}
                  role="button"
                  tabIndex={0}
                  aria-label={`Project is ${isPrivate ? 'private' : 'public'}, click to make it ${isPrivate ? 'public' : 'private'}`}
                >
                  <span 
                    className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${isPrivate ? 'translate-x-0' : 'translate-x-[4.5rem]'}`}
                  >
                    {isTogglingPrivacy ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent"></span>
                    ) : (
                      <span className={`text-xs font-bold ${isPrivate ? 'text-red-500' : 'text-green-500'}`}>
                        {isPrivate ? 'P' : 'P'}
                      </span>
                    )}
                  </span>
                  <span className={`absolute ${isPrivate ? 'left-10' : 'left-3'} text-xs font-medium transition-all duration-200 ${isPrivate ? 'text-red-500' : 'text-green-500'}`}>
                    {isPrivate ? 'Private' : 'Public'}
                  </span>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowPublishForm(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-green-700 text-green-500 bg-transparent hover:bg-green-700/10 font-medium transition-all duration-200 shadow-sm"
                type="button"
              >
                <span>Publish</span>
              </button>
            )}
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
                      <a 
                        href={`${import.meta.env.VITE_API_URL_SOCKET}:${containerInfo.secondaryPort}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-blue-300 transition-colors"
                      >
                        <code className="block bg-gray-900 p-2 rounded mt-1 text-gray-300 hover:text-blue-300 cursor-pointer">{`${import.meta.env.VITE_API_URL_SOCKET}:${containerInfo.secondaryPort}`}</code>
                      </a>
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
          {showPublishForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg w-96">
                <h4 className="text-lg font-medium text-gray-200 mb-4">Publish Project</h4>
                <form onSubmit={handlePublish}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-200">Title:</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={publishFormData.title} 
                        onChange={handlePublishFormChange} 
                        className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-200">Description:</label>
                      <textarea 
                        name="description" 
                        value={publishFormData.description} 
                        onChange={handlePublishFormChange} 
                        className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <button 
                      type="submit" 
                      className="px-4 py-2 rounded-lg bg-green-700 hover:bg-green-600 text-gray-200 font-medium transition-colors"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-500 border-t-green-200"></div>
                      ) : (
                        <span>Publish</span>
                      )}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowPublishForm(false)} 
                      className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
