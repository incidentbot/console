import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type IncidentEvent,
  IncidentService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface EditIncidentEventProps {
  slug: string
  id: string
  event: IncidentEvent
  isOpen: boolean
  onClose: () => void
}

const EditIncidentEvent = ({
  event,
  isOpen,
  onClose,
}: EditIncidentEventProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<IncidentEvent>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: event,
  })

  const mutation = useMutation({
    mutationFn: (data: IncidentEvent) =>
      IncidentService.patchIncidentEventApiV1IncidentSlugEventsIdPatch({
        requestBody: data,
      }),
    onSuccess: () => {
      showToast("Success!", "Incident updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
  })

  const onSubmit: SubmitHandler<IncidentEvent> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "3xl" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Incident Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel htmlFor="event">Event</FormLabel>
              <Textarea
                id="text"
                {...register("text", {
                  required: "Text is required",
                })}
                placeholder="Text"
              />
              {errors.text && (
                <FormErrorMessage>{errors.text.message}</FormErrorMessage>
              )}
            </FormControl>
            {event.source === "user" && (
              <FormControl mt={4}>
                <FormLabel htmlFor="timestamp">Timestamp</FormLabel>
                <Input
                  id="timestamp"
                  {...register("timestamp", {
                    required: "Timestamp is required",
                  })}
                  placeholder="Timestamp"
                  type="datetime-local"
                />
                {errors.timestamp && (
                  <FormErrorMessage>
                    {errors.timestamp.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
            >
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditIncidentEvent
