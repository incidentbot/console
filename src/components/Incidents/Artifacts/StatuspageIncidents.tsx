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
import {
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@saas-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SiStatuspage } from "react-icons/si"
import { IncidentService } from "../../../client"
import type { IncidentRecord } from "../../../client"

interface StatuspageIncidentsProps {
  incident: IncidentRecord
}

function getIncidentStatuspageIncidents(slug: string) {
  return {
    queryFn: () =>
      IncidentService.getIncidentStatuspageApiV1IncidentSlugStatuspageGet({
        slug: slug,
      }),
    queryKey: ["spincidents", slug],
  }
}

function StatuspageIncidents({ incident }: StatuspageIncidentsProps) {
  const queryClient = useQueryClient()

  const { data: spincidents } = useQuery({
    ...getIncidentStatuspageIncidents(incident.slug!),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentStatuspageIncidents(incident.slug!))
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
                <Td>{incident.name}</Td>
                <Td>
                  <Badge>{incident.status}</Badge>
                </Td>
                <Td>
                  <Link href={`${incident.shortlink}`} isExternal>
                    {incident.shortlink}
                  </Link>
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
        <EmptyStateDescription>
          There are no Statuspage incidents associated with this incident.
        </EmptyStateDescription>
      </EmptyStateContainer>
    </Flex>
  )
}

export default StatuspageIncidents
