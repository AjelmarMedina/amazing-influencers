import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import NewCampaignForm from "./NewCampaignForm";
import CampaignTable from "./CampaignTable";
import { PlusIcon, ShoppingBagIcon } from "lucide-react";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { notFound } from "next/navigation";

export default function Campaigns() {
  return notFound(); // Removed Campaigns feature
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Campaigns</h1>
        <Suspense>
          <NewCampaignForm />
        </Suspense>
      </header>
      <div className="shadow-md rounded-xl overflow-auto grid">
        <Table className="">
          <TableHeader className="bg-[#F3F4F6] *:min-w-max *:text-nowrap">
            <TableRow className="text-[#343A40] font-bold">
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Delay
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <CampaignTable />
        </Table>
      </div>
    </div>
  )
}