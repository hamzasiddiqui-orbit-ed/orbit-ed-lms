import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { useFormatReport } from "../hooks/useFormatReport";

export default function UserReport() {
  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;

  const { reportData, isLoading, isError, error } = useFormatReport(userId);

  console.log(reportData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!reportData) return <div>No report data available</div>;

  return (
    <div className="w-full h-full">
      <div className="absolute top-0 pt-10 ps-10 text-left">
        <p className="text-3xl font-medium text-brand">Module Performance</p>
        <p className="pt-5 text-xl text-utility">{reportData.moduleName}</p>
        <div className="flex flex-row justify-between text-utility pt-2">
          <p>{reportData.createdAt}</p>
          <p className="ms-3">Session Count: {reportData.sessionCount}</p>
        </div>
      </div>
    </div>
  );
}
