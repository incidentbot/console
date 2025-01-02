import {
  Badge,
  Card,
  Container,
  Divider,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react"
import {
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from "@saas-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { z } from "zod"
import { IncidentService } from "../../../client"

import TimeAgo from "react-timeago"
import NavBar from "../../../components/Common/Navbar"
import Empty from "../../../components/Common/PaginatedList/Empty"
import PaginationFooter from "../../../components/Common/PaginatedList/PaginationFooter"
import StyledHeader from "../../../components/Common/StyledHeader"

import { BsFire } from "react-icons/bs"

const IncidentsPerPage = 10

const incidentsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/incidents/")({
  component: Incidents,
  validateSearch: (search) => incidentsSearchSchema.parse(search),
})

function getIncidentsQueryOptions({
  page,
  searchTermDebounced,
}: {
  page: number
  searchTermDebounced: string
}) {
  return {
    queryFn: () =>
      IncidentService.getIncidentsApiV1IncidentGet({
        skip: (page - 1) * IncidentsPerPage,
        limit: IncidentsPerPage,
        filter: searchTermDebounced,
      }),
    queryKey: ["incidents", { page, searchTermDebounced }],
  }
}

function formatDate(timestamp: string) {
  return new Date(timestamp)
}
function IncidentsTable() {
  // Search
  const [searchTerm, setSearchTerm] = useState("")
  const [searchTermDebounced] = useDebounce(searchTerm, 500)

  // react-query
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })
  const { data: incidents, isPending } = useQuery({
    ...getIncidentsQueryOptions({ page, searchTermDebounced }),
    placeholderData: (prevData) => prevData,
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["incident"] })
  }, [queryClient])

  const navigateToIndividual = useNavigate()

  const handleRowClick = (incidentSlug: string) => {
    navigateToIndividual({ to: `/incidents/${incidentSlug}` })
  }

  return (
    <>
      {isPending && <Spinner />}
      <Container maxWidth="6xl">
        <NavBar
          enableSearch={true}
          setSearchTerm={setSearchTerm}
          marginTop={0}
        />
        <Card
          width="100%"
          variant="elevated"
          minHeight={{ base: "lg", md: "4xl" }}
        >
          <StructuredList>
            {incidents?.data.length ? (
              incidents?.data.map((incident, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <StructuredListItem
                      key={idx}
                      onClick={() => handleRowClick(incident.slug!)}
                      _hover={{
                        transform: "scale(1.009)",
                        transition: ".25s ease-in-out",
                      }}
                    >
                      <StructuredListCell>
                        <Text fontWeight="bold" fontSize="1.2em">
                          {incident.slug!.toUpperCase()}
                        </Text>
                        <Text fontSize="sm" color="muted">
                          {incident.description
                            ? incident.description
                            : "No description provided."}
                        </Text>
                        <HStack wrap="wrap" mt={2}>
                          <Badge
                            px="1"
                            variant="solid"
                            colorScheme={
                              incident.status?.includes("resolved")
                                ? "green"
                                : "yellow"
                            }
                          >
                            {incident.status}
                          </Badge>
                          <Badge
                            px="1"
                            variant="solid"
                            colorScheme={
                              incident?.severity?.includes("0") ||
                              incident?.severity?.includes("1")
                                ? "red"
                                : incident?.severity?.includes("2")
                                  ? "orange"
                                  : incident?.severity?.includes("3")
                                    ? "yellow"
                                    : "green"
                            }
                          >
                            {incident?.severity?.toUpperCase()}
                          </Badge>
                          <Badge px="1" variant="outline">
                            {format(
                              formatDate(incident.created_at),
                              "dd MMMM yyyy",
                            )}{" "}
                            (
                            <TimeAgo date={incident.created_at} />)
                          </Badge>
                        </HStack>
                      </StructuredListCell>
                    </StructuredListItem>
                    <Divider />
                  </React.Fragment>
                )
              })
            ) : (
              <Empty icon={BsFire} resourcePlural="incidents" />
            )}
          </StructuredList>
        </Card>
        <PaginationFooter
          resources={incidents!}
          perPage={IncidentsPerPage}
          setPage={setPage}
        />
      </Container>
    </>
  )
}

function Incidents() {
  return (
    <Container maxW="full">
      <StyledHeader title="Incidents" icon={BsFire} />
      <IncidentsTable />
    </Container>
  )
}
