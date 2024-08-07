import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ChangePasswordModal = () => {
  const { changePasswordMutation } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('New password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    console.log("handleChangePassword called.");
    setPasswordError("");

    try {
      console.log("awaiting changepassword");
      const response = await changePasswordMutation.mutateAsync(
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }
      );

      resetForm();
      setIsModalOpen(false);
      showToast("success", response.data.message);
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const showToast = (type, message) => {
    if (type == "success") {
      const toast = document.getElementById("toast-one");
      const toastType = document.getElementById("toast-success");

      if (toast) {
        toastType.innerHTML = `
          <span>${message}</span>
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
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-sm rounded-xl bg-progressBad border-0 text-core px-5 hover:bg-progressBasic"
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
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleChangePassword}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="pt-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-textDark">
                      Current Password *
                    </span>
                  </label>
                  <Field
                    type="password"
                    name="currentPassword"
                    className="input input-sm input-bordered border-utility rounded-xl"
                  />
                  {errors.currentPassword && touched.currentPassword && (
                    <div className="text-red-500 text-sm mt-1 text-start">{errors.currentPassword}</div>
                  )}
                </div>

                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text text-textDark">New Password *</span>
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    className="input input-sm input-bordered border-utility rounded-xl"
                  />
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-sm mt-1 text-start">{errors.newPassword}</div>
                  )}
                </div>

                <div className="form-control mt-2 mb-4">
                  <label className="label">
                    <span className="label-text text-textDark">
                      Confirm New Password *
                    </span>
                  </label>
                  <Field
                    type="password"
                    name="confirmNewPassword"
                    className="input input-sm input-bordered border-utility rounded-xl"
                  />
                  {errors.confirmNewPassword && touched.confirmNewPassword && (
                    <div className="text-red-500 text-sm mt-1 text-start">{errors.confirmNewPassword}</div>
                  )}
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
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
              </Form>
            )}
          </Formik>
        </div>
        <label className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          Close
        </label>
      </div>

      <div id="toast-one" className="toast toast-end hidden">
        <div id="toast-success" className="alert alert-success hidden"></div>
      </div>
    </>
  );
};

export default ChangePasswordModal;