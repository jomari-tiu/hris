import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Progress, { ProgressType } from "@/components/Progress";

import EducationForm from "./EducationForm";
import Info from "./Info";
import TrainingForm from "./TrainingForm";
import { employeeEducation, employeeTrainings, employeeinfo } from "./Type";

type Props = {
  defaultValues?: employeeinfo &
    employeeEducation & { trainings: employeeTrainings };
};

function EmployeeForm({ defaultValues }: Props) {
  const progressList: ProgressType = [
    { title: "Employee Info", tabNumber: 0 },
    { title: "Educational Background", tabNumber: 1 },
    { title: "Training/Seminars Attended", tabNumber: 2 },
  ];

  useEffect(() => {
    setOverAllFormData(defaultValues);
  }, [defaultValues]);

  const [progress, setProgress] = useState<number>(2);

  const [overAllFormData, setOverAllFormData] = useState(defaultValues);

  return (
    <div className=" space-y-5">
      <p>Create - Employee</p>
      <Progress progressList={progressList} progressActive={progress} />
      {progress === 0 && (
        <Info
          setOverAllFormData={setOverAllFormData}
          setProgress={setProgress}
          defaultValues={overAllFormData}
        />
      )}
      {progress === 1 && (
        <EducationForm
          setOverAllFormData={setOverAllFormData}
          setProgress={setProgress}
          defaultValues={overAllFormData}
        />
      )}
      {progress === 2 && (
        <TrainingForm
          setOverAllFormData={setOverAllFormData}
          setProgress={setProgress}
          defaultValues={overAllFormData}
        />
      )}
    </div>
  );
}

export default EmployeeForm;
