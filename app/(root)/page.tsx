// This is the main page of the application, which displays a list of startups and a search form.
// It fetches data from a Sanity CMS and displays it using the StartupCard component.
// It also includes a live update feature using the SanityLive component.
// The page is styled using CSS classes and includes a heading and subheading.
// The page is designed to be responsive and user-friendly, allowing users to easily search for and view startup information.

import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "../../components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const params = { search: query || null };
  const session = await auth();

  console.log("session", session?.id);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          PITCH YOUR STARTUP, CONNECT WITH ENTREPRENEURS
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-bold">
          {query ? `Search Result for '${query}'` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.map((post: StartupCardType) => (
            <StartupCard key={post?._id} post={post} />
          ))}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
