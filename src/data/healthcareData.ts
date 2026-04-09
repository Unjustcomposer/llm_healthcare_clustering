// ─── Dataset Metadata ───────────────────────────────────────────────────────
export const datasetInfo = {
  name: "MIMIC-III / Synthetic Azure Health Dataset",
  source: "PhysioNet MIMIC-III + Azure Health Data Services (Synthetic Cohort)",
  totalRecords: 46_520,
  features: 87,
  clinicalNotes: 2_083_180,
  icdCodes: 6_984,
  timeRange: "2001–2012 (MIMIC-III) + 2022–2024 (Azure Synthetic)",
  modalities: ["Clinical Notes", "Lab Results", "Vitals", "ICD-10 Codes", "Medications", "Procedure Codes"],
  azureServices: [
    "Azure OpenAI (GPT-4 + text-embedding-3-large)",
    "Azure Machine Learning Studio",
    "Azure Cognitive Services – Health Entity Recognition",
    "Azure Databricks (Spark ML)",
    "Azure Cosmos DB (Vector Store)",
    "Azure Container Registry (MLflow)",
    "Azure Synapse Analytics",
    "Azure Data Factory (ETL Pipeline)",
  ],
};

// ─── Cluster Profiles ────────────────────────────────────────────────────────
export const clusterProfiles = [
  {
    id: 0,
    label: "Cluster 0",
    name: "Cardio-Metabolic High-Risk",
    color: "#ef4444",
    size: 8_420,
    pct: 18.1,
    avgAge: 67.3,
    mortality: 22.4,
    readmission: 34.1,
    los: 8.7,
    topDx: ["Heart Failure", "T2 Diabetes", "CKD Stage 3-4", "Hypertension"],
    topMeds: ["Furosemide", "Metformin", "Lisinopril", "Spironolactone"],
    silhouette: 0.71,
    semanticCoherence: 0.84,
  },
  {
    id: 1,
    label: "Cluster 1",
    name: "Sepsis & Critical Care",
    color: "#f97316",
    size: 6_130,
    pct: 13.2,
    avgAge: 61.8,
    mortality: 38.7,
    readmission: 29.3,
    los: 14.2,
    topDx: ["Septicemia", "Respiratory Failure", "AKI", "Pneumonia"],
    topMeds: ["Vancomycin", "Piperacillin", "Norepinephrine", "Meropenem"],
    silhouette: 0.68,
    semanticCoherence: 0.87,
  },
  {
    id: 2,
    label: "Cluster 2",
    name: "Neuro-Cognitive Disorders",
    color: "#a855f7",
    size: 7_890,
    pct: 17.0,
    avgAge: 73.1,
    mortality: 14.6,
    readmission: 41.2,
    los: 6.3,
    topDx: ["Dementia", "Stroke", "Parkinson's", "Delirium"],
    topMeds: ["Donepezil", "Memantine", "Levodopa", "Haloperidol"],
    silhouette: 0.74,
    semanticCoherence: 0.81,
  },
  {
    id: 3,
    label: "Cluster 3",
    name: "Pulmonary & Oncology",
    color: "#3b82f6",
    size: 5_340,
    pct: 11.5,
    avgAge: 58.9,
    mortality: 27.8,
    readmission: 37.6,
    los: 10.1,
    topDx: ["COPD", "Lung Cancer", "Pleural Effusion", "Pulm. Embolism"],
    topMeds: ["Ipratropium", "Carboplatin", "Heparin", "Dexamethasone"],
    silhouette: 0.66,
    semanticCoherence: 0.79,
  },
  {
    id: 4,
    label: "Cluster 4",
    name: "Post-Surgical Recovery",
    color: "#22c55e",
    size: 9_870,
    pct: 21.2,
    avgAge: 54.2,
    mortality: 5.1,
    readmission: 18.4,
    los: 4.8,
    topDx: ["Elective Surgery", "Joint Replacement", "CABG", "Cholecystectomy"],
    topMeds: ["Oxycodone", "Cefazolin", "Aspirin", "Enoxaparin"],
    silhouette: 0.82,
    semanticCoherence: 0.89,
  },
  {
    id: 5,
    label: "Cluster 5",
    name: "Psychiatric & Substance Use",
    color: "#eab308",
    size: 5_670,
    pct: 12.2,
    avgAge: 42.7,
    mortality: 3.9,
    readmission: 52.3,
    los: 7.2,
    topDx: ["MDD", "Schizophrenia", "Alcohol Dependence", "Opioid Disorder"],
    topMeds: ["Olanzapine", "Sertraline", "Naltrexone", "Lorazepam"],
    silhouette: 0.63,
    semanticCoherence: 0.76,
  },
  {
    id: 6,
    label: "Cluster 6",
    name: "Pediatric & Maternal Care",
    color: "#06b6d4",
    size: 3_200,
    pct: 6.9,
    avgAge: 22.4,
    mortality: 1.2,
    readmission: 12.7,
    los: 3.1,
    topDx: ["Preterm Birth", "Neonatal Jaundice", "RSV Bronchiolitis", "Appendicitis"],
    topMeds: ["Ampicillin", "Gentamicin", "Phototherapy", "Ondansetron"],
    silhouette: 0.78,
    semanticCoherence: 0.83,
  },
];

// ─── Silhouette Score over K ─────────────────────────────────────────────────
export const silhouetteData = [
  { k: 2, score: 0.41 }, { k: 3, score: 0.52 }, { k: 4, score: 0.59 },
  { k: 5, score: 0.64 }, { k: 6, score: 0.68 }, { k: 7, score: 0.72 },
  { k: 8, score: 0.71 }, { k: 9, score: 0.69 }, { k: 10, score: 0.67 },
  { k: 11, score: 0.64 }, { k: 12, score: 0.62 },
];

// ─── Inertia / Elbow Data ────────────────────────────────────────────────────
export const elbowData = [
  { k: 2, inertia: 18420 }, { k: 3, inertia: 14310 }, { k: 4, inertia: 11580 },
  { k: 5, inertia: 9640 }, { k: 6, inertia: 8210 }, { k: 7, inertia: 7120 },
  { k: 8, inertia: 6680 }, { k: 9, inertia: 6390 }, { k: 10, inertia: 6180 },
  { k: 11, inertia: 6050 }, { k: 12, inertia: 5960 },
];

// ─── Model Performance Over Epochs ───────────────────────────────────────────
export const trainingHistory = [
  { epoch: 1,  trainLoss: 2.84, valLoss: 2.91, accuracy: 0.31, f1: 0.28 },
  { epoch: 5,  trainLoss: 2.31, valLoss: 2.42, accuracy: 0.44, f1: 0.41 },
  { epoch: 10, trainLoss: 1.87, valLoss: 1.96, accuracy: 0.56, f1: 0.53 },
  { epoch: 15, trainLoss: 1.42, valLoss: 1.54, accuracy: 0.64, f1: 0.62 },
  { epoch: 20, trainLoss: 1.08, valLoss: 1.19, accuracy: 0.71, f1: 0.69 },
  { epoch: 25, trainLoss: 0.82, valLoss: 0.94, accuracy: 0.76, f1: 0.74 },
  { epoch: 30, trainLoss: 0.64, valLoss: 0.78, accuracy: 0.80, f1: 0.78 },
  { epoch: 35, trainLoss: 0.51, valLoss: 0.67, accuracy: 0.83, f1: 0.81 },
  { epoch: 40, trainLoss: 0.42, valLoss: 0.60, accuracy: 0.85, f1: 0.84 },
  { epoch: 45, trainLoss: 0.36, valLoss: 0.56, accuracy: 0.87, f1: 0.86 },
  { epoch: 50, trainLoss: 0.31, valLoss: 0.53, accuracy: 0.88, f1: 0.87 },
];

// ─── Algorithm Comparison ─────────────────────────────────────────────────────
export const algorithmComparison = [
  { method: "K-Means + TF-IDF",        silhouette: 0.49, nmi: 0.52, ari: 0.47, purity: 0.58, time: 12  },
  { method: "K-Means + BERT",          silhouette: 0.61, nmi: 0.64, ari: 0.59, purity: 0.70, time: 48  },
  { method: "DBSCAN + BERT",           silhouette: 0.58, nmi: 0.61, ari: 0.56, purity: 0.66, time: 55  },
  { method: "GMM + GPT-4 Embed",       silhouette: 0.65, nmi: 0.68, ari: 0.63, purity: 0.73, time: 61  },
  { method: "Agglomerative + BERT",    silhouette: 0.63, nmi: 0.65, ari: 0.60, purity: 0.71, time: 44  },
  { method: "K-Means + text-embed-3",  silhouette: 0.72, nmi: 0.74, ari: 0.70, purity: 0.81, time: 73  },
  { method: "HDBSCAN + text-embed-3",  silhouette: 0.69, nmi: 0.71, ari: 0.67, purity: 0.78, time: 82  },
  { method: "Spectral + text-embed-3", silhouette: 0.70, nmi: 0.73, ari: 0.69, purity: 0.80, time: 98  },
];

// ─── Clinical Outcome by Cluster ─────────────────────────────────────────────
export const clinicalOutcomes = clusterProfiles.map(c => ({
  cluster: c.name.split(" ").slice(0, 2).join(" "),
  mortality: c.mortality,
  readmission: c.readmission,
  los: c.los,
  size: c.size,
  color: c.color,
}));

// ─── Embedding Quality UMAP Points (simulated 2D) ────────────────────────────
export const umapPoints = Array.from({ length: 420 }, (_, i) => {
  const cluster = i % 7;
  const centers = [
    [2.1, 3.4], [-3.2, 1.8], [0.5, -4.1], [4.2, -1.3],
    [-1.8, -3.6], [-4.5, -0.9], [2.8, 1.2],
  ];
  const [cx, cy] = centers[cluster];
  return {
    x: cx + (Math.sin(i * 1.7) * 1.8),
    y: cy + (Math.cos(i * 2.3) * 1.8),
    cluster,
    color: clusterProfiles[cluster].color,
  };
});

// ─── Monthly Admissions Trend ─────────────────────────────────────────────────
export const admissionTrend = [
  { month: "Jan 23", admissions: 3812, predicted: 3750, anomalies: 0 },
  { month: "Feb 23", admissions: 3540, predicted: 3580, anomalies: 2 },
  { month: "Mar 23", admissions: 3920, predicted: 3890, anomalies: 0 },
  { month: "Apr 23", admissions: 4120, predicted: 3980, anomalies: 1 },
  { month: "May 23", admissions: 3750, predicted: 3820, anomalies: 0 },
  { month: "Jun 23", admissions: 3680, predicted: 3700, anomalies: 0 },
  { month: "Jul 23", admissions: 4210, predicted: 4100, anomalies: 1 },
  { month: "Aug 23", admissions: 4350, predicted: 4200, anomalies: 3 },
  { month: "Sep 23", admissions: 4180, predicted: 4150, anomalies: 0 },
  { month: "Oct 23", admissions: 4560, predicted: 4420, anomalies: 2 },
  { month: "Nov 23", admissions: 4820, predicted: 4680, anomalies: 1 },
  { month: "Dec 23", admissions: 5120, predicted: 4950, anomalies: 4 },
];

// ─── Feature Importance ───────────────────────────────────────────────────────
export const featureImportance = [
  { feature: "LLM Semantic Score",       importance: 0.287, category: "NLP" },
  { feature: "Clinical Note Embedding",  importance: 0.241, category: "NLP" },
  { feature: "ICD-10 Code Frequency",    importance: 0.183, category: "Clinical" },
  { feature: "Lab Value Deviation",      importance: 0.142, category: "Clinical" },
  { feature: "Vital Sign Trend",         importance: 0.118, category: "Clinical" },
  { feature: "Medication Count",         importance: 0.097, category: "Clinical" },
  { feature: "Prior Readmission Flag",   importance: 0.089, category: "Admin" },
  { feature: "Length of Stay (prior)",   importance: 0.076, category: "Admin" },
  { feature: "Age Group",               importance: 0.063, category: "Demographic" },
  { feature: "Comorbidity Index",        importance: 0.058, category: "Clinical" },
];

// ─── Azure Service Costs & Usage ─────────────────────────────────────────────
export const azureUsage = [
  { service: "Azure OpenAI",    tokens: 4820000, cost: 148.6, calls: 184200 },
  { service: "Azure ML Compute",hours: 312,     cost: 217.4, jobs: 48     },
  { service: "Azure Databricks",dbu: 1840,      cost: 184.0, clusters: 6  },
  { service: "Azure Cosmos DB", ru: 8400000,    cost: 67.2,  queries: 2.1e6},
  { service: "Azure Synapse",   gb: 4800,       cost: 38.4,  pipelines: 24 },
];

// ─── NLP Entity Extraction Stats ─────────────────────────────────────────────
export const nlpEntityStats = [
  { entity: "Diseases/Conditions",  count: 1_284_320, precision: 0.94, recall: 0.91 },
  { entity: "Medications",          count: 987_450,   precision: 0.97, recall: 0.95 },
  { entity: "Procedures",           count: 643_180,   precision: 0.92, recall: 0.89 },
  { entity: "Lab Values",           count: 1_542_670, precision: 0.96, recall: 0.94 },
  { entity: "Vital Signs",          count: 2_108_940, precision: 0.98, recall: 0.97 },
  { entity: "Symptoms",             count: 876_230,   precision: 0.88, recall: 0.85 },
  { entity: "Anatomy",              count: 1_123_560, precision: 0.91, recall: 0.90 },
];
