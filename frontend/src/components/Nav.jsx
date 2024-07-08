import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Accordion,
  AccordionItem
} from "@nextui-org/react";
import { FiLogOut } from "react-icons/fi";
import OrbitLogo from "../assets/orbitLogoSecondary.png";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const DropdownContent = ({ variant, color }) => (
    <Dropdown>
      <DropdownTrigger>
        <Button color={color} variant={variant} className="capitalize h-12">
          <User
            name={userInfo.name}
            description={userInfo.jobTitle}
            className=""
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu color={color} variant={variant}>
        {/* <DropdownItem key="new">New file</DropdownItem> */}
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<FiLogOut />}
          onClick={handleLogOut}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLogOut = async () => {
    try {

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="top-0 h-18 fixed"
      style={{
        backgroundColor: "#212132",
      }}
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img
            src={OrbitLogo}
            alt="Orbit-ED"
            style={{ width: "50px" }}
            className="mr-3"
          />
          <p className="font-bold text-3xl">ORBIT-ED</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <DropdownContent color="warning" variant="flat" />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
