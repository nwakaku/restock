import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  LuArrowRight,
  LuChevronRight,
  LuHome,
  LuPlus,
  LuShoppingCart,
  LuSparkles,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import supabaseUtil from "../utils/supabase";
import BottomNav from "../components/BottomNav";

export const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);

  const { user, session } = useMyContext();

  // Fetch recent orders from Supabase
  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const { data, error } = await supabaseUtil
          .from("orders")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setRecentOrders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    if (session.user.id) {
      fetchRecentOrders();
    }
  }, [session.user.id]);

  const handleCheckout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate(`/aiList?prompt=${encodeURIComponent(inputValue)}`);
  };

  const navigate = useNavigate();


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    return date.toLocaleDateString();
  };

  const getOrderStatus = (status) => {
    const statusMap = {
      'pending': { text: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
      'processing': { text: 'Processing', class: 'bg-blue-100 text-blue-800' },
      'delivered': { text: 'Delivered', class: 'bg-green-100 text-green-800' },
      'cancelled': { text: 'Cancelled', class: 'bg-red-100 text-red-800' }
    };
    return statusMap[status] || statusMap['pending'];
  };

  

  return (
    <div className="lg:ml-64 pt-0">
      {/* Welcome Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white border-b">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            Hey, {user.full_name} 👋
          </h1>
          <p className="text-gray-600 text-sm mt-1 hidden sm:block">
            Ready to create your smart shopping list?
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* AI Input Section */}
        <div className="max-w-3xl mx-auto mb-8 ">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-md border-1 border-gray-100">
            <h2 className="text-lg sm:text-xl font-medium mb-4">
              {" What's on your list today?"}
            </h2>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
              <Input
                type="text"
                placeholder="Prompt: A month grocery for a bachelor with $2000 budget"
                className="flex-1 p-4 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                startContent={
                  <LuSparkles className="text-yellow-500 w-5 h-5" />
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                isLoading={isLoading}
                onClick={handleCheckout}
                className="bg-green-700 text-white py-4 px-8 rounded-xl font-medium hover:bg-green-700 transition-colors whitespace-nowrap">
                Generate Smart Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-lg font-medium mb-4 sm:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Reorder Last Cart",
                icon: LuShoppingCart,
                color: "bg-blue-50",
                navigate: "/dashboard/orders",
              },
              {
                label: "Weekly Essentials",
                icon: LuPlus,
                color: "bg-green-50",
                navigate: "/aiList",
              },
              {
                label: "View Templates",
                icon: LuHome,
                color: "bg-purple-50",
                navigate: "/dashboard/orders",
              },
              {
                label: "Subscriptions",
                icon: LuArrowRight,
                color: "bg-orange-50",
                navigate: "/dashboard/subscriptions",
              },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.navigate)}
                className={`${action.color} p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center space-y-2 hover:opacity-90 transition-opacity`}>
                <action.icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                <span className="text-sm font-medium text-gray-800 text-center">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <button className="text-blue-600 text-sm font-medium flex items-center space-x-1">
              <span onClick={() => navigate("/dashboard/orders")}>
                View All
              </span>
              <LuChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                onClick={() => navigate("/dashboard/orders")}
                className="bg-white border rounded-xl p-4 sm:p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <LuShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium">
                      Order #{order.id.toString().slice(0, 4)}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(order.created_at)}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {order.items.length} items • ₦
                    {order.total_amount.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getOrderStatus(order.status).class
                      }`}>
                      {getOrderStatus(order.status).text}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
