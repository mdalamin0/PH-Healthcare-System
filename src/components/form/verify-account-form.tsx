"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount, useVerifyDoctorAccount } from "@/hooks";
import { toast } from "sonner";
import { FetchError } from "ofetch";
import { Spinner } from "../ui/spinner";

const VerfiyForm = ({ mode = "patient" }: { mode: "patient" | "doctor" }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const { mutate: verifyPatient, isPending: verifyPatientPending } =
    useVerifyAccount();
  const { mutate: verifyDoctor, isPending: verifyDoctorPending } =
    useVerifyDoctorAccount();
  const verifyAccount = mode === "doctor" ? verifyDoctor : verifyPatient
  const verifyPending = mode === "doctor" ? verifyDoctorPending : verifyPatientPending
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
    return;
  }, [email, router]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };
    verifyAccount(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error("Verify Failed. Please try again.");
        }

        if(mode === "doctor"){
          toast.success("Verification Successful, Please wait for admin approve.");
          router.push("/")
        }

        toast.success("Successfully Verify Your Account.");
        router.push("/")
      },
      onError: (error: FetchError) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Verify failure, Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Account!</CardTitle>
        <CardDescription>
          Please provide the OTP. We send you in your email: {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              maxLength={6}
              value={otp}
              autoComplete="off"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid OTP, Please try again." }]}
              />
            )}
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"}>Resend</Button>
        <Button disabled={verifyPending} form="otp-form" type="submit">
          {verifyPending ? (
            <>
              {" "}
              <Spinner /> Submitting{" "}
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerfiyForm;
