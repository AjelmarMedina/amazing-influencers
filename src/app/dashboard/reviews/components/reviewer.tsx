import React from 'react'
import { Copy, UserIcon } from 'lucide-react'

import { type ReviewerSchema } from '@/lib/types'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ReviewerInfoProps {
  children: React.ReactNode,
  data: ReviewerSchema,
}

export const ReviewerInfo:React.FC<ReviewerInfoProps> = ({ children, data }) => {
  const { toast } = useToast()
  const onCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast({ description:'Reviewer information copied to clipboard.'});
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Reviewer Information</DialogTitle>
        </DialogHeader>
          <div className="flex space-x-2 py-10 w-full">
            <div className="rounded-full mx-10 bg-gray-300 text-black w-12 h-12 flex items-center justify-center">
              <UserIcon />
            </div>
            <div className="text-lg ">
              <h4 className="font-medium">
                {data.name}
              </h4>
              <p className="text-muted-foreground">{data.email}</p>
              <p className="text-muted-foreground">{data.phone}</p>
            </div>
          </div>
        <DialogFooter className="sm:justify-start">

          <Button 
            type="button" 
            variant="link"
            onClick={() => onCopy(`
              Reviewer:${data.name}, ${data.email}, ${data.phone},
            `)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy reviewer info
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
