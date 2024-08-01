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
    return (
      <div className="flex flex-col gap-4 ps-5 mb-12">
        <div className="skeleton bg-slate-200 h-10"></div>
        <div className="skeleton bg-slate-200 h-80"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading reports</div>;
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  const handleSort = (sortBy) => {
    setPage(1);
    setSort((prevSort) => {
      if (prevSort === sortBy + "Asc") return sortBy + "Desc";
      if (prevSort === sortBy + "Desc") return "";
      return sortBy + "Asc";
    });
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
