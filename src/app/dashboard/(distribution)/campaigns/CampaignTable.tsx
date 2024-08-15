"use client";

import { Campaign } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { deleteGiveaway, getAllCampaigns } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { PenBox, TrashIcon } from 'lucide-react';
import Image from "next/image";
import { Suspense } from "react";
import useSwr from 'swr';
import { FetcherResponse } from "swr/_internal";

export default function CampaignTable() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}

function Content() {
  const { user } = useUser();
  const fetcher = (arg: string[]): FetcherResponse<any> => getAllCampaigns(arg);
  const { data: campaigns, mutate } = useSwr<Campaign[], any, any>([user?.primaryEmailAddress?.emailAddress], fetcher, { refreshInterval: 800 })

  if (campaigns) return (
    <TableBody className="bg-white">
      {campaigns.map((campaign: Campaign, index) => (
        <TableRow key={index} className="font-medium">
          <TableCell>
            {campaign.name}
          </TableCell>
          <TableCell>
            {campaign.delay}
          </TableCell>
          <TableCell>
            <Button variant={"ghost"} className="">
              <PenBox/>
            </Button>
            <Button variant={"ghost"} className="text-red-500 hover:text-red-500/90" onClick={() => deleteGiveaway(campaign.id).then(val => mutate())}>
              <TrashIcon/>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
