"use client"

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
import { createOrder, getSurvey, getUser } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperclipIcon, StickyNoteIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Papa from 'papaparse';
import { Suspense, useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
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
          Upload values that you would like to allow into your review flow. A &quot;value&quot; is a string of letters and/or numbers that act as your respondents password into your GetReviews survey. For example, if you upload the value &quot;12345,&quot; this value would be entitled to one entry into your GetReviews survey. If someone entered &quot;12346,&quot; they would be denied entry into your survey. Only respondents who enter a value that you&apos;ve uploaded here will be allowed to enter your review flow.
        </p>
      </header>
      <section className="shadow-md bg-white rounded-xl flex flex-col items-stretch">
        <header className="p-6 bg-[rgba(243,244,246,0.8)] justify-start">
          <h2 className="font-bold text-base">Which platform are you uploading values for?</h2>
        </header>
        <div className="p-6 flex flex-col items-stretch space-y-4">
          <p>Values are assigned to the platform, meaning that someone who has a value for Platform A will not be allowed to use that value on Platform B and vice versa. Upload values to the platform that your respondent will be using their value on. </p>
          <Suspense>
            <UploadForm />
          </Suspense>
        </div>
      </section>
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
    </div>
  )
}

const formSchema = z.object({
  platform: z.string({ required_error: "Platform required"}),
  file: z.instanceof(Array<File>, { message: "File is required" })
    .refine((file: Array<File>) => "text/csv".includes(file?.[0]?.type), "CSV files are only accepted"),
  campaign: z.string().optional(),
})

function UploadForm() {
  const router = useRouter();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
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
    const userDb = await getUser(user?.primaryEmailAddress?.emailAddress ?? "");

    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const orders = results.data;
        orders.map(async (order: any, index) => {
          if (index >= orders.length - 1) return;
          const survey = await getSurvey(order["Survey Code"]);
          if (!survey || !userDb?.id) return;
          createOrder(
            userDb.id,
            order["Order ID"],
            new Date(order["Date"]),
            order["Name"],
          )
        })
        setSubmitSuccess(true);
        router.push("/dashboard/orders");
      },
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
          name="platform"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Amazon">Amazon</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
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
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="md:self-start" disabled={submitDisabled}>Submit</Button>
        {submitSuccess && (
          <p className="text-primary">
            CSV submitted!
          </p>
        )}
      </form>
    </Form>
  )
}