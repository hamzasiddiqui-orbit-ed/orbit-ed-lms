import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";

const UserAvatar = () => {
  const { state: userState } = useContext(UserContext);
  const name = userState.user.name;

  return (
    <div className="flex absolute top-10 end-10 btn bg-core border-0 shadow-core rounded-full">
      <div className="avatar online placeholder">
        <div className="bg-textLight text-core w-8 rounded-full">
          <span className="text-xs">T</span>
        </div>
      </div>
      <p className="mt-1  ms-1 font-semibold text-textLight">{name}</p>
    </div>
  );
};

export default UserAvatar;
