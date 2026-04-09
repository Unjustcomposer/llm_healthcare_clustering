import { motion } from "framer-motion";
import { clusterProfiles } from "../data/healthcareData";
import { Users, TrendingUp, Clock, Activity } from "lucide-react";

export default function ClusterCards() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">Patient Cluster Profiles</h2>
        <p className="text-slate-500 text-sm mt-1">
          Seven clinically meaningful patient segments discovered by K-Means (k=7) on Azure OpenAI 1,536-D embeddings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {clusterProfiles.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: idx * 0.07 }}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Color bar */}
            <div className="h-1.5 w-full" style={{ backgroundColor: c.color }} />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block text-xs text-slate-600 px-2 py-0.5 rounded border" style={{ borderColor: c.color }}>
                    {c.label}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-800 leading-tight">{c.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900">{c.pct}%</p>
                  <p className="text-xs text-slate-400">of cohort</p>
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <MetricBadge icon={<Users className="w-3 h-3" />} label="Patients" value={c.size.toLocaleString()} color={c.color} />
                <MetricBadge icon={<Activity className="w-3 h-3" />} label="Mortality" value={`${c.mortality}%`} color={c.color} />
                <MetricBadge icon={<TrendingUp className="w-3 h-3" />} label="Readmit" value={`${c.readmission}%`} color={c.color} />
                <MetricBadge icon={<Clock className="w-3 h-3" />} label="Avg LOS" value={`${c.los}d`} color={c.color} />
              </div>

              {/* Quality scores */}
              <div className="space-y-1.5 mb-4">
                <QualityBar label="Silhouette" value={c.silhouette} color={c.color} />
                <QualityBar label="Semantic Coherence" value={c.semanticCoherence} color={c.color} />
              </div>

              {/* Top diagnoses */}
              <div className="mb-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Top Diagnoses</p>
                <div className="flex flex-wrap gap-1">
                  {c.topDx.slice(0, 3).map((dx) => (
                    <span key={dx} className="text-xs bg-slate-100 text-slate-600 rounded px-1.5 py-0.5">
                      {dx}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top meds */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Top Medications</p>
                <div className="flex flex-wrap gap-1">
                  {c.topMeds.slice(0, 3).map((med) => (
                    <span key={med} className="text-xs bg-blue-50 text-blue-700 rounded px-1.5 py-0.5">
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Summary card (neutral) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.56 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-center"
        >
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Clustering quality summary</h3>
          <div className="space-y-2">
            {[
              { label: "Avg silhouette", value: "0.72" },
              { label: "Best NMI", value: "0.74" },
              { label: "Best ARI", value: "0.70" },
              { label: "Avg purity", value: "0.78" },
              { label: "Davies–Bouldin", value: "0.48" },
              { label: "Calinski–Harabasz", value: "2,847" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-xs text-slate-600">{item.label}</span>
                <span className="text-sm font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricBadge({
  icon, label, value, color,
}: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-slate-100 px-2 py-1.5 flex flex-col bg-white">
      <div className="flex items-center gap-1 mb-0.5 text-slate-500">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function QualityBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-slate-500">{label}</span>
        <span className="font-semibold text-slate-700">{value.toFixed(2)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
