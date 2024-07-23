"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSwr from "swr";
import { z } from "zod";

import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { ProductSchema } from "@/app/api/products/get/route";
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
import { createSurvey, getAllGiveaways, getAllProducts } from "@/lib/data";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Name too short",
  }),
  productId: z.string({ message: "Choose a product" }),
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
    },
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const userId = products?.[0].userId;
    if (!userId) return;

    createSurvey(values.title, userId, values.productId, [values.giveawayId])
      .then(isCreated => {if (isCreated) router.push("/dashboard/surveys")})
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Survey</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}