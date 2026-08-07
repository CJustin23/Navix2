import React, { useState } from 'react';

export default function Compare() {
  const samples = [
    { file: 'Capture.PNG', label: 'Student Dashboard - Overview' },
    { file: 'Capture2.PNG', label: 'Enterprise Dashboard - Overview' },
    { file: 'Capture3.PNG', label: 'Enterprise - Manage Sim' },
    { file: 'Capture5.PNG', label: 'Career Test - Intro (RIASEC)' },
    { file: 'Capture6.PNG', label: 'Career Test - Questions' },
    { file: 'Capture7.PNG', label: 'Career Test - Result' },
    { file: 'Capture9.PNG', label: 'Job Map - Marketing' },
    { file: 'Capture10.PNG', label: 'Interview - Landing' },
    { file: 'Capture11.PNG', label: 'Interview - Select' },
    { file: 'Capture12.PNG', label: 'Interview - Mode' },
    { file: 'Capture13.PNG', label: 'Interview - Question' },
    { file: 'Capture14.PNG', label: 'Interview - Feedback' },
    { file: 'Capture15.PNG', label: 'Interview - Summary' },
    { file: 'Capture17.PNG', label: 'Referral - Promo' },
    { file: 'Capture18.PNG', label: 'Referral - Progress' }
  ];

  const [selected, setSelected] = useState(samples[0]);
  const [opacity, setOpacity] = useState(0.5);

  return (
    <div style={{ padding: '24px' }}>
      <h2>So sánh Giao diện HTML vs Mẫu Screenshot</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <aside style={{ width: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {samples.map(s => (
              <button
                key={s.file}
                onClick={() => setSelected(s)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: selected.file === s.file ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: '#fff',
                  textAlign: 'left',
                  fontWeight: selected.file === s.file ? 700 : 500
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Độ mờ Overlay: {Math.round(opacity * 100)}%</label>
            <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>
        </aside>

        <div style={{ flex: 1, position: 'relative', minHeight: '600px', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
          <img src={`/screenshots/${selected.file}`} alt="Sample" style={{ width: '100%', opacity: opacity, position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          <div style="padding: 20px; font-size: 14px; color: var(--text-muted);">
            Vùng so sánh trực quan với hình ảnh mockup.
          </div>
        </div>
      </div>
    </div>
  );
}
