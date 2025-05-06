// import Image from "next/image";

import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "../../components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";



export default async function Home({ searchParams }: { searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;

  const params = {search: query || null};
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  

  return (
  <>
    <section className="pink_container">

    <h1 className="heading">PITCH YOUR STARTUP, CONNECT WITH ENTREPRENEURS</h1>

    <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>

    <SearchForm query={query}/>
    </section>
    <section className="section_container">
      <p className="text-30-bold">{query ? `Search Result for '${query}'`  : "All Startups"}</p>
      <ul className="mt-7 card_grid">
        {posts.map((post: StartupCardType) => (
          <StartupCard key={post?._id} post={post}/>
        ))}
      </ul>
    </section>
    <SanityLive />
  </>
   
  );
}


  // const posts = [
  //   {
  //     _createdAt: "2023-01-01",
  //     views: 120,
  //     author: { _id: 1, name: "John Doe", img:"/profile_pic.png" },
  //     _id: "post1",
  //     description: "An innovative startup idea to revolutionize the tech industry.",
  //     image: "/startup1.jpeg",
  //     category: "Technology",
  //     title: "Tech Revolution"
  //   },
  //   {
  //     _createdAt: "2023-02-15",
  //     views: 85,
  //     author: { _id: 2, name: "Jane Smith", img:"/profile_pic.png" },
  //     _id: "post2",
  //     description: "A sustainable solution for modern agriculture.",
  //     image: "/startup2.jpeg",
  //     category: "Agriculture",
  //     title: "Green Farming"
  //   },
  //   {
  //     _createdAt: "2023-03-10",
  //     views: 200,
  //     author: { _id: 3, name: "Mike Johnson", img:"/profile_pic.png" },
  //     _id: "post3",
  //     description: "A platform to connect entrepreneurs with investors.",
  //     image: "/startup3.jpeg",
  //     category: "Business",
  //     title: "Startup Connect"
  //   }
  // ];