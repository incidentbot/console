import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash } from "react-icons/fi"

import type { IncidentEvent } from "../../client"
import Delete from "../Common/DeleteAlert"
import EditIncidentEvent from "./EditIncidentEvent"

interface EventActionsMenuProps {
  type: string
  slug: string
  id: string
  value: IncidentEvent
  disabled?: boolean
  hasImage?: boolean
}

const EventActionsMenu = ({ type, slug, id, value, disabled, hasImage }: EventActionsMenuProps) => {
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()

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
            isDisabled={hasImage}
            onClick={editModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Delete
          </MenuItem>
        </MenuList>
        <EditIncidentEvent
          slug={slug}
          id={id}
          event={value as IncidentEvent}
          isOpen={editModal.isOpen}
          onClose={editModal.onClose}
        />
        <Delete
          type={type}
          id={id}
          value={value as IncidentEvent}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Menu>
    </>
  )
}

export default EventActionsMenu
