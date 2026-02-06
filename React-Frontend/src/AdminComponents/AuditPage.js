import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AuditPage = ({ audits }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredAudits = audits.filter(
    (a) =>
      a.eventType.toLowerCase().includes(search.toLowerCase()) ||
      a.payload.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        {/* Header */}
        <div
          className="card-header text-white d-flex justify-content-between align-items-center"
          style={{ background: "linear-gradient(90deg, #0d6efd, #0a58ca)" }}
        >
          <h5 className="mb-0">📊 Audit Logs</h5>

          <input
            type="text"
            className="form-control form-control-sm w-25"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Event Type</th>
                  <th>Created At</th>
                  <th>Payload</th>
                </tr>
              </thead>

              <tbody>
                {filteredAudits.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No audit records found
                    </td>
                  </tr>
                ) : (
                  filteredAudits.map((audit, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>
                        <span className="badge bg-primary">
                          {audit.eventType}
                        </span>
                      </td>
                      <td>{new Date(audit.createdAt).toLocaleString()}</td>
                      <td style={{ maxWidth: "400px" }}>
                        <pre className="mb-0 text-wrap small">
                          {audit.payload}
                        </pre>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button className="btn btn-secondary" onClick={()=>navigate("/admin")}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default AuditPage;
