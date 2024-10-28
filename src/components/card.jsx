import React from 'react';
import Link from 'next/link';
import ContentfulImage from '@/components/Contentfulimage';

const Card = ({recipe}) => {
    const { title, timeToCook, thumbnail, slug } = recipe.fields;
    console.log('title', title);
  return (
    <div className='bg-slate-500 p-5'>{title}</div>
  );
};

export default Card;