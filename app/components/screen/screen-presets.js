export const offsets = {
  none: 0,
}

export const presets = {
  fixed: {
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%",
    },
  },

  scroll: {
    inner: { justifyContent: "flex-start", alignItems: "stretch" },
  },
}

export const isNonScrolling = (preset) => {
  return !preset || !presets[preset] || preset === "fixed"
}