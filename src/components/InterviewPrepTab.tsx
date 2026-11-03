import React, { useState } from 'react';
import { InterviewQuestion } from '../types/career';
import { INTERVIEW_QUESTIONS_DATABASE } from '../data/careerData';
import { isSpeechRecognitionSupported, createSpeechRecognizer } from '../utils/speech';
import {
  HelpCircle,
  Sparkles,
  Mic,
  MicOff,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Award,
  Send,
  RefreshCw,
  MessageSquare
} from 'lucide-react';

interface InterviewPrepTabProps {
  targetRole?: string;
}

export const InterviewPrepTab: React.FC<InterviewPrepTabProps> = ({
  targetRole = 'Software Engineer Intern'
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion>(INTERVIEW_QUESTIONS_DATABASE[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    strengths: string[];
    areasForImprovement: string[];
    modelAnswerFeedback: string;
  } | null>(null);

  const filteredQuestions = filterType === 'All'
    ? INTERVIEW_QUESTIONS_DATABASE
    : INTERVIEW_QUESTIONS_DATABASE.filter(q => q.type === filterType);

  const handleVoiceInput = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognizer = createSpeechRecognizer(
        (text, isFinal) => {
          if (isFinal) {
            setUserAnswer(prev => (prev ? prev + ' ' + text : text));
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

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/career/interview-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: selectedQuestion.question,
          userScoreAnswer: userAnswer,
          roleContext: targetRole
        })
      });
      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluation(data.evaluation);
      }
    } catch (err) {
      console.error('Error evaluating interview answer:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <MessageSquare className="w-4 h-4" />
              Technical &amp; HR Mock Practice
            </span>
            <h2 className="text-xl font-bold text-slate-800">Interview Simulation &amp; Evaluation</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice real questions asked at top tech companies. Type or speak your response for instant AI scoring.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {['All', 'Technical', 'HR / Behavioral'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filterType === type
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Question Bank on Left, Interactive Simulation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Selector List (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Question Bank ({filteredQuestions.length})
          </span>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredQuestions.map(q => {
              const isSelected = selectedQuestion.id === q.id;

              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setEvaluation(null);
                    setShowModelAnswer(false);
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                      {q.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {q.difficulty}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                    {q.question}
                  </p>

                  <div className="mt-2 text-[11px] text-slate-500">
                    Category: <span className="font-medium text-slate-700">{q.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practice Sandbox (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Question Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                {selectedQuestion.type} • {selectedQuestion.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Difficulty: {selectedQuestion.difficulty}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug">
              "{selectedQuestion.question}"
            </h3>

            {/* Answer Input Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Your Answer:</label>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  {isRecording ? 'Listening...' : 'Voice Dictate'}
                </button>
              </div>

              <textarea
                rows={5}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Type your response here, or tap Voice Dictate to speak your thoughts..."
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>

                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim() || isEvaluating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Evaluating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Get AI Feedback
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* AI Feedback Report if evaluated */}
          {evaluation && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">AI Evaluation Scorecard</h4>
                    <span className="text-xs text-slate-400">Evaluated against hiring standards</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-indigo-400">{evaluation.score}</span>
                  <span className="text-xs text-slate-400 block font-medium">/ 100 Points</span>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Key Strengths
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {evaluation.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Areas For Improvement
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {evaluation.areasForImprovement.map((area, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recruiter Tip */}
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
                <span className="font-semibold text-indigo-300 block mb-0.5">Recruiter Coaching Tip:</span>
                <p className="leading-relaxed">{evaluation.modelAnswerFeedback}</p>
              </div>
            </div>
          )}

          {/* Model Answer Toggle Drawer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-800">
                  {showModelAnswer ? 'Hide Sample Model Answer' : 'View Sample Model Answer & Key Points'}
                </span>
              </div>
              {showModelAnswer ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {showModelAnswer && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Recommended Benchmark Answer:</span>
                  <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-sans">
                    {selectedQuestion.modelAnswer}
                  </p>
                </div>

                {selectedQuestion.starFrameworkTip && (
                  <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-900 text-[11px]">
                    <span className="font-bold block mb-0.5">STAR Framework Tip:</span>
                    {selectedQuestion.starFrameworkTip}
                  </div>
                )}

                <div>
                  <span className="font-bold text-slate-700 block mb-1">What Interviewers Listen For:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                    {selectedQuestion.evalCriteria.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
