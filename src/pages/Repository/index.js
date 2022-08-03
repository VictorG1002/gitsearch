import React from 'react'
import { useParams } from 'react-router-dom'

// import { Container } from './styles';

function Repository() {
  let { repository } = useParams()

  return <h1>Repository: {repository}</h1>
}

export default Repository
