import styled from 'styled-components';

const InputContainer = styled.div`
    margin-top: ${(props) => props.marginTop};
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    padding: ${(props) => props.padding};
`;

InputContainer.defaultProps = {
  marginTop: '16px',
  backgroundColor: 'transparent',
  padding: '1rem',
  textColor: 'black',
};

export default InputContainer;
