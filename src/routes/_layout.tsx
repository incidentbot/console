import { Flex, Spinner } from '@chakra-ui/react'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import PrimaryHeader from '../components/Common/PrimaryHeader'
import useAuth, { isLoggedIn } from '../hooks/useAuth'

export const Route = createFileRoute('/_layout')({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

function Layout() {
  const { isLoading } = useAuth()

  return (
    <>
      <PrimaryHeader />
      <Flex maxW="large" h="auto" position="relative">
        {isLoading ? (
          <Flex justify="center" align="center" height="100vh" width="full">
            <Spinner size="xl" color="ui.main" />
          </Flex>
        ) : (
          <Outlet />
        )}
      </Flex>
    </>
  )
}
