import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Api/UserApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/registerLayout.css";

const Register = ({ reload, reloadAudits }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    company: "",
    dateOfBirth: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const hasErrors = Object.values(errors).some((err) => err && err.length > 0);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await addUser(formData);
      reload?.();
      reloadAudits?.();

      setAlert({
        type: "success",
        message: "Registration successful! Redirecting to login...",
      });

      setTimeout(() => navigate("/"), 1000);
    } catch {
      setAlert({
        type: "danger",
        message: "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerPage">
      {/* ===== HEADER ===== */}
      <header className="appHeader">
        <h1>Connect Sphere</h1>
      </header>

      {/* ===== ALERT ===== */}
      {alert && (
        <div className="loginAlertWrapper">
          <div
            className={
              alert.type === "success"
                ? "loginSuccessBanner"
                : "loginErrorBanner"
            }
          >
            <span className="statusIcon">
              {alert.type === "success" ? "✔" : "✖"}
            </span>

            <span className="statusText">{alert.message}</span>

            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => setAlert(null)}
            >
              ✕
            </span>
          </div>
        </div>
      )}

      {/* ===== FORM ===== */}
      <div className="registerWrapper">
        <form className="registerCard" onSubmit={handleSubmit} noValidate>
          <h4 className="text-center mb-4">Create Your Account</h4>

          <div className="row g-3">
            {/* FULL NAME */}
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                className={`form-control ${errors.name && "is-invalid"}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="invalid-feedback" style={{ color: "#000000" }}>
                {errors.name}
              </div>
            </div>

            {/* EMAIL */}
            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                className={`form-control ${errors.email && "is-invalid"}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback" style={{ color: "#000000" }}>
                {errors.email}
              </div>
            </div>

            {/* CITY */}
            <div className="col-md-6">
              <label className="form-label">City</label>
              <input
                className={`form-control ${errors.city && "is-invalid"}`}
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <div className="invalid-feedback" style={{ color: "#000000" }}>
                {errors.city}
              </div>
            </div>

            {/* COMPANY */}
            <div className="col-md-6">
              <label className="form-label">Company</label>
              <input
                className={`form-control ${errors.company && "is-invalid"}`}
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              <div className="invalid-feedback" style={{ color: "#000000" }}>
                {errors.company}
              </div>
            </div>

            {/* DOB */}
            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className={`form-control ${errors.dateOfBirth && "is-invalid"}`}
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <div className="invalid-feedback" style={{ color: "#000000" }}>
                {errors.dateOfBirth}
              </div>
            </div>

            {/* GENDER */}
            <div className="col-md-6">
              <label className="form-label d-block">Gender</label>
              <div className={`genderGroup ${errors.gender && "is-invalid"}`}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
              </div>
              {errors.gender && (
                <div className="small mt-1" style={{ color: "#000000" }}>
                  {errors.gender}
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-success w-100 mt-4"
            disabled={loading || hasErrors}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            className="btn btn-outline-light w-100 mt-2"
            onClick={() => navigate("/")}
          >
            Back to Login
          </button>
        </form>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="appFooter">
        © {new Date().getFullYear()} Connect Sphere. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;

// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { addUser } from "../Api/UserApi";

// const Register = ({ reload,reloadAudits }) => {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [city, setCity] = useState("");
//   const [company, setCompany] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [gender, setGender] = useState("");

//   const navigate = useNavigate();

//   const handleCancel = () => {
//     navigate("/");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !city || !company || !dateOfBirth || !gender) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const payload = {
//       name,
//       email,
//       city,
//       company,
//       gender,
//       dateOfBirth
//     };

//     try {
//       await addUser(payload);
//       reload();          // reload data from backend
//       reloadAudits();
//       navigate("/");
//     } catch (err) {
//       alert("Failed to add user");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card shadow-lg border-0 rounded-4">
//         <div
//           className="card-header text-white"
//           style={{ background: "linear-gradient(90deg, #0d6efd, #0a58ca)" }}
//         >
//           <h4 className="mb-0">➕ Register New User</h4>
//         </div>

//         <div className="card-body p-4">
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">

//               <div className="col-md-8">
//                 <label className="form-label fw-semibold">Full Name</label>
//                 <input
//                   type="text"
//                   className="form-control form-control-sm"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label fw-semibold">Email</label>
//                 <input
//                   type="email"
//                   className="form-control form-control-sm"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label fw-semibold">City</label>
//                 <input
//                   type="text"
//                   className="form-control form-control-sm"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label fw-semibold">Company</label>
//                 <input
//                   type="text"
//                   className="form-control form-control-sm"
//                   value={company}
//                   onChange={(e) => setCompany(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label fw-semibold">Date of Birth</label>
//                 <input
//                   type="date"
//                   className="form-control form-control-sm"
//                   value={dateOfBirth}
//                   onChange={(e) => setDateOfBirth(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label fw-semibold d-block">Gender</label>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="gender"
//                     value="Male"
//                     onChange={(e) => setGender(e.target.value)}
//                   />
//                   <label className="form-check-label">Male</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="gender"
//                     value="Female"
//                     onChange={(e) => setGender(e.target.value)}
//                   />
//                   <label className="form-check-label">Female</label>
//                 </div>
//               </div>

//             </div>

//             <div className="mt-4 d-flex justify-content-end gap-2">
//               <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-success">
//                 Submit
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
