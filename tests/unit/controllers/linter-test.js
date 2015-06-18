import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:linter', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('parsedJsonObject is the parsed JSON of jsonObject', function(assert) {
  var controller = this.subject();
  controller.set('jsonObject', '{ "foo": "bar" }');

  assert.equal(controller.get('parsedJsonObject').foo, 'bar');
});

test('parsedJsonObject is undefined when jsonObject is not valid JSON', function(assert) {
  var controller = this.subject();
  controller.set('jsonObject', '{ unquotedPropertyName: "foo" }');

  assert.equal(controller.get('parsedJsonObject'), undefined);
});

test('formattedJsonObject formats parsedJsonObject with two-space indents', function(assert) {
  var controller = this.subject();
  controller.set('parsedJsonObject', { foo: 'bar' });

  assert.equal(controller.get('formattedJsonObject'), "{\n  \"foo\": \"bar\"\n}");
});

test('formattedJsonObject shows a message when parsedJsonObject is undefined', function(assert) {
  var controller = this.subject();
  controller.set('parsedJsonObject', undefined);

  assert.equal(controller.get('formattedJsonObject'), 'Please enter a valid JSON object.');
});

test('jsonPointerValue is the object referenced by the JSON pointer', function(assert) {
  var controller = this.subject();
  controller.set('jsonPointer', '/foo');
  controller.set('parsedJsonObject', { foo: 'bar' });

  assert.equal(controller.get('jsonPointerValue'), 'bar');
});

test('jsonPointerValue is unedfined if getting the pointer fails', function(assert) {
  var controller = this.subject();
  controller.set('jsonPointer', 'badPointer');
  controller.set('parsedJsonObject', { foo: 'bar' });

  assert.equal(controller.get('jsonPointerValue'), undefined);
});

test('formattedJsonPointerValue formats jsonPointerValue with two-space indents', function(assert) {
  var controller = this.subject();
  controller.set('jsonPointerValue', { foo: 'bar' });

  assert.equal(controller.get('formattedJsonPointerValue'), "{\n  \"foo\": \"bar\"\n}");
});

test('formattedJsonPointerValue shows a message when jsonPointerValue is undefined', function(assert) {
  var controller = this.subject();
  controller.set('jsonPointerValue', undefined);

  assert.equal(controller.get('formattedJsonPointerValue'), 'Please enter a valid JSON object and pointer.');
});
