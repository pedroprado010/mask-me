// @flow
declare module 'mask-types'{
  declare type Options = {
    startAt: string
  }
  declare type Config = {
    maskIndex: number,
    endMask: number,
    goNext: Function,
    goBack: Function,
    extraChars: Function,
    updateEndInput: Function,
    putCharAt: Function
  }
}
