"use client";

import { useState } from 'react';
import type { LeadGenRequest } from '../lib/types';

export default function LeadForm({ value, onChange, onRun, loading }: {
  value: LeadGenRequest;
  onChange: (v: LeadGenRequest) => void;
  onRun: () => void;
  loading: boolean;
}) {
  const [text, setText] = useState<string>(JSON.stringify(value, null, 2));
  const [error, setError] = useState<string>('');

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text) as LeadGenRequest;
      onChange(parsed);
      setError('');
    } catch (e: any) {
      setError(e?.message || 'Invalid JSON');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
        <div className="badge">Configure Request JSON</div>
        <div className="toolbar">
          <button className="button secondary" onClick={handleApply} disabled={loading}>Apply JSON</button>
          <button className="button" onClick={onRun} disabled={loading}>Run Lead Generation</button>
        </div>
      </div>

      <label className="label">LeadGen Request</label>
      <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
      {error && <div style={{ color: '#ff8a8a', marginTop: 6 }}>{error}</div>}
    </div>
  );
}
