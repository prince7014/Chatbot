import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMatchScore,
  analyzeSkillGaps,
  calculateATSScore,
  calculateRoadmapProgress,
  filterCourses,
  normalizeSkill
} from './careerLogic';
import { ResumeData, CourseRecommendation, RoadmapPhase } from '../types/career';

test('normalizeSkill strips punctuation and normalizes casing', () => {
  assert.equal(normalizeSkill('  Node.js  '), 'nodejs');
  assert.equal(normalizeSkill('C++'), 'c++');
  assert.equal(normalizeSkill('React.js'), 'reactjs');
  assert.equal(normalizeSkill('Python 3.12'), 'python312');
});

test('calculateMatchScore correctly computes skill overlap percentage', () => {
  const student = ['JavaScript', 'React', 'HTML', 'CSS'];
  const required = ['React', 'TypeScript', 'JavaScript', 'Node.js'];
  const score = calculateMatchScore(student, required);
  assert.ok(score >= 50 && score <= 60, `Score was ${score}, expected ~50-60%`);

  // Perfect match
  assert.equal(calculateMatchScore(['Python', 'SQL'], ['Python', 'SQL']), 100);

  // Empty requirements
  assert.equal(calculateMatchScore(['Python'], []), 0);
  assert.equal(calculateMatchScore([], ['Python']), 0);
});

test('analyzeSkillGaps distinguishes matched vs missing industry skills', () => {
  const studentSkills = ['Python', 'Pandas', 'Git'];
  const industrySkills = [
    { name: 'Python', category: 'Technical' as const, priority: 'Critical' as const, estimatedHours: 40, learningTip: 'Review async' },
    { name: 'Pandas', category: 'Tool' as const, priority: 'Medium' as const, estimatedHours: 20, learningTip: 'Data frames' },
    { name: 'Machine Learning', category: 'Technical' as const, priority: 'Critical' as const, estimatedHours: 60, learningTip: 'Scikit-learn' },
    { name: 'Docker', category: 'Tool' as const, priority: 'Low' as const, estimatedHours: 15, learningTip: 'Containers' }
  ];

  const analysis = analyzeSkillGaps('Data Scientist', studentSkills, industrySkills);
  assert.equal(analysis.role, 'Data Scientist');
  assert.equal(analysis.matchedSkills.length, 2);
  assert.equal(analysis.missingSkills.length, 2);
  assert.equal(analysis.missingSkills[0].name, 'Machine Learning');
  assert.equal(analysis.overallMatchScore, 50);
  assert.ok(analysis.actionPlan.length > 0);
});

test('calculateATSScore scores resume completeness and keywords', () => {
  const sampleResume: ResumeData = {
    personalInfo: {
      fullName: 'Alex Chen',
      email: 'alex@example.com',
      phone: '+1 555-0199',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexchen',
      github: 'github.com/alexchen',
      portfolio: 'alexchen.dev',
      summary: 'Passionate computer science junior focused on full-stack web development and distributed systems.'
    },
    education: [{
      id: 'e1',
      institution: 'University of California',
      degree: 'B.S.',
      major: 'Computer Science',
      graduationYear: '2026',
      gpa: '3.8'
    }],
    experience: [{
      id: 'exp1',
      company: 'Tech Startup',
      role: 'Software Engineering Intern',
      startDate: 'June 2025',
      endDate: 'August 2025',
      location: 'Remote',
      bullets: [
        'Developed RESTful API endpoints using Node.js and TypeScript, reducing latency by 35%.',
        'Implemented Redis caching layer that served 10,000+ daily active student users.'
      ]
    }],
    projects: [{
      id: 'p1',
      name: 'Campus Collab',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      description: 'Peer tutoring platform',
      bullets: [
        'Architected real-time chat service using WebSockets handling 500 concurrent connections.',
        'Engineered responsive UI with React and Tailwind CSS resulting in 40% higher engagement.'
      ]
    }],
    skills: {
      technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      soft: ['Team Leadership', 'Agile Communication'],
      tools: ['Git', 'Docker', 'AWS']
    },
    certifications: [{
      id: 'c1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      year: '2025'
    }]
  };

  const targetKeywords = ['TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'];
  const result = calculateATSScore(sampleResume, targetKeywords);

  assert.ok(result.score >= 80, `Expected score >= 80, got ${result.score}`);
  assert.ok(result.checks.length >= 4);
  assert.ok(result.foundKeywords.includes('React'));
  assert.ok(result.suggestedKeywords.includes('Kubernetes'));
});

test('calculateRoadmapProgress calculates phase completion', () => {
  const phases: RoadmapPhase[] = [
    {
      phaseNumber: 1,
      phaseTitle: 'Phase 1',
      timeframe: 'Month 1-2',
      focus: 'Fundamentals',
      milestones: [
        { id: 'm1', title: 'Task 1', description: 'Desc', duration: '1w', completed: true, skillsAcquired: [] },
        { id: 'm2', title: 'Task 2', description: 'Desc', duration: '1w', completed: false, skillsAcquired: [] }
      ]
    },
    {
      phaseNumber: 2,
      phaseTitle: 'Phase 2',
      timeframe: 'Month 3-4',
      focus: 'Advanced',
      milestones: [
        { id: 'm3', title: 'Task 3', description: 'Desc', duration: '2w', completed: true, skillsAcquired: [] }
      ]
    }
  ];

  const progress = calculateRoadmapProgress(phases);
  assert.equal(progress.total, 3);
  assert.equal(progress.completed, 2);
  assert.equal(progress.percentage, 67);
});

test('filterCourses filters by search, level, freeOnly, and category', () => {
  const courses: CourseRecommendation[] = [
    {
      id: 'c1',
      title: 'Full Stack Open',
      platform: 'University of Helsinki',
      instructor: 'Matti Luukkainen',
      duration: '80 hours',
      level: 'Intermediate',
      isFree: true,
      rating: 4.9,
      skillsCovered: ['React', 'Node.js', 'TypeScript'],
      certificationName: 'Certificate of Completion',
      category: 'Software Engineering'
    },
    {
      id: 'c2',
      title: 'Deep Learning Specialization',
      platform: 'Coursera',
      instructor: 'Andrew Ng',
      duration: '3 months',
      level: 'Advanced',
      isFree: false,
      rating: 4.9,
      skillsCovered: ['Deep Learning', 'PyTorch', 'Neural Networks'],
      certificationName: 'DeepLearning.AI Certificate',
      category: 'Data Science & AI'
    }
  ];

  const freeOnly = filterCourses(courses, '', 'All', true, 'All');
  assert.equal(freeOnly.length, 1);
  assert.equal(freeOnly[0].id, 'c1');

  const searchPyTorch = filterCourses(courses, 'PyTorch', 'All', false, 'All');
  assert.equal(searchPyTorch.length, 1);
  assert.equal(searchPyTorch[0].id, 'c2');
});
