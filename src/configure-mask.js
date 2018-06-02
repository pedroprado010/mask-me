// @flow
import type { Options, Config } from 'mask-types'

function configureMask(mask :string, options :Options) :Config {
  let maskIndex, endMask, goNext, goBack, extraChars, updateEndInput, putCharAt
  switch (options.startAt) {
    case 'right': {
      maskIndex = mask.length - 1
      endMask = 0
      goNext = (pos :number) :number => pos - 1
      goBack = (pos :number) :number => pos + 1
      extraChars = (endInput :number, pos: number) :bool => endInput <= pos
      updateEndInput = (input :string) => 0
      putCharAt = (input :string, pos :number, char :string) => {
        return  input.substring(0, pos + 1) + char + input.substring(pos + 1)
      }
      break
    }
    case 'left': {
      maskIndex = 0
      endMask = mask.length
      goNext = (pos :number) :number => pos + 1
      goBack = (pos :number) :number => pos - 1
      extraChars = (endInput :number, pos: number) :bool => endInput > pos
      updateEndInput = (input :string) => input.length
      putCharAt = (input :string, pos :number, char :string) => {
        return  input.substring(0, pos) + char + input.substring(pos)
      }
      break
    }
    default: {
      throw Error('Wrong value for startAt prop:' + options.startAt)
    }
  }
  const __config__ :Config = {
    maskIndex,
    endMask,
    goNext,
    goBack,
    extraChars,
    updateEndInput,
    putCharAt
  }
  return __config__
}

export {configureMask as default}
