import React from 'react'
import { useDailogAtom,ACTIONS } from '../store/DailogStore'
import Button from './Button'

export default function ConfirmationDailog() {
  const [{messege,handleOnYes,handleOnNo},setDailog]=useDailogAtom()
  function handleConfirm(yes) {
    if (yes) {
      handleOnYes()
      setDailog({ type: ACTIONS.CLEAR});
    } else {
      handleOnNo()
      setDailog({ type: ACTIONS.CLEAR});
    }
  }
  return (
    <div className='z-[100]  h-screen w-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex items-center justify-center'>
      <div className='bg-white flex flex-col items-center  px-8 py-6 gap-6 rounded-xl text-xl'>
        <div>{messege}</div>
        <div className='flex gap-5'>
          <Button  content="Yes" mobile="" onClick={()=>{handleConfirm(true)}} />
          <Button  reverse={true} content="No" onClick={()=>{handleConfirm(false)}}/>
        </div>
      </div>
    </div>
  )
}
