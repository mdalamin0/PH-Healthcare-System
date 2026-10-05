import {
  BadgeCheck,
  Mail,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useApproveDoctor, useGetAllDoctors } from "@/hooks";
import type { ApproveDoctorPayload, DoctorParams } from "@/types";

interface Props extends DoctorParams {
  selectedId: string;
  onClose: () => void;
}

export default function DoctorReviewSheet({
  selectedId,
  onClose,
  ...params
}: Props) {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllDoctors(params);
  const { mutate: verify, isPending } = useApproveDoctor();

  const selectedDoctor = data?.data?.find((doctor) => doctor.id === selectedId);

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDoctorPayload = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };

    verify(reviewData, {
      onSuccess: (res) => {
        console.log("Success", res);
        handleClose();
      },
      onError: (error) => {
        console.log("Error", error);
      },
    });
  };

  if (!selectedDoctor) {
    return null;
  }

  const detailRow = (label: string, value?: string | number | null) => (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium wrap-break-words">
        {value ?? <span className="font-normal text-muted-foreground">—</span>}
      </span>
    </div>
  );

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent side="left" className="gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Review doctor application</SheetTitle>
          <SheetDescription>
            Verify the details below before approving or rejecting. This action
            cannot be undone.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-primary/10 p-2.5">
              <Stethoscope className="size-5 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">{selectedDoctor.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedDoctor.specialization}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Contact
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate" title={selectedDoctor.email}>
                {selectedDoctor.email}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedDoctor.contactNumber ?? "—"}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Credentials
            </p>
            {detailRow("License no.", selectedDoctor.licenseNumber)}
            {detailRow("Qualifications", selectedDoctor.qualifications)}
            {detailRow(
              "Experience",
              selectedDoctor.experienceYears != null
                ? `${selectedDoctor.experienceYears} yrs`
                : null,
            )}
            {detailRow(
              "Consultation fee",
              selectedDoctor.consultationFee != null
                ? `$${selectedDoctor.consultationFee}`
                : null,
            )}
          </div>

          {selectedDoctor.bio && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Bio
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedDoctor.bio}
                </p>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Verification
            </p>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedDoctor.verificationStatus}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>
                {selectedDoctor.user.emailVerified
                  ? "Email verified"
                  : "Email not verified"}
              </span>
            </div>
          </div>
        </div>

        <SheetFooter className="border-t">
          {confirmRejection ? (
            <div className="flex w-full flex-col gap-3">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Tell the doctor why this application is being rejected…"
                rows={4}
                disabled={isPending}
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                  size="lg"
                  className="flex-1"
                  disabled={!rejectionReason.trim() || isPending}
                >
                  {isPending && <Spinner />}
                  {isPending ? "Rejecting…" : "Confirm Rejection"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <Button
                onClick={() => setConfirmRejection(true)}
                variant="destructive"
                size="lg"
                className="flex-1"
                disabled={isPending}
              >
                Reject
              </Button>
              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant="default"
                size="lg"
                className="flex-1"
                disabled={isPending}
              >
                {isPending && <Spinner />}
                {isPending ? "Approving…" : "Approve"}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
