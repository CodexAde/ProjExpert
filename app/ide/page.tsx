"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FolderOpen,
  Search,
  GitBranch,
  Cpu,
  TerminalSquare,
  Settings,
  FileCode2,
  ChevronLeft,
  X,
  Play,
  Slash,
  Columns,
  Sparkles,
  Zap,
  ArrowUpCircle,
  Circle,
  Download,
  Cloud,
  CheckCircle,
  Bell,
} from "lucide-react";

/**
 * VS Code-like static UI page
 * - polished visual design
 * - scrollable, line-numbered mock code
 * - right-side resizable & vertically draggable Copilot
 * - bottom status bar with interactive attached buttons (glow, toggle)
 */

const MOCK_CODE = `/**
 * DashboardPage.tsx
 * Mocked example: ProjExpert dashboard (tailwind + components)
 */

"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost">Share</Button>
          <Button variant="primary" onClick={() => setProgress((p) => Math.min(100, p + 5))}>
            Increase
          </Button>
        </div>
      </div>

      <Card className="bg-[#0f1720] border-[#1f2937]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-200">Active Track</span>
            <span className="px-2 py-0.5 rounded bg-blue-600 text-xs">Web Dev</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            This example demonstrates a mock component structure with tailwind classes.
          </p>
          <div className="mt-3">
            <div className="h-2 bg-[#0b1220] rounded">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded" style={{ width: String(progress) + "%" }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

export default function Page(): JSX.Element {
  // UI state
  const [active, setActive] = useState<string>("explorer");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotWidth, setCopilotWidth] = useState<number>(420);
  const [copilotTop, setCopilotTop] = useState<number>(60);
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);

  // bottom button states
  const [connected, setConnected] = useState(true);
  const [aiMode, setAiMode] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);

  // refs for resize/drag
  const startX = useRef(0);
  const startWidth = useRef(0);
  const startY = useRef(0);
  const startTop = useRef(0);
  const copilotRef = useRef<HTMLDivElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const codeRef = useRef<HTMLDivElement | null>(null);

  const codeLines = MOCK_CODE.split("\n");

  // mouse handlers for resizing and vertical dragging
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (resizing) {
        const dx = startX.current - e.clientX;
        const next = Math.min(Math.max(startWidth.current + dx, 260), 880);
        setCopilotWidth(next);
      }
      if (dragging) {
        const dy = e.clientY - startY.current;
        let nextTop = startTop.current + dy;
        nextTop = Math.max(36, Math.min(nextTop, window.innerHeight - 160));
        setCopilotTop(nextTop);
      }
    }
    function onUp() {
      setResizing(false);
      setDragging(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing, dragging]);

  // sync gutter with code scroll
  useEffect(() => {
    if (!codeRef.current || !gutterRef.current) return;
    function onScroll() {
      if (gutterRef.current) gutterRef.current.scrollTop = codeRef.current!.scrollTop;
    }
    codeRef.current.addEventListener("scroll", onScroll);
    return () => codeRef.current!.removeEventListener("scroll", onScroll);
  }, []);

  function handleResizerDown(e: React.MouseEvent) {
    setResizing(true);
    startX.current = e.clientX;
    startWidth.current = copilotWidth;
    e.preventDefault();
  }
  function handleDragStart(e: React.MouseEvent) {
    setDragging(true);
    startY.current = e.clientY;
    startTop.current = copilotTop;
    e.preventDefault();
  }

  function toggleCopilot() {
    setCopilotOpen((s) => !s);
  }

  // mock toast for button clicks
  function toast(text: string) {
    const el = document.createElement("div");
    el.textContent = text;
    el.className =
      "fixed right-6 bottom-28 bg-white/6 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm animate-toast";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  return (
    <div className="h-screen w-screen flex bg-[#051018] text-gray-200">
      {/* left gadget sidebar */}
      <aside className="flex flex-col items-center bg-[#07121a] w-14 py-4 border-r border-[#12202a]">
        <div className="space-y-3">
          {[
            { id: "explorer", icon: <FolderOpen size={18} />, label: "Explorer" },
            { id: "search", icon: <Search size={18} />, label: "Search" },
            { id: "source", icon: <GitBranch size={18} />, label: "Source" },
            { id: "ai", icon: <Cpu size={18} />, label: "AI" },
            { id: "term", icon: <TerminalSquare size={18} />, label: "Terminal" },
            { id: "settings", icon: <Settings size={18} />, label: "Settings" },
          ].map((it) => (
            <button
              key={it.id}
              onClick={() => setActive(it.id)}
              title={it.label}
              className={`relative p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                active === it.id
                  ? "bg-gradient-to-br from-[#0ea5e9]/80 to-[#7c3aed]/70 text-white shadow-[0_8px_30px_#0ea5e9]/10 scale-105"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {it.icon}
              {it.id === "ai" && <span className="absolute -right-1 -top-1 bg-emerald-400 text-black text-[9px] px-1 rounded">AI</span>}
            </button>
          ))}
        </div>

        <div className="mt-auto mb-3 text-gray-400">
          <FileCode2 size={16} />
        </div>
      </aside>

      {/* main column */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* top bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-[#07111a]/60 to-transparent border-b border-[#0f1b22] backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300 font-semibold px-2 py-1 rounded bg-[#07131a]/40">projexpert-main</div>
            <div className="text-xs text-gray-400">— Visual Studio Clone</div>
            <div className="ml-4 text-xs text-gray-400 px-2 py-1 rounded bg-[#08131a]/30">app › dashboard › page.tsx</div>
          </div>

          <div className="flex items-center gap-3">
            {!copilotOpen && (
              <button
                onClick={() => {
                  setCopilotOpen(true);
                  // visually remove the button via state: we open copilot
                }}
                className="relative group px-3 py-1.5 rounded-md overflow-hidden text-sm font-semibold text-white shadow-lg"
                title="Open Copilot"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-sky-500 opacity-75 group-hover:opacity-100 blur-sm transition-all"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={14} /> Copilot
                </span>
              </button>
            )}

            <div className="text-gray-400 text-xs">Ln {codeLines.length}, Col 1</div>
          </div>
        </div>

        {/* tabs */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#051018] border-b border-[#0e1a22]">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-t-md bg-[#06121a] text-white font-semibold shadow-inner">dashboard/page.tsx</div>
            <div className="px-3 py-1 text-gray-400 hover:text-white cursor-pointer">login/page.tsx</div>
            <div className="px-3 py-1 text-gray-400 hover:text-white cursor-pointer">workspace/page.tsx</div>
          </div>

          <div className="ml-auto flex items-center gap-2 text-gray-400 text-xs">
            <div className="px-2 py-1 bg-white/3 rounded">TypeScript</div>
            <div className="px-2 py-1 bg-white/3 rounded">UTF-8</div>
          </div>
        </div>

        {/* content: left explorer, center editor */}
        <div className="flex flex-1 overflow-hidden">
          {/* explorer */}
          <div className="w-64 bg-[#07131a] border-r border-[#0f1b22] p-3 overflow-auto">
            <div className="text-xs text-gray-300 uppercase font-semibold mb-3">Explorer</div>
            <div className="text-sm text-gray-300 font-semibold">PROJEXPERT-MAIN</div>

            <div className="mt-3 text-gray-400 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <Circle size={12} className="text-green-400" />
                <div>.next</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FolderOpen size={14} className="text-blue-300" />
                <div className="font-medium">app</div>
              </div>
              <div className="ml-4 mt-2 space-y-1 text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="text-sm">ai-manager</div>
                  <div className="text-xs text-gray-500">page.tsx</div>
                </div>
                <div>dashboard</div>
                <div>file-review</div>
                <div className="font-semibold">login</div>
                <div>workspace</div>
              </div>

              <div className="mt-4 text-sm font-medium">components</div>
              <div className="ml-4 text-gray-400">ui</div>
            </div>
          </div>

          {/* editor */}
          <main className="flex-1 flex flex-col bg-[#051018]">
            {/* editor toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#0f1b22]">
              <div className="flex items-center gap-2">
                <button onClick={() => toast("Run")} className="px-3 py-1 rounded-md bg-gradient-to-r from-[#0ea5e9] to-[#7c3aed] text-white text-xs flex items-center gap-2 shadow-md">
                  <Play size={14} /> Run
                </button>
                <button onClick={() => toast("Format")} className="px-3 py-1 rounded-md bg-white/5 text-xs flex items-center gap-2 hover:bg-white/7">
                  <Slash size={14} /> Format
                </button>
                <button onClick={() => toast("Split")} className="px-3 py-1 rounded-md bg-white/5 text-xs flex items-center gap-2 hover:bg-white/7">
                  <Columns size={14} /> Split
                </button>
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-xs">
                <div className="px-2 py-1 bg-[#07131a]/40 rounded">Git: <span className="font-semibold">main</span></div>
                <div className="px-2 py-1 bg-[#07131a]/40 rounded">Problems: 0</div>
              </div>
            </div>

            {/* editor area with gutter */}
            <div className="flex-1 flex overflow-hidden relative">
              {/* gutter (line numbers) */}
              <div
                ref={gutterRef}
                className="w-16 bg-[#041018] text-right pr-4 pt-4 pb-6 overflow-auto border-r border-[#0c1720] select-none text-gray-500 text-[12px]"
                aria-hidden
              >
                {codeLines.map((_, i) => (
                  <div key={i} className="leading-6 h-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* code area */}
              <div ref={codeRef} className="flex-1 p-6 overflow-auto" style={{ tabSize: 2 }}>
                <pre className="text-[13px] leading-6">
                  {codeLines.map((line, idx) => {
                    const trimmed = line.trim();
                    const indent = line.length - trimmed.length;
                    const indentation = line.slice(0, indent);
                    const content = line.slice(indent);

                    return (
                      <div key={idx} className="whitespace-pre leading-6 h-6">
                        <span className="text-gray-400">{indentation.replace(/\t/g, "  ")}</span>
                        {content.split(/(".*?"|'.*?'|\b)/).map((tok, i) => {
                          if (!tok) return null;
                          if (/^".*"$/.test(tok) || /^'.*'$/.test(tok))
                            return <span key={i} className="text-emerald-300">{tok}</span>;
                          if (/\b(import|from|export|function|const|return|default|class|new|let|var)\b/.test(tok))
                            return <span key={i} className="text-sky-400 font-medium">{tok}</span>;
                          if (/\b(useState|Button|Card|Badge|Progress|CardHeader|CardContent)\b/.test(tok))
                            return <span key={i} className="text-violet-400">{tok}</span>;
                          if (/\b(true|false|null|undefined)\b/.test(tok))
                            return <span key={i} className="text-yellow-300">{tok}</span>;
                          if (/\/\/.+/.test(tok)) return <span key={i} className="text-gray-500 italic">{tok}</span>;
                          return <span key={i} className="text-gray-300">{tok}</span>;
                        })}
                      </div>
                    );
                  })}
                </pre>
              </div>

              {/* subtle right depth */}
              <div className="w-2 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
            </div>

            {/* mini bottom area inside editor */}
            <div className="h-16 border-t border-[#0f1b22] px-4 flex items-center justify-between bg-gradient-to-t from-[#051018]/30">
              <div className="flex items-center gap-4 text-xs text-gray-300">
                <div className="flex items-center gap-2"><ArrowUpCircle size={14} /> Ready</div>
                <div className="px-2 py-1 bg-[#07131a]/50 rounded">TypeScript</div>
                <div className="px-2 py-1 bg-[#07131a]/50 rounded">No Changes</div>
              </div>

              <div className="flex items-center gap-3 relative">
                {/* attachment visual: a connector "tab" linking bottom button to editor */}
                <div className="absolute -top-9 -left-10 w-24 h-8 bg-gradient-to-r from-[#0ea5e9]/25 to-[#7c3aed]/25 rounded-b-full filter blur-sm opacity-60 transform rotate-2" />
                <button
                  onClick={() => {
                    setConnected((s) => !s);
                    toast(connected ? "Disconnected" : "Connected");
                  }}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-2 transition-all shadow ${connected ? "bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-white shadow-lg" : "bg-white/5 text-gray-200 hover:bg-white/6"}`}
                >
                  <Cloud size={14} /> {connected ? "Connected" : "Offline"}
                </button>

                <button
                  onClick={() => {
                    setAiMode((s) => !s);
                    toast(aiMode ? "AI Mode Off" : "AI Mode On");
                  }}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-2 transition-all ${aiMode ? "bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white shadow-md" : "bg-white/5 text-gray-200 hover:bg-white/6"}`}
                >
                  <Zap size={14} /> AI Mode
                </button>

                <button
                  onClick={() => {
                    setSyncing(true);
                    toast("Syncing...");
                    setTimeout(() => {
                      setSyncing(false);
                      toast("Sync Complete");
                    }, 1200);
                  }}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-2 transition-all ${syncing ? "bg-gradient-to-r from-[#60a5fa] to-[#7c3aed] text-white shadow-md animate-pulse" : "bg-white/5 text-gray-200 hover:bg-white/6"}`}
                >
                  <Download size={14} /> {syncing ? "Syncing..." : "Sync"}
                </button>

                <button
                  onClick={() => {
                    setNotificationsOn((s) => !s);
                    toast(notificationsOn ? "Notifications Off" : "Notifications On");
                  }}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-2 transition-all ${notificationsOn ? "bg-white/6 text-white" : "bg-white/5 text-gray-200 hover:bg-white/6"}`}
                >
                  <Bell size={14} /> {notificationsOn ? "Notifications" : "Muted"}
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* bottom global status bar (bluish) */}
        <div className="h-10 bg-gradient-to-r from-[#0ea5e9]/18 via-[#3b82f6]/16 to-[#8b5cf6]/12 border-t border-[#0c1720] px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6 text-xs text-white/90">
            <div className="flex items-center gap-2"><Zap size={14} /> Copilot: <span className="font-semibold">{copilotOpen ? "Active" : "Closed"}</span></div>
            <div>Branch: <span className="font-semibold">main</span></div>
            <div>Problems: <span className="text-green-300 font-semibold">0</span></div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded bg-white/10 text-white text-xs" onClick={() => toast("Feedback sent")}>Feedback</button>
            <button className="px-3 py-1 rounded bg-white/10 text-white text-xs" onClick={() => toast("Settings opened")}>Settings</button>
          </div>
        </div>
      </div>

      {/* Copilot panel (right) */}
      <div
        ref={copilotRef}
        className={`fixed top-0 right-0 z-50 h-full transform transition-all duration-300 ${copilotOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ width: copilotWidth }}
      >
        {/* dimming overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* panel frame */}
        <div
          className="absolute right-0 top-0 h-[calc(100vh-0px)] bg-[#071218] border-l border-[#12202a] shadow-2xl flex flex-col"
          style={{ top: copilotTop }}
        >
          {/* header (draggable vertical) */}
          <div
            onMouseDown={handleDragStart}
            className="flex items-center justify-between px-3 py-2 bg-gradient-to-b from-[#071827] to-[#07121a] border-b border-[#0f1b22] cursor-grab"
            title="Drag to reposition vertically"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft size={16} className="opacity-60 rotate-180" />
              <div className="font-semibold text-white">Copilot Chat</div>
              <div className="text-xs text-gray-400">Ask about your code</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCopilotOpen(false);
                }}
                className="p-1 rounded hover:bg-white/5"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* content */}
          <div className="flex-1 overflow-auto p-4 space-y-4 text-sm">
            <div className="bg-[#071a24] p-3 rounded-lg border border-[#0f2930]">
              <div className="text-xs font-medium text-gray-300">Copilot</div>
              <div className="mt-2 text-gray-300">I can explain functions, suggest fixes and generate code snippets. Try these:</div>
              <div className="mt-3 grid gap-2">
                <button className="text-xs px-3 py-2 rounded bg-white/6 text-white text-left" onClick={() => toast("Explain function")}>Explain DashboardPage()</button>
                <button className="text-xs px-3 py-2 rounded bg-white/6 text-white text-left" onClick={() => toast("Suggest refactor")}>Suggest refactor for Card</button>
                <button className="text-xs px-3 py-2 rounded bg-white/6 text-white text-left" onClick={() => toast("Create tests")}>Create unit tests</button>
              </div>
            </div>

            <div className="bg-[#071a24] p-3 rounded-lg border border-[#0f2930]">
              <div className="text-xs text-gray-300 font-medium">Recent</div>
              <div className="mt-2">
                <div className="text-gray-300 text-sm">User: How to improve loading performance?</div>
                <div className="mt-1 text-emerald-300 text-sm">Copilot: Use code-splitting and lazy loading for heavy modules.</div>
              </div>
            </div>
          </div>

          {/* resizer handle (thin vertical) */}
          <div onMouseDown={handleResizerDown} className="absolute left-0 top-0 h-full w-2 cursor-col-resize z-40" title="Drag to resize">
            <div className="h-full" />
          </div>

          {/* input */}
          <div className="px-3 py-3 border-t border-[#0f1b22] bg-gradient-to-t from-[#071218]/30">
            <div className="flex items-center gap-2">
              <input className="flex-1 px-3 py-2 bg-[#071620] rounded text-sm outline-none border border-[#0f1720]" placeholder="Ask Copilot (mock)" />
              <button className="px-3 py-2 rounded bg-gradient-to-r from-blue-600 to-sky-400 text-white" onClick={() => toast("Sent to Copilot")}>Send</button>
            </div>
          </div>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        @keyframes toast {
          0% { transform: translateY(6px); opacity: 0; }
          40% { transform: translateY(-6px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-toast {
          animation: toast 0.5s ease;
        }
      `}</style>
    </div>
  );
}
