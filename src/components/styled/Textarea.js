import styled from 'styled-components';

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  margin: 8px 0;
  font-size: 20px;
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, .07);
  padding: ${(props) => props.padding};
`;

Textarea.defaultProps = {
  padding: '0.5rem 1rem',
};

export default Textarea;
