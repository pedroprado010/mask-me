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
  direction: string
}

const defaultOptions :Options = {
  direction: 'left',
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
    let maskIndex = 0

    for (let i = 0; i < input.length && mask.length > maskIndex; ++i) {
      // Is at a test case?
      if (maskChars.test(mask[maskIndex])) {
        // Should erase char ?
        if (!testCases[mask[maskIndex]].test(input[i])) {
          if (mask[maskIndex] !== '9') {
            // If not an optional case, remove in
            input = input.replace(RegExp(input[i]
              .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")),
              ''
            )
          } else {
            // Jumping optional cases
            while (mask[maskIndex] === '9') { maskIndex++ }

          }
          // will redo last test so indexes should be at its correct position
          -- i
          -- maskIndex
        }
      } else if (input[i] !== mask[maskIndex]) {
        // If not a test case include char at position
        input = input.substring(0, i) + mask[maskIndex] + input.substring(i)
      }
      ++ maskIndex
      console.log(mask,mask[maskIndex],maskIndex,input[i],i,input)
    }
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
