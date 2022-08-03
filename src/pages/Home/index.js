import React, { useEffect, useState } from 'react'
import { Container, Form, List, SubmitButton, Title } from './styled'
import { FaGithub, FaSpinner } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import api from '../../services/api'
import { Link } from 'react-router-dom'

// import { Container } from './styles';

function Home() {
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(false)

  const getItem = () => {
    const localRepo = localStorage.getItem('repositories')

    if (localRepo) {
      setRepositories(JSON.parse(localRepo))
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await api.get(`/repos/${newRepo}`)
    console.log(response.data)

    const name = response.data.full_name

    localStorage.setItem(
      'repositories',
      JSON.stringify([...repositories, name])
    )
    setRepositories([...repositories, name])
    setNewRepo('')

    setLoading(false)
  }

  return (
    <Container>
      <h1>
        <FaGithub />
        Repositorios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          onChange={e => setNewRepo(e.target.value)}
          value={newRepo}
          type="text"
          placeholder="Digite um repositorio"
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <AiOutlinePlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repository => (
          <li key={repository}>
            <span>{repository}</span>
            <Link to={`/repository/${repository}`}>Detalhes</Link>
          </li>
        ))}
      </List>
    </Container>
  )
}

export default Home
