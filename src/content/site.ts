export const profile = {
  name: "Jatin Kumar",
  version: "v2026.1",
  role: "AI / Machine Learning Engineer",
  email: "jatin.johnny007@gmail.com",
  github: "https://github.com/jatinkumar300403",
  linkedin: "https://www.linkedin.com/in/jatinkumar2005/",
  resumePath: "/resume.pdf",
  tagline:
    "I build ML systems and ship products end to end — from a published continual-learning framework to platforms used by hundreds of students.",
  about: [
    "I'm a CS graduate from VIT Vellore (CGPA 8.64), currently pursuing my M.Sc. in Computer Science at Leibniz Universität Hannover. My research background is in continual learning — I published a paper at ICCS 2025 (Springer LNCS) on MTL-FECAM, a framework for molecular property prediction, built during a research internship at IIT (BHU) Varanasi under Prof. Sanjay Kumar Singh.",
    "I think of myself as a 0→1 builder: I'd rather take an idea from a blank file to something people actually use than polish something that already exists. Outside of research and code, I'm learning German (A2 → B1) for life in Germany and slowly turning a lifelong interest in astrophysics into a small public writing practice.",
  ],
  interests: ["Machine Learning", "Systems", "Research", "Astrophysics"],
};

export const waypoints = [
  { id: "hero", label: "VELLORE, IN", sub: "B.Tech CS — dataset collected" },
  { id: "training-logs", label: "VARANASI, IN", sub: "IIT-BHU — training & research" },
  { id: "deployment", label: "HANNOVER, DE", sub: "M.Sc. — deployed to production" },
];

export const education = [
  {
    op: "running",
    school: "Leibniz Universität Hannover",
    degree: "M.Sc. Computer Science",
    period: "2026 – present",
    note: "Interested in the L3S Research Center and NLP groups.",
    features: ["Research depth"],
  },
  {
    op: "done",
    school: "VIT Vellore",
    degree: "B.Tech Computer Science",
    period: "Sep 2022 – Jul 2026",
    note: "CGPA 8.64 / 10",
    features: [
      "Computer Vision",
      "Artificial Intelligence",
      "Statistics",
      "Algorithms",
    ],
  },
  {
    op: "done",
    school: "Global Indian International School, Noida",
    degree: "Higher Secondary (12th)",
    period: "Apr 2021 – Mar 2022",
    note: "92.2% — Physics, Chemistry, Math, IT",
    features: ["Math foundations", "Physics intuition"],
  },
];

export type SkillNode = {
  id: string;
  label: string;
  kind: "hub" | "skill" | "project";
};

export type SkillEdge = [string, string];

export const skillGraph: { nodes: SkillNode[]; edges: SkillEdge[] } = {
  nodes: [
    { id: "agents", label: "AI agents & LLMs", kind: "hub" },
    { id: "mldata", label: "ML & data", kind: "hub" },
    { id: "web", label: "Web / APIs", kind: "hub" },
    { id: "tools", label: "Languages & tools", kind: "hub" },

    { id: "openai", label: "OpenAI API", kind: "skill" },
    { id: "langchain", label: "LangChain", kind: "skill" },
    { id: "agentic", label: "Agentic AI", kind: "skill" },
    { id: "rag", label: "RAG", kind: "skill" },
    { id: "hf", label: "Hugging Face", kind: "skill" },
    { id: "pytorch", label: "PyTorch", kind: "skill" },
    { id: "sklearn", label: "scikit-learn", kind: "skill" },
    { id: "xgboost", label: "XGBoost", kind: "skill" },
    { id: "numpy", label: "NumPy", kind: "skill" },
    { id: "pandas", label: "Pandas", kind: "skill" },
    { id: "chromadb", label: "ChromaDB", kind: "skill" },
    { id: "nlp", label: "NLP", kind: "skill" },
    { id: "mlflow", label: "MLflow", kind: "skill" },
    { id: "dvc", label: "DVC", kind: "skill" },
    { id: "python", label: "Python", kind: "skill" },
    { id: "sql", label: "SQL", kind: "skill" },
    { id: "linux", label: "Linux", kind: "skill" },
    { id: "docker", label: "Docker", kind: "skill" },
    { id: "jupyter", label: "Jupyter", kind: "skill" },
    { id: "git", label: "Git", kind: "skill" },
    { id: "fastapi", label: "FastAPI", kind: "skill" },
    { id: "flask", label: "Flask", kind: "skill" },
    { id: "rest", label: "REST APIs", kind: "skill" },
    { id: "react", label: "React", kind: "skill" },
    { id: "tailwind", label: "Tailwind", kind: "skill" },

    { id: "p-commentlens", label: "CommentLens", kind: "project" },
    { id: "p-credcheck", label: "CredCheck", kind: "project" },
    { id: "p-paper", label: "MTL-FECAM", kind: "project" },
  ],
  edges: [
    ["openai", "agents"],
    ["langchain", "agents"],
    ["agentic", "agents"],
    ["rag", "agents"],
    ["hf", "agents"],
    ["pytorch", "mldata"],
    ["sklearn", "mldata"],
    ["xgboost", "mldata"],
    ["numpy", "mldata"],
    ["pandas", "mldata"],
    ["chromadb", "mldata"],
    ["nlp", "mldata"],
    ["mlflow", "mldata"],
    ["dvc", "mldata"],
    ["fastapi", "web"],
    ["flask", "web"],
    ["rest", "web"],
    ["react", "web"],
    ["tailwind", "web"],
    ["python", "tools"],
    ["sql", "tools"],
    ["linux", "tools"],
    ["docker", "tools"],
    ["jupyter", "tools"],
    ["git", "tools"],

    ["hf", "p-commentlens"],
    ["pytorch", "p-commentlens"],
    ["nlp", "p-commentlens"],
    ["flask", "p-commentlens"],
    ["docker", "p-commentlens"],
    ["mlflow", "p-commentlens"],
    ["dvc", "p-commentlens"],
    ["python", "p-commentlens"],
    ["sklearn", "p-credcheck"],
    ["xgboost", "p-credcheck"],
    ["pandas", "p-credcheck"],
    ["numpy", "p-credcheck"],
    ["python", "p-credcheck"],
    ["jupyter", "p-credcheck"],
    ["pytorch", "p-paper"],
    ["python", "p-paper"],
    ["numpy", "p-paper"],
    ["nlp", "p-paper"],
  ],
};

export type Project = {
  slug: string;
  epoch: string;
  name: string;
  status: "converged" | "in-progress";
  oneLiner: string;
  summary: string;
  objective: string;
  approach: string[];
  result?: string;
  metrics?: { label: string; value: string }[];
  stack: string[];
  links?: { label: string; href: string }[];
  /** Primary click target for the preview card. Falls back to non-clickable when unset. */
  liveUrl?: { label: string; href: string };
  /**
   * `image` wins when set — drop a real screenshot in /public/projects/ and
   * point to it (e.g. "/projects/commentlens.png") to replace the rendered mock.
   */
  preview: {
    kind: "commentlens" | "credcheck";
    image?: string;
    chromeUrl: string;
  };
  demo?: "sentiment" | "credit";
};

export const projects: Project[] = [
  {
    slug: "commentlens",
    epoch: "epoch_01",
    name: "CommentLens",
    status: "converged",
    oneLiner: "YouTube comment sentiment analyser, shipped as a Chrome extension",
    summary:
      "A Manifest V3 Chrome extension that reads a video's comment section and tells you how the audience actually received it — sentiment split, trend over time, word cloud, and a coloured badge on every comment. A Flask API on Cloud Run does the inference.",
    objective:
      "You can't judge how an audience received a video by scrolling its comments. Turn a comment section into a signal you can read in one glance.",
    approach: [
      "Chrome extension (MV3) extracts comments and badges each one in-page; a Flask API calls the YouTube Data API and returns predictions plus generated charts",
      "DVC orchestrates ingestion → preprocessing → training → registration, with Optuna tuning and MLflow as the model registry",
      "Serves twitter-xlm-roberta-base-sentiment because the TF-IDF + LightGBM baseline broke down on emoji, slang and Hinglish",
      "Dockerised and deployed to Google Cloud Run through GitHub Actions with Workload Identity Federation — scales to zero, no keys baked into the extension",
    ],
    result:
      "On a hand-labelled set the transformer got 14/16 against the LightGBM baseline's 5/16. Across a wider 300-comment sample it held ~51% and over-called negative (24% predicted vs ~3% actual) — the Reddit training proxy doesn't transfer cleanly to YouTube, which is exactly why the pretrained model is the one that ships.",
    metrics: [
      { label: "transformer", value: "14/16" },
      { label: "lgbm baseline", value: "5/16" },
      { label: "serving", value: "Cloud Run" },
    ],
    stack: [
      "Python",
      "Flask",
      "PyTorch",
      "Transformers",
      "LightGBM",
      "Optuna",
      "DVC",
      "MLflow",
      "Docker",
      "Cloud Run",
      "GitHub Actions",
      "Chrome MV3",
    ],
    links: [
      { label: "source", href: "https://github.com/jatinkumar300403/CommentLens" },
    ],
    // TODO: once CommentLens is live, set liveUrl and the preview becomes clickable:
    //   Chrome Web Store  → { label: "Add to Chrome", href: "https://chromewebstore.google.com/detail/<id>" }
    //   or hosted web demo → { label: "Try the analyser", href: "https://<your-cloud-run-url>" }
    preview: { kind: "commentlens", chromeUrl: "youtube.com/watch — CommentLens" },
    demo: "sentiment",
  },
  {
    slug: "credcheck",
    epoch: "epoch_02",
    name: "CredCheck",
    status: "converged",
    oneLiner: "Credit risk scoring on the German Credit dataset",
    summary:
      "Classifies a loan applicant as a good or bad credit risk from eight financial and demographic fields. Four tree-based models were put through grid search and cross-validation; XGBoost won and is served through a Streamlit app.",
    objective:
      "Score an applicant's credit risk from basic financial fields, and make the model comparison visible instead of hiding it behind a single number.",
    approach: [
      "Cleaned the German Credit data (1,000 applicants → 522 usable rows) and encoded categoricals with persisted encoders",
      "Grid search and cross-validation across Decision Tree, Extra Trees, Random Forest and XGBoost",
      "Handled class imbalance with class_weight='balanced' and scale_pos_weight rather than resampling",
      "Shipped the winning model as a Streamlit app with joblib-persisted encoders for live scoring",
    ],
    result:
      "XGBoost selected at 0.695 accuracy on an 80/20 split, ahead of Random Forest (0.667), Extra Trees (0.648) and Decision Tree (0.581).",
    metrics: [
      { label: "xgboost", value: "0.695" },
      { label: "runner-up (RF)", value: "0.667" },
      { label: "clean rows", value: "522" },
    ],
    stack: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "pandas",
      "NumPy",
      "Streamlit",
      "matplotlib",
      "seaborn",
      "joblib",
    ],
    links: [
      { label: "source", href: "https://github.com/jatinkumar300403/CredCheck" },
    ],
    liveUrl: {
      label: "Open live app",
      href: "https://insta-cred-check.streamlit.app/",
    },
    preview: { kind: "credcheck", chromeUrl: "insta-cred-check.streamlit.app" },
    demo: "credit",
  },
];

export const experience = [
  {
    step: "opt_step_01",
    title: "ML Research Intern",
    org: "IIT (BHU) Varanasi",
    period: "Sep 2024 – Apr 2025",
    hyperparam: { name: "learning_rate", note: "curiosity ↑ — generalization improved" },
    points: [
      "Built MTL-FECAM, a multi-task continual learning framework for molecular property prediction, under Prof. Sanjay Kumar Singh",
      "90.89%–92.62% accuracy with 0.0–0.27 forgetting across 3 molecular datasets",
      "Balanced the stability–plasticity tradeoff with Mahalanobis distance, covariance modeling, and EWC — outperformed 10+ SOTA methods",
      "Published at ICCS 2025 (Singapore), Springer LNCS",
    ],
  },
  {
    step: "opt_step_02",
    title: "Web Developer (Freelance)",
    org: "SAYTRIP WAYS PVT LTD · Remote",
    period: "Jan 2024 – Apr 2024",
    hyperparam: { name: "regularization", note: "discipline ↑ — shipped to production solo" },
    points: [
      "Developed Tripster, a live flight booking platform, using Next.js, ShadCN and MUI",
      "Designed responsive, modular front-end components for real-time flight data",
    ],
  },
];

export const research = {
  title:
    "MTL-FECAM: Bridging the Stability–Plasticity Tradeoff in Exemplar-Free Continual Learning",
  venue: "ICCS 2025 (Singapore) · Springer LNCS",
  plain:
    "Neural networks forget old tasks when they learn new ones. MTL-FECAM lets a model keep learning new molecular-property tasks without storing past data and without forgetting — useful when data can't be kept for privacy or storage reasons.",
  metrics: [
    { label: "accuracy", value: "90.89–92.62%" },
    { label: "forgetting", value: "0.0–0.27" },
    { label: "baselines beaten", value: "10+ SOTA" },
  ],
  bibtex: `@inproceedings{kumar2025mtlfecam,
  title     = {MTL-FECAM: Bridging the Stability-Plasticity Tradeoff in Exemplar-Free Continual Learning},
  author    = {Kumar, Jatin and Singh, Sanjay Kumar},
  booktitle = {Computational Science -- ICCS 2025},
  publisher = {Springer LNCS},
  doi       = {10.1007/978-3-031-97554-7_23},
  year      = {2025}
}`,
  paperUrl: "https://link.springer.com/chapter/10.1007/978-3-031-97554-7_23",
};

export const validationChecks = [
  { name: "peer review", verdict: "PASSED", detail: "ICCS 2025 publication, Springer LNCS" },
];

export const achievements = [
  { title: "Top 10 Finalist", detail: "Yuvamanthan Hackathon 2024, organized by IIT Madras" },
];
