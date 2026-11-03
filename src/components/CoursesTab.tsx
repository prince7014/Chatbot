import React, { useState } from 'react';
import { CourseRecommendation } from '../types/career';
import { CURATED_COURSES } from '../data/careerData';
import { filterCourses } from '../utils/careerLogic';
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Clock,
  Award,
  ExternalLink,
  Check,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface CoursesTabProps {
  onAddCourseToRoadmap?: (course: CourseRecommendation) => void;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({ onAddCourseToRoadmap }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [addedCourses, setAddedCourses] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Software Engineering', 'Data Science & AI', 'Cloud & DevOps', 'Cybersecurity', 'UI/UX Design'];

  const filtered = filterCourses(CURATED_COURSES, searchQuery, levelFilter, freeOnly, categoryFilter);

  const handleAdd = (course: CourseRecommendation) => {
    setAddedCourses(prev => ({ ...prev, [course.id]: true }));
    if (onAddCourseToRoadmap) {
      onAddCourseToRoadmap(course);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4" />
              Verified Industry Pathways
            </span>
            <h2 className="text-xl font-bold text-slate-800">Course &amp; Certification Recommendations</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Top university and industry accredited credentials proven to help college students stand out.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Showing {filtered.length} courses</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search courses by skill, title, or platform (e.g. React, CS50, Python)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Level selector */}
          <div>
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-700 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Advanced">Advanced Level</option>
            </select>
          </div>

          {/* Free toggle */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={e => setFreeOnly(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>100% Free / Auditable Only</span>
            </label>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(course => {
          const isAdded = addedCourses[course.id];

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Platform & Pricing Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    {course.platform}
                  </span>
                  <div className="flex items-center gap-2">
                    {course.isFree ? (
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 uppercase">
                        Free Course
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        Paid / Financial Aid
                      </span>
                    )}
                    <div className="flex items-center gap-0.5 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-base font-bold text-slate-800 mb-1 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Taught by <span className="font-medium text-slate-700">{course.instructor}</span>
                </p>

                {/* Duration & Level */}
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-3.5 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Skills Covered */}
                <div className="mb-4">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1.5">
                    Skills &amp; Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {course.skillsCovered.map(skill => (
                      <span
                        key={skill}
                        className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certification Credential */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold block text-[11px] text-slate-500 uppercase">Credential Earned:</span>
                    <span className="font-medium">{course.certificationName}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                <button
                  onClick={() => handleAdd(course)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isAdded
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Added to Roadmap
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-3.5 h-3.5" />
                      Add to My Learning Plan
                    </>
                  )}
                </button>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(course.title + ' ' + course.platform)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
