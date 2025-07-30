import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  Spacer,
  Spinner,
  Tag,
  Text,
} from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import type { IncidentRecord, Incidents } from '../../client'

import { MdOutlineOpenInNew } from 'react-icons/md'

interface IncidentOverviewProps {
  incidents: Incidents
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

function incidentsDisplayColumn(incidents: Array<IncidentRecord>) {
  const navigateToIndividual = useNavigate()
  const handleRowClick = (incidentSlug: string) => {
    navigateToIndividual({ to: `/incidents/${incidentSlug}` })
  }

  return (
    <>
      {incidents.length ? (
        incidents?.map((incident, idx) => {
          return (
            <Card
              key={idx}
              my={1}
              minHeight="160px"
              minWidth="260px"
              onClick={() => handleRowClick(incident.slug!)}
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.05)',
                transition: '.25s ease-in-out',
              }}
            >
              <CardHeader
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <>
                  <Flex direction="row" alignItems="center">
                    <Heading as="h4" fontWeight="bold" size="md">
                      {incident.slug?.toUpperCase()}
                    </Heading>
                    <Spacer />
                    <MdOutlineOpenInNew />
                  </Flex>
                  <Flex direction="row">
                    <Tag
                      variant="subtle"
                      size="md"
                      mr={1}
                      colorScheme={
                        incident?.status?.includes('resolved')
                          ? 'green'
                          : 'yellow'
                      }
                    >
                      {incident?.status?.toUpperCase()}
                    </Tag>
                    <Tag
                      variant="solid"
                      size="md"
                      mr={1}
                      colorScheme={
                        incident?.severity?.includes('0') ||
                        incident?.severity?.includes('1')
                          ? 'red'
                          : incident?.severity?.includes('2')
                            ? 'orange'
                            : incident?.severity?.includes('3')
                              ? 'yellow'
                              : 'green'
                      }
                    >
                      {incident?.severity?.toUpperCase()}
                    </Tag>
                  </Flex>
                </>
              </CardHeader>
              <CardBody>
                <Text>{incident.description}</Text>
                {components(incident)}
              </CardBody>
            </Card>
          )
        })
      ) : (
        <>
          <Card my={1} minHeight="160px" minWidth="260px">
            <CardBody>
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Text fontWeight="bold" fontSize="4em">
                  🎉
                </Text>
                <Text fontSize="2xl">No incidents.</Text>
              </Flex>
            </CardBody>
          </Card>
        </>
      )}
    </>
  )
}

// Some of the statuses here are hardcoded.
// This is bad, but you should change this if you change the standard statuses.
export default function IncidentOverview({ incidents }: IncidentOverviewProps) {
  return incidents === undefined ? (
    <Flex alignItems="center" justifyContent="center">
      <Spinner />
    </Flex>
  ) : (
    <Flex direction={{ base: 'column', md: 'row' }} mt={4}>
      <Flex direction="column" mx={4}>
        <Heading as="h4" fontWeight="medium" size="md" mb={2}>
          Critical
        </Heading>
        <Divider my={2} />
        {incidentsDisplayColumn(
          incidents.data.filter((incident) => incident.severity === 'sev1'),
        )}
      </Flex>
      <Divider orientation="vertical" display={{ base: 'none', md: 'flex' }} />
      <Divider
        orientation="horizontal"
        my={4}
        display={{ base: 'flex', md: 'none' }}
      />
      <Flex direction="column" mx={4}>
        <Heading as="h4" fontWeight="medium" size="md" mb={2}>
          Awaiting Triage
        </Heading>
        <Divider my={2} />
        {incidentsDisplayColumn(
          incidents.data.filter(
            (incident) => incident.status === 'investigating',
          ),
        )}
      </Flex>
      <Divider orientation="vertical" display={{ base: 'none', md: 'flex' }} />
      <Divider
        orientation="horizontal"
        my={4}
        display={{ base: 'flex', md: 'none' }}
      />
      <Flex direction="column" mx={4}>
        <Heading as="h4" fontWeight="medium" size="md" mb={2}>
          Identified
        </Heading>
        <Divider my={2} />
        {incidentsDisplayColumn(
          incidents.data.filter((incident) => incident.status === 'identified'),
        )}
      </Flex>
      <Divider orientation="vertical" display={{ base: 'none', md: 'flex' }} />
      <Divider
        orientation="horizontal"
        my={4}
        display={{ base: 'flex', md: 'none' }}
      />
      <Flex direction="column" mx={4}>
        <Heading as="h4" fontWeight="medium" size="md" mb={2}>
          Monitoring
        </Heading>
        <Divider my={2} />
        {incidentsDisplayColumn(
          incidents.data.filter((incident) => incident.status === 'monitoring'),
        )}
      </Flex>
    </Flex>
  )
}
