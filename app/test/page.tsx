"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // أو المسار الفعلي اللي عندك
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default function TestClient() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    client
      .fetch(`*[_type == "startup"]`)
      .then((data) => {
        console.log("DATA:", data); // <-- شوف الكونسول
        setData(data);
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setError(err.message);
      });
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sanity Data Test</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item._id} className="border-b py-2">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.category}</p>
          </div>
        ))
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}
