import { applyAsDoctor } from "@/api"
import { useMutation } from "@tanstack/react-query"

export const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: applyAsDoctor
  })
}