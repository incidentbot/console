import {
  Box,
  Card,
  CardBody,
  Container,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { IncidentsService, MaintenanceWindowService } from "../../client"
import useAuth from "../../hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { data: incidents } = useQuery({
    queryKey: ["incidents"],
    queryFn: IncidentsService.readAllIncidents,
  })
  const { data: maintenanceWindows } = useQuery({
    queryKey: ["maintenance_windows"],
    queryFn: MaintenanceWindowService.readMaintenanceWindows,
  })
  const { user: currentUser } = useAuth()
  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome!</Text>
        </Box>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <Card variant="elevated" marginTop={4} marginBottom={4}>
            <CardBody>
              <Stat>
                <StatLabel>Incidents</StatLabel>
                <StatNumber>{incidents?.count}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card variant="elevated" marginTop={4} marginBottom={4}>
            <CardBody>
              <Stat>
                <StatLabel>Maintenance Windows</StatLabel>
                <StatNumber>{maintenanceWindows?.count}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  )
}
