import {
  CareerRecommendation,
  CourseRecommendation,
  InterviewQuestion,
  RoadmapPhase,
  InternshipStrategy,
  ResumeData
} from '../types/career';

export const POPULAR_CAREER_TRACKS: CareerRecommendation[] = [
  {
    id: 'swe-fullstack',
    title: 'Full-Stack Software Engineer',
    matchScore: 92,
    domain: 'Software & Web Development',
    summary: 'Designs, develops, and deploys scalable client-facing and server-side web applications and cloud services.',
    rationale: 'High alignment with your technical foundation in JavaScript/TypeScript, interest in building user-facing systems, and collaborative product delivery.',
    avgSalary: '$110,000 - $155,000 / year',
    growthRate: '+25% (Faster than average)',
    industryDemand: 'Very High',
    requiredSkills: [
      { skill: 'React / Next.js', importance: 'Essential' },
      { skill: 'Node.js / Express or Python FastAPI', importance: 'Essential' },
      { skill: 'TypeScript', importance: 'Essential' },
      { skill: 'PostgreSQL / SQL', importance: 'Essential' },
      { skill: 'Docker & CI/CD', importance: 'Recommended' },
      { skill: 'Cloud (AWS / GCP)', importance: 'Recommended' },
      { skill: 'System Design & REST/GraphQL', importance: 'Bonus' }
    ],
    typicalRoles: ['Junior Full-Stack Dev', 'Frontend Engineer', 'Backend Engineer', 'Software Development Engineer I (SDE 1)'],
    topEmployers: ['Google', 'Microsoft', 'Stripe', 'Meta', 'Airbnb', 'High-growth Startups'],
    pros: ['Abundant remote & internship openings', 'Direct impact on live user products', 'Clear progression from Junior to Staff Engineer'],
    cons: ['Rapidly evolving frameworks require continuous learning', 'Occasional on-call rotations for production incidents']
  },
  {
    id: 'ai-data-scientist',
    title: 'AI & Machine Learning Engineer',
    matchScore: 88,
    domain: 'Artificial Intelligence & Data',
    summary: 'Builds, fine-tunes, and deploys intelligent models, LLM agents, predictive algorithms, and automated pipeline architectures.',
    rationale: 'Exceptional fit for students passionate about data structures, mathematical modeling, Python, and cutting-edge generative AI.',
    avgSalary: '$125,000 - $175,000 / year',
    growthRate: '+33% (Surging)',
    industryDemand: 'Very High',
    requiredSkills: [
      { skill: 'Python', importance: 'Essential' },
      { skill: 'PyTorch or TensorFlow', importance: 'Essential' },
      { skill: 'Data Structures & Algorithms', importance: 'Essential' },
      { skill: 'SQL & Data Wrangling (Pandas)', importance: 'Essential' },
      { skill: 'LLMs & GenAI Frameworks (LangChain, HuggingFace)', importance: 'Recommended' },
      { skill: 'MLOps & Model Deployment (FastAPI, Docker)', importance: 'Recommended' },
      { skill: 'Linear Algebra & Statistics', importance: 'Bonus' }
    ],
    typicalRoles: ['AI Research Intern', 'Junior ML Engineer', 'Data Scientist', 'Applied AI Associate'],
    topEmployers: ['OpenAI', 'Google DeepMind', 'NVIDIA', 'Anthropic', 'Databricks', 'Scale AI'],
    pros: ['At the forefront of global technological innovation', 'Top compensation tiers across the industry', 'High intellectual variety'],
    cons: ['Steeper mathematical and experimental learning curve', 'Data cleaning and pipeline debugging can be tedious']
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    matchScore: 84,
    domain: 'Infrastructure & Cloud Systems',
    summary: 'Automates cloud infrastructure, manages Kubernetes clusters, optimizes CI/CD deployment pipelines, and guarantees system resilience.',
    rationale: 'Ideal for students intrigued by distributed networks, automation, reliability engineering, and cloud platforms.',
    avgSalary: '$115,000 - $160,000 / year',
    growthRate: '+28% (Very Strong)',
    industryDemand: 'High',
    requiredSkills: [
      { skill: 'Linux / Bash Scripting', importance: 'Essential' },
      { skill: 'Docker & Containerization', importance: 'Essential' },
      { skill: 'Kubernetes', importance: 'Essential' },
      { skill: 'AWS / GCP / Azure Fundamentals', importance: 'Essential' },
      { skill: 'Terraform (Infrastructure as Code)', importance: 'Recommended' },
      { skill: 'GitHub Actions / GitLab CI', importance: 'Recommended' },
      { skill: 'Monitoring (Prometheus / Grafana)', importance: 'Bonus' }
    ],
    typicalRoles: ['Cloud Support Associate', 'Junior DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
    topEmployers: ['Amazon Web Services', 'Microsoft Azure', 'Netflix', 'HashiCorp', 'Red Hat', 'FinTech Giants'],
    pros: ['Universally needed across every enterprise', 'High job security and autonomy', 'Low risk of role obsolescence'],
    cons: ['Responsibility for high-uptime critical infrastructure', 'Steep setup curve for initial orchestration']
  },
  {
    id: 'cyber-security',
    title: 'Cybersecurity Analyst & SecOps',
    matchScore: 81,
    domain: 'Security & Information Assurance',
    summary: 'Defends digital infrastructure against vulnerabilities, performs penetration testing, analyzes threat vectors, and ensures compliance.',
    rationale: 'Great fit for students interested in ethical hacking, networking protocols, system forensics, and defensive countermeasures.',
    avgSalary: '$105,000 - $145,000 / year',
    growthRate: '+31% (Critical Demand)',
    industryDemand: 'Very High',
    requiredSkills: [
      { skill: 'Computer Networks (TCP/IP, DNS, OSI)', importance: 'Essential' },
      { skill: 'Linux Security & Kali Linux', importance: 'Essential' },
      { skill: 'Vulnerability Assessment (Wireshark, Burp Suite)', importance: 'Essential' },
      { skill: 'Python / Bash for Automation', importance: 'Recommended' },
      { skill: 'Security Information (SIEM tools)', importance: 'Recommended' },
      { skill: 'CompTIA Security+ / CEH Concepts', importance: 'Bonus' }
    ],
    typicalRoles: ['SOC Analyst (Tier 1)', 'Information Security Intern', 'Junior Penetration Tester', 'Security Compliance Analyst'],
    topEmployers: ['CrowdStrike', 'Palo Alto Networks', 'Mandiant', 'Cisco', 'Deloitte Cyber', 'Government Defense'],
    pros: ['Mission-driven, high-stakes defense problem solving', 'Massive global shortage of qualified cybersecurity talent', 'Strong industry certifications recognition'],
    cons: ['Can involve alert fatigue in Tier 1 SOC centers', 'Continuous pressure to outpace emerging threats']
  },
  {
    id: 'product-manager',
    title: 'Associate Product Manager (APM)',
    matchScore: 85,
    domain: 'Product Strategy & Tech Leadership',
    summary: 'Bridges engineering, user experience, and business strategy to define product vision, roadmap milestones, and customer delight.',
    rationale: 'Tailored for students who excel at communication, empathy, user research, data analysis, and cross-functional leadership.',
    avgSalary: '$100,000 - $140,000 / year',
    growthRate: '+20% (Competitive)',
    industryDemand: 'High',
    requiredSkills: [
      { skill: 'Product Roadmap Planning', importance: 'Essential' },
      { skill: 'User Research & Wireframing', importance: 'Essential' },
      { skill: 'Data Analytics & SQL (Mixpanel, GA)', importance: 'Essential' },
      { skill: 'Agile / Scrum Methodologies', importance: 'Recommended' },
      { skill: 'Technical Empathy / CS Fundamentals', importance: 'Recommended' },
      { skill: 'Stakeholder Communication', importance: 'Essential' }
    ],
    typicalRoles: ['Associate Product Manager (APM)', 'Product Analyst', 'Technical Program Manager (TPM)'],
    topEmployers: ['Google APM Program', 'Uber APM', 'Salesforce', 'Atlassian', 'LinkedIn', 'Spotify'],
    pros: ['Direct influence over product strategy and roadmap', 'High executive visibility and leadership path', 'Broad skill development across tech and business'],
    cons: ['Responsibility without direct authority over engineers', 'Requires balancing competing stakeholder demands']
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX & Product Designer',
    matchScore: 82,
    domain: 'Design & Human-Computer Interaction',
    summary: 'Crafts intuitive, delightful, and accessible user interfaces, interactive design systems, and cohesive user journeys.',
    rationale: 'Ideal for creative students with an eye for typography, interaction patterns, design systems, and frontend empathy.',
    avgSalary: '$90,000 - $130,000 / year',
    growthRate: '+16%',
    industryDemand: 'Moderate',
    requiredSkills: [
      { skill: 'Figma & Design Systems', importance: 'Essential' },
      { skill: 'User Flow & Wireframing', importance: 'Essential' },
      { skill: 'Prototyping & Usability Testing', importance: 'Essential' },
      { skill: 'Design Fundamentals (Color, Typography, Layout)', importance: 'Essential' },
      { skill: 'Basic HTML/CSS/Tailwind Understanding', importance: 'Recommended' },
      { skill: 'Accessibility (WCAG)', importance: 'Recommended' }
    ],
    typicalRoles: ['Junior Product Designer', 'UI/UX Design Intern', 'Visual Designer', 'Design Systems Associate'],
    topEmployers: ['Apple', 'Figma', 'Shopify', 'Duolingo', 'Canva', 'Design Agencies'],
    pros: ['Visually expressive and tangible results', 'High autonomy in shaping user experiences', 'Strong remote work compatibility'],
    cons: ['Portfolio quality is heavily scrutinized during recruitment', 'Subjective stakeholder critique requires thick skin']
  }
];

export const CURATED_COURSES: CourseRecommendation[] = [
  {
    id: 'course-cs50x',
    title: 'CS50x: Introduction to Computer Science',
    platform: 'edX / Harvard University',
    instructor: 'David J. Malan',
    duration: '12 weeks (Self-paced)',
    level: 'Beginner',
    isFree: true,
    rating: 4.9,
    skillsCovered: ['C', 'Python', 'SQL', 'Algorithms', 'Memory Management'],
    certificationName: 'Harvard CS50 Verified Certificate',
    category: 'Software Engineering'
  },
  {
    id: 'course-fullstackopen',
    title: 'Full Stack Open 2026',
    platform: 'University of Helsinki',
    instructor: 'Matti Luukkainen & Houston Inc.',
    duration: '10-14 weeks',
    level: 'Intermediate',
    isFree: true,
    rating: 4.95,
    skillsCovered: ['React', 'Redux', 'Node.js', 'Express', 'TypeScript', 'GraphQL', 'CI/CD'],
    certificationName: 'University ECTS Credits & Certificate',
    category: 'Software Engineering'
  },
  {
    id: 'course-andrew-ng-ml',
    title: 'Machine Learning Specialization',
    platform: 'Coursera / Stanford Online & DeepLearning.AI',
    instructor: 'Andrew Ng',
    duration: '3 months (5 hrs/week)',
    level: 'Beginner',
    isFree: false,
    rating: 4.9,
    skillsCovered: ['Supervised Learning', 'Neural Networks', 'Decision Trees', 'Unsupervised Learning'],
    certificationName: 'DeepLearning.AI Official Certificate',
    category: 'Data Science & AI'
  },
  {
    id: 'course-aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner Ultimate Training',
    platform: 'Coursera / AWS Skill Builder',
    instructor: 'Stephane Maarek',
    duration: '15 hours',
    level: 'Beginner',
    isFree: false,
    rating: 4.8,
    skillsCovered: ['AWS EC2', 'S3', 'IAM', 'VPC', 'Serverless Lambda', 'Cloud Architecture'],
    certificationName: 'AWS Certified Cloud Practitioner (CLF-C02)',
    category: 'Cloud & DevOps'
  },
  {
    id: 'course-google-cybersecurity',
    title: 'Google Cybersecurity Professional Certificate',
    platform: 'Coursera / Google Career Certificates',
    instructor: 'Google Cybersecurity Experts',
    duration: '6 months (7 hrs/week)',
    level: 'Beginner',
    isFree: false,
    rating: 4.85,
    skillsCovered: ['Linux', 'SQL', 'SIEM Tools', 'Python for Security', 'Incident Response'],
    certificationName: 'Google Professional Cybersecurity Credential',
    category: 'Cybersecurity'
  },
  {
    id: 'course-google-data-analytics',
    title: 'Google Data Analytics Professional Certificate',
    platform: 'Coursera / Google',
    instructor: 'Google Data Analysts',
    duration: '6 months',
    level: 'Beginner',
    isFree: false,
    rating: 4.8,
    skillsCovered: ['Spreadsheets', 'SQL', 'Tableau', 'R Programming', 'Data Cleaning'],
    certificationName: 'Google Data Analytics Certificate',
    category: 'Data Science & AI'
  },
  {
    id: 'course-freecodecamp-dsa',
    title: 'JavaScript Algorithms and Data Structures',
    platform: 'freeCodeCamp',
    instructor: 'Quincy Larson & Community',
    duration: '300 hours (Interactive)',
    level: 'Beginner',
    isFree: true,
    rating: 4.9,
    skillsCovered: ['ES6+', 'Object-Oriented Programming', 'Functional Programming', 'Algorithmic Thinking'],
    certificationName: 'freeCodeCamp Verified Certification',
    category: 'Software Engineering'
  },
  {
    id: 'course-interaction-design',
    title: 'UI / UX Design Specialization',
    platform: 'Coursera / CalArts',
    instructor: 'Michael Worthington',
    duration: '4 months',
    level: 'Intermediate',
    isFree: false,
    rating: 4.75,
    skillsCovered: ['Visual Elements', 'Figma', 'Wireframing', 'User Research', 'Design Systems'],
    certificationName: 'CalArts UI/UX Certificate',
    category: 'UI/UX Design'
  }
];

export const INTERVIEW_QUESTIONS_DATABASE: InterviewQuestion[] = [
  {
    id: 'iq-1',
    question: 'How do you handle state management in a large-scale React application, and when would you choose Context API vs Redux/Zustand?',
    type: 'Technical',
    category: 'Frontend & React',
    difficulty: 'Intermediate',
    modelAnswer: 'Context API is optimal for low-frequency global state (such as dark/light theme, user session, or localization), as updates trigger re-renders across all consuming components. For high-frequency, complex state slices (such as e-commerce carts, rich tables, or interactive dashboards), atomic or selector-based state managers like Zustand or Redux Toolkit are preferred because they avoid unneeded component subtree re-renders and provide excellent middleware/devtools.',
    evalCriteria: [
      'Identifies differences between Context API and dedicated stores',
      'Mentions re-render overhead of React Context',
      'Explains selector-based subscriptions and debugging devtools'
    ]
  },
  {
    id: 'iq-2',
    question: 'Can you describe the difference between synchronous and asynchronous execution in Node.js event loop?',
    type: 'Technical',
    category: 'Backend & Node.js',
    difficulty: 'Intermediate',
    modelAnswer: 'Node.js runs single-threaded JavaScript code on the V8 engine using an Event Loop. Synchronous code blocks the call stack until complete. Asynchronous operations (like File I/O, database queries, and network requests) are offloaded to Libuv worker threads or the OS kernel. Once completed, their callbacks or promises enter the microtask queue (Promises) or event loop phases (timers, poll, check), executing non-blockingly.',
    evalCriteria: [
      'Explains single-threaded call stack',
      'References libuv worker threads and OS async capabilities',
      'Distinguishes microtask queue (Promise.then) from macrotasks'
    ]
  },
  {
    id: 'iq-3',
    question: 'Tell me about a time you worked on a group project and encountered a major conflict or disagreement. How did you resolve it?',
    type: 'HR / Behavioral',
    category: 'Teamwork & Conflict Resolution',
    difficulty: 'Beginner',
    modelAnswer: 'Using the STAR method: In our junior capstone project (Situation), our 4-person team was divided between using MongoDB vs PostgreSQL for our e-commerce platform (Task). Tensions grew as the deadline approached. I scheduled a 45-minute architectural review meeting (Action) where we listed our exact entity relationships, ACID requirements for payment transactions, and read/write access patterns. Seeing that transactions and foreign keys were critical for inventory, the team unanimously agreed on PostgreSQL. We delivered the project on time with 99.8% database uptime during test stress (Result).',
    evalCriteria: [
      'Follows STAR method (Situation, Task, Action, Result)',
      'Shows active listening and objective decision making',
      'Focuses on positive outcome and team harmony'
    ],
    starFrameworkTip: 'Situation (10s), Task (10s), Action (40s - emphasize YOUR actions and collaborative approach), Result (20s - measurable outcome).'
  },
  {
    id: 'iq-4',
    question: 'What is overfitting in Machine Learning, and what concrete techniques do you use to prevent it?',
    type: 'Technical',
    category: 'AI & Data Science',
    difficulty: 'Intermediate',
    modelAnswer: 'Overfitting occurs when a model learns noise and idiosyncrasies in the training data rather than generalizing the underlying distribution, leading to near-zero training loss but high validation/test error. To prevent it, we can use: (1) L1/L2 Regularization (weight decay), (2) Dropout layers in neural networks, (3) Cross-validation (k-fold), (4) Early stopping based on validation loss, (5) Data augmentation to enrich sample diversity, and (6) Pruning or simplifying model complexity.',
    evalCriteria: [
      'Defines high variance / low bias problem',
      'Lists at least 3 distinct regularization or validation methods',
      'Explains data augmentation and early stopping'
    ]
  },
  {
    id: 'iq-5',
    question: 'Why do you want to intern at our company, and where do you see your career heading over the next 3 years?',
    type: 'HR / Behavioral',
    category: 'Motivation & Career Goals',
    difficulty: 'Beginner',
    modelAnswer: 'I have followed your engineering team’s work on distributed systems, specifically how you scale microservices to handle millions of transactions. As a student graduating in 2026, my goal is to transition from university theory to building production-grade, fault-tolerant systems under experienced mentors. In 3 years, I see myself growing into a solid Software Engineer who owns critical backend features and actively mentors incoming junior interns.',
    evalCriteria: [
      'Tailored company-specific research or interest',
      'Realistic, ambitious 3-year growth arc',
      'Desire to learn, contribute, and collaborate'
    ]
  },
  {
    id: 'iq-6',
    question: 'Explain what happens from the moment you type a URL into a web browser and hit Enter until the webpage is rendered.',
    type: 'Technical',
    category: 'Systems & Networking',
    difficulty: 'Advanced',
    modelAnswer: '1. DNS Resolution: Browser checks local cache, hosts file, OS cache, and recursive resolver to translate domain to IP. 2. TCP 3-Way Handshake (SYN, SYN-ACK, ACK) and TLS Handshake (certificate exchange and symmetric session key agreement). 3. HTTP Request sent to web server or CDN. 4. Server processes request and returns HTTP Response (HTML payload). 5. Browser Parsing: DOM tree and CSSOM tree are constructed, combined into Render Tree. 6. Layout (reflow) calculates geometric positions, Paint rasterizes pixels to screen, and JavaScript executes.',
    evalCriteria: [
      'DNS lookup stages',
      'TCP 3-way handshake and TLS negotiation',
      'DOM/CSSOM rendering engine pipeline'
    ]
  }
];

export const DEFAULT_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phaseNumber: 1,
    phaseTitle: 'Phase 1: Foundations & Core Architecture',
    timeframe: 'Month 1 - 2 (Weeks 1 - 8)',
    focus: 'Mastering core programming fundamentals, algorithmic thinking, and modern development tooling.',
    milestones: [
      {
        id: 'm-1-1',
        title: 'Master Modern TypeScript & Advanced JavaScript',
        description: 'Deep dive into asynchronous programming, generics, type unions, closures, and DOM manipulation.',
        duration: '2 weeks',
        completed: true,
        skillsAcquired: ['TypeScript', 'ES6+ Async/Await', 'Type Safety']
      },
      {
        id: 'm-1-2',
        title: 'Data Structures & Algorithmic Problem Solving',
        description: 'Solve 50+ curated problems covering Arrays, HashMaps, Two Pointers, Trees, and Dynamic Programming.',
        duration: '3 weeks',
        completed: true,
        skillsAcquired: ['Big-O Analysis', 'HashMaps', 'Recursion & DFS']
      },
      {
        id: 'm-1-3',
        title: 'Git Version Control & Terminal Proficiency',
        description: 'Master branch workflows, rebase, merge conflict resolution, and shell scripting.',
        duration: '1 week',
        completed: true,
        skillsAcquired: ['Git CLI', 'Bash', 'GitHub Collaboration']
      }
    ]
  },
  {
    phaseNumber: 2,
    phaseTitle: 'Phase 2: Full-Stack Engineering & Microservices',
    timeframe: 'Month 3 - 4 (Weeks 9 - 16)',
    focus: 'Building complete end-to-end applications, relational databases, authentication, and state management.',
    milestones: [
      {
        id: 'm-2-1',
        title: 'Frontend Component Architecture with React & Tailwind',
        description: 'Create responsive web apps with component modularity, custom hooks, and Tailwind CSS.',
        duration: '3 weeks',
        completed: false,
        skillsAcquired: ['React 19', 'Tailwind CSS', 'State Management']
      },
      {
        id: 'm-2-2',
        title: 'RESTful API & Database Engineering (PostgreSQL + Node.js)',
        description: 'Design relational schemas, SQL indexing, connection pools, JWT auth, and middleware validation.',
        duration: '3 weeks',
        completed: false,
        skillsAcquired: ['Express / Node.js', 'PostgreSQL', 'JWT Security']
      },
      {
        id: 'm-2-3',
        title: 'Capstone Project: Campus Marketplace / Peer Learning Hub',
        description: 'Build and deploy a full-stack platform featuring auth, live search, and payments sandbox.',
        duration: '2 weeks',
        completed: false,
        skillsAcquired: ['Full-stack Integration', 'Deployment', 'CRUD Architecture'],
        suggestedProject: 'Full-Stack Campus Collab Hub'
      }
    ]
  },
  {
    phaseNumber: 3,
    phaseTitle: 'Phase 3: Cloud, Testing & AI Integration',
    timeframe: 'Month 5 - 6 (Weeks 17 - 24)',
    focus: 'Containerization, cloud infrastructure deployment, unit/integration testing, and AI feature engineering.',
    milestones: [
      {
        id: 'm-3-1',
        title: 'Dockerization & CI/CD Pipeline Automation',
        description: 'Containerize multi-container web apps with Docker Compose and build automated GitHub Actions testing.',
        duration: '2 weeks',
        completed: false,
        skillsAcquired: ['Docker', 'GitHub Actions', 'CI/CD']
      },
      {
        id: 'm-3-2',
        title: 'Cloud Deployment (AWS / GCP / Cloud Run)',
        description: 'Deploy containerized web services, configure custom domains, SSL certificates, and environment secrets.',
        duration: '2 weeks',
        completed: false,
        skillsAcquired: ['Cloud Deployment', 'Cloud Run', 'IAM & Environment Security']
      },
      {
        id: 'm-3-3',
        title: 'GenAI SDK Integration (Gemini 3.8 Flash)',
        description: 'Incorporate intelligent conversational or analytical capabilities using modern server-side AI SDKs.',
        duration: '2 weeks',
        completed: false,
        skillsAcquired: ['Google GenAI SDK', 'Structured JSON Prompts', 'Streaming APIs']
      }
    ]
  },
  {
    phaseNumber: 4,
    phaseTitle: 'Phase 4: Internship Applications, Portfolio & Mock Interviews',
    timeframe: 'Month 7 - 8 (Weeks 25 - 32)',
    focus: 'Recruitment readiness: ATS-optimized resume, live portfolio site, outreach, and technical mock interviews.',
    milestones: [
      {
        id: 'm-4-1',
        title: 'Polish Professional Portfolio & Live Demos',
        description: 'Host portfolio website featuring 3 production-grade projects with live URLs and GitHub source code.',
        duration: '2 weeks',
        completed: false,
        skillsAcquired: ['Portfolio Presentation', 'Technical Writing', 'Open Source']
      },
      {
        id: 'm-4-2',
        title: 'ATS Resume Customization & Cold Outreach Campaign',
        description: 'Score 90+ on ATS checker; execute targeted outreach to 20+ university recruiters and engineering leads.',
        duration: '2 weeks',
        completed: false,
        skillsAcquired: ['Resume Strategy', 'Cold Emailing', 'LinkedIn Networking']
      },
      {
        id: 'm-4-3',
        title: 'Conduct 10+ Technical & Behavioral Mock Interviews',
        description: 'Practice live coding, system design trade-offs, and STAR framework responses until confident.',
        duration: '2 weeks',
        completed: false,
        skillsAcquired: ['Technical Communication', 'STAR Behavioral Responses', 'Whiteboarding']
      }
    ]
  }
];

export const DEFAULT_INTERNSHIP_STRATEGY: InternshipStrategy = {
  targetRole: 'Software Engineering Intern (Summer 2026/2027)',
  timeline: [
    {
      month: 'August - September (Fall Kickoff)',
      focus: 'Resume Building & Early Application Wave',
      checklist: [
        'Finalize 1-page ATS compliant resume with project links',
        'Apply to Big Tech early-bird university programs (Google, Microsoft, Meta, Amazon)',
        'Attend campus career fairs and engineering information sessions'
      ]
    },
    {
      month: 'October - November (Peak Season)',
      focus: 'Mid-size Tech, High-growth Startups & Online Assessments',
      checklist: [
        'Complete HackerRank / Codesignal online assessments within 48h of receiving',
        'Send 5 targeted cold emails/LinkedIn messages per week to engineering managers',
        'Follow up on applications submitted in September'
      ]
    },
    {
      month: 'December - January (Winter Break)',
      focus: 'Portfolio Enhancement & Rapid Interview Prep',
      checklist: [
        'Ship 1 new standout side-project demonstrating modern tech stack',
        'Conduct peer mock interviews twice weekly focusing on communication clarity',
        'Prepare list of insightful questions to ask the interviewer'
      ]
    },
    {
      month: 'February - April (Spring Final Wave)',
      focus: 'Local Companies, Startups & Offer Negotiation',
      checklist: [
        'Apply to high-velocity startups hiring on Wellfound and Y Combinator Work at a Startup',
        'Leverage alumni network for internal referrals',
        'Review and compare written internship offers'
      ]
    }
  ],
  platforms: [
    {
      name: 'LinkedIn Jobs & Alumni Search',
      url: 'https://www.linkedin.com/jobs',
      badge: 'Highest Volume',
      description: 'Search for "Software Engineer Intern 2026" and filter by "Past 24 hours". Use university alumni search to find warm connections.'
    },
    {
      name: 'Handshake',
      url: 'https://joinhandshake.com',
      badge: 'Campus Recruiter Direct',
      description: 'Directly partnered with your university career services. Employers explicitly seek students from your college major.'
    },
    {
      name: 'Wellfound (AngelList Talent)',
      url: 'https://wellfound.com',
      badge: 'Best for Startups',
      description: 'Connect directly with startup founders and engineering leads. Minimal red tape, fast hiring decisions.'
    },
    {
      name: 'Simplify & GitHub Pitches',
      url: 'https://simplify.jobs',
      badge: 'Automated 1-Click Track',
      description: 'Automate job applications and track GitHub repo lists (like Summer 2026 Tech Internships).'
    }
  ],
  coldEmailTemplates: [
    {
      title: 'Direct Outreach to Engineering Manager / Tech Lead',
      targetRecipient: 'Engineering Manager or Senior Software Engineer',
      subject: 'Question regarding [Company]\'s [Team Name] & Engineering Internship',
      body: `Hi [Name],

I recently read about how your team built [specific engineering accomplishment or blog post, e.g., real-time caching layer], and as a CS student at [University], I found your architectural choices fascinating!

I’m currently seeking a Software Engineering Internship for [Summer 2026]. Over the past year, I’ve built [Name of project], which [1-sentence impact, e.g., handles 10k requests with TypeScript & Redis].

I know you are very busy, but if you have 10 minutes next week, I would love to ask you one question about how your team approaches [relevant engineering challenge].

Either way, thank you for your time and continued contributions to [field]!

Best regards,
[Your Name]
[LinkedIn Link] | [GitHub Link] | [Portfolio Link]`
    },
    {
      title: 'Reaching out to University Recruiter',
      targetRecipient: 'Campus / University Talent Acquisition Recruiter',
      subject: '[University] Student - Software Engineer Internship Inquiry [Summer 2026]',
      body: `Hi [Recruiter Name],

I hope your week is off to a great start!

I am currently a [Year] studying [Major] at [University]. I recently submitted my application for the Software Engineer Intern role (Job ID: #[ID]) and wanted to express my strong enthusiasm for [Company]’s culture and engineering mission.

With hands-on experience building full-stack web applications in [Tech Stack: e.g. React, Node.js, TypeScript] and [1 key project highlight], I would love the opportunity to contribute to your engineering teams this summer.

My resume is attached for convenience, and you can explore my projects here: [Portfolio URL] and [GitHub URL].

Thank you for your time and for supporting university talent!

Warmly,
[Your Name]
[Phone Number] | [LinkedIn Profile]`
    }
  ],
  standoutProjectIdeas: [
    {
      title: 'AI Career Path Simulator with Real-Time Data',
      tech: ['TypeScript', 'React', 'Node.js', 'Google GenAI SDK', 'PostgreSQL'],
      pitch: 'A full-stack student counseling portal that personalizes career tracks, diagnoses skill gaps, and runs live mock interviews.',
      expectedDeliverable: 'Live web app with authentication, database persistence, and automated test suite.'
    },
    {
      title: 'Distributed Real-Time Collaborative Canvas / Document Hub',
      tech: ['WebSockets', 'Node.js', 'Redis', 'Canvas API', 'Docker'],
      pitch: 'Low-latency collaborative multiplayer whiteboard handling 100+ concurrent clients with conflict resolution.',
      expectedDeliverable: 'Dockerized microservice deployed to Cloud with latency benchmark graphs in README.'
    },
    {
      title: 'Automated Campus Resource Alert & Reservation Bot',
      tech: ['Python', 'FastAPI', 'Playwright', 'PostgreSQL', 'Telegram API'],
      pitch: 'Monitors campus study room reservations or course seat drops and dispatches instant webhook notifications.',
      expectedDeliverable: 'Open-source GitHub repo with 50+ stars, automated CI/CD pipeline, and 95% test coverage.'
    }
  ],
  interviewPrepChecklist: [
    'Solve at least 75 LeetCode style problems (Blind 75 list)',
    'Master explaining time and space complexity (Big-O) out loud while writing code',
    'Prepare 4 distinct stories using the STAR method for behavioral questions',
    'Review basic HTTP networking, REST architecture, and database indexing',
    'Have 3 thoughtful questions ready to ask your interviewer about engineering culture'
  ]
};

export const INITIAL_STUDENT_PROFILE = {
  name: 'Jordan Miller',
  degree: 'Bachelor of Science',
  major: 'Computer Science & Information Tech',
  currentYear: '3rd Year (Junior)',
  technicalSkills: ['JavaScript', 'TypeScript', 'React', 'Python', 'HTML/CSS', 'Git', 'SQL Basics'],
  softSkills: ['Problem Solving', 'Team Collaboration', 'Effective Communication', 'Curiosity'],
  interests: ['Web Development', 'Artificial Intelligence', 'Open Source', 'FinTech'],
  goals: 'Secure a top software engineering or AI internship for next summer, master full-stack and cloud architectures, and improve interview confidence.',
  workPreference: 'Hybrid' as const,
  targetRoles: ['Full-Stack Software Engineer', 'AI/ML Engineer']
};

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Jordan Miller',
    email: 'jordan.miller@university.edu',
    phone: '(555) 234-5678',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/jordanmiller-dev',
    github: 'github.com/jordanmiller',
    portfolio: 'jordanmiller.dev',
    summary: 'Proactive 3rd-year Computer Science student skilled in TypeScript, React, Python, and cloud services. Experienced in building accessible, responsive web applications and passionate about leveraging AI to solve student-facing challenges.'
  },
  education: [
    {
      id: 'edu-1',
      institution: 'State University',
      degree: 'B.S.',
      major: 'Computer Science',
      graduationYear: 'May 2027',
      gpa: '3.82 / 4.0'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Campus IT Solutions Lab',
      role: 'Student Software Developer',
      startDate: 'Sep 2024',
      endDate: 'Present',
      location: 'On-campus',
      bullets: [
        'Developed interactive student portal modules using React and TypeScript, serving 4,500+ undergraduate students.',
        'Optimized client-side rendering bottlenecks, reducing page load latency by 28%.',
        'Collaborated with 4 student engineers in bi-weekly Agile sprints to implement role-based access control.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'PeerTutor: Real-Time Study Matcher',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Tailwind'],
      description: 'Peer tutoring connection portal with live chat and schedule booking.',
      githubUrl: 'https://github.com/jordanmiller/peertutor',
      liveUrl: 'https://peertutor.demo.app',
      bullets: [
        'Architected real-time WebSocket messaging layer supporting concurrent chat sessions between students.',
        'Implemented relational schema in PostgreSQL with Prisma ORM, executing queries in under 15ms.',
        'Engineered responsive mobile-first UI with Tailwind CSS and achieved 98/100 Google Lighthouse score.'
      ]
    },
    {
      id: 'proj-2',
      name: 'SmartCourse: AI Syllabus Analyzer',
      technologies: ['Python', 'FastAPI', 'Gemini API', 'Docker'],
      description: 'Extracts exam schedules and assignment deadlines automatically from course PDF syllabi.',
      githubUrl: 'https://github.com/jordanmiller/smartcourse',
      bullets: [
        'Built REST API using FastAPI that parses course documents and formats calendar reminders via structured JSON.',
        'Integrated Google GenAI SDK to generate personalized study milestone timelines for college exams.'
      ]
    }
  ],
  skills: {
    technical: ['TypeScript', 'JavaScript', 'React', 'Python', 'Node.js', 'Express', 'SQL', 'PostgreSQL', 'HTML5', 'CSS3'],
    soft: ['Agile Teamwork', 'Technical Writing', 'Public Speaking', 'Adaptability'],
    tools: ['Git & GitHub', 'Docker', 'VS Code', 'Postman', 'Figma', 'Linux Bash']
  },
  certifications: [
    {
      id: 'cert-1',
      name: 'Foundations of Modern Web Development',
      issuer: 'University of Helsinki',
      year: '2025'
    }
  ]
};
