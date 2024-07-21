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

export type SurveySchema = {
  id?: string
  surveyCode: string
  name: string
  started: number
  completed: number
  ratio: number
  productId: string
  giveaways: string[]
}


export default function Page() {
  const data: Array<SurveySchema> = []

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Surveys</h1>
        <Button className="space-x-2">
          <PlusIcon />
          Create Survey
        </Button>
      </header>
      <div className="shadow-md rounded-xl overflow-auto">
        <Table className="shadow-md rounded-xl md:table-fixed">
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
                <TableCell className="">{row.name}</TableCell>
                <TableCell>{row.started}</TableCell>
                <TableCell>{row.completed}</TableCell>
                <TableCell>{row.ratio.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant={"ghost"} className="px-2">
                    <AreaChartIcon />
                  </Button>
                </TableCell>
                <TableCell className="text-red-500">{row.surveyCode}</TableCell>
                <TableCell>
                  <Button variant={"ghost"} className="px-2">
                    <SquarePenIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant={"ghost"} className="px-2">
                    <ExternalLinkIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant={"ghost"} className="px-2">
                    <DownloadIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row flex-wrap">
                    <Button variant={"ghost"} className="text-red-500 hover:text-red-500/90 px-2">
                      <TrashIcon/>
                    </Button>
                    <Button variant={"ghost"} className="text-green-500 hover:text-green-500/90 px-2">
                      <PlayIcon/>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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