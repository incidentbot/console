import { Flex } from "@chakra-ui/react"
import {
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  StructuredListCell,
  StructuredListItem,
} from "@saas-ui/react"
import type { IconType } from "react-icons/lib"

interface EmptyProps {
  icon: IconType
  resourcePlural: string
}

const Empty = ({ icon, resourcePlural }: EmptyProps) => {
  return (
    <StructuredListItem alignItems="center" justifyContent="center">
      <StructuredListCell>
        <Flex mt={20}>
          <EmptyStateContainer colorScheme="blue">
            <EmptyStateIcon as={icon} />
            <EmptyStateTitle>No {resourcePlural}</EmptyStateTitle>
            <EmptyStateDescription>
              No {resourcePlural} match the current filter.
            </EmptyStateDescription>
          </EmptyStateContainer>
        </Flex>
      </StructuredListCell>
    </StructuredListItem>
  )
}

export default Empty
