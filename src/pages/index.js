import { client } from "@/lib/contentful";
import Image from "next/image";
import localFont from "next/font/local";


import Recipes from "@/components/Recipes";


export default function Home({ recipes }) {
  console.log('recipes', recipes);
  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <Recipes recipes={recipes}/>
        
      </main>
    </>
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