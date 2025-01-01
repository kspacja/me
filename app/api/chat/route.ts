import { openai } from '@ai-sdk/openai';
import { CoreMessage, streamText, tool } from 'ai';
import { findArtists, findRelevantContent } from 'lib/ai/embedding';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: CoreMessage[] };

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    maxSteps: 3,
    maxRetries: 5,
    system: `
      - you are inclued on my page - ${process.env.NEXT_PUBLIC_WEBSITE_URL}
      - you are a search engine for music informations on my page
      - refuse to answer questions that are not related to music - tell the user that you can't help them
      - if you are asked about artist:
        - always retrive all lists the artist is included in
        - add sources URLs to my page - it is a must
      - when you found related music features:
        - don't go back to lists
        - summarize them
        - add sources URLs to my page - it is a must
        - if you can't find anything related to the user's question:
          - tell the user that you couldn't find anything
          - ask the user for a different question
      - translate response to the user's language
      - guess source URLs - based on File Names from content - they are path names in nextjs project (app route)

      EXAMPLES:
      - User: Tell me about artist X 
        - and remember to mention all songs or albums they are included in 
        - search carefully for lists - you should write down ALL of them 
      - Assistant: X is included in the following lists:
        - [list 1](source URL) with X's songs: [song 1 on place A., song 2 on place B., ...]
        - [list 2](source URL) with X's songs: [song 3 on place C., song 4 on place D. ...]
        - [list 3](source URL) with X's albums: [album 1 on place E, album 2. on place F, ...]
        - ...
        - [list N](source URL) with ...: [...]      
    `,
    tools: {
      getMusicFeatureAndLists: tool({
        description: `get music features and lists related to the user's question - if you are not sure search for both`,
        parameters: z.object({
          keyword: z.string().describe('keyword - could be an artist name or a user query'),
          searchType: z.enum(['list', 'features', 'both']).describe('search type'),
        }),
        execute: async function ({ keyword, searchType }) {
          console.log({ searchType, keyword });

          switch (searchType) {
            case 'list':
              return findArtists(keyword);
            case 'features':
              return findRelevantContent(keyword);
            case 'both':
              const lists = await findArtists(keyword);
              const features = await findRelevantContent(keyword);
              return { lists, features };
          }
        } 
      })
    },
  });

  return result.toDataStreamResponse();
}