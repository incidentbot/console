import { useEffect } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Flex,
  Heading,
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
import { SiOpsgenie } from "react-icons/si"

interface OpsgenieIncidentsProps {
  incident: Incident
}

function getIncidentOpsgenieIncidents(slug: string) {
  return {
    queryFn: () => IncidentsService.readIncidentOpsgenieIncidents({ slug: slug }),
    queryKey: ["opsgenieincidents", slug],
  }
}

function OpsgenieIncidents({ incident }: OpsgenieIncidentsProps) {
  const queryClient = useQueryClient()

  const { data: opsgenieincidents } = useQuery({
    ...getIncidentOpsgenieIncidents(incident.slug),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentOpsgenieIncidents(incident.slug))
  }, [queryClient, incident])

  return opsgenieincidents?.length ? (
    <>
      <TableContainer>
        <Heading size="md">Opsgenie Incidents</Heading>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Status</Th>
              <Th>Team</Th>
              <Th>URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {opsgenieincidents?.map((incident) => (
              <Tr key={incident.id}>
                <Td>{incident.id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Flex mt={8}>
      <EmptyStateContainer colorScheme="blue">
        <EmptyStateIcon as={SiOpsgenie} />
        <EmptyStateTitle>No Opsgenie incidents</EmptyStateTitle>
        <EmptyStateDescription>There are no Opsgenie incidents associated with this incident.</EmptyStateDescription>
      </EmptyStateContainer>
    </Flex>
  )
}

export default OpsgenieIncidents
