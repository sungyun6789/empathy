import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { createItem } from '~/lib/api/items';

import Button from '../system/Button';
import Input from '../system/Input';
import TextArea from '../system/TextArea';

import type { Item } from '@prisma/client';
import type { ErrorResponse } from '~/lib/error';

type FormType = Pick<Item, 'description' | 'url'>;

const WriteForm = () => {
  const router = useRouter();
  const { mutate } = useMutation(createItem, {
    onSuccess: (data) => router.push(`/items?id=${data.data.id}`),
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.error ?? '알 수 없는 에러가 발생했습니다.');
    },
  });

  const { values, handleChange, handleSubmit } = useFormik<FormType>({
    initialValues: { description: '', url: '' },
    onSubmit: (formValue) => mutate(formValue),
  });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputGroup>
        <Label>영상 주소</Label>
        <Input name="url" onChange={handleChange} />
      </InputGroup>

      <InputGroup>
        <LabelGroup>
          <Label>설명</Label>
          <span>{`${values.description.length} / 50`}</span>
        </LabelGroup>
        <TextArea maxLength={50} name="description" onChange={handleChange} />
      </InputGroup>

      <Button width="100%" height="40px" fill type="submit">
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

const LabelGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;
