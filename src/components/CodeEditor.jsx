import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { useDispatch, useSelector } from "react-redux";
import { filesAction } from "@/store/main";
import { 
    FaCode, 
    FaTimes, 
    FaPalette,
    FaSearch, 
    FaSave,
    FaExpandAlt,
    FaMoon,
    FaSun,
    FaDownload,
    FaSearchPlus,
    FaSearchMinus,
    FaPlay,
    FaStop,
    FaJs,
    FaPython,
    FaJava,
    FaHtml5,
    FaCss3,
    FaMarkdown,
    FaFile,
    FaFileAlt,
    FaFileCode,
    FaDatabase,
    FaPuzzlePiece,
    FaBoxOpen,
    FaColumns,
    FaIndent,
    FaCrosshairs
} from "react-icons/fa";
import {
    SiCplusplus,
    SiC
} from "react-icons/si";

// Import all Ace modes and themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-text";

// Import additional themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

// Add these theme imports
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-tomorrow";

let timer;

// Code snippet templates organized by language
const codeSnippets = {
    javascript: [
        {
            name: "Function",
            description: "Create a named function",
            code: "function functionName(params) {\n\t// code\n\treturn;\n}"
        },
        {
            name: "Arrow Function",
            description: "Create an arrow function",
            code: "const functionName = (params) => {\n\t// code\n\treturn;\n}"
        },
        {
            name: "Class",
            description: "Create a class",
            code: "class ClassName {\n\tconstructor(params) {\n\t\t// constructor\n\t}\n\n\tmethod() {\n\t\t// method body\n\t}\n}"
        },
        {
            name: "React Component",
            description: "Create a React functional component",
            code: "import React from 'react';\n\nconst ComponentName = ({ props }) => {\n\treturn (\n\t\t<div>\n\t\t\t{/* content */}\n\t\t</div>\n\t);\n};\n\nexport default ComponentName;"
        },
        {
            name: "useState Hook",
            description: "React useState hook template",
            code: "const [state, setState] = useState(initialValue);"
        },
        {
            name: "useEffect Hook",
            description: "React useEffect hook template",
            code: "useEffect(() => {\n\t// effect code\n\n\treturn () => {\n\t\t// cleanup code\n\t};\n}, [dependencies]);"
        },
    ],
    python: [
        {
            name: "Function",
            description: "Create a Python function",
            code: "def function_name(params):\n\t# code\n\treturn"
        },
        {
            name: "Class",
            description: "Create a Python class",
            code: "class ClassName:\n\tdef __init__(self, params):\n\t\t# constructor\n\t\tpass\n\n\tdef method(self):\n\t\t# method body\n\t\tpass"
        },
    ],
    c_cpp: [
        {
            name: "Main Function",
            description: "C++ main function template",
            code: "#include <iostream>\n\nint main() {\n\t// Your code here\n\tstd::cout << \"Hello, World!\" << std::endl;\n\treturn 0;\n}"
        },
        {
            name: "Class",
            description: "C++ class template",
            code: "class ClassName {\nprivate:\n\t// private members\n\n\npublic:\n\t// Constructor\n\tClassName() {\n\t\t// initialization\n\t}\n\n\t// Methods\n\tvoid method() {\n\t\t// method implementation\n\t}\n};"
        },
        {
            name: "Competitive Programming",
            description: "C++ competitive programming template with common utilities",
            code: "#include <bits/stdc++.h>\n\n// अहं कृत्स्नस्य जगतः प्रभवः प्रलयस्तथा ।।6।।\n\nusing namespace std;\n\n#define IOS                       \\\n    ios_base::sync_with_stdio(0); \\\n    cin.tie(0);                   \\\n    cout.tie(0);\n#define endl \"\\n\"\n#define int long long\ntypedef unsigned long long ll;\ntypedef pair<int, int> pii;\ntypedef pair<ll, ll> pll;\ntypedef pair<string, string> pss;\ntypedef vector<pair<int, int>> vpii;\ntypedef vector<pair<ll, ll>> vpll;\ntypedef vector<int> vi;\ntypedef vector<vi> vvi;\ntypedef vector<pii> vii;\ntypedef vector<ll> vl;\ntypedef vector<vl> vvl;\n#define fi first\n#define se second\n#define all(arr) arr.begin(), arr.end()\n#define MP make_pair\n#define pb push_back\n#define repeat(i, st, n) for (int i = st; i < n; i++)\nconst int mod = 1e9 + 7;\nmt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());\nvoid print(vi &v)\n{\n    for (auto it : v)\n        cout << it << \" \";\n    cout << endl;\n}\nvoid solve()\n{\n}\n\nsigned main()\n{\n    IOS\n\n#ifndef ONLINE_JUDGE\n        freopen(\"input.txt\", \"r\", stdin);\n    freopen(\"output.txt\", \"w\", stdout);\n#endif\n\n    int t = 1;\n    cin >> t;\n    while (t--)\n    {\n        solve();\n    }\n    return 0;\n}"
        },
    ],
    html: [
        {
            name: "HTML5 Template",
            description: "Basic HTML5 template",
            code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>"
        },
    ],
    css: [
        {
            name: "Flexbox Container",
            description: "CSS flexbox container template",
            code: ".container {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 10px;\n}"
        },
    ]
};

// Helper function to get snippets for a specific language
const getLanguageSnippets = (extension) => {
    if (!extension) return [];
    const mode = extentionMapping[extension];
    return codeSnippets[mode] || [];
};

const themes = {
    dark: [
        "monokai",
        "dracula",
        "tomorrow_night",
        "solarized_dark",
    ],
    light: [
        "github",
        "eclipse",
        "solarized_light",
        "tomorrow",
    ]
};

const extentionMapping = {
    ".cpp": "c_cpp",
    ".c": "c_cpp",
    ".js": "javascript",
    ".py": "python",
    ".java": "java",
    ".xml": "xml",
    ".sass": "sass",
    ".md": "markdown",
    ".json": "json",
    ".html": "html",
    ".css": "css",
    ".txt": "text",
    ".hpp": "c_cpp",
};

const getFileIcon = (extension) => {
    const iconMap = {
        ".js": <FaJs className="text-yellow-400" />,
        ".py": <FaPython className="text-blue-400" />,
        ".java": <FaJava className="text-red-400" />,
        ".cpp": <SiCplusplus className="text-blue-500" />,
        ".c": <SiC className="text-blue-600" />,
        ".html": <FaHtml5 className="text-orange-500" />,
        ".css": <FaCss3 className="text-blue-500" />,
        ".json": <FaDatabase className="text-gray-400" />,
        ".md": <FaMarkdown className="text-white" />,
        ".txt": <FaFileAlt className="text-gray-400" />,
        ".hpp": <FaFileCode className="text-blue-500" />,
    };
    return iconMap[extension] || <FaFile className="text-gray-400" />;
};

export default function CodeEditor({ socket }) {
    const [val, setVal] = useState(null);
    const [save, setSave] = useState("saved");
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [selectedFontSize, setSelectedFontSize] = useState(14);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showMinimap, setShowMinimap] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [themeIndex, setThemeIndex] = useState(0);
    const [fontSize, setFontSize] = useState(14);
    const [isRunning, setIsRunning] = useState(false);
    const [isKilling, setIsKilling] = useState(false);
    const [showSnippets, setShowSnippets] = useState(false);
    const [snippetSearch, setSnippetSearch] = useState("");
    const [cursorPosition, setCursorPosition] = useState({ row: 1, column: 1 });
    const editorRef = React.useRef(null);

    const dispatch = useDispatch();
    const currFile = useSelector((state) => state.files.selected);
    const openedFiles = useSelector((state) => state.files.openedFiles);
    const port = useSelector((state) => state.project.port);

    async function getFile() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}:${port}/project/file`, {
                method: "POST",
                body: JSON.stringify(currFile),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                setVal(data);
            }
        } catch (error) {
            console.error("Failed to fetch file:", error);
        }
    }

    useEffect(() => {
        if (currFile != null) {
            getFile();
        }
    }, [currFile]);

    useEffect(() => {
        socket.on("file:saveStatus", (data) => {
            setSave(data === "success" ? "saved" : "unsaved");
        });

        return () => socket.off("file:saveStatus");
    }, [socket]);

    function fileChange(data) {
        setVal(data);
        setSave("saving");
        clearTimeout(timer);
        timer = setTimeout(() => {
            socket.emit("file:save", data, currFile.path);
        }, 1000);
    }

    const TabButton = ({ file, isActive }) => (
        <div className={`flex items-center px-3 py-1.5 text-sm border-r border-zinc-700
                      ${isActive 
                          ? 'bg-zinc-800 text-white' 
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}>
            <span className="mr-2">{getFileIcon(file.extension)}</span>
            <button 
                onClick={() => dispatch(filesAction.setSelected(file))}
                className="mr-2"
            >
                {file.name}
            </button>
            {isActive && (
                <button
                    onClick={() => dispatch(filesAction.removeSelectedFile(file))}
                    className="opacity-60 hover:opacity-100"
                >
                    <FaTimes size={12} />
                </button>
            )}
        </div>
    );

    // Function to handle theme cycling
    const cycleTheme = () => {
        const themeList = isDarkMode ? themes.dark : themes.light;
        setThemeIndex((prev) => (prev + 1) % themeList.length);
    };

    // Function to toggle between dark and light mode
    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
        setThemeIndex(0); // Reset theme index when switching modes
    };

    // Add zoom functions
    const zoomIn = () => {
        setFontSize(prev => Math.min(prev + 2, 32)); // Max size 32
    };

    const zoomOut = () => {
        setFontSize(prev => Math.max(prev - 2, 8)); // Min size 8
    };

    // Function to toggle code snippets panel
    const toggleSnippets = () => {
        setShowSnippets(!showSnippets);
    };

    // Function to insert a code snippet
    const insertSnippet = (snippetCode) => {
        if (editorRef.current && editorRef.current.editor) {
            const editor = editorRef.current.editor;
            editor.session.insert(editor.getCursorPosition(), snippetCode);
            setShowSnippets(false); // Close snippets panel after insertion
            setSave("unsaved"); // Mark as unsaved after inserting snippet
        }
    };

    // Function to update cursor position
    const updateCursorPosition = () => {
        if (editorRef.current && editorRef.current.editor) {
            const cursorPos = editorRef.current.editor.getCursorPosition();
            setCursorPosition({
                row: cursorPos.row + 1, // Adding 1 since Ace is 0-indexed but UI should be 1-indexed
                column: cursorPos.column + 1
            });
        }
    };
    
    const handleKillProcess = async () => {
        setIsKilling(true);
        try {
            // Send command to terminal to kill processes on port 4001
            socket.emit("terminal:write", "lsof -ti:4001 | xargs kill -9\n");
            console.log('Kill command sent to terminal');
        } catch (error) {
            console.error('Failed to kill process:', error);
        } finally {
            setIsKilling(false);
        }
    };

    const handleRunCode = async () => {
        if (!currFile || !currFile.path) {
            console.error('No file selected');
            return;
        }

        const fileExt = currFile.path.substring(currFile.path.lastIndexOf('.'));
        if (!['.cpp', '.js', '.py'].includes(fileExt)) {
            console.error('Unsupported file type. Only .cpp, .js, and .py files are supported');
            return;
        }

        setIsRunning(true);
        try {
            // Get the file path
            const res = await fetch(`${import.meta.env.VITE_API_URL_SOCKET}:${port}/project/file/find/${currFile.name}`);
            if (!res.ok) {
                throw new Error('Failed to get file path');
            }
            
            const data = await res.json();
            const filePath = data.path;
            const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);

            // Determine command based on file type
            let command;
            switch (fileExt) {
                case '.cpp':
                    const fileNameWithoutExt = fileName.replace('.cpp', '');
                    command = `cd "/user/${folderPath}" && g++ "${fileName}" -o "${fileNameWithoutExt}" && "./${fileNameWithoutExt}"`;
                    break;
                case '.js':
                    command = `cd "/user/${folderPath}" && node "${fileName}"`;
                    break;
                case '.py':
                    command = `cd "/user/${folderPath}" && python3 "${fileName}"`;
                    break;
                default:
                    throw new Error('Unsupported file type');
            }
            
            // Send command to terminal
            socket.emit("terminal:write", command + "\n");
        } catch (error) {
            console.error('Failed to run code:', error);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className={`flex flex-col h-full ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-50'} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Editor Header */}
            <div className={`flex items-center justify-between h-10 
                         ${isDarkMode 
                             ? 'bg-zinc-800 border-zinc-700' 
                             : 'bg-slate-50 border-slate-200 shadow-sm'} 
                         border-b`}>
                {/* Tabs */}
                <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar">
                    {openedFiles.map((file) => (
                        <div
                            key={file.fullPath}
                            onClick={() => dispatch(filesAction.setSelected(file))}
                            className={`
                                flex items-center gap-2 px-3 py-1.5 cursor-pointer
                                border-r transition-colors duration-150 select-none
                                ${file.fullPath === currFile?.fullPath
                                    ? isDarkMode
                                        ? 'bg-zinc-700 text-white border-zinc-600'
                                        : 'bg-blue-100 text-blue-800 border-slate-200 font-semibold shadow-sm'
                                    : isDarkMode
                                        ? 'hover:bg-zinc-700/50 text-zinc-400 border-zinc-700'
                                        : 'hover:bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900'
                                }
                            `}
                        >
                            <span className="mr-2">{getFileIcon(file.extension)}</span>
                            <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(filesAction.removeSelectedFile(file));
                                }}
                                className={`
                                    p-1 rounded-full opacity-70 hover:opacity-100
                                    ${isDarkMode 
                                        ? 'hover:bg-zinc-600' 
                                        : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                                    }
                                `}
                            >
                                <FaTimes size={10} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className={`
                    flex items-center gap-2 px-3 border-l
                    ${isDarkMode ? 'border-zinc-700' : 'border-slate-200'}
                `}>
                    {/* Code Snippets toggle */}
                    {currFile && (
                        <button
                            onClick={toggleSnippets}
                            className={`
                                p-1.5 rounded-lg transition-colors flex items-center gap-1
                                ${isDarkMode
                                    ? showSnippets 
                                      ? 'text-purple-400 hover:text-purple-300 bg-zinc-700' 
                                      : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                    : showSnippets 
                                      ? 'text-purple-600 hover:text-purple-500 bg-slate-200' 
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                }
                            `}
                            title="Code Snippets Library"
                        >
                            <FaPuzzlePiece size={14} />
                            <span className="text-xs">Snippets</span>
                        </button>
                    )}
                    
                    {/* Zoom Controls */}
                    <div className="flex items-center mr-2 border-r border-zinc-600 pr-2">
                        <button
                            onClick={zoomOut}
                            className={`
                                p-1.5 rounded-lg transition-colors
                                ${isDarkMode
                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                }
                            `}
                            title="Zoom Out"
                        >
                            <FaSearchMinus size={14} />
                        </button>
                        <span className={`mx-2 text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                            {fontSize}px
                        </span>
                        <button
                            onClick={zoomIn}
                            className={`
                                p-1.5 rounded-lg transition-colors
                                ${isDarkMode
                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                }
                            `}
                            title="Zoom In"
                        >
                            <FaSearchPlus size={14} />
                        </button>
                    </div>

                    <button
                        onClick={() => dispatch(filesAction.clearAllSelectedFiles())}
                        className={`
                            p-1.5 rounded-lg transition-colors
                            ${isDarkMode
                                ? 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                            }
                        `}
                        title="Close All"
                    >
                        <FaTimes size={14} />
                    </button>
                    <button
                        onClick={cycleTheme}
                        className={`
                            p-1.5 rounded-lg transition-colors
                            ${isDarkMode
                                ? 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                            }
                        `}
                        title="Change Theme Variant"
                    >
                        <FaPalette size={14} />
                    </button>
                    <button
                        onClick={toggleTheme}
                        className={`
                            p-1.5 rounded-lg transition-colors
                            ${isDarkMode
                                ? 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                            }
                        `}
                        title="Toggle Light/Dark Mode"
                    >
                        {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
                    </button>
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded"
                        title="Toggle Fullscreen"
                    >
                        <FaExpandAlt size={14} />
                    </button>
                    {currFile?.path && ['.js'].includes(currFile.path.substring(currFile.path.lastIndexOf('.'))) && (
                        <button
                            onClick={handleKillProcess}
                            disabled={isRunning}
                            className={`p-2 rounded flex items-center gap-2 ${
                                isRunning 
                                    ? 'text-gray-500 cursor-not-allowed' 
                                    : 'text-gray-500'
                            } transition-colors`}
                            title="Kill Process"
                        >
                            <FaStop size={14} />
                            <span className="text-xs">Kill</span>
                        </button>
                    )}
                    {currFile?.path && ['.cpp', '.js', '.py'].includes(currFile.path.substring(currFile.path.lastIndexOf('.'))) && (
                        <button
                            onClick={handleRunCode}
                            disabled={isRunning || save !== 'saved'}
                            className={`p-2 rounded flex items-center gap-2 ${
                                isRunning 
                                    ? 'text-gray-500 cursor-not-allowed' 
                                    : save !== 'saved'
                                    ? 'text-gray-500 cursor-not-allowed'
                                    : currFile.path.endsWith('.cpp')
                                    ? 'text-blue-500 hover:text-blue-600'
                                    : currFile.path.endsWith('.js')
                                    ? 'text-yellow-500 hover:text-yellow-600'
                                    : currFile.path.endsWith('.py')
                                    ? 'text-green-500 hover:text-green-600'
                                    : 'text-gray-500'
                            } transition-colors`}
                            title={
                                isRunning 
                                    ? 'Code is running...' 
                                    : save !== 'saved'
                                    ? 'Save file before running'
                                    : `Run ${
                                        currFile.path.endsWith('.cpp') 
                                            ? 'C++' 
                                            : currFile.path.endsWith('.js')
                                            ? 'JavaScript'
                                            : 'Python'
                                    } code`
                            }
                        >
                            {isRunning ? (
                                <>
                                    <FaPlay className="animate-pulse" />
                                    <span className="text-xs">Running...</span>
                                </>
                            ) : (
                                <>
                                    <FaPlay />
                                    <span className="text-xs">
                                        {currFile.path.endsWith('.cpp') 
                                            ? 'Run C++' 
                                            : currFile.path.endsWith('.js')
                                            ? 'Run JS'
                                            : 'Run Python'}
                                    </span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* File Path and Status Bar */}
            {currFile && (
                <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-800 border-b border-zinc-700 text-xs">
                    <div className="flex items-center space-x-4 text-zinc-400">
                        <span>{currFile.path.replaceAll("\\", " › ")}</span>
                        <div className="flex items-center space-x-1">
                            <FaSave size={12} className={save === "saved" ? "text-green-500" : "text-yellow-500"} />
                            <span>{save === "saved" ? "Saved" : save === "saving" ? "Saving..." : "Unsaved"}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-zinc-400">
                        {/* Cursor Position Indicator */}
                        <div className="flex items-center space-x-1">
                            <FaCrosshairs size={10} className="opacity-70" />
                            <span>Ln {cursorPosition.row}, Col {cursorPosition.column}</span>
                        </div>
                        <span>{extentionMapping[currFile.extension]}</span>
                        <span>UTF-8</span>
                        <span>LF</span>
                    </div>
                </div>
            )}

            {/* Editor Content */}
            {currFile === null ? (
                <div className="flex-1 flex items-center justify-center bg-zinc-900 text-zinc-500">
                    <div className="text-center">
                        <FaCode size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No File Selected</p>
                        <p className="text-sm mt-2">Select a file to start editing</p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 relative">
                    {/* Code Snippets Panel */}
                    {showSnippets && (
                        <div className={`absolute right-0 top-0 z-10 w-80 h-full overflow-y-auto 
                            ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-slate-200'} 
                            border-l shadow-lg`}>
                            <div className="p-3 border-b border-zinc-700">
                                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                    <FaPuzzlePiece className="inline mr-2" /> Code Snippets
                                </h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search snippets..."
                                        value={snippetSearch}
                                        onChange={(e) => setSnippetSearch(e.target.value)}
                                        className={`w-full p-2 rounded 
                                            ${isDarkMode 
                                                ? 'bg-zinc-700 text-white placeholder-zinc-400 border-zinc-600' 
                                                : 'bg-slate-100 text-slate-800 placeholder-slate-400 border-slate-300'} 
                                            border`}
                                    />
                                    <FaSearch className={`absolute right-3 top-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
                                </div>
                            </div>
                            <div className="p-3">
                                {getLanguageSnippets(currFile?.extension)
                                    .filter(snippet => 
                                        snippet.name.toLowerCase().includes(snippetSearch.toLowerCase()) ||
                                        snippet.description.toLowerCase().includes(snippetSearch.toLowerCase())
                                    )
                                    .map((snippet, index) => (
                                        <div 
                                            key={index} 
                                            className={`mb-3 p-3 rounded cursor-pointer transition-colors 
                                                ${isDarkMode 
                                                    ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200' 
                                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
                                            onClick={() => insertSnippet(snippet.code)}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-medium">{snippet.name}</h4>
                                                <span className="text-xs px-2 py-1 rounded bg-blue-500 text-white">
                                                    {extentionMapping[currFile?.extension]}
                                                </span>
                                            </div>
                                            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                                                {snippet.description}
                                            </p>
                                        </div>
                                    ))
                                }
                                {getLanguageSnippets(currFile?.extension).filter(snippet => 
                                    snippet.name.toLowerCase().includes(snippetSearch.toLowerCase()) ||
                                    snippet.description.toLowerCase().includes(snippetSearch.toLowerCase())
                                ).length === 0 && (
                                    <div className={`text-center py-5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                                        <FaBoxOpen className="mx-auto mb-2 text-2xl" />
                                        <p>No snippets found for this language or search query</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <AceEditor
                        ref={editorRef}
                        mode={extentionMapping[currFile.extension]}
                        theme={isDarkMode ? themes.dark[themeIndex] : themes.light[themeIndex]}
                        onChange={fileChange}
                        fontSize={fontSize}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        onLoad={(editor) => {
                            editor.commands.addCommand({
                                name: 'cutLineOrSelection',
                                bindKey: { win: 'Ctrl-X', mac: 'Command-X' },
                                exec: (editor) => {
                                    const hasSelection = !editor.selection.isEmpty();
                                    if (!hasSelection) {
                                        // If no text is selected, select the entire line
                                        editor.selection.selectLine();
                                    }
                                    // Cut the selected text (or line)
                                    document.execCommand('cut');
                                    if (!hasSelection) {
                                        // Move cursor to the beginning of the next line
                                        editor.selection.clearSelection();
                                    }
                                },
                                readOnly: false
                            });
                            
                            // Set up cursor position tracking
                            editor.selection.on('changeCursor', updateCursorPosition);
                            
                            // Initialize cursor position
                            updateCursorPosition();
                        }}
                        width="100%"
                        height="100%"
                        value={val}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 4,
                            showPrintMargin: false,
                            showGutter: true,
                            highlightActiveLine: true,
                            showInvisibles: false,
                            useSoftTabs: true,
                            navigateWithinSoftTabs: true,
                            displayIndentGuides: true,
                            enableMultiselect: true,
                            fadeFoldWidgets: true,
                            showFoldWidgets: true,
                            highlightSelectedWord: true,
                            animatedScroll: true,
                            scrollPastEnd: 0.5,
                            fixedWidthGutter: true,
                            theme: isDarkMode ? themes.dark[themeIndex] : themes.light[themeIndex],
                        }}
                        className={isDarkMode ? 'bg-zinc-900' : 'bg-white'}
                    />
                </div>
            )}
        </div>
    );
}
