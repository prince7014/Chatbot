import React from 'react';
import { StudentProfile } from '../types/career';
import {
  Compass,
  Layers,
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare,
  MapPin,
  Mic,
  Bot,
  User,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  studentProfile: StudentProfile;
  onOpenProfile: () => void;
  onOpenVoiceAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  studentProfile,
  onOpenProfile,
  onOpenVoiceAssistant
}) => {
  const navTabs = [
    { id: 'chat', label: 'AI Counselor Chat', icon: Bot, isHighlight: true },
    { id: 'careers', label: 'Career Recommendations', icon: Compass },
    { id: 'skills', label: 'Skill Gap Analysis', icon: Layers },
    { id: 'courses', label: 'Courses & Certs', icon: BookOpen },
    { id: 'internships', label: 'Internship Launchpad', icon: Briefcase },
    { id: 'resume', label: 'Resume & ATS', icon: FileText },
    { id: 'interview', label: 'Mock Interview', icon: MessageSquare },
    { id: 'roadmap', label: 'Career Roadmap', icon: MapPin }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-indigo-900 text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  PathFinder<span className="text-indigo-600">AI</span>
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 uppercase tracking-wider">
                  College Career Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                AI Career Guidance, Skill Diagnostics &amp; Internship Launchpad
              </p>
            </div>
          </div>

          {/* Right Action Controls: Voice Assistant & Student Profile */}
          <div className="flex items-center gap-2.5">
            {/* Voice Assistant Trigger */}
            <button
              onClick={onOpenVoiceAssistant}
              aria-label="Open Voice Assistant"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-95 group"
            >
              <div className="relative">
                <Mic className="w-3.5 h-3.5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>

            {/* Student Profile Quick Badge */}
            <button
              onClick={onOpenProfile}
              aria-label="Edit student profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                {studentProfile.name.charAt(0)}
              </div>
              <div className="hidden md:block">
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  {studentProfile.name}
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight truncate max-w-[130px]">
                  {studentProfile.major}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                      : tab.isHighlight
                      ? 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
