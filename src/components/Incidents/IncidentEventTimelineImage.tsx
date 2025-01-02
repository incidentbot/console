import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Spacer,
  Tag,
  Text,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { Controlled as ControlledZoom } from "react-medium-image-zoom"
import TimeAgo from "react-timeago"
import { IncidentService } from "../../client"
import type { IncidentEvent, IncidentEventBase } from "../../client"
import { convertSlackTimestamp } from "../../hooks/convertSlackTimestamp"
import EventActionsMenu from "./EventActionsMenu"
import "./timeline-image.css"

import { formatTimestamp } from "../../hooks/formatTimestamp"

interface IncidentEventTimelineImageProps {
  log: IncidentEvent | IncidentEventBase
}

function getIncidentEventImage(slug: string, id: string) {
  return {
    queryFn: () =>
      IncidentService.getIncidentEventImageApiV1IncidentSlugEventsImageIdGet({
        slug: slug,
        id: id,
      }),
    queryKey: ["imageData", id],
  }
}

function IncidentEventTimelineImage({ log }: IncidentEventTimelineImageProps) {
  const queryClient = useQueryClient()
  const [isZoomed, setIsZoomed] = useState<boolean>(false)

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom)
  }, [])

  const { data: imageData } = useQuery({
    ...getIncidentEventImage(log?.incident_slug!, log?.id!),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentEventImage(log?.incident_slug!, log?.id!))
  }, [queryClient, log?.incident_slug, log?.id])

  if (imageData !== undefined) {
    return (
      <>
        <Flex mt={8}>
          <Box>
            <Text fontSize="md">
              An image sent to the channel by {log?.user} was pinned to the
              timeline
            </Text>
            <HStack>
              <Tag size="sm">
                <Text fontSize="sm">
                  <TimeAgo date={convertSlackTimestamp(log.message_ts!)} />
                </Text>
              </Tag>
              <Tag size="sm">
                <Text fontSize="sm">
                  {String(
                    formatTimestamp(log.message_ts!, true).toLocaleString(),
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
            hasImage
          />
        </Flex>
        <Box>
          <Card size="sm" mt={2}>
            <CardBody>
              <Box maxWidth="200px">
                <ControlledZoom
                  isZoomed={isZoomed}
                  onZoomChange={handleZoomChange}
                >
                  <img
                    alt="timeline"
                    src={`data:${log?.mimetype};base64,${imageData}`}
                  />
                </ControlledZoom>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </>
    )
  }
}

export default IncidentEventTimelineImage
