import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Box, Card, CardBody, Flex, Spacer, Text } from "@chakra-ui/react"
import { IncidentsService } from "../../client";
import type { IncidentEvent } from '../../client';
import EventActionsMenu from './EventActionsMenu';
import TimeAgo from "react-timeago";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import './timeline-image.css'
import { FaRegClock } from "react-icons/fa";

interface IncidentEventTimelineImageProps {
  log: IncidentEvent
}

function getIncidentEventImage(slug: string, id: string) {
  return {
    queryFn: () => IncidentsService.readIncidentEventImage({ slug: slug, id: id }),
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
    ...getIncidentEventImage(log?.incident_slug, log?.id),
  })

  useEffect(() => {
    queryClient.fetchQuery(getIncidentEventImage(log?.incident_slug, log?.id))
  }, [queryClient, log?.incident_slug, log?.id])

  if (imageData !== undefined) {
    return (
      <>
        <Flex mt={4}>
          <Box>
            <Text fontSize="md">An image sent to the channel by {log?.user} was pinned to the timeline</Text>
          </Box>
          <Spacer />
          <Box>
            <Flex alignItems="center" justifyContent="center">
              <Box mr={2}>
                <FaRegClock fontSize={13} />
              </Box>
              <Box>
                <Text fontSize="sm"><TimeAgo date={log.created_at} /></Text>
              </Box>
              <Box>
                <EventActionsMenu type="IncidentEvent" slug={log.incident_slug} id={log.id} value={log} hasImage />
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Box>
          <Card size="sm">
            <CardBody>
              <Box maxWidth="200px">
                <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                  <img src={`data:${log?.mimetype};base64,${imageData}`} />
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
