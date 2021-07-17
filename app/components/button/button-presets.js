import { spacing } from "../../theme"

const BASE_VIEW = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT = {
  paddingHorizontal: spacing[3],
}

export const viewPresets = {
  primary: { ...BASE_VIEW, backgroundColor: 'orange' },

  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } ,
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: 9, color: 'white' },
  link: {
    ...BASE_TEXT,
    color: 'black',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
}