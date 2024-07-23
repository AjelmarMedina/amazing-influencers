"use client";

import { SurveySchema } from "@/app/api/surveys/get/route";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { AreaChartIcon, DownloadIcon, ExternalLinkIcon, PlayIcon, SquarePenIcon, TrashIcon } from 'lucide-react';
import { Suspense, useEffect, useState } from "react";

export default function SurveyTable() {
  return (
    <Suspense>
      <Surveys />
    </Suspense>
  )
}

function Surveys() {
  const { user } = useUser();
  const { toast } = useToast();
  const [data, setData] = useState<Array<SurveySchema>>([]);

  useEffect(() => {
    if (data.length) return;
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    
    // prepare request
    const apiUrl = "/api/surveys/get/all";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail
      }),
    };

    // Get data from database
    fetch(apiUrl, requestData)
      .then(res => res.json())
      .then((data: Array<SurveySchema>) => setData(data))
      .catch(e => {
        toast({
          title: "Something went wrong",
        });
        console.log(e);
        
      })
  }, [data.length, toast, user?.primaryEmailAddress]);

  return (
    <TableBody className="bg-white">
      {data.map((survey, index) => (
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
  )
}