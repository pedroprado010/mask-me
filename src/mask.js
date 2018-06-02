// @flow
import configureMask from './configure-mask'
import type { Options, Config } from 'mask-types'
/**
 *
 * 0 - Numbers [0-9]
 * 9 - Numbers [0-9]? 'optional'
 * A - Character [A-Za-z]
 * S - Alphanumeric [0-9A-Za-z]
 * # - Loop it!
 */

const testCases = {
  '0': /\d/,
  '9': /\d/,
  'A': /[a-zA-Z]/,
  'S': /\w/,
  '#': /\w/
}
const maskChars = /[#90AS]/

const defaultOptions :Options = {
  startAt: 'left'
}

const MaskMe = (mask :string, options :Options = defaultOptions) => {
  const config :Config = configureMask(mask, options)
  return (input :string) :string => {
    let {
      maskIndex,
      endMask,
      goNext,
      goBack,
      extraChars,
      updateEndInput,
      putCharAt
    } = config
    let i :number
    let endInput: number
    switch (options.startAt) {
      case 'left': {
        i = 0
        endInput = input.length
        break
      }
      case 'right': {
        i = input.length - 1
        endInput = 0
        break
      }
    }
    let loopStart :number = -1
    for (; extraChars(endInput, i); i = goNext(i)) {
      // Is at a test case?
      if (maskChars.test(mask[maskIndex])) {
        // If char do not pass the test, then ...
        if (!testCases[mask[maskIndex]].test(input[i])) {
          if (mask[maskIndex] !== '9') {
            // If not an optional case, erase it.
            // Special chars should be escaped first.
            input = input.replace(RegExp(input[i]
              .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")),
              ''
            )
            endInput = updateEndInput(input)
          } else {
            // If optional case then jump all next optional cases
            while (mask[maskIndex] === '9') { maskIndex = goNext(maskIndex) }
          }
          // Will redo last test so indexes should be at its correct position
          // decrease both indexes by 1.
          i = goBack(i)
          maskIndex = goBack(maskIndex)
        } else if (mask[maskIndex] === '#' && loopStart === -1) {
          // If test passes and is at an loop case, mark position and start
          // again from it when mask reaches last char.
          loopStart = maskIndex
        }
      } else if (input[i] !== mask[maskIndex]) {
        // If not a test case include char at position
        input = putCharAt(input, i, mask[maskIndex])
        // When starting from right char will be put in i + 1 position
        if (options.startAt === 'right') i = goBack(i)
        // input = input.substring(0, i) + mask[maskIndex] + input.substring(i)
        endInput = updateEndInput(input)
      }
      maskIndex = goNext(maskIndex)
      if (!(extraChars(endMask, maskIndex))) {
        if (loopStart !== -1) {
          // If at end of mask but have a loop char, set maskIndex to restart from
          // the loop position.
          maskIndex = loopStart
        } else {
          // If not, then stop masking and discard unnecessary chars
          break
        }
      }
    }

    // Check for extra chars, then remove if necessary.
    i = goNext(i)
    if (extraChars(endInput, i)) {
      input = input.substring(0,i)
    }

    // Check if next char at input is a mask constant (not a test case)
    // then add it to the end of the string.
    maskIndex = goBack(maskIndex)
    if (options.startAt==='left'
      && mask[maskIndex]
      && !maskChars.test(mask[maskIndex])
      && input[endInput - 1] !== mask[maskIndex]) {
      input += mask[maskIndex]
    }
    return input
  }
}

export { MaskMe as default }
