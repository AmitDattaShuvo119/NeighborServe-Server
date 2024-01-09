import { useState } from "react"
import "./membership.css"

function App() {
  const [annually, setAnnually] = useState(false)

  return (
    <>
      
      <section className="p-5 lg:flex lg:flex-col items-center justify-center lg:h-screen">
        <h1 className="text-center text-slate-700 mb-8 text-6xl">
          Our Pricing
        </h1>
        
        <div className="toggle lg:mb-10 lg:flex lg:flex-row">
        <label class="label1">Annually</label>
          <input
            type="checkbox"
            class="checkbox"
            id="checkbox"
            checked={annually}
            onChange={() => setAnnually(!annually)}
          />

          <label for="checkbox" class="label">
            <div class="ball"></div>
          </label>

          <label class="label1">Monthly</label>
        </div>

        <div className="flex flex-wrap flex-col justify-center gap-8 text-center max-w-6xl mx-auto lg:gap-0 lg:flex-row lg:flex-nowrap lg:w-full">
          <article className="p-8 rounded bg-white shadow lg:w-full">
            <h2 className="text-slate-700 text-xl mb-5">Basic</h2>
            {annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">৳</span> 0.00
              </h3>
            )}
            {!annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">৳</span> 0.00
              </h3>
            )}
            <ul className="flex justify-center flex-col my-8">
              <li className="border-t border-slate-300 py-3 text-slate-600">
              Can Search
              </li>
              <li className="border-t border-slate-300 py-3 text-slate-600">
              Can use recommendation only 5 time per month
              </li>
              <li className="border-y border-slate-300 py-3 text-slate-600">
              One service at a time
              </li>
            </ul>
            <button className="linear-gradient btn text-white py-3 w-full rounded-lg shadow uppercase cursor-pointer border-2 hover:border-2">
              Claimed
            </button>
          </article>

          <article className="linear-gradient p-8 rounded shadow lg:w-full lg:scale-110">
            <h2 className="text-xl mb-5 text-white">Professional</h2>
            {annually && (
              <h3 className="flex items-center justify-center text-white text-5xl">
                <span className="text-3xl mr-3">৳</span> 100.00
              </h3>
            )}
            {!annually && (
              <h3 className="flex items-center justify-center text-white text-5xl">
                <span className="text-3xl mr-3">৳</span> 1200.00
              </h3>
            )}
            <ul className="flex justify-center flex-col my-8">
              <li className="text-white border-t border-white py-3">
              Suggest more experienced provider
              </li>
              <li className="text-white border-t border-white py-3">
              Can use recommendation 20 times per month
              </li>
              <li className="text-white border-y border-white py-3">
              Multiple services at a time
              </li>
            </ul>
            <button className="bg-white text-slate-800 py-2 w-full rounded-lg shadow border-2 border-white uppercase cursor-pointer hover:bg-transparent hover:text-white transition-all duration-200">
              Purchase
            </button>
          </article>

          <article className="p-8 rounded bg-white shadow lg:w-full">
            <h2 className="text-slate-700 text-xl mb-5">Master</h2>
            {annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">৳</span> 300.00
              </h3>
            )}
            {!annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">৳</span> 3600.00
              </h3>
            )}
            <ul className="flex justify-center flex-col my-8">
              <li className="border-t border-slate-300 py-3 text-slate-600">
              Get access of urgent service booking
              </li>
              <li className="border-t border-slate-300 py-3 text-slate-600">
              Can use recommendation unlimited
              </li>
              <li className="border-y border-slate-300 py-3 text-slate-600">
              Multiple services at a time
              </li>
            </ul>
            <button className="linear-gradient btn text-white py-3 w-full rounded-lg shadow uppercase cursor-pointer border-2 hover:border-2">
              Purchase
            </button>
          </article>
        </div>
      </section>

      
    </>
  )
}

export default App
