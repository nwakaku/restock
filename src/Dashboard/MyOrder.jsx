/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import {
  LuChevronRight,
  LuShoppingCart,
  LuClock,
  LuPackage,
  LuTruck,
  LuCheck,
} from "react-icons/lu";

// Mock data structure
const mockOrders = [
  {
    id: "1234",
    items: [
      { name: "Organic Bananas", quantity: 1, price: 3.99 },
      { name: "Whole Milk", quantity: 2, price: 4.99 },
      { name: "Avocados", quantity: 3, price: 5.99 },
    ],
    status: "delivered",
    orderDate: "2024-03-15T10:30:00",
    total: 54.99,
    deliveryTime: "2:00 PM - 3:00 PM",
    trackingSteps: ["ordered", "preparing", "on_the_way", "delivered"],
  },
  {
    id: "1235",
    items: [
      { name: "Fresh Strawberries", quantity: 1, price: 6.99 },
      { name: "Greek Yogurt", quantity: 2, price: 4.5 },
    ],
    status: "on_the_way",
    orderDate: "2024-03-15T11:45:00",
    total: 42.5,
    deliveryTime: "3:00 PM - 4:00 PM",
    trackingSteps: ["ordered", "preparing", "on_the_way"],
  },
  {
    id: "1236",
    items: [
      { name: "Organic Eggs", quantity: 1, price: 5.99 },
      { name: "Whole Grain Bread", quantity: 1, price: 4.99 },
      { name: "Baby Spinach", quantity: 1, price: 3.99 },
    ],
    status: "preparing",
    orderDate: "2024-03-15T12:15:00",
    total: 38.99,
    deliveryTime: "4:00 PM - 5:00 PM",
    trackingSteps: ["ordered", "preparing"],
  },
];

const getStatusColor = (status) => {
  const colors = {
    preparing: "bg-yellow-100 text-yellow-800",
    on_the_way: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status) => {
  const texts = {
    preparing: "Preparing",
    on_the_way: "On the way",
    delivered: "Delivered",
  };
  return texts[status] || status;
};

const TrackingProgress = ({ steps, currentStep }) => {
  const stepIcons = {
    ordered: LuClock,
    preparing: LuPackage,
    on_the_way: LuTruck,
    delivered: LuCheck,
  };

  return (
    <div className="flex items-center w-full mt-4">
      {steps.map((step, index) => {
        const Icon = stepIcons[step];
        const isCompleted = steps.indexOf(currentStep) >= index;
        const isLast = index === steps.length - 1;

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
              {/* <span className="text-xs mt-1 text-gray-500 capitalize">
                {step.replace("_", " ")}
              </span> */}
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

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6 hover:border-green-500 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-green-50 p-2 rounded-lg">
            <LuShoppingCart className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="font-medium">Order #{order.id}</h3>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(order.orderDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          {order.items.length} items • ${order.total.toFixed(2)}
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
          steps={order.trackingSteps}
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
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Delivery Time</h4>
              <p className="text-sm text-gray-600">{order.deliveryTime}</p>
            </div>
            <Button
              size="sm"
              color="success"
              variant="flat"
              className={"w-full mt-2"}
              //   onClick={() => addToCart(item)}
            >
              Reorder
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const MyOrders = () => {
  return (
    <div className="lg:ml-64 pt-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white border-b">
        <h1 className="text-xl font-bold sm:text-2xl">My Orders</h1>
      </div>
      <main className="px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <button className="text-green-600 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <LuChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyOrders;
