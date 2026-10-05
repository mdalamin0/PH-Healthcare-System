"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { Input } from "@/components/ui/input";
import DoctorReviewSheet from "./doctor-review-sheet";
import { useDebounce } from "@/hooks/debounce.hook";

const verificationStatus: ["ALL" | DoctorVerificationStatus, string][] = [
  ["ALL", "All"],
  ["PENDING", "Pending"],
  ["APPROVED", "Approved"],
  ["REJECTED", "Rejected"],
];

const DoctorApprovalTabs = () => {
  const [tab, setTab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);
  const [page, setPage] = useState(1);

  const handleSearch = (value: string) => {
    setSearchInput(value)
    setPage(1)
  }

  const queryPrams: DoctorParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <div className="">
          <Input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or email"
          />
        </div>

        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {verificationStatus.map(([value, lavel]) => (
              <TabsTrigger key={value} value={value}>
                {lavel}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<DoctorApprovalTableLoading />}>
        <DoctorApprovalTable
          {...queryPrams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
      </Suspense>
      <DoctorReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryPrams}
      />
    </>
  );
};

export default DoctorApprovalTabs;
