'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createKeys(keyRecord) {
    return Object.keys(keyRecord);
}
function validator(type) {
    var errors = [];
    var keys = createKeys(type);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var value = type[key];
        var expectedType = typeof type[key];
        switch (expectedType) {
            case 'string':
                if (!value || typeof value !== expectedType) {
                    errors.push("".concat(key, " is required and is not ").concat(expectedType));
                }
                break;
            case 'number' :
                if (!value || typeof value !== expectedType) {
                    errors.push("".concat(key, " is required and is not ").concat(expectedType));
                }
            default:
                if (!value) {
                    errors.push("".concat(key, " is required"));
                }
        }
    }
    return errors.length > 0 ? errors : true;
}

exports.createKeys = createKeys;
exports.validator = validator;
