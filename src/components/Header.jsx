import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  Image,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function Header() {

    const navigate = useNavigate();

    const handleRoute = () => {
        navigate('/')
    }

  return (
    <Navbar maxWidth="2xl" className="py-2">
      <NavbarBrand>
        <div
          onClick={() => handleRoute()}
          className="flex justify-center items-center space-x-2 cursor-pointer">
          <FaBars size={20} />
          <span className="flex">
            <Image
              src="https://res.cloudinary.com/dgbreoalg/image/upload/v1730492969/apron_z9z60j.png"
              width={30}
            />

            <h2 className="font-extrabold text-inherit text-2xl text-green-900">
              restock.ai
            </h2>
          </span>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
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
            placeholder="search product and services..."
            // size="sm"
            startContent={<FaSearch size={18} />}
            type="search"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            href="/dashboard"
            variant="flat"
            className="rounded-full px-12 text-black bg-gray-200">
            <p>Log in</p>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/dashboard"
            variant="flat"
            className="rounded-full bg-green-700 px-12 text-white">
            <p>Sign Up</p>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
