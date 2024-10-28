import { client } from "@/lib/contentful";
import Image from "next/image";
import localFont from "next/font/local";

import Card from "@/components/card";


export default function Home({ recipes }) {
  console.log('recipes', recipes);
  return (
    <div
      className={` grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {recipes.map((recipe, i) => (
          <Card key={i} recipe={recipe}/>
        ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       <p>test footer</p>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: response.items,
      revalidate: 70,
    }
  };
}