"use client"

import { OrderSchema } from "@/app/api/orders/get/route";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function Page() {
  const data: Array<OrderSchema> = [];

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Orders</h1>
      </header>
      <section className="shadow-md bg-white rounded-xl flex flex-col items-stretch">
        <header className="p-6 bg-[rgba(243,244,246,0.8)] justify-start">
          <h2 className="font-bold text-base">Order search</h2>
        </header>
        <div className="p-6 flex flex-col items-stretch space-y-4">
          <p> Check if you&apos;ve imported a specific order by searching for its source platform Order ID, name, email, or phone. </p>
          <Input placeholder="Search here..." />
        </div>
      </section>
      <section className="shadow-md rounded-xl w-full overflow-hidden grid">
        <Table className="w-full table-auto text-nowrap">
          <TableHeader className="bg-[#F3F4F6]">
              <TableRow className="text-[#343A40] font-bold">
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Survey Code</TableCell>
                <TableCell>Marketplace</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Survey URL</TableCell>
                <TableCell>Campaign</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {!data.length && (
              <TableRow>
                <TableCell colSpan={11} className="py-4">
                  None found
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