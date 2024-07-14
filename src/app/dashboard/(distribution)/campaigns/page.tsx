import { Button } from "@/components/ui/button";
import { PlusIcon, ShoppingBagIcon } from "lucide-react";

export default function Reviews() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <section className="bg-white rounded-xl shadow-lg px-6 py-10 flex flex-col justify-center items-center text-center space-y-4">
        <ShoppingBagIcon className="text-primary w-8 h-8"/>
        <h1 className="font-bold text-2xl">No Campaigns Created</h1>
        <p>Put AmazingInfluencers on autopilot with outbound email and SMS review request campaigns to your customers.</p>
        <Button className="space-x-2">
          <PlusIcon />
          Create Campaign
        </Button>
      </section>
    </div>
  )
}