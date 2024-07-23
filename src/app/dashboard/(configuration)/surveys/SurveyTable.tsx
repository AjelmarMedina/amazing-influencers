"use client";

import { UserSchema } from "@/app/api/users/create/route";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getUser } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { AreaChartIcon, DownloadIcon, ExternalLinkIcon, PlayIcon, SquarePenIcon, TrashIcon } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import useSwr from 'swr';
import { renderSVG } from 'uqr';

export default function SurveyTable() {
  return (
    <Suspense>
      <Surveys />
    </Suspense>
  )
}

function Surveys() {
  const { user } = useUser();
  const { data } = useSwr<UserSchema, any, any>(user?.primaryEmailAddress?.emailAddress, getUser)

  return (
    <TableBody className="bg-white">
      {data?.surveys?.map((survey, index) => (
        <TableRow key={index} className="font-medium">
          <TableCell>{survey.name}</TableCell>
          <TableCell>{survey.started}</TableCell>
          <TableCell>{survey.completed}</TableCell>
          <TableCell>{survey.ratio.toFixed(2)}</TableCell>
          <TableCell>
            <Button variant={"ghost"} className="px-2">
              <AreaChartIcon />
            </Button>
          </TableCell>
          <TableCell className="text-red-500">{survey.surveyCode}</TableCell>
          <TableCell>
            <Button variant={"ghost"} className="px-2">
              <SquarePenIcon />
            </Button>
          </TableCell>
          <TableCell>
            <Button variant={"ghost"} className="px-2" asChild>
              <Link href={`/claim/${survey.surveyCode}`}>
                <ExternalLinkIcon />
              </Link>
            </Button>
          </TableCell>
          <TableCell>
            <QrDialog title={survey.name} code={survey.surveyCode} />
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
  )
}

function QrDialog({ title, code }: { title: string, code: string }) {
  const url = `${window.location.href.replace("/dashboard/surveys", "/claim")}/${code}`;
  const svg = renderSVG(url)
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" })

  return (
    <Dialog>
      <DialogTrigger className="px-2">
        <DownloadIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download {title}</DialogTitle>
        </DialogHeader>
        <section className="flex flex-col items-center space-y-6">
          <Image 
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt={"QR Code"}
            width={256}
            height={256}
          />
          <Button asChild>
            <a href={URL.createObjectURL(blob)} download={`${code}.svg`} >
              Download QR Code
            </a>
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  )
}