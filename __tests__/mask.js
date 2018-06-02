import {mask} from '../src'
test('date mask', () => {
  const myMask = mask('00/00/0000')
  expect(myMask('1')).toMatch(/1/) // 1
  expect(myMask('12')).toMatch(/12/) // 12
  expect(myMask('12 ')).toMatch(/12\//) // 12/
  expect(myMask('123')).toMatch(/12\/3/) // 12/3
  expect(myMask('12/3')).toMatch(/12\/3/) // 12/3
  expect(myMask('1234')).toMatch(/12\/34/) // 12/34
  expect(myMask('1234 ')).toMatch(/12\/34\//) // 12/34/
  expect(myMask('12/34')).toMatch(/12\/34/) // 12/34
  expect(myMask('12345')).toMatch(/12\/34\/5/)
  expect(myMask('1234/5')).toMatch(/12\/34\/5/)
  expect(myMask('12/345')).toMatch(/12\/34\/5/)
  expect(myMask('12/34/5')).toMatch(/12\/34\/5/)
  expect(myMask('123456')).toMatch(/12\/34\/56/)
  expect(myMask('1234/56')).toMatch(/12\/34\/56/)
  expect(myMask('12/3456')).toMatch(/12\/34\/56/)
  expect(myMask('12/34/56')).toMatch(/12\/34\/56/)
  expect(myMask('1234567')).toMatch(/12\/34\/567/)
  expect(myMask('12/34567')).toMatch(/12\/34\/567/)
  expect(myMask('1234/567')).toMatch(/12\/34\/567/)
  expect(myMask('12/34/567')).toMatch(/12\/34\/567/)
  expect(myMask('12345678')).toMatch(/12\/34\/5678/)
  expect(myMask('12/345678')).toMatch(/12\/34\/5678/)
  expect(myMask('1234/5678')).toMatch(/12\/34\/5678/)
  expect(myMask('12/34/5678')).toMatch(/12\/34\/5678/)
  expect(myMask('aabbcccc')).toBeFalsy() // Returns empty string
})

test('ip mask', () => {
  const myMask = mask('099.099.099.099')
  expect(myMask('1 1.1 1 ')).toMatch(/1\.1\.1\.1/) //1.1.1.1
  expect(myMask('1 1.1 1  1231231')).toMatch(/1\.1\.1\.1/) //1.1.1.1
  expect(myMask('1 ')).toMatch(/1\./) //1.
  expect(myMask('1      ')).toMatch(/1\./) //1.
  expect(myMask('1921680 ')).toMatch(/192\.168\.0\./) //192.168.0.
  expect(myMask('1921680.')).toMatch(/192\.168\.0\./) //192.168.0.
  expect(myMask('1921680 102330')).toMatch(/192\.168\.0\.102/) //192.168.0.102
})

test('date/ip mask', () => {
  const myMask = mask('00/00/0000')
  const myMask2 = mask('099.099.099.099')
  expect(myMask('12345678')).toMatch(/^12\/34\/5678$/)
  expect(myMask2('1921680 102330')).toMatch(/^192\.168\.0\.102$/) //192.168.0.102
})


test('money mask', () => {
  const myMask = mask('#.##0,00', {startAt: 'right'})
  expect(myMask('11133344455')).toMatch('111.333.444,55')
})
