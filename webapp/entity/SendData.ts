export class Tripinfo {
  tripcountr: string;
  tripcity: string;
  tripreason: string;
  tripstay: boolean;
  tripstartdate: string;
  tripenddate: string;
  tripvehicle: string;
  plannedbudget: number;
  unpaidtravel: boolean;
}
export class SendData {
  constructor() {}
  tripinfo: Tripinfo[];
  tripnote: string;
  isabroad: boolean;
  plannedbudget: number;
  refcode: string;
  file: any;
}
export class EstimatedBudget {
  constructor() {}
  tripcountr: string;
  tripcity: string;
  tripstartdate: string;
  tripenddate: string;
}

export class EstimatedBudgetReturn {
  constructor() {}
  plannedbudget: number;
  plannedbudget2: number;
  annualbudget: number;
  usedbudget: number;
  remainingbudget: number;
  ancurrency: string;
  ancurrency2: string;
  otherbudgets: number;
}
