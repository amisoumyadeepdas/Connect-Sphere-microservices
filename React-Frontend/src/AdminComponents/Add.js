import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Api/UserApi";


const Add = ({ reload, reloadAudits }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/admin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !city || !company || !dateOfBirth || !gender) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      name,
      email,
      city,
      company,
      gender,
      dateOfBirth
    };

    try {
      await addUser(payload);
      reload();          // reload data from backend
      reloadAudits();
      navigate("/admin");
    } catch (err) {
      alert("Failed to add user");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div
          className="card-header text-white"
          style={{ background: "linear-gradient(90deg, #0d6efd, #0a58ca)" }}
        >
          <h4 className="mb-0">➕ Add New User</h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-8">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">City</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Company</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold d-block">Gender</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </div>

            </div>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
