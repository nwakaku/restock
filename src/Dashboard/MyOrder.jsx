/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import {
  LuChevronRight,
  LuShoppingCart,
  LuClock,
  LuPackage,
  LuTruck,
  LuCheck,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import supabaseUtil from "../utils/supabase";
import BottomNav from "../components/BottomNav";

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    on_the_way: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status) => {
  const texts = {
    pending: "Pending",
    processing: "Processing",
    on_the_way: "On the way",
    delivered: "Delivered",
    cancelled: "Cancelled"
  };
  return texts[status] || status;
};

const TrackingProgress = ({ steps, currentStep }) => {

  console.log(steps);
  
  const stepIcons = {
    pending: LuClock,
    processing: LuPackage,
    on_the_way: LuTruck,
    delivered: LuCheck,
  };

  const allSteps = ["pending", "processing", "on_the_way", "delivered"];
  const currentStepIndex = allSteps.indexOf(currentStep);

  return (
    <div className="flex items-center w-full mt-4">
      {allSteps.map((step, index) => {
        const Icon = stepIcons[step];
        const isCompleted = currentStepIndex >= index;
        const isLast = index === allSteps.length - 1;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}>
                <Icon
                  className={`h-4 w-4 ${
                    isCompleted ? "text-white" : "text-gray-500"
                  }`}
                />
              </div>
            </div>
            {!isLast && (
              <div
                className={`h-0.5 flex-1 ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const OrderCard = ({ order, onReorder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6 hover:border-green-500 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-green-50 p-2 rounded-lg">
            <LuShoppingCart className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="font-medium">Order #{order.id.toString().slice(0,4)}</h3>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(order.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          {order.items.length} items • ₦{order.total_amount.toFixed(2)}
        </p>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              order.status
            )}`}>
            {getStatusText(order.status)}
          </span>
        </div>

        <TrackingProgress
          currentStep={order.status}
        />

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-green-600 text-sm font-medium flex items-center space-x-1">
          <span>{isExpanded ? "Hide Details" : "View Details"}</span>
          <LuChevronRight
            className={`h-4 w-4 transform transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-3 border-t pt-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Order Items</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-gray-600">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Delivery Time</h4>
              <p className="text-sm text-gray-600">{order.delivery_time}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Delivery Address</h4>
              <p className="text-sm text-gray-600">{order.delivery_address}</p>
            </div>
            <Button
              size="sm"
              color="success"
              variant="flat"
              className="w-full mt-2"
              onClick={() => onReorder(order.items)}>
              Reorder
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { session, setCartItems } = useMyContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabaseUtil
          .from("orders")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session?.user?.id]);

  const handleReorder = (items) => {
    setCartItems(items);
    navigate("/aiList");
  };


  return (
    <div className="lg:ml-64 pt-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white border-b">
        <h1 className="text-xl font-bold sm:text-2xl">My Orders</h1>
      </div>
      <main className="px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onReorder={handleReorder}
              />
            ))}
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default MyOrders;
