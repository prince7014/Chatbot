import React, { useState } from 'react';
import { StudentProfile, CareerRecommendation } from '../types/career';
import { POPULAR_CAREER_TRACKS } from '../data/careerData';
import {
  Compass,
  ArrowRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Layers,
  FileText,
  MessageSquare,
  MapPin,
  Mic,
  Briefcase,
  Search,
  BookOpen,
  Building2,
  Target,
  Clock,
  Award
} from 'lucide-react';

interface FrontPageProps {
  studentProfile: StudentProfile;
  onNavigateTab: (tabId: string) => void;
  onSelectRoleForGap: (roleName: string) => void;
  onOpenVoiceAssistant: () => void;
  onOpenProfile: () => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({
  studentProfile,
  onNavigateTab,
  onSelectRoleForGap,
  onOpenVoiceAssistant,
  onOpenProfile
}) => {
  const [quickSearch, setQuickSearch] = useState('');
  const topTracks = POPULAR_CAREER_TRACKS.slice(0, 3);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    onNavigateTab('chat');
  };

  return (
    <div className="space-y-12 pb-12">
      {/* 1. HERO SECTION: 2-Column Split with High-Impact Cinematic Visual */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
          {/* Left Column: Authoritative Editorial Copy & Immediate Actions (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between z-10">
            <div>
              {/* Editorial Kicker (Zero-Pill discipline: unboxed text with separator) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-4">
                <span>College Career Launchpad</span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="text-slate-300">Undergraduate Counseling</span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="text-slate-400">Class of 2026–2028</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance mb-4">
                Navigate Your College Degree Into a High-Impact Career.
              </h1>

              {/* Contextual Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                Tailored for <span className="text-white font-medium">{studentProfile.name}</span> pursuing a{' '}
                <span className="text-indigo-300 font-medium">{studentProfile.degree} in {studentProfile.major}</span>.
                Diagnose your exact industry skill gaps, build an ATS-compliant resume, and practice live technical interviews.
              </p>

              {/* Quick Prompt Search / Action Input */}
              <form onSubmit={handleQuickSearchSubmit} className="max-w-lg mb-6">
                <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-2xl p-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
                  <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={e => setQuickSearch(e.target.value)}
                    placeholder="Ask PathFinder: 'What skills am I missing for Full-Stack SWE?'..."
                    className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
                  >
                    Ask AI
                  </button>
                </div>
              </form>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateTab('careers')}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Career Matches</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenVoiceAssistant}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-slate-700 active:scale-95"
                >
                  <Mic className="w-4 h-4 text-rose-400" />
                  <span>Talk with Voice Assistant</span>
                </button>

                <button
                  onClick={onOpenProfile}
                  className="px-4 py-3 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
                >
                  Edit Student Profile
                </button>
              </div>
            </div>

            {/* Unboxed Metadata Metrics */}
            <div className="pt-8 mt-8 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="text-slate-300 font-semibold">6 Curated Tracks</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>85+ Industry Skills Analyzed</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Live ATS Compliance</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-emerald-400 font-medium">100% Free Student Resources</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Cinematic Image & Floating Student Card (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_career_launchpad_1793696544430.jpg"
              alt="University innovation commons collaborative workspace"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            {/* Subtle Gradient Scrim ensuring legibility */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />

            {/* Floating Student Readiness Snapshot Card */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {studentProfile.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{studentProfile.name}</h4>
                    <span className="text-[10px] text-slate-400">{studentProfile.currentYear} • {studentProfile.major}</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">92% Match</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-400 block">Top Target</span>
                  <span className="font-bold text-slate-200 truncate block">Full-Stack SWE</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-400 block">ATS Score</span>
                  <span className="font-bold text-indigo-300 block">96 / 100</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-400 block">Season</span>
                  <span className="font-bold text-amber-400 block">Internship Peak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR-COLUMN STUDENT READINESS STRIP */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigateTab('careers')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Top Match</span>
            <Compass className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-xl font-bold text-slate-900">Full-Stack Engineer</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-emerald-600">92% Match</span>
            <span>·</span>
            <span>$110k–$155k avg</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigateTab('skills')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Skill Diagnostics</span>
            <Layers className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-xl font-bold text-slate-900">7 Foundational</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-rose-600">3 Priority Gaps</span>
            <span>·</span>
            <span>Docker, Cloud, REST</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigateTab('resume')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">ATS Resume Compliance</span>
            <FileText className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-xl font-bold text-slate-900">96 / 100 Points</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-emerald-600">Grade A+</span>
            <span>·</span>
            <span>Printable 1-Page PDF</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => onNavigateTab('internships')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Internship Wave</span>
            <Briefcase className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-xl font-bold text-slate-900">Active Hiring</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-indigo-600">4 Top Portals</span>
            <span>·</span>
            <span>Handshake &amp; LinkedIn</span>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS BENTO GRID: Core Capabilities */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
            Integrated Student Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-900">The 4 Pillars of College Career Readiness</h2>
          <p className="text-xs text-slate-500 max-w-xl mt-0.5">
            Everything undergraduate students need to transition from campus course credits to landing competitive offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Bento Card 1: Career Matching (col-span-6) */}
          <div
            onClick={() => onNavigateTab('careers')}
            className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">01. Trajectory Alignment</span>
                <span className="text-xs text-slate-400 group-hover:text-indigo-600 font-medium flex items-center gap-1">
                  View Recommendations
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Personalized Career Matching &amp; Market Demand
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Analyzes student education, coursework, and technical proficiencies to recommend high-trajectory career tracks with transparent starting compensation and verified employer hiring data.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span>Full-Stack Software Engineer</span>
                  <span className="text-emerald-700 font-bold">92% Match</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>AI &amp; Machine Learning Engineer</span>
                  <span className="text-indigo-700 font-bold">88% Match</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Associate Product Manager (APM)</span>
                  <span className="text-indigo-700 font-bold">85% Match</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Hiring at Google, Microsoft, Stripe, OpenAI, Meta</span>
            </div>
          </div>

          {/* Bento Card 2: Skill Gap Diagnostics (col-span-6) */}
          <div
            onClick={() => onNavigateTab('skills')}
            className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">02. Skill Gap Diagnostics</span>
                <span className="text-xs text-slate-400 group-hover:text-indigo-600 font-medium flex items-center gap-1">
                  Diagnose Gaps
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Pinpoint What Industry Requires vs What You Know
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Identify the critical tools and technologies missing from university syllabi. Receive estimated hours to master each skill along with practical learning strategies.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">Your Verified Strengths</span>
                  <span className="font-semibold text-slate-800 block text-[11px]">TypeScript, React, Python</span>
                  <span className="text-[10px] text-emerald-700 mt-1 block">Foundational base established</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                  <span className="text-[10px] font-bold text-rose-800 uppercase block mb-1">Critical Skill Gaps</span>
                  <span className="font-semibold text-slate-800 block text-[11px]">Docker, Cloud, REST APIs</span>
                  <span className="text-[10px] text-rose-700 mt-1 block">~55 hours estimated study</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Includes step-by-step 3-stage learning roadmap</span>
            </div>
          </div>

          {/* Bento Card 3: ATS Resume Optimizer (col-span-6) */}
          <div
            onClick={() => onNavigateTab('resume')}
            className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">03. Resume &amp; ATS Compliance</span>
                <span className="text-xs text-slate-400 group-hover:text-indigo-600 font-medium flex items-center gap-1">
                  Open Resume Builder
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Live ATS Resume Builder &amp; Bullet Enhancer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Score your resume against applicant tracking systems. Rewrite bullet points using Google's X-Y-Z formula to showcase action verbs and quantified achievements.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">ATS Score: 96 / 100</span>
                  <span className="text-[11px] text-slate-500">Matches 9 key domain competencies</span>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-xs">
                  Grade A+
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Standard 1-page format</span>
              <span className="font-semibold text-indigo-600">Export Printable PDF</span>
            </div>
          </div>

          {/* Bento Card 4: Mock Interview & Voice (col-span-6) */}
          <div
            onClick={() => onNavigateTab('interview')}
            className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">04. Technical &amp; HR Interview</span>
                <span className="text-xs text-slate-400 group-hover:text-indigo-600 font-medium flex items-center gap-1">
                  Practice Questions
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                AI Mock Interview Simulator &amp; Scoring
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Practice algorithm questions and STAR-method behavioral scenarios. Speak or type your answers to receive instant evaluation scorecards and recruiter feedback.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 text-white text-xs space-y-1">
                <span className="text-indigo-400 font-semibold block text-[10px] uppercase">Sample Technical Prompt</span>
                <p className="text-slate-300 italic text-[11px] line-clamp-1">
                  "How do you handle state management in a large-scale React app vs Redux/Zustand?"
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-rose-500" />
                Speech-to-text dictation supported
              </span>
              <span className="font-semibold text-indigo-600">Start Practice Session</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CAREER PATHWAYS SPOTLIGHT */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-0.5">
              Top Matches for {studentProfile.major}
            </span>
            <h2 className="text-xl font-bold text-slate-900">Recommended Career Pathways</h2>
          </div>
          <button
            onClick={() => onNavigateTab('careers')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
          >
            View All 6 Pathways
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topTracks.map(track => (
            <div
              key={track.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[140px]">
                    {track.domain}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {track.matchScore}% Match
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1.5">{track.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {track.summary}
                </p>

                <div className="space-y-1 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Avg Compensation:</span>
                    <span className="font-bold text-slate-800">{track.avgSalary}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Industry Growth:</span>
                    <span className="font-semibold text-indigo-600">{track.growthRate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectRoleForGap(track.title)}
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Skill Gap
                </button>
                <button
                  onClick={() => onNavigateTab('roadmap')}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                >
                  Roadmap
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE RECRUITMENT LAUNCHPAD BANNER */}
      <section className="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Active College Recruitment Cycle
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              Ready to Apply for Summer 2026/2027 Internships?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore our 4-season recruitment timeline, verified student hiring platforms (Handshake, Wellfound, Simplify), copyable cold email scripts, and recruiter-ready project ideas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('internships')}
              className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Open Internship Launchpad
            </button>
            <button
              onClick={() => onNavigateTab('chat')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all border border-slate-700"
            >
              Ask Counselor a Question
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
