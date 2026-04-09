import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Lightbulb, Target, TrendingUp, BookOpen } from "lucide-react";
import { limitationsAndNextSteps, publicationStrategy } from "../data/psychiatricResearchData";

export default function LimitationsAndScalingSection() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("phase1");

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Limitations, Scaling Roadmap & Publication Strategy</h2>
        <p className="text-slate-500 text-sm mt-1">
          Honest assessment of constraints and path to validation, deployment, and impact
        </p>
      </div>

      {/* Limitations: Synthetic Data & Validation */}
      <motion.div
        className="rounded-2xl border border-red-200 bg-red-50 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-6 py-4 border-b border-red-200 bg-red-100">
          <h3 className="font-bold text-red-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Key Limitations (Honest Assessment)
          </h3>
          <p className="text-xs text-red-800 mt-1">If we're being transparent for publication:</p>
        </div>

        <div className="p-6 space-y-4">
          {limitationsAndNextSteps.limitationsSynthetic.map((item, i) => (
            <div key={i} className="border border-red-200 rounded-lg p-4 bg-white">
              <div className="flex gap-3 items-start mb-2">
                <span className="text-red-600 font-bold flex-shrink-0 w-6">{i + 1}.</span>
                <div className="flex-1">
                  <p className="font-semibold text-red-900">{item.limitation}</p>
                  <p className="text-xs text-red-800 mt-1">
                    <strong>Impact:</strong> {item.impact}
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    <strong>Evidence Gap:</strong> {item.evidence_gap}
                  </p>
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                    <p className="text-xs text-green-800">
                      <strong>Mitigation:</strong> {item.mitigation_proposed}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scaling Roadmap */}
      <motion.div
        className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-slate-600" />
            Scaling Roadmap: From Study to Deployment (24–36 months)
          </h3>
        </div>

        <div className="p-6 space-y-3">
          {Object.entries(limitationsAndNextSteps.scalingRoadmap).map(([phaseKey, items]) => {
            const phaseLabel = {
              phase1_immediate: "Phase 1: Immediate (0–3 months) – Publication & Open-source",
              phase2_near_term: "Phase 2: Near-term (3–9 months) – Real Data Validation",
              phase3_medium_term: "Phase 3: Medium-term (9–18 months) – Clinical Trial",
              phase4_long_term: "Phase 4: Long-term (18–36 months) – Implementation Scale",
            }[phaseKey] || phaseKey;

            return (
              <div key={phaseKey}>
                <button
                  onClick={() => setExpandedPhase(expandedPhase === phaseKey ? null : phaseKey)}
                  className="w-full text-left p-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-lg border border-indigo-200 transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{phaseLabel}</p>
                  </div>
                  {expandedPhase === phaseKey ? (
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {expandedPhase === phaseKey && (
                  <div className="mt-2 ml-4 p-4 border-l-4 border-indigo-300 space-y-2">
                    {(items as string[]).map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Funding */}
        <div className="px-6 py-4 bg-amber-50 border-t border-amber-200">
          <h4 className="font-semibold text-amber-900 text-sm mb-2">Potential Funding Sources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {limitationsAndNextSteps.fundingOpportunities.map((fund, i) => (
              <div key={i} className="text-xs text-amber-800 flex gap-2">
                <span>→</span>
                <span>{fund}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Publication Strategy */}
      <motion.div
        className="rounded-2xl border border-blue-200 bg-blue-50 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="px-6 py-4 border-b border-blue-200 bg-blue-100">
          <h3 className="font-bold text-blue-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Publication Strategy & Expected Impact
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Primary Venue */}
          <div>
            <div className="mb-3 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border border-blue-300">
              <div className="font-semibold text-blue-900 mb-1">🎯 Primary Submission Target</div>
              <div className="text-sm text-blue-800">
                <p className="font-medium">{publicationStrategy.primary.venue}</p>
                <p className="text-xs mt-1 italic">"{publicationStrategy.primary.title}"</p>
                <div className="mt-2 text-xs space-y-1">
                  <p>
                    <strong>Novelty:</strong> {publicationStrategy.primary.novelty}
                  </p>
                  <p>
                    <strong>Significance:</strong> {publicationStrategy.primary.significance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Venues */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Alternative Venues (if rejected from primary)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {publicationStrategy.secondary.map((alt, i) => (
                <div key={i} className="border border-blue-200 rounded-lg p-3 bg-white">
                  <p className="font-medium text-blue-900 text-sm">{alt.venue}</p>
                  <p className="text-xs text-slate-600 mt-1">Angle: {alt.angle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Expected Career & Research Impact
            </h4>
            <p className="text-sm text-green-800">{publicationStrategy.expectedImpact}</p>
          </div>
        </div>
      </motion.div>

      {/* Executive Summary */}
      <motion.div
        className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="font-bold text-slate-900 mb-3">Executive Summary</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            • The study identifies four reproducible psychiatric subphenotypes associated with distinct readmission drivers and
            intervention needs.
          </p>
          <p>
            • Method comparison shows improved predictive performance (C-statistic ≈ 0.77) relative to conventional triage scores (≈ 0.64).
          </p>
          <p>
            • Clinician validation (n = 8 reviewers, Fleiss' κ = 0.76) indicates substantial agreement and practical interpretability of
            phenotype assignments.
          </p>
          <p>
            • Key limitations include synthetic dataset provenance and limited prospective validation; a clear roadmap is provided for
            IRB-approved real-world evaluation and pragmatic trials.
          </p>
          <p>
            • Publication targets and funding pathways are identified to support next-stage validation and implementation.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
