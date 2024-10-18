import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Dashboard from "./Component/Dashboard";
import DetailsPage from "./Component/DetailsPage.jsx";
import Profile from "./Component/Profile.jsx";
import NotificationPanel from "./Component/NotificationPanel.jsx";
import { useState } from "react";
import { UserProvider } from './Data/userContext'; 

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons"; // Icons for notification

function App() {
  const [showNotifications, setShowNotifications] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
        </>
      ),
      children: [
        { index: true, element: <Dashboard /> }, // Default route
        { path: "detailspage", element: <DetailsPage /> },
        { path: "profile", element: <Profile /> }, // Add Profile route
        { path: "notification", element: <NotificationPanel /> }, // Optional route
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="fixed top-16 left-4 bg-indigo-600 text-white p-3 rounded-full z-50"
      >
        <FontAwesomeIcon icon={showNotifications ? faBellSlash : faBell} size="lg" />
      </button>

      {showNotifications && <NotificationPanel />}
    </UserProvider>
  );
}

export default App;
