import {json} from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { COUNTRIES } from '../countries';

export const POST: RequestHandler =async({request})=>{
    const body= await request.json();
    const {search} = body


    const filtered = COUNTRIES.filter((country) =>
		country.name.toLowerCase().includes(search.toLowerCase())
	);

	return json(
		{
			countries: filtered
		},
		{
			status: 200
		}
	);
}