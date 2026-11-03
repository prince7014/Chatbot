import React, { useState } from 'react';
import { ResumeData, ATSCheckResult } from '../types/career';
import { INITIAL_RESUME_DATA } from '../data/careerData';
import { calculateATSScore } from '../utils/careerLogic';
import {
  FileText,
  Sparkles,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Award
} from 'lucide-react';

interface ResumeBuilderTabProps {
  targetRole?: string;
}

export const ResumeBuilderTab: React.FC<ResumeBuilderTabProps> = ({
  targetRole = 'Full-Stack Software Engineer'
}) => {
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const targetKeywords = [
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Python',
    'REST API',
    'Docker',
    'Git',
    'CI/CD',
    'Cloud',
    'AWS'
  ];

  const atsResult: ATSCheckResult = calculateATSScore(resume, targetKeywords);

  // AI optimizer calling server endpoint
  const handleAiOptimize = async (type: 'summary' | 'bullet', content: string, onDone: (res: string) => void, id: string) => {
    setIsEnhancing(id);
    try {
      const res = await fetch('/api/career/resume-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content, targetRole })
      });
      const data = await res.json();
      if (data.success && data.optimized) {
        onDone(data.optimized);
      }
    } catch (err) {
      console.error('Failed to optimize bullet:', err);
    } finally {
      setIsEnhancing(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper updates
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResume({
      ...resume,
      personalInfo: { ...resume.personalInfo, [field]: value }
    });
  };

  const updateExperienceBullet = (expId: string, bulletIdx: number, val: string) => {
    setResume({
      ...resume,
      experience: resume.experience.map(e => {
        if (e.id !== expId) return e;
        const copy = [...e.bullets];
        copy[bulletIdx] = val;
        return { ...e, bullets: copy };
      })
    });
  };

  const addExperienceBullet = (expId: string) => {
    setResume({
      ...resume,
      experience: resume.experience.map(e => {
        if (e.id !== expId) return e;
        return { ...e, bullets: [...e.bullets, 'Engineered new feature that increased user retention by 20%.'] };
      })
    });
  };

  const updateProjectBullet = (projId: string, bulletIdx: number, val: string) => {
    setResume({
      ...resume,
      projects: resume.projects.map(p => {
        if (p.id !== projId) return p;
        const copy = [...p.bullets];
        copy[bulletIdx] = val;
        return { ...p, bullets: copy };
      })
    });
  };

  return (
    <div className="space-y-6">
      {/* ATS Header & Metric Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <FileText className="w-4 h-4" />
              Automated Applicant Tracking System (ATS)
            </span>
            <h2 className="text-xl font-bold text-slate-800">College Resume Builder &amp; ATS Scorer</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live resume optimization for <span className="font-semibold text-slate-700">{targetRole}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* ATS Score Display */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">ATS Score</span>
                <span className={`text-xl font-black ${
                  atsResult.score >= 85 ? 'text-emerald-600' : atsResult.score >= 70 ? 'text-indigo-600' : 'text-amber-600'
                }`}>
                  {atsResult.score} / 100 ({atsResult.grade})
                </span>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* ATS Checklist chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {atsResult.checks.map(check => (
            <div
              key={check.label}
              className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                check.passed
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50/70 border-amber-200 text-amber-800'
              }`}
            >
              {check.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <div className="truncate">
                <span className="font-semibold block text-[11px]">{check.label}</span>
                <span className="text-[10px] opacity-80 truncate block">{check.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout: Form Editor on Left, Live Clean Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Editor (7 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Personal Info Accordion */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              1. Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-medium text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.personalInfo.fullName}
                  onChange={e => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">Email</label>
                <input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={e => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">Phone</label>
                <input
                  type="text"
                  value={resume.personalInfo.phone}
                  onChange={e => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">Location</label>
                <input
                  type="text"
                  value={resume.personalInfo.location}
                  onChange={e => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={resume.personalInfo.linkedin}
                  onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">GitHub / Portfolio</label>
                <input
                  type="text"
                  value={resume.personalInfo.github}
                  onChange={e => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium text-slate-600 text-xs">Professional Summary</label>
                <button
                  type="button"
                  disabled={isEnhancing === 'summary'}
                  onClick={() =>
                    handleAiOptimize(
                      'summary',
                      resume.personalInfo.summary,
                      newSummary => updatePersonalInfo('summary', newSummary),
                      'summary'
                    )
                  }
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3" />
                  {isEnhancing === 'summary' ? 'Improving...' : 'Improve with AI'}
                </button>
              </div>
              <textarea
                rows={3}
                value={resume.personalInfo.summary}
                onChange={e => updatePersonalInfo('summary', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Experience Section with AI bullet enhancement */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              2. Experience / Internships
            </h3>
            {resume.experience.map(exp => (
              <div key={exp.id} className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-slate-500 block">Company</span>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={e => {
                        const val = e.target.value;
                        setResume({
                          ...resume,
                          experience: resume.experience.map(item => item.id === exp.id ? { ...item, company: val } : item)
                        });
                      }}
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <span className="font-medium text-slate-500 block">Role</span>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={e => {
                        const val = e.target.value;
                        setResume({
                          ...resume,
                          experience: resume.experience.map(item => item.id === exp.id ? { ...item, role: val } : item)
                        });
                      }}
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">Bullet Points (Action Verb + Metric):</span>
                  {exp.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="space-y-1">
                      <div className="flex gap-2 items-start">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={e => updateExperienceBullet(exp.id, bIdx, e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs leading-relaxed"
                        />
                        <button
                          type="button"
                          disabled={isEnhancing === `${exp.id}-${bIdx}`}
                          onClick={() =>
                            handleAiOptimize(
                              'bullet',
                              b,
                              optimized => updateExperienceBullet(exp.id, bIdx, optimized),
                              `${exp.id}-${bIdx}`
                            )
                          }
                          title="Rewrites with Google X-Y-Z formula: Accomplished [X] measured by [Y] by doing [Z]"
                          className="px-2.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 shrink-0 border border-indigo-200 transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          {isEnhancing === `${exp.id}-${bIdx}` ? 'Rewriting...' : 'AI Enhance'}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addExperienceBullet(exp.id)}
                    className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1 pt-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Bullet Point
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              3. Featured Projects
            </h3>
            {resume.projects.map(proj => (
              <div key={proj.id} className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-slate-500 block">Project Name</span>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={e => {
                        const val = e.target.value;
                        setResume({
                          ...resume,
                          projects: resume.projects.map(p => p.id === proj.id ? { ...p, name: val } : p)
                        });
                      }}
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <span className="font-medium text-slate-500 block">Tech Stack</span>
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={e => {
                        const val = e.target.value.split(',').map(s => s.trim());
                        setResume({
                          ...resume,
                          projects: resume.projects.map(p => p.id === proj.id ? { ...p, technologies: val } : p)
                        });
                      }}
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">Project Bullets:</span>
                  {proj.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-start">
                      <textarea
                        rows={2}
                        value={b}
                        onChange={e => updateProjectBullet(proj.id, bIdx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs leading-relaxed"
                      />
                      <button
                        type="button"
                        disabled={isEnhancing === `${proj.id}-${bIdx}`}
                        onClick={() =>
                          handleAiOptimize(
                            'bullet',
                            b,
                            optimized => updateProjectBullet(proj.id, bIdx, optimized),
                            `${proj.id}-${bIdx}`
                          )
                        }
                        className="px-2.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 shrink-0 border border-indigo-200 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        AI Enhance
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Printable Resume Preview (6 cols) */}
        <div className="lg:col-span-6">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Live Clean ATS-Standard Preview
              </span>
              <span className="text-xs text-indigo-600 font-medium">Standard 1-Page Format</span>
            </div>

            {/* Printable Paper Canvas */}
            <div
              id="printable-resume"
              className="bg-white rounded-xl shadow-xl border border-slate-300 p-8 text-slate-900 font-sans text-[11px] leading-relaxed min-h-[700px] overflow-hidden"
            >
              {/* Header */}
              <div className="text-center border-b pb-3 mb-3 border-slate-300">
                <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900">
                  {resume.personalInfo.fullName}
                </h1>
                <div className="text-[10px] text-slate-600 flex flex-wrap justify-center gap-2 mt-1 font-medium">
                  {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
                  {resume.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
                  {resume.personalInfo.email && <span>• {resume.personalInfo.email}</span>}
                  {resume.personalInfo.linkedin && <span>• {resume.personalInfo.linkedin}</span>}
                  {resume.personalInfo.github && <span>• {resume.personalInfo.github}</span>}
                </div>
              </div>

              {/* Summary */}
              {resume.personalInfo.summary && (
                <div className="mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 mb-1">
                    Professional Summary
                  </h2>
                  <p className="text-slate-700 text-[10.5px] leading-normal">{resume.personalInfo.summary}</p>
                </div>
              )}

              {/* Education */}
              <div className="mb-3">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 mb-1">
                  Education
                </h2>
                {resume.education.map(edu => (
                  <div key={edu.id} className="mb-1">
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>{edu.institution}</span>
                      <span>Graduation: {edu.graduationYear}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[10px] italic">
                      <span>{edu.degree} in {edu.major}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div className="mb-3">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 mb-1">
                  Work Experience
                </h2>
                {resume.experience.map(exp => (
                  <div key={exp.id} className="mb-2">
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>{exp.company} — <span className="font-medium italic">{exp.role}</span></span>
                      <span className="text-[10px] font-normal text-slate-600">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[10px]">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="mb-3">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 mb-1">
                  Technical Projects
                </h2>
                {resume.projects.map(proj => (
                  <div key={proj.id} className="mb-2">
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>
                        {proj.name} | <span className="font-normal italic text-slate-600 text-[10px]">{proj.technologies.join(', ')}</span>
                      </span>
                    </div>
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[10px]">
                      {proj.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 mb-1">
                  Technical &amp; Soft Skills
                </h2>
                <div className="text-[10px] text-slate-700 space-y-0.5">
                  <div>
                    <span className="font-bold text-slate-800">Languages &amp; Frameworks: </span>
                    {resume.skills.technical.join(', ')}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Developer Tools: </span>
                    {resume.skills.tools.join(', ')}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Professional Competencies: </span>
                    {resume.skills.soft.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
