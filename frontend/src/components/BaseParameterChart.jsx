import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { SessionReportContext } from "../contexts/sessionReport.context";
import { useBaseParameterScores } from "../hooks/useReports";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";
import TooltipPopOver from "./TooltipPopOver";

const BaseParameterChart = () => {
  const { state: userState } = useContext(UserContext);
  const userId = userState.user._id;

  const { moduleName, baseParameter } = useContext(SessionReportContext);

  const {
    data: parameter,
    isPending,
    isError,
  } = useBaseParameterScores(userId, moduleName, baseParameter);

  if (isPending) return (
    <div className="w-3/12 text-center py-24">
        <span className="loading loading-dots loading-lg"></span>
      </div>
  );
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

  const isSingleDataPoint = data && data.length === 1;

  return (
    <div className="w-3/12 me-5">
      <p className="text-2xl text-headingDark font-semibold text-start mt-16 mb-5 flex">
        <span>Performance Over Time</span>
        <TooltipPopOver
          text="Sample text for Performance over time."
          align="left"
        />
      </p>

      <div className="w-full relative">
        {isSingleDataPoint && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <p className="text-lg font-semibold text-textDark">
              You scored {data[0].score}% in your first session. <br /> Take
              more sessions to see trend.
            </p>
          </div>
        )}

        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            className={isSingleDataPoint ? "blur-sm" : ""}
            margin={{
              top: 5,
              right: 5,
              left: 15,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sessionCount">
              <Label value="Session Count" position="bottom" />
            </XAxis>
            <YAxis dataKey="score">
              <Label value="Score (%)" angle={-90} position="left" dy="-10" />
            </YAxis>
            {!isSingleDataPoint && <Tooltip content={<CustomTooltip />} />}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BaseParameterChart;
