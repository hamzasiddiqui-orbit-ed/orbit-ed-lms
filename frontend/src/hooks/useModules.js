import { useQuery } from "@tanstack/react-query";
import * as modulesService from "../services/modulesService";

export const useAssignedModules = (userId) => {
    return useQuery({
        queryKey: ["assignedModules", userId],
        queryFn: () => modulesService.getAssignedModules(userId),
        enabled: !!userId,
    })
};

export const useModuleGeneralDetails = (userId, moduleName) => {
    return useQuery({
        queryKey: ["assignedModules", userId, moduleName],
        queryFn: () => modulesService.getModuleGeneralDetails(userId, moduleName),
        enabled: !!userId && !!moduleName,
    })
};