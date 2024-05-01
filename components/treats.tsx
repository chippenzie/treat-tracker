import { fetchUserTreats } from "@/lib/data"

export default function Treats(props:any) {
    const userId = props?.user;
    if (!userId) {
        return;
    } 

    const currentTreats = fetchUserTreats(userId);


    return  <div>
        <h2>Treats</h2>
        <div>placeholder </div>
        <div>currentTreats <br />
        {JSON.stringify(currentTreats, null, 2)}</div>

        <div> <a href="/newtreat"> create a treat </a></div>
   </div>
}
