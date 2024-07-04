import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import OrbitEdLogoWhite from "../assets/Orbit-Ed-logo-white.svg";
import { RxDashboard } from "react-icons/rx";
import { PiGraduationCap } from "react-icons/pi";
import {
  HiOutlineUserGroup,
  HiOutlineFolderMinus,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import SideNavButton from "./SideNavButton";

function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-brand text-base-content min-h-full w-80 lg:w-52 rounded-e-3xl flex flex-col items-center justify-between">
        {/* Sidebar content here */}
        <img src={OrbitEdLogoWhite} alt="Orbit-Ed" className="size-24 mt-5" />

        <div className="pb-32 ms-2 sm:ms-0 w-full">
          <SideNavButton icon={RxDashboard} text="My Dashboard" />
          <SideNavButton icon={PiGraduationCap} text="Learner Board" />
          <SideNavButton icon={HiOutlineUserGroup} text="Team Board" />
          <SideNavButton icon={HiOutlineFolderMinus} className="h-14">
            <p className="font-light text-left leading-7 sm:leading-5 tracking-wide">
              Course
              <br />
              Management
            </p>
          </SideNavButton>
          <SideNavButton icon={IoSettingsOutline} text="Settings" />
        </div>

        <div className="mb-5 ms-2 sm:ms-0 w-full">
          <SideNavButton icon={HiOutlineUserCircle} text="My Profile" />
          <SideNavButton
            icon={IoLogOutOutline}
            text="Log Out"
            onClick={handleLogOut}
          />
        </div>
      </ul>
    </div>
  );
}

export default SideNav;
