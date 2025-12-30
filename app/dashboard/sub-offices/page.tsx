import fs from 'fs';
import path from 'path';

type ReportRow = {
  sub_office_id: string;
  season_start: string;
  season_end: string;
  accepted_returns: number;
  total_base_fees: number;
  total_addons_fees: number;
  sub_office_payout_base_only: number;
  main_office_gross: number;
  main_office_net_after_software: number;
  error_rate_percent: number;
  compliance_flags_present: boolean;
  bonus_eligible: boolean;
  recommended_bonus: number;
  note: string;
};

function readReport(): ReportRow[] {
  try {
    const p = path.join(process.cwd(), 'tax-ops/reports/season-report.json');
    if (!fs.existsSync(p)) return [];
    const content = fs.readFileSync(p, 'utf8');
    if (!content || content.trim() === '') return [];
    return JSON.parse(content) as ReportRow[];
  } catch (error) {
    console.error('Error reading season report:', error);
    return [];
  }
}

export default function SubOfficesDashboard() {
  const rows = readReport();

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>
        Sub-Office Season Dashboard
      </h1>
      <p style={{ marginTop: 8, maxWidth: 900 }}>
        This dashboard summarizes accepted returns, base-fee payouts (45% to
        sub-offices), and bonus recommendations based on season rules.
      </p>

      {rows.length === 0 ? (
        <div style={{ marginTop: 20 }}>
          <strong>No report found.</strong>
          <div>
            Run: <code>npx ts-node tax-ops/scripts/calc-season.ts</code>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 20, overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 1100 }}>
            <thead>
              <tr>
                {[
                  'Sub-Office',
                  'Season',
                  'Accepted',
                  'Base Fees',
                  'Add-ons (Main)',
                  'Sub Payout (Base)',
                  'Main Gross',
                  'Main Net (After SW)',
                  'Error Rate',
                  'Compliance Flags',
                  'Bonus Eligible',
                  'Recommended Bonus',
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #ccc',
                      padding: '10px 12px',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const formatCurrency = (val: number) =>
                  isNaN(val) || val === null ? 'N/A' : `$${val.toFixed(2)}`;
                const formatPercent = (val: number) =>
                  isNaN(val) || val === null ? 'N/A' : `${val.toFixed(2)}%`;

                return (
                  <tr key={r.sub_office_id}>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {r.sub_office_id}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {r.season_start} → {r.season_end}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {r.accepted_returns}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {formatCurrency(r.total_base_fees)}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {formatCurrency(r.total_addons_fees)}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {formatCurrency(r.sub_office_payout_base_only)}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {formatCurrency(r.main_office_gross)}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {formatCurrency(r.main_office_net_after_software)}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {formatPercent(r.error_rate_percent)}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {r.compliance_flags_present ? 'Yes' : 'No'}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {r.bonus_eligible ? 'Yes' : 'No'}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {formatCurrency(r.recommended_bonus)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p style={{ marginTop: 14, color: '#444' }}>
            Note: Bonus is discretionary. This dashboard provides recommended
            bonus amounts based on your written rules.
          </p>
        </div>
      )}
    </div>
  );
}
