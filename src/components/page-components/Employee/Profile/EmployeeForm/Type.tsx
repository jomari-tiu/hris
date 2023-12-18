export type employeeinfo = {
  id?: string | number;
  birth_date: string;
  birth_place: string;
  citizenship: string;
  civil_status: string;
  date_hired: string;
  email: string;
  employee_id: string;
  name_ext: string;
  first_name: string;
  middle_name: string;
  mobile_no: string;
  sex: string;
  last_name: string;
  tel_no: string;
  department_id?: string;
  department_name?: string;
  position_id?: string;
  position_name?: string;
  is_flexible: boolean;
  employment_status_id: string;
  employment_status_name: string;
};

export type employeeinfoResponse = {
  id?: string | number;
  birth_date: string;
  birth_place: string;
  citizenship: string;
  civil_status: string;
  date_hired: string;
  email: string;
  employee_id: string;
  name_ext: string;
  first_name: string;
  middle_name: string;
  mobile_no: string;
  sex: string;
  last_name: string;
  tel_no: string;
  department: {
    name: string;
    id: string;
  };
  position: {
    name: string;
    id: string;
  };
};

export type employeeEducation = {
  educational_backgrounds?: {
    level: string;
    school_name: string;
    degree: string;
    period_from: string;
    period_to: string;
    units_earned: string;
    year_graduated: string;
    academic_honors_received: string;
  }[];
};

export type employeeTrainings = {
  title: string;
  conducted_by: string;
  hours: string;
  type_of_Id: string;
  period_from: string;
  period_to: string;
  description: string;
}[];
