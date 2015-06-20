import Ember from 'ember';

var stringify = function(value, indent) {
  if (indent == null) {
    indent = '';
  }

  switch (Ember.$.type(value)) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'null':
    case 'undefined':
      return JSON.stringify(value);
    case 'array':
      return stringifyArray(value, indent);
    case 'object':
      return stringifyObject(value, indent);
    default:
      throw 'Invalid type to stringify.';
  }
};

var stringifyArray = function(value, indent) {
  var jsonString = '[\n  ' + indent;

  jsonString += value.map(function(arrayItem) {
    if (typeof arrayItem === 'undefined') {
      return stringify(null, '  ' + indent);
    }
    return stringify(arrayItem, '  ' + indent);
  }.bind(this)).join(',\n  ' + indent);

  jsonString += '\n' + indent + ']';
  return jsonString;
};

var stringifyObject = function(object, indent) {
  var jsonString = '{\n  ' + indent;

  var objectPropertyJsonStrings = [];
  for (var key in object) {
    if (object.hasOwnProperty(key) && typeof object[key] !== 'undefined') {
      objectPropertyJsonStrings.push('"' + key + '": ' + stringify(object[key], '  ' + indent));
    }
  }

  jsonString += objectPropertyJsonStrings.join(',\n  ' + indent);
  jsonString += '\n' + indent + '}';
  return jsonString;
};

export function jsonStringifyWithHighlight(value) {
  return stringify(value);
}

export default Ember.HTMLBars.makeBoundHelper(jsonStringifyWithHighlight);
