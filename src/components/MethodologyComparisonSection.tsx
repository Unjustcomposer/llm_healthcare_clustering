import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { methodologyComparison, comparisonResults } from "../data/psychiatricResearchData";

export default function MethodologyComparisonSection() {
  const [expandedTab, setExpandedTab] = useState<"rule" | "llm" | null>("rule");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Methodology</h2>
        <p className="text-slate-500 text-sm mt-1">Comparison of conventional triage (rule-based) and LLM-augmented semantic clustering.</p>
      </div>

      <div className="space-y-4">
        <motion.div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <button onClick={() => setExpandedTab(expandedTab === "rule" ? null : "rule")} className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200">
            <div className="text-left">
              <h3 className="font-medium text-slate-900">Conventional Rule-Based Triage</h3>
              <p className="text-xs text-slate-600 mt-0.5">GAF, AUDIT-C, PHQ-9 and structured flags commonly used in practice.</p>
            </div>
            {expandedTab === "rule" ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
          </button>

          {expandedTab === "rule" && (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Inputs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {methodologyComparison.ruleBasedApproach.inputs.map((input, i) => (
                    <div key={i} className="flex gap-2 p-2 bg-slate-50 rounded">
                      <span className="text-xs text-slate-500">{input}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-3">Outputs</h4>
                <div className="space-y-3">
                  {methodologyComparison.ruleBasedApproach.outputSegments.map((seg, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{seg.name}</p>
                          <p className="text-xs text-slate-600 mt-0.5">{seg.criteria}</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{seg.readmission30d}%</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-2">{seg.pctOfCohort}% of cohort — {seg.notes}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
          <button onClick={() => setExpandedTab(expandedTab === "llm" ? null : "llm")} className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200">
            <div className="text-left">
              <h3 className="font-medium text-slate-900">LLM-Augmented Semantic Clustering</h3>
              <p className="text-xs text-slate-600 mt-0.5">text-embedding-3-large embeddings + clustering on pooled structured/text features.</p>
            </div>
            {expandedTab === "llm" ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
          </button>

          {expandedTab === "llm" && (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Inputs</h4>
                <div className="space-y-2">
                  {methodologyComparison.llmAugmentedApproach.inputs.map((input, i) => (
                    <div key={i} className="flex gap-2 p-2 bg-slate-50 rounded">
                      <span className="text-xs text-slate-600">{input}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-3">Phenotypes</h4>
                <div className="grid grid-cols-1 gap-4">
                  {methodologyComparison.llmAugmentedApproach.outputSegments.map((pheno, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{pheno.name}</p>
                          <p className="text-xs text-slate-600 mt-0.5">{pheno.description}</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{pheno.readmission30d}%</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-2">{pheno.pctOfCohort}% — silhouette {pheno.silhouetteScore}</div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs font-medium text-slate-700 mb-2">Top themes</p>
                        <ul className="text-xs text-slate-700 space-y-1">{pheno.topThemes.slice(0, 3).map((t, j) => <li key={j}>• {t}</li>)}</ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-medium text-slate-800">Performance Comparison</h3>
          <p className="text-xs text-slate-500 mt-0.5">Evaluated on an 80/20 split; metrics shown for comparison.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Method</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Silhouette</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Noise</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">C-Stat</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Clinical relevance</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Interpretability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {comparisonResults.map((row, i) => (
                <tr key={row.method} className={`hover:bg-slate-50 transition-colors ${i === 3 ? "bg-slate-50" : ""}`}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.method}</td>
                  <td className="px-4 py-3 text-center">{row.silhouette.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center text-xs text-slate-700">{row.singletonNoise}</td>
                  <td className="px-4 py-3 text-center text-xs font-bold text-slate-800">{row.cStatistic.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center text-xs">{row.clinicalRelevance}</td>
                  <td className="px-4 py-3 text-center text-xs">{row.interpretability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-white border-t border-slate-100">
          <p className="text-xs text-slate-700">Selected approach: text-embedding-3-large + K-Means (best balance of cluster quality and interpretability).</p>
        </div>
      </motion.div>
    </section>
  );
}
