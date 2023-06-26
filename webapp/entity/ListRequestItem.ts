import { Date } from "../Core/Entity/Date";

export class ListRequestItem {
  tripnote: string;
  isabroad: string;
  plannedbudget: number;
  ancurrency: string;
  refcode: string;
  persno: string;
  persname: string;
  startdate: string;
  enddate: string;
  status: string;
  statustext: string;
  docdate: string;
  tripdatas: RequestDetail[];
  tripdatascount: number;
  attch: boolean;
}

export class RequestDetail {
  startdate: string;
  enddate: string;
  country: string;
  city: string;
  reason: string;
  vehicle: string;
  unpaidtravel: boolean;
  tripstay: boolean;
}

export class QuestionData{
  tripnote: string;
}
