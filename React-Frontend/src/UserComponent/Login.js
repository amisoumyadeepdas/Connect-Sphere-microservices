import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Api/LoginApi";
import "../styles/loginLayout.css";

const Login = ({ reloadAudits }) => {
  const navigate = useNavigate();

  // ===================== STATE =====================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  // ===================== VALIDATION =====================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===================== INPUT HANDLER =====================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (error) setError(null);
  };

  // ===================== LOGIN HANDLER =====================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await loginUser(formData);
      const { id, role, name } = res.data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          role,
          name,
          email: formData.email,
        }),
      );

      setError({
        type: "success",
        message: "Login successful! Redirecting...",
      });

      setTimeout(() => {
        reloadAudits?.();
        role === "ADMIN" ? navigate("/admin") : navigate(`/profile/${id}`);
      }, 1500);
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (err.response) {
        const data = err.response.data;

        if (typeof data === "string") {
          errorMessage = data;
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (err.response.status === 404) {
          errorMessage = "User not found. Please register first.";
        } else if (err.response.status === 500) {
          errorMessage =
            "Service temporarily unavailable. Please try again later.";
        } else {
          errorMessage = `Error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = err.message || "An unexpected error occurred.";
      }

      setError({
        type: "danger",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // ===================== JSX =====================
  return (
    <div className="login">
      <div className="loginWrapper">
        {/* TOP SUCCESS / ERROR BANNER */}
        {error && (
          <div className="loginAlertWrapper">
            <div
              className={`alert alert-${error.type} alert-dismissible fade show`}
              role="alert"
            >
              <strong>
                {error.type === "success" ? "Success" : "Login Error"}
              </strong>
              <div className="small">{error.message}</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
              />
            </div>
          </div>
        )}

        <div className="loginContent">
          {/* LEFT SECTION */}
          <div className="loginLeft">
            <h3 className="loginLogo">Connect Sphere</h3>
            <span className="loginDesc">
              Online Privacy Management System for Social Media!!! 🔐
            </span>
          </div>

          {/* RIGHT SECTION */}
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleLogin} noValidate>
              <div className="card-header py-4 text-white border-0 rounded-top bg-transparent">
                <div className="text-center">
                  <div className="mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`loginInput ${errors.email ? "inputError" : ""}`}
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.email && (
                <small style={{ color: "#000000" }}>{errors.email}</small>
              )}

              {/* PASSWORD */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`loginInput ${errors.password ? "inputError" : ""}`}
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.password && (
                <small style={{ color: "#000000" }}>{errors.password}</small>
              )}

              {/* LOGIN BUTTON */}
              <button className="loginButton" type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Log in"}
              </button>

              {/* FORGOT PASSWORD */}
              <span
                className="loginForgot"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>

              {/* REGISTER */}
              <button
                type="button"
                className="loginRegisterButton"
                onClick={() => navigate("/register")}
                disabled={loading}
              >
                Create a New Account
              </button>
            </form>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="appFooter">
          © {new Date().getFullYear()} Connect Sphere. All rights reserved.
        </footer>
        
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../Api/LoginApi";

// const Login = ({ reloadAudits }) => {
//   const navigate = useNavigate();

//   // ===================== STATE =====================
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [errors, setErrors] = useState({});

//   // ===================== VALIDATION =====================
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ===================== INPUT HANDLER =====================
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }

//     if (error) setError(null);
//   };

//   // ===================== LOGIN HANDLER =====================
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await loginUser(formData);
//       const { id, role, name } = res.data;

//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           id,
//           role,
//           name,
//           email: formData.email,
//         }),
//       );

//       setError({
//         type: "success",
//         message: "Login successful! Redirecting...",
//       });

//       setTimeout(() => {
//         reloadAudits?.();
//         role === "ADMIN" ? navigate("/admin") : navigate(`/profile/${id}`);
//       }, 1500);
//     } catch (err) {
//       let errorMessage = "Login failed. Please try again.";

//       if (err.response) {
//         const data = err.response.data;

//         if (typeof data === "string") {
//           errorMessage = data;
//         } else if (data?.message) {
//           errorMessage = data.message;
//         } else if (err.response.status === 404) {
//           errorMessage = "User not found. Please register first.";
//         } else if (err.response.status === 500) {
//           errorMessage =
//             "Service temporarily unavailable. Please try again later.";
//         } else {
//           errorMessage = `Error: ${err.response.status}`;
//         }
//       } else if (err.request) {
//         errorMessage = "Network error. Please check your connection.";
//       } else {
//         errorMessage = err.message || "An unexpected error occurred.";
//       }

//       setError({
//         type: "danger",
//         message: errorMessage,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===================== JSX =====================
//   return (
//     <div
//       className="d-flex align-items-center justify-content-center vh-100 vw-100"
//       style={{
//         background: "url('./Slide1.JPG') no-repeat center center fixed",
//         backgroundSize: "cover"
//       }}
//     >
//       <div className="container" style={{ maxWidth: "1200px" }}>
//         {/* TOP SUCCESS / ERROR BANNER */}
//         {error && (
//           <div className="position-absolute top-0 start-50 translate-middle-x mt-3" style={{ width: "60%", maxWidth: "700px", zIndex: 1000 }}>
//             <div
//               className={`alert alert-${error.type === "success" ? "success" : "danger"} alert-dismissible fade show mb-0 p-2`}
//               role="alert"
//               style={{ borderRadius: "8px" }}
//             >
//               <div className="d-flex align-items-center justify-content-between">
//                 <div>
//                   <strong className="me-2">
//                     {error.type === "success" ? "Success" : "Login Error"}
//                   </strong>
//                   <span className="small">{error.message}</span>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn-close btn-close-white"
//                   onClick={() => setError(null)}
//                   aria-label="Close"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="row gx-5 align-items-center">
//           {/* LEFT SECTION */}
//           <div className="col-lg-6">
//             <div className="text-center text-lg-start">
//               <h3 className="display-4 fw-bold mb-3" style={{ color: "#080000" }}>
//                 Connect Sphere
//               </h3>
//               <p className="fs-4" style={{ color: "#080000" }}>
//                 Online Privacy Management System for Social Media!!! 🔐
//               </p>
//             </div>
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="col-lg-6">
//             <div
//               className="card border-0 shadow-lg"
//               style={{
//                 backgroundColor: "#265047",
//                 opacity: 0.8,
//                 borderRadius: "20px"
//               }}
//             >
//               <div className="card-body p-0 p-md-5">
//                 <div className="text-center mb-4">
//                   <div className="mb-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="60"
//                       height="60"
//                       fill="currentColor"
//                       className="bi bi-person-circle text-white"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
//                       <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
//                     </svg>
//                   </div>
//                 </div>

//                 <form onSubmit={handleLogin} noValidate>
//                   {/* EMAIL */}
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       name="email"
//                       className={`form-control form-control-lg ${errors.email ? "is-invalid border-2 border-danger" : ""}`}
//                       placeholder="Email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                       style={{ borderRadius: "10px", paddingLeft: "20px", height: "50px" }}
//                     />
//                     {errors.email && (
//                       <div className="invalid-feedback d-block text-dark">
//                         {errors.email}
//                       </div>
//                     )}
//                   </div>

//                   {/* PASSWORD */}
//                   <div className="mb-3">
//                     <input
//                       type="password"
//                       name="password"
//                       className={`form-control form-control-lg ${errors.password ? "is-invalid border-2 border-danger" : ""}`}
//                       placeholder="Password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                       style={{ borderRadius: "10px", paddingLeft: "20px", height: "50px" }}
//                     />
//                     {errors.password && (
//                       <div className="invalid-feedback d-block text-dark">
//                         {errors.password}
//                       </div>
//                     )}
//                   </div>

//                   {/* LOGIN BUTTON */}
//                   <button
//                     className="btn w-100 mb-3"
//                     type="submit"
//                     disabled={loading}
//                     style={{
//                       height: "50px",
//                       borderRadius: "10px",
//                       backgroundColor: "darkred",
//                       color: "white",
//                       fontSize: "20px",
//                       fontWeight: "500"
//                     }}
//                     onMouseOver={(e) => e.target.style.backgroundColor = "#3e9d43"}
//                     onMouseOut={(e) => e.target.style.backgroundColor = "darkred"}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Signing In...
//                       </>
//                     ) : (
//                       "Log in"
//                     )}
//                   </button>

//                   {/* FORGOT PASSWORD */}
//                   <div className="text-center mb-3">
//                     <button
//                       type="button"
//                       className="btn btn-link text-decoration-none p-0 text-dark"
//                       onClick={() => navigate("/forgot-password")}
//                       disabled={loading}
//                       onMouseOver={(e) => {
//                         e.target.style.color = "#fffbfb";
//                         e.target.style.fontWeight = "bold";
//                       }}
//                       onMouseOut={(e) => {
//                         e.target.style.color = "#000000";
//                         e.target.style.fontWeight = "normal";
//                       }}
//                     >
//                       Forgot Password?
//                     </button>
//                   </div>

//                   {/* REGISTER */}
//                   <div className="text-center">
//                     <button
//                       type="button"
//                       className="btn"
//                       onClick={() => navigate("/register")}
//                       disabled={loading}
//                       style={{
//                         width: "50%",
//                         minWidth: "150px",
//                         height: "50px",
//                         borderRadius: "10px",
//                         backgroundColor: "darkred",
//                         color: "white",
//                         fontSize: "18px",
//                         fontWeight: "500"
//                       }}
//                       onMouseOver={(e) => e.target.style.backgroundColor = "#3e9d43"}
//                       onMouseOut={(e) => e.target.style.backgroundColor = "darkred"}
//                     >
//                       Create a New Account
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
