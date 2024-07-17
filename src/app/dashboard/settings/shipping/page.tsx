import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Shipping & Handling</h2>
        <p>
          Charge your customers shipping and handling fees on product giveaways.
        </p>
      </div>
      <div>
        <h2 className="font-bold text-lg">Connect Stripe</h2>
        <p>
          We use Stripe to directly collect shipping/handling fees on behalf of you.
        </p>
      </div>
      <Button className="self-start">
        Connect Stripe Account
      </Button>
    </div>
  )
}