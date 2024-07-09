import { useQuery } from "@tanstack/react-query";
import * as reportsService from "../services/reportsService";

// Fetch the most recent user report
export const useMostRecentUserReport = (userId) => {
  console.log('useQuery called')
  return useQuery({
    queryKey: ['userReport', userId],
    queryFn: () => reportsService.getMostRecentReport(userId),
  });
};
