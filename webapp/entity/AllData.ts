export interface AllData {
  countrylist: Countrylist[]
  vehiclelist: Vehiclelist[]
  userinfo: Userinfo
  payroll: Payroll[]
  usercountrycode: string
  usercountry: string
}

export interface Countrylist {
  key: string
  value: string
}

export interface Vehiclelist {
  key: string
  value: string
}

export interface Userinfo {
  pernr: number
  ename: string
  orgtx: string
  pltxt: string
  stltx: string
  psgtx: string
  psktx: string
}

export interface Payroll {
  month: string;
  budget: number;
  usedbudget: number;
  subsbudget: number;
}
export interface Payroll {
  year: string;
  budget: number;
  usedbudget: number;
  subsbudget: number;
  datas: Payroll[];
}
export class MultiWayInfo {
  ID: int
  Country: string
  CountryText: string
  City: string
  CityText: string
  StartDate: Date
  EndDate: Date
  placeOfStay: boolean
  placeOfStayText: string
  vehicleText: string
  vehicle: string
  reason: string
  unpaidTravel: boolean;
  plannedbudget :string;
  plannedbudgetazn :string;

}
export interface Payroll {
  month: string;
  budget: number;
  usedbudget: number;
  subsbudget: number;

}