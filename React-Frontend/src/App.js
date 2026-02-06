import { useEffect, useState } from "react";
import UsersList from "./AdminComponents/UsersList";
import Add from "./AdminComponents/Add";
import Update from "./AdminComponents/Update";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getAllUsers } from "./Api/UserApi";
import { getAllAudits } from "./Api/AuditApi";
import Profile from "./UserComponent/Profile";
import Login from "./UserComponent/Login";
import Register from "./UserComponent/Register";
import ProfileUpdate from "./UserComponent/ProfileUpdate";
import AuditPage from "./AdminComponents/AuditPage";
import Layout from "./UserComponent/Layout"; // Import Layout
import Feed from "./UserComponent/Feed"; // You'll need to create this

function App() {
  const [userdata, setUserData] = useState([]);
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    loadUsers();
    loadAudits();
  }, []);

  const loadAudits = async () => {
    try {
      const res = await getAllAudits();
      const sorted = res.data.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
      });
      setAudits(sorted);
    } catch (err) {
      console.error("Failed to load audits");
    }
  };

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUserData(res.data);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login reloadAudits={loadAudits} />,
    },
    {
      path: "/register",
      element: <Register reload={loadUsers} reloadAudits={loadAudits} />,
    },
    // Routes with Layout wrapper
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "feed",
          element: <Feed />, // Create this component
        },
        {
          path: "profile/:userId",
          element: <Profile />,
        },
        {
          path: "user/update/:userId",
          element: <ProfileUpdate reloadAudits={loadAudits} />,
        },
      ],
    },
    // Admin routes (without Layout)
    {
      path: "/admin",
      element: <UsersList userdata={userdata} reload={loadUsers} reloadAudits={loadAudits} />,
    },
    {
      path: "/admin/add",
      element: <Add reload={loadUsers} reloadAudits={loadAudits} />,
    },
    {
      path: "/admin/update/:userId",
      element: <Update userdata={userdata} reload={loadUsers} reloadAudits={loadAudits} />,
    },
    {
      path: "/admin/audit",
      element: <AuditPage audits={audits} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;




// import { useEffect, useState } from "react";
// import UsersList from "./AdminComponents/UsersList";
// import Add from "./AdminComponents/Add";
// import Update from "./AdminComponents/Update";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { getAllUsers } from "./Api/UserApi";
// import { getAllAudits } from "./Api/AuditApi";
// import Profile from "./UserComponent/Profile";
// import Login from "./UserComponent/Login";
// import Register from "./UserComponent/Register";
// import ProfileUpdate from "./UserComponent/ProfileUpdate";
// import AuditPage from "./AdminComponents/AuditPage";

// function App() {
//   const [userdata, setUserData] = useState([]);
//   const [audits, setAudits] = useState([]);

//   useEffect(() => {
//     loadUsers();
//     loadAudits();
//   }, []);

//   const loadAudits = async () => {
//     try {
//         const res = await getAllAudits();
//         // SORT ONLY BY TIME
//         const sorted = res.data.sort((a, b) => {
//             const timeA = new Date(a.createdAt).getTime();
//             const timeB = new Date(b.createdAt).getTime();
//             return timeB - timeA; // latest first
//         });
//         setAudits(sorted);
//     } catch (err) {
//       console.error("Failed to load audits");
//     }
//   };

//   const loadUsers = async () => {
//     const res = await getAllUsers();
//     setUserData(res.data);
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login reloadAudits={loadAudits} />,
//     },
//     {
//       path: "/admin",
//       element: <UsersList userdata={userdata} reload={loadUsers} reloadAudits={loadAudits} />,
//     },
//     {
//       path: "/admin/add",
//       element: <Add reload={loadUsers} reloadAudits={loadAudits} />,
//     },
//     {
//       path: "/admin/update/:userId",
//       element: <Update userdata={userdata} reload={loadUsers} reloadAudits={loadAudits} />,
//     },
//     {
//       path: "/admin/audit",
//       element: <AuditPage audits={audits} />,
//     },
//     {
//       path: "/profile/:userId",
//       element: <Profile />,
//     },
//     {
//       path: "/user/update/:userId",
//       element: <ProfileUpdate reloadAudits={loadAudits} />,
//     },
//     {
//       path: "/register",
//       element: <Register reload={loadUsers} reloadAudits={loadAudits} />,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
