import { Box, Flex } from "@chakra-ui/react"
import type { Incident } from "../../client"

import JiraIssues from "./Artifacts/JiraIssues"
import Postmortems from "./Artifacts/Postmortems"
import StatuspageIncidents from "./Artifacts/StatuspageIncidents"

interface IncidentArtifactsProps {
  data: Incident
}

function IncidentArtifacts({ data }: IncidentArtifactsProps) {
  return (
    <>
      <Flex direction="column">
        <Box mt={4} mb={4}>
          <JiraIssues incident={data} />
        </Box>
        <Box mt={4} mb={4}>
          <Postmortems incident={data} />
        </Box>
        <Box mt={4} mb={4}>
          <StatuspageIncidents incident={data} />
        </Box>
      </Flex>
    </>
  )
}

export default IncidentArtifacts
