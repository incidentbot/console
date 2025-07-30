import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { FaUser } from 'react-icons/fa'
import { FiLogOut, FiUser } from 'react-icons/fi'

import useAuth from '../../hooks/useAuth'

const UserMenu = () => {
  const { logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <>
      {/* Desktop */}
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            size="md"
            fontSize="lg"
            aria-label="Options"
            variant="ghost"
            icon={<FaUser color="white" fontSize="18px" />}
          />
          <MenuList>
            <MenuItem
              icon={<FiUser fontSize="18px" />}
              as={Link}
              to="/settings"
            >
              My profile
            </MenuItem>
            <MenuItem
              icon={<FiLogOut fontSize="18px" />}
              onClick={handleLogout}
              color="ui.danger"
              fontWeight="bold"
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  )
}

export default UserMenu
