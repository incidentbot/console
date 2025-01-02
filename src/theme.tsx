import { extendTheme } from "@chakra-ui/react"
import { theme as baseTheme } from "@saas-ui/react"
import { drawerTheme } from "./components/Theme/DrawerTheme"

const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.main",
  },
}

const theme = extendTheme(
  {
    initialColorMode: "dark",
    useSystemColorMode: false,
    colors: {
      ui: {
        main: "#006c96",
        mainLite: "#7FB5CA",
        secondary: "#b8c5d4",
        success: "#48BB78",
        danger: "#E53E3E",
        light: "#FAFAFA",
        dark: "#1A202C",
        darkSlate: "#252D3D",
        darkSlateLite: "#3a4250",
        dim: "#A0AEC0",
      },
    },
    components: {
      Button: {
        variants: {
          primary: {
            backgroundColor: "ui.main",
            color: "ui.light",
            _hover: {
              backgroundColor: "ui.mainLite",
            },
            _disabled: {
              ...disabledStyles,
              _hover: {
                ...disabledStyles,
              },
            },
          },
          danger: {
            backgroundColor: "ui.danger",
            color: "ui.light",
            _hover: {
              backgroundColor: "#E32727",
            },
          },
        },
      },
      Drawer: drawerTheme,
      Tabs: {
        variants: {
          enclosed: {
            tab: {
              _selected: {
                color: "ui.main",
              },
            },
          },
        },
      },
    },
  },
  baseTheme,
)

export default theme
