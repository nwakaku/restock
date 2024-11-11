import { useEffect, useState } from "react";
import { Card, CardBody, Button, Switch, Input } from "@nextui-org/react";
import { FiFilter, FiGrid, FiSearch, FiX } from "react-icons/fi";
import { FaList } from "react-icons/fa6";
import { LuSparkles } from "react-icons/lu";
import { suggestedItems } from "./data/dummyList";
import ShoppingCart from "./components/ShoppingCart";
import AIPromptModal from "./components/AIPromptModal";
import { useSearchParams } from "react-router-dom";
import { useMyContext } from "./context/MyContext";
// import ShoppingCart from "./ShoppingCart";

const NextUIShoppingInterface = () => {
  const [isAIMode, setIsAIMode] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([
    "Monthly company Dinner of 500",
    "Grocery for family of 6",
  ]);
    const { cartItems, setCartItems } = useMyContext();
  // Inside your NextUIShoppingInterface component, add this state
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  // Capture the prompt from the URL
  useEffect(() => {
    const prompt = searchParams.get("prompt");
    if (prompt) {
      setSearchQuery(prompt);
      setIsAIMode(true);
      setIsPromptModalOpen(true);
    }
  }, [searchParams]);

  const categories = [
    { name: "Produce", icon: "🥬" },
    { name: "Pantry", icon: "🥫" },
    { name: "Dairy", icon: "🥛" },
    { name: "Meat", icon: "🥩" },
    { name: "Beverages", icon: "🥤" },
  ];

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
    setSearchQuery(tag);
    setIsPromptModalOpen(true);
  };

  // Add this function to handle search/prompt submission
  const handleSearch = (e) => {
    if (e.key === "Enter" && isAIMode && searchQuery.trim()) {
      setIsPromptModalOpen(true);
    }
  };

  // Updated handleGenerateAIList to handle the generated list
  const handleGenerateAIList = (generatedList) => {
    // Add the generated items to the cart
    if (generatedList && generatedList.items) {
      // Add all items from the generated list to the cart
      setCartItems((prev) => {
        const newItems = generatedList.items.map((item) => ({
          ...item,
          image:
            item.image ||
            "https://cdn.arabsstock.com/uploads/images/156537/image-156537-various-goods-foodstuffs-supermarket-shelves-purchasing-thumbnail.webp",
        }));

        // Merge with existing items, combining quantities for duplicates
        const mergedItems = [...prev];
        newItems.forEach((newItem) => {
          const existingItemIndex = mergedItems.findIndex(
            (item) => item.id === newItem.id
          );
          if (existingItemIndex !== -1) {
            mergedItems[existingItemIndex] = {
              ...mergedItems[existingItemIndex],
              quantity:
                mergedItems[existingItemIndex].quantity + newItem.quantity,
            };
          } else {
            mergedItems.push(newItem);
          }
        });

        return mergedItems;
      });

      // Add the list name as a tag if it's not already present
      if (generatedList.name) {
        setSelectedTags((prev) => {
          if (!prev.includes(generatedList.name)) {
            return [...prev, generatedList.name];
          }
          return prev;
        });
      }
    }

    // Close the modal and clear the search
    setIsPromptModalOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Create Groceries List
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Manual</span>
          <Switch
            defaultSelected
            size="sm"
            color="success"
            checked={isAIMode}
            onChange={() => setIsAIMode(!isAIMode)}
          />
          <span className="text-sm text-gray-600">AI Assistant</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Bar */}

          <Input
            size="lg"
            radius="lg"
            placeholder={
              isAIMode
                ? "Prompt: A month grocery for a bachelor with $2000 budget"
                : "Search for groceries..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            startContent={
              isAIMode ? (
                <LuSparkles className="text-[#FFDF00] w-5 h-5" />
              ) : (
                <FiSearch className="text-gray-400 w-5 h-5" />
              )
            }
            classNames={{
              input: "text-base",
              inputWrapper: "shadow-sm",
            }}
          />

          {/* Add the modal component at the end of your return statement */}
          <AIPromptModal
            isOpen={isPromptModalOpen}
            onClose={() => setIsPromptModalOpen(false)}
            prompt={searchQuery}
            onConfirm={handleGenerateAIList}
          />

          {/* AI Tags */}
          {isAIMode && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Button
                  key={tag}
                  size="sm"
                  variant="flat"
                  color="default"
                  onClick={() => removeTag(tag)}
                  endContent={<FiX className="w-3 h-3" />}>
                  {tag}
                </Button>
              ))}
            </div>
          )}
          {/* Categories */}
          {!isAIMode && (
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="flat"
                    className="whitespace-nowrap">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {/* View Controls */}
          <div className="flex justify-between items-center">
            <Button
              size="sm"
              variant="flat"
              startContent={<FiFilter className="w-4 h-4" />}>
              Filters
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "solid" : "flat"}
                onClick={() => setViewMode("grid")}>
                <FiGrid className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "solid" : "flat"}
                onClick={() => setViewMode("list")}>
                <FaList className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* Products Grid */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                : "space-y-4"
            }>
            {suggestedItems.map((item) => (
              <Card
                key={item.id}
                shadow="sm"
                className="border border-gray-100">
                <CardBody
                  className={
                    viewMode === "grid"
                      ? "p-0"
                      : "flex-row items-center gap-4 p-3"
                  }>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={
                        viewMode === "grid"
                          ? "w-full p-2 aspect-square object-cover"
                          : "w-20 h-20 rounded-lg object-cover"
                      }
                    />
                    {item.discount && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Save {item.discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex-1">
                    <p className=" text-base text-gray-800">{item.name}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-gray-900 font-semibold">
                        ${item.price}
                      </span>
                      {item.unit && (
                        <span className="text-gray-500 text-sm">
                          /{item.unit}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      className={viewMode === "grid" ? "w-full mt-2" : "mt-2"}
                      onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Panel */}
        <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
};

export default NextUIShoppingInterface;
