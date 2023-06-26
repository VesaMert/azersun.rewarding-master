import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import { EmployeeService } from "../service/EmployeeService";
import JSONModel from "sap/ui/model/json/JSONModel";
import { EmployeeEntity } from "../entity/EmployeeEntity";
import { GenericService } from "../service/GenericService";
import MessageToast from "sap/m/MessageToast";
import { Dock } from "sap/ui/core/Popup";

/**
 * @namespace vesa.azersun.rating.controller
 */
interface GlobalState {}
export default abstract class BaseController<T> extends Controller {
  protected viewState: T;
  protected globalViewState: GlobalState;
  public i18n: ResourceBundle;
  public genericService: GenericService;
  public oMainModel: JSONModel;
  private logEnabled = true;
  private ERRORKEY = ":::ERROR:::";
  // constructor() {
  // 	super("");
  // 	this.globalViewState = {
  // 		selectedPersid: ""
  // 	}
  // }
  constructor(args: T) {
    super("");

    this.viewState = args;

    this.globalViewState = {};
  }

  public refreshBase() {
    this.RefreshViewState();
  }

  public onInit(): void {
    this.oMainModel = this.getOwnerComponent().getModel(
      "mainModel"
    ) as JSONModel;
    this.genericService = new GenericService(this);
    this.init();
  }

  private async init(): Promise<void> {
    this.i18n = await this.getResourceBundle();
  }

  public busyControlFunc(busy: boolean): void {
    this.oMainModel.setProperty("/busy", busy);
  }

  public handleError(methodName: string, oResponse: any): void {
    try {
      var errorMessageText = JSON.parse(oResponse.responseText).error.message.value;
      var result = {};
      if (errorMessageText.includes(this.ERRORKEY)) {
        // result.Subrc = errorMessage.split(that.SPLITKEY)[0];
        errorMessageText = errorMessageText.split(this.ERRORKEY)[1];
      } else {
      }
    } catch (error) {
      errorMessageText = "Bilinmeyen Hata!";
    }
    this.log(methodName, oResponse, false);
    this.showToast(errorMessageText);
  }

  showToast(messageText: string): void {
    MessageToast.show(messageText, {
      duration: 7000, // default
      width: "25em", // default
      my: Dock.CenterBottom, // default
      at: Dock.CenterBottom, // default
      of: window, // default
      offset: "1 -100", // default
      collision: "fit fit", // default
      onClose: null, // default
      autoClose: true, // default
      animationTimingFunction: "ease-in-out", // default ease
      animationDuration: 1000, // default
      closeOnBrowserNavigation: true, // default
    });
  }
  public log(methodName: string, data: any, success = false): void {
    if (this.logEnabled === true) {
      // console.log("%c Service Log: " + methodName, "background: #fff; color: #00f");
      // console.log(JSON.parse(data.JsonData));
      console.log(
        "%c" +
          (success === true ? "Success" : "Error") +
          " Service Log: " +
          methodName,
        success === true ? "color: #0f0" : "color: #f00"
      );
      console.log(data);
    }
  }

  /**
   * Convenience method for accessing the component of the controller's view.
   * @returns The component of the controller's view
   */
  public getOwnerComponent(): AppComponent {
    return super.getOwnerComponent() as AppComponent;
  }

  public RefreshViewState() {
    let oModel = new JSONModel();
    oModel.setSizeLimit(9999999);
    oModel.setData(this.viewState as Object);

    this.setModel(oModel, "viewModel");
    return this;
  }
  public setProperty(property: string) {
    let model = this.getModel("viewModel") as JSONModel;
    model.setProperty("/" + property, "Error");
  }
  public RefreshGlobalViewState() {
    let oModel = new JSONModel();
    oModel.setData(this.globalViewState as Object);
    this.setGlobalModel(oModel, "globalviewModel");
    return this;
  }
  public setGlobalModel(oModel: Model, sName?: string) {
    this.getOwnerComponent().setModel(oModel, sName);
    return this;
  }

  public getSapDateFormat = (value: Date): string => {
    const year = "" + value.getFullYear();
    let month = "" + (value.getMonth() + 1);
    let day = "" + value.getDate();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + month + day;
  };

  public sapDateToDottedDate(dateSapFormat: string): string {
    // if (dateSapFormat.length !== 8) {
    //   throw new Error("The date is invalid");
    // }
    let date =
      dateSapFormat.substring(6, 8) +
      "." +
      dateSapFormat.substring(4, 6) +
      "." +
      dateSapFormat.substring(0, 4);
    return date;
  }

  public datumToDottedDate(dateSapFormat: String): String {
    let datum ;

    datum =
 

      dateSapFormat.substring(8,10) +
      "." +
      dateSapFormat.substring(5, 7) +
      "." +
      dateSapFormat.substring(0, 4);
    return datum;
  }


  public getDottedDateFormat = (value: Date): string => {
    const year = "" + value.getFullYear();
    let month = "" + (value.getMonth() + 1);
    let day = "" + value.getDate();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return day + "." + month + "." + year;
  };

  public datumToDate(datum: string): Date {
    var date = new Date();
    date.setFullYear(Number.parseInt(datum.substring(0, 4)));
    date.setMonth(Number.parseInt(datum.substring(4, 6)) - 1);
    date.setDate(Number.parseInt(datum.substring(6, 8)));
    return date;
  }

  public getHeadOfMonth(): Date {
    let headOfMonth = new Date();
    headOfMonth.setDate(1);
    headOfMonth.setHours(12);
    return headOfMonth;
  }

 




  public getEndOfMonth(): Date {
    let endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(12);
    return endOfMonth;
  }
  /**
   * Convenience method to get the components' router instance.
   * @returns The router instance
   */
  public getRouter(): Router {
    return UIComponent.getRouterFor(this);
  }
  /**
   * Convenience method for getting the i18n resource bundle of the component.
   * @returns The i18n resource bundle of the component
   */
  public getResourceBundle(): ResourceBundle | Promise<ResourceBundle> {
    const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
    return oModel.getResourceBundle();
  }
  /**
   * Convenience method for getting the view model by name in every controller of the application.
   * @param [sName] The model name
   * @returns The model instance
   */
  public getModel(sName?: string): Model {
    return this.getView().getModel(sName);
  }
  public getGlobalModel(isMain: boolean): GlobalState {
    let oModel = new JSONModel();
    oModel = this.getOwnerComponent().getModel("globalviewModel") as JSONModel;

    if (oModel != null) {
      return oModel.getData() as GlobalState;
    } else {
      if (isMain == false) {
        this.getRouter().navTo("report");
        return;
      }
      this.RefreshGlobalViewState();
      return this.globalViewState;
    }
  }
  /**
   * Convenience method for setting the view model in every controller of the application.
   * @param oModel The model instance
   * @param [sName] The model name
   * @returns The current base controller instance
   */
  public setModel(oModel: Model, sName?: string): BaseController<T> {
    this.getView().setModel(oModel, sName);
    return this;
  }
  /**
   * Convenience method for triggering the navigation to a specific target.
   * @public
   * @param sName Target name
   * @param [oParameters] Navigation parameters
   * @param [bReplace] Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
   */
  public navTo(sName: string, oParameters?: object, bReplace?: boolean): void {
    this.getRouter().navTo(sName, oParameters, undefined, bReplace);
  }

  /**
   * Convenience event handler for navigating back.
   * It there is a history entry we go one step back in the browser history
   * If not, it will replace the current entry of the browser history with the main route.
   */
  public onNavBack(): void {
    const sPreviousHash = History.getInstance().getPreviousHash();
    if (sPreviousHash !== undefined) {
      window.history.go(-1);
    } else {
      this.getRouter().navTo("report", {}, undefined, true);
    }
  }
}
