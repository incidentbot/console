import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { FiEdit, FiTrash } from 'react-icons/fi'

import type { IncidentRecord } from '../../client'
import Delete from '../Common/DeleteAlert'
import EditIncidentDescription from './EditIncidentDescription'
import EditIncidentSeverity from './EditIncidentSeverity'
import EditIncidentStatus from './EditIncidentStatus'

interface IncidentActionsMenuProps {
  type: string
  value: IncidentRecord
}

const IncidentActionsMenu = ({ type, value }: IncidentActionsMenuProps) => {
  const setIncidentDescriptionModal = useDisclosure()
  const setIncidentSeverityModal = useDisclosure()
  const setIncidentStatusModal = useDisclosure()
  const deleteIncidentModal = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton
          px={2}
          py={1}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: 'gray.400' }}
          _expanded={{ bg: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
        >
          Edit Incident <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={setIncidentDescriptionModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Edit Description
          </MenuItem>
          <MenuItem
            onClick={setIncidentSeverityModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Edit Severity
          </MenuItem>
          <MenuItem
            onClick={setIncidentStatusModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Edit Status
          </MenuItem>
          <MenuItem
            onClick={deleteIncidentModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Delete
          </MenuItem>
        </MenuList>
        <EditIncidentDescription
          incident={value as IncidentRecord}
          isOpen={setIncidentDescriptionModal.isOpen}
          onClose={setIncidentDescriptionModal.onClose}
        />
        <EditIncidentSeverity
          incident={value as IncidentRecord}
          isOpen={setIncidentSeverityModal.isOpen}
          onClose={setIncidentSeverityModal.onClose}
        />
        <EditIncidentStatus
          incident={value as IncidentRecord}
          isOpen={setIncidentStatusModal.isOpen}
          onClose={setIncidentStatusModal.onClose}
        />
        <Delete
          type={type}
          id={String(value.id)}
          isOpen={deleteIncidentModal.isOpen}
          onClose={deleteIncidentModal.onClose}
        />
      </Menu>
    </>
  )
}

export default IncidentActionsMenu
