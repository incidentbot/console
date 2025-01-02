import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import {
  CommandBar,
  CommandBarContent,
  CommandBarDialog,
  CommandBarEmpty,
  CommandBarInput,
  CommandBarItem,
  CommandBarList,
  CommandBarLoading,
} from "@saas-ui/command-bar"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { useEffect } from "react"
import { IncidentService } from "../../client"

import { FaSearch } from "react-icons/fa"
import { GrServices } from "react-icons/gr"

function getIncidentsQueryOptions() {
  return {
    queryFn: () => IncidentService.getIncidentsApiV1IncidentGet({}),
    queryKey: ["incidents"],
  }
}

export default function GlobalSearch() {
  const bg = useColorModeValue("ui.light", "ui.darkSlate")

  // react-query
  const queryClient = useQueryClient()
  const { data: incidents, isPending } = useQuery({
    ...getIncidentsQueryOptions(),
    placeholderData: (prevData) => prevData,
  })

  const { isOpen, onClose, onToggle } = useDisclosure()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["incident"] })
  }, [queryClient])

  return (
    <>
      <InputGroup w={{ base: "100%", md: "100%" }}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="ui.dim" />
        </InputLeftElement>
        <Input
          bg={bg}
          borderRadius="8px"
          focusBorderColor="ui.main"
          fontSize={{ base: "sm", md: "inherit" }}
          isReadOnly
          onClick={onToggle}
          placeholder="Search"
          type="text"
        />
      </InputGroup>
      <CommandBar
        isOpen={isOpen}
        onClose={onClose}
        closeOnSelect
        size={{ base: "sm", md: "3xl" }}
      >
        <CommandBarDialog>
          <CommandBarContent>
            <CommandBarInput placeholder="Search..." autoFocus />
            <CommandBarList>
              {isPending && <CommandBarLoading>Hang on…</CommandBarLoading>}
              <CommandBarEmpty>No results found.</CommandBarEmpty>
              {incidents?.data.slice(0, 10).map((incident) => {
                return (
                  <Link
                    key={incident.channel_name!}
                    href={`/incidents/${incident.slug!}`}
                  >
                    <CommandBarItem value={incident.channel_name!}>
                      <Flex align="center">
                        <Box pr={2}>
                          <GrServices />
                        </Box>
                        <Text
                          size="md"
                          isTruncated
                          maxWidth={{ base: "300px", md: "600px" }}
                        >
                          {incident.slug}
                        </Text>
                      </Flex>
                      <Text
                        size="md"
                        isTruncated
                        maxWidth={{ base: "300px", md: "600px" }}
                      >
                        {incident.description}
                      </Text>
                    </CommandBarItem>
                  </Link>
                )
              })}
            </CommandBarList>
          </CommandBarContent>
        </CommandBarDialog>
      </CommandBar>
    </>
  )
}
