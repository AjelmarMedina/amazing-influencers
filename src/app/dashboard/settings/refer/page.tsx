"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Refer & Earn</h2>
        <p>
        Refer a customer and we&apos;ll share 25.0% of their subscription fee, forever. No minimum or maximum limts apply, but this cannot be used to refer your own accounts. Our Agency plan includes a 10% discount for customers with 2+ Enterprise subscriptions.
        </p>
      </div>
      <hr />
      <ReferralsTable />
      <hr />
      <div>
        <h2 className="font-bold text-lg">Payout Details</h2>
        <p>
          Let us know how you&apos;d like to be compensated - payments will be made by the 5th of each month. &nbsp;
          <Link href={""} className="text-primary underline hover:text-primary90">Go here.</Link>
        </p>
      </div>
      <hr />
      <div className="flex flex-col items-stretch">
        <h2 className="font-bold text-lg">Share Your Referral Code</h2>
        <p>
          Have the person you are referring enter this code in the &quot;Referral Code&quot; box when they register.
        </p>
        <div className="flex flex-row justify-stretch space-x-2">
          <Input
            value="18c639e"
            onFocus={e => {
              e.target.select()
              navigator.clipboard.writeText(e.target.value);
            }}
            readOnly 
          />
          <Button className="self-end">Copy</Button>
        </div>
      </div>
      <div className="flex flex-col items-stretch">
        <h2 className="font-bold text-lg">Share Your Referral Link</h2>
        <p>
          Instead of typing in the code above, users can register directly with this URL.
        </p>
        <div className="flex flex-row justify-stretch space-x-2">
          <Input
            value="18c639e"
            onFocus={e => {
              e.target.select()
              navigator.clipboard.writeText(e.target.value);
            }}
            readOnly 
          />
          <Button className="self-end">Copy</Button>
        </div>
      </div>
      <div className="flex flex-col items-stretch">
        <h2 className="font-bold text-lg">Email Referral Link</h2>
        <p>
          Provide the email address of the person you would like to refer and we&apos;ll send them your referral link.
        </p>
        <div className="flex flex-row justify-stretch space-x-2">
          <Input
            placeholder="Enter your email"
          />
          <Button className="self-end">Send</Button>
        </div>
      </div>
    </div>
  )
}

function ReferralsTable() {
  const data = [
    {
      totalReferrals: 0,
      subscriptionValue: 0.00,
      active: 0,
      nextEarnout: 0.00,
    }
  ]

  return (
    <div className="w-full overflow-hidden grid rounded-xl">
      <Table className="w-full table-auto text-nowrap text-center">
        <TableHeader className="bg-[#F3F4F6]">
            <TableRow className="text-[#343A40] font-bold">
              <TableCell>Total Referrals</TableCell>
              <TableCell>Subscription Value</TableCell>
              <TableCell>Active (Paying)</TableCell>
              <TableCell>Next Earnout</TableCell>
            </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {data.map((row, index) => (
            <TableRow key={index} className="font-medium">
              <TableCell>{row.totalReferrals}</TableCell>
              <TableCell>${row.subscriptionValue.toFixed(2)}</TableCell>
              <TableCell>{row.active}</TableCell>
              <TableCell>${row.nextEarnout.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}