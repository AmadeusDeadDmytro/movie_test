import { typography } from "../../theme"

const BASE = {
  fontFamily: typography.primary,
  color: 'black',
  fontSize: 15,
}

export const presets = {
  default: BASE,
  bold: { ...BASE, fontWeight: "bold" },
  header: { ...BASE, fontSize: 24, fontWeight: "bold" },
  fieldLabel: { ...BASE, fontSize: 13 },
  secondary: { ...BASE, fontSize: 9 },
}
