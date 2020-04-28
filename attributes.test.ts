import {attributeExpression2str} from './attributes'

it('0', () => expect(attributeExpression2str(
  //@ts-ignore
  []
)).toBe(
  ''
))

it('1', () => expect(attributeExpression2str(
  ['data-id']
)).toBe(
  '[data-id]'
))

it('3', () => expect(attributeExpression2str([
  'data-id', "^=", ''
])).toBe(
  '[data-id^=""]'
))