import { fetchUserTreats } from "@/lib/data"
import { Button, TreatYoSelf } from "@/app/ui/buttons";
import { timeCodeToTime, getCurrentTimecode } from "@/lib/utils";

export default async function Treats(props:any) {
    const currentTreats = await fetchUserTreats();
    const nowTimeCode = getCurrentTimecode();

   // console.log(currentTreats)
    return  <div>
        <h2>Treats</h2>

        <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                 Treat
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Started On
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Treats Treated
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                 Treats to Treat
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentTreats?.map((treat) => (
                <tr
                  key={treat.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{treat.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {timeCodeToTime(treat.start_on).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {treat.treatcount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {Math.floor((nowTimeCode - treat.start_on) / treat.period)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                        <TreatYoSelf id={treat.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        <Button><a href="/newtreat"> create a treat </a></Button>
    </div>
}
