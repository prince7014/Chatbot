import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, ChatMessage } from '../types/career';
import {
  Send,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  ArrowRight,
  Compass,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare,
  Layers,
  MapPin,
  Copy,
  Check
} from 'lucide-react';
import { renderFormattedContent } from '../utils/markdown';
import {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  createSpeechRecognizer,
  speakText,
  stopSpeaking
} from '../utils/speech';

interface ChatCounselorProps {
  studentProfile: StudentProfile;
  onNavigateTab: (tabId: string) => void;
}

const INITIAL_GREETING = (profile: StudentProfile): string => `Hello ${profile.name.split(' ')[0]}! I'm **PathFinder AI**, your personal college career counselor.

I've loaded your student profile:
• **Degree & Major:** ${profile.degree} in ${profile.major} (${profile.currentYear})
• **Your Current Skills:** ${profile.technicalSkills.join(', ')}
• **Your Primary Goal:** "${profile.goals}"

How can I help you take the next step today? You can ask me to:
1. **Recommend suitable careers** matched to your interests and education
2. **Analyze skill gaps** and outline what to learn next
3. **Recommend top courses & certifications**
4. **Guide you on landing internships** & crafting cold emails
5. **Review your resume** & prep for technical or HR interviews`;

const STARTER_CARDS = [
  {
    icon: Compass,
    title: 'Recommend Suitable Careers',
    prompt: 'Based on my degree in Computer Science, skills in React and Python, and interest in tech, what career options suit me best?',
    badge: 'Careers'
  },
  {
    icon: Layers,
    title: 'Diagnose My Skill Gaps',
    prompt: 'What are the critical skills I need to improve to become a competitive Full-Stack Software Engineer?',
    badge: 'Skill Gap'
  },
  {
    icon: Briefcase,
    title: 'Internship Search Strategy',
    prompt: 'How and when should a 3rd-year college student apply for summer software engineering internships?',
    badge: 'Internships'
  },
  {
    icon: MessageSquare,
    title: 'Practice Mock Interview',
    prompt: 'Give me 1 technical interview question and 1 behavioral question to test my readiness.',
    badge: 'Interview'
  }
];

export const ChatCounselor: React.FC<ChatCounselorProps> = ({
  studentProfile,
  onNavigateTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'm-initial',
      role: 'assistant',
      content: INITIAL_GREETING(studentProfile),
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Suggest Best Career Options', action: 'NAVIGATE_TAB', payload: 'careers' },
        { label: 'Analyze My Skill Gaps', action: 'NAVIGATE_TAB', payload: 'skills' },
        { label: 'Prepare for Tech Interviews', action: 'NAVIGATE_TAB', payload: 'interview' },
        { label: 'Review Resume ATS Score', action: 'NAVIGATE_TAB', payload: 'resume' },
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (msg: ChatMessage) => {
    navigator.clipboard.writeText(msg.content);
    setCopiedMsgId(msg.id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    stopSpeaking();
    setSpeakingMessageId(null);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          studentProfile
        })
      });

      const data = await res.json();
      const reply = data.reply || "I've analyzed your question and tailored your guidance recommendations.";

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions || [
          { label: 'Explore Skill Gaps', action: 'NAVIGATE_TAB', payload: 'skills' },
          { label: 'View Roadmap', action: 'NAVIGATE_TAB', payload: 'roadmap' }
        ]
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: `Based on your profile as a ${studentProfile.currentYear} student in ${studentProfile.major}, focus on building a strong core project portfolio, quantifying metrics on your resume, and mastering data structures & system fundamentals.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'View Career Recommendations', action: 'NAVIGATE_TAB', payload: 'careers' }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognizer = createSpeechRecognizer(
        (text, isFinal) => {
          setInputValue(text);
          if (isFinal) {
            handleSendMessage(text);
          }
        },
        (err) => {
          console.warn('Speech error:', err);
          setIsRecording(false);
        },
        () => {
          setIsRecording(false);
        }
      );
      recognizer.start();
      setIsRecording(true);
    } catch (err) {
      setIsRecording(false);
    }
  };

  const handleSpeakMessage = (msg: ChatMessage) => {
    if (speakingMessageId === msg.id) {
      stopSpeaking();
      setSpeakingMessageId(null);
    } else {
      speakText(
        msg.content,
        () => setSpeakingMessageId(msg.id),
        () => setSpeakingMessageId(null)
      );
    }
  };

  const handleActionClick = (action: string, payload?: any) => {
    if (action === 'NAVIGATE_TAB' && payload) {
      onNavigateTab(payload);
    }
  };

  const handleResetChat = () => {
    stopSpeaking();
    setSpeakingMessageId(null);
    setMessages([
      {
        id: `m-reset-${Date.now()}`,
        role: 'assistant',
        content: INITIAL_GREETING(studentProfile),
        timestamp: 'Just now',
        suggestedActions: [
          { label: 'Suggest Best Career Options', action: 'NAVIGATE_TAB', payload: 'careers' },
          { label: 'Analyze My Skill Gaps', action: 'NAVIGATE_TAB', payload: 'skills' },
          { label: 'Prepare for Tech Interviews', action: 'NAVIGATE_TAB', payload: 'interview' },
          { label: 'Review Resume ATS Score', action: 'NAVIGATE_TAB', payload: 'resume' },
        ]
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
      {/* Simple Clean Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900">PathFinder Career Guidance Chatbot</h1>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Personalized for <span className="font-medium text-slate-700">{studentProfile.name}</span> • {studentProfile.major}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            aria-label="New chat"
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto space-y-5">
        {messages.map(msg => {
          const isUser = msg.role === 'user';
          const isSpeakingThis = speakingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-indigo-600 text-white shadow-sm'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none shadow-2xs'
                }`}
              >
                {/* Content */}
                {isUser ? (
                  <div className="whitespace-pre-line text-xs font-normal leading-relaxed text-white">
                    {msg.content}
                  </div>
                ) : (
                  <div className="text-xs font-normal leading-relaxed text-slate-800">
                    {renderFormattedContent(msg.content)}
                  </div>
                )}

                {/* Footer metadata, Copy & Voice Listen */}
                <div className={`mt-3 pt-2 flex items-center justify-between gap-2 border-t text-[10px] ${
                  isUser ? 'border-indigo-500/50 text-indigo-200' : 'border-slate-200 text-slate-400'
                }`}>
                  <span>{msg.timestamp}</span>

                  {!isUser && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(msg)}
                        className="p-1 hover:text-indigo-600 rounded transition-colors flex items-center gap-1"
                        aria-label="Copy response"
                        title="Copy answer"
                      >
                        {copiedMsgId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSpeakMessage(msg)}
                        className="p-1 hover:text-indigo-600 rounded transition-colors flex items-center gap-1"
                        aria-label={isSpeakingThis ? 'Stop audio' : 'Listen with voice'}
                        title="Read aloud"
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-indigo-600 font-semibold text-[10px]">Speaking...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Interactive Action Chips linking directly to deep tools */}
                {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleActionClick(action.action, action.payload)}
                        className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-semibold text-[11px] border border-indigo-200 transition-colors flex items-center gap-1.5 shadow-2xs active:scale-95"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        <span>{action.label}</span>
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Quick starter cards shown under greeting when only 1 message exists */}
        {messages.length === 1 && (
          <div className="pt-2 pb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              Popular Career Guidance Questions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STARTER_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(card.prompt)}
                    className="p-3 text-left rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 transition-all shadow-2xs group flex items-start gap-2.5"
                  >
                    <div className="p-2 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 text-indigo-600 shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                          {card.title}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                          {card.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                        {card.prompt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>Analyzing your academic profile and generating personalized guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 relative"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            aria-label={isRecording ? 'Stop recording' : 'Dictate with voice'}
            title="Speak your question"
            className={`p-2.5 rounded-xl transition-all ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Ask anything (e.g. Which career should I pick? How do I prepare for interviews?)..."
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder:text-slate-400"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
