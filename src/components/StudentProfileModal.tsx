import React, { useState } from 'react';
import { StudentProfile } from '../types/career';
import { X, Sparkles, BookOpen, User, CheckCircle2, Plus } from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

const PRESET_TRACKS = [
  {
    name: 'CS & Full-Stack Web',
    degree: 'B.S. in Computer Science',
    major: 'Computer Science',
    year: '3rd Year (Junior)',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Git', 'Tailwind CSS'],
    interests: ['Full-Stack Web Dev', 'Cloud Computing', 'Developer Tools'],
    goals: 'Land a Summer 2026 Software Engineer Internship at an innovative tech company.'
  },
  {
    name: 'Data Science & AI',
    degree: 'B.S. in Data Science & Analytics',
    major: 'Data Science',
    year: '3rd Year (Junior)',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'Git'],
    interests: ['Machine Learning', 'Generative AI', 'Predictive Modeling', 'Big Data'],
    goals: 'Become an Applied AI / ML Engineer building intelligent models and data pipelines.'
  },
  {
    name: 'Cybersecurity & SecOps',
    degree: 'B.S. in Cybersecurity & Forensics',
    major: 'Cybersecurity',
    year: '2nd Year (Sophomore)',
    skills: ['Linux', 'Networking (TCP/IP)', 'Wireshark', 'Python', 'Bash Scripting', 'Burp Suite'],
    interests: ['Ethical Hacking', 'Penetration Testing', 'Cloud Security', 'Defense Systems'],
    goals: 'Pass Security+ certification and obtain a SOC Analyst or InfoSec Internship.'
  },
  {
    name: 'Product Management & Business Tech',
    degree: 'B.S. in Information Systems & Business',
    major: 'Management Information Systems',
    year: 'Final Year (Senior)',
    skills: ['Product Roadmapping', 'User Research', 'SQL Analytics', 'Wireframing', 'Agile/Scrum', 'Figma'],
    interests: ['Tech Entrepreneurship', 'User Experience', 'SaaS Strategy', 'Growth Metrics'],
    goals: 'Join an Associate Product Manager (APM) cohort or tech consulting program.'
  }
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(profile.name);
  const [degree, setDegree] = useState(profile.degree);
  const [major, setMajor] = useState(profile.major);
  const [currentYear, setCurrentYear] = useState(profile.currentYear);
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([...profile.technicalSkills]);
  const [softSkills, setSoftSkills] = useState<string[]>([...profile.softSkills]);
  const [interests, setInterests] = useState<string[]>([...profile.interests]);
  const [goals, setGoals] = useState(profile.goals);
  const [workPreference, setWorkPreference] = useState(profile.workPreference);

  const [newTechSkill, setNewTechSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const addTechSkill = () => {
    if (newTechSkill.trim() && !technicalSkills.includes(newTechSkill.trim())) {
      setTechnicalSkills([...technicalSkills, newTechSkill.trim()]);
      setNewTechSkill('');
    }
  };

  const removeTechSkill = (skill: string) => {
    setTechnicalSkills(technicalSkills.filter(s => s !== skill));
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (item: string) => {
    setInterests(interests.filter(i => i !== item));
  };

  const applyPreset = (preset: typeof PRESET_TRACKS[0]) => {
    setDegree(preset.degree);
    setMajor(preset.major);
    setCurrentYear(preset.year);
    setTechnicalSkills([...preset.skills]);
    setInterests([...preset.interests]);
    setGoals(preset.goals);
  };

  const handleSave = () => {
    onSave({
      name,
      degree,
      major,
      currentYear,
      technicalSkills,
      softSkills,
      interests,
      goals,
      workPreference,
      targetRoles: profile.targetRoles
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Your Student Profile</h2>
              <p className="text-xs text-slate-500">Personalize AI career recommendations and gap diagnostics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quick Student Presets
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRESET_TRACKS.map(p => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="px-3 py-2 text-left rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all text-xs font-medium text-slate-700 bg-white"
                >
                  <div className="font-semibold text-indigo-700 truncate">{p.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{p.major}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Current Academic Year</label>
              <select
                value={currentYear}
                onChange={e => setCurrentYear(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                <option value="Final Year (Senior)">Final Year (Senior)</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Degree Program</label>
              <input
                type="text"
                value={degree}
                placeholder="e.g. Bachelor of Science"
                onChange={e => setDegree(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Major / Discipline</label>
              <input
                type="text"
                value={major}
                placeholder="e.g. Computer Science"
                onChange={e => setMajor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Technical Skills & Tools</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {technicalSkills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeTechSkill(skill)}
                    className="ml-1.5 hover:text-red-500"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Docker, SQL, React, AWS)..."
                value={newTechSkill}
                onChange={e => setNewTechSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechSkill();
                  }
                }}
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={addTechSkill}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Career Interests & Passions</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {interests.map(item => (
                <span
                  key={item}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeInterest(item)}
                    className="ml-1.5 hover:text-red-500"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add interest (e.g. Artificial Intelligence, Web Security, FinTech)..."
                value={newInterest}
                onChange={e => setNewInterest(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInterest();
                  }
                }}
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* Goals & Work Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Current Primary Goal</label>
              <textarea
                rows={2}
                value={goals}
                onChange={e => setGoals(e.target.value)}
                placeholder="e.g. Secure a summer 2026 SWE internship, learn full stack web development..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Work Preference</label>
              <select
                value={workPreference}
                onChange={e => setWorkPreference(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Any">Flexible / Any</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Updates live career matches & roadmap</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 font-medium transition-colors text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors text-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
