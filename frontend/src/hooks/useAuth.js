import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import * as authService from "../services/authService";

export const useAuth = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const navigateBasedOnUserType = (userType) => {
    switch (userType) {
      case "Root":
        // navigate to root cms
        navigate("/admin_dashboard");
        break;
      case "Admin":
        navigate("/admin_dashboard");
        break;
      case "Manager":
        navigate("/manager_dashboard");
        break;
      case "Learner":
        navigate("/learner_dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      dispatch({ type: "LOGIN", payload: data.data });
      navigateBasedOnUserType(data.data.user_type);
    },
    onError: (error) => {
      console.log(
        error.response.data.message ||
          "An error occured. Please try again later."
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    },
    onError: (error) => {
      console.log(
        error.response.data.message ||
          "An error occured. (logout)"
      );
    },
  });

  return { loginMutation, logoutMutation };
};
