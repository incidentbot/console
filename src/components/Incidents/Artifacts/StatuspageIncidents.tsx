import { useEffect } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Badge,
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
import { SiStatuspage } from "react-icons/si"

interface StatuspageIncidentsProps {
  incident: Incident
}

function getIncidentStatuspageIncidents(slug: string) {
  return {
    queryFn: () => IncidentsService.readIncidentStatuspageIncidents({ slug: slug }),
    queryKey: ["spincidents", slug],
  }
}

function StatuspageIncidents({ incident }: StatuspageIncidentsProps) {
  const queryClient = useQueryClient()

  const { data: spincidents } = useQuery({
    ...getIncidentStatuspageIncidents(incident.slug),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentStatuspageIncidents(incident.slug))
  }, [queryClient, incident])

  return spincidents?.length ? (
    <>
      <TableContainer>
        <Heading size="md">Statuspage Incidents</Heading>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {spincidents?.map((incident) => (
              <Tr key={incident.id}>
                <Td>
                  {incident.name}
                </Td>
                <Td>
                  <Badge>
                    {incident.status}
                  </Badge>
                </Td>
                <Td>
                  <Link href={`${incident.shortlink}`} isExternal>{incident.shortlink}</Link>
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
        <EmptyStateIcon as={SiStatuspage} />
        <EmptyStateTitle>No Statuspage incidents.</EmptyStateTitle>
        <EmptyStateDescription>There are no Statuspage incidents associated with this incident.</EmptyStateDescription>
      </EmptyStateContainer>
    </Flex>
  )
}

export default StatuspageIncidents
