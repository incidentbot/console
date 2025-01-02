import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { FiLogOut, FiMenu } from "react-icons/fi"

import type { UserPublic } from "../../client"
import useAuth from "../../hooks/useAuth"
import LogoBox from "./LogoBox"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const queryClient = useQueryClient()

  // theme
  const textColor = useColorModeValue("ui.light", "ui.light")

  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Open Menu"
        fontSize="24px"
        color={textColor}
        variant="outline"
        icon={<FiMenu />}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="260px">
          <DrawerCloseButton />
          <DrawerBody>
            <Flex flexDir="column" justify="space-between">
              <Box>
                <Flex justifyContent="center">
                  <LogoBox imageSize="200px" showText sidebar />
                </Flex>
                <SidebarItems onClose={onClose} />
              </Box>
              <Flex
                as="button"
                onClick={handleLogout}
                p={2}
                color="ui.danger"
                fontWeight="bold"
                alignItems="center"
              >
                <FiLogOut />
                <Text ml={2}>Log out</Text>
              </Flex>
              {currentUser?.email && (
                <Text
                  color={textColor}
                  noOfLines={2}
                  fontSize="sm"
                  p={2}
                  maxW="180px"
                >
                  Logged in as: {currentUser.email}
                </Text>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar
