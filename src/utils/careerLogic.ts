import { ResumeData, ATSCheckResult, SkillAnalysisResult, SkillGapItem, RoadmapPhase, CourseRecommendation } from '../types/career';

/**
 * Normalizes a skill string for comparison (lowercase, trimmed, stripping punctuation)
 */
export function normalizeSkill(skill: string): string {
  return skill.toLowerCase().replace(/[^a-z0-9+#]/g, '').trim();
}

/**
 * Calculates match percentage between student skills and target required skills
 */
export function calculateMatchScore(studentSkills: string[], requiredSkills: string[]): number {
  if (!requiredSkills || requiredSkills.length === 0) return 0;
  if (!studentSkills || studentSkills.length === 0) return 0;

  const normalizedStudent = new Set(studentSkills.map(normalizeSkill));
  let matchCount = 0;

  for (const req of requiredSkills) {
    const norm = normalizeSkill(req);
    // Exact or substring match (e.g., 'react' in 'reactjs' or 'react native')
    if (normalizedStudent.has(norm)) {
      matchCount += 1;
    } else {
      for (const st of normalizedStudent) {
        if (st.includes(norm) || norm.includes(st)) {
          matchCount += 0.8;
          break;
        }
      }
    }
  }

  const score = Math.round((matchCount / requiredSkills.length) * 100);
  return Math.min(100, Math.max(0, score));
}

/**
 * Analyzes skill gaps for a given role based on student skills
 */
export function analyzeSkillGaps(
  roleName: string,
  studentSkills: string[],
  industrySkills: { name: string; category: 'Technical' | 'Soft' | 'Tool'; priority: 'Critical' | 'Medium' | 'Low'; estimatedHours: number; learningTip: string }[]
): SkillAnalysisResult {
  const normStudent = new Set(studentSkills.map(normalizeSkill));
  const matchedSkills: string[] = [];
  const missingSkills: SkillGapItem[] = [];

  for (const item of industrySkills) {
    const norm = normalizeSkill(item.name);
    let matched = normStudent.has(norm);
    if (!matched) {
      for (const st of normStudent) {
        if (st.includes(norm) || norm.includes(st)) {
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      matchedSkills.push(item.name);
    } else {
      missingSkills.push(item);
    }
  }

  const total = industrySkills.length;
  const matchRatio = total > 0 ? (matchedSkills.length / total) : 0;
  const overallMatchScore = Math.round(matchRatio * 100);

  const strengthsSummary = matchedSkills.length > 0
    ? `Strong base in ${matchedSkills.slice(0, 3).join(', ')}${matchedSkills.length > 3 ? ` and ${matchedSkills.length - 3} others` : ''}.`
    : `Starting fresh with foundational knowledge.`;

  const criticalGaps = missingSkills.filter(s => s.priority === 'Critical').map(s => s.name);
  const actionPlan: string[] = [];
  if (criticalGaps.length > 0) {
    actionPlan.push(`Prioritize core prerequisites: ${criticalGaps.slice(0, 3).join(', ')}.`);
  }
  actionPlan.push(`Build 1 comprehensive portfolio project demonstrating hands-on proficiency.`);
  actionPlan.push(`Earn verified credential or open-source contribution to prove competency.`);

  return {
    role: roleName,
    overallMatchScore,
    matchedSkills,
    missingSkills,
    strengthsSummary,
    actionPlan
  };
}

/**
 * Calculates ATS resume compliance score and delivers actionable feedback
 */
export function calculateATSScore(resume: ResumeData, targetRoleKeywords: string[]): ATSCheckResult {
  let score = 0;
  const checks: { label: string; passed: boolean; message: string }[] = [];
  const actionableFeedback: string[] = [];

  // Check 1: Personal Contact completeness
  const p = resume.personalInfo;
  const hasContact = Boolean(p.fullName && p.email && p.phone && (p.linkedin || p.github));
  if (hasContact) {
    score += 15;
    checks.push({ label: 'Contact Info', passed: true, message: 'Full name, email, phone, and professional links are present.' });
  } else {
    score += 5;
    checks.push({ label: 'Contact Info', passed: false, message: 'Missing phone number, professional LinkedIn or GitHub profile link.' });
    actionableFeedback.push('Add your GitHub or LinkedIn link to improve recruiter discovery.');
  }

  // Check 2: Professional Summary / Objective
  if (p.summary && p.summary.trim().length >= 40) {
    score += 15;
    checks.push({ label: 'Executive Summary', passed: true, message: 'Compelling summary highlighting career focus.' });
  } else {
    checks.push({ label: 'Executive Summary', passed: false, message: 'Summary is missing or too brief (under 40 characters).' });
    actionableFeedback.push('Include a 2-3 sentence summary summarizing your degree, top strengths, and career aspirations.');
  }

  // Check 3: Education Section
  if (resume.education && resume.education.length > 0 && resume.education[0].institution) {
    score += 15;
    checks.push({ label: 'Education Credentials', passed: true, message: 'College degree and graduation year clearly listed.' });
  } else {
    checks.push({ label: 'Education Credentials', passed: false, message: 'No college education found.' });
    actionableFeedback.push('Add your ongoing college degree, major, expected graduation year, and GPA (if >= 3.0).');
  }

  // Check 4: Experience / Projects bullet points with action verbs and metrics
  const allBullets = [
    ...resume.experience.flatMap(e => e.bullets),
    ...resume.projects.flatMap(pr => pr.bullets)
  ];

  const actionVerbs = ['developed', 'built', 'created', 'implemented', 'designed', 'optimized', 'engineered', 'led', 'architected', 'spearheaded', 'automated', 'integrated', 'delivered'];
  let actionVerbCount = 0;
  let metricCount = 0;

  for (const b of allBullets) {
    const lower = b.toLowerCase();
    if (actionVerbs.some(v => lower.includes(v))) {
      actionVerbCount++;
    }
    // Numbers, percentages, or metrics (e.g. 40%, 10x, 500+ users, 25ms)
    if (/[0-9]+%|[0-9]+x|\$[0-9]+|[0-9]+\+|reduced|increased|improved/i.test(lower)) {
      metricCount++;
    }
  }

  if (allBullets.length >= 3 && actionVerbCount >= 2) {
    score += 20;
    checks.push({ label: 'Impactful Action Verbs', passed: true, message: `Found ${actionVerbCount} strong action verbs across projects & experience.` });
  } else {
    score += 8;
    checks.push({ label: 'Impactful Action Verbs', passed: false, message: 'Bullet points need stronger action verbs (e.g., Architected, Optimized, Engineered).' });
    actionableFeedback.push('Start every bullet point with a vigorous action verb showing what you specifically engineered.');
  }

  if (metricCount >= 1) {
    score += 15;
    checks.push({ label: 'Quantified Results & Metrics', passed: true, message: 'Highlights measurable achievements and numbers.' });
  } else {
    checks.push({ label: 'Quantified Results & Metrics', passed: false, message: 'Lacks quantitative numbers (e.g. latency reduced by 30%, 500+ active users).' });
    actionableFeedback.push('Quantify at least 2 project bullet points with metrics (e.g., "Achieved 95% test coverage", "Processed 10k requests/sec").');
  }

  // Check 5: Keywords matching target role
  const allText = JSON.stringify(resume).toLowerCase();
  const foundKeywords: string[] = [];
  const suggestedKeywords: string[] = [];

  for (const kw of targetRoleKeywords) {
    const norm = kw.toLowerCase().trim();
    if (allText.includes(norm)) {
      foundKeywords.push(kw);
    } else {
      suggestedKeywords.push(kw);
    }
  }

  const keywordCoverage = targetRoleKeywords.length > 0 ? (foundKeywords.length / targetRoleKeywords.length) : 1;
  const kwPoints = Math.round(keywordCoverage * 20);
  score += kwPoints;

  if (keywordCoverage >= 0.6) {
    checks.push({ label: 'ATS Keyword Match', passed: true, message: `Matched ${foundKeywords.length} key domain competencies.` });
  } else {
    checks.push({ label: 'ATS Keyword Match', passed: false, message: `Low keyword density. Matched only ${foundKeywords.length} of ${targetRoleKeywords.length} standard ATS terms.` });
    actionableFeedback.push(`Infuse missing industry keywords: ${suggestedKeywords.slice(0, 4).join(', ')}.`);
  }

  score = Math.min(100, Math.max(0, score));

  let grade: ATSCheckResult['grade'] = 'Needs Improvement';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 65) grade = 'B';

  return {
    score,
    grade,
    checks,
    foundKeywords,
    suggestedKeywords,
    actionableFeedback
  };
}

/**
 * Calculates milestone completion statistics across roadmap phases
 */
export function calculateRoadmapProgress(phases: RoadmapPhase[]): { total: number; completed: number; percentage: number } {
  let total = 0;
  let completed = 0;

  for (const phase of phases) {
    for (const m of phase.milestones) {
      total++;
      if (m.completed) completed++;
    }
  }

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, percentage };
}

/**
 * Filters and searches course recommendations
 */
export function filterCourses(
  courses: CourseRecommendation[],
  searchQuery: string,
  levelFilter: string,
  freeOnly: boolean,
  categoryFilter: string
): CourseRecommendation[] {
  return courses.filter(c => {
    if (freeOnly && !c.isFree) return false;
    if (levelFilter && levelFilter !== 'All' && c.level !== levelFilter) return false;
    if (categoryFilter && categoryFilter !== 'All' && c.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchPlatform = c.platform.toLowerCase().includes(q);
      const matchSkills = c.skillsCovered.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchPlatform && !matchSkills) return false;
    }
    return true;
  });
}
