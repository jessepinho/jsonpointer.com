import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:linter', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('object is the parsed JSON of objectString', function(assert) {
  var controller = this.subject();
  controller.set('objectString', '{ "foo": "bar" }');

  assert.equal(controller.get('object').foo, 'bar');
});

test('object is undefined when objectString is not valid JSON', function(assert) {
  var controller = this.subject();
  controller.set('objectString', '{ unquotedPropertyName: "foo" }');

  assert.equal(controller.get('object'), undefined);
});

test('stringifiedObject formats object with two-space indents', function(assert) {
  var controller = this.subject();
  controller.set('object', { foo: 'bar' });

  assert.equal(controller.get('stringifiedObject'), "{\n  \"foo\": \"bar\"\n}");
});

test('stringifiedObject shows a message when object is undefined', function(assert) {
  var controller = this.subject();
  controller.set('object', undefined);

  assert.equal(controller.get('stringifiedObject'), 'The JSON object you entered is invalid.');
});

test('pointerObject is the object referenced by the JSON pointer', function(assert) {
  var controller = this.subject();
  controller.set('pointer', '/foo');
  controller.set('object', { foo: 'bar' });

  assert.equal(controller.get('pointerObject'), 'bar');
});

test('pointerObject is unedfined if getting the pointer fails', function(assert) {
  var controller = this.subject();
  controller.set('pointer', 'badPointer');
  controller.set('object', { foo: 'bar' });

  assert.equal(controller.get('pointerObject'), undefined);
});

test('stringifiedPointerObject formats pointerObject with two-space indents', function(assert) {
  var controller = this.subject();
  controller.set('pointerObject', { foo: 'bar' });

  assert.equal(controller.get('stringifiedPointerObject'), "{\n  \"foo\": \"bar\"\n}");
});

test('stringifiedPointerObject shows a message when pointerObject is undefined', function(assert) {
  var controller = this.subject();
  controller.set('pointerObject', undefined);

  assert.equal(controller.get('stringifiedPointerObject'), 'Please enter a valid JSON object and pointer.');
});
