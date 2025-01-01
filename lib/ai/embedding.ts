import { embed, embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import { cosineDistance, desc, inArray, gt, sql, ilike } from 'drizzle-orm';
import { db } from 'lib/db';
import { embeddings as embeddingsTable } from 'lib/db/schema/embeddings';
import {resources} from '../db/schema/resources';

const embeddingModel = openai.embedding('text-embedding-ada-002');

const generateChunks = (input: string, minChunkSize = 50): string[] => {
  let chunkBuffor = ''

  return input
    .trim()
    .split(/\s/g)
    .filter(chunk => chunk.trim() !== '')
    .map(chunk => {
      if (chunk.length >= minChunkSize) {
        return [chunkBuffor, chunk];
      }

      if (chunk.length + chunkBuffor.length < minChunkSize) {
        chunkBuffor += ` ${chunk}`;
        return null;
      } else {
        const newChunk = `${chunkBuffor} ${chunk}`
        chunkBuffor = '';
        return newChunk;
      }
    })
    .flat()
    .filter(Boolean)
    .map(chunk => chunk.trim());
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\\n', ' ');
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddingsTable.embedding,
    userQueryEmbedded,
  )})`;
  const similarGuides = await db
    .select({ similarity, resourceId: embeddingsTable.resourceId, name: embeddingsTable.content })
    .from(embeddingsTable)
    .where(gt(similarity, 0.8))  
    .orderBy(t => desc(t.similarity))
    .limit(5);

  console.log(similarGuides);
  
  const resourcesIds = new Set(similarGuides.map(guide => guide.resourceId).filter(Boolean));

  const similarGuidesContent = await db
    .select({ id: resources.id, content: resources.content })
    .from(resources)
    .where(inArray(resources.id, Array.from(resourcesIds)))
    .orderBy(t => desc(t.id));

  return similarGuidesContent.map(guide => guide.content);
};

export const findArtists = async (artist: string) => {
  const embeddings = await db
    .select({ resourceId: embeddingsTable.resourceId, content: embeddingsTable.content })
    .from(embeddingsTable)
    .where(ilike(embeddingsTable.content, `%${artist}%`))  
    .limit(5);

  console.log(embeddings);

  const resourcesIds = new Set(embeddings.map(embedding => embedding.resourceId).filter(Boolean));

  const resourcesOutput = await db
    .select({ id: resources.id, content: resources.content })
    .from(resources)
    .where(inArray(resources.id, Array.from(resourcesIds)))
    .orderBy(t => desc(t.id));

  return resourcesOutput.map(resource => resource.content);
}
