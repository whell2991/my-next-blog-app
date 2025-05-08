import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";


const md = markdownit()

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const posts = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  if (!posts) return notFound();

  const parsedContent = md.render(posts.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[240px]">
        {" "}
        {/* Startup Details Header*/}
        <p className="tag">{formatDate(posts?._createdAt)}</p>
        <h1 className="heading">{posts.title}</h1>
        <p className="sub-heading !max-w-5xl">{posts.description}</p>
      </section>
      <section className="section_container">
        {" "}
        {/* Startup Details Image */}
        <Image
          src={posts.image}
          alt="Startup Thumbnail"
          className="w-full h-auto rounded-xl"
          width={800}
          height={600}
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${posts.author?._id}`}
              className="flex gap-2 items-center mb-3 "
            >
              <Image
                src={posts.author?.image || "@/public/default-profile.jpg"}
                alt="Author Avatar"
                className="rounded-full drop-shadow-lg"
                width={64}
                height={64}
              />
              <div className="flex-col gap-1">
                <p className="text-20-medium">{posts.author.name}</p>
                <p className="text-16-medium !text-black-300">@{posts.author.username}</p>
              </div>
            </Link>
            <p className="category-tag">{posts.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
                className="prose dark:prose-invert max-w-4xl break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ): (
            <p className="text-16-medium">No pitch details available.</p>)}
        </div>
        <hr className="divider"/>
        {/* TODO: Editor Selected Startups */}

        <Suspense fallback={<Skeleton className="view_skeleton"/>}>
        <View id={id}/>
        </Suspense>
      </section>
      
    </>
  );
};

export default page;
