"use client";

import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { deleteGiveaway, getAllGiveaways } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { PenBox, TrashIcon } from 'lucide-react';
import Image from "next/image";
import { Suspense } from "react";
import useSwr from 'swr';
import { FetcherResponse } from "swr/_internal";

export default function GiveawaysTable() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}

function Content() {
  const { user } = useUser();
  const fetcher = (arg: string[]): FetcherResponse<any> => getAllGiveaways(arg);
  const { data: giveaways, mutate } = useSwr<GiveawaySchema[], any, any>([user?.primaryEmailAddress?.emailAddress], fetcher, { refreshInterval: 800 })

  if (giveaways) return (
    <TableBody className="bg-white">
      {giveaways.map((giveaway: GiveawaySchema, index) => (
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
            {giveaway.name}
          </TableCell>
          <TableCell>
            {giveaway.type}
          </TableCell>
          <TableCell>
            {giveaway.status}
          </TableCell>
          <TableCell>
            <Button variant={"ghost"} className="">
              <PenBox/>
            </Button>
            <Button variant={"ghost"} className="text-red-500 hover:text-red-500/90" onClick={() => deleteGiveaway(giveaway.id).then(val => mutate())}>
              <TrashIcon/>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
