import React, { useState } from 'react';
import { RoadmapPhase } from '../types/career';
import { DEFAULT_ROADMAP_PHASES } from '../data/careerData';
import { calculateRoadmapProgress } from '../utils/careerLogic';
import {
  MapPin,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  FolderGit2
} from 'lucide-react';

interface RoadmapTabProps {
  targetRole?: string;
}

export const RoadmapTab: React.FC<RoadmapTabProps> = ({
  targetRole = 'Full-Stack Software Engineer'
}) => {
  const [phases, setPhases] = useState<RoadmapPhase[]>(DEFAULT_ROADMAP_PHASES);

  const progress = calculateRoadmapProgress(phases);

  const toggleMilestone = (phaseNumber: number, milestoneId: string) => {
    setPhases(prev =>
      prev.map(phase => {
        if (phase.phaseNumber !== phaseNumber) return phase;
        return {
          ...phase,
          milestones: phase.milestones.map(m => {
            if (m.id !== milestoneId) return m;
            return { ...m, completed: !m.completed };
          })
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <MapPin className="w-4 h-4" />
              Strategic Learning Timeline
            </span>
            <h2 className="text-xl font-bold text-slate-800">Visual Step-by-Step Career Roadmap</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured milestone progression designed for college students aiming for <span className="font-semibold text-slate-700">{targetRole}</span>.
            </p>
          </div>

          {/* Progress metric */}
          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Milestones Completed</span>
              <span className="text-base font-extrabold text-indigo-700">
                {progress.completed} of {progress.total} ({progress.percentage}%)
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-600/20 flex items-center justify-center font-bold text-xs text-indigo-700 relative">
              {progress.percentage}%
            </div>
          </div>
        </div>

        {/* Overall ProgressBar */}
        <div className="mt-4 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Timeline Phases */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 md:before:left-8">
        {phases.map(phase => {
          const phaseCompletedCount = phase.milestones.filter(m => m.completed).length;
          const isPhaseFullyDone = phaseCompletedCount === phase.milestones.length;

          return (
            <div key={phase.phaseNumber} className="relative flex items-start gap-4 md:gap-6 pl-1">
              {/* Phase Step Icon */}
              <div
                className={`w-9 h-9 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-md transition-all z-10 ${
                  isPhaseFullyDone
                    ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                    : 'bg-indigo-600 text-white shadow-indigo-500/30'
                }`}
              >
                {phase.phaseNumber}
              </div>

              {/* Phase Card */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {phase.timeframe}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {phase.phaseTitle}
                    </h3>
                  </div>

                  <span className="text-xs font-semibold text-slate-500">
                    {phaseCompletedCount} / {phase.milestones.length} Done
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  Focus: {phase.focus}
                </p>

                {/* Milestones list */}
                <div className="space-y-2.5">
                  {phase.milestones.map(milestone => (
                    <div
                      key={milestone.id}
                      onClick={() => toggleMilestone(phase.phaseNumber, milestone.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        milestone.completed
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-700'
                          : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-600"
                        aria-label={milestone.completed ? 'Mark incomplete' : 'Mark completed'}
                      >
                        {milestone.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-xs font-bold ${milestone.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {milestone.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5 font-medium shrink-0">
                            <Clock className="w-3 h-3" />
                            {milestone.duration}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                          {milestone.description}
                        </p>

                        {/* Skills acquired pills */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {milestone.skillsAcquired.map(skill => (
                            <span
                              key={skill}
                              className="text-[10px] font-medium px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
