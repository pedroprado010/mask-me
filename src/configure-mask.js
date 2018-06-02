// @flow
import type { Options, Config } from 'mask-types'

function configureMask(mask :string, options :Options) :Config {
  let maskIndex, endMask, goNext, goBack, extraChars, updateEndInput
  switch (options.startAt) {
    case 'right': {
      maskIndex = mask.length - 1
      endMask = 0
      goNext = (pos :number) :number => pos - 1
      goBack = (pos :number) :number => pos + 1
      extraChars = (endInput :number, pos: number) :bool => endInput <= pos
      updateEndInput = (input :string) => 0
      break
    }
    case 'left': {
      maskIndex = 0
      endMask = mask.length
      goNext = (pos :number) :number => pos + 1
      goBack = (pos :number) :number => pos - 1
      extraChars = (endInput :number, pos: number) :bool => endInput > pos
      updateEndInput = (input :string) => input.length
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
    updateEndInput
  }
  return __config__
}

export {configureMask as default}
