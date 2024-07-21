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
  PenBox,
  PlusIcon,
  TrashIcon
} from "lucide-react";
import Image from "next/image";

export type GiveawaySchema = {
  id: string
  name: string
  type: string
  status: string
  userId: string
}

export default function Page() {
  const data: Array<GiveawaySchema> = [];

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Giveaways</h1>
        <Button className="space-x-2">
          <PlusIcon />
          Create Giveaway
        </Button>
      </header>
      <div className="shadow-md rounded-xl overflow-hidden">
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
          <TableBody className="bg-white">
            {data.map((row, index) => (
              <TableRow key={index} className="font-medium">
                <TableCell className="flex flex-row min-w-12">
                  <Image
                    alt="Product Image"
                    src={"/dashboard/product-placeholder.png"}
                    width={48}
                    height={48}
                    className="mr-4 min-w-12 aspect-square"
                  />
                </TableCell>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell>
                  {row.type}
                </TableCell>
                <TableCell>
                  {row.status}
                </TableCell>
                <TableCell>
                  <Button variant={"ghost"} className="">
                    <PenBox/>
                  </Button>
                  <Button variant={"ghost"} className="text-red-500 hover:text-red-500/90">
                    <TrashIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}