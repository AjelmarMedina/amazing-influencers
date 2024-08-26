"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSwr from "swr";
import { z } from "zod";

import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { ProductSchema } from "@/app/api/products/get/route";
import { Button } from "@/components/ui/button";
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from "@/components/ui/file-upload";
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
import { Textarea } from "@/components/ui/textarea";
import { createSurvey, getAllGiveaways, getAllProducts } from "@/lib/data";
import { PaperclipIcon, StickyNoteIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropzoneOptions } from "react-dropzone";



const formSchema = z.object({
  title: z.string().min(2, {
    message: "Name too short",
  }),
  theme: z.string({ message: "Choose a theme" }),
  finePrint: z.string({ message: "Enter Fine Print" }),
  logo: z.instanceof(Array<File>).optional(),
  background: z.instanceof(Array<File>).optional(),
  productId: z.string({ message: "Choose a product" }),
  // minStar: z.number(),
  // minReview: z.number(),
  reviewCollection: z.string({ message: "Choose an option" }),
  // giveawayDelay: z.number(),
  giveawayId: z.string({ message: "Choose a giveaway" }),
})

export default function CreateSurveyForm() {
  const router = useRouter();
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const { data: products } = useSwr<ProductSchema[], any, any>([userEmail, "products"], getAllProducts);
  const { data: giveaways } = useSwr<GiveawaySchema[], any, any>([userEmail, "giveaways"], getAllGiveaways);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // minStar: 0,
      // giveawayDelay: 0,
      // minReview: 0,
    },
  })

  const dropzone = {
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  } satisfies DropzoneOptions;
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const userId = products?.[0].userId;
    if (!userId) return;

    createSurvey(values.title, userId, values.productId, [values.giveawayId])
      .then(isCreated => {if (isCreated) router.push("/dashboard/surveys")})
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 *:gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Survey Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="giveawayId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a giveaway</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select a giveaway"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {giveaways?.map((giveaway: GiveawaySchema, index: number) => (
                    <SelectItem key={index} value={giveaway.id}>
                      {giveaway.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a product</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select a product"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products?.map((product: ProductSchema, index: number) => (
                    <SelectItem key={index} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:grid grid-cols-2">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a theme</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a theme"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"standard"}>
                      Standard - Survey with background and header
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reviewCollection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select an collection method</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"Select an option"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"require-both"}>
                      Require rating and review
                    </SelectItem>
                    <SelectItem value={"require-rating"}>
                      Require rating
                    </SelectItem>
                    <SelectItem value={"hide-review"}>
                      Require rating (and hide review input box)
                    </SelectItem>
                    <SelectItem value={"no-require"}>
                      Do not require either
                    </SelectItem>
                    <SelectItem value={"no-collect"}>
                      Do not collect ratings or reviews
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="finePrint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fine Print</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="md:grid grid-cols-2">
          <FormField
            control={form.control}
            name="background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FileUploader
                  value={field.value ?? null}
                  onValueChange={field.onChange}
                  dropzoneOptions={dropzone}
                  reSelect={true}
                >
                  {!field.value?.length && (
                    <FileInput>
                      <div className="flex flex-col items-center text-center justify-center h-32 w-full border bg-background rounded-md">
                        <StickyNoteIcon strokeWidth={1} />
                        <p className="text-gray-400">Drag and drop your image or <span className="text-primary">click here</span></p>
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
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Image</FormLabel>
                <FileUploader
                  value={field.value ?? null}
                  onValueChange={field.onChange}
                  dropzoneOptions={dropzone}
                  reSelect={true}
                >
                  {!field.value?.length && (
                    <FileInput>
                      <div className="flex flex-col items-center text-center justify-center h-32 w-full border bg-background rounded-md">
                        <StickyNoteIcon strokeWidth={1} />
                        <p className="text-gray-400">Drag and drop your image or <span className="text-primary">click here</span></p>
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}