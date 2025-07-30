import {
  Badge,
  Card,
  CardBody,
  Divider,
  HStack,
  Icon,
  Text,
  Tooltip,
  chakra,
} from '@chakra-ui/react'
import {
  Property,
  PropertyLabel,
  PropertyList,
  PropertyValue,
} from '@saas-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect } from 'react'

import type { IncidentRecord } from '../../client'
import { IncidentService } from '../../client'
import { toTitleCase } from '../../hooks/titleCase'

import { FaInfoCircle } from 'react-icons/fa'
import { GiDivingHelmet } from 'react-icons/gi'
import { LuTimerOff } from 'react-icons/lu'

interface IncidentInfoPanelProps {
  incident: IncidentRecord
}

function getIncidentParticipants(slug: string) {
  return {
    queryFn: () =>
      IncidentService.getIncidentParticipantsApiV1IncidentSlugParticipantsGet({
        slug: slug,
      }),
    queryKey: ['participants'],
  }
}

function components(incident: IncidentRecord) {
  return (
    <HStack>
      {incident?.components?.split(',').map((component) => {
        return (
          <Badge key={component} variant="subtle" fontSize="0.8em">
            {component}
          </Badge>
        )
      })}
    </HStack>
  )
}

function IncidentInfoPanel({ incident }: IncidentInfoPanelProps) {
  const queryClient = useQueryClient()

  const { data: participants } = useQuery({
    ...getIncidentParticipants(incident.slug!),
  })

  useEffect(() => {
    queryClient.prefetchQuery(getIncidentParticipants(incident.slug!))
  }, [queryClient, incident.slug])

  const createdDate = new Date(incident.created_at)
  const updatedDate = new Date(incident.updated_at!)

  return (
    <Card variant="unstyled">
      <CardBody>
        <chakra.h2
          fontSize={{
            base: '2xl',
            md: '3xl',
          }}
          lineHeight="shorter"
          mt={1}
        >
          <Icon as={FaInfoCircle} fontSize={20} mr={2} />
          Details
        </chakra.h2>
        <PropertyList>
          <Property
            label="Impact"
            value={
              <Tooltip label={incident?.impact}>
                <Text
                  as="kbd"
                  isTruncated
                  maxWidth={{ base: '200px', md: '200px' }}
                >
                  {incident?.impact}
                </Text>
              </Tooltip>
            }
          />
          <Property label="Components" value={components(incident)} />
          <Property
            label="Created"
            value={
              incident?.created_at ? (
                <>
                  <HStack wrap="wrap" mt={2}>
                    <Badge variant="subtle" fontSize="0.8em">
                      {format(createdDate, 'dd MMMM, yyyy hh:mm zzz')}
                    </Badge>
                  </HStack>
                </>
              ) : (
                <LuTimerOff />
              )
            }
          />
          <Property
            label="Updated"
            value={
              incident?.updated_at ? (
                <>
                  <HStack wrap="wrap" mt={2}>
                    <Badge variant="subtle" fontSize="0.8em">
                      {format(updatedDate, 'dd MMMM, yyyy hh:mm zzz')}
                    </Badge>
                  </HStack>
                </>
              ) : (
                <LuTimerOff />
              )
            }
          />
          <Divider my={4} />
          <chakra.h2
            fontSize={{
              base: '2xl',
              md: '3xl',
            }}
            lineHeight="shorter"
          >
            <Icon as={GiDivingHelmet} fontSize={20} mr={2} />
            People
          </chakra.h2>
          {participants?.length ? (
            participants?.map((person, idx) => (
              <Property key={idx}>
                <PropertyLabel width="200px">
                  {toTitleCase(person.role.replace(/_/g, ' '))}
                </PropertyLabel>
                <PropertyValue>
                  <Text as="kbd">{person.user_name}</Text>
                </PropertyValue>
              </Property>
            ))
          ) : (
            <Text fontSize={14}>No roles have been claimed yet.</Text>
          )}
        </PropertyList>
      </CardBody>
    </Card>
  )
}

export default IncidentInfoPanel
