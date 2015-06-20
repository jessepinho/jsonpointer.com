import { jsonStringifierHighlighter } from '../../../helpers/json-stringifier-highlighter';
import { highlightStart, highlightEnd } from '../../../utils/json-stringifier';
import { module, test } from 'qunit';

module('Unit | Helper | json stringifier highlighter');

test('it replaces highlight start/end markers with <span> tags', function(assert) {
  var highlighted = highlightStart + 'bar' + highlightEnd;
  var result = jsonStringifierHighlighter('foo\n' + highlighted + '\nbaz');
  var expected = 'foo\n<span class="json-pointer-highlight">bar</span>\nbaz';

  assert.equal(result, expected);
});

test('it works across multiline highlights', function(assert) {
  var highlighted = highlightStart + 'bar\nbaz' + highlightEnd;
  var result = jsonStringifierHighlighter('foo\n' + highlighted + '\nquux');
  var expected = 'foo\n<span class="json-pointer-highlight">bar\nbaz</span>\nquux';

  assert.equal(result, expected);
});
