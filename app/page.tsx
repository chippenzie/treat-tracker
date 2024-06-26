import { auth } from "@/auth"
import Treats from "@/components/treats"
import { getCurrentTimecode } from "@/lib/utils";

export default async function Index() {
  const session = await auth();
  

  const thisInterval = getCurrentTimecode();

  /*
  const dayOfYear = (date: any) => {
    const yearDate:any = new Date(date.getFullYear(), 0, 0);
    // period - 1 year
    //return  date.getFullYear() + ':' + Math.floor((date - yearDate) / (1000 * 60 * 60 * 24 ));
    // period - 30 seconds
    return  date.getFullYear() + ':' + Math.floor((date) / (1000 * 30 ));
  }
  */
  const userId = session?.user?.id;


  return (

    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">oh gnar</h1>
      <Treats user={userId}/>
    </div>
  )
}
