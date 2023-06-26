import DateTime from "sap/ui/model/type/DateTime";


export class Date {
  private _date: string;

  public get date() {
    return this._date;
  }

  public set date(dateSapFormat: string) {
    if (dateSapFormat.length !== 8) {
      throw new Error("The date is invalid");
    }
    this._date =
      dateSapFormat.substring(6, 8) +
      "." +
      dateSapFormat.substring(4, 6) +
      "." +
      dateSapFormat.substring(0, 4);
  }

  constructor(date: string) {
    this.date = date;
  }

  public toString(): string {
    return this._date;
  }
}
