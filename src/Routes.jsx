/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  // Navigate,
} from "react-router-dom";
import App from "./App";
import Layout from "./layout.jsx";
import AIList from "./AIList";
import Dashboard from "./Dashboard/Dashboard";
import { DashboardHome } from "./Dashboard/DashboardHome";
import { ManageSubscriptions } from "./Dashboard/ManageSubscriptions";
import { MyOrders } from "./Dashboard/MyOrder";
import Settings from "./Dashboard/Settings";
import { useMyContext } from "./context/MyContext";

const AppRoutes = () => {


  const PrivateRoute = ({ children }) => {
    const { session } = useMyContext(); // Fix: Add parentheses to hook call
    const location = useLocation();

    if (!session) {
      // Redirect to login while saving the attempted URL
      return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/aiList" element={<AIList />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }>
            <Route path="" element={<DashboardHome />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="subscriptions" element={<ManageSubscriptions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
