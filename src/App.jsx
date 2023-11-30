import React, { useState } from 'react';
import * as yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';

const validationSchema = yup.object({
  nome: yup.string().matches(/^[a-zA-Z\s]+$/, 'Nome não pode ter números').required('Campo obrigatório'),
  endereco: yup.string().required('Campo obrigatório'),
  telefone: yup.string().matches(/^[0-9]+$/, 'Somente números').required('Campo obrigatório'),
  email: yup.string().email('Formato de e-mail inválido').required('Campo obrigatório'),
  dataNascimento: yup.date().max(new Date(), 'Data inválida').required('Campo obrigatório'),
});

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    dataNascimento: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    dataNascimento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    yup
      .reach(validationSchema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de envio dos dados
    console.log(formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Teste Formulário
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="nome"
              name="nome"
              label="Nome"
              value={formData.nome}
              onChange={handleChange}
              error={Boolean(errors.nome)}
              helperText={errors.nome}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="endereco"
              name="endereco"
              label="Endereço"
              value={formData.endereco}
              onChange={handleChange}
              error={Boolean(errors.endereco)}
              helperText={errors.endereco}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="telefone"
              name="telefone"
              label="Telefone"
              value={formData.telefone}
              onChange={handleChange}
              error={Boolean(errors.telefone)}
              helperText={errors.telefone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="E-mail"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="dataNascimento"
              name="dataNascimento"
              label="Data de Nascimento"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dataNascimento}
              onChange={handleChange}
              error={Boolean(errors.dataNascimento)}
              helperText={errors.dataNascimento}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App
