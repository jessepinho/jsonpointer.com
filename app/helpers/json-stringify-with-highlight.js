import Ember from 'ember';

class JsonStringifier {
  constructor(pointer, parents, indentLevel) {
    this.pointer = pointer;
    this.parents = parents;

    if (indentLevel == null) {
      this.indentLevel = '';
    } else {
      this.indentLevel = indentLevel;
    }
  }

  stringify(value) {
    switch (Ember.$.type(value)) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'null':
      case 'undefined':
        return JSON.stringify(value);
      case 'array':
        return this.stringifyArray(value);
      case 'object':
        return this.stringifyObject(value);
      default:
        throw 'Invalid type to stringify.';
    }
  }

  stringifyArray(value) {
    var jsonString = '[\n  ' + this.indentLevel;

    jsonString += value.map(function(arrayItem) {
      var stringifier = new JsonStringifier(null, null, '  ' + this.indentLevel);
      if (typeof arrayItem === 'undefined') {
        return stringifier.stringify(null);
      }
      return stringifier.stringify(arrayItem);
    }.bind(this)).join(',\n  ' + this.indentLevel);

    jsonString += '\n' + this.indentLevel + ']';
    return jsonString;
  }

  stringifyObject(object) {
    var jsonString = '{\n  ' + this.indentLevel,
        objectPropertyJsonStrings = [];

    for (var key in object) {
      if (object.hasOwnProperty(key) && typeof object[key] !== 'undefined') {
        var stringifier = new JsonStringifier(null, null, '  ' + this.indentLevel);
        objectPropertyJsonStrings.push('"' + key + '": ' + stringifier.stringify(object[key]));
      }
    }

    jsonString += objectPropertyJsonStrings.join(',\n  ' + this.indentLevel);
    jsonString += '\n' + this.indentLevel + '}';

    return jsonString;
  }
}

export function jsonStringifyWithHighlight(value) {
  var stringifier = new JsonStringifier();
  return stringifier.stringify(value);
}

export default Ember.HTMLBars.makeBoundHelper(jsonStringifyWithHighlight);
