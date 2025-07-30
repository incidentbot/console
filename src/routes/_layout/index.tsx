import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { IncidentService } from '../../client'
import StyledHeader from '../../components/Common/StyledHeader'
import IncidentOverview from '../../components/Dashboard/IncidentOverview'

export const Route = createFileRoute('/_layout/')({
  component: Dashboard,
})

function getIncidentsQueryOptions() {
  return {
    queryFn: () => IncidentService.getIncidentsApiV1IncidentGet(),
    queryKey: ['incidents'],
  }
}

function DashboardDisplay() {
  // react-query
  const { data: incidents, isPending } = useQuery({
    ...getIncidentsQueryOptions(),
    placeholderData: (prevData) => prevData,
  })

  return (
    <Flex overflow="auto" minHeight="600px" justifyContent="center">
      {isPending ? <Spinner /> : <IncidentOverview incidents={incidents!} />}
    </Flex>
  )
}

function Dashboard() {
  return (
    <Container maxW="full">
      <StyledHeader title="Dashboard" />
      <DashboardDisplay />
    </Container>
  )
}
