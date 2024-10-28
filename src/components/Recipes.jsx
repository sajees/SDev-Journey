import React from 'react';
import Card from "@/components/card";

const Recipes = ({recipes}) => {
  return (
    <section className='w-full py-8'>
      <div className="container mx-auto">
        <div className='row'>
          <div className='col'>
            <div className='w-full text-center text-3xl font-bold mb-10'>
                <h1>Woo Recipes</h1>
            </div>
            <div className='flex flex-wrap justify-center gap-[20px]'>
                {recipes.map((recipe, i) => (
                <Card key={i} recipe={recipe}/>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recipes