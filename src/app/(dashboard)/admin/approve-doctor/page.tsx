import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";


const DoctorApprovalPage = () => {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Doctor Approval</h2>
      <p>Please make sure the given data is real.</p>
      <DoctorApprovalTabs/>
    </div>
  );
};

export default DoctorApprovalPage;