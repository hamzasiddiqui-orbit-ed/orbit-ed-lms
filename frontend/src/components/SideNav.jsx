import React, { useContext } from "react";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SideNavButton from "./SideNavButton";
import OrbitEdLogoColored from "../assets/Orbit-Ed-logo-coloured.svg";
import { RxDashboard } from "react-icons/rx";
import { PiGraduationCap } from "react-icons/pi";
import {
  HiOutlineUserGroup,
  HiOutlineFolderMinus,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

function SideNav() {
  const {
    setReportId,
    setModuleName,
    setTotalScore,
    setDerivedParameter,
    setBaseParameter,
    setSelectedModule,
    setSelectedSessionCount,
    setShowQuiz,
  } = useContext(SessionReportContext);

  const { logoutMutation } = useAuth();

  const handleLogOut = async (e) => {
    try {
      logoutMutation.mutate();
    } catch (err) {
      console.log(`ERROR (SideNav.jsx): ${err.message}`);
    }
  };

  // Set SessionReport Context to null
  const handleButtonClick = () => {
    setReportId(null);
    setModuleName(null);
    setTotalScore(null);
    setDerivedParameter(null);
    setBaseParameter(null);
    setSelectedModule(null);
    setSelectedSessionCount(null);
    setShowQuiz(null);
  };

  return (
    <div className="drawer-side h-full">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-sideNavBG text-base-content h-full w-80 lg:w-52 rounded-e-3xl flex flex-col items-center justify-between">
        {/* Sidebar content here */}
        <img src={OrbitEdLogoColored} alt="Orbit-Ed" className="size-32 mt-5" />

        <div className="pb-32 ms-2 sm:ms-0 w-full">
          <NavLink
            to="my-dashboard"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <SideNavButton
                icon={RxDashboard}
                text="My Dashboard"
                className={isActive ? "active" : ""}
                onClick={handleButtonClick}
              />
            )}
          </NavLink>
          <NavLink
            to="user-report"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <SideNavButton
                icon={PiGraduationCap}
                text="User Reports"
                className={isActive ? "active" : ""}
                onClick={handleButtonClick}
              />
            )}
          </NavLink>
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
          {!logoutMutation.isPending ? (
            <SideNavButton
              icon={IoLogOutOutline}
              text="Log Out"
              onClick={handleLogOut}
            />
          ) : (
            <SideNavButton
              icon={IoLogOutOutline}
              text="Pending"
              onClick={handleLogOut}
            />
          )}
        </div>
      </ul>
    </div>
  );
}

export default SideNav;
