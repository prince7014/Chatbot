import React, { useState } from 'react';
import { DEFAULT_INTERNSHIP_STRATEGY } from '../data/careerData';
import {
  Briefcase,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Rocket,
  CheckCircle2,
  Mail,
  FolderGit2,
  FileCheck
} from 'lucide-react';

export const InternshipTab: React.FC = () => {
  const strategy = DEFAULT_INTERNSHIP_STRATEGY;
  const [copiedTemplateIdx, setCopiedTemplateIdx] = useState<number | null>(null);
  const [checkedTimelineItems, setCheckedTimelineItems] = useState<Record<string, boolean>>({});
  const [checkedPrepItems, setCheckedPrepItems] = useState<Record<number, boolean>>({});

  const handleCopyTemplate = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateIdx(idx);
    setTimeout(() => setCopiedTemplateIdx(null), 2500);
  };

  const toggleTimelineCheck = (key: string) => {
    setCheckedTimelineItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrepCheck = (idx: number) => {
    setCheckedPrepItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/20">
              <Briefcase className="w-3.5 h-3.5" />
              Recruitment Launchpad
            </div>
            <h2 className="text-2xl font-bold tracking-tight">College Internship &amp; Job Guidance</h2>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl leading-relaxed">
              Step-by-step application timelines, direct platforms, high-impact cold messaging templates, and project ideas engineered for college students.
            </p>
          </div>
        </div>
      </div>

      {/* Top Application Platforms Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <Rocket className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Top Verified Internship Portals</h3>
            <p className="text-xs text-slate-500">Where top employers hire college interns actively</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {strategy.platforms.map(platform => (
            <div
              key={platform.name}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider mb-2 inline-block">
                  {platform.badge}
                </span>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{platform.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{platform.description}</p>
              </div>

              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                Open Platform
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Season Recruitment Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">The 4-Season Internship Application Timeline</h3>
            <p className="text-xs text-slate-500">Track your milestones through the university recruitment cycle</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {strategy.timeline.map((phase, phaseIdx) => (
            <div key={phase.month} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  Quarter {phaseIdx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{phase.month}</h4>
                <p className="text-xs text-slate-600 font-medium mb-3 italic">{phase.focus}</p>

                <div className="space-y-2">
                  {phase.checklist.map((item, itemIdx) => {
                    const itemKey = `${phaseIdx}-${itemIdx}`;
                    const isDone = Boolean(checkedTimelineItems[itemKey]);

                    return (
                      <label
                        key={itemIdx}
                        className="flex items-start gap-2 cursor-pointer text-xs text-slate-700 select-none hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleTimelineCheck(itemKey)}
                          className="mt-0.5 w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 shrink-0"
                        />
                        <span className={isDone ? 'line-through text-slate-400' : 'leading-snug'}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Converting Cold Email & Outreach Templates */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Cold Outreach &amp; Networking Templates</h3>
            <p className="text-xs text-slate-500">Tested message scripts for engineering managers and university recruiters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {strategy.coldEmailTemplates.map((template, idx) => (
            <div key={template.title} className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-slate-800">{template.title}</h4>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    To: {template.targetRecipient}
                  </span>
                </div>

                <div className="mb-2 p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-mono">
                  <span className="font-bold text-slate-500">Subject: </span>{template.subject}
                </div>

                <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans bg-white p-3 rounded-lg border border-slate-200 leading-relaxed max-h-56 overflow-y-auto">
                  {template.body}
                </pre>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleCopyTemplate(`Subject: ${template.subject}\n\n${template.body}`, idx)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {copiedTemplateIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Template
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standout Capstone Project Ideas for Students */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Standout Project Ideas That Win Offers</h3>
            <p className="text-xs text-slate-500">Recruiters are tired of Todo apps and Weather widgets. Build these instead.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategy.standoutProjectIdeas.map(proj => (
            <div key={proj.title} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-sm transition-all space-y-2.5">
              <h4 className="text-sm font-bold text-slate-800">{proj.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{proj.pitch}</p>
              
              <div className="flex flex-wrap gap-1">
                {proj.tech.map(t => (
                  <span key={t} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="p-2 rounded bg-amber-50 border border-amber-100 text-[11px] text-amber-900">
                <span className="font-semibold block text-[10px] uppercase text-amber-700">Recruiter Deliverable:</span>
                {proj.expectedDeliverable}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Interview Readiness Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-purple-100 text-purple-700 rounded-lg">
            <FileCheck className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Pre-Interview Preparation Checklist</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {strategy.interviewPrepChecklist.map((tip, idx) => {
            const isChecked = Boolean(checkedPrepItems[idx]);
            return (
              <label
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => togglePrepCheck(idx)}
                  className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 shrink-0"
                />
                <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                  {tip}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
