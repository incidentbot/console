import { Flex, Image, useColorModeValue } from '@chakra-ui/react'
import LogoDark from '/assets/images/logo-font-dark.png'
import LogoLight from '/assets/images/logo-font-light.png'
import Logo from '/assets/images/logo.png'

interface LogoBoxProps {
  imageSize?: string
  sidebar?: boolean
  showText?: boolean
}

const LogoBox = ({ imageSize, showText, sidebar }: LogoBoxProps) => {
  const logoMatchColorMode = sidebar
    ? LogoLight
    : useColorModeValue(LogoDark, LogoLight)

  return (
    <Flex justifyContent="center" flexDirection="column">
      <Image
        src={showText ? logoMatchColorMode : Logo}
        alignSelf="center"
        alt="logo"
        boxSize={imageSize ? imageSize : '80px'}
        height="auto"
        objectFit="contain"
      />
    </Flex>
  )
}

export default LogoBox
