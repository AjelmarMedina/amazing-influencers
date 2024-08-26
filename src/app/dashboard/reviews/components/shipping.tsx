'use client'

import React from 'react'
import { Copy , Map } from 'lucide-react'

import { useToast } from "@/components/ui/use-toast"
import { type ShippingInfoSchema } from '@/lib/types'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ShippingInfoProps {
  children: React.ReactNode,
  data: ShippingInfoSchema,
}

export const ShippingInfo: React.FC<ShippingInfoProps> = ({children, data}) => {
  const { toast } = useToast()

  const onCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast({ description:'Shipping information copied to clipboard.'});
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Shipping Information</DialogTitle>
        </DialogHeader>
          <div className="flex space-x-2 py-10 w-full">
            <div className="rounded-full mx-10 bg-gray-300 text-black w-24 h-14 flex items-center justify-center">
              <Map />
            </div>
            <div className="text-lg">
              <span>{data.address1}</span>
              <span>,&nbsp;{data.city}</span>
              <span>,&nbsp;{data.stateProvince}</span>
              <span>&nbsp;{data.zipCode}</span>
            </div>
          </div>
        <DialogFooter className="sm:justify-start">

          <Button 
            type="button" 
            variant="link"
            onClick={() => onCopy(`
              address:${data.address1}, ${data.city}, ${data.stateProvince}, ${data.zipCode}
            `)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Shipping Info
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
