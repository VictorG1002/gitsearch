import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'
import { IssuesList, Loading, Owner } from './styles'
import { FaSpinner } from 'react-icons/fa'
import Container from '../../components/Container'

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
    setRepo(repositorie)
    setIssues(issues)
    setLoading(false)

    console.log(repositorie)
    console.log(issues)
  }
  useEffect(() => {
    getResponse()
  }, [])

  return (
    <>
      {loading ? (
        <Loading>
          <FaSpinner color="#FFF" size={40} />
        </Loading>
      ) : (
        <Container>
          <Owner>
            <Link to={'/'}>Voltar para home</Link>
            <img src={repo.data.owner.avatar_url} />
            <h1>{repo.data.full_name}</h1>
            <p>{repo.data.description}</p>
          </Owner>

          <IssuesList>
            {issues.data.map(issue => (
              <li key={issue.id}>
                <img src={issue.user.avatar_url} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={label.id}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssuesList>
        </Container>
      )}
    </>
  )
}

export default Repository
