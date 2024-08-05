import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user.context";

const NoSessionReport = () => {
  const { state: userState } = useContext(UserContext);

//   const assignedModules = userState.user.assigned_modules;

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % assignedModules.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + assignedModules.length) % assignedModules.length
//     );
//   };

  return (
    <div className="flex p-10 bg-core h-full items-center">
      <div className="w-full text-start">
        <h1 className="text-3xl font-medium text-headingDark mb-10">
          Oops! No sessions found.
        </h1>

        <p className="text-xl text-textDark mb-4">
          Looks like you haven't taken any sessions yet.
        </p>

        <p className="text-xl text-textDark">
          Take a session on our VR app and log in to portal again.
          <br /> See you soon!
        </p>
      </div>

      <div className="w-full text-start">
        <h1 className="text-3xl font-medium text-headingDark mb-4">
          Video Preview
        </h1>
        <div className="bg-sideNavBG h-60 rounded-3xl flex items-center justify-center text-textDark">
          Play Video.
        </div>
      </div>

      {/* <div className="w-1/2 mx-auto">
        <div className="carousel w-full">
          {assignedModules.map((module, index) => (
            <div
              key={module._id}
              id={`slide${index}`}
              className={`carousel-item relative w-full ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Module ID: {module.module_id}</h2>
                  <p>
                    Due Date: {new Date(module.due_date).toLocaleDateString()}
                  </p>
                  <p>Sessions Completed: {module.sessions_completed}</p>
                  <p>Completed: {module.is_completed ? "Yes" : "No"}</p>
                  <p>Average Score: {module.average_score.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <button className="btn btn-xs" onClick={prevSlide}>
            ❮ Prev
          </button>
          <button className="btn btn-xs" onClick={nextSlide}>
            Next ❯
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default NoSessionReport;
