import { topPlayer } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

 const loadFunction=(()=>{

    const players = topPlayer();
    return{
        players
    }


}) satisfies PageServerLoad

export {loadFunction as load}