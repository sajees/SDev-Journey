import { useRouter } from "next/router";
import Link from "next/link";
import { client } from "@/lib/contentful";

import ContentfulImage from "@/components/Contentfulimage";
import Carddetail from "@/components/Carddetail";
import RichText from "@/components/RichText";

const Recipe = ({ recipe }) => {
    const router = useRouter();
    const { banner, title, procedure, recipeBy, timeToCook } = recipe.fields;
    console.log('title' , recipeBy);

    return (
        <>
        <section className='w-full py-8'>
      <div className="container max-w-[970px] mx-auto px-4">
        <div className='row'>
          <div className='col'>
        <article>
            {router.isFallback ? (
                <>Loading...</>
            ) : (
                <Carddetail>
                    <div className='w-full flex flex-col'>
                    <h1 className='text-2xl font-bold mt-4 mb-3 md:mb-5'>{title}</h1>
                        <div className="bg-slate-50 border p-2 rounded-xl">
                        <figure className="w-full aspect-video overflow-hidden">
                            <ContentfulImage 
                                src={banner.fields.file.url}
                                alt={banner.fields.description}
                                width={banner.fields.file.details.image.width} 
                                height={banner.fields.file.details.image.height} 
                                classes="w-full object-cover w-full h-full"
                                quality={85}
                                priority
                            />
                            </figure>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 sm:mb-7 mt-4 sm:mt-4">
                            <div className="flex gap-x-2 items-center mb-2 sm:mb-auto">
                                <figure className="rounded-full overflow-hidden w-[42px] h-[42px]">
                                    <ContentfulImage 
                                        src={recipeBy.fields.image.fields.file.url}
                                        alt={recipeBy.fields.image.fields.description}
                                        classes="object-cover w-full h-full"
                                        width={42} 
                                        height={42} 
                                        quality={100}
                                        priority
                                    />
                                </figure>
                                <span className="text-sm">Recipe by: {recipeBy.fields.name}</span>
                            </div>
                            <p className='text-sm font-medium mt-auto sm:mb-auto'>Cooking Time: {timeToCook}m</p>
                        </div>
                        <RichText content={ procedure }/>
                    </div>
                </Carddetail>
            )}
        </article>
        </div>
        </div>
        </div>
        </section>
        </>
    );
};

export const getStaticProps = async ({ params, preview = false }) => {
    const currentClient = preview ? previewClient : client;
    const { slug } = params;
    const response = await currentClient.getEntries({
        content_type: "recipe",
        "fields.slug": slug,
    });

    if( !response?.items?.length ) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: {
            recipe: response?.items?.[0],
            revalidate: 60,
        }
    };

}

export const getStaticPaths = async () => {
    const response = await client.getEntries({ content_type: "recipe" });
    const paths = response.items.map((item) => ({
        params: { slug: item.fields.slug },
    }));

    return {
        paths,
        fallback: true,
    };
};

export default Recipe;