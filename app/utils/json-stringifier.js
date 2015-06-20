import Ember from 'ember';

export var highlightStart = '_JSONPointerHighlight_';
export var highlightEnd = '_/JSONPointerHighlight_';

class JsonStringifier {
  constructor(pointer, parents, indentLevel) {
    this.pointer     = typeof pointer !== 'undefined' ? pointer : '';
    this.parents     = typeof parents !== 'undefined' ? parents : '';
    this.indentLevel = typeof indentLevel !== 'undefined' ? indentLevel : '';
  }

  stringify(value) {
    switch (Ember.$.type(value)) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'null':
      case 'undefined':
        return this.stringifyDefault(value);
      case 'array':
        return this.stringifyArray(value);
      case 'object':
        return this.stringifyObject(value);
      default:
        throw 'Invalid type to stringify.';
    }
  }

  stringifyDefault(value) {
    return this._withHighlight(JSON.stringify(value));
  }

  stringifyArray(value) {
    var jsonString = '[\n  ' + this.indentLevel;

    jsonString += value.map(function(item, index) {
      var stringifier = this._createChildStringifier(index);
      if (typeof item === 'undefined') { return stringifier.stringify(null); }
      return stringifier.stringify(item);
    }.bind(this)).join(this._joinString());

    jsonString += '\n' + this.indentLevel + ']';

    return this._withHighlight(jsonString);
  }

  stringifyObject(object) {
    var jsonString = '{\n  ' + this.indentLevel,
        objectPropertyJsonStrings = [],
        stringifier,
        stringified;

    for (var key in object) {
      if (object.hasOwnProperty(key) && typeof object[key] !== 'undefined') {
        stringifier = this._createChildStringifier(key);
        stringified = stringifier.stringify(object[key]);
        objectPropertyJsonStrings.push('"' + key + '": ' + stringified);
      }
    }

    jsonString += objectPropertyJsonStrings.join(this._joinString());
    jsonString += '\n' + this.indentLevel + '}';

    return this._withHighlight(jsonString);
  }

  _matchesPointer() {
    return this.pointer && this.pointer === this.parents;
  }

  _withHighlight(value) {
    if (this._matchesPointer()) { return highlightStart + value + highlightEnd; }
    return value;
  }

  _createChildStringifier(childKey) {
    return new JsonStringifier(this.pointer,
                               this.parents + '/' + childKey,
                               '  ' + this.indentLevel);
  }

  _joinString() {
    return ',\n  ' + this.indentLevel;
  }
}

export default function jsonStringifier(value, pointer) {
  var stringifier = new JsonStringifier(pointer);
  return stringifier.stringify(value);
}
