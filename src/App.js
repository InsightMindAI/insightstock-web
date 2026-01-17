import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, ReferenceLine, Legend } from 'recharts';

const financialData = [
  { period: "Q2'21", revenue: 2.77, netIncome: -65.17, cashFlow: 309.91 },
  { period: "Q3'21", revenue: 2.45, netIncome: 16.80, cashFlow: -42.22 },
  { period: "Q4'21", revenue: 6.22, netIncome: -12.80, cashFlow: -35.85 },
  { period: "Q1'22", revenue: 2.39, netIncome: -37.90, cashFlow: -69.43 },
  { period: "Q2'22", revenue: 7.26, netIncome: -8.07, cashFlow: -52.42 },
  { period: "Q3'22", revenue: 4.17, netIncome: -32.05, cashFlow: -2.10 },
  { period: "Q4'22", revenue: 0, netIncome: -25.09, cashFlow: 38.46 },
  { period: "Q1'23", revenue: 2.39, netIncome: -45.22, cashFlow: -53.09 },
  { period: "Q2'23", revenue: 0, netIncome: -49.59, cashFlow: 5.75 },
  { period: "Q3'23", revenue: 0, netIncome: -50.75, cashFlow: -55.80 },
  { period: "Q4'23", revenue: 0, netIncome: -77.12, cashFlow: -47.88 },
  { period: "Q1'24", revenue: 0.50, netIncome: -39.80, cashFlow: 124.49 },
  { period: "Q2'24", revenue: 0.90, netIncome: -131.35, cashFlow: 75.21 },
  { period: "Q3'24", revenue: 1.10, netIncome: -303.08, cashFlow: 230.93 },
  { period: "Q1'25", revenue: 0.72, netIncome: -63.63, cashFlow: 306.86 },
  { period: "Q2'25", revenue: 1.16, netIncome: -135.90, cashFlow: 66.12 },
  { period: "Q3'25", revenue: 14.74, netIncome: -163.83, cashFlow: 280.58 },
];

const stockData = {
  latestClose: 115.77,
  change30Day: 87.1,
  high30Day: 120.80,
  low30Day: 61.40,
  ytdReturn: 250,
  yearReturn: 465
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(99, 255, 218, 0.3)',
        borderRadius: '8px',
        padding: '12px 16px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        <p style={{ color: '#63ffda', fontWeight: 600, marginBottom: '8px', fontSize: '13px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '12px', margin: '4px 0' }}>
            {entry.name}: <span style={{ fontWeight: 600 }}>${entry.value?.toFixed(2)}M</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function App() {
  const latestData = financialData[financialData.length - 1];
  const prevData = financialData[financialData.length - 2];
  const revenueGrowth = ((latestData.revenue - prevData.revenue) / prevData.revenue * 100).toFixed(0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1c 0%, #0f172a 50%, #1e1b4b 100%)',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      color: '#e2e8f0',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99, 255, 218, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 255, 218, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 255, 218, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #63ffda 0%, #22d3ee 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: '#0f172a',
              boxShadow: '0 0 30px rgba(99, 255, 218, 0.4)'
            }}>
              📡
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #63ffda 0%, #22d3ee 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                AST SpaceMobile
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>ASTS · Direct-to-Smartphone Satellite Network</p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            marginTop: '20px',
            padding: '16px 24px',
            background: 'rgba(99, 255, 218, 0.05)',
            border: '1px solid rgba(99, 255, 218, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap'
          }}>
            <div>
              <p style={{ color: '#64748b', fontSize: '11px', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Stock Price</p>
              <p style={{ fontSize: '32px', fontWeight: 700, color: '#63ffda', margin: '4px 0' }}>${stockData.latestClose}</p>
            </div>
            <div style={{ height: '48px', width: '1px', background: 'rgba(99, 255, 218, 0.2)' }} />
            <div>
              <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>30D Change</p>
              <p style={{ fontSize: '20px', fontWeight: 600, color: '#22c55e', margin: '4px 0' }}>+{stockData.change30Day}%</p>
            </div>
            <div>
              <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>30D Range</p>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0' }}>${stockData.low30Day} - ${stockData.high30Day}</p>
            </div>
            <div>
              <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>YTD Return</p>
              <p style={{ fontSize: '20px', fontWeight: 600, color: '#22c55e', margin: '4px 0' }}>+{stockData.ytdReturn}%</p>
            </div>
          </div>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: "Q3'25 Revenue", value: '$14.74M', change: `+${revenueGrowth}%`, positive: true, icon: '📈' },
            { label: 'Net Income', value: '-$163.8M', change: 'Pre-profit', positive: false, icon: '📊' },
            { label: 'Cash Flow', value: '$280.6M', change: 'Strong', positive: true, icon: '💰' },
            { label: '2026 Satellites', value: '45-60', change: 'Planned', positive: true, icon: '🛰️' }
          ].map((kpi, i) => (
            <div key={i} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(99, 255, 218, 0.15)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{kpi.label}</p>
                  <p style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: '8px 0 4px' }}>{kpi.value}</p>
                  <p style={{ fontSize: '12px', color: kpi.positive ? '#22c55e' : '#f59e0b', margin: 0 }}>{kpi.change}</p>
                </div>
                <span style={{ fontSize: '28px' }}>{kpi.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(99, 255, 218, 0.15)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: '#63ffda', fontSize: '14px', fontWeight: 600, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              📈 Revenue Trend (Millions USD)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#63ffda" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#63ffda" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 255, 218, 0.1)" />
                <XAxis dataKey="period" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#63ffda" strokeWidth={3} fill="url(#revenueGradient)" name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(99, 255, 218, 0.15)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: '#a78bfa', fontSize: '14px', fontWeight: 600, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              📊 Net Income (Millions USD)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={financialData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 255, 218, 0.1)" />
                <XAxis dataKey="period" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="netIncome" stroke="#f43f5e" strokeWidth={2} fill="url(#incomeGradient)" name="Net Income" />
                <Line type="monotone" dataKey="netIncome" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', strokeWidth: 2, r: 4 }} name="Net Income" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(99, 255, 218, 0.15)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: '#22d3ee', fontSize: '14px', fontWeight: 600, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              💰 Cash Flow (Millions USD)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 255, 218, 0.1)" />
                <XAxis dataKey="period" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="5 5" />
                <Bar dataKey="cashFlow" name="Cash Flow" radius={[4, 4, 0, 0]} fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(99, 255, 218, 0.15)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: '#fbbf24', fontSize: '14px', fontWeight: 600, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🔄 All Metrics Comparison
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 255, 218, 0.1)" />
                <XAxis dataKey="period" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: 'rgba(99, 255, 218, 0.2)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '11px' }}>{value}</span>} />
                <ReferenceLine y={0} stroke="rgba(255, 255, 255, 0.2)" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="revenue" stroke="#63ffda" strokeWidth={2} dot={{ r: 3 }} name="Revenue" />
                <Line type="monotone" dataKey="netIncome" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} name="Net Income" />
                <Line type="monotone" dataKey="cashFlow" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="Cash Flow" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(99, 255, 218, 0.15)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#63ffda', fontSize: '14px', fontWeight: 600, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🎯 Key Business Insights
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { title: 'Market Opportunity', items: ['50+ telecom partnerships', '3B potential customers', 'AT&T & Alphabet partners'], color: '#63ffda' },
              { title: 'Execution Milestones', items: ['45-60 satellites in 2026', 'BlueBird 6 launch imminent', 'SHIELD defense contract'], color: '#a78bfa' },
              { title: 'Risk Factors', items: ['SpaceX competition', 'Profitability in 2028', 'Insider selling signals'], color: '#f43f5e' }
            ].map((section, i) => (
              <div key={i}>
                <h4 style={{ color: section.color, fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>{section.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{
                      color: '#cbd5e1',
                      fontSize: '12px',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(99, 255, 218, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ color: section.color }}>▸</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <footer style={{ marginTop: '24px', textAlign: 'center', color: '#64748b', fontSize: '11px' }}>
          <p>Data sourced from Polygon API · AI Analysis by Claude · Last updated: Q3 2025</p>
        </footer>
      </div>
    </div>
  );
}