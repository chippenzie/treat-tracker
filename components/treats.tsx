import { fetchUserTreats } from "@/lib/data"
import { getUserId } from "@/lib/utils";
import { Button } from "@/app/ui/button";

export default async function Treats(props:any) {
    const currentTreats = await fetchUserTreats();

   // console.log(currentTreats)
    return  <div>
        <h2>Treats</h2>

        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(currentTreats)}
        </pre>

        <Button><a href="/newtreat"> create a treat </a></Button>
    </div>
}
