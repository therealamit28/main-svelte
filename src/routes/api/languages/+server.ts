import {json} from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { getLanguageData } from '$lib/server/db'

export const GET = (({ url }) => {
    const languagesParam = url.searchParams.get('languages');
  
    let languagesToQuery: string[] = [];
    if (languagesParam) {
      languagesToQuery = languagesParam.split(',').map(lang => lang.trim());
    }
  
    if (languagesToQuery.length === 0) {
      return json({ languages: [] });
    }
  
    const languages = getLanguageData(languagesToQuery);
    return json({ languages });
  }) satisfies RequestHandler;
  