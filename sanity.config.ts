"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";
// import { structureTool } from "sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({ structure }), 
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema(),
  ],
});
