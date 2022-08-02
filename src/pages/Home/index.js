import React from 'react'
import { Container, Form, SubmitButton, Title } from './styled'
import { FaGithub, FaPlug } from 'react-icons/fa'

// import { Container } from './styles';

function Home() {
  return (
    <Container>
      <h1>
        <FaGithub />
        Repositorios
      </h1>
      <Form>
        <input
          onChange={() => {}}
          type="text"
          placeholder="Digite um repositorio"
        />

        <SubmitButton>
          <FaPlug color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  )
}

export default Home
