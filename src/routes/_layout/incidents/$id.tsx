import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Divider,
  Flex,
  Spacer,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, createFileRoute } from "@tanstack/react-router"
import { useEffect } from "react"
import { IncidentService } from "../../../client"

import StyledHeader from "../../../components/Common/StyledHeader"
import IncidentActionsMenu from "../../../components/Incidents/IncidentActionsMenu"
import IncidentArtifacts from "../../../components/Incidents/IncidentArtifacts"
import IncidentEventTimeline from "../../../components/Incidents/IncidentEventTimeline"
import IncidentInfoPanel from "../../../components/Incidents/IncidentInfoPanel"

import { BsFire } from "react-icons/bs"
import { FaSlack } from "react-icons/fa"

export const Route = createFileRoute("/_layout/incidents/$id")({
  component: Incident,
})

function getIncident(slug: string) {
  return {
    queryFn: () =>
      IncidentService.getIncidentApiV1IncidentSlugGet({ slug: slug }),
    queryKey: ["incident", { slug }],
  }
}

function getIncidentEvents(slug: string) {
  return {
    queryFn: () =>
      IncidentService.getIncidentEventsApiV1IncidentSlugEventsGet({
        slug: slug,
      }),
    queryKey: ["events", { slug }],
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

  return (
    <Container maxW="full" minW="360px">
      {incident === undefined ? (
        <>
          <Container
            h="100vh"
            alignItems="stretch"
            justifyContent="center"
            textAlign="center"
            maxW="sm"
            centerContent
          >
            <Text
              fontSize="8xl"
              color="ui.main"
              fontWeight="bold"
              lineHeight="1"
              mb={4}
            >
              404
            </Text>
            <Text fontSize="md">Oops!</Text>
            <Text fontSize="md">That incident was not found.</Text>
            <Button
              as={Link}
              to="/incidents"
              color="ui.main"
              borderColor="ui.main"
              variant="outline"
              mt={4}
            >
              Go back
            </Button>
          </Container>
        </>
      ) : (
        <Flex direction="column" pb={24} height="100vh">
          <StyledHeader
            title={`${incident?.slug!.toUpperCase()}`}
            subtitle={incident?.description!}
            icon={BsFire}
          />
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Tag
              variant="solid"
              size="lg"
              mr={1}
              colorScheme={
                incident?.severity?.includes("0") ||
                incident?.severity?.includes("1")
                  ? "red"
                  : incident?.severity?.includes("2")
                    ? "orange"
                    : incident?.severity?.includes("3")
                      ? "yellow"
                      : "green"
              }
            >
              {incident?.severity?.toUpperCase()}
            </Tag>
            <Tag
              variant="outline"
              size="lg"
              mr={1}
              colorScheme={
                incident?.status?.includes("resolved") ? "green" : "yellow"
              }
            >
              {incident?.status?.toUpperCase()}
            </Tag>
            <ChakraLink href={`${incident.link}`} isExternal>
              <Button
                leftIcon={<FaSlack />}
                size="sm"
                colorScheme="green"
                variant="outline"
              >
                Join
              </Button>
            </ChakraLink>
            <Spacer />
            <IncidentActionsMenu type="Incident" value={incident} />
          </Flex>
          <Divider my={2} />
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <Box minWidth="350px">
              <IncidentInfoPanel incident={incident} />
            </Box>
            <Divider
              orientation="vertical"
              ml={4}
              display={{ base: "none", md: "flex" }}
            />
            <Divider
              orientation="horizontal"
              my={2}
              display={{ base: "flex", md: "none" }}
            />
            <Box w="100%" ml={4} height="100%">
              <Tabs position="relative" variant="unstyled">
                <TabList>
                  <Tab>Timeline</Tab>
                  <Tab>Artifacts</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    <IncidentEventTimeline data={events} />
                  </TabPanel>
                  <TabPanel>
                    <IncidentArtifacts data={incident} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Flex>
      )}
    </Container>
  )
}
