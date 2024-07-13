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

type productsData = [
  {
    product: string;
    type: string;
    id: string;
    image: string;
  }
]

export default function Page() {
  const data: productsData = [
    {
      product: "Hydrating Serum",
      type: "Physical Product",
      id: "3523",
      image: "/dashboard/product-placeholder.png",
    }
  ]

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Products</h1>
        <Button className="space-x-2">
          <PlusIcon />
          Create Product
        </Button>
      </header>
      <div className="shadow-md rounded-xl overflow-hidden">
        <Table className="">
          <TableHeader className="bg-[#F3F4F6]">
            <TableRow className="text-[#343A40] font-bold">
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Type
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {data.map((row, index) => (
              <TableRow key={index} className="font-medium">
                <TableCell className="flex flex-row items-center">
                  <Image
                    alt="Product Image"
                    src={row.image}
                    width={48}
                    height={48}
                    className="mr-4 min-w-12 max-h-12 aspect-square"
                  />
                  <div className="flex flex-col justify-start">
                    <p className="text-base">{row.product}</p>
                    <p className="text-sm">ID: <span className="bg-F0F0F0 text-red-500">{row.id}</span></p>
                  </div>
                </TableCell>
                <TableCell>
                  {row.type}
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