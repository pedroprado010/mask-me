// @flow
/**
 *
 * 0 - Numbers [0-9]
 * 9 - Numbers [0-9]? 'optional'
 * A - Character [A-Za-z]
 * S - Alphanumeric [0-9A-Za-z]
 * # - Loop it!
 */
type Options = {
  startAt: string
}

const defaultOptions :Options = {
  startAt: 'left',
}

const mask = (mask :string, options :Options = defaultOptions) => {
  const testCases = {
    '0': /\d/,
    '9': /\d/,
    'A': /[a-zA-Z]/,
    'S': /\w/,
    '#': /\w/
  }
  const maskChars = /[#90AS]/

  return (input :string) :string => {
    let maskIndex :number = 0
    let i :number
    let loopStart :number = -1
    for (i = 0; i < input.length; ++i) {
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
          } else {
            // If optional case then jump all next optional cases
            while (mask[maskIndex] === '9') { maskIndex++ }
          }
          // Will redo last test so indexes should be at its correct position
          // decrease both indexes by 1.
          -- i
          -- maskIndex
        } else if (mask[maskIndex] === '#' && loopStart === -1) {
          // If test passes and is at an loop case, mark position and start
          // again from it when mask reaches last char.
          loopStart = maskIndex
        }
      } else if (input[i] !== mask[maskIndex]) {
        // If not a test case include char at position
        input = input.substring(0, i) + mask[maskIndex] + input.substring(i)
      }
      ++ maskIndex
      if (!(maskIndex < mask.length)) {
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
    if (i >= input.length) {
      input = input.substring(0,i)
    }

    // Check if next char at input is a mask constant (not a test case)
    // then add it to the end of the string.
    -- maskIndex
    if (mask[maskIndex]
      && !maskChars.test(mask[maskIndex])
      && input[input.length - 1] !== mask[maskIndex]) {
      input += mask[maskIndex]
    }
    return input
  }
}

export { mask as default }
