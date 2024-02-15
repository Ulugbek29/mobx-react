import React, { useState } from 'react'
import Button from '@mui/material/Button';

export default function EditTodo({editState, setEditState=()=>{},setTodoId=()=>{}, editSubmit=()=>{}}) {




  return (
    <div className='flex gap-2'>
        <input value={editState} onChange={(e)=> setEditState(e.target.value)} className='border-2 py-2 px-4 rounded-lg'/>
        <div className='flex gap-2'>
        <Button onClick={()=>setTodoId(null)} variant="contained">Cancel</Button>
        <Button onClick={editSubmit} variant="contained">Save</Button>
        </div>
    </div>
  )
}
