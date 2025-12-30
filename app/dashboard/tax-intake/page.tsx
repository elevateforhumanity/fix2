import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type IntakeRow = {
  id: string;
  created_at: string;
  service_type: string;
  diy_service: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  paid: boolean;
  stripe_session_id: string | null;
  notes: string | null;
};

export default async function TaxIntakeDashboard() {
  const { data, error } = await supabaseAdmin
    .from("tax_intake")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#dc2626" }}>
          Error Loading Intakes
        </h1>
        <p>{error.message}</p>
      </div>
    );
  }

  const intakes = (data || []) as IntakeRow[];
  const paid = intakes.filter((r) => r.paid);
  const unpaid = intakes.filter((r) => !r.paid);

  return (
    <div style={{ padding: 24, maxWidth: 1600, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Tax Intake Dashboard
        </h1>
        <p style={{ color: "#666" }}>
          Staff-only view of all DIY tax service requests
        </p>
      </div>

      {/* Summary Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard
          label="Total Intakes"
          value={intakes.length}
          color="#3b82f6"
        />
        <StatCard label="Paid" value={paid.length} color="#10b981" />
        <StatCard label="Unpaid" value={unpaid.length} color="#f59e0b" />
        <StatCard
          label="Revenue"
          value={`$${calculateRevenue(paid)}`}
          color="#8b5cf6"
        />
      </div>

      {/* Unpaid Section */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 16,
            color: "#f59e0b",
          }}
        >
          ⚠️ Unpaid Intakes ({unpaid.length})
        </h2>
        <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
          These indicate abandoned checkouts or incomplete payments. Follow up
          if needed.
        </p>
        {unpaid.length === 0 ? (
          <div
            style={{
              padding: 20,
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: 8,
            }}
          >
            ✅ No unpaid intakes
          </div>
        ) : (
          <IntakeTable rows={unpaid} />
        )}
      </section>

      {/* Paid Section */}
      <section>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 16,
            color: "#10b981",
          }}
        >
          ✅ Paid Intakes ({paid.length})
        </h2>
        <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
          Confirmed payments ready for service delivery.
        </p>
        {paid.length === 0 ? (
          <div
            style={{
              padding: 20,
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              borderRadius: 8,
            }}
          >
            No paid intakes yet
          </div>
        ) : (
          <IntakeTable rows={paid} />
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        padding: 20,
        background: "white",
        border: "2px solid #e5e7eb",
        borderRadius: 8,
      }}
    >
      <div style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

function IntakeTable({ rows }: { rows: IntakeRow[] }) {
  return (
    <div style={{ overflowX: "auto", background: "white", borderRadius: 8 }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <thead>
          <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
            {[
              "Created",
              "Name",
              "Email",
              "Phone",
              "Service Type",
              "DIY Service",
              "Paid",
              "Stripe Session",
              "Notes",
            ].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                {new Date(r.created_at).toLocaleString()}
              </td>
              <td style={{ padding: "12px 16px" }}>
                {r.first_name} {r.last_name}
              </td>
              <td style={{ padding: "12px 16px" }}>
                <a
                  href={`mailto:${r.email}`}
                  style={{ color: "#3b82f6", textDecoration: "none" }}
                >
                  {r.email}
                </a>
              </td>
              <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                <a
                  href={`tel:${r.phone}`}
                  style={{ color: "#3b82f6", textDecoration: "none" }}
                >
                  {r.phone}
                </a>
              </td>
              <td style={{ padding: "12px 16px" }}>
                <span
                  style={{
                    padding: "4px 8px",
                    background: r.service_type === "full" ? "#dbeafe" : "#fef3c7",
                    color: r.service_type === "full" ? "#1e40af" : "#92400e",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {r.service_type}
                </span>
              </td>
              <td style={{ padding: "12px 16px" }}>
                {r.diy_service ? (
                  <span
                    style={{
                      padding: "4px 8px",
                      background: "#e0e7ff",
                      color: "#3730a3",
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {r.diy_service}
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td style={{ padding: "12px 16px" }}>
                {r.paid ? (
                  <span style={{ color: "#10b981", fontWeight: 600 }}>✅ Yes</span>
                ) : (
                  <span style={{ color: "#f59e0b", fontWeight: 600 }}>⚠️ No</span>
                )}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#6b7280",
                }}
              >
                {r.stripe_session_id ? (
                  <a
                    href={`https://dashboard.stripe.com/payments/${r.stripe_session_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3b82f6", textDecoration: "none" }}
                  >
                    {r.stripe_session_id.substring(0, 20)}...
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "#6b7280",
                  fontSize: 13,
                }}
              >
                {r.notes || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function calculateRevenue(paid: IntakeRow[]): string {
  const prices: Record<string, number> = {
    review: 200,
    consultation: 125,
    guided: 300,
    credit: 150,
  };

  const total = paid.reduce((sum, r) => {
    const price = r.diy_service ? prices[r.diy_service] || 0 : 0;
    return sum + price;
  }, 0);

  return total.toLocaleString();
}
