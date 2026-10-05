import { applyAsDoctor, approveDoctor, getAllDoctors, verifyDoctorAccount } from "@/api"
import { DoctorParams } from "@/types"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"

export const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: applyAsDoctor
  })
}

export const useVerifyDoctorAccount = () => {
  return useMutation({
    mutationFn: verifyDoctorAccount
  })
}

export const useGetAllDoctors = (params: DoctorParams) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};

export const useSuspenseGetAllDoctors = (params: DoctorParams) => {
  return useSuspenseQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  })
}

export const useApproveDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["doctors"]})
    }

  })
}