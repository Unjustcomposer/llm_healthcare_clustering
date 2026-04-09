import { motion } from "framer-motion";
import { Database, FileText, Tag, Layers, CheckCircle2 } from "lucide-react";
import { datasetInfo, nlpEntityStats } from "../data/healthcareData";

export default function DatasetSection() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">Dataset Details</h2>
        <p className="text-slate-500 text-sm mt-1">
          Combined MIMIC-III clinical database with Azure Synthetic Health cohort
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Dataset overview */}
        <motion.div
          className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Dataset Overview</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total patient records", value: "46,520" },
              { label: "Clinical notes", value: "2,083,180" },
              { label: "ICD-10 codes", value: "6,984" },
              { label: "Feature dimensions", value: "87 → 1,536" },
              { label: "Time range", value: "2001–2024" },
              { label: "Data modalities", value: "6 types" },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl p-4 border border-slate-100 bg-white`}>
                <p className="text-lg font-semibold text-slate-800">{item.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Data modalities */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-400" />
              Data Modalities & Sources
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { modal: "Clinical Notes (NLP)", detail: "2.08M discharge summaries, progress notes, radiology reports", tag: "Unstructured" },
                { modal: "Lab Results", detail: "CBC, BMP, LFT panels — 4.2M measurements across 623 test types", tag: "Structured" },
                { modal: "Vital Signs", detail: "Heart rate, BP, SpO₂, temperature — ICU continuous monitoring", tag: "Time-series" },
                { modal: "ICD-10 / ICD-9 Codes", detail: "Diagnosis & procedure codes with temporal ordering", tag: "Coded" },
                { modal: "Medication Orders", detail: "Drug name, dose, route, frequency — 3.1M prescriptions", tag: "Structured" },
                { modal: "Procedure Codes", detail: "CPT / SNOMED procedure mapping via Azure Health Entity NER", tag: "Coded" },
              ].map((row) => (
                <div key={row.modal} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="shrink-0">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-medium">{row.tag}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{row.modal}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{row.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Azure Services + NER Stats */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Azure Services */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">Az</span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Azure Services Used</h3>
            </div>
            <ul className="space-y-2">
              {datasetInfo.azureServices.map((svc) => (
                <li key={svc} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-slate-600">{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NLP Entity Extraction */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-violet-600" />
              <h3 className="font-bold text-slate-800 text-sm">NER Entity Counts</h3>
            </div>
            <div className="space-y-3">
              {nlpEntityStats.map((e) => (
                <div key={e.entity}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">{e.entity}</span>
                    <span className="text-slate-500">{(e.count / 1e6).toFixed(2)}M</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-400"
                      style={{ width: `${(e.count / 2200000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-processing steps */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-800 text-sm">Pre-processing Pipeline</h3>
            </div>
            <ol className="space-y-1.5 list-none">
              {[
                "De-identification (Safe Harbor HIPAA)",
                "Text normalization & lowercasing",
                "Medical abbreviation expansion",
                "SNOMED-CT concept linking",
                "GPT-4 section segmentation",
                "text-embedding-3-large (1,536-D)",
                "PCA → UMAP dimensionality reduction",
                "Z-score normalization for numeric features",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
