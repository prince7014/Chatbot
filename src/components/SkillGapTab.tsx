import React, { useState } from 'react';
import { StudentProfile, SkillAnalysisResult, SkillGapItem } from '../types/career';
import { POPULAR_CAREER_TRACKS } from '../data/careerData';
import { analyzeSkillGaps } from '../utils/careerLogic';
import {
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  BookOpen,
  Target,
  RefreshCw
} from 'lucide-react';

interface SkillGapTabProps {
  studentProfile: StudentProfile;
  selectedRole: string;
  onSelectRole: (role: string) => void;
  onUpdateSkills: (newSkills: string[]) => void;
  onNavigateTab: (tabId: string) => void;
}

// Industry skill definitions for major career tracks
const ROLE_SKILL_DEFINITIONS: Record<string, { name: string; category: 'Technical' | 'Soft' | 'Tool'; priority: 'Critical' | 'Medium' | 'Low'; estimatedHours: number; learningTip: string }[]> = {
  'Full-Stack Software Engineer': [
    { name: 'TypeScript', category: 'Technical', priority: 'Critical', estimatedHours: 25, learningTip: 'Study generics, union types, and interface typing in React components.' },
    { name: 'React / Next.js', category: 'Technical', priority: 'Critical', estimatedHours: 40, learningTip: 'Build a server-side rendered application using Server Components & Hooks.' },
    { name: 'Node.js / Express', category: 'Technical', priority: 'Critical', estimatedHours: 30, learningTip: 'Construct secure REST APIs with JWT authentication and middleware validation.' },
    { name: 'PostgreSQL / SQL', category: 'Technical', priority: 'Critical', estimatedHours: 20, learningTip: 'Master relational schema design, indexes, and complex JOIN queries.' },
    { name: 'Docker', category: 'Tool', priority: 'Medium', estimatedHours: 15, learningTip: 'Containerize your full-stack app with a Dockerfile and docker-compose.' },
    { name: 'CI/CD Pipelines (GitHub Actions)', category: 'Tool', priority: 'Medium', estimatedHours: 12, learningTip: 'Automate testing and deployment to cloud on each commit.' },
    { name: 'Cloud (AWS / GCP)', category: 'Tool', priority: 'Medium', estimatedHours: 20, learningTip: 'Deploy containerized services using Cloud Run or AWS ECS/S3.' },
    { name: 'System Design Basics', category: 'Technical', priority: 'Low', estimatedHours: 25, learningTip: 'Learn horizontal vs vertical scaling, caching (Redis), and load balancers.' }
  ],
  'AI & Machine Learning Engineer': [
    { name: 'Python', category: 'Technical', priority: 'Critical', estimatedHours: 30, learningTip: 'Review list comprehensions, object-oriented Python, and numpy vectorization.' },
    { name: 'PyTorch / TensorFlow', category: 'Technical', priority: 'Critical', estimatedHours: 50, learningTip: 'Train and fine-tune convolutional and transformer models from scratch.' },
    { name: 'Pandas & Data Wrangling', category: 'Technical', priority: 'Critical', estimatedHours: 20, learningTip: 'Handle missing values, aggregate grouping, and exploratory data analysis.' },
    { name: 'Machine Learning Algorithms', category: 'Technical', priority: 'Critical', estimatedHours: 40, learningTip: 'Understand linear regression, random forests, SVMs, and gradient boosting.' },
    { name: 'LLM Prompt Engineering & APIs', category: 'Technical', priority: 'Medium', estimatedHours: 15, learningTip: 'Build RAG pipelines using LangChain or Google GenAI SDK.' },
    { name: 'MLOps & Model Deployment', category: 'Tool', priority: 'Medium', estimatedHours: 25, learningTip: 'Expose ML models via FastAPI endpoints inside Docker containers.' },
    { name: 'Linear Algebra & Statistics', category: 'Technical', priority: 'Low', estimatedHours: 35, learningTip: 'Review eigenvalues, matrix multiplication, probability distributions, and p-values.' }
  ],
  'Cloud & DevOps Engineer': [
    { name: 'Linux / Bash Scripting', category: 'Technical', priority: 'Critical', estimatedHours: 25, learningTip: 'Master command-line pipes, systemctl services, file permissions, and cron jobs.' },
    { name: 'Docker & Containers', category: 'Tool', priority: 'Critical', estimatedHours: 20, learningTip: 'Write multi-stage Dockerfiles and optimize image layer caching.' },
    { name: 'Kubernetes', category: 'Tool', priority: 'Critical', estimatedHours: 40, learningTip: 'Deploy Pods, Deployments, Services, and Ingress controllers on Minikube.' },
    { name: 'AWS / Cloud Architecture', category: 'Tool', priority: 'Critical', estimatedHours: 35, learningTip: 'Study VPC subnetting, IAM roles, EC2 instances, and S3 buckets.' },
    { name: 'Terraform (IaC)', category: 'Tool', priority: 'Medium', estimatedHours: 25, learningTip: 'Provision reproducible cloud infrastructure with HCL declarations.' },
    { name: 'Prometheus & Grafana Monitoring', category: 'Tool', priority: 'Low', estimatedHours: 15, learningTip: 'Set up metric scraping and create alert dashboards for server latency.' }
  ],
  'Cybersecurity Analyst & SecOps': [
    { name: 'Computer Networking (TCP/IP)', category: 'Technical', priority: 'Critical', estimatedHours: 30, learningTip: 'Deeply understand subnet masks, DNS queries, routing tables, and HTTP/HTTPS handshakes.' },
    { name: 'Linux Security & CLI', category: 'Technical', priority: 'Critical', estimatedHours: 25, learningTip: 'Inspect system logs (/var/log), manage iptables firewalls, and audit user permissions.' },
    { name: 'Wireshark & Packet Analysis', category: 'Tool', priority: 'Critical', estimatedHours: 20, learningTip: 'Capture and inspect pcap files for suspicious TCP resets and unencrypted payloads.' },
    { name: 'Vulnerability Scanning (Burp Suite)', category: 'Tool', priority: 'Medium', estimatedHours: 25, learningTip: 'Learn OWASP Top 10 web vulnerabilities (SQL Injection, XSS, CSRF).' },
    { name: 'SIEM Tools (Splunk / Elastic)', category: 'Tool', priority: 'Medium', estimatedHours: 25, learningTip: 'Write queries to correlate auth failures and detect intrusion patterns.' }
  ],
  'Associate Product Manager (APM)': [
    { name: 'Product Roadmapping', category: 'Technical', priority: 'Critical', estimatedHours: 20, learningTip: 'Learn how to define problem statements, OKRs, and prioritize features using RICE.' },
    { name: 'User Research & Wireframing', category: 'Technical', priority: 'Critical', estimatedHours: 25, learningTip: 'Conduct 5 user interviews and sketch wireframes in Figma.' },
    { name: 'SQL & Product Analytics', category: 'Tool', priority: 'Critical', estimatedHours: 20, learningTip: 'Calculate user retention, churn rates, and funnel conversion metrics with SQL.' },
    { name: 'Agile & Scrum Sprints', category: 'Soft', priority: 'Medium', estimatedHours: 15, learningTip: 'Practice writing user stories, acceptance criteria, and managing sprint backlogs.' },
    { name: 'Stakeholder Communication', category: 'Soft', priority: 'Medium', estimatedHours: 15, learningTip: 'Present technical trade-offs clearly to non-engineering business leads.' }
  ],
  'UI/UX & Product Designer': [
    { name: 'Figma & Design Systems', category: 'Tool', priority: 'Critical', estimatedHours: 30, learningTip: 'Master auto-layout, component variants, and semantic tokens.' },
    { name: 'User Flows & Information Architecture', category: 'Technical', priority: 'Critical', estimatedHours: 20, learningTip: 'Map comprehensive site architectures and user journey steps.' },
    { name: 'Interactive Prototyping', category: 'Tool', priority: 'Critical', estimatedHours: 20, learningTip: 'Build high-fidelity click-through prototypes with smart animate transitions.' },
    { name: 'Accessibility Standards (WCAG)', category: 'Technical', priority: 'Medium', estimatedHours: 15, learningTip: 'Audit color contrast ratios and keyboard navigation semantics.' },
    { name: 'Basic HTML & CSS / Tailwind', category: 'Technical', priority: 'Low', estimatedHours: 20, learningTip: 'Understand flexbox, grid, and responsiveness to design with developer empathy.' }
  ]
};

export const SkillGapTab: React.FC<SkillGapTabProps> = ({
  studentProfile,
  selectedRole,
  onSelectRole,
  onUpdateSkills,
  onNavigateTab
}) => {
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isRefreshingAi, setIsRefreshingAi] = useState(false);
  const [customAnalysis, setCustomAnalysis] = useState<SkillAnalysisResult | null>(null);

  // Available roles list
  const availableRoles = Object.keys(ROLE_SKILL_DEFINITIONS);
  const currentRole = availableRoles.includes(selectedRole) ? selectedRole : availableRoles[0];

  // Perform local deterministic analysis
  const currentIndustrySkills = ROLE_SKILL_DEFINITIONS[currentRole] || ROLE_SKILL_DEFINITIONS['Full-Stack Software Engineer'];
  const localAnalysis = analyzeSkillGaps(currentRole, studentProfile.technicalSkills, currentIndustrySkills);
  const activeAnalysis = customAnalysis && customAnalysis.role === currentRole ? customAnalysis : localAnalysis;

  const handleAddSkillToProfile = () => {
    if (newSkillInput.trim() && !studentProfile.technicalSkills.includes(newSkillInput.trim())) {
      const updated = [...studentProfile.technicalSkills, newSkillInput.trim()];
      onUpdateSkills(updated);
      setNewSkillInput('');
    }
  };

  const handleQuickAddMissingSkill = (skillName: string) => {
    if (!studentProfile.technicalSkills.includes(skillName)) {
      const updated = [...studentProfile.technicalSkills, skillName];
      onUpdateSkills(updated);
    }
  };

  const handleConsultAiGaps = async () => {
    setIsRefreshingAi(true);
    try {
      const res = await fetch('/api/career/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: currentRole,
          studentSkills: studentProfile.technicalSkills
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setCustomAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('Error fetching AI skill gaps:', err);
    } finally {
      setIsRefreshingAi(false);
    }
  };

  const matchScore = activeAnalysis.overallMatchScore;
  const matchColor = matchScore >= 75
    ? 'text-emerald-600 bg-emerald-500'
    : matchScore >= 50
    ? 'text-indigo-600 bg-indigo-500'
    : 'text-amber-600 bg-amber-500';

  return (
    <div className="space-y-6">
      {/* Top Selector Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Target className="w-4 h-4" />
              Target Career Role
            </span>
            <h2 className="text-xl font-bold text-slate-800">Skill Competency &amp; Gap Analysis</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare your current student skillset against industry requirements for high-paying roles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={currentRole}
              onChange={e => onSelectRole(e.target.value)}
              className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {availableRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <button
              onClick={handleConsultAiGaps}
              disabled={isRefreshingAi}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-indigo-200"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingAi ? 'animate-spin' : ''}`} />
              AI Deep Diagnostic
            </button>
          </div>
        </div>

        {/* Overall Progress Meter */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">Role Readiness Match</span>
            <span className="text-base font-extrabold text-slate-900">{matchScore}% Ready</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${matchColor.split(' ')[1]}`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-2">
            <span className="font-semibold text-slate-800">Diagnosis:</span> {activeAnalysis.strengthsSummary}
          </p>
        </div>
      </div>

      {/* Side-by-Side: Owned Skills vs Skills to Acquire */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Existing Matched Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your Current Skills ({activeAnalysis.matchedSkills.length})</h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Verified Foundational
              </span>
            </div>

            {activeAnalysis.matchedSkills.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-6 text-center">
                No overlapping skills matched yet. Add your current skills below!
              </p>
            ) : (
              <div className="space-y-2.5">
                {activeAnalysis.matchedSkills.map(skill => (
                  <div
                    key={skill}
                    className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">{skill}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick add custom skill input */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-600 block mb-2">Have a skill not listed above?</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Docker, TypeScript, SQL..."
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkillToProfile();
                  }
                }}
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkillToProfile}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Skill
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Missing Skills & High Priority Action Items */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Skills to Improve ({activeAnalysis.missingSkills.length})</h3>
              </div>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              {activeAnalysis.missingSkills.map((gap: SkillGapItem) => {
                const priorityBadge = gap.priority === 'Critical'
                  ? 'bg-rose-100 text-rose-700 border-rose-200'
                  : gap.priority === 'Medium'
                  ? 'bg-amber-100 text-amber-700 border-amber-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200';

                return (
                  <div
                    key={gap.name}
                    className="p-3.5 rounded-xl border border-slate-200/90 hover:border-indigo-300 bg-white transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{gap.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${priorityBadge}`}>
                          {gap.priority}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5 font-medium">
                          <Clock className="w-3 h-3" />
                          ~{gap.estimatedHours} hrs
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-normal">
                      💡 {gap.learningTip}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => handleQuickAddMissingSkill(gap.name)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline text-[11px] flex items-center gap-1"
                      >
                        I already know this
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action to Courses */}
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Ready to bridge these gaps?</span>
            <button
              onClick={() => onNavigateTab('courses')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Find Recommended Courses
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Strategic Action Plan */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
            Recommended Action Plan for {currentRole}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activeAnalysis.actionPlan.map((step, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs leading-relaxed">
              <span className="text-indigo-400 font-bold block mb-1">Step {idx + 1}</span>
              <p className="text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
