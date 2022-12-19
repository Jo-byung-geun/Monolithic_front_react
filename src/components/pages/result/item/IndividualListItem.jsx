import React from 'react'

const IndividualListItem = (props) => {
    const{answer, onClick} = props;

  return ( 
    <div className='py-1 rounded-md cursor-pointer bg-gray-200 hover:opacity-75' onClick={onClick}>
        <h2 className="pt-1 text-2xl text-center font-bold tracking-tight text-gray-900">{answer.id} 번 응답</h2>
    </div>
  )
}

export default IndividualListItem;
