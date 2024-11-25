/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import App from "./App";
import AIList from "./AIList";
import Dashboard from "./Dashboard/Dashboard";
import { DashboardHome } from "./Dashboard/DashboardHome";
import { ManageSubscriptions } from "./Dashboard/ManageSubscriptions";
import { MyOrders } from "./Dashboard/MyOrder";
import Settings from "./Dashboard/Settings";
import { useMyContext } from "./context/MyContext";
import Header from "./components/Header";
import AIChat from "./Dashboard/AIChat";

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
      <div className="layout">
        <Header/>
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
            <Route path="chat" element={<AIChat />} />
            <Route path="subscriptions" element={<ManageSubscriptions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
