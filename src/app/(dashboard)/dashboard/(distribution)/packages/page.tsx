"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { Suspense } from 'react';
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


const MAX_FILE_SIZE = 50_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const formSchema = z.object({
  style: z.string().min(2),
  nickname: z.string().min(2).max(128),
  survey: z.string().min(2),
  logo: z.instanceof(FileList, { message: "Logo is required" })
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max size is 50MB.")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), "Only jpeg, jpg, png, webp formats are supported."),
  bgColor: z.string({ required_error: "Please choose a color" }),
  headline: z.string({ required_error: "Headline is required" }),
  subtitle: z.string().optional(),
  url: z.string({ required_error: "Enter your URL" }).url(),
})


export default function Page() {
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-start items-start space-x-4">
        <ChevronLeft />
        <div>
          <h1 className="font-bold text-2xl">Design Your Package Insert</h1>
          <p className="text-base text-[#343A40]">
            Simply design your package insert and print it through GetReviews suggested service.
          </p>
        </div>
      </header>
      <section className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4 *:rounded-xl *:shadow-sm *:p-4 *:md:p-6">
        <aside className="bg-white">
          <Suspense>
            <PackageInsertForm />
          </Suspense>
        </aside>
        <aside className="bg-[#dfdfdf]">
          <h2 className="font-bold text-xl justify-self-center">Preview</h2>
        </aside>
      </section>
      <div className="justify-self-stretch flex flex-row justify-center">
        <div className="grid grid-cols-2 gap-4">
          <Button variant={"outline"} type="submit" form="package-form">
            Save for now
          </Button>
          <Button>
            Download Assets
          </Button>
        </div>
      </div>
    </div>
  )
}

function PackageInsertForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bgColor: "#20C997"
    },
  })

  const fileRef = form.register("logo");

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form id="package-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 items-center">
              <FormLabel className="text-xl font-bold">Choose style and size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border border-[#20C997] bg-[rgba(32,201,151,0.2)]">
                    <SelectValue placeholder={`Basic (4’’ * 6’’)`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={`Basic (4’’ * 6’’)`}>Basic (4’’ * 6’’)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="text-[rgba(52,58,64,0.2)]" />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">Nickname</FormLabel>
              <FormControl>
                <Input placeholder="Amazon FBA - Magnesium giveaway" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="text-[rgba(52,58,64,0.2)]" />
        <FormField
          control={form.control}
          name="survey"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 items-center">
              <FormLabel className="text-base font-bold">Connect a survey</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Please select..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="My Survey">My Survey</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="text-[rgba(52,58,64,0.2)]" />
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 items-center">
              <FormLabel className="text-base font-bold">Logo</FormLabel>
              <FormControl className="file:bg-[#343A40] file:text-white file:h-full file:px-2 file:mr-2">
                <Input
                  className="flex p-0"
                  placeholder="No file chosen"
                  type="file"
                  accept="image/*"
                  {...fileRef}
                  onChange={(event) => {
                    field.onChange(event.target?.files?.[0] ?? undefined);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="text-[rgba(52,58,64,0.2)]" />
        <FormField
          control={form.control}
          name="bgColor"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 items-center">
              <FormLabel className="text-base font-bold">Background Color</FormLabel>
              <FormControl>
                <Input className="p-0" type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="text-[rgba(52,58,64,0.2)]" />
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">Headline</FormLabel>
              <FormControl>
                <Input placeholder="Thank you" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="text-[rgba(52,58,64,0.2)]" />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Please share your experience with us!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="text-[rgba(52,58,64,0.2)]" />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">URL or social media</FormLabel>
              <FormControl>
                <Input placeholder="https://yourbrand.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
  
}