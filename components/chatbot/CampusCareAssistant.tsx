"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Trash2,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  CornerDownLeft
} from "lucide-react";
import {
  chatbotConfig,
  matchChatbotIntent,
  ChatMessage
} from "@/lib/chatbot";

interface CampusCareAssistantProps {
  isPageMode?: boolean;
}

export function CampusCareAssistant({ isPageMode = false }: CampusCareAssistantProps) {
  const [isOpen, setIsOpen] = useState(isPageMode);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      sender: "bot",
      text: "Hello! I am CampusCare Assistant, your offline smart campus helper. Ask me about submitting complaints, tracking tickets, Wi-Fi issues, or campus safety.",
      timestamp: "Just now",
      suggestedQuestions: [
        "How do I submit a complaint?",
        "How do I track my complaint?",
        "Wi-Fi is not working in library",
        "Who do I contact in an emergency?"
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Offline rule-based analysis with realistic typing delay
    setTimeout(() => {
      const match = matchChatbotIntent(text);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: match.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedQuestions: match.suggestedQuestions,
        isEmergencyAlert: match.isEmergency
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, chatbotConfig.typingDelay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "cleared-welcome",
        sender: "bot",
        text: "Chat cleared. What can I help you with across campus today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedQuestions: [
          "How do I submit a complaint?",
          "How do I track my complaint?",
          "Classroom projector issue"
        ]
      }
    ]);
  };

  // If used directly inside /assistant page
  if (isPageMode) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[78vh] flex flex-col rounded-2xl bg-[#0F172A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">CampusCare Assistant</h3>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  Offline Rule Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">Instant answers without external network dependencies</p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  m.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-white/10 text-cyan-400 border border-white/15"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20"
                        : m.isEmergencyAlert
                        ? "bg-rose-500/20 border border-rose-500/40 text-rose-200 rounded-tl-none shadow-lg shadow-rose-500/10"
                        : "bg-white/[0.06] backdrop-blur-md border border-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {m.isEmergencyAlert && (
                      <div className="flex items-center gap-2 mb-2 font-bold text-rose-400 text-xs">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>EMERGENCY DISPATCH PROTOCOL</span>
                      </div>
                    )}
                    <p>{m.text}</p>
                  </div>

                  <span className="text-[10px] text-slate-500 block px-1">
                    {m.timestamp}
                  </span>

                  {/* Suggested questions */}
                  {m.suggestedQuestions && m.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-200 transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 text-cyan-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 rounded-tl-none flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about campus issues, Wi-Fi, electricity, or complaints..."
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Floating widget mode
  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-2xl shadow-indigo-600/40 border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open CampusCare Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#080D1A]" />
          </div>
          <span className="text-xs font-bold tracking-wide">Campus Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] flex flex-col rounded-2xl bg-[#0F172A]/95 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200">
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-xs">CampusCare Assistant</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-slate-400">Offline Campus Helper</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${
                    m.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-white/10 text-cyan-400 border border-white/15"
                    }`}
                  >
                    {m.sender === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>

                  <div className="space-y-1.5">
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : m.isEmergencyAlert
                          ? "bg-rose-500/20 border border-rose-500/40 text-rose-200 rounded-tl-none font-medium"
                          : "bg-white/[0.06] backdrop-blur-md border border-white/10 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      {m.isEmergencyAlert && (
                        <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>EMERGENCY ALERT</span>
                        </div>
                      )}
                      <p>{m.text}</p>
                    </div>

                    <span className="text-[9px] text-slate-500 block px-1">
                      {m.timestamp}
                    </span>

                    {/* Chips */}
                    {m.suggestedQuestions && m.suggestedQuestions.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {m.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 text-slate-300 hover:text-indigo-200 transition-all text-left"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 text-cyan-400 flex items-center justify-center">
                  <Bot className="w-3 h-3" />
                </div>
                <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask CampusCare Assistant..."
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
