import BaseController from "./BaseController";

/**
 * @namespace vesa.azersun.rating.controller
 */
interface LocalState {
  isbusy: boolean;
}
export default class App extends BaseController<LocalState> {
  public onInit(): void {
    // apply content density mode to root view
    this.getView().addStyleClass(
      this.getOwnerComponent().getContentDensityClass()
    );
  }
}
