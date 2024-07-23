"use client";

import { ProductSchema } from "@/app/api/products/get/route";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { deleteProduct, getAllProducts } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { PenBox, TrashIcon } from 'lucide-react';
import { Suspense } from "react";
import useSwr from 'swr';
import { FetcherResponse } from "swr/_internal";

export default function ProductsTable() {
  return (
    <Suspense>
      <Products />
    </Suspense>
  )
}

function Products() {
  const { user } = useUser();
  const fetcher = (arg: string[]): FetcherResponse<any> => getAllProducts(arg);
  const { data: products, mutate } = useSwr<ProductSchema[], any, any>([user?.primaryEmailAddress?.emailAddress], fetcher, { refreshInterval: 800 })

  if (products) return (
    <TableBody className="bg-white">
      {products.map((product: ProductSchema, index) => (
        <TableRow key={index} className="font-medium">
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.type}</TableCell>
          <TableCell className="text-nowrap min-w-max">
            <Button variant={"ghost"} className="">
              <PenBox/>
            </Button>
            <Button variant={"ghost"} className="text-red-500 hover:text-red-500/90" onClick={() => deleteProduct(product.id).then(val => mutate())}>
              <TrashIcon/>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
