import React, { useLayoutEffect, useState } from "react"
import {
  Image as RNImage,
} from "react-native"

export const AutoImage = (props) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (props.source?.uri) {
      RNImage.getSize(props.source.uri, (width, height) => {
        setImageSize({ width, height })
      })
    } else {
      const { width, height } = RNImage.resolveAssetSource(props.source)
      setImageSize({ width, height })
    }
  }, [])

  return <RNImage {...props} style={[imageSize, props.style]} />
}