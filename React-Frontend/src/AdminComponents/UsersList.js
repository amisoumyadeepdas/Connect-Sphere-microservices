import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../Api/UserApi";

const UsersList = ({ userdata, reload, reloadAudits }) => {
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/admin/add");
  };

  const handleAuditLogs = () => {
    navigate("/admin/audit");
  };

  const handleUpdateButton = (id) => {
    navigate(`/admin/update/${id}`);
  };

  const handleDeleteButton = async (id) => {
    try {
      await deleteUser(id);
      reload(); // refresh from backend
      reloadAudits();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <>
      {userdata.length > 0 ? (
        <div className="card mt-4 shadow-sm">
          <div className="card-body">
            <div className="mb-3 text-center">
              <h1>Users List</h1>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                className="btn btn-success px-4"
                onClick={handleAddButton}
              >
                ➕ Add User
              </button>
              <button
                className="btn btn-outline-primary px-4"
                onClick={handleAuditLogs}
              >
                📊 Audit Logs
              </button>
            </div>

            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Company</th>
                  <th style={{ width: "205px" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {userdata.map((u,key) => (
                  <tr>
                    <td>{key+1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.city}</td>
                    <td>{u.company}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => navigate(`/profile/${u.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleUpdateButton(u.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteButton(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-muted">Wait, data is loading…</div>
      )}
    </>
  );
};

export default UsersList;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { deleteUser } from "../Api/UserApi";

// const UsersList = ({ userdata, reload }) => {
//   const navigate = useNavigate();

//   const handleDeleteButton = async (id) => {
//     if (!window.confirm("Delete this user?")) return;
//     await deleteUser(id);
//     reload();
//   };

//   return (
//     <>
//       {userdata.length > 0 ? (
//         <div className="container mt-4">
//           <div className="card shadow-lg border-0 rounded-4">

//             {/* Header */}
//             <div className="card-header bg-primary text-white text-center rounded-top-4">
//               <h2 className="mb-0">Users List</h2>
//               <small className="opacity-75">Manage all registered users</small>
//             </div>

//             <div className="card-body">

//               {/* Action */}
//               <div className="d-flex justify-content-end mb-3">
//                 <button
//                   className="btn btn-primary btn-sm rounded-pill px-4"
//                   onClick={() => navigate("/add")}
//                 >
//                   ➕ Add User
//                 </button>
//               </div>

//               {/* Table */}
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle">
//                   <thead className="table-light">
//                     <tr className="text-secondary">
//                       <th>ID</th>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>City</th>
//                       <th>Company</th>
//                       <th className="text-center">Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {userdata.map((u) => (
//                       <tr key={u.id}>
//                         <td className="fw-semibold">{u.id}</td>
//                         <td>{u.name}</td>
//                         <td className="text-muted">{u.email}</td>
//                         <td>{u.city}</td>
//                         <td>{u.company}</td>
//                         <td className="text-center">
//                           <div className="btn-group btn-group-sm" role="group">
//                             <button
//                               className="btn btn-outline-info"
//                               onClick={() => navigate(`/profile/${u.id}`)}
//                             >
//                               View
//                             </button>
//                             <button
//                               className="btn btn-outline-warning"
//                               onClick={() => navigate(`/update/${u.id}`)}
//                             >
//                               Update
//                             </button>
//                             <button
//                               className="btn btn-outline-danger"
//                               onClick={() => handleDeleteButton(u.id)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="p-5 text-center text-muted">
//           ⏳ Loading users…
//         </div>
//       )}
//     </>
//   );
// };

// export default UsersList;
