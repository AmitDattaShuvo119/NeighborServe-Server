import React, { useState } from "react"
import { questions } from "./questions"
import SingleQuestion from "./SingleQuestion"

export default function App() {
  const [cards] = useState(questions);

  return (
      
    <>
    
    <section className="max-w-xl mx-auto py-1 px-4 text-center">
    <h1 className="mb-4 text-4xl font-bold">FAQ</h1>
    
        <section className="grid grid-cols-1 gap-4">
          
        
          {cards.map((card, faq) => (
            <SingleQuestion {...card} key={faq} />
          ))}
        </section>
      </section>
    </>
  );
}
