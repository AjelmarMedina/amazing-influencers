"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { notFound } from "next/navigation";

type ValidationSchema = {
  date: string;
  fullName: string;
  purchase: string;
  giveaway: string;
  orderNum: string;
  marketplace: string;
}

export default function Page() {
  const data: Array<ValidationSchema> = [
  ]
  return notFound();
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-col items-stretch space-y-4">
        <h1 className="font-bold text-2xl">Surveys</h1>
        <p>
          When manual validation is selected on a marketplace, the validation center is where you manually validate the legitimacy of submitted survey responses. Ensure that the submitted order number matches an order number on your marketplace before clicking the &#34;Validate&#34; button. Clicking the validate button will fire all integration associated with the survey that the respondent completed.
        </p>
      </header>
      <section className="shadow-md rounded-xl w-full overflow-hidden grid">
        <Table className="w-full table-auto text-nowrap">
          <TableHeader className="bg-[#F3F4F6]">
              <TableRow className="text-[#343A40] font-bold">
                <TableCell>Date</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Product Purchased</TableCell>
                <TableCell>Giveaway Selected</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>Marketplace</TableCell>
                <TableCell></TableCell>
              </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {!data.length && (
              <TableRow>
                  <TableCell className="py-4 text-center" colSpan={7}>
                    No reviews in need of validation
                  </TableCell>
              </TableRow>
            )}
            {data.map((row, index) => (
              <TableRow key={index} className="font-medium">
                {/* TODO: Table Row */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}