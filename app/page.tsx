import { auth } from "@/auth"

export default async function Index() {
  const session = await auth();
  

  const thisInterval = Math.floor(Number(new Date()) / (1000 * 30))

  /*
  const dayOfYear = (date: any) => {
    const yearDate:any = new Date(date.getFullYear(), 0, 0);
    // period - 1 year
    //return  date.getFullYear() + ':' + Math.floor((date - yearDate) / (1000 * 60 * 60 * 24 ));
    // period - 30 seconds
    return  date.getFullYear() + ':' + Math.floor((date) / (1000 * 30 ));
  }
  */


  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">waffles!</h1>
      <div className="flex flex-col rounded-md bg-neutral-500">
        <div className="p-4 font-bold rounded-t-md bg-neutral-200">
          Current Session
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(thisInterval, null, 2)}
        </pre>
      </div>
    </div>
  )
}
