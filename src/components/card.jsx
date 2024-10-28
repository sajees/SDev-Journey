import React from 'react';
import Link from 'next/link';
import ContentfulImage from '@/components/Contentfulimage';

const Card = ({recipe}) => {
    const { title, timeToCook, thumbnails, slug } = recipe.fields;
    console.log('title', title);
    console.log('thumbnail', thumbnails);
  return (
    <div className='w-full md:w-1/3 bg-slate-50 border py-8 px-10 rounded-xl flex flex-col'>
      <ContentfulImage 
          src={thumbnails.fields.file.url}
          alt={thumbnails.fields.description}
          width={600} 
          height={400} 
          quality={96}
          priority
      />
      <h3 className='text-lg font-bold mt-4 mb-3'>Name: {title}</h3>
      <p className='text-md font-medium mt-auto'>Cooking Time: {timeToCook}</p>
      </div>
  );
};

export default Card;