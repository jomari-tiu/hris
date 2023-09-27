export type employeeinfo = {
  birth_date: string;
  birth_place: string;
  citizenship: string;
  civil_status: string;
  date_hired: string;
  email: string;
  employee_id: string;
  extension_name: string;
  first_name: string;
  middle_name: string;
  mobile_no: string;
  sex: string;
  surname: string;
  telephone_no: string;
};

export type employeeEducation = {
  elementary_basic_education: string;
  elementary_from: string;
  elementary_highest_level: string;
  elementary_name_of_school: string;
  elementary_scholar_honor_received: string;
  elementary_to: string;
  elementary_year_graduated: string;
  secondary_basic_education: string;
  secondary_from: string;
  secondary_highest_level: string;
  secondary_name_of_school: string;
  secondary_scholar_honor_received: string;
  secondary_to: string;
  secondary_year_graduated: string;
  vacational_basic_education: string;
  vacational_from: string;
  vacational_highest_level: string;
  vacational_name_of_school: string;
  vacational_scholar_honor_received: string;
  vacational_to: string;
  vacational_year_graduated: string;
};

export type employeeTrainings = {
  title: string;
  conducted_by: string;
  hours_no: string;
  type_id: string;
  from: string;
  to: string;
}[];
