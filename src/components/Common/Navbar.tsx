import { Flex, Heading, Spacer } from '@chakra-ui/react'
import Search from './Search'

interface NavBarProps {
  header?: string
  enableSearch: boolean
  marginTop: number
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const NavBar = ({
  header,
  enableSearch,
  marginTop,
  setSearchTerm,
}: NavBarProps) => {
  return (
    <>
      <Flex alignItems="center" alignContent="center" mt={marginTop} mb={2}>
        {header && (
          <Heading size="lg" textAlign={{ base: 'left', md: 'left' }}>
            {header}
          </Heading>
        )}
        <Spacer />
      </Flex>
      {enableSearch && <Search setSearchTerm={setSearchTerm} />}
    </>
  )
}

export default NavBar
