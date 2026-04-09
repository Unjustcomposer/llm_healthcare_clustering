import { motion } from "framer-motion";
import { algorithmComparison, clusterProfiles, nlpEntityStats } from "../data/healthcareData";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function ResultsSection() {
  const bestAlgo = algorithmComparison.reduce((a, b) => a.silhouette > b.silhouette ? a : b);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">Quantitative Results</h2>
        <p className="text-slate-500 text-sm mt-1">
          Comprehensive evaluation metrics across all clustering methods and clinical outcome measures
        </p>
      </div>

      <div className="space-y-6">
        {/* Algorithm Results Table */}
        <motion.div
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">Clustering Algorithm Performance Comparison</h3>
            <p className="text-xs text-slate-500 mt-0.5">All methods evaluated on identical train/validation split (80/20) · Best scores highlighted</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 w-56">Method</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Silhouette ↑</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">NMI ↑</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">ARI ↑</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Purity ↑</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Time (min)</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {algorithmComparison.map((row, i) => {
                  const isBest = row.method === bestAlgo.method;
                  return (
                    <tr
                      key={row.method}
                      className={`hover:bg-slate-50 transition-colors ${isBest ? "bg-indigo-50 border-l-4 border-l-indigo-500" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-800 text-xs">
                        <div className="flex items-center gap-2">
                          {isBest && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                          {row.method}
                          {isBest && <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">BEST</span>}
                        </div>
                      </td>
                      <ScoreCell value={row.silhouette} best={Math.max(...algorithmComparison.map(a => a.silhouette))} decimals={3} />
                      <ScoreCell value={row.nmi} best={Math.max(...algorithmComparison.map(a => a.nmi))} decimals={3} />
                      <ScoreCell value={row.ari} best={Math.max(...algorithmComparison.map(a => a.ari))} decimals={3} />
                      <ScoreCell value={row.purity} best={Math.max(...algorithmComparison.map(a => a.purity))} decimals={3} />
                      <td className="px-4 py-3 text-center text-xs text-slate-600">{row.time}</td>
                      <td className="px-4 py-3 text-center text-xs font-bold text-slate-700">#{i + 1}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Cluster Metrics Table */}
        <motion.div
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">Per-Cluster Clinical Metrics</h3>
            <p className="text-xs text-slate-500 mt-0.5">Clinical validity metrics for each discovered patient segment</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Cluster</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">N</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">% Cohort</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Avg Age</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Mortality %</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Readmit %</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Avg LOS</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Silhouette</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Sem. Coherence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {clusterProfiles.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: c.color }} />
                      <span className="text-xs font-bold text-slate-700">{c.label}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs font-medium text-slate-800">{c.name}</td>
                    <td className="px-4 py-2.5 text-center text-xs text-slate-600">{c.size.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-center text-xs text-slate-600">{c.pct}%</td>
                    <td className="px-4 py-2.5 text-center text-xs text-slate-600">{c.avgAge}</td>
                    <RiskCell value={c.mortality} thresholdHigh={25} thresholdMed={10} />
                    <RiskCell value={c.readmission} thresholdHigh={40} thresholdMed={20} />
                    <td className="px-4 py-2.5 text-center text-xs text-slate-600">{c.los}d</td>
                    <td className="px-4 py-2.5 text-center text-xs font-semibold text-indigo-700">{c.silhouette.toFixed(2)}</td>
                    <td className="px-4 py-2.5 text-center text-xs font-semibold text-violet-700">{c.semanticCoherence.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* NLP NER Results */}
        <motion.div
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">Azure Cognitive Services — Clinical NER Results</h3>
            <p className="text-xs text-slate-500 mt-0.5">Named Entity Recognition performance on 2.08M clinical notes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Entity Type</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Entities Extracted</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Precision</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Recall</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">F1-Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {nlpEntityStats.map((e) => {
                  const f1 = 2 * e.precision * e.recall / (e.precision + e.recall);
                  return (
                    <tr key={e.entity} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2.5 text-xs font-medium text-slate-800">{e.entity}</td>
                      <td className="px-4 py-2.5 text-center text-xs text-slate-600">{(e.count / 1e6).toFixed(2)}M</td>
                      <td className="px-4 py-2.5 text-center text-xs font-semibold text-emerald-700">{(e.precision * 100).toFixed(1)}%</td>
                      <td className="px-4 py-2.5 text-center text-xs font-semibold text-blue-700">{(e.recall * 100).toFixed(1)}%</td>
                      <td className="px-4 py-2.5 text-center text-xs font-semibold text-violet-700">{(f1 * 100).toFixed(1)}%</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden max-w-24">
                            <div className="h-full rounded-full bg-emerald-400" style={{ width: `${f1 * 100}%` }} />
                          </div>
                          {f1 > 0.9 ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : f1 > 0.85 ? (
                            <Info className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key findings (muted, concise) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            {
              title: "Best configuration",
              content: "K‑Means on 1,536‑D Azure embeddings produced the strongest clustering (Silhouette=0.72; NMI=0.74; ARI=0.70).",
            },
            {
              title: "Embedding utility",
              content: "Dense LLM embeddings capture clinical semantics (comorbidities, medication context) and improve semantic coherence versus TF‑IDF baselines.",
            },
            {
              title: "Clinical associations",
              content: "Cluster membership is significantly associated with mortality, readmission, and LOS (adjusted models, p<0.01).",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.content}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ScoreCell({ value, best, decimals }: { value: number; best: number; decimals: number }) {
  const isBest = value === best;
  return (
    <td className={`px-4 py-3 text-center text-xs font-semibold ${isBest ? "text-indigo-700" : "text-slate-600"}`}>
      {value.toFixed(decimals)}
    </td>
  );
}

function RiskCell({ value, thresholdHigh, thresholdMed }: { value: number; thresholdHigh: number; thresholdMed: number }) {
  const color = value >= thresholdHigh ? "text-red-700" : value >= thresholdMed ? "text-amber-700" : "text-slate-700";
  return (
    <td className={`px-4 py-2.5 text-center text-xs font-semibold ${color}`}>
      {value}%
    </td>
  );
}
