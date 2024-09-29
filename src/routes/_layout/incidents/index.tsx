import {
  Button,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { EmptyStateContainer, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@saas-ui/react"
import { useEffect } from "react"
import { IncidentsService } from "../../../client"
import { BsFire } from "react-icons/bs"
import { z } from "zod"
import IncidentListItem from "../../../components/Incidents/IncidentListItem"

const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/incidents/")({
  component: Incidents,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

const PER_PAGE = 10

function getIncidentsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      IncidentsService.readIncidents({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["incidents", { page }],
  }
}

function IncidentsTable() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: incidents,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getIncidentsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && incidents?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getIncidentsQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  return (
    incidents?.count !== 0 ?
      <>
        <TableContainer>
          <Table size={{ base: "sm", md: "sm" }}>
            <Thead>
            </Thead>
            {isPending ? (
              <Tbody>
                <Tr>
                  {new Array(4).fill(null).map((_, index) => (
                    <Td key={index}>
                      <SkeletonText noOfLines={1} paddingBlock="16px" />
                    </Td>
                  ))}
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {incidents?.data.map((incident) => (
                  <Tr key={incident.id}>
                    <Td>
                      <IncidentListItem incident={incident} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        <Flex
          gap={4}
          alignItems="center"
          mt={4}
          direction="row"
          justifyContent="flex-end"
        >
          <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
            Previous
          </Button>
          <span>Page {page}</span>
          <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </Flex>
      </>
      : <Flex mt={20}>
        <EmptyStateContainer colorScheme="red">
          <EmptyStateIcon as={BsFire} />
          <EmptyStateTitle>No incidents</EmptyStateTitle>
          <EmptyStateDescription>There are currently no reported incidents.</EmptyStateDescription>
        </EmptyStateContainer>
      </Flex>
  )
}

function Incidents() {
  return (
    <Container maxW="full">
      <Heading
        size="lg"
        textAlign={{ base: "center", md: "left" }}
        pt={12}
        mb={4}
      >
        Incidents
      </Heading>
      <IncidentsTable />
    </Container>
  )
}
