import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import MethodologyComparisonSection from "./components/MethodologyComparisonSection";
import ClinicianValidationSection from "./components/ClinicianValidationSection";
import LimitationsAndScalingSection from "./components/LimitationsAndScalingSection";
import { CheckCircle2, Beaker, Users, AlertTriangle, BookOpen, ChevronUp } from "lucide-react";

const TABS = [
  { id: "overview", label: "Research Overview", icon: BookOpen },
  { id: "methodology", label: "Methodology", icon: Beaker },
  { id: "validation", label: "Clinician Validation", icon: Users },
  { id: "limitations", label: "Limitations & Scaling", icon: AlertTriangle },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop(e.currentTarget.scrollTop > 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" onScroll={handleScroll}>
      {/* Header */}
      <Header />

      {/* Sticky Tab Nav */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <nav className="flex gap-0.5 py-1.5 min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 space-y-12">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Title & Abstract */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    Hidden Heterogeneity in High-Readmission Psychiatric Populations
                  </h1>
                  <p className="text-lg text-slate-600">
                    An LLM-Augmented Semantic Clustering Approach to Reveal Distinct Care Pathways
                  </p>
                </div>

                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 space-y-3">
                  <h2 className="font-bold text-slate-900">Research Question</h2>
                  <p className="text-sm text-slate-700">
                    Conventional psychiatric readmission risk scores (GAF, AUDIT-C, PHQ-9) treat psychiatric + substance use disorder cohorts as monolithic. 
                    <strong> Do LLM-derived semantic embeddings of clinical notes reveal distinct subphenotypes with different drivers of readmission?</strong>
                  </p>
                </div>
              </div>

              {/* Key Findings Cards */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Findings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "4 Distinct Phenotypes Identified",
                      subtitle: "Housing-Insecure | Treatment-Resistant | Substance-Driven | Chronic Stable",
                      stat: "22–32% per subgroup",
                      detail: "Different readmission drivers, different interventions",
                      icon: "🔬",
                    },
                    {
                      title: "Superior Predictive Performance",
                      subtitle: "vs. Rule-Based Triage",
                      stat: "C-stat: 0.77 vs 0.64",
                      detail: "+21% improvement in readmission prediction",
                      icon: "📈",
                    },
                    {
                      title: "Strong Clinician Validation",
                      subtitle: "Inter-Rater Reliability",
                      stat: "κ = 0.76 (Substantial)",
                      detail: "Phenotypes clinically meaningful & reproducible",
                      icon: "✓",
                    },
                    {
                      title: "Actionable Insights",
                      subtitle: "Precision Mental Health",
                      stat: "Different Rx per phenotype",
                      detail: "Housing + case mgmt vs. integrated care vs. MAT",
                      icon: "💡",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-2xl mb-2">{card.icon}</div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{card.title}</h3>
                      <p className="text-xs text-slate-600 mb-2">{card.subtitle}</p>
                      <p className="text-lg font-bold text-indigo-600 mb-1">{card.stat}</p>
                      <p className="text-xs text-slate-700">{card.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Study Population & Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-bold text-slate-900 mb-4">Study Population</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2"><span className="text-indigo-600">→</span> <strong>N = 3,847</strong> psychiatric admissions</li>
                    <li className="flex gap-2"><span className="text-indigo-600">→</span> Ages 18–65; mean 42.7 years</li>
                    <li className="flex gap-2"><span className="text-indigo-600">→</span> <strong>52.3% readmitted within 30 days</strong></li>
                    <li className="flex gap-2"><span className="text-indigo-600">→</span> Primary Dx: MDD, Schizophrenia, AUD, OUD</li>
                    <li className="flex gap-2"><span className="text-indigo-600">→</span> <em>Synthetic cohort modeled on MIMIC-III</em></li>
                  </ul>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-bold text-slate-900 mb-4">Methods</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2"><span className="text-indigo-600">→</span> <strong>Text Embeddings:</strong> text-embedding-3-large (1536-D)</li>
                    <li className="flex gap-2"><span className="text-indigo-600">→</span> <strong>Clustering:</strong> K-Means (k=4, unsupervised)</li>
                    <li className="flex gap-2"><span className="text-indigo-606">→</span> <strong>Validation:</strong> 8-clinician inter-rater agreement</li>
                    <li className="flex gap-2"><span className="text-indigo-606">→</span> <strong>Performance:</strong> Silhouette, C-statistic, clinical review</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "methodology" && (
            <motion.div
              key="methodology"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MethodologyComparisonSection />
            </motion.div>
          )}

          {activeTab === "validation" && (
            <motion.div
              key="validation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ClinicianValidationSection />
            </motion.div>
          )}

          {activeTab === "limitations" && (
            <motion.div
              key="limitations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LimitationsAndScalingSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors z-50"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
