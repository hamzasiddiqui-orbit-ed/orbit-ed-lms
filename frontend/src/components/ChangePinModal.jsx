import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import PinInput from "react-pin-input";
import classNames from "classnames";

const ChangePinModal = () => {
  const { changePinMutation } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinError, setPinError] = useState("");

  const validationSchema = Yup.object().shape({
    currentPin: Yup.string()
      .matches(/^\d{4}$/, "Current pin must be exactly 4 digits")
      .required("Current pin is required"),
    newPin: Yup.string()
      .matches(/^\d{4}$/, "New pin must be exactly 4 digits")
      .required("New pin is required"),
    confirmNewPin: Yup.string()
      .oneOf([Yup.ref("newPin"), null], "Pins must match")
      .required("Confirm new pin is required"),
  });

  const handleChangePin = async (values, { setSubmitting, resetForm }) => {
    setPinError("");

    try {
      const response = await changePinMutation.mutateAsync({
        currentPin: values.currentPin,
        newPin: values.newPin,
      });

      resetForm();
      setIsModalOpen(false);
      showToast("success", response.data.message);
    } catch (error) {
      setPinError(error.response?.data?.message || "Failed to change pin");
    } finally {
      setSubmitting(false);
    }
  };

  const PinInputField = ({ ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
      <div>
        <PinInput
          length={4}
          initialValue=""
          secret
          onChange={(value) => helpers.setValue(value)}
          type="numeric"
          inputMode="number"
          style={{ padding: "0px", margin: "0px", display: "flex" }}
          inputStyle={{
            borderColor: "#929292",
            borderRadius: "0.5rem",
            width: "2rem",
            height: "2rem",
            fontSize: "1.5rem",
            color: "#929292",
            backgroundColor: "white",
            margin: 2,
            padding: 0,
          }}
          inputFocusStyle={{ borderColor: "#595959" }}
          onComplete={(value) => helpers.setValue(value)}
          autoSelect={true}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm mt-1 text-start">
            {meta.error}
          </div>
        ) : null}
      </div>
    );
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
        className="btn btn-sm rounded-xl bg-progressAverage border-0 text-core px-5 hover:bg-progressBasic"
      >
        Change Pin
      </button>

      {/* Change Pin Modal */}
      <input
        type="checkbox"
        id="change-pin-modal"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => setIsModalOpen(!isModalOpen)}
      />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box" style={{ width: "300px" }}>
          <h1 className="text-xl font-medium text-headingDark text-start">
            Change Pin
          </h1>
          <Formik
            initialValues={{
              currentPin: "",
              newPin: "",
              confirmNewPin: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleChangePin}
          >
            {({ isSubmitting }) => (
              <Form className="pt-2 w-full">
                <div className="w-full flex flex-col items-start">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-textDark">
                        Current Pin *
                      </span>
                    </label>
                    <PinInputField name="currentPin" />
                  </div>

                  <div className="form-control mt-2 items-start">
                    <label className="label">
                      <span className="label-text text-textDark">
                        New Pin *
                      </span>
                    </label>
                    <PinInputField name="newPin" />
                  </div>

                  <div className="form-control mt-2 mb-4 items-start">
                    <label className="label">
                      <span className="label-text text-textDark">
                        Confirm New Pin *
                      </span>
                    </label>
                    <PinInputField name="confirmNewPin" />
                  </div>

                  {pinError && (
                    <p className="text-red-500 mt-2 text-start">{pinError}</p>
                  )}
                </div>
                <div className="modal-action mt-2">
                  <div className="w-full flex justify-between">
                    <button
                      type="button"
                      className={classNames("btn rounded-xl bg-sideNavBG border-0 text-textDark hover:bg-progressBasic",
                        {"hidden": isSubmitting}
                      )}
                      onClick={() => setIsModalOpen(false)}
                      disabled={isSubmitting}
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
                        "Change Pin"
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

export default ChangePinModal;
