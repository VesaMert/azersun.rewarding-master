import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { IService } from "./IService";
import { ServiceTools } from "./ServiceTools";
export class Service<T> implements IService<T> {

  private service: ODataModel;
  private _methodName: string;

  constructor(controller: Controller, _methodName: string) {
    this.service = controller.getOwnerComponent().getModel() as ODataModel;
    this._methodName = "/" + _methodName;
  }

  public async Get(parameters: (string | number)[]): Promise<T> {
    var that = this;
    var query = ServiceTools.parametersToGetEntityString(
      this._methodName,
      parameters
    );
    return new Promise(function (resolve, reject) {
      return that.service.read(query, {
        success: (oData: any) => {
          resolve(oData);
        },
        error: (oResponse: any) => {
          reject(oResponse);
        },
      });
    });
  }
  
  public async GetList(filters: Filter[]): Promise<T[]> {
    var that = this;
    return new Promise(function (resolve, reject) {
      return that.service.read(that._methodName, {
        filters: filters,
        success: (oData: any) => {
          resolve(oData.results);
        },
        error: (oResponse: any) => {
          reject(oResponse);
        },
      });
    });
  }

  public async Create(postData: T): Promise<T> {
    var that = this;
    return new Promise(function (resolve, reject) {
      return that.service.create(that._methodName, postData as object, {
        success: (oData: any) => {

          resolve(oData);
        },
        error: (oResponse: any) => {
          reject(oResponse);
        },
      });
    });
  }

  public async Update(updateData: T): Promise<T> {
    var that = this;
    return new Promise(function (resolve, reject) {
      return that.service.update(that._methodName, updateData as object, {
        success: (oData: any) => {
          resolve(oData.results);
        },
        error: (oResponse: any) => {
          reject(oResponse);
        },
      });
    });
  }

  public async Delete(parameters: (string | number)[]): Promise<T> {
    var that = this;
    var query = ServiceTools.parametersToGetEntityString(
      this._methodName,
      parameters
    );
    return new Promise(function (resolve, reject) {
      return that.service.remove(query, {
        success: (oData: any) => {
          resolve(oData);
        },
        error: (oResponse: any) => {
          reject(oResponse);
        },
      });
    });
  }
}
