"use client";

import { ProductSchema } from "@/app/api/products/get/route";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { deleteProduct, getAllProducts } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { PenBox, TrashIcon } from 'lucide-react';
import Image from "next/image";
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
          <TableCell className="flex flex-row items-center">
            <Image
              alt="Product Image"
              src={"/dashboard/product-placeholder.png"}
              width={48}
              height={48}
              className="mr-4 min-w-12 max-h-12 aspect-square"
            />
            <div className="flex flex-col justify-start">
              <p className="text-base">{product.name}</p>
              <p className="text-sm">ID: <span className="bg-F0F0F0 text-red-500">{product.productId}</span></p>
            </div>
          </TableCell>
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
