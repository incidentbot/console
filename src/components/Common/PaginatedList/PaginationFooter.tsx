import { Flex, useColorModeValue } from "@chakra-ui/react"
import Pagination from "@choc-ui/paginator"
import type { Incidents } from "../../../client"

interface PaginationFooterProps {
  resources: Incidents
  perPage: number
  setPage: any
}

function PaginationFooter({
  resources,
  perPage,
  setPage,
}: PaginationFooterProps) {
  const paginationBgColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Flex
      gap={4}
      alignItems="center"
      mt={4}
      direction="row"
      justifyContent="flex-end"
    >
      <Pagination
        total={resources?.count}
        defaultPageSize={perPage}
        onChange={(page) => {
          setPage(page!)
        }}
        hideOnSinglePage={false}
        paginationProps={{
          display: "flex",
        }}
        focusRing
        activeStyles={{
          bg: paginationBgColor,
        }}
      />
    </Flex>
  )
}

export default PaginationFooter
