
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, writeToken } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: writeToken,
});

if(!writeClient.config().token) {
  throw new Error('Missing Token')
}