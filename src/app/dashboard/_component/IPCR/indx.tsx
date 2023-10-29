import React from "react";

import IndividualPerformanceAndCareerReview from "./IndividualPerformanceAndCareerReview";
import OverallPerformanceAndCareerReview from "./OverallPerformanceAndCareerReview";

const Ipcr = () => {
  return (
    <div className=" space-y-5">
      <IndividualPerformanceAndCareerReview />
      <OverallPerformanceAndCareerReview />
    </div>
  );
};

export default Ipcr;
