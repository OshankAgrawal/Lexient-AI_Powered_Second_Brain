import CanvasCursor from './components/CanvasCursor';
import React from 'react'
import heropng from "../assets/hero.png"
import AdvantagesSectionCards from './components/AdvantagesSectionCards'

function HomePage() {
  return (
    <main className=''>
      <CanvasCursor/>
      <section className='hero-sec-cont text-center px-70'>
        <h1 className='text-5xl mt-12 font-semibold text-secondary-text'>Trying to memorize everything, but nothing is actually sticking</h1>
        <h2 className='text-3xl mt-8 text-secondary-text'>Master the art of effortless, long-term retention with</h2>
        <h2 className='text-3xl mt-2 text-primary-text font-semibold'>AI Intelligent Flash Cards</h2>
        <p className='text-xl mt-8 text-secondary-text'>Lexient helps you to manage your study materials by creating flashcards so that you spend more time on learning, rather than organizing materials.</p>
      </section>
      <section className='hero-sec-cont mb-10'>
        <h2 className='text-center text-5xl font-medium text-primary-text'>Advantages</h2>
        <p className='text-center mt-2 text-lg font-semibold text-secondary-text'>Here are the few reasons why you should use lexient</p>
        <div className='flex flex-wrap mt-7 justify-center px-50'>

          {/* Advantage Cards */}
          <AdvantagesSectionCards title="Media Support" content="Audio, Video, Text, Document can be used in your flashcards"/>

          <AdvantagesSectionCards title="Personal Assistant" content="You can chat to your own personal assistant"/>

          <AdvantagesSectionCards title="Growth Matrix" content="Shows how you are performing in form of heatmaps, knowledge graphs etc."/>

          <AdvantagesSectionCards title="Optimization" content="Lexient can handle 1000+ documents and 10000+ flashcards without problem."/>

          <AdvantagesSectionCards title="Secure" content="All your personal documentsare with you Lexient doesn't collect any data."/>
          
          <AdvantagesSectionCards title="Customization" content="Easily change your time of review of flashcards"/>

        </div>
      </section>
    </main>
  )
}

export default HomePage