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
  AreaChartIcon,
  DownloadIcon,
  ExternalLinkIcon,
  InfoIcon,
  PlayIcon,
  PlusIcon,
  SquarePenIcon,
  TrashIcon
} from "lucide-react";

type surveysData = [
  {
    name: string;
    started: number;
    completed: number;
    ratio: number;
    code: string;
  }
]

export default function Page() {
  const data: surveysData = [
    {
      name: "my survey",
      started: 1,
      completed: 0,
      ratio: 0.0,
      code: "3f5ed2",
    }
  ]

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Surveys</h1>
        <Button className="space-x-2">
          <PlusIcon />
          Create Survey
        </Button>
      </header>
      <Table className="shadow-md rounded-xl">
        <TableHeader className="bg-[#F3F4F6]">
            <TableRow className="text-[#343A40] font-bold">
              <TableCell>Name</TableCell>
              <TableCell>Started</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Ratio</TableCell>
              <TableCell>Analytics</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell></TableCell>
            </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {data.map((row, index) => (
            <TableRow key={index} className="font-medium">
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.started}</TableCell>
              <TableCell>{row.completed}</TableCell>
              <TableCell>{row.ratio.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant={"ghost"}>
                  <AreaChartIcon />
                </Button>
              </TableCell>
              <TableCell className="text-red-500">{row.code}</TableCell>
              <TableCell>
                <Button variant={"ghost"}>
                  <SquarePenIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button variant={"ghost"}>
                  <ExternalLinkIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button variant={"ghost"}>
                  <DownloadIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button variant={"ghost"} className="text-red-500 hover:text-red-500/90">
                  <TrashIcon/>
                </Button>
                <Button variant={"ghost"} className="text-green-500 hover:text-green-500/90">
                  <PlayIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <section className="shadow-md rounded-xl bg-white p-6 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <InfoIcon className="text-white mr-4 inline" fill="#20c997" />
          <p>To test surveys, use order number <span className="text-[#DAB42B]">888-5049177-9546820</span> for any marketplace. </p>
        </div>
        <Button onClick={() => navigator.clipboard.writeText("888-5049177-9546820")}>
          Copy Order Number
        </Button>
      </section>
    </div>
  )
}