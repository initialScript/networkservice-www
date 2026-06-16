// TODO: remove before production
'use client';

import { useState, useEffect, useCallback } from 'react';

interface EndpointResult {
  endpoint: string;
  status: number | null;
  ok: boolean;
  label: string;
  error?: string;
}

const ENDPOINTS: { path: string; label: string }[] = [
  { path: '/api/health', label: 'Health check' },
  { path: '/api/categories', label: 'Categories list' },
  { path: '/api/brands', label: 'Brands list' },
  { path: '/api/products?limit=4', label: 'Products (first 4)' },
  { path: '/api/delivery-zones', label: 'Delivery zones' },
];

async function testEndpoint(path: string, label: string): Promise<EndpointResult> {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    const text = await res.text();
    let preview = '';
    try {
      const json = JSON.parse(text);
      if (Array.isArray(json)) preview = `${json.length} items`;
      else if (json.data && Array.isArray(json.data)) preview = `${json.data.length} items`;
      else if (json.categories) preview = `${json.categories.length} items`;
      else if (json.brands) preview = `${json.brands.length} items`;
      else if (json.products) preview = `${json.products.length} items`;
      else if (json.message) preview = json.message;
      else preview = 'OK';
    } catch {
      preview = text.slice(0, 60);
    }
    return { endpoint: path, status: res.status, ok: res.ok, label, error: res.ok ? preview : `HTTP ${res.status}` };
  } catch (err) {
    return { endpoint: path, status: null, ok: false, label, error: String(err) };
  }
}

export default function ApiTestPage() {
  const [results, setResults] = useState<EndpointResult[]>([]);
  const [running, setRunning] = useState(false);

  const runTests = useCallback(async () => {
    setRunning(true);
    setResults([]);
    const all = await Promise.all(ENDPOINTS.map((e) => testEndpoint(e.path, e.label)));
    setResults(all);
    setRunning(false);
  }, []);

  useEffect(() => { runTests(); }, [runTests]);

  return (
    <div style={{ fontFamily: 'monospace', maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>API Connection Test</h1>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
        Dev debugging page — remove before production
      </p>

      <button
        onClick={runTests}
        disabled={running}
        style={{
          marginBottom: 24,
          padding: '8px 20px',
          background: '#0F3460',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: running ? 'not-allowed' : 'pointer',
          opacity: running ? 0.6 : 1,
        }}
      >
        {running ? 'Testing…' : 'Re-test'}
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
            <th style={{ padding: '8px 12px' }}>Endpoint</th>
            <th style={{ padding: '8px 12px' }}>Status</th>
            <th style={{ padding: '8px 12px' }}>Result</th>
          </tr>
        </thead>
        <tbody>
          {running && results.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: '16px 12px', color: '#888' }}>Running tests…</td>
            </tr>
          )}
          {results.map((r) => (
            <tr
              key={r.endpoint}
              style={{
                background: r.ok ? '#f0fdf4' : '#fef2f2',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <td style={{ padding: '10px 12px', color: '#374151' }}>
                <span style={{ marginRight: 8 }}>{r.ok ? '✅' : '❌'}</span>
                {r.endpoint}
              </td>
              <td style={{ padding: '10px 12px', color: r.ok ? '#166534' : '#991b1b', fontWeight: 600 }}>
                {r.status ?? 'ERR'}
              </td>
              <td style={{ padding: '10px 12px', color: r.ok ? '#15803d' : '#b91c1c' }}>
                {r.error ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {results.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
          {results.filter((r) => r.ok).length}/{results.length} endpoints healthy
        </p>
      )}
    </div>
  );
}
