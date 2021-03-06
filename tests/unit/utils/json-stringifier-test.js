import jsonStringifier from '../../../utils/json-stringifier';
import { highlightStart, highlightEnd } from '../../../utils/json-stringifier';
import { module, test } from 'qunit';

module('Unit | Utility | json stringifier');

test('it stringifies a complex object the same as JSON.stringify()', function(assert) {
  var complexObject = {
    foo: {
      bar: [1, 2, 3],
      baz: "quux"
    },
    corge: false
  };
  var result = jsonStringifier(complexObject);
  assert.equal(result, JSON.stringify(complexObject, null, 2));
});

test('it stringifies an object', function(assert) {
  var result = jsonStringifier({ a: 'b', c: 'd' });
  assert.equal(result, '{\n  "a": "b",\n  "c": "d"\n}');
});

test('it stringifies an array', function(assert) {
  var result = jsonStringifier([1, 2]);
  assert.equal(result, '[\n  1,\n  2\n]');
});

test('it stringifies a string', function(assert) {
  var result = jsonStringifier("Hello world!");
  assert.equal(result, '"Hello world!"');
});

test('it stringifies a number', function(assert) {
  var result = jsonStringifier(1);
  assert.equal(result, '1');
});

test('it stringifies a boolean', function(assert) {
  var result = jsonStringifier(true);
  assert.equal(result, 'true');
});

test('it stringifies null', function(assert) {
  var result = jsonStringifier(null);
  assert.equal(result, 'null');
});

test('it filters undefined properties out of objects', function(assert) {
  var result = jsonStringifier({ a: 'b', c: undefined });
  assert.equal(result, '{\n  "a": "b"\n}');
});

test('it converts undefined to null in arrays', function(assert) {
  var result = jsonStringifier([1, 2, undefined]);
  assert.equal(result, '[\n  1,\n  2,\n  null\n]');
});

test('it double-indents nested items in arrays', function(assert) {
  var result = jsonStringifier([1, [2, 3]]);
  assert.equal(result, '[\n  1,\n  [\n    2,\n    3\n  ]\n]');
});

test('it double-indents nested items in objects', function(assert) {
  var object = { a: { b: 'c' } };
  var result = jsonStringifier(object);

  assert.equal(result, '{\n  "a": {\n    "b": "c"\n  }\n}');
});

test('it highlights a property of an object referenced by the pointer', function(assert) {
  var object = { a: { b: 'c' } };
  var pointer = '/a/b';
  var result = jsonStringifier(object, pointer);
  var highlighted = highlightStart + '"c"' + highlightEnd;
  var expected = '{\n  "a": {\n    "b": ' + highlighted + '\n  }\n}';

  assert.equal(result, expected);
});

test('it highlights a nested object referenced by the pointer', function(assert) {
  var object = { a: { b: 'c' } };
  var pointer = '/a';
  var result = jsonStringifier(object, pointer);
  var highlighted = highlightStart + '{\n    "b": "c"\n  }' + highlightEnd;
  var expected = '{\n  "a": ' + highlighted + '\n}';

  assert.equal(result, expected);
});

test('it highlights the part of the array referenced by the pointer', function(assert) {
  var result = jsonStringifier([1, 2, 3], '/1');
  var highlighted = highlightStart + '2' + highlightEnd;
  var expected = '[\n  1,\n  ' + highlighted + ',\n  3\n]';

  assert.equal(result, expected);
});

test('it highlights a nested array referenced by the pointer', function(assert) {
  var result = jsonStringifier([1, [2, 3], 4], '/1');
  var highlighted = highlightStart + '[\n    2,\n    3\n  ]' + highlightEnd;
  var expected = '[\n  1,\n  ' + highlighted + ',\n  4\n]';

  assert.equal(result, expected);
});
