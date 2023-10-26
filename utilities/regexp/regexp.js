export const defaultInputFilter = new RegExp(/^[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/);
export const numberFilter = new RegExp(/^[0-9]*$/);
export const driverLicenseFilter = new RegExp(/^[A-Z]\d{4}-\d{6}-\d{2}$/);
export const dateFilter = new RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
export const hourFilter = new RegExp(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/)

