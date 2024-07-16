import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Developers</h2>
        <p>
          Generate API keys for your custom integrations. &nbsp;
          <Link href={""} className="text-primary underline hover:text-primary/90">API Docs</Link></p>
      </div>
      <hr />
      <Button className="self-start">
        Generate API Keys
      </Button>
    </div>
  )
}