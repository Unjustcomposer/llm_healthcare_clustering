/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, Cell, PieChart, Pie,
} from "recharts";
import { motion } from "framer-motion";
import {
  silhouetteData, elbowData, trainingHistory, algorithmComparison,
  clinicalOutcomes, umapPoints, admissionTrend, featureImportance,
  nlpEntityStats, clusterProfiles,
} from "../data/healthcareData";

const CARD = "rounded-2xl border border-slate-200 bg-white shadow-sm p-5";

function ChartTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── 1. Silhouette Score vs K ────────────────────────────────────────────────
export function SilhouetteChart() {
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ChartTitle
        title="Silhouette Score vs. Number of Clusters (K)"
        subtitle="Optimal K=7 maximizes silhouette — Azure ML AutoML sweep"
      />
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={silhouetteData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="k" label={{ value: "K (clusters)", position: "insideBottom", offset: -2, fontSize: 11 }} tick={{ fontSize: 11 }} />
          <YAxis domain={[0.35, 0.8]} tickFormatter={(v) => v.toFixed(2)} tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(v: any) => [Number(v).toFixed(3), "Silhouette"]}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <ReferenceLine x={7} stroke="#6366f1" strokeDasharray="4 4" label={{ value: "Optimal K=7", fill: "#6366f1", fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#6366f1" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 2. Elbow Method ─────────────────────────────────────────────────────────
export function ElbowChart() {
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <ChartTitle
        title="Elbow Method — Within-Cluster Inertia"
        subtitle="Inertia decreases sharply up to K=7 then plateaus"
      />
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={elbowData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="k" label={{ value: "K (clusters)", position: "insideBottom", offset: -2, fontSize: 11 }} tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(v: any) => [Number(v).toLocaleString(), "Inertia"]}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <ReferenceLine x={7} stroke="#f97316" strokeDasharray="4 4" label={{ value: "Elbow", fill: "#f97316", fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="inertia"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#f97316" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 3. Training History ──────────────────────────────────────────────────────
export function TrainingHistoryChart() {
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
    >
      <ChartTitle
        title="Model Training History — Loss & Accuracy"
        subtitle="Azure ML Compute (Standard_NC6s_v3 GPU) · 50 Epochs"
      />
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={trainingHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="epoch" label={{ value: "Epoch", position: "insideBottom", offset: -2, fontSize: 11 }} tick={{ fontSize: 11 }} />
          <YAxis yAxisId="loss" orientation="left" tick={{ fontSize: 11 }} domain={[0, 3]} label={{ value: "Loss", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <YAxis yAxisId="acc" orientation="right" domain={[0, 1]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any, name: any) =>
            name === "accuracy" || name === "f1"
              ? [`${(Number(v) * 100).toFixed(1)}%`, name]
              : [Number(v).toFixed(3), name]
          } />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line yAxisId="loss" type="monotone" dataKey="trainLoss" stroke="#ef4444" strokeWidth={2} dot={false} name="Train Loss" />
          <Line yAxisId="loss" type="monotone" dataKey="valLoss" stroke="#f97316" strokeWidth={2} dot={false} name="Val Loss" strokeDasharray="5 5" />
          <Line yAxisId="acc" type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} dot={false} name="accuracy" />
          <Line yAxisId="acc" type="monotone" dataKey="f1" stroke="#6366f1" strokeWidth={2} dot={false} name="f1" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 4. Algorithm Comparison Bar Chart ───────────────────────────────────────
export function AlgorithmComparisonChart() {
  return (
    <motion.div
      className={`${CARD} col-span-1 lg:col-span-2`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16 }}
    >
      <ChartTitle
        title="Clustering Algorithm Comparison"
        subtitle="K-Means + Azure text-embedding-3-large achieves best overall performance"
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={algorithmComparison} margin={{ left: 0, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="method" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={60} />
          <YAxis domain={[0, 1]} tickFormatter={(v) => v.toFixed(1)} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => Number(v).toFixed(3)} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="silhouette" name="Silhouette" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="nmi" name="NMI" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ari" name="ARI" fill="#f97316" radius={[4, 4, 0, 0]} />
          <Bar dataKey="purity" name="Purity" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 5. Clinical Outcomes by Cluster ─────────────────────────────────────────
export function ClinicalOutcomesChart() {
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ChartTitle
        title="Clinical Outcomes by Cluster"
        subtitle="Mortality & readmission rates per segment"
      />
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={clinicalOutcomes} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 60]} tickFormatter={(v) => `${v}%`} />
          <YAxis dataKey="cluster" type="category" tick={{ fontSize: 9 }} width={100} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => `${Number(v)}%`} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="mortality" name="Mortality %" radius={[0, 4, 4, 0]}>
            {clinicalOutcomes.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="readmission" name="Readmission %" fill="#94a3b8" radius={[0, 4, 4, 0]} opacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 6. UMAP Scatter (Cluster Visualization) ─────────────────────────────────
export function UMAPScatterChart() {
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.24 }}
    >
      <ChartTitle
        title="UMAP 2D Projection — Patient Embeddings"
        subtitle="1,536-D GPT-4 embeddings reduced to 2D via UMAP (n_neighbors=15, min_dist=0.1)"
      />
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="x" type="number" name="UMAP-1" domain={[-7, 7]} tick={{ fontSize: 10 }} label={{ value: "UMAP-1", position: "insideBottom", offset: -5, fontSize: 11 }} />
          <YAxis dataKey="y" type="number" name="UMAP-2" domain={[-7, 7]} tick={{ fontSize: 10 }} label={{ value: "UMAP-2", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            content={({ payload }: any) => {
              if (!payload?.length) return null;
              const d = payload[0].payload;
              const cp = clusterProfiles[d.cluster];
              return (
                <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-lg text-xs">
                  <p className="font-bold" style={{ color: cp.color }}>{cp.name}</p>
                  <p className="text-slate-500">UMAP: ({Number(d.x).toFixed(2)}, {Number(d.y).toFixed(2)})</p>
                </div>
              );
            }}
          />
          {clusterProfiles.map((cp) => (
            <Scatter
              key={cp.id}
              name={cp.name}
              data={umapPoints.filter((p) => p.cluster === cp.id)}
              fill={cp.color}
              opacity={0.75}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap gap-2">
        {clusterProfiles.map((cp) => (
          <span key={cp.id} className="flex items-center gap-1 text-xs text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: cp.color }} />
            {cp.label}: {cp.name.split(" ").slice(0, 2).join(" ")}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── 7. Admission Trend ──────────────────────────────────────────────────────
export function AdmissionTrendChart() {
  return (
    <motion.div
      className={`${CARD} col-span-1 lg:col-span-2`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.28 }}
    >
      <ChartTitle
        title="Monthly Admissions — Actual vs. LLM-Predicted (Azure OpenAI)"
        subtitle="Azure Synapse Streaming + GPT-4 time-series forecasting model, 2023"
      />
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={admissionTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 11 }} domain={[3000, 5500]} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => [Number(v).toLocaleString(), ""]} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="admissions" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Actual Admissions" />
          <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} name="LLM Predicted" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 8. Feature Importance ────────────────────────────────────────────────────
export function FeatureImportanceChart() {
  const catColors: Record<string, string> = {
    NLP: "#6366f1",
    Clinical: "#22c55e",
    Admin: "#f97316",
    Demographic: "#06b6d4",
  };
  const data = [...featureImportance].sort((a, b) => b.importance - a.importance);
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32 }}
    >
      <ChartTitle
        title="SHAP Feature Importance"
        subtitle="LLM semantic features dominate — Azure ML SHAP Explainer"
      />
      <ResponsiveContainer width="100%" height={290}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => v.toFixed(2)} />
          <YAxis dataKey="feature" type="category" tick={{ fontSize: 9 }} width={130} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => [Number(v).toFixed(3), "Importance"]} />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={catColors[entry.category] ?? "#94a3b8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex gap-3 flex-wrap">
        {Object.entries(catColors).map(([cat, color]) => (
          <span key={cat} className="flex items-center gap-1 text-xs text-slate-600">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: color }} />
            {cat}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── 9. Cluster Sizes Pie Chart ───────────────────────────────────────────────
export function ClusterPieChart() {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, label, pct }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={9} fill="#475569">
        {label}: {pct}%
      </text>
    );
  };

  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.36 }}
    >
      <ChartTitle title="Cluster Size Distribution" subtitle="Patient count per identified segment" />
      <ResponsiveContainer width="100%" height={290}>
        <PieChart>
          <Pie
            data={clusterProfiles}
            dataKey="size"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={85}
            labelLine={true}
            label={renderLabel}
          >
            {clusterProfiles.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => [Number(v).toLocaleString(), "Patients"]} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 10. NLP Entity Stats Radar ──────────────────────────────────────────────
export function NLPEntityRadar() {
  const radarData = nlpEntityStats.map((e) => ({
    entity: e.entity.split("/")[0],
    Precision: Math.round(e.precision * 100),
    Recall: Math.round(e.recall * 100),
  }));
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <ChartTitle
        title="NER Precision & Recall — Azure Cognitive Health NLP"
        subtitle="Entity extraction quality across 7 clinical entity types"
      />
      <ResponsiveContainer width="100%" height={270}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="entity" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[75, 100]} tick={{ fontSize: 9 }} />
          <Radar name="Precision" dataKey="Precision" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
          <Radar name="Recall" dataKey="Recall" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} strokeWidth={2} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => `${Number(v)}%`} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 11. Length of Stay vs Cluster ───────────────────────────────────────────
export function LOSChart() {
  const data = clusterProfiles.map((c) => ({
    name: c.name.split(" ").slice(0, 2).join(" "),
    los: c.los,
    color: c.color,
  }));
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.44 }}
    >
      <ChartTitle
        title="Average Length of Stay by Cluster (Days)"
        subtitle="Sepsis/Critical Care and Pulmonary/Oncology cohorts show highest LOS"
      />
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-12} textAnchor="end" height={55} />
          <YAxis tick={{ fontSize: 11 }} label={{ value: "Days", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => [`${Number(v)} days`, "Avg LOS"]} />
          <Bar dataKey="los" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── 12. Semantic Coherence vs Silhouette Scatter ────────────────────────────
export function CoherenceScatterChart() {
  const data = clusterProfiles.map((c) => ({
    x: c.silhouette,
    y: c.semanticCoherence,
    name: c.name,
    color: c.color,
  }));
  return (
    <motion.div
      className={CARD}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.48 }}
    >
      <ChartTitle
        title="Silhouette Score vs. Semantic Coherence"
        subtitle="Strong positive correlation — LLM quality boosts geometric separation"
      />
      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="x" type="number" name="Silhouette" domain={[0.55, 0.9]} tick={{ fontSize: 10 }}
            label={{ value: "Silhouette Score", position: "insideBottom", offset: -5, fontSize: 11 }} />
          <YAxis dataKey="y" type="number" name="Semantic Coherence" domain={[0.7, 0.95]} tick={{ fontSize: 10 }}
            label={{ value: "Semantic Coherence", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            content={({ payload }: any) => {
              if (!payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-lg text-xs">
                  <p className="font-bold" style={{ color: d.color }}>{d.name}</p>
                  <p>Silhouette: {Number(d.x).toFixed(2)}</p>
                  <p>Semantic Coherence: {Number(d.y).toFixed(2)}</p>
                </div>
              );
            }}
          />
          <Scatter data={data} fill="#8884d8">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
