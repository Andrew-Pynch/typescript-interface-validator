"use strict";
exports.__esModule = true;
exports.InterfaceValidator = exports.createKeys = void 0;
function createKeys(keyRecord) {
    return Object.keys(keyRecord);
}
exports.createKeys = createKeys;
function InterfaceValidator(type) {
    var keys = Object.keys(type);
    console.log(keys.length);
    return true;
    // const errors: string[] = [];
    // const keys = createKeys<T>(type);
    // // console.log('REQUIRED KEYS', keys);
    // console.log('ACTUAL KEYS', Object.keys(type), keys);
    // for (const key of keys) {
    //     console.log('iterating', key);
    //     const value = type[key];
    //     const expectedType = typeof type[key];
    //     switch (expectedType) {
    //         case 'string':
    //             if (!value || typeof value !== expectedType) {
    //                 errors.push(
    //                     `${key} is required and is not ${expectedType}`
    //                 );
    //             }
    //             break;
    //         case 'number' || 'boolean':
    //             if (!value || typeof value !== expectedType) {
    //                 errors.push(
    //                     `${key} is required and is not ${expectedType}`
    //                 );
    //             }
    //         default:
    //             if (!value) {
    //                 errors.push(`${key} is required`);
    //             }
    //     }
    // }
    // return errors.length > 0 ? errors : true;
}
exports.InterfaceValidator = InterfaceValidator;
var invalidPerson = {
    weight: 150
};
var personIsValid = InterfaceValidator(invalidPerson);
console.log('Person is valid?', personIsValid);
