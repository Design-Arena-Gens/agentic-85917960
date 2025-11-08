"use client";

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import type { LeadRecord } from '../lib/types';

export default function ResultsTable({ records, loading }: { records: LeadRecord[]; loading: boolean; }) {
  const downloadCSV = () => {
    const csv = Papa.unparse(records);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div className="badge">Results</div>
        <div className="toolbar">
          <button className="button secondary" disabled={loading || records.length === 0} onClick={downloadCSV}>Download CSV</button>
          <button className="button secondary" disabled={loading || records.length === 0} onClick={downloadXLSX}>Download Excel</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Contact Name</th>
            <th>Contact Email</th>
            <th>Contact Phone</th>
            <th>Industry</th>
            <th>Company Website</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td colSpan={7} style={{ color: '#9fb3c8', padding: '12px 10px' }}>
                {loading ? 'Running lead generation...' : 'No results yet.'}
              </td>
            </tr>
          )}
          {records.map((r, idx) => (
            <tr key={idx}>
              <td>{r["Company Name"] || ''}</td>
              <td>{r["Contact Name"] || ''}</td>
              <td>{r["Contact Email"] || ''}</td>
              <td>{r["Contact Phone"] || ''}</td>
              <td>{r["Industry"] || ''}</td>
              <td>
                {r["Company Website"] ? (
                  <a href={r["Company Website"]} target="_blank" rel="noreferrer">{r["Company Website"]}</a>
                ) : ''}
              </td>
              <td>{r["Address"] || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
