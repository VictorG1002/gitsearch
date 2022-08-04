import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

// import { Container } from './styles';

function Repository() {
  let { repository } = useParams()
  const [repo, setRepo] = useState({})
  const [issues, setIssues] = useState([])

  const getResponse = async () => {
    const [repositorie, issues] = await Promise.all([
      api.get(`/repos/${repository}`),
      api.get(`/repos/${repository}/issues`),
      {
        params: {
          state: 'open',
          per_page: 4
        }
      }
    ])
    console.log(repositorie)
    console.log(issues)
  }
  useEffect(() => {
    getResponse()
  }, [])

  return <h1>Repository: {repository}</h1>
}

export default Repository
