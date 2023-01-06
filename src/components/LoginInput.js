import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Button from './styled/Button';
import Input from './styled/Input';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onSubmit(event) {
    event.preventDefault();

    login({ email, password });
  }

  return (
    <form className="login-input">
      <Input type="text" value={email} onChange={onEmailChange} placeholder="Email" />
      <Input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <Button type="submit" onClick={(event) => onSubmit(event)}>Login</Button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
