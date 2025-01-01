'use server';

import {
  insertResourceSchema,
  resources,
} from 'lib/db/schema/resources';
import { db } from 'lib/db';
import { generateEmbeddings } from 'lib/ai/embedding';
import { embeddings as embeddingsTable } from 'lib/db/schema/embeddings';
import { RESOURCE_DELIMITER } from 'scripts/pageToText.mjs';

const createSingleResource = async (content: string) => {
  const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

  const embeddings = await generateEmbeddings(content);
  await db.insert(embeddingsTable).values(
    embeddings.map(embedding => ({
      resourceId: resource.id,
      ...embedding,
    })),
  );
}

export const createResource = async (prevState: any, input: FormData) => {
  try {
    const { content } = insertResourceSchema.parse({ content: input.get('content') });

    const inputResources = content.split(RESOURCE_DELIMITER)

    await db.transaction(async () => {
      for (const resource of inputResources) {
        await createSingleResource(resource);
      }
    });
  
      return { message: 'Resource(s) successfully created and embedded.' }; 
  } catch (e) {
    if (e instanceof Error) {
      return { message: (e.message.length > 0 ? e.message : 'Error, please try again.') };
    }

    return { message: 'Error, please try again.' };
  }
};