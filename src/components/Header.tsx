import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Psychiatric Phenotyping Study</h1>
          <p className="mt-2 text-slate-200 max-w-3xl text-sm">
            Semantic clustering of clinical narratives to identify reproducible patient subphenotypes associated with
            readmission risk. Clinician validation and a pragmatic path to prospective evaluation are provided.
          </p>
        </motion.div>

        <motion.div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <div className="bg-white/5 rounded-md px-4 py-3 text-center">
            <div className="text-sm font-medium text-slate-200">Study N</div>
            <div className="mt-1 text-lg font-semibold">3,847</div>
          </div>
          <div className="bg-white/5 rounded-md px-4 py-3 text-center">
            <div className="text-sm font-medium text-slate-200">30-day readmission</div>
            <div className="mt-1 text-lg font-semibold">52.3%</div>
          </div>
          <div className="bg-white/5 rounded-md px-4 py-3 text-center">
            <div className="text-sm font-medium text-slate-200">Phenotypes</div>
            <div className="mt-1 text-lg font-semibold">4</div>
          </div>
          <div className="bg-white/5 rounded-md px-4 py-3 text-center">
            <div className="text-sm font-medium text-slate-200">Clinician raters</div>
            <div className="mt-1 text-lg font-semibold">8</div>
          </div>
        </motion.div>

        <motion.div className="mt-6 text-sm text-slate-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <div>Data: Synthetic cohort modeled on MIMIC-III (proposed prospective validation).</div>
          <div className="mt-1">Inter-rater agreement (Fleiss' κ): 0.76 — substantial agreement.</div>
        </motion.div>
      </div>
    </header>
  );
}
