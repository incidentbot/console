import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  chakra,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"

import LogoBox from "./LogoBox"
import Sidebar from "./Sidebar"
import UserMenu from "./UserMenu"

import { FaMoon, FaSun } from "react-icons/fa"

export default function PrimaryHeader() {
  const bg = useColorModeValue("ui.main", "ui.main")
  const headerBorderColor = useColorModeValue("ui.mainLite", "ui.mainLite")
  const text = useColorModeValue("ui.light", "ui.light")

  const ref = React.useRef(null)
  const { toggleColorMode: toggleMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={"sm"}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="3px solid"
        borderTopColor={headerBorderColor}
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="3.5rem" mx="auto">
          <Flex w="full" h="full" px="4" align="center" justify="space-between">
            <HStack>
              <Sidebar />
              <Link href="/">
                <LogoBox imageSize="45px" />
              </Link>
            </HStack>
            <Spacer />
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color={text}
              ml={{
                base: "0",
                md: "3",
              }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <UserMenu />
          </Flex>
        </chakra.div>
      </chakra.header>
    </Box>
  )
}
