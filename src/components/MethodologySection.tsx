import { motion } from "framer-motion";
import { Code2, GitBranch, Brain, FlaskConical, CheckCircle } from "lucide-react";

const methodSteps = [
  {
    phase: "Phase 1",
    title: "Data Collection & ETL",
    icon: "🗄️",
    color: "bg-slate-100 border-slate-300 text-slate-800",
    accent: "#64748b",
    details: [
      "MIMIC-III downloaded from PhysioNet under data use agreement",
      "Azure Data Factory pipelines ingest 46,520 patient records",
      "Azure Synapse Analytics for large-scale SQL transformations",
      "Apache Spark (Databricks) for distributed text pre-processing",
      "De-identification using Microsoft Presidio + Azure Purview",
    ],
    code: `# Azure Databricks ETL Pipeline
from pyspark.sql import SparkSession
from azure.ai.textanalytics import TextAnalyticsClient

spark = SparkSession.builder \\
  .appName("HealthcareETL") \\
  .config("fs.azure.account.key", STORAGE_KEY) \\
  .getOrCreate()

notes_df = spark.read.parquet(
  "abfss://mimic@datalake.dfs.core.windows.net/notes/")
notes_df = notes_df.filter(col("text").isNotNull())
notes_df.write.parquet("processed/notes_clean")`,
  },
  {
    phase: "Phase 2",
    title: "LLM Semantic Embedding",
    icon: "🧠",
    color: "bg-violet-50 border-violet-300 text-violet-800",
    accent: "#7c3aed",
    details: [
      "GPT-4 (gpt-4-0125-preview) for clinical note summarization",
      "Azure OpenAI text-embedding-3-large produces 1,536-D vectors",
      "Batch embedding API with exponential backoff retry logic",
      "Vectors stored in Azure Cosmos DB (vector search enabled)",
      "Average embedding cost: $0.13 per 1M tokens",
    ],
    code: `# Azure OpenAI Embedding Generation
from openai import AzureOpenAI
import numpy as np

client = AzureOpenAI(
  azure_endpoint=AZURE_ENDPOINT,
  api_key=AZURE_KEY,
  api_version="2024-02-01"
)

def embed_notes(notes: list[str]) -> np.ndarray:
  response = client.embeddings.create(
    input=notes,
    model="text-embedding-3-large"  # 1536-D
  )
  return np.array([e.embedding for e in response.data])`,
  },
  {
    phase: "Phase 3",
    title: "Clustering & Dimensionality Reduction",
    icon: "🔵",
    color: "bg-indigo-50 border-indigo-300 text-indigo-800",
    accent: "#4f46e5",
    details: [
      "UMAP (n_neighbors=15, min_dist=0.1) for 2D visualization",
      "K-Means with k=7 on full 1,536-D embedding space",
      "Azure ML AutoML sweep over k=2..12 (silhouette maximization)",
      "HDBSCAN & Gaussian Mixture Model as comparison baselines",
      "MLflow experiment tracking on Azure ML workspace",
    ],
    code: `# Azure ML Clustering Pipeline
from azure.ai.ml import MLClient, command
from sklearn.cluster import KMeans
import umap

# AutoML sweep for optimal K
sweep_job = command(
  code="./cluster_sweep.py",
  environment="azureml:sklearn-env:1",
  compute="gpu-cluster",
  inputs=dict(embeddings=embed_data),
  outputs=dict(model=Output(type="mlflow_model"))
)
# Best: KMeans(n_clusters=7, init='k-means++')
# Silhouette: 0.72, NMI: 0.74`,
  },
  {
    phase: "Phase 4",
    title: "Evaluation & Clinical Validation",
    icon: "📊",
    color: "bg-emerald-50 border-emerald-300 text-emerald-800",
    accent: "#059669",
    details: [
      "Internal metrics: Silhouette, Davies-Bouldin, Calinski-Harabasz",
      "External metrics: NMI, ARI, Purity vs. DRG ground truth",
      "Clinical validation: ANOVA across mortality, LOS, readmission",
      "SHAP explainability via Azure ML Responsible AI dashboard",
      "Kaplan-Meier survival curves per cluster (log-rank test p<0.001)",
    ],
    code: `# Evaluation Pipeline
from sklearn.metrics import (
  silhouette_score, normalized_mutual_info_score,
  adjusted_rand_score
)
import shap

# Silhouette
sil = silhouette_score(X_embed, labels)  # 0.72

# SHAP Feature Importance
explainer = shap.KernelExplainer(model.predict, X_sample)
shap_vals = explainer.shap_values(X_test)
# Top feature: LLM Semantic Score (0.287)`,
  },
];

export default function MethodologySection() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">Methodology</h2>
        <p className="text-slate-500 text-sm mt-1">
          Four-phase pipeline integrating Azure ML, OpenAI embeddings, and clinical evaluation frameworks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {methodSteps.map((step, idx) => (
          <motion.div
            key={step.phase}
            className={`rounded-2xl border border-slate-200 bg-white p-5`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded border border-slate-100 text-slate-600">
                    {step.phase}
                  </span>
                </div>
                <h3 className="text-base font-semibold mt-1 text-slate-800">{step.title}</h3>
              </div>
            </div>

            {/* Details */}
            <ul className="space-y-1.5 mb-4">
              {step.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-3 h-3 mt-0.5 shrink-0 text-slate-400" />
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>

            {/* Code snippet */}
            <div className="rounded-xl bg-slate-900 p-4 overflow-x-auto">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400 text-xs">Python · Azure SDK</span>
              </div>
              <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                {step.code}
              </pre>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LLM Integration Detail */}
      <motion.div
        className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-violet-600" />
          <h3 className="font-bold text-slate-800">LLM Semantic Understanding Architecture</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "1. Clinical Note Input",
              desc: "Raw discharge summaries, progress notes, and radiology reports are ingested via Azure Data Factory.",
              icon: "📝",
            },
            {
              step: "2. GPT-4 Summarization",
              desc: "Azure OpenAI GPT-4 generates structured clinical summaries, extracting key diagnoses, medications, and outcomes.",
              icon: "🤖",
            },
            {
              step: "3. Embedding Generation",
              desc: "text-embedding-3-large converts summaries to 1,536-D dense vectors capturing semantic relationships.",
              icon: "🔢",
            },
            {
              step: "4. Vector Clustering",
              desc: "K-Means clusters high-dimensional embeddings in Azure ML, grouping semantically similar patient cases.",
              icon: "🎯",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-xl bg-gradient-to-b from-violet-50 to-indigo-50 border border-violet-100 p-4">
              <span className="text-xl mb-2 block">{item.icon}</span>
              <p className="text-xs font-bold text-violet-800 mb-1">{item.step}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Hyperparameters table */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-slate-400" />
              Model Hyperparameters
            </h4>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Embedding Model", "text-embedding-3-large"],
                  ["Embedding Dims", "1,536"],
                  ["Clustering Algorithm", "K-Means++"],
                  ["Optimal K", "7"],
                  ["UMAP n_neighbors", "15"],
                  ["UMAP min_dist", "0.1"],
                  ["Random Seed", "42"],
                  ["Max Iterations", "500"],
                  ["Convergence Tol.", "1e-4"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-1.5 text-slate-500">{k}</td>
                    <td className="py-1.5 text-slate-800 font-mono font-medium">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-slate-400" />
              Azure ML Compute Resources
            </h4>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Embedding Compute", "Standard_E8s_v3 (64 GB RAM)"],
                  ["Training Cluster", "Standard_NC6s_v3 (GPU)"],
                  ["GPU Type", "NVIDIA V100 (16 GB)"],
                  ["GPU Count", "4 nodes"],
                  ["Training Time", "~4.2 hours total"],
                  ["Inference SKU", "Standard_F4s_v2"],
                  ["Parallelism", "Spark (8 workers, 16 cores)"],
                  ["Storage", "Azure ADLS Gen2 (8 TB)"],
                  ["Orchestration", "Azure ML Pipelines v2"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-1.5 text-slate-500">{k}</td>
                    <td className="py-1.5 text-slate-800 font-medium">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
