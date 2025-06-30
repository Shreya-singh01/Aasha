"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6699", "#FF4444", "#00B8A9", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

type StatCardProps = { label: string; value: number | string; color: string };
const StatCard = ({ label, value, color }: StatCardProps) => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    padding: 24,
    flex: 1,
    minWidth: 160,
    margin: 8,
    textAlign: "center",
    borderTop: `4px solid ${color}`
  }}>
    <div style={{ fontSize: 14, color: color, fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 700, margin: "8px 0" }}>{value}</div>
  </div>
);

type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        {payload.map((entry, i) => (
          <div key={i} style={{ color: entry.color }}>{entry.name}: {entry.value}</div>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [casesOverTime, setCasesOverTime] = useState<any[]>([]);
  const [casesByLocation, setCasesByLocation] = useState<any[]>([]);
  const [ageDistribution, setAgeDistribution] = useState<any[]>([]);
  const [genderDistribution, setGenderDistribution] = useState<any[]>([]);
  const [casesByNGO, setCasesByNGO] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState<any>({});
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setFetchError(null);
      const debugObj: any = {};
      try {
        const [statsRes, timeRes, locRes, ageRes, genderRes, ngoRes] = await Promise.all([
          fetch("/api/victims/stats").then(async r => { const j = await r.json(); debugObj.stats = j; return j; }),
          fetch("/api/victims/analytics/cases-over-time").then(async r => { const j = await r.json(); debugObj.casesOverTime = j; return j; }),
          fetch("/api/victims/analytics/by-location").then(async r => { const j = await r.json(); debugObj.casesByLocation = j; return j; }),
          fetch("/api/victims/analytics/age-distribution").then(async r => { const j = await r.json(); debugObj.ageDistribution = j; return j; }),
          fetch("/api/victims/analytics/gender-distribution").then(async r => { const j = await r.json(); debugObj.genderDistribution = j; return j; }),
          fetch("/api/victims/analytics/by-ngo").then(async r => { const j = await r.json(); debugObj.casesByNGO = j; return j; }),
        ]);
        setDebug(debugObj);
        if (!statsRes.success) throw new Error("Stats fetch failed: " + (statsRes.message || ""));
        setStats(statsRes.data);
        setCasesOverTime(timeRes.data);
        setCasesByLocation(locRes.data);
        setAgeDistribution(ageRes.data);
        setGenderDistribution(genderRes.data);
        setCasesByNGO(ngoRes.data);
      } catch (e: any) {
        setFetchError(e.message || "Unknown error");
        setDebug(debugObj);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Forced debug message at the very top
  // This will always render, even if the rest of the component fails
  return (
    <div style={{ padding: 32, background: "#f7f7fa", minHeight: "100vh" }}>
      <div style={{ background: '#e3f2fd', color: '#0d47a1', border: '1px solid #90caf9', borderRadius: 8, padding: 16, marginBottom: 24, fontSize: 16, fontWeight: 700 }}>
        FORCED DEBUG: This message should always be visible. If you see this, the file is loading.
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Analytics Dashboard</h1>
      <div style={{ color: "#666", marginBottom: 32 }}>Visual insights into anti-trafficking case data</div>
      {/* Debug Output */}
      <div style={{ background: '#fffbe6', color: '#333', border: '1px solid #ffe58f', borderRadius: 8, padding: 16, marginBottom: 24, fontSize: 13 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>DEBUG OUTPUT</div>
        {fetchError && <div style={{ color: 'red', marginBottom: 8 }}>Fetch error: {fetchError}</div>}
        <pre style={{ maxHeight: 200, overflow: 'auto', background: '#fffde7', padding: 8 }}>{JSON.stringify(debug, null, 2)}</pre>
      </div>
      {/* Stat Cards */}
      {stats ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          <StatCard label="Active Cases" value={stats.activeCases} color="#0088FE" />
          <StatCard label="Solved Cases" value={stats.rescuedCases} color="#00C49F" />
          <StatCard label="Pending Cases" value={stats.activeCases} color="#FFBB28" />
          <StatCard label="Total Cases" value={stats.totalVictims} color="#A28CFF" />
          <StatCard label="Critical Cases" value={stats.criticalCases} color="#FF4444" />
        </div>
      ) : (
        <div style={{ color: 'red', marginBottom: 32 }}>No analytics data available.</div>
      )}
      {/* Charts */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
          {/* Cases by Status */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Cases by Status</div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.casesByStatus}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {stats.casesByStatus.map((entry: any, idx: number) => (
                    <Cell key={`cell-status-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Cases by Trafficking Type */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Cases by Trafficking Type</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.casesByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" tickFormatter={v => v?.replace(/_/g, " ")} />
                <YAxis />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Cases Over Time */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Cases Over Time</div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={casesOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Cases by Location */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Cases by Location (City)</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={casesByLocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Age Distribution */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Victim Age Distribution</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#A28CFF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Gender Distribution */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Victim Gender Distribution</div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {genderDistribution.map((entry: any, idx: number) => (
                    <Cell key={`cell-gender-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Cases by NGO */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Cases by NGO</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={casesByNGO} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="_id" type="category" width={120} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#FF6699" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage; 