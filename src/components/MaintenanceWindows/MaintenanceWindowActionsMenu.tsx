import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiTrash } from "react-icons/fi"

import type { MaintenanceWindow } from "../../client"
import Delete from "../Common/DeleteAlert"

interface MaintenanceWindowActionsMenuProps {
  type: string
  value: MaintenanceWindow
  disabled?: boolean
}

const MaintenanceWindowActionsMenu = ({
  type,
  value,
  disabled,
}: MaintenanceWindowActionsMenuProps) => {
  const deleteMaintenanceWindowModal = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          <MenuItem
            onClick={deleteMaintenanceWindowModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Delete Maintenance Window
          </MenuItem>
        </MenuList>
        <Delete
          type={type}
          value={value as MaintenanceWindow}
          isOpen={deleteMaintenanceWindowModal.isOpen}
          onClose={deleteMaintenanceWindowModal.onClose}
        />
      </Menu>
    </>
  )
}

export default MaintenanceWindowActionsMenu
