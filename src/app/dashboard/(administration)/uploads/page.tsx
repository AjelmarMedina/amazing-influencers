"use client"

import { UserSchema } from "@/app/api/users/create/route";
import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { createOrder, getAllCampaigns, getSurvey, getUser } from "@/lib/data";
import { OrderSchema } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Campaign } from "@prisma/client";
import { Loader2Icon, PaperclipIcon, StickyNoteIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Papa from 'papaparse';
import { cloneElement, Suspense, useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { FetcherResponse } from "swr/_internal";
import { z } from "zod";

export default function Page() {
  type OrderSchema = {
    uploaded: string;
    status: string;
    file: string;
    marketplace: string;
    user: string;
    processedOrders: string;
  }
  
  const data: Array<OrderSchema> = [];

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-col items-stretch space-y-4">
        <h1 className="font-bold text-2xl">Upload Center</h1>
        <p>
          Upload values that you would like to allow into your review flow. A &quot;value&quot; is a string of letters and/or numbers that act as your respondents password into your Amazing Influencers survey.
        </p>
      </header>
      <section className="shadow-md bg-white rounded-xl flex flex-col items-stretch">
        <header className="p-6 bg-[rgba(243,244,246,0.8)] justify-start">
          <h2 className="font-bold text-base">Upload Orders CSV</h2>
        </header>
        <div className="p-6 flex flex-col items-stretch space-y-4">
          <p>
            <strong>Note:</strong> Ensure proper upload formatting by downloading the Amazon {" "}
            <Link href={"/sample.csv"} download={"sample.csv"} className="underline text-primary">sample.csv</Link>
          </p>
          <Suspense>
            <UploadForm />
          </Suspense>
        </div>
      </section>
      {/* <OrderSearch data={data} /> */}
    </div>
  )
}

const formSchema = z.object({
  file: z.instanceof(Array<File>, { message: "File is required" })
    .refine((file: Array<File>) => "text/csv".includes(file?.[0]?.type), "CSV files are only accepted"),
  campaign: z.string().optional(),
})

function UploadForm() {
  const router = useRouter();
  const { user } = useUser();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const fetcher = (arg: string[]): FetcherResponse<any> => getAllCampaigns(arg);
  const { data: campaigns } = useSWR<Campaign[], any, any>([user?.primaryEmailAddress?.emailAddress], fetcher, { refreshInterval: 800 })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const dropzone = {
    multiple: false,
    accept: {
      "text/csv": [],
    },
  } satisfies DropzoneOptions;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    setSubmitDisabled(true);
    const csv: File = values.file[0];
    const userDb: UserSchema | null = await getUser(user?.primaryEmailAddress?.emailAddress ?? "");
    if (!userDb) return;

    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const orders: any[] = results.data;

        // Invalid CSV
        if (!(
          orders[0]["Order ID"] ||
          orders[0]["Date"] ||
          orders[0]["Name"] ||
          orders[0]["Email"]
        )) {
          toast({
            title: "Invalid CSV format...",
            description: `Please include, "Order ID", "Date", "Name", and "Email"`,
            variant: "destructive"
          })
          setSubmitDisabled(false);
          return;
        }

        orders.map((order: any, index: number) => {
          if (index >= orders.length - 1) return; // last csv row is null 
          if (userDb.orders?.find((orderDb) => orderDb.orderNum == order["Order ID"])) return; // check for duplicates
          if (!/^\d{3}-\d{7}-\d{7}$/.test(order["Order ID"])) return; // Match Order number format

          createOrder(
            userDb.id,
            order["Order ID"],
            new Date(order["Date"]),
            order["Name"],
            order["Email"]
          )
        })

        toast({
          title: "Orders Submitted!",
          description: "Uploading your orders.. We will redirect you to the Orders page once complete!"
        })
        setTimeout(() => router.push("/dashboard/orders"), 500)
      },
      error: e => {
        toast({
          title: "Something went wrong...",
          description: e.message,
          variant: "destructive"
        })
        setSubmitDisabled(false);
      }
    });
  }

  const onFileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) =>{
    if(!event.target.files){ return; }

    console.log(event.target.files[0]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-stretch">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                dropzoneOptions={dropzone}
                reSelect={true}
              > 
                {!field.value?.length && (
                  <FileInput>
                    <div className="flex flex-col items-center text-center justify-center h-32 w-full border bg-background rounded-md">
                      <StickyNoteIcon strokeWidth={1} />
                      <p className="text-gray-400">Drag and drop your CSV or <span className="text-primary">click here</span></p>
                    </div>
                  </FileInput>
                )}
                <FileUploaderContent className="w-full flex items-center justify-center flex-row gap-2">
                  {field.value?.map((file, i) => (
                    <FileUploaderItem
                      key={i}
                      index={i}
                      className="size-20 p-0 rounded-md overflow-hidden"
                      aria-roledescription={`file ${i + 1} containing ${file.name}`}
                    >
                      <PaperclipIcon className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
                </FileUploaderContent>
              </FileUploader>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="campaign"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the campaign" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {campaigns?.map((campaign, index) => (
                    <SelectItem key={index} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" className="md:self-start" disabled={submitDisabled}>
          Submit
          {submitDisabled && (
            <Loader2Icon className="animate-spin ml-2"/>
          )}
        </Button>
      </form>
    </Form>
  )
}

function OrderSearch({ data }: {data: OrderSchema[]}) {
  return (
    <section className="shadow-md bg-white rounded-xl flex flex-col items-stretch">
      <header className="p-6 bg-[rgba(243,244,246,0.8)] justify-start">
        <h2 className="font-bold text-base">Order search</h2>
      </header>
      <div className="p-6 flex flex-col items-stretch space-y-4">
        <p> Check if you&apos;ve imported a specific order by searching for its source platform Order ID, name, email, or phone. </p>
        <div className="w-full overflow-hidden grid">
          <Table className="w-full table-auto text-nowrap">
            <TableHeader className="bg-[#F3F4F6]">
                <TableRow className="text-[#343A40] font-bold">
                  <TableCell>Uploaded</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Marketplace</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Processed Orders</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {data.map((row, index) => (
                <TableRow key={index} className="font-medium">
                  {/* TODO: Table Row */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
