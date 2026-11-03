/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentProfile, CourseRecommendation } from './types/career';
import { INITIAL_STUDENT_PROFILE } from './data/careerData';
import { Navbar } from './components/Navbar';
import { CareerRecommenderTab } from './components/CareerRecommenderTab';
import { SkillGapTab } from './components/SkillGapTab';
import { CoursesTab } from './components/CoursesTab';
import { InternshipTab } from './components/InternshipTab';
import { ResumeBuilderTab } from './components/ResumeBuilderTab';
import { InterviewPrepTab } from './components/InterviewPrepTab';
import { RoadmapTab } from './components/RoadmapTab';
import { ChatCounselor } from './components/ChatCounselor';
import { StudentProfileModal } from './components/StudentProfileModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { Bot, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export default function App() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [selectedRoleForGap, setSelectedRoleForGap] = useState<string>('Full-Stack Software Engineer');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectRoleForGap = (roleName: string) => {
    setSelectedRoleForGap(roleName);
    setActiveTab('skills');
  };

  const handleAddCourseToRoadmap = (course: CourseRecommendation) => {
    showToast(`"${course.title}" added to your Career Roadmap!`);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenVoiceAssistant={() => setIsVoiceModalOpen(true)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'careers' && (
          <CareerRecommenderTab
            studentProfile={studentProfile}
            onSelectRoleForGap={handleSelectRoleForGap}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'skills' && (
          <SkillGapTab
            studentProfile={studentProfile}
            selectedRole={selectedRoleForGap}
            onSelectRole={setSelectedRoleForGap}
            onUpdateSkills={newSkills => setStudentProfile({ ...studentProfile, technicalSkills: newSkills })}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesTab onAddCourseToRoadmap={handleAddCourseToRoadmap} />
        )}

        {activeTab === 'internships' && (
          <InternshipTab />
        )}

        {activeTab === 'resume' && (
          <ResumeBuilderTab targetRole={selectedRoleForGap} />
        )}

        {activeTab === 'interview' && (
          <InterviewPrepTab targetRole={selectedRoleForGap} />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapTab targetRole={selectedRoleForGap} />
        )}

        {activeTab === 'chat' && (
          <ChatCounselor
            studentProfile={studentProfile}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Floating Fast-Chat Action Button if not currently on chat tab */}
      {activeTab !== 'chat' && (
        <aside aria-label="Quick AI Counselor Assistance" className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setActiveTab('chat')}
            aria-label="Open AI Career Counselor Chat"
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 group text-xs border border-indigo-500/40"
          >
            <div className="relative">
              <Bot className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span>Ask PathFinder AI</span>
          </button>
        </aside>
      )}

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-800 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={studentProfile}
        onSave={updated => {
          setStudentProfile(updated);
          showToast('Student profile updated! Career matches re-computed.');
        }}
      />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        studentProfile={studentProfile}
        onActionTrigger={(action, payload) => {
          if (action === 'NAVIGATE_TAB' && payload) {
            setActiveTab(payload);
          }
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PathFinder AI • College Career Guidance &amp; Launchpad Platform</span>
          <span className="text-[11px] text-slate-400">
            Powered by Google Gemini 3.8 Flash • Tailored for Undergraduate Students
          </span>
        </div>
      </footer>
    </div>
  );
}
