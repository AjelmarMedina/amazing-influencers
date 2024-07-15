"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  InfoIcon,
  PlusIcon
} from "lucide-react";



export default function Page() {
  interface OrderSchema {
    id: string;
    date: string;
    email: string;
    name: string;
    phone: string;
    surveyCode: string;
    marketplace: string;
    product: string;
    surveyUrl: string;
    campaign: string;
    createdAt: string;
  }
  
  const data: Array<OrderSchema> = [];

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Surveys</h1>
        <Button className="space-x-2">
          <PlusIcon />
          Create Survey
        </Button>
      </header>
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
        
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <section className="shadow-md rounded-xl bg-white p-6 flex flex-col md:flex-row justify-center md:justify-between space-y-4 md:space-y-0 md:items-center">
        <div className="flex flex-col md:flex-row justify-center md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <InfoIcon className="text-white block self-center" fill="#20c997" />
          <p>To test surveys, use order number <span className="text-[#DAB42B]">888-5049177-9546820</span> for any marketplace. </p>
        </div>
        <Button onClick={() => navigator.clipboard.writeText("888-5049177-9546820")}>
          Copy Order Number
        </Button>
      </section>
    </div>
  )
}