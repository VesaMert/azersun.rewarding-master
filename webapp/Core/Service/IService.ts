import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";

export interface IService<T> {
    Create(postData: T): Promise<T>;
    Update(updateData: T): Promise<T>;
    Delete(parameters: (string | number)[]): Promise<T>;
    Get(parameters: (string | number)[]): Promise<T>;
    GetList(filters: Filter[]): Promise<T[]>;
}