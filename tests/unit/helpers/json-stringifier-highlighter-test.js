import { jsonStringifierHighlighter } from '../../../helpers/json-stringifier-highlighter';
import { highlightStart, highlightEnd } from '../../../utils/json-stringifier';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | json stringifier highlighter');

test('it replaces highlight start/end markers with <span> tags', function(assert) {
  var highlighted = highlightStart + 'bar' + highlightEnd;
  var result = jsonStringifierHighlighter(['foo\n' + highlighted + '\nbaz']);
  var expected = Ember.String.htmlSafe('foo\n<span class="json-pointer-highlight">bar</span>\nbaz');

  assert.deepEqual(result, expected);
});

test('it works across multiline highlights', function(assert) {
  var highlighted = highlightStart + 'bar\nbaz' + highlightEnd;
  var result = jsonStringifierHighlighter(['foo\n' + highlighted + '\nquux']);
  var expected = Ember.String.htmlSafe('foo\n<span class="json-pointer-highlight">bar\nbaz</span>\nquux');

  assert.deepEqual(result, expected);
});
