import { getPlayerByIdName } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import {error} from "@sveltejs/kit";


type RouteParams = {
    nameId: string;
    playerName: string;
};
export const load:PageServerLoad= function ({ params ,url,setHeaders}) {
    const nameId = parseInt(params.nameId);
    const playerName = params.playerName;
    const player = getPlayerByIdName(nameId,playerName);

    if (player && !player.Imageurl) {
        player.Imageurl='/path/to/default.jpg';
}


    if (!player) {
    console.error(`Player not found with ID : ${nameId} and Name : ${playerName}`);
    throw error (404, `Player with ID : '${nameId}' and Name : '${playerName}' not found`);
    }

    setHeaders({ 

        'Cache-Control':'Cache-Control'
    });

    return {
        player
       
    };
    };