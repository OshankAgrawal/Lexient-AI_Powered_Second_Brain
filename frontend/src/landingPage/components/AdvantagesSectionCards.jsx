import React from 'react'

function AdvantagesSectionCards({title, content}) {
  return (
    <div className='adv-cards transition duration-300 ease-in-out hover:-translate-y-2'>
        <h3 className='adv-cards-heading'>{title}</h3>
        <p>{content}</p>
    </div>
  )
}

export default AdvantagesSectionCards