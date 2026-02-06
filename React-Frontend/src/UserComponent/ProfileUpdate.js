import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../Api/ProfileApi";

const ProfileUpdate = ({ reloadAudits }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    company: "",
    gender: "",
    dateOfBirth: "",
  });

  // ✅ Load profile from PROFILE SERVICE
  useEffect(() => {
    getUserProfile(userId)
      .then((res) => {
        setForm(res.data);
      })
      .catch(() => {
        alert("Failed to load profile");
      });
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(userId, form);
      reloadAudits();
      navigate(`/profile/${userId}`);
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">✏️ Update Profile</h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  name="city"
                  className="form-control"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Company</label>
                <input
                  name="company"
                  className="form-control"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label d-block">Gender</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={form.gender === "Male"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={form.gender === "Female"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(`/profile/${userId}`)}
              >
                Cancel
              </button>
              <button className="btn btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
