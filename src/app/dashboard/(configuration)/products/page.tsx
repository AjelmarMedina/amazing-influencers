import {
  Table,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Suspense } from "react";
import NewProductForm from "./NewProductForm";
import ProductsTable from "./ProductsTable";

export default function Page() {
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Products</h1>
        <Suspense>
          <NewProductForm />
        </Suspense>
      </header>
      <div className="shadow-md rounded-xl overflow-auto grid">
        <Table className="">
          <TableHeader className="bg-[#F3F4F6] *:min-w-max *:text-nowrap">
            <TableRow className="text-[#343A40] font-bold">
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Type
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <ProductsTable />
        </Table>
      </div>
    </div>
  )
}