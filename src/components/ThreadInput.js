import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Button from './styled/Button';
import Input from './styled/Input';
import Textarea from './styled/Textarea';
import InputContainer from './styled/InputContainer';

function ThreadInput({ addThread, type }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [body, , setBody] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');

  const onAddThread = () => {
    if (body.trim()) {
      addThread(title, body, category);
      setTitle('');
      setBody('');
      setCategory('');
    }
  };

  const onBodyChange = ({ target }) => {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  };

  const backgroundColor = {
    light: 'white',
    dark: 'black',
  };

  const textColor = {
    light: 'black',
    dark: 'white',
  };

  return (
    <InputContainer backgroundColor={backgroundColor[type]} textColor={textColor[type]}>
      <h3>Ada cerita menarik hari ini?</h3>
      <Input type="text" placeholder="Judul" value={title} onChange={onTitleChange} />
      <Textarea type="text" placeholder="Konten" value={body} onChange={onBodyChange} />
      <p className="thread-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <Input type="text" placeholder="#Kategori" value={category} onChange={onCategoryChange} />
      <Button type="submit" onClick={onAddThread}>Kirim</Button>
    </InputContainer>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default ThreadInput;
