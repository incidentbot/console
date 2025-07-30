import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Spacer,
  Tag,
  Text,
  Textarea,
} from '@chakra-ui/react'
import {
  IconBadge,
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  TimelineTrack,
} from '@saas-ui/react'
import TimeAgo from 'react-timeago'
import type { IncidentEvent, IncidentEventBase } from '../../client'
import { convertSlackTimestamp } from '../../hooks/convertSlackTimestamp'
import { formatTimestamp } from '../../hooks/formatTimestamp'
import EventActionsMenu from './EventActionsMenu'
import IncidentEventTimelineImage from './IncidentEventTimelineImage'

import { RiPushpinFill } from 'react-icons/ri'
import { RiRobot2Line } from 'react-icons/ri'

interface IncidentEventTimelineProps {
  data?: Array<IncidentEvent | IncidentEventBase>
}

/*
 * Use index calculation at the end of the TimelineIcon component
 * to avoid rendering the TimelineTrack beyond the last element
 */
function IncidentEventTimeline({ data }: IncidentEventTimelineProps) {
  return (
    <Flex direction="column" height="1200px" overflow="auto">
      <Timeline variant="outline">
        {data?.map((log, index) => (
          <TimelineItem key={index}>
            {log?.source === 'system' && (
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
                  <Flex mt={8}>
                    <Box>
                      <Text fontSize="md">{log.text}</Text>
                      <HStack>
                        <Tag size="sm">
                          <Text fontSize="sm">
                            <TimeAgo date={log.created_at!} />
                          </Text>
                        </Tag>
                        <Tag size="sm">
                          <Text fontSize="sm">
                            {String(
                              formatTimestamp(log.created_at!).toLocaleString(),
                            )}
                          </Text>
                        </Tag>
                      </HStack>
                    </Box>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <EventActionsMenu
                        type="IncidentEvent"
                        slug={log?.incident_slug!}
                        id={log.id!}
                        value={log}
                      />
                    </Flex>
                  </Flex>
                </TimelineContent>
              </>
            )}
            {log?.source === 'pin' && log?.text !== null && (
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
                  <Flex mt={8}>
                    <Box>
                      <Text fontSize="md">
                        A message sent to the channel by {log?.user} was pinned
                        to the timeline
                      </Text>
                      <HStack>
                        <Tag size="sm">
                          <Text fontSize="sm">
                            <TimeAgo
                              date={convertSlackTimestamp(log.message_ts!)}
                            />
                          </Text>
                        </Tag>
                        <Tag size="sm">
                          <Text fontSize="sm">
                            {String(
                              formatTimestamp(
                                log.message_ts!,
                                true,
                              ).toLocaleString(),
                            )}
                          </Text>
                        </Tag>
                      </HStack>
                    </Box>
                    <Spacer />
                    <EventActionsMenu
                      type="IncidentEvent"
                      slug={log.incident_slug!}
                      id={log.id!}
                      value={log}
                    />
                  </Flex>
                  <Card size="sm" mt={2}>
                    <CardBody>
                      <Text
                        fontSize="md"
                        style={{ overflowWrap: 'break-word' }}
                      >
                        {log.text}
                      </Text>
                    </CardBody>
                  </Card>
                </TimelineContent>
              </>
            )}
            {log?.source === 'user' &&
              log?.text !== null &&
              log?.timestamp !== null && (
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
                    <Flex mt={8}>
                      <Box>
                        <Text fontSize="md">
                          A message was added to the timeline manually by{' '}
                          {log?.user}
                        </Text>
                        <HStack>
                          <Tag size="sm">
                            <Text fontSize="sm">
                              <TimeAgo
                                date={convertSlackTimestamp(log.message_ts!)}
                              />
                            </Text>
                          </Tag>
                          <Tag size="sm">
                            <Text fontSize="sm">
                              {String(
                                formatTimestamp(
                                  log.message_ts!,
                                  true,
                                ).toLocaleString(),
                              )}
                            </Text>
                          </Tag>
                        </HStack>
                      </Box>
                      <Spacer />
                      <EventActionsMenu
                        type="IncidentEvent"
                        slug={log.incident_slug!}
                        id={log.id!}
                        value={log}
                      />
                    </Flex>
                    <Textarea size="sm" value={log.text} readOnly mt={2} />
                  </TimelineContent>
                </>
              )}
            {log?.source === 'pin' && log.mimetype != null && (
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
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </Flex>
  )
}

export default IncidentEventTimeline
