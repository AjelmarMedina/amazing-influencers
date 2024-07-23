"use client"

import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import GiveawaysTable from "./GiveawaysTable";
import NewGiveawayForm from "./NewGiveawayForm";

export default function Page() {
  const data: Array<GiveawaySchema> = [];

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Giveaways</h1>
        <NewGiveawayForm />
      </header>
      <div className="shadow-md rounded-xl overflow-auto grid">
        <Table className="shadow-md rounded-xl">
          <TableHeader className="bg-[#F3F4F6]">
            <TableRow className="text-[#343A40] font-bold">
              <TableCell>
                Image
              </TableCell>
              <TableCell>
                Giveaway Name
              </TableCell>
              <TableCell>
                Giveaway Type
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <GiveawaysTable />
        </Table>
      </div>
    </div>
  )
}