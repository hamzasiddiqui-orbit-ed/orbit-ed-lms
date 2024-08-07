import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user.context";
import defaultProfilePic from "../assets/defaultProfilePic.jpg";
import { MdEdit } from "react-icons/md";
import { useUsers } from "../hooks/useUsers";
import ChangePasswordModal from "./changePasswordModal";

const ProfileSettings = () => {
  const { state: userState } = useContext(UserContext);
  const user = userState.user;

  const { updateProfileMutation } = useUsers();

  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    jobTitle: user.job_title || "",
    description: user.description || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      jobTitle: user.job_title || "",
      description: user.description || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync(formData);
      setIsEditing(false);
      showToast("success");
    } catch (error) {
      showToast("error");
    }
  };

  const showToast = (type) => {
    if (type == "success") {
      const toast = document.getElementById("toast-one");
      const toastType = document.getElementById("toast-success");

      if (toast) {
        toastType.innerHTML = `
          <span>Profile updated successfully</span>
        `;
        toast.classList.remove("hidden");
        toastType.classList.remove("hidden");
        setTimeout(() => {
          toast.classList.add("hidden");
          toastType.classList.add("hidden");
        }, 5000);
      }
    } else if (type == "error") {
      const toast = document.getElementById("toast-two");
      const toastType = document.getElementById("toast-error");

      if (toast) {
        toastType.innerHTML = `
          <span>Failed to update profile</span>
        `;
        toast.classList.remove("hidden");
        toastType.classList.remove("hidden");
        setTimeout(() => {
          toast.classList.add("hidden");
          toastType.classList.add("hidden");
        }, 5000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-core py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="flex flex-col w-3/4">
          <h1 className="text-3xl font-medium text-headingDark mb-4 ps-2 text-start">
            Profile Settings
          </h1>

          <div className="flex flex-col bg-sideNavBG rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-sideNavBG ring-offset-base-100 ring-offset-2">
                  <img src={defaultProfilePic} alt="Profile" />
                </div>

                <label className="btn btn-sm rounded-full bg-core hover:bg-progressBasic hover:cursor-pointer border-sideNavHighlight hover:border-progressBasic z-50 absolute left-[80px] top-14 px-[8px]">
                  <MdEdit className="text-textDark" />
                  <input type="file" className="hidden" />
                </label>

                <span className="text-headingDark ps-10 text-start flex flex-col pt-5">
                  <p className="text-xl font-medium">{user.username}</p>
                  <p className="text-base font-base">{user.email}</p>
                </span>
              </div>

              {/* <button className="btn rounded-xl bg-red-600 border-0 text-core px-5 hover:bg-progressBasic">
                Change Password
              </button> */}

              <ChangePasswordModal />
            </div>

            <div className="stats stats-vertical lg:stats-horizontal shadow mt-5 text-textDark">
              <div className="p-4 text-start">
                <div className="text-xs">Status</div>
                <div className="text-base font-semibold">{user.user_type}</div>
              </div>

              <div className="p-4 text-start">
                <div className="text-xs">organization</div>
                <div className="text-base font-semibold">
                  {user.organization}
                </div>
              </div>

              {user.assigned_manager && (
                <div className="p-4 text-start">
                  <div className="text-xs">Manager</div>
                  <div className="text-base font-semibold">
                    {user.assigned_manager}
                  </div>
                </div>
              )}

              <div className="p-4 text-start">
                <div className="text-xs">Joined</div>
                <div className="text-base font-semibold">{user.createdAt}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="py-6 ps-2 w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-textDark">
              <label className="label flex flex-col p-0 items-start justify-start">
                <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                <span className="label-text pt-2 ps-4 text-base">
                  Full Name
                </span>
              </label>
              <div className="form-control col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered size-10 border-utility w-full rounded-xl"
                    disabled={!isEditing}
                  />
                ) : (
                  <label className="label flex flex-col p-0 items-start justify-start">
                    <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                    <span className="label-text pt-2 text-base ps-4">
                      {user.name}
                    </span>
                  </label>
                )}
              </div>

              <label className="label flex flex-col p-0 items-start justify-start">
                <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                <span className="label-text pt-2 ps-4 text-base">Phone No</span>
              </label>
              <div className="form-control col-span-2">
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered size-10 border-utility w-full rounded-xl"
                    disabled={!isEditing}
                  />
                ) : (
                  <label className="label flex flex-col p-0 items-start justify-start">
                    <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                    <span className="label-text pt-2 text-base ps-4">
                      {user.phone}
                    </span>
                  </label>
                )}
              </div>

              <label className="label flex flex-col p-0 items-start justify-start">
                <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                <span className="label-text pt-2 ps-4 text-base">
                  Job Title
                </span>
              </label>
              <div className="form-control col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="input input-bordered size-10 border-utility w-full rounded-xl"
                    disabled={!isEditing}
                  />
                ) : (
                  <label className="label flex flex-col p-0 items-start justify-start">
                    <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                    <span className="label-text pt-2 text-base ps-4">
                      {user.job_title}
                    </span>
                  </label>
                )}
              </div>

              <label className="label flex flex-col p-0 items-start justify-start">
                <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                <span className="label-text pt-2 ps-4 text-base">
                  Description
                </span>
              </label>
              <div className="form-control md:col-span-2">
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-24 size-10 border-utility w-full rounded-xl"
                    disabled={!isEditing}
                  ></textarea>
                ) : (
                  <label className="label flex flex-col p-0 items-start justify-start">
                    <span className="w-full h-1 bg-sideNavBG rounded-3xl m-0 p-0" />
                    <span className="label-text pt-2 text-base ps-4">
                      {user.description}
                    </span>
                  </label>
                )}
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn rounded-xl bg-sideNavBG border-0 text-textDark hover:bg-progressBasic"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="col-span-3 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn rounded-xl bg-gray-300 border-0 text-textDark hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn rounded-xl bg-sideNavBG border-0 text-textDark hover:bg-progressBasic"
                    disabled={updateProfileMutation.isLoading}
                  >
                    {updateProfileMutation.isLoading ? (
                      <>
                        <div className="flex justify-evenly">
                          <span className="loading loading-dots loading-md"></span>
                        </div>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div id="toast-one" className="toast toast-end hidden">
        <div id="toast-success" className="alert alert-success hidden"></div>
      </div>

      <div id="toast-two" className="toast toast-end hidden">
        <div id="toast-error" className="alert alert-success hidden"></div>
      </div>
    </div>
  );
};

export default ProfileSettings;
