import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  margin: 16px 0;
  max-width: 100px;
  border: 1px solid rgba(0, 0, 0, .07);
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  padding: ${(props) => props.padding};
  cursor: pointer;
`;

Button.defaultProps = {
  backgroundColor: '#2196f3',
  textColor: '#fff',
  padding: '0.5rem 1rem',
};

export default Button;
