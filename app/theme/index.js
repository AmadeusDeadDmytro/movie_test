import { Platform } from "react-native"

export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64]

export const typography = {
    primary: Platform.select({ ios: "Helvetica", android: "normal" }),
    secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),
    code: Platform.select({ ios: "Courier", android: "monospace" }),
  }