import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text-presets"

export function Text(props) {
  const { preset = "default", tx, txOptions, text, children, style: styleOverride, ...rest } = props

  const content = text || children

  const style = presets[preset] || presets.default
  const styles = [style, styleOverride]

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}