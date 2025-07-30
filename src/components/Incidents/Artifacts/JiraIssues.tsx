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
} from '@chakra-ui/react'
import {
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@saas-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SiJira } from 'react-icons/si'
import { IncidentService } from '../../../client'
import type { IncidentRecord } from '../../../client'

interface JiraIssuesProps {
  incident: IncidentRecord
}

function getIncidentJiraIssues(slug: string) {
  return {
    queryFn: () =>
      IncidentService.getIncidentJiraIssuesApiV1IncidentSlugJiraGet({
        slug: slug,
      }),
    queryKey: ['issues', slug],
  }
}

function JiraIssues({ incident }: JiraIssuesProps) {
  const queryClient = useQueryClient()

  const { data: issues } = useQuery({
    ...getIncidentJiraIssues(incident.slug!),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentJiraIssues(incident.slug!))
  }, [queryClient, incident])

  return issues?.length ? (
    <>
      <TableContainer>
        <Heading size="md">Jira Issues</Heading>
        <Table size={{ base: 'sm', md: 'md' }}>
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Status</Th>
              <Th>Team</Th>
              <Th>URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {issues?.map((issue) => (
              <Tr key={issue.key}>
                <Td>
                  <Badge>{issue.key}</Badge>
                </Td>
                <Td>
                  <Badge>{issue.status}</Badge>
                </Td>
                <Td>{issue.team}</Td>
                <Td>
                  <Link href={`${issue.url}`} isExternal>
                    {issue.url}
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
        <EmptyStateIcon as={SiJira} />
        <EmptyStateTitle>No Jira issues</EmptyStateTitle>
        <EmptyStateDescription>
          There are no Jira issues associated with this incident.
        </EmptyStateDescription>
      </EmptyStateContainer>
    </Flex>
  )
}

export default JiraIssues
