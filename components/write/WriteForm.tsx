import { useFormik } from 'formik';

import Button from '../system/Button';
import Input from '../system/Input';

import type { Post } from '@prisma/client';

type FormType = Pick<Post, 'title' | 'description' | 'url'>;

const WriteForm = () => {
  const { handleChange, handleSubmit } = useFormik<FormType>({
    initialValues: {
      title: '',
      description: '',
      url: '',
    },
    onSubmit: (formValue) => console.log(formValue),
  });

  return (
    <form onSubmit={handleSubmit}>
      <article>
        <div>제목</div>
        <Input name="title" onChange={handleChange} />
      </article>

      <article>
        <div>설명</div>
        <Input name="description" onChange={handleChange} />
      </article>

      <article>
        <div>영상 주소</div>
        <Input name="url" onChange={handleChange} />
      </article>

      <Button width="100%" type="submit">
        완료
      </Button>
    </form>
  );
};

export default WriteForm;
