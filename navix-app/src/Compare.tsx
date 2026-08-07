import { useState, useMemo } from 'react';

// Compare page: shows a list of sample images (expected to be copied into /public/screenshots/)
// and an iframe to load the app at a specific section. The sample image is overlaid on the
// iframe; use the opacity slider to compare.

const samples: Array<{ file: string; label: string; navigateQuery: string }> = [
  { file: 'Capture.PNG', label: 'Student Dashboard - Overview', navigateQuery: 'navigate=student-dashboard&studentTab=overview' },
  { file: 'Capture2.PNG', label: 'Enterprise Dashboard - Overview', navigateQuery: 'navigate=enterprise-dashboard&enterpriseTab=overview' },
  { file: 'Capture3.PNG', label: 'Enterprise - Manage Sim (list / create)', navigateQuery: 'navigate=enterprise-dashboard&enterpriseTab=manage-sim' },
  { file: 'Capture5.PNG', label: 'Career Test - Intro (RIASEC)', navigateQuery: 'navigate=student-dashboard&studentTab=explore&careerOpen=info' },
  { file: 'Capture6.PNG', label: 'Career Test - Questions', navigateQuery: 'navigate=student-dashboard&studentTab=explore&careerOpen=questions' },
  { file: 'Capture7.PNG', label: 'Career Test - Result', navigateQuery: 'navigate=student-dashboard&studentTab=explore&careerOpen=result' },
  { file: 'Capture9.PNG', label: 'Job Map - Marketing', navigateQuery: 'navigate=student-dashboard&studentTab=explore' },
  { file: 'Capture10.PNG', label: 'Interview - Landing', navigateQuery: 'navigate=student-dashboard&studentTab=interview&interviewStep=landing' },
  { file: 'Capture11.PNG', label: 'Interview - Select', navigateQuery: 'navigate=student-dashboard&studentTab=interview&interviewStep=select' },
  { file: 'Capture12.PNG', label: 'Interview - Mode', navigateQuery: 'navigate=student-dashboard&studentTab=interview&interviewStep=mode' },
  { file: 'Capture13.PNG', label: 'Interview - Question', navigateQuery: 'navigate=student-dashboard&studentTab=interview&interviewStep=question' },
  { file: 'Capture14.PNG', label: 'Interview - Feedback', navigateQuery: 'navigate=student-dashboard&studentTab=interview&interviewStep=feedback' },
  { file: 'Capture15.PNG', label: 'Interview - Summary', navigateQuery: 'navigate=student-dashboard&studentTab=interview&interviewStep=summary' },
  { file: 'Capture17.PNG', label: 'Referral - Promo', navigateQuery: 'navigate=student-dashboard&studentTab=referral' },
  { file: 'Capture18.PNG', label: 'Referral - Progress', navigateQuery: 'navigate=student-dashboard&studentTab=referral' }
];

export default function Compare() {
  const [selected, setSelected] = useState(samples[0]);
  const [opacity, setOpacity] = useState<number>(0.5);
  const [width, setWidth] = useState<number>(1100);
  const iframeSrc = useMemo(() => `${window.location.origin}/?${selected.navigateQuery}`, [selected]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <aside style={{ width: '300px' }}>
        <h3 style={{ marginTop: 0 }}>Ảnh mẫu (public/screenshots)</h3>
        <p style={{ fontSize: 13, color: '#666' }}>Hãy copy các ảnh từ folder `ảnh` vào `navix-app/public/screenshots/` trước khi so sánh.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          {samples.map(s => (
            <button key={s.file} onClick={() => setSelected(s)} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px', textAlign: 'left', borderRadius: '8px', border: selected.file === s.file ? '2px solid #16a34a' : '1px solid #e5e7eb', background: '#fff' }}>
              <img src={`/screenshots/${s.file}`} alt={s.file} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 4, background: '#f3f4f6' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{s.file}</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 20, background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Opacity</div>
          <input type="range" min={0} max={1} step={0.01} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: '100%' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={() => setOpacity(0)} style={{ flex: 1 }}>0%</button>
            <button onClick={() => setOpacity(0.5)} style={{ flex: 1 }}>50%</button>
            <button onClick={() => setOpacity(1)} style={{ flex: 1 }}>100%</button>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Preview width</div>
            <input type="range" min={600} max={1400} step={10} value={width} onChange={(e) => setWidth(Number(e.target.value))} style={{ width: '100%' }} />
            <div style={{ fontSize: 12, color: '#6b7280' }}>{width}px</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Instructions</div>
            <ol style={{ fontSize: 13, color: '#374151', paddingLeft: 18 }}>
              <li>Copy images into <code>/public/screenshots/</code> (same filenames)</li>
              <li>Click a sample; iframe will load the app at the mapped section</li>
              <li>Use opacity slider to overlay the sample image above iframe and visually compare</li>
            </ol>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0 }}>{selected.label}</h2>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{selected.file}</div>
          </div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Iframe: {iframeSrc}</div>
        </div>

        <div style={{ position: 'relative', width: width, height: Math.round((width * 2) / 3), border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
          <iframe title="app-embed" src={iframeSrc} style={{ width: '100%', height: '100%', border: 0 }} />

          {/* overlay sample image */}
          <img src={`/screenshots/${selected.file}`} alt="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: opacity, pointerEvents: 'none', mixBlendMode: 'normal' }} />
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Note: If images don't appear, copy them into <code>navix-app/public/screenshots/</code> with the same filenames (Capture.PNG, Capture2.PNG, ...).</div>
        </div>
      </div>
    </div>
  );
}

