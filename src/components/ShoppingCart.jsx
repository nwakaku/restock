/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  //   Input,
  Switch,
  Divider,
  RadioGroup,
  Radio,
  Textarea,
} from "@nextui-org/react";
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiX,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiMapPin,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [saveSubscription, setSaveSubscription] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const updateQuantity = (itemId, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 4.99;
  const serviceFee = 2.0;
  const totalAmount = subtotal + deliveryFee + serviceFee;

  const handleCheckout = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log({
      items: cartItems,
      totalAmount,
      deliveryAddress,
      deliveryTime,
      paymentMethod,
      saveSubscription,
      specialInstructions,
    });

    setIsLoading(false);
    setIsCheckoutOpen(false);
    navigate("/dashboard/orders");
  };

  const deliveryTimeOptions = [
    { id: "1", time: "Today, 2:00 PM - 3:00 PM", available: true },
    { id: "2", time: "Today, 3:00 PM - 4:00 PM", available: true },
    { id: "3", time: "Today, 4:00 PM - 5:00 PM", available: false },
    { id: "4", time: "Tomorrow, 9:00 AM - 10:00 AM", available: true },
  ];

  return (
    <div className="lg:sticky lg:top-4 h-fit">
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardBody className="p-4">
          {/* Cart Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <FiShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
            </div>
            {cartItems.length > 0 && (
              <span className="text-sm font-medium text-gray-500">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {/* Empty State */}
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-700 font-medium mb-1">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500">
                Add items to get started with your order
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 group hover:bg-gray-50 rounded-lg transition-colors duration-150 px-2">
                    <img
                      src={item.image || "/api/placeholder/48/48"}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} / {item.unit || "item"}
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-600 hover:text-gray-800">
                          <FiMinus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-600 hover:text-gray-800">
                          <FiPlus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        onClick={() => removeFromCart(item.id)}>
                        <FiX className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Price Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">${serviceFee.toFixed(2)}</span>
                </div>
                <Divider />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                color="success"
                size="lg"
                className="w-full mt-4 font-medium"
                onClick={() => setIsCheckoutOpen(true)}>
                Proceed to Checkout
                <FiChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Checkout Modal */}
      <Modal
        size="2xl"
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">Checkout</h3>
            <p className="text-sm text-gray-500">Complete your order details</p>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              {/* Delivery Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FiMapPin className="w-4 h-4" />
                  Delivery Address
                </label>
                <Textarea
                  placeholder="Enter your complete delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Delivery Time */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FiClock className="w-4 h-4" />
                  Delivery Time
                </label>
                <RadioGroup
                  value={deliveryTime}
                  onValueChange={setDeliveryTime}>
                  <div className="grid gap-2">
                    {deliveryTimeOptions.map((option) => (
                      <Radio
                        key={option.id}
                        value={option.id}
                        disabled={!option.available}>
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={
                              option.available
                                ? "text-gray-700"
                                : "text-gray-400"
                            }>
                            {option.time}
                          </span>
                          {!option.available && (
                            <span className="text-xs text-red-500">
                              Unavailable
                            </span>
                          )}
                        </div>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FiCreditCard className="w-4 h-4" />
                  Payment Method
                </label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}>
                  <div className="space-y-2 space-x-2">
                    <Radio value="credit-card">Credit Card</Radio>
                    <Radio value="debit-card">Debit Card</Radio>
                    <Radio value="paypal">PayPal</Radio>
                  </div>
                </RadioGroup>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FiAlertCircle className="w-4 h-4" />
                  Special Instructions
                </label>
                <Textarea
                  placeholder="Add any special delivery instructions..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Save for Subscription */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Remove from recurring orders</span>
                </div>
                <Switch
                  checked={saveSubscription}
                  onChange={() => setSaveSubscription(!saveSubscription)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setIsCheckoutOpen(false)}>
              Cancel
            </Button>
            <Button
              color="success"
              onClick={handleCheckout}
              isLoading={isLoading}>
              Place Order • ${totalAmount.toFixed(2)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
