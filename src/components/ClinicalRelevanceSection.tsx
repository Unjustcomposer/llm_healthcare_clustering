import { motion } from "framer-motion";
import { Heart, AlertTriangle, Stethoscope, TrendingUp, Shield, Lightbulb } from "lucide-react";
import { clusterProfiles } from "../data/healthcareData";

const clinicalInsights = [
  {
    cluster: clusterProfiles[0],
    insight: "High-risk cardio-metabolic patients (Cluster 0) show 34.1% 30-day readmission, strongly suggesting need for structured discharge planning, HF clinics, and remote monitoring programs.",
    recommendation: "Implement Azure Health Bot for post-discharge follow-up; enroll in cardiac rehab; intensify glycemic control.",
    impact: "Estimated 18% readmission reduction with targeted intervention protocol.",
    icon: Heart,
    urgency: "HIGH",
  },
  {
    cluster: clusterProfiles[1],
    insight: "Sepsis/Critical Care cluster (Cluster 1) has 38.7% mortality and 14.2-day LOS — highest acuity segment. Rapid identification at admission could trigger early sepsis bundles.",
    recommendation: "Deploy real-time LLM scoring at ED triage using Azure OpenAI; auto-alert ICU intensivist when probability > 0.75.",
    impact: "Every 1-hour reduction in antibiotic delay reduces mortality by ~7%.",
    icon: AlertTriangle,
    urgency: "CRITICAL",
  },
  {
    cluster: clusterProfiles[2],
    insight: "Neuro-Cognitive cluster (Cluster 2) has highest readmission rate (41.2%) driven by caregiver burden, falls, and medication non-adherence despite lower acute mortality.",
    recommendation: "Social determinants screening; caregiver support programs; memory clinic referrals; smart pill dispensers.",
    impact: "Cognitive care coordination reduces readmissions by 23% per CMMI pilot data.",
    icon: Stethoscope,
    urgency: "HIGH",
  },
  {
    cluster: clusterProfiles[5],
    insight: "Psychiatric/Substance Use cluster (Cluster 5) has 52.3% readmission — the highest across all segments — with youngest mean age (42.7). Primarily driven by social determinants.",
    recommendation: "Integrated behavioral health referral; peer support specialists; MAT (medication-assisted treatment) for SUD; housing-first approaches.",
    impact: "Integrated care models show 35-45% reduction in ED revisits for psychiatric patients.",
    icon: TrendingUp,
    urgency: "HIGH",
  },
  {
    cluster: clusterProfiles[4],
    insight: "Post-Surgical cluster (Cluster 4) shows lowest mortality (5.1%) and best clustering quality (Silhouette 0.82). Homogeneous group — predictable resource needs.",
    recommendation: "Enhanced recovery after surgery (ERAS) protocols; prehabilitation programs; same-day surgery optimization.",
    impact: "ERAS protocols reduce LOS by 1.2 days and complications by 40%.",
    icon: Shield,
    urgency: "LOW",
  },
  {
    cluster: clusterProfiles[3],
    insight: "Pulmonary/Oncology cluster (Cluster 3) reflects complex cancer + COPD comorbidity. 27.8% mortality and 37.6% readmission suggest palliative care needs are unmet.",
    recommendation: "Integrated palliative care consult at diagnosis; pulmonary rehab; tumor board coordination; advance directive discussions.",
    impact: "Early palliative integration reduces ICU utilization by 30% and improves QoL scores.",
    icon: Lightbulb,
    urgency: "MEDIUM",
  },
];

export default function ClinicalRelevanceSection() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">Clinical Relevance & Actionability</h2>
        <p className="text-slate-500 text-sm mt-1">
          Translating cluster insights into evidence-based clinical interventions and care pathway recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {clinicalInsights.map((item, idx) => {
          const Icon = item.icon;
          const urgencyColor = {
            CRITICAL: "bg-red-100 text-red-700 border-red-200",
            HIGH: "bg-amber-100 text-amber-700 border-amber-200",
            MEDIUM: "bg-blue-100 text-blue-700 border-blue-200",
            LOW: "bg-emerald-100 text-emerald-700 border-emerald-200",
          }[item.urgency]!;

          return (
            <motion.div
              key={item.cluster.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
            >
              <div className="h-1" style={{ backgroundColor: item.cluster.color }} />
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.cluster.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: item.cluster.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.cluster.name}</p>
                      <p className="text-xs text-slate-500">{item.cluster.label} · N={item.cluster.size.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${urgencyColor}`}>
                    {item.urgency}
                  </span>
                </div>

                {/* Insight */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Clinical Insight</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{item.insight}</p>
                </div>

                {/* Recommendation */}
                <div className="mb-3 rounded-lg border border-slate-100 p-3 bg-white">
                  <p className="text-xs font-semibold text-slate-600 mb-1">Recommendation</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.recommendation}</p>
                </div>

                {/* Impact */}
                <div className="rounded-lg border border-slate-100 p-2.5 bg-white">
                  <p className="text-xs font-semibold text-slate-600">Projected impact</p>
                  <p className="text-sm text-slate-700 mt-0.5">{item.impact}</p>
                </div>

                {/* Mini metrics */}
                <div className="mt-3 flex gap-3">
                  <span className="text-xs text-slate-500">Mortality: <strong className="text-red-600">{item.cluster.mortality}%</strong></span>
                  <span className="text-xs text-slate-500">Readmit: <strong className="text-amber-600">{item.cluster.readmission}%</strong></span>
                  <span className="text-xs text-slate-500">LOS: <strong className="text-blue-600">{item.cluster.los}d</strong></span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* System-level recommendations (concise, neutral) */}
      <motion.div
        className="mt-5 rounded-2xl border border-slate-200 bg-white p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="font-semibold text-slate-800 mb-4">System-level deployment recommendations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Real-time triage scoring",
              desc: "Expose a lightweight inference endpoint to assign cluster membership and risk score at time of note capture.",
            },
            {
              title: "Predictive readmission alerts",
              desc: "Integrate model outputs with care-management workflows to trigger targeted follow-up for high-risk clusters.",
            },
            {
              title: "Personalized care plans",
              desc: "Generate cluster-specific discharge instructions to reduce variation and omission errors.",
            },
            {
              title: "Population health analytics",
              desc: "Dashboard cluster trends and intervention effectiveness for operational oversight.",
            },
            {
              title: "Continuous learning pipeline",
              desc: "Schedule periodic retraining when embedding drift or outcome degradation is detected.",
            },
            {
              title: "Responsible AI governance",
              desc: "Monitor fairness metrics and maintain audit logs for clinical deployment decisions.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-white border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-800 mb-1">{item.title}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
