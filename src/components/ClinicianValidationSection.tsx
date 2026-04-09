import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Users, MessageSquare } from "lucide-react";
import { clinicianValidationData } from "../data/psychiatricResearchData";

export default function ClinicianValidationSection() {
  const data = clinicianValidationData.results;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Clinician validation & inter-rater reliability</h2>
        <p className="text-slate-500 text-sm mt-1">Independent review by eight clinicians across psychiatric specialties.</p>
      </div>

      <motion.div
        className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-slate-600" />
            <h3 className="font-medium text-slate-800">Validation protocol</h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">127 de-identified cases; reviewers assigned one of four phenotypes and rated confidence (1–5).</p>
        </div>

        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">Case selection</p>
            <p className="text-xs text-slate-600 mt-1">Stratified sample of acute psychiatric admissions with representative comorbidity mix.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Reviewer task</p>
            <p className="text-xs text-slate-600 mt-1">Assign phenotype, rate confidence, provide optional comment.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Analysis</p>
            <p className="text-xs text-slate-600 mt-1">Fleiss’ κ for multi-rater agreement; pairwise confusion and phenotype-level agreement.</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase">Fleiss’ κ</p>
          <p className="text-3xl font-semibold text-slate-800 mt-2">{data.interRaterReliability.fleissKappa.toFixed(2)}</p>
          <p className="text-xs text-slate-600 mt-1">Interpretation: substantial agreement</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase">Cronbach’s α</p>
          <p className="text-3xl font-semibold text-slate-800 mt-2">{data.interRaterReliability.cronbachsAlpha.toFixed(2)}</p>
          <p className="text-xs text-slate-600 mt-1">Good internal consistency across reviewer ratings</p>
        </div>
      </motion.div>

      <motion.div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16 }}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-medium text-slate-800">Pairwise agreement</h3>
          <p className="text-xs text-slate-500 mt-0.5">Pairwise κ values and percent agreement highlighting common phenotype confusions.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {data.pairwiseKappas.map((row, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-800">{row.pair}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 rounded-full" style={{ width: `${row.agreement_pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-slate-800">{row.agreement_pct}%</span>
                </div>
                <span className="text-xs text-slate-600 w-12 text-right">κ = {row.kappa.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-medium text-slate-800">Agreement by phenotype</h3>
        </div>
        <div className="p-6 space-y-3">
          {data.agreementByPhenotype.map((p, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800">{p.phenotype}</p>
                <span className="text-xs text-slate-500">{Math.round(p.agreement * 100)}%</span>
              </div>
              <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: `${p.agreement * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.32 }}>
        <div className="flex gap-3">
          <MessageSquare className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-slate-800">Representative clinician feedback</h4>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              {data.sampleReviewComments.map((c, i) => (
                <div key={i}>
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-800">{c.phenotype}</strong> — {c.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
