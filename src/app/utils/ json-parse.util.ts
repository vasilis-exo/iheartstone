export function isEmpty(jsonObj: any): boolean {
  for (const property in jsonObj) {
    if (jsonObj.hasOwnProperty(property)) {
      return false;
    }
  }

  return true;
}

export function getValueByPropertyName(
  jsonObj: any, propertyName: string, validable: boolean = true): any {
  let value_obj = null;

  for (const property in jsonObj) {
    if (property.indexOf(propertyName) === 0) {
      const value = jsonObj[property];

      if (true &&
        (!validable || _validate_property_value(property, value))) {
        value_obj = value;

        break;
      }
    }
  }

  return value_obj;
}

export function getValuesByPropertyName(
  jsonObj: any, propertyName: string, validable: boolean = true): any[] {
  const values = [];

  for (const property in jsonObj) {
    if (property.indexOf(propertyName) === 0) {
      const value = jsonObj[property];

      if (true &&
        (!validable || _validate_property_value(property, value))) {
        values.push({
          'name': property,
          'value': value
        });
      }
    }
  }

  return values;
}

export function objectPropsToArray(jsonObj: any,
  validable: boolean = true): any[] {
  // create instance vars to store keys and final output
  const propsArray: any[] = Object.keys(jsonObj);
  const objArray = [];

  // loop through the object,
  // pushing values to the return array
  propsArray.forEach((property: any) => {
    const value = jsonObj[property];

    if (true &&
      (!validable || _validate_property_value(property, value))) {
      objArray.push(value);
    }

  });

  // return the resulting array
  return objArray;
}

export function isObjectsEqual(jsonObj1: any, jsonObj2: any): boolean {
  return JSON.stringify(jsonObj1) === JSON.stringify(jsonObj2);
}

function _validate_property_value(property: string, value: any): boolean {

  if (value) {
    if (value instanceof Array) {
      if (value.length > 0) {
        return true;
      }

      return false;
    }

    if (value !== '{}') {
      return true;
    }
  }

  return false;
}
