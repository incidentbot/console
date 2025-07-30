import {
  Badge,
  Box,
  Icon,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import type { IconType } from 'react-icons/lib'

interface StyledHeaderProps {
  title: string
  subtitle?: string
  icon?: IconType
  admin?: boolean
  center?: boolean
}

const StyledHeader = ({
  title,
  subtitle,
  icon,
  admin,
  center,
}: StyledHeaderProps) => {
  const textColor = useColorModeValue('ui.dark', 'ui.light')

  return (
    <Box
      ml={0}
      py={{
        base: 2,
        md: 3,
      }}
      display={{
        base: 'flex',
        md: 'flex',
      }}
      alignItems={{
        base: 'center',
        md: 'center',
      }}
      justifyContent={{
        base: 'center',
        md: center ? 'center' : 'space-between',
      }}
    >
      <chakra.h2
        fontSize={{
          base: '3xl',
          md: '4xl',
        }}
        lineHeight="shorter"
        color={textColor}
      >
        {icon && <Icon color={textColor} as={icon} fontSize={24} mr={2} />}
        {title}
        {subtitle && (
          <Text
            fontSize={{
              base: 'lg',
              md: 'xl',
            }}
            isTruncated
            maxWidth={{ base: '300px', md: '600px' }}
          >
            {subtitle}
          </Text>
        )}
      </chakra.h2>
      {admin && <Badge colorScheme="red">Admin</Badge>}
    </Box>
  )
}

export default StyledHeader
