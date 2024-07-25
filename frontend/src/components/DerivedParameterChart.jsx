import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useDerivedParameterScores } from "../hooks/useReports";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DerivedParameterChart = () => {
  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;

  const { moduleName, derivedParameter } = useContext(SessionReportContext);

  const {
    data: parameter,
    isPending,
    isError,
  } = useDerivedParameterScores(userId, moduleName, derivedParameter);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const data = parameter?.data?.map((item) => ({
    sessionCount: item.sessionCount,
    score: item.score,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-sideNavBG rounded-xl p-2 flex flex-col text-start text-textDark text-sm">
          <p className="">{`Score: ${payload[0].value}%`}</p>
          <p className="">{`Session: ${label}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-10/12 mt-8 ms-5">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sessionCount">
            <Label value="No. of sessions" position="bottom" />
          </XAxis>
          <YAxis dataKey="score">
            <Label value="Score (%)" angle={-90} position="left" dy="-10" />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DerivedParameterChart;
