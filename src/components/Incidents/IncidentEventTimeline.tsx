import { Box, Card, CardBody, Flex, Spacer, Text } from "@chakra-ui/react"
import {
  IconBadge,
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  TimelineTrack,
} from "@saas-ui/react"
import type { IncidentEvent } from "../../client"
import EventActionsMenu from "./EventActionsMenu";
import IncidentEventTimelineImage from "./IncidentEventTimelineImage";
import TimeAgo from "react-timeago";

import { FaRegClock } from "react-icons/fa";
import { RiPushpinFill } from "react-icons/ri";
import { RiRobot2Line } from "react-icons/ri";

interface IncidentEventTimelineProps {
  data?: Array<IncidentEvent>
}

/*
 * Use index calculation at the end of the TimelineIcon component
 * to avoid rendering the TimelineTrack beyond the last element
 */
function IncidentEventTimeline({ data }: IncidentEventTimelineProps) {
  return (
    <>
      <Flex direction="column">
        <Timeline variant="outline">
          {data?.map((log, index) => (
            <TimelineItem key={index}>
              {log.source === 'system' &&
                <>
                  <TimelineSeparator>
                    {index !== 0 && <TimelineTrack />}
                    <IconBadge
                      size="md"
                      icon={<RiRobot2Line />}
                      colorScheme="cyan"
                      rounded="full"
                    />
                    <TimelineTrack />
                  </TimelineSeparator>
                  <TimelineContent width="100%">
                    <Flex>
                      <Box>
                        <Text fontSize="md">{log.text}</Text>
                      </Box>
                      <Spacer />
                      <Box>
                        <Flex alignItems="center" justifyContent="center">
                          <Box mr={2}>
                            <FaRegClock fontSize={13} />
                          </Box>
                          <Box>
                            <Text fontSize="sm"><TimeAgo date={log.created_at + ' UTC'} /></Text>
                          </Box>
                          <Box>
                            <EventActionsMenu type="IncidentEvent" slug={log.incident_slug} id={log.id} value={log} />
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  </TimelineContent>
                </>
              }
              {log.source === 'pin' && log.text !== null &&
                <>
                  <TimelineSeparator>
                    {index !== 0 && <TimelineTrack />}
                    <IconBadge
                      size="md"
                      icon={<RiPushpinFill />}
                      colorScheme="red"
                      rounded="full"
                    />
                    {data?.length !== index + 1 && <TimelineTrack />}
                  </TimelineSeparator>
                  <TimelineContent width="100%">
                    <Flex mt={4}>
                      <Box>
                        <Text fontSize="md">A message sent to the channel by {log?.user} was pinned to the timeline</Text>
                      </Box>
                      <Spacer />
                      <Box>
                        <Flex alignItems="center" justifyContent="center">
                          <Box mr={2}>
                            <FaRegClock fontSize={13} />
                          </Box>
                          <Box>
                            <Text fontSize="sm"><TimeAgo date={log.created_at + ' UTC'} /></Text>
                          </Box>
                          <Box>
                            <EventActionsMenu type="IncidentEvent" slug={log.incident_slug} id={log.id} value={log} />
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                    <Box>
                      <Card size="sm">
                        <CardBody>
                          <Text fontSize="md" style={{ overflowWrap: "break-word" }}>{log.text}</Text>
                        </CardBody>
                      </Card>
                    </Box>
                  </TimelineContent>
                </>
              }
              {log.source === 'user' && log.text !== null && log.timestamp !== null &&
                <>
                  <TimelineSeparator>
                    {index !== 0 && <TimelineTrack />}
                    <IconBadge
                      size="md"
                      icon={<RiPushpinFill />}
                      colorScheme="red"
                      rounded="full"
                    />
                    {data?.length !== index + 1 && <TimelineTrack />}
                  </TimelineSeparator>
                  <TimelineContent width="100%">
                    <Flex mt={4}>
                      <Box>
                        <Text fontSize="md">{log?.user} added a message to the timeline manually</Text>
                      </Box>
                      <Spacer />
                      <Box>
                        <Flex alignItems="center" justifyContent="center">
                          <Box mr={2}>
                            <FaRegClock fontSize={13} />
                          </Box>
                          <Box>
                            <Text fontSize="sm"><TimeAgo date={log.timestamp + ' UTC'} /></Text>
                          </Box>
                        </Flex>
                      </Box>
                      <Box>
                        <EventActionsMenu type="IncidentEvent" slug={log.incident_slug} id={log.id} value={log} />
                      </Box>
                    </Flex>
                    <Box>
                      <Card size="sm">
                        <CardBody>
                          <Text fontSize="md" style={{ overflowWrap: "break-word" }}>{log.text}</Text>
                        </CardBody>
                      </Card>
                    </Box>
                  </TimelineContent>
                </>
              }
              {log.source === 'pin' && log.image !== null && log.mimetype != null &&
                <>
                  <TimelineSeparator>
                    {index !== 0 && <TimelineTrack />}
                    <IconBadge
                      size="md"
                      icon={<RiPushpinFill />}
                      colorScheme="red"
                      rounded="full"
                    />
                    {data?.length !== index + 1 && <TimelineTrack />}
                  </TimelineSeparator>
                  <TimelineContent width="100%">
                    <IncidentEventTimelineImage log={log} />
                  </TimelineContent>
                </>
              }
            </TimelineItem>
          ))}
        </Timeline>
      </Flex>
    </>
  )
}

export default IncidentEventTimeline
