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
import { SiPagerduty } from "react-icons/si"

interface PagerDutyIncidentsProps {
  incident: Incident
}

function getIncidentPagerDutyIncidents(slug: string) {
  return {
    queryFn: () => IncidentsService.readIncidentPagerDutyIncidents({ slug: slug }),
    queryKey: ["pdincidents", slug],
  }
}

function PagerDutyIncidents({ incident }: PagerDutyIncidentsProps) {
  const queryClient = useQueryClient()

  const { data: pdincidents } = useQuery({
    ...getIncidentPagerDutyIncidents(incident.slug),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentPagerDutyIncidents(incident.slug))
  }, [queryClient, incident])

  return pdincidents?.length ? (
    <>
      <TableContainer>
        <Heading size="md">PagerDuty Incidents</Heading>
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
            {pdincidents?.map((incident) => (
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
      <EmptyStateContainer colorScheme="green">
        <EmptyStateIcon as={SiPagerduty} />
        <EmptyStateTitle>No PagerDuty incidents</EmptyStateTitle>
        <EmptyStateDescription>There are no PagerDuty incidents associated with this incident.</EmptyStateDescription>
      </EmptyStateContainer>
    </Flex>
  )
}

export default PagerDutyIncidents
