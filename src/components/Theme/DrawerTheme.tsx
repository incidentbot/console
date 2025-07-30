import { drawerAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  dialog: {
    bg: 'ui.darkSlateLite',
  },
})

export const drawerTheme = defineMultiStyleConfig({
  baseStyle,
})
