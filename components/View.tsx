import React from 'react'
import Ping from './Ping'
import { STARTUPS_VIEWS_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';


const View = async ({ id } : { id: string }) => { // Fetch the startup ID from props
    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUPS_VIEWS_QUERY, { id }); // Fetch the current views count

    after( async () => await writeClient.patch(id).set({ views: totalViews + 1}).commit()) // Increment the views count by 1
  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping />
        </div>
        <p className="view-text">
            <span className="font-extrabold">{totalViews} Views</span>
        </p>
    </div>
  )
}

export default View