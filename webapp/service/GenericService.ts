import DateTime from "sap/ui/model/type/DateTime";
import Filter from "sap/ui/model/Filter";
import Controller from "sap/ui/core/mvc/Controller";
import { Service } from "../Core/Service/Service";
import { RequestJsonData } from "../entity/RequestJsonData";
import Root from "../controller/Root.controller";
export class GenericService {
  //Servisin tanımlanması
  private service: Service<RequestJsonData>;
  private busyControlFunc: Function;
  private handleErrorFunc: Function;
  private logFunc: Function;
  constructor(controller: Root) {
    //Servisin İmplementasyonu
    this.service = new Service(controller, "GenericEntitySet");
    this.busyControlFunc = controller.busyControlFunc.bind(controller);
    this.handleErrorFunc = controller.handleError.bind(controller);
    this.logFunc = controller.log.bind(controller);
  }
  // public async Create(createData: any): Promise<RequestJsonData> {
  //   let result = await this.service.Create(createData);
  //   return result;
  // }
  public async Request<T>(processName: string, jsonData: any): Promise<T> {
    let requestData: RequestJsonData;
    requestData = new RequestJsonData();
    requestData.Processname = processName;
    requestData.Jsondata = JSON.stringify(jsonData);

    // this.busyControlFunc.call(this, true);
    this.busyControlFunc(true);
    var that = this;
    return new Promise(function (resolve, reject) {
      that.service.Create(requestData)
        .then((oData) => {
          const json = JSON.stringify(oData);
          var resultObject = JSON.parse(oData.Jsondata) as T;
          // that.busyControlFunc.call(that, false);
          that.busyControlFunc(false);
          that.logFunc(processName, oData.Jsondata, true);
          resolve(resultObject);
        })
        .catch((oResponse) => {
          // that.busyControlFunc.call(that, false);
          that.busyControlFunc(false);
          that.handleErrorFunc(processName, oResponse);
          reject(oResponse);
        });
    });
  }
}
