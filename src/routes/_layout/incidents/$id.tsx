import {
  Box,
  Container,
  Heading,
  Tab,
  Tabs,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels
} from "@chakra-ui/react"
import { LoadingOverlay, LoadingSpinner } from "@saas-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect } from "react"
import { IncidentsService } from "../../../client"

import IncidentArtifacts from "../../../components/Incidents/IncidentArtifacts"
import IncidentEventTimeline from "../../../components/Incidents/IncidentEventTimeline"
import IncidentInfoPanel from "../../../components/Incidents/IncidentInfoPanel"

export const Route = createFileRoute("/_layout/incidents/$id")({
  component: Incident,
})

function getIncident(slug: string) {
  return {
    queryFn: () => IncidentsService.readIncident({ slug: slug }),
    queryKey: ["incident"],
  }
}

function getIncidentEvents(slug: string) {
  return {
    queryFn: () => IncidentsService.readIncidentEvents({ slug: slug }),
    queryKey: ["events"],
  }
}

function Incident() {
  const { id } = Route.useParams()
  const queryClient = useQueryClient()

  const { data: incident } = useQuery({
    ...getIncident(id),
  })

  const { data: events } = useQuery({
    ...getIncidentEvents(id),
  })

  useEffect(() => {
    queryClient.prefetchQuery(getIncident(id))
  }, [queryClient, id])

  return incident === undefined ? (
    <>
      <LoadingOverlay variant="overlay">
        <LoadingSpinner />
      </LoadingOverlay>
    </>
  ) : (
    <>
      <Container maxW="7xl">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
          {incident?.slug.toUpperCase()}: {incident?.description}
        </Heading>
        <Box mt={8}>
          <IncidentInfoPanel incident={incident} />
        </Box>
        <Tabs position='relative' variant='unstyled' mt={6}>
          <TabList>
            <Tab>Timeline</Tab>
            <Tab>Artifacts</Tab>
          </TabList>
          <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
          <TabPanels>
            <TabPanel>
              <IncidentEventTimeline data={events} />
            </TabPanel>
            <TabPanel>
              <IncidentArtifacts data={incident} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}
