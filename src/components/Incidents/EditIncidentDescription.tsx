import {
  Alert,
  AlertIcon,
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
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type Incident, IncidentsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface EditIncidentProps {
  incident: Incident
  isOpen: boolean
  onClose: () => void
}

const EditIncidentDescription = ({
  incident,
  isOpen,
  onClose,
}: EditIncidentProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<Incident>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: incident,
  })

  const mutation = useMutation({
    mutationFn: (data: Incident) =>
      IncidentsService.updateIncident({ field: "description", requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Incident updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["incident"] })
    },
  })

  const onSubmit: SubmitHandler<Incident> = async (data) => {
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
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Incident Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Alert status='info'>
              <AlertIcon />
              This will also change the Slack channel name.
            </Alert>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Description"
                type="description"
              />
              {errors.description && (
                <FormErrorMessage>{errors.description.message}</FormErrorMessage>
              )}
            </FormControl>
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

export default EditIncidentDescription
