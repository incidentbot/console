import {
  Collapse,
  Divider,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import type { UserPublic } from "../../client"

import { BsFire } from "react-icons/bs"
import { FiHome, FiSettings, FiUsers } from "react-icons/fi"
import { LuConstruction } from "react-icons/lu"
import { MdKeyboardArrowRight } from "react-icons/md"
import { RiAdminFill } from "react-icons/ri"

// Generic list items
const items = [
  { icon: BsFire, title: "Incidents", path: "/incidents" },
  { icon: LuConstruction, title: "Maintenance", path: "/maintenance" },
  { icon: FiSettings, title: "Settings", path: "/settings" },
]

// Administration list items
const adminItems = [{ icon: FiUsers, title: "Users", path: "/admin/users" }]

interface SidebarItemsProps {
  onClose?: () => void
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const adminOptions = useDisclosure({ defaultIsOpen: true })
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  // theme
  const textColor = useColorModeValue("ui.light", "ui.light")
  const bgActive = useColorModeValue("#4A5568", "#4A5568")
  const bgHover = useColorModeValue("#6e7686", "#6e7686")
  const navFontSize = "md"

  // Generic list items
  const listItems = items.map(({ icon, title, path }) => (
    <Flex
      as={Link}
      to={path}
      w="100%"
      p={2}
      key={title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: "12px",
        },
      }}
      _hover={{
        bg: bgHover,
        cursor: "pointer",
        borderRadius: "12px",
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={icon} alignSelf="center" />
      <Text fontSize={navFontSize} ml={4}>
        {title}
      </Text>
    </Flex>
  ))

  // Administration list items
  const adminListItems = adminItems.map(({ icon, title, path }) => (
    <Flex
      as={Link}
      to={path}
      w="100%"
      py={2}
      pl={6}
      key={title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: "12px",
        },
      }}
      _hover={{
        bg: bgHover,
        cursor: "pointer",
        borderRadius: "12px",
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={icon} alignSelf="center" />
      <Text fontSize={navFontSize} ml={4}>
        {title}
      </Text>
    </Flex>
  ))

  return (
    <>
      <Divider my={2} />

      {/* Dashboard */}
      <Flex
        as={Link}
        to={"/"}
        w="100%"
        p={2}
        key={"Dashboard"}
        activeProps={{
          style: {
            background: bgActive,
            borderRadius: "12px",
          },
        }}
        _hover={{
          bg: bgHover,
          cursor: "pointer",
          borderRadius: "12px",
        }}
        color={textColor}
        onClick={onClose}
      >
        <Icon as={FiHome} alignSelf="center" />
        <Text fontSize={navFontSize} ml={4}>
          Dashboard
        </Text>
      </Flex>

      {/* Rest */}
      {listItems}

      {/* Administration */}
      {currentUser?.is_superuser && (
        <>
          <Flex
            w="100%"
            p={2}
            color={textColor}
            onClick={adminOptions.onToggle}
            _hover={{
              bg: bgHover,
              cursor: "pointer",
              borderRadius: "12px",
            }}
          >
            <Icon as={RiAdminFill} alignSelf="center" />
            <Text fontSize={navFontSize} ml={4}>
              Administration
            </Text>
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              alignSelf="center"
              // @ts-ignore
              // Due to type incompatibility vvvvv
              transform={adminOptions.isOpen && "rotate(90deg)"}
            />
          </Flex>
          <Collapse in={adminOptions.isOpen}>{adminListItems}</Collapse>
        </>
      )}
    </>
  )
}

export default SidebarItems
