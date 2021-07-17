import React from "react"
import { View } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"

const ROOT = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE = { textAlign: "center" }
const TITLE_MIDDLE = { flex: 1, justifyContent: "center" }
const LEFT = { width: 32 }
const RIGHT = { width: 32 }

export const Header = (props) => {
  const {
    onLeftPress,
    leftIcon,
    rightIcon,
    onRightPress,
    headerText,
    style,
    titleStyle,
  } = props
  const header = headerText || ""
  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
        <Button preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}