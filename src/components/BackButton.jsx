import React from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <div>
       <Button onClick={(e)=>{
          e.preventDefault();
          navigate(-1)
        }} type="back">&larr; Back</Button>
    </div>
  )
}

export default BackButton
