
import * as React from "react"
import { View } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { icons } from "./icons"

const ROOT = {
  resizeMode: "contain",
  width: 32,
  maxHeight: 32
}

export function Icon(props) {
  const { style: styleOverride, icon, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  )
}