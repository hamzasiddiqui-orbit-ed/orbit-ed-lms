import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user.context";
import { useSessionReportList } from "../hooks/useReports";
import UserReportsTable from "./UserReportsTable";

const UserReportsBody = ({ moduleName }) => {
  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");

  const {
    data: sessionReports,
    isPending,
    isError,
  } = useSessionReportList(userId, moduleName, page, sort);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading reports</div>;
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  const handleSort = (sortBy) => {
    setPage(1);
    setSort((prevSort) => (prevSort === sortBy ? "" : sortBy));
  };

  return (
    <div className="container mx-auto p-4">
      {sessionReports?.data?.reports?.length > 0 ? (
        <UserReportsTable
          reportsList={sessionReports.data}
          moduleName={moduleName}
          page={page}
          handlePageChange={handlePageChange}
          sort={sort}
          handleSort={handleSort}
        />
      ) : (
        <div>no data</div>
      )}
    </div>
  );
};

export default UserReportsBody;
