import { Service } from "../Core/Service/Service";
import { EmployeeEntity } from "../entity/EmployeeEntity";
import DateTime from "sap/ui/model/type/DateTime";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Controller from "sap/ui/core/mvc/Controller";
import { IService } from "../Core/Service/IService";
export class EmployeeService {
  //Servisin tanımlanması
  private service: Service<EmployeeEntity>;
  constructor(controller: Controller) {
    //Servisin İmplementasyonu
    this.service = new Service(controller, "EmployeeSet");
  }

  public async Get(pernr: string): Promise<EmployeeEntity> {
    //Parametreler sırasıyla listeye eklenmelidir
    var parameters: (number | string)[] = [pernr];
    //Verilerin servisten getirilmesi
    let data = await this.service.Get(parameters);
    //Cevapların döndürülmesi
    return data;
  }

  public async GetList(
    pernr: string,
    begda: Date,
    endda: Date
  ): Promise<EmployeeEntity[]> {
    //Filtre tanımlaması
    var filters: Filter[] = [
      new Filter("Pernr", FilterOperator.EQ, pernr),
      new Filter("Begda", FilterOperator.EQ, begda),
      new Filter("Endda", FilterOperator.EQ, endda),
    ];
    filters = [];
    //Verilerin servisten getirilmesi
    let datas = await this.service.GetList(filters);
    //Cevapların döndürülmesi
    return datas;
  }

  public async Create(createData: EmployeeEntity): Promise<EmployeeEntity> {
    let result = await this.service.Create(createData);
    return result;
  }

  public async Update(updateData: EmployeeEntity): Promise<EmployeeEntity> {
    let result = await this.service.Update(updateData);
    return result;
  }

  public async Delete(pernr: string): Promise<any> {
    var parameters: (string | number)[] = [pernr];
    let result = await this.service.Delete(parameters);
    return result;
  }
}
