import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"

const Search = () => {
  return (
    <>
      <Flex py={8} gap={4}>
        <InputGroup w={{ base: "100%", md: "100%" }}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="ui.dim" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            fontSize={{ base: "sm", md: "inherit" }}
            borderRadius="8px"
          />
        </InputGroup>
      </Flex>
    </>
  )
}

export default Search
