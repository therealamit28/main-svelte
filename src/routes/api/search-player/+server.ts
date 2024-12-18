import { searchPlayer, topPlayer } from '$lib/server/db/index.js';
import type { Player } from '$lib/server/db/type.js';
import { json, type RequestHandler } from '@sveltejs/kit';
let players:Player[]=[];
export const GET=(({url}) => {

    const searchTerm=url.searchParams.get('searchTerm')?.toString();

    if(!searchTerm || searchTerm.length<3){
players=topPlayer();
    }
    else{

        players=searchPlayer(searchTerm)??[];
    }
    return json({players});

})satisfies RequestHandler;