"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { Suspense, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import { UserSchema } from "@/app/api/users/create/route";
import { getUser } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-start items-start space-x-4">
        <div>
          <h1 className="font-bold text-2xl">Design Your Package Insert</h1>
          <p className="text-base text-[#343A40]">
            Simply design your package insert and print it through GetReviews suggested service.
          </p>
        </div>
      </header>
      <PackageInsert />
      <div className="justify-self-stretch flex flex-row justify-center">
        <div className="grid grid-cols-2 gap-4">
          <Button>
            Download Assets
          </Button>
        </div>
      </div>
    </div>
  )
}

function PackageInsert() {
  const [nickname, setNickname] = useState("");
  const [surveyCode, setSurvey] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#20C997");
  const [headline, setHeadline] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [url, setUrl] = useState("");


  return (
    <section className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4 *:rounded-xl *:shadow-sm *:p-4 *:md:p-6">
        <aside className="bg-white">
          <Suspense>
            <PackageInsertForm setReactStates={{ setNickname, setSurvey, setBackgroundColor, setHeadline, setSubtitle, setUrl }} />
          </Suspense>
        </aside>
        <aside className="bg-[#dfdfdf] px-6 justify-stretch items-stretch">
          <h2 className="font-bold text-xl mb-4 justify-self-start self-start">Preview</h2>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div 
              className="min-w-72 min-h-48 max-w-full max-h-full rounded-lg flex flex-col items-start space-y-4 p-4"
              style={{
                backgroundColor: backgroundColor
              }}
            >
              <h1 className="text-2xl font-bold self-center">
                {nickname}
              </h1>
              <h2 className="text-lg font-bold">
                {headline}
              </h2>
              <p className="text-base">
                {subtitle}
              </p>
              <Link href={`/claim/${surveyCode}`}>https://AmazingInfluencers.com/claim/{surveyCode}</Link>
              <hr className="text-[rgba(52,58,64,0.2)]" />
              Learn more:
              <Link href={url}>{url}</Link>
            </div>
          </div>
        </aside>
      </section>
  )

}

function PackageInsertForm({ setReactStates }: any) {
  const { user } = useUser();
  const { data } = useSWR<UserSchema, any, any>(user?.primaryEmailAddress?.emailAddress, getUser)
  const { setNickname, setSurvey, setBackgroundColor, setHeadline, setSubtitle, setUrl } = setReactStates;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 items-center">
        <Label className="font-bold text-lg">Choose style and size</Label>
        <Select>
          <SelectTrigger className="border border-[#20C997] bg-[rgba(32,201,151,0.2)]">
            <SelectValue placeholder={`Basic (4" * 6")`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={`Basic (4" * 6")`}>Basic (4&rsquo;&rsquo; * 6&rsquo;&rsquo;)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <hr className="text-[rgba(52,58,64,0.2)]" />

      <div className="space-y-2">
        <Label className="font-bold text-lg">Nickname</Label>
        <Input placeholder="Amazon FBA - Magnesium giveaway" onChange={e => setNickname(e.target.value)} />
      </div>
      <hr className="text-[rgba(52,58,64,0.2)]" />

      <div className="grid grid-cols-2 items-center">
        <Label className="font-bold text-lg">Connect a Survey</Label>
        <Select onValueChange={value => setSurvey(value)}>
          <SelectTrigger className="">
            <SelectValue placeholder="Please select..." />
          </SelectTrigger>
          <SelectContent>
            {data?.surveys?.map((survey, index) => (
              <SelectItem key={index} value={survey.surveyCode}>{survey.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <hr className="text-[rgba(52,58,64,0.2)]" />

      {/* <div className="grid grid-cols-2 items-center ">
        <Label className="font-bold text-lg">Logo</Label>
        <Input
          className="flex p-0 file:bg-[#343A40] file:text-white file:h-full file:px-2 file:mr-2"
          placeholder="No file chosen"
          type="file"
          accept="image/*"
        />
      </div>
      <hr className="text-[rgba(52,58,64,0.2)]" /> */}

      <div className="grid grid-cols-2 items-center">
        <Label className="font-bold text-lg">Background Color</Label>
        <Input
          className="p-0"
          type="color"
          defaultValue={"#20C997"}
          onChange={e => setBackgroundColor(e.target.value)} 
        />
      </div>
      <hr className="text-[rgba(52,58,64,0.2)]" />

      <div className="mb-2">
        <Label className="font-bold text-lg">Headline</Label>
        <Input placeholder="Thank you" onChange={e => setHeadline(e.target.value)} />
      </div>
      <hr className="text-[rgba(52,58,64,0.2)]" />

      <div className="mb-2">
        <Label className="font-bold text-lg">Subtitle</Label>
        <Input placeholder="Please share your experience with us!" onChange={e => setSubtitle(e.target.value)} />
      </div>
      <hr className="text-[rgba(52,58,64,0.2)]" />

      <div className="mb-2">
        <Label className="font-bold text-lg">URL or Social Media</Label>
        <Input placeholder="https://yourbrand.com" onChange={e => setUrl(e.target.value)} />
      </div>
    </div>
  )
}

