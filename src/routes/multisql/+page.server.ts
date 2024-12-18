import type { PageServerLoad } from './$types';
import { getLanguageData } from '$lib/server/db';

export const load: PageServerLoad = async ({url}) => {
    const languagesParam =url.searchParams.get('languages');

const languagesToQuery=languagesParam ? languagesParam.split(',').map((lang: string)=>lang.trim())
:['javascript','python' ,'C' , 'java'];

const languages=getLanguageData(languagesToQuery)
const fetchedLanguageNames =new Set(
    languages.map((lang: { Language: string; })=> lang.Language.toLowerCase())

);

const notFoundLanguages = languagesToQuery.filter(
    (lang: string) => !fetchedLanguageNames.has(lang.toLowerCase())
  );
    return{
   languages,
   notFoundLanguages,
   languagesToQueryStr:languagesToQuery.join(',')
    }
}