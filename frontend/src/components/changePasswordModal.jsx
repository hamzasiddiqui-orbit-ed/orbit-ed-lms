import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import classNames from "classnames";

const ChangePasswordModal = () => {
  const { changePasswordMutation } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    console.log("handleChangePassword called.");

    e.preventDefault();
    setPasswordError("");

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      console.log("awaiting changepassword");
      await changePasswordMutation.mutateAsync(
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          onError: (error) => {
            setPasswordError(
              error.response?.data?.message ||
                "An unexpected error occured. Please try again later."
            );
          },
        }
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setIsModalOpen(false);

      // Show success toast
    } catch (error) {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setPasswordError(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn rounded-xl bg-red-600 border-0 text-core px-5 hover:bg-progressBasic"
      >
        Change Password
      </button>

      {/* Change Password Modal */}
      <input
        type="checkbox"
        id="change-password-modal"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => setIsModalOpen(!isModalOpen)}
      />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-xl font-medium text-headingDark text-start">
            Change Password
          </h1>
          <form onSubmit={handleChangePassword} className="pt-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-textDark">
                  Current Password *
                </span>
              </label>

              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="input input-sm input-bordered border-utility rounded-xl"
                required
              />
            </div>

            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text text-textDark">New Password *</span>
              </label>

              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="input input-sm input-bordered border-utility rounded-xl"
                required
              />
            </div>

            <div className="form-control mt-2 mb-4">
              <label className="label">
                <span className="label-text text-textDark">
                  Confirm New Password *
                </span>
              </label>

              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className="input input-sm input-bordered border-utility rounded-xl"
                required
              />
            </div>

            {passwordError && (
              <p className="text-red-500 mt-2 text-start">{passwordError}</p>
            )}
            <div className="modal-action mt-2">
              <div className="w-full flex justify-between">
                <button
                  type="button"
                  className="btn rounded-xl bg-sideNavBG border-0 text-textDark hover:bg-progressBasic"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn rounded-xl bg-sideNavBG border-0 text-textDark hover:bg-progressBasic"
                >
                  {changePasswordMutation.isPending ? (
                    <>
                      <div className="flex justify-evenly">
                        <span className="loading loading-dots loading-md"></span>
                      </div>
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          Close
        </label>
      </div>
    </>
  );
};

export default ChangePasswordModal;
