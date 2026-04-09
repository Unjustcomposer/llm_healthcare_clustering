import { motion } from "framer-motion";
import {
  ArrowRight, Database, Brain, Layers, BarChart2,
  Server, GitBranch, Monitor, Shield,
} from "lucide-react";

const stages = [
  {
    id: "ingest",
    title: "Data Ingestion",
    subtitle: "Azure Data Factory",
    color: "from-slate-700 to-slate-600",
    border: "border-slate-500",
    icon: Database,
    iconColor: "text-slate-300",
    items: ["MIMIC-III EHR", "Clinical Notes (NLP)", "Lab Results CSV", "ICD-10 Codes", "Vital Signs Stream"],
  },
  {
    id: "process",
    title: "Data Processing",
    subtitle: "Azure Databricks + Synapse",
    color: "from-blue-800 to-blue-700",
    border: "border-blue-500",
    icon: Server,
    iconColor: "text-blue-300",
    items: ["Spark ETL Pipeline", "Text Normalization", "Missing Value Imputation", "SNOMED Mapping", "Data Versioning"],
  },
  {
    id: "embed",
    title: "LLM Semantic Embedding",
    subtitle: "Azure OpenAI – text-embedding-3-large",
    color: "from-violet-800 to-violet-700",
    border: "border-violet-500",
    icon: Brain,
    iconColor: "text-violet-300",
    items: ["GPT-4 Note Summarization", "1,536-D Dense Embeddings", "Health Entity NER", "Semantic Chunking", "Azure Cosmos DB (Vector)"],
  },
  {
    id: "cluster",
    title: "Clustering & ML",
    subtitle: "Azure ML Studio",
    color: "from-indigo-800 to-indigo-700",
    border: "border-indigo-500",
    icon: GitBranch,
    iconColor: "text-indigo-300",
    items: ["K-Means (k=7)", "HDBSCAN", "Gaussian Mixture", "UMAP Dim Reduction", "MLflow Experiment Tracking"],
  },
  {
    id: "evaluate",
    title: "Evaluation & Metrics",
    subtitle: "Azure ML + Python SDK",
    color: "from-cyan-800 to-cyan-700",
    border: "border-cyan-500",
    icon: BarChart2,
    iconColor: "text-cyan-300",
    items: ["Silhouette Score", "NMI / ARI", "Clinical Validity", "Survival Analysis", "SHAP Explanations"],
  },
  {
    id: "deploy",
    title: "Deployment & Monitoring",
    subtitle: "Azure Container + Monitor",
    color: "from-emerald-800 to-emerald-700",
    border: "border-emerald-500",
    icon: Monitor,
    iconColor: "text-emerald-300",
    items: ["REST API Endpoint", "Real-time Scoring", "Azure Monitor Alerts", "Power BI Dashboard", "HIPAA Compliance"],
  },
];

export default function ArchitectureDiagram() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">System architecture</h2>
        </div>
        <p className="text-slate-500 text-sm">End-to-end Azure ML pipeline for healthcare intelligence</p>
      </div>

      {/* Pipeline stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative"
            >
              <div className="rounded-xl border border-slate-200 p-4 h-full flex flex-col bg-white">
                {/* Stage number */}
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center justify-center font-bold">
                  {idx + 1}
                </span>

                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 text-slate-600 shrink-0`} />
                  <div>
                    <p className="text-slate-800 font-semibold text-sm leading-tight">{stage.title}</p>
                    <p className="text-xs text-slate-500 leading-tight">{stage.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-1.5 flex-1">
                  {stage.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      <span className="text-xs text-slate-700 leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow between stages */}
              {idx < stages.length - 1 && (
                <div className="hidden xl:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-slate-400" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Azure data flow legend */}
      <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500 border-t border-slate-100 pt-4">
        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-slate-500" /> HIPAA-compliant end-to-end encryption</span>
        <span className="flex items-center gap-1"><Server className="w-3 h-3 text-slate-500" /> Azure Private Endpoints</span>
        <span className="flex items-center gap-1"><Monitor className="w-3 h-3 text-slate-500" /> Azure Monitor</span>
        <span className="flex items-center gap-1"><Database className="w-3 h-3 text-slate-500" /> MLflow model registry</span>
      </div>
    </section>
  );
}
