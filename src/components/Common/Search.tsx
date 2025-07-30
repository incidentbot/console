import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineClear } from 'react-icons/md'

interface SearchParameters {
  // Hook passed in to update the search term in the parent
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ setSearchTerm }: SearchParameters) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const clearInput = () => {
    inputRef.current!.value = ''
  }

  const handleClearInput = () => {
    clearInput()
    setSearchTerm('')
  }

  return (
    <>
      <Flex py={4} gap={4}>
        <InputGroup w={{ base: '100%', md: '100%' }}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="ui.dim" />
          </InputLeftElement>
          <Input
            borderRadius="8px"
            fontSize={{ base: 'sm', md: 'inherit' }}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            ref={inputRef}
            type="text"
          />
          <InputRightElement>
            <Button size="xs" onClick={handleClearInput}>
              <MdOutlineClear color="green.500" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </>
  )
}

export default Search
