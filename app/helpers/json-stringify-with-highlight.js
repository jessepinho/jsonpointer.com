import Ember from 'ember';

var stringify = function(value) {
  switch (Ember.$.type(value)) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'null':
    case 'undefined':
      return JSON.stringify(value);
    case 'array':
      return stringifyArray(value);
    case 'object':
      return stringifyObject(value);
    default:
      throw 'Invalid type to stringify.';
  }
};

var stringifyArray = function(value) {
  var jsonString = "[\n  ";

  jsonString += value.map(function(arrayItem) {
    if (typeof arrayItem === 'undefined') {
      return stringify(null);
    }
    return stringify(arrayItem);
  }.bind(this)).join(",\n  ");

  jsonString += "\n]";
  return jsonString;
};

var stringifyObject = function(object) {
  var jsonString = "{\n  ";

  var objectPropertyJsonStrings = [];
  for (var key in object) {
    if (object.hasOwnProperty(key) && typeof object[key] !== 'undefined') {
      objectPropertyJsonStrings.push('"' + key + '": ' + stringify(object[key]));
    }
  }

  jsonString += objectPropertyJsonStrings.join(",\n  ");
  jsonString += "\n}";
  return jsonString;
};

export function jsonStringifyWithHighlight(value) {
  return stringify(value);
}

export default Ember.HTMLBars.makeBoundHelper(jsonStringifyWithHighlight);
