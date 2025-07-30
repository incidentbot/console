import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

import {
  IncidentService,
  MaintenanceWindowService,
  UsersService,
} from '../../client'
import useCustomToast from '../../hooks/useCustomToast'

interface DeleteProps {
  type: string
  id: string
  isOpen: boolean
  onClose: () => void
}

const Delete = ({ type, id, isOpen, onClose }: DeleteProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const deleteEntity = async (id?: string) => {
    if (type === 'Incident') {
      await IncidentService.deleteIncidentApiV1IncidentIdDelete({ id: id! })
    } else if (type === 'IncidentEvent') {
      await IncidentService.deleteIncidentEventApiV1IncidentSlugEventsIdDelete({
        id: id!,
      })
    } else if (type === 'MaintenanceWindow') {
      await MaintenanceWindowService.deleteMaintenanceWindowApiV1MaintenanceWindowIdDelete(
        {
          id: id!,
        },
      )
    } else if (type === 'User') {
      await UsersService.deleteUserApiV1UsersUserIdDelete({ userId: id! })
    } else {
      throw new Error(`Unexpected type: ${type}`)
    }
  }

  const mutation = useMutation({
    mutationFn: deleteEntity,
    onSuccess: () => {
      showToast(
        'Success',
        `The ${type.toLowerCase()} was deleted successfully.`,
        'success',
      )
      onClose()
    },
    onError: () => {
      showToast(
        'An error occurred.',
        `An error occurred while deleting the ${type.toLowerCase()}.`,
        'error',
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [
          type === 'IncidentRecord'
            ? 'incident'
            : type === 'IncidentEvent'
              ? 'events'
              : type === 'MaintenanceWindowRecord'
                ? 'maintenance_windows'
                : 'users',
        ],
      })
    },
  })

  const onSubmit = async () => {
    mutation.mutate(String(id))
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        size={{ base: 'sm', md: 'md' }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Delete {type}</AlertDialogHeader>
            <AlertDialogBody>
              {type === 'Incident' && (
                <span>
                  The incident will be removed from the database{' '}
                  <strong>permanently.</strong> You will be responsible for
                  cleaning up Slack artifacts.{' '}
                </span>
              )}
              {type === 'User' && (
                <span>
                  All items associated with this user will also be{' '}
                  <strong>permantly deleted. </strong>
                </span>
              )}
              You will not be able to undo this action.
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button variant="danger" type="submit" isLoading={isSubmitting}>
                Delete
              </Button>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isDisabled={isSubmitting}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Delete
