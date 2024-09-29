import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { Property, PropertyList } from "@saas-ui/react"
import type { Incident } from "../../client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import IncidentActionsMenu from "./IncidentActionsMenu"
import { IncidentsService } from "../../client"
import { LuTimerOff } from "react-icons/lu";
import TimeAgo from "react-timeago";
import { format, parseISO } from "date-fns";
import { toTitleCase } from "../../hooks/titleCase"

interface IncidentInfoPanelProps {
  incident: Incident
}

function getIncidentParticipants(slug: string) {
  return {
    queryFn: () => IncidentsService.readIncidentParticipants({ slug: slug }),
    queryKey: ["participants"],
  }
}

function IncidentInfoPanel({ incident }: IncidentInfoPanelProps) {
  const queryClient = useQueryClient()

  const incCreatedAt = format(parseISO(incident?.created_at.toString()), "dd MMMM, yyyy hh:mm z");
  const incUpdatedAt = format(parseISO(incident?.created_at.toString()), "dd MMMM, yyyy hh:mm z");

  const { data: participants } = useQuery({
    ...getIncidentParticipants(incident.slug),
  })

  useEffect(() => {
    queryClient.prefetchQuery(getIncidentParticipants(incident.slug))
  }, [queryClient])

  return (
    <>
      <Card variant="outline">
        <CardHeader display="flex" flexDirection="row">
          <Heading size="lg">Details</Heading>
          <Spacer />
          <IncidentActionsMenu type="Incident" value={incident} />
        </CardHeader>
        <CardBody>
          <PropertyList>
            <Property label="Description" value={<Text as='kbd'>{incident?.description}</Text>} />
            <Property label="Impact" value={<Text as='kbd'>{incident?.impact}</Text>} />
            <Property
              label="Components"
              value={
                <Badge ml="1" variant="solid" fontSize="0.8em">
                  {incident?.components}
                </Badge>
              }
            />
            <Property
              label="Severity"
              value={
                <Flex gap={2}>
                  <Badge
                    ml="1"
                    variant="solid"
                    fontSize="0.8em"
                    colorScheme={
                      incident?.severity.includes("0")
                        ? "red"
                        : incident?.severity.includes("1")
                          ? "orange"
                          : incident?.severity.includes("2")
                            ? "yellow"
                            : "green"
                    }
                  >
                    {incident?.severity}
                  </Badge>
                </Flex>
              }
            />
            <Property
              label="Status"
              value={
                <Flex gap={2}>
                  <Badge
                    ml="1"
                    variant="solid"
                    fontSize="0.8em"
                    colorScheme={
                      incident?.status.includes("resolved")
                        ? "green"
                        : "yellow"
                    }
                  >
                    {incident?.status}
                  </Badge>
                </Flex>
              }
            />
            <Property
              label="Created"
              value={incident?.created_at ?
                <>
                  <Flex>
                    <Wrap>
                      <WrapItem>
                        <Box>
                          <Badge ml="1" variant="solid" fontSize="0.8em">
                            {incCreatedAt}
                          </Badge>
                        </Box>
                      </WrapItem>
                      <Spacer />
                      <WrapItem>
                        <Box>
                          <Badge ml="1" variant="solid" fontSize="0.8em" colorScheme="yellow">
                            <TimeAgo date={incident?.created_at} />
                          </Badge>
                        </Box>
                      </WrapItem>
                    </Wrap>
                  </Flex>
                </> : <LuTimerOff />
              }
            />
            <Property
              label="Updated"
              value={incident?.updated_at ?
                <>
                  <Flex>
                    <Wrap>
                      <WrapItem>
                        <Box>
                          <Badge ml="1" variant="solid" fontSize="0.8em">
                            {incUpdatedAt}
                          </Badge>
                        </Box>
                      </WrapItem>
                      <Spacer />
                      <WrapItem>
                        <Box>
                          <Badge ml="1" variant="solid" fontSize="0.8em" colorScheme="yellow">
                            <TimeAgo date={incident?.updated_at} />
                          </Badge>
                        </Box>
                      </WrapItem>
                    </Wrap>
                  </Flex>
                </> : <LuTimerOff />
              }
            />
          </PropertyList>
        </CardBody>
      </Card>
      <Card variant="outline" mt={2}>
        <CardHeader display="flex" flexDirection="row">
          <Heading size="lg">People</Heading>
        </CardHeader>
        <CardBody>
          {participants?.length ? participants?.map((person, idx) => (
            <Property key={idx} label={
              toTitleCase(person.role.replace(/_/g, " "))
            }
              value={<Text as='kbd'>{person.user_name}</Text>} />
          )) : <h1>No roles have been claimed yet.</h1>}
        </CardBody>
      </Card>
    </>
  )
}

export default IncidentInfoPanel
