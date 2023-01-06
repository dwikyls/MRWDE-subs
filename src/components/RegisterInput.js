import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Button from './styled/Button';
import Input from './styled/Input';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onSubmit(event) {
    event.preventDefault();

    register({ name, email, password });
  }

  return (
    <form className="register-input">
      <Input type="text" value={name} onChange={onNameChange} placeholder="Nama" />
      <Input type="text" value={email} onChange={onEmailChange} placeholder="Email" />
      <Input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <Button type="submit" onClick={(event) => onSubmit(event)}>Register</Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
