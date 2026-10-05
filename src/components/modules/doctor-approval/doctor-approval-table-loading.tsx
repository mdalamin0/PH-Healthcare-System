import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DoctorApprovalTableLoading = () => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Lincense No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((index) => (
            <TableRow key={index}>
              <TableCell  colSpan={6}>
                <Skeleton className="h-5 w-100"/>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorApprovalTableLoading;
