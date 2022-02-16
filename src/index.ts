import { EDataType } from "./edata-types";
import { ISchemaOption } from "./ISchemaOption";
import { isBool, isInt, isString, maxLength, minLength, notEmpty } from "./validators";

export const Validate = (payload: any, validationSchema: any) => {
  let arr = {};

  //loop through each validation key that was passed through
  Object.entries(validationSchema).forEach(([key, valStr]: any) => {
    let x = payload[key]; // x = value from the payload
    let isValid: any = true;
    let errArr = [];

    let required = valStr.indexOf("required") >= 0;

    //if we have a schema like required|string,
    //split by | and loop through each validator

    valStr.split("|").forEach((call: string) => {
      let res: any = true;
      let paramValue = null;

      //if we passed through a custom parameter like minLength[10],
      //set the paramValue = 10 and call = minLength
      if (call.indexOf("[") >= 0) {
        paramValue = call
          .slice(call.indexOf("["), call.indexOf("]") + 1)
          .replace("[", "")
          .replace("]", "");
        call = call.replace(`[${paramValue}]`, "");
      }

      switch (call) {
        case "required":
          res = notEmpty(x, key);
          break;
        case "string":
          res = isString(x, key);
          break;
        case "number":
          res = isInt(x, key);
          break;
        case "boolean":
          res = isBool(x, key);
          break;
        case "maxLength":
          res = maxLength(x, key, paramValue);
          break;
        case "minLength":
          res = minLength(x, key, paramValue);
          break;
      }

      if (res !== true) {
        errArr.push(res);
        isValid = errArr;
      }
    });

    arr[key] = isValid === true ? isValid : errArr;
  });

  //filter out any passing validation to see if we have errors
  let errs = Object.entries(arr).filter(([a, b]) => b !== true);

  //return true if all valid, or return all caught errors
  return errs.length == 0 ? true : errs;
};

export const DataValidator = (payload: any, schemaOptions: ISchemaOption[]) => {
  const results = [];

  schemaOptions.map((schemaOption: ISchemaOption) => {
    const key = schemaOption.key;
    const value = payload[key] ?? null; // value from payload

    if (schemaOption.required) {
      results.push(notEmpty(value, key));
    }

    if (!value) {
      //type checking
      switch (schemaOption.type) {
        case EDataType.STRING:
          results.push(isString(value, key));
          break;
        case EDataType.NUMBER:
          results.push(isInt(value, key));
          break;
        case EDataType.BOOLEAN:
          results.push(isBool(value, key));
          break;
        default:
          break;
      }
    }
  });

  const filteredResults = results.filter((e) => e !== true);
  return filteredResults.length == 0 ? true : filteredResults;
};

const payload = {
  name: "andrew",
  age: "21",
  // boy: true,
};

const schema = [
  {
    key: "name",
    required: true,
    type: EDataType.STRING,
  },
  {
    key: "age",
    required: true,
    type: EDataType.NUMBER,
  },
  {
    key: "gender",
    required: false,
    type: EDataType.STRING,
  },
  {
    key: "alive",
    required: false,
    type: EDataType.BOOLEAN,
  },
];

const result = DataValidator(payload, schema);
console.log("RESULT", result);

// const schema = {
//   name: "required|string|maxLength[10]|minLength[3]",
//   age: "required|number",
//   boy: "optional|boolean",
//   weight: "number|max[300]|required"
// };

// name.notEmpty().isString().length({max: 10})
// name: [SchemaOptions.notEmpty, SchemaOptions.isString]

// let isValid = Validate(payload, schema);
// console.log(isValid);
