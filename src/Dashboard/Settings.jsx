/* eslint-disable react/prop-types */
import { Card } from "@nextui-org/react";
import { useState } from "react";
import {
//   LuUser,
//   LuBell,
//   LuCreditCard,
//   LuHome,
//   LuShield,
//   LuToggleLeft,
//   LuToggleRight,
  LuChevronRight,
//   LuMail,
//   LuPhone,
  LuFileEdit,
  LuPlus,
} from "react-icons/lu";

const SettingSection = ({ children, title, description }) => (
  <div className="border-b border-gray-200 py-6">
    <div className="mb-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
    {children}
  </div>
);

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
      enabled ? "bg-green-500" : "bg-gray-200"
    }`}>
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const AddressCard = ({ address, isDefault, onEdit, onSetDefault }) => (
  <div className="bg-white border rounded-lg p-4 mb-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium">{address.name}</p>
        <p className="text-sm text-gray-600 mt-1">{address.street}</p>
        <p className="text-sm text-gray-600">
          {address.city}, {address.state} {address.zip}
        </p>
        {isDefault && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
            Default
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <button onClick={onEdit} className="text-gray-400 hover:text-gray-500">
          <LuFileEdit className="h-5 w-5" />
        </button>
      </div>
    </div>
    {!isDefault && (
      <button
        onClick={onSetDefault}
        className="mt-3 text-green-600 text-sm font-medium">
        Set as default
      </button>
    )}
  </div>
);

const PaymentMethodCard = ({ method, isDefault, onEdit, onSetDefault }) => (
  <div className="bg-white border rounded-lg p-4 mb-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium">•••• •••• •••• {method.lastFour}</p>
        <p className="text-sm text-gray-600 mt-1">Expires {method.expiry}</p>
        {isDefault && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
            Default
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <button onClick={onEdit} className="text-gray-400 hover:text-gray-500">
          <LuFileEdit className="h-5 w-5" />
        </button>
      </div>
    </div>
    {!isDefault && (
      <button
        onClick={onSetDefault}
        className="mt-3 text-green-600 text-sm font-medium">
        Set as default
      </button>
    )}
  </div>
);

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    promotions: false,
  });

  const [addresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      street: "456 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      isDefault: false,
    },
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      lastFour: "4242",
      expiry: "12/24",
      isDefault: true,
    },
    {
      id: 2,
      lastFour: "5678",
      expiry: "03/25",
      isDefault: false,
    },
  ]);

  const [personalInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  });

  return (
    <div className="lg:ml-64 pt-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white border-b">
        <h1 className="text-xl font-bold sm:text-2xl">Settings</h1>
      </div>

      <Card className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8 my-2">
        {/* Personal Information */}
        <SettingSection
          title="Personal Information"
          description="Update your personal details and contact information.">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="mt-1">{personalInfo.name}</p>
              </div>
              <button className="text-green-600 text-sm font-medium">
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{personalInfo.email}</p>
              </div>
              <button className="text-green-600 text-sm font-medium">
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">{personalInfo.phone}</p>
              </div>
              <button className="text-green-600 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </SettingSection>

        {/* Notification Preferences */}
        <SettingSection
          title="Notification Preferences"
          description="Manage how you receive updates and alerts.">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive order updates via email
                </p>
              </div>
              <Toggle
                enabled={notifications.email}
                onChange={(enabled) =>
                  setNotifications({ ...notifications, email: enabled })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive alerts on your device
                </p>
              </div>
              <Toggle
                enabled={notifications.push}
                onChange={(enabled) =>
                  setNotifications({ ...notifications, push: enabled })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive text message updates
                </p>
              </div>
              <Toggle
                enabled={notifications.sms}
                onChange={(enabled) =>
                  setNotifications({ ...notifications, sms: enabled })
                }
              />
            </div>
          </div>
        </SettingSection>

        {/* Delivery Addresses */}
        <SettingSection
          title="Delivery Addresses"
          description="Manage your delivery locations.">
          <div className="space-y-4">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isDefault={address.isDefault}
                onEdit={() => console.log("Edit address:", address.id)}
                onSetDefault={() =>
                  console.log("Set default address:", address.id)
                }
              />
            ))}
            <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center">
              <LuPlus className="h-5 w-5 mr-2" />
              Add New Address
            </button>
          </div>
        </SettingSection>

        {/* Payment Methods */}
        <SettingSection
          title="Payment Methods"
          description="Manage your payment options.">
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                isDefault={method.isDefault}
                onEdit={() => console.log("Edit payment method:", method.id)}
                onSetDefault={() =>
                  console.log("Set default payment method:", method.id)
                }
              />
            ))}
            <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center">
              <LuPlus className="h-5 w-5 mr-2" />
              Add New Payment Method
            </button>
          </div>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection
          title="Security"
          description="Manage your account security settings.">
          <div className="space-y-4">
            <button className="w-full flex justify-between items-center py-2 text-left">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">
                  Update your account password
                </p>
              </div>
              <LuChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            <button className="w-full flex justify-between items-center py-2 text-left">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <LuChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </SettingSection>
      </Card>
    </div>
  );
};

export default Settings;
