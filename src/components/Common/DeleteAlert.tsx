import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { useForm } from "react-hook-form"

import {
  IncidentsService,
  MaintenanceWindowService,
  UsersService,
} from "../../client"
import type {
  Incident,
  IncidentEvent,
  MaintenanceWindow,
  UserPublic,
} from "../../client/models"
import useCustomToast from "../../hooks/useCustomToast"

interface DeleteProps {
  type: string
  slug?: string | null
  id?: string | null
  value: Incident | IncidentEvent | MaintenanceWindow | UserPublic
  isOpen: boolean
  onClose: () => void
}

const Delete = ({ type, slug, id, value, isOpen, onClose }: DeleteProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const deleteEntity = async (
    value: Incident | IncidentEvent | MaintenanceWindow | UserPublic,
  ) => {
    if (type === "Incident") {
      await IncidentsService.deleteIncident({ requestBody: value })
    } else if (type === "IncidentEvent") {
      await IncidentsService.deleteIncidentEvent({ slug: slug, id: id })
    } else if (type === "MaintenanceWindow") {
      await MaintenanceWindowService.deleteMaintenceWindow({
        id: id,
        requestBody: value,
      })
    } else if (type === "User") {
      await UsersService.deleteUser({ requestBody: value })
    } else {
      throw new Error(`Unexpected type: ${type}`)
    }
  }

  const mutation = useMutation({
    mutationFn: deleteEntity,
    onSuccess: () => {
      showToast(
        "Success",
        `The ${type.toLowerCase()} was deleted successfully.`,
        "success",
      )
      onClose()
    },
    onError: () => {
      showToast(
        "An error occurred.",
        `An error occurred while deleting the ${type.toLowerCase()}.`,
        "error",
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [
          type === "Incident"
            ? "incident"
            : type === "IncidentEvent"
              ? "events"
              : type === "MaintenanceWindow"
                ? "maintenance_windows"
                : "users",
        ],
      })
    },
  })

  const onSubmit = async () => {
    mutation.mutate(value)
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Delete {type}</AlertDialogHeader>
            <AlertDialogBody>
              {type === "Incident" && (
                <span>
                  The incident will be removed from the database{" "}
                  <strong>permanently.</strong> You will be responsible for
                  cleaning up Slack artifacts.{" "}
                </span>
              )}
              {type === "User" && (
                <span>
                  All items associated with this user will also be{" "}
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
