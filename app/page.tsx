"use client";

import { useMemo, useState } from 'react';
import LeadForm from '../components/LeadForm';
import ResultsTable from '../components/ResultsTable';
import type { LeadGenRequest, LeadRecord } from '../lib/types';

const defaultRequest: LeadGenRequest = {
  agent_name: 'Mumbai_Google_LeadGen',
  objective: 'Generate and qualify business leads for Google services/products in Mumbai.',
  target_location: 'Mumbai',
  lead_sources: ['Google Search', 'Google Maps', 'Google Workspace business listings'],
  desired_industries: ['IT', 'Startups', 'Digital Marketing', 'Finance'],
  lead_criteria: {
    company_size: '10-1000',
    location: 'Mumbai',
    contacts_required: ['Owner', 'Manager', 'Sales Head', 'IT Manager'],
  },
  output_fields: ['Company Name', 'Contact Name', 'Contact Email', 'Contact Phone', 'Industry', 'Company Website', 'Address'],
  data_enrichment: ['LinkedIn profile lookup', 'Website scraping for contacts', 'Domain verification'],
  workflow_steps: [
    'Scrape Google business listings for Mumbai.',
    'Filter businesses by desired industry and company size.',
    'Extract contact information and enrich profiles (LinkedIn, website).',
    'Qualified leads are stored in Excel or CRM.',
  ],
  automation_platform: 'n8n or alternative',
  persona_prompt:
    'You are a business development agent specialized in finding high-quality leads for Google solutions in Mumbai. Your goal is to maximize relevant lead output with accurate contact details.',
};

export default function HomePage() {
  const [request, setRequest] = useState<LeadGenRequest>(defaultRequest);
  const [results, setResults] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');

  const requestJson = useMemo(() => JSON.stringify(request, null, 2), [request]);

  const run = async () => {
    setLoading(true);
    setResults([]);
    setStatus('Starting lead generation...');

    try {
      const res = await fetch('/api/leadgen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setResults(data.records || []);
      setStatus(`Completed: ${data.records?.length ?? 0} records`);
    } catch (err: any) {
      setStatus(`Error: ${err?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <LeadForm value={request} onChange={setRequest} onRun={run} loading={loading} />
          <div style={{ marginTop: 8 }} className="status">{status}</div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <ResultsTable records={results} loading={loading} />
        </div>
      </div>
    </div>
  );
}
