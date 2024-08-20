"use client";

import { ReviewsSchema } from "@/app/api/reviews/create/route";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { getAllReviews } from "@/lib/data";
import { ShippingInfo } from "./components/shipping";
import { ReviewerInfo } from "./components/reviewer"

import { useUser } from "@clerk/nextjs";
import { ClipboardCheckIcon, StarIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import useSwr from 'swr';

export default function ReviewTable() {
  const { user } = useUser();
  const { data: reviews } = useSwr<ReviewsSchema[], any, any>(user?.primaryEmailAddress?.emailAddress, getAllReviews)
  
  if (!reviews) return (
    <div className="w-full flex flex-col justify-center items-center">
      <section className="w-full bg-white rounded-xl shadow-lg px-6 py-10 flex flex-col justify-center items-center text-center space-y-4">
        <StarIcon className="text-primary w-8 h-8"/>
        <h1 className="font-bold text-2xl">No Reviews Collected</h1>
        <p>
          Waiting for someone to respond to a &nbsp;
          <Link href={"/dashboard/surveys"} className="text-primary hover:text-primary hover:underline">survey</Link>?
        </p>
        <p>
          Looking for &nbsp;
          <Link href={"/dashboard/surveys"} className="text-primary hover:text-primary hover:underline">Incomplete Submissions</Link>?
        </p>
      </section>
    </div>
  )
  if (reviews) return (
    <div className="shadow-md rounded-xl overflow-auto grid">
      <Table className="shadow-md rounded-xl">
        <TableHeader className="bg-[#F3F4F6]">
            <TableRow className="text-[#343A40] font-bold *:min-w-max *:text-nowrap">
              <TableCell>Rating</TableCell>
              <TableCell className="max-w-xs">Review</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Survey Code</TableCell>
              <TableCell>Chosen Giveaway</TableCell>
              <TableCell>Order Number</TableCell>
              <TableCell>View Shipping Info</TableCell>
              <TableCell>View Reviewer Info</TableCell>
            </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {reviews?.map((review: ReviewsSchema) => (
            <TableRow key={review.id} className="font-medium">
              <TableCell><Rating stars={review.rating} /></TableCell>
              <TableCell className="max-w-xs hyphens-auto">{review.review}</TableCell>
              <TableCell>{review.date?.toString()}</TableCell>
              <TableCell>{review.survey?.surveyCode}</TableCell>
              <TableCell>{review.giveaway?.name}</TableCell>
              <TableCell>{review.orderNum}</TableCell>
              <TableCell className="text-center">
                <ShippingInfo data={review.shippingInfo}>
                  <Button >
                    <TruckIcon />
                  </Button >
                </ShippingInfo>
              </TableCell>
              <TableCell className="text-center">
                <ReviewerInfo data={review.reviewerInfo}>
                  <Button >
                    <ClipboardCheckIcon />
                  </Button>
                </ReviewerInfo>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Rating({ stars }: { stars: number }) {
  return(
    <div className="flex justify-stretch flex-nowrap">
      {[...Array(5)].map((val, index) => (
        <StarIcon 
          key={index}
          style={{
            color: 
              index + 1 <= stars
                ? "#ffc107"
                : "#e4e5e9"
          }}
        />
      ))}
    </div>
  )
}