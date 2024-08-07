import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/language.context";
import SideNav from "../components/SideNav";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import UserReport from "../components/UserReport";

function DashboardLearner() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { state } = useContext(LanguageContext);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerInput = document.getElementById("my-drawer-2");
  if (drawerInput) {
    drawerInput.checked = drawerOpen;
  }

  return (
    <div
      className="flex bg-core text-brand w-screen h-screen overflow-auto"
      dir={state.layout}
    >
      <div className="drawer lg:drawer-open relative min-h-full">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          onChange={handleDrawerToggle}
          checked={drawerOpen}
        />

        <div className="drawer-content flex-1 flex items-center justify-center overflow-auto">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-sm bg-brand drawer-button lg:hidden border-0 fixed top-4 right-5 z-50 rounded-full hover:bg-highlight"
          >
            {drawerOpen ? (
              <MdClose className="size-5 text-core" />
            ) : (
              <BiMenu className="size-5 text-core" />
            )}
          </label>

          <div className="w-full flex flex-col">
            <UserReport />
          </div>
        </div>
        <SideNav />
      </div>
    </div>
  );
}

export default DashboardLearner;
