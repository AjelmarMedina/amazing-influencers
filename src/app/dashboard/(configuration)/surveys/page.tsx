import { Button } from "@/components/ui/button";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  PlusIcon
} from "lucide-react";
import Link from "next/link";
import SampleOrderNumber from "./SampleOrderNumber";
import SurveyTable from "./SurveyTable";

export default function Page() {
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Surveys</h1>
        <Button className="space-x-2" asChild>
          <Link href={"/dashboard/surveys/new"}>
            <PlusIcon />
            Create Survey
          </Link>
        </Button>
      </header>
      <div className="shadow-md rounded-xl overflow-auto grid">
        <Table className="shadow-md rounded-xl">
          <TableHeader className="bg-[#F3F4F6]">
              <TableRow className="text-[#343A40] font-bold">
                <TableCell>Name</TableCell>
                <TableCell>Started</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Ratio</TableCell>
                <TableCell>Analytics</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>QR Code</TableCell>
                <TableCell></TableCell>
              </TableRow>
          </TableHeader>
          <SurveyTable />
        </Table>
      </div>
      <SampleOrderNumber />
    </div>
  )
}