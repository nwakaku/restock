import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Image,
  Modal,
  Popover,
  Spacer,
  ModalHeader,
  ModalBody,
  Card,
  useDisclosure,
  ModalContent,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { LuMapPin, LuMenu, LuSparkles } from "react-icons/lu";
import { useMyContext } from "../context/MyContext";
import supabaseUtil from "../utils/supabase";
import AIPromptModal from "./AIPromptModal";
import { FiSearch } from "react-icons/fi";

const nigerianPlacesBaseUrl = import.meta.env.VITE_NIGERIAN_PLACES_API;

const sendHttpRequest = async (config, callback) => {
  try {
    const response = await fetch(`${config.baseUrl}/${config.url}`);
    const data = await response.json();
    callback({ data, message: response.ok ? "SUCCESS" : "ERROR" });
  } catch (error) {
    console.error("Error fetching data:", error);
    callback({ data: [], message: "ERROR" });
  }
};

const Header = () => {
  const navigate = useNavigate();
  const { session, setSession, cartItems, setShowCart, showCart } = useMyContext();
  const [notificationCount, setNotificationCount] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setUser, isAIMode, setIsAIMode, setCartItems, setSelectedTags } =
    useMyContext();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Abuja"]));
  const [nigerianStates, setNigerianStates] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Abuja");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const prompt = searchParams.get("prompt");
    if (prompt) {
      setSearchQuery(prompt);
      setIsAIMode(true);
      setIsPromptModalOpen(true);
    }
  }, [searchParams, setIsAIMode]);

  useEffect(() => {
    const handleSession = () => {
      supabaseUtil.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabaseUtil.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      setNotificationCount(2);

      return () => subscription.unsubscribe();
    };

    handleSession();
  }, []);

  useEffect(() => {
    const handleSetUser = () => {
      session && setUser(session.user.identities[0].identity_data);
    };

    handleSetUser();
  }, [session, setUser]);

  // console.log(user);

  useEffect(() => {
    const fetchStates = () => {
      sendHttpRequest(
        {
          url: "states",
          baseUrl: nigerianPlacesBaseUrl,
        },
        (response) => {
          const { data, message } = response;

          if (message === "SUCCESS") {
            const formattedStates = data.map((state) => ({
              id: state.id,
              name: state.name,
            }));

            setNigerianStates(formattedStates);
          }
        }
      );
    };

    fetchStates();
  }, []);

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
    const selectedState = nigerianStates.find(
      (state) => state.id === Array.from(keys)[0]
    );
    setSelectedValue(selectedState?.name || "");
  };

  const handleRoute = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/dashboard");
  };

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

  const handleSearch = (e) => {
    if (e.key === "Enter" && isAIMode && searchQuery.trim()) {
      setIsPromptModalOpen(true);
    }
  };

  return (
    <>
      <Navbar maxWidth="2xl" className="py-2 bg-white shadow-md">
        <NavbarBrand>
          <div className="flex justify-center items-center space-x-2 cursor-pointer">
            <div
              onClick={handleCartClick}
              className="p-2 rounded-xl border-1 border-green-700">
              <LuMenu size={20} />
            </div>

            <span className="flex" onClick={handleRoute}>
              <Image
                className=" lg:hidden"
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1730492969/apron_z9z60j.png"
                width={30}
              />
              <h2 className="font-extrabold hidden lg:flex text-inherit text-2xl text-green-900">
                <span className="text-green-700">Res</span>tock.ai
              </h2>
            </span>
          </div>
        </NavbarBrand>
        <NavbarContent className=" sm:flex gap-4" justify="center">
          <NavbarItem className="hidden lg:flex">
            <Input
              size="lg"
              radius="full"
              fullWidth="true"
              classNames={{
                base: "max-w-full h-10 w-[500px]",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal ring-1 ring-gray-300 text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
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
              type="search"
            />
          </NavbarItem>
          <NavbarItem className="lg:hidden ">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  startContent={<LuMapPin size={24} />}
                  variant="light"
                  className="capitalize rounded-full font-semibold text-base">
                  <p>
                    {selectedValue || "Select State"}{" "}
                    <span className="hidden lg:block">,Nigeria</span>{" "}
                  </p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select a state"
                className="max-h-60 overflow-y-auto text-default-500"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}>
                {nigerianStates.map((state) => (
                  <DropdownItem key={state.id}>
                    <p className="text-default-500">{state.name}</p>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {session ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      startContent={<LuMapPin size={24} />}
                      variant="light"
                      className="capitalize rounded-full font-semibold text-base">
                      <p>{selectedValue || "Select State"}, Nigeria</p>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Select a state"
                    className="max-h-60 overflow-y-auto text-default-500"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={handleSelectionChange}>
                    {nigerianStates.map((state) => (
                      <DropdownItem key={state.id}>
                        <p className="text-default-500">{state.name}</p>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <Popover>
                  <PopoverTrigger>
                    <div>
                      <div className="relative">
                        <FaBell size={24} />
                        {notificationCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {notificationCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Card>
                      <div className="p-2">
                        <h4>Notifications</h4>
                        <Spacer y={0.5} />
                        <h4>You have 2 new notifications</h4>
                      </div>
                    </Card>
                  </PopoverContent>
                </Popover>
              </NavbarItem>
              <NavbarItem className="flex">
                <Button
                  onClick={() => setShowCart(!showCart)}
                  variant="flat"
                  className="rounded-full lg:p-4 text-white bg-green-700 relative">
                  <FaShoppingCart size={18} />
                  {cartItems.length > 0 && (
                    <div>
                      <p className="text-base">{cartItems.length}</p>{" "}
                    </div>
                  )}
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button
                  onPress={onOpen}
                  variant="flat"
                  className="rounded-full px-12 text-black bg-gray-200">
                  <p>Log in</p>
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  onPress={onOpen}
                  variant="flat"
                  className="rounded-full bg-green-700 px-12 text-white">
                  <p>Sign Up</p>
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <h3 id="modal-title">Welcome to restock.ai</h3>
          </ModalHeader>
          <ModalBody>
            <Auth
              supabaseClient={supabaseUtil}
              appearance={{ theme: ThemeSupa }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <AIPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        prompt={searchQuery}
        onConfirm={handleGenerateAIList}
      />
    </>
  );
};

export default Header;
