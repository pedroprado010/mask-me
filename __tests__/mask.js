import {mask} from '../src'
test('date mask', () => {
  const myMask = mask('00/00/0000')
  expect(myMask('12345678')).toMatch(/12\/34\/5678/)
})

test('fails date mask', () => {
  const myMask = mask('00/00/0000')
  expect(myMask('aabbcccc')).toBeFalsy() // Returns empty string
})

test('ip mask', () => {
  const myMask = mask('099.099.099.099')
  expect(myMask('1921680 ')).toMatch(/192\.168\.0\./)
  expect(myMask('1921680.')).toMatch(/192\.168\.0\./)
  expect(myMask('1921680 102330')).toMatch(/192\.168\.0\.102/)
})

test('money mask', () => {
  const myMask = mask('##.#0.00')
  //expect(myMas)
})
