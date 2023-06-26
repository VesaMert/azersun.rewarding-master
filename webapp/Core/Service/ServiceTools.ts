export class ServiceTools {
  public static parametersToGetEntityString(
    methodName: string,
    parameters: (string | number)[]
  ) {
    var query = methodName + "(";
    parameters.forEach((element, index, arr) => {
      if (index !== 0) {
        query += ",";
      }
      if (typeof element === "string") {
        query += "'" + element + "'";
      } else if (typeof element === "number") {
        query += element.toString();
      } else {
        throw new Error(
          "Parametre verileri 'string' veya 'number' tipinde olmalıdır!"
        );
      }
    });
    query += ")";
    return query;
  }
}
