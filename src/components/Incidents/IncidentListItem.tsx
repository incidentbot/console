import { ChevronRightIcon } from "@chakra-ui/icons"
import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import { BsFire } from "react-icons/bs"
import type { Incident } from "../../client"
import TimeAgo from "react-timeago";
import { format } from "date-fns";

interface IncidentListItemProps {
  incident: Incident
}

function IncidentListItem({ incident }: IncidentListItemProps) {
  const createdDate = new Date(incident.created_at)

  return (
    <LinkBox key={incident.id}>
      <LinkOverlay href={`/incidents/${incident.slug}`}>
        <Box
          maxW="7xl"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mb={1}
        >
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={2}
          >
            <GridItem colSpan={3}>
              <Box p={2}>
                <Box display="flex" alignItems="baseline">
                  <BsFire size={18} style={{ fill: "orangered" }} />
                  <Box
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="lg"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {incident.slug}
                    <Box as="span" fontSize="sm" ml={4}>
                      {incident.description}
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="baseline" mt={4}>
                  <Badge
                    px="2"
                    variant="solid"
                    colorScheme={
                      incident.status.includes("resolved") ? "green" : "yellow"
                    }
                  >
                    {incident.status}
                  </Badge>
                  <Badge
                    px="2"
                    variant="solid"
                    ml={2}
                    colorScheme={
                      incident.severity.includes("0")
                        ? "red"
                        : incident.severity.includes("1")
                          ? "orange"
                          : incident.severity.includes("2")
                            ? "yellow"
                            : "green"
                    }
                  >
                    {incident.severity}
                  </Badge>
                  <Badge px="2" variant="outline" ml={2}>
                    {format(createdDate, "dd MMMM yyyy")} (<TimeAgo date={incident.created_at} />)
                  </Badge>
                </Box>
              </Box>
            </GridItem>
            <Flex justify="right" align="center">
              <ChevronRightIcon boxSize={50} />
            </Flex>
          </Grid>
        </Box>
      </LinkOverlay>
    </LinkBox>
  )
}

export default IncidentListItem
