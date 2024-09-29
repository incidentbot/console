import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
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

const EditIncidentSeverity = ({
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
      IncidentsService.updateIncident({ field: "severity", requestBody: data }),
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
          <ModalHeader>Edit Incident Severity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel htmlFor="severity">Severity</FormLabel>
              <Select
                id="severity"
                {...register("severity", {
                  required: "Severity is required",
                })}
              >
                {incident.severities?.map((severity, index) => (
                  <option key={index} value={severity}>
                    {severity.toUpperCase()}
                  </option>
                ))}
              </Select>
              {errors.severity && (
                <FormErrorMessage>{errors.severity.message}</FormErrorMessage>
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

export default EditIncidentSeverity
