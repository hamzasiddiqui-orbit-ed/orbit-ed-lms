import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import * as userService from "../services/userService";
import { UserContext } from "../contexts/user.context";

export const useUsers = () => {
    const { dispatch } = useContext(UserContext);
  
    const updateProfileMutation = useMutation({
      mutationFn: userService.updateUserProfile,
      onSuccess: (data) => {
        console.log(data.data.user)
        dispatch({
          type: "UPDATE_USER",
          payload: data.data.user
        });
      },
    });

    const changePasswordMutation = useMutation({
      mutationFn: userService.changePassword,
      onSuccess: (data) => {
        console.log("Password changed successfully.")
      }
    });
  
    return { updateProfileMutation, changePasswordMutation };
  };