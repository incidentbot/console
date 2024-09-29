import { useEffect } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { EmptyStateContainer, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@saas-ui/react"
import { IncidentsService } from '../../../client'
import type { Incident } from '../../../client'
import { SiConfluence } from "react-icons/si"

interface PostmortemsProps {
  incident: Incident
}

function getIncidentPostmortems(slug: string) {
  return {
    queryFn: () => IncidentsService.readIncidentPostmortems({ slug: slug }),
    queryKey: ["postmortems", slug],
  }
}

function Postmortems({ incident }: PostmortemsProps) {
  const queryClient = useQueryClient()

  const { data: postmortems } = useQuery({
    ...getIncidentPostmortems(incident.slug),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentPostmortems(incident.slug))
  }, [queryClient, incident])

  return postmortems?.length ? (
    <>
      <TableContainer>
        <Heading size="md">Postmortems</Heading>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {postmortems?.map((postmortem) => (
              <Tr key={postmortem.id}>
                <Td>
                  <Link href={`${postmortem.url}`} isExternal>{postmortem.url}</Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Flex mt={8}>
      <EmptyStateContainer colorScheme="blue">
        <EmptyStateIcon as={SiConfluence} />
        <EmptyStateTitle>No postmortems</EmptyStateTitle>
        <EmptyStateDescription>There are no postmortems associated with this incident.</EmptyStateDescription>
      </EmptyStateContainer>
    </Flex>
  )
}

export default Postmortems
