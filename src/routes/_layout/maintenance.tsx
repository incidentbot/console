import {
  Badge,
  Button,
  Container,
  Flex,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react"
import {
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@saas-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { LuConstruction } from "react-icons/lu"
import TimeAgo from "react-timeago"
import { z } from "zod"
import { MaintenanceWindowService } from "../../client"
import StyledHeader from "../../components/Common/StyledHeader"
import MaintenanceWindowActionMenu from "../../components/MaintenanceWindows/MaintenanceWindowActionsMenu"

const maintenanceWindowsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/maintenance")({
  component: Maintenance,
  validateSearch: (search) => maintenanceWindowsSearchSchema.parse(search),
})

const PER_PAGE = 5

function getMaintenanceWindowsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      MaintenanceWindowService.getMaintenanceWindowsApiV1MaintenanceWindowGet(),
    queryKey: ["maintenance_windows", { page }],
  }
}

function MaintenanceDisplay() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: maintenance_windows,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getMaintenanceWindowsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage =
    !isPlaceholderData && maintenance_windows?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(
        getMaintenanceWindowsQueryOptions({ page: page + 1 }),
      )
    }
  }, [page, queryClient, hasNextPage])

  return maintenance_windows?.data.length ? (
    <>
      <TableContainer mt={4}>
        <Table size={{ base: "sm", md: "sm" }}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Components</Th>
              <Th>Start</Th>
              <Th>End</Th>
              <Th />
            </Tr>
          </Thead>
          {isPending ? (
            <Tbody>
              <Tr>
                {new Array(2).fill(null).map((_, index) => (
                  <Td key={index}>
                    <SkeletonText noOfLines={7} paddingBlock="16px" />
                  </Td>
                ))}
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {maintenance_windows?.data.map((mw) => (
                <Tr key={mw.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{mw.title}</Td>
                  <Td>
                    <Tooltip label={mw.description}>
                      <Text
                        size="md"
                        isTruncated
                        maxWidth={{ base: "300px", md: "300px" }}
                      >
                        {mw.description}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Badge ml="1" variant="solid" fontSize="0.8em">
                      {mw.status}
                    </Badge>
                  </Td>
                  <Td>
                    {mw.components?.map((component) => (
                      <Badge
                        key={component}
                        ml="1"
                        variant="solid"
                        fontSize="0.8em"
                      >
                        {component}
                      </Badge>
                    ))}
                  </Td>
                  <Td>
                    <Badge
                      ml="1"
                      variant="solid"
                      fontSize="0.8em"
                      colorScheme="yellow"
                    >
                      <TimeAgo date={mw?.start_timestamp} />
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      ml="1"
                      variant="solid"
                      fontSize="0.8em"
                      colorScheme="yellow"
                    >
                      <TimeAgo date={mw?.end_timestamp} />
                    </Badge>
                  </Td>
                  <Td>
                    <MaintenanceWindowActionMenu
                      type={"MaintenanceWindow"}
                      value={mw}
                    />
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
  ) : (
    <Flex mt={20}>
      <EmptyStateContainer colorScheme="red">
        <EmptyStateIcon as={LuConstruction} />
        <EmptyStateTitle>No scheduled maintenance</EmptyStateTitle>
        <EmptyStateDescription>
          There are currently no scheduled maintenance windows.
        </EmptyStateDescription>
      </EmptyStateContainer>
    </Flex>
  )
}

function Maintenance() {
  return (
    <Container maxW="full">
      <StyledHeader title="Maintenance Windows" icon={LuConstruction} />
      <MaintenanceDisplay />
    </Container>
  )
}
