import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import Loading from './Loading'

// import { Container } from './styles';

function Repository() {
  let { repository } = useParams()
  const [repo, setRepo] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

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
    setRepo(repositorie.data)
    setIssues(issues.data)
    setLoading(false)

    console.log(repositorie)
    console.log(issues)
  }
  useEffect(() => {
    getResponse()
  }, [])

  return <>{loading ? <Loading /> : <h1>Repository: {repository}</h1>}</>
}

export default Repository
