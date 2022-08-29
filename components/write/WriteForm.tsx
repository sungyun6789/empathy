import { useFormik } from 'formik';
import styled from 'styled-components';

import Button from '../system/Button';
import Input from '../system/Input';
import TextArea from '../system/TextArea';

import type { Post } from '@prisma/client';

type FormType = Pick<Post, 'description' | 'url'>;

const WriteForm = () => {
  const { handleChange, handleSubmit } = useFormik<FormType>({
    initialValues: { description: '', url: '' },
    onSubmit: (formValue) => console.log(formValue),
  });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputGroup>
        <Label>영상 주소</Label>
        <Input name="url" onChange={handleChange} />
      </InputGroup>

      <InputGroup>
        <Label>설명</Label>
        <TextArea name="description" onChange={handleChange} />
      </InputGroup>

      <Button width="100%" type="submit">
        완료
      </Button>
    </StyledForm>
  );
};

export default WriteForm;

const StyledForm = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 30px;
`;

const InputGroup = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;
