import React, { useState, useCallback, useEffect } from 'react';
import { Container, Form, SubmitButton, List, DeleteButton } from './styled';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import {Link} from 'react-router-dom';

import api from '../../services/api';

export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Didmount - buscar

  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }

  }, []);

  //didupdate - salvar alterações.

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  function handleinputChange(e){
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit(){
    setLoading(true);
    setAlert(null);
    try{
      if(newRepo === ''){
        throw new Error('Você precisa indicar um repositório.');
      }

      const response = await api.get(`repos/${newRepo}`)

      const hasRepo = repositorios.find(repo => repo.name === newRepo);

      if(hasRepo){
        throw new Error('Repositório duplicado.');
      }

    const data = {
      name: response.data.full_name,
    }

    setRepositorios([...repositorios, data]);
    setNewRepo('');
    }catch(error){
      setAlert(true);
      console.log(error);
    }finally{
      setLoading(false);
    }

    }

    submit();
  }, [newRepo, repositorios]);

  return(
    <div>
      <Container>
      <h1>
      <FaGithub size={25} />
       Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input type='text' placeholder='Adicionar Repositórios' value={newRepo} onChange={handleinputChange}/>

        <SubmitButton Loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color='#fff' size={14} />
            ) : (
              <FaPlus color='#fff' size={14} />  
            )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>
            <DeleteButton onClick={() => handleDelete(repo.name)}>
              <FaTrash size={14} />
            </DeleteButton>
            {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}><FaBars size={20} /></Link> 
          </li>
        ))}  
      </List>
      </Container>
    </div>
  )
}