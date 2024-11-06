import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Layout from "./layout";
import AIList from "./AIList";
import Dashboard from "./Dashboard/Dashboard";
import { DashboardHome } from "./Dashboard/DashboardHome";
import { ManageSubscriptions } from "./Dashboard/ManageSubscriptions";
import { MyOrders } from "./Dashboard/MyOrder";
import Settings from "./Dashboard/Settings";
// import { AIList } from "./AIList";



const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/aiList" element={<AIList />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
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
