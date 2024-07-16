import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Plan & Billing</h2>
        <p>
          View and edit settings related to your plan and billing
        </p>
      </div>
      <hr />
      <div
        className={cn("grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-6",
          "*:rounded-xl *:border *:border-[#343A40] *:px-10 *:py-8 *:flex *:flex-col *:space-y-4"
        )}
      >
        <aside>
          <h2 className="text-lg font-bold">Individual plan</h2>
          <h3 className="text-base"><strong className="font-semibold text-4xl">$130</strong> per month</h3>
          <ul className="space-y-3 py-4">
            <li><CheckIcon className="text-[#1CAE2B] mr-2 inline"/> 100 reviews</li>
            <li><CheckIcon className="text-[#1CAE2B] mr-2 inline"/> Unlimited surveys</li>
            <li><CheckIcon className="text-[#1CAE2B] mr-2 inline"/> Unlimited users</li>
            <li><CheckIcon className="text-[#1CAE2B] mr-2 inline"/> Unlimited products</li>
            <li><CheckIcon className="text-[#1CAE2B] mr-2 inline"/> Unlimited giveaways</li>
            <li><CheckIcon className="text-[#1CAE2B] mr-2 inline"/> Professional integrations</li>
          </ul>
          <div>
            <p>0 of 100 reviews collected</p>
            <Progress />
          </div>
          <Button variant={"outline"} className="text-primary border-primary hover:text-primary/90">Upgrade plan</Button>
        </aside>
        <aside>
          <div className="space-y-2">
            <h2 className="text-lg font-bold">Payment method</h2>
            <p>Change how you pay for your plan</p>
          </div>
          <div className="border border-[#343A40] rounded-md flex flex-row items-center space-x-8 p-4">
            <Image 
              alt="Visa"
              src={"/dashboard/visa.svg"}
              width={67}
              height={41}
            />
            <div className="space-y-2">
              <h3 className="font-bold">Card ending in 7005</h3>
              <p>Expiry 7/2030</p>
            </div>
          </div>
        </aside>
      </div>
      <div>
        <h2 className="font-bold text-lg">Invoices</h2>
        <p>
          View and download invoices
        </p>
      </div>
      <InvoicesTable />
    </div>
  )
}

function InvoicesTable() {
  const data = [
    {
      date: "07/08/2024",
      order_id: "9F3513D3-0001",
      amount: "$190",
    }
  ]

  return (
    <div className="w-full overflow-hidden grid rounded-xl">
      <Table className="w-full table-auto text-nowrap text-center">
        <TableHeader className="bg-[#F3F4F6]">
            <TableRow className="text-[#343A40] font-bold">
              <TableCell>Date</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {data.map((row, index) => (
            <TableRow key={index} className="font-medium">
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.order_id}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell className="text-primary">View PDF</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}