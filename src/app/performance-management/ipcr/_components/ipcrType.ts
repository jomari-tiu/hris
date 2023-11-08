export type ipcr = {
  id?: string;
  employee_name?: string;
  employee_id: string;
  ipcr_period_id: string;
  ipcr_period_date_range?: string;
  reviewed_by: string;
  reviewed_by_name: string;
  recommending_approval: string;
  recommending_approval_name: string;
  strategic_evaluations?: subCategory[];
  core_evaluations?: subCategory[];
  support_evaluations?: subCategory[];
};

export type subCategory = {
  subcategory_id: string;
  subcategory_name: string;
  evaluations: subCategory | itemEvaluations[];
};

export type itemEvaluations = {
  name: string;
  order: string;
  major_final_output: string;
  performance_indicators: string;
  target_of_accomplishment: string;
  actual_accomplishments: string;
  rating_q: string;
  rating_e: string;
  rating_t: string;
  remarks: string;
  evaluations?: itemEvaluations[];
};
