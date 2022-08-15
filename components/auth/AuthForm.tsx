import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import Button from '../system/Button';
import Input from '../system/Input';

import QuestionLink from './QuestionLink';

interface Props {
  mode: 'login' | 'register';
}

interface AuthForm {
  username: string;
  password: string;
}

const AUTH_DESCRIPTIONS = {
  login: {
    usernamePlaceholder: '아이디를 입력하세요.',
    passwordPlaceholder: '비밀번호를 입력하세요.',
    buttonText: '로그인',
    question: '계정이 없으신가요?',
    actionLink: '/register',
  },
  register: {
    usernamePlaceholder: '5~20자 사이 영문/숫자 입력',
    passwordPlaceholder: '8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력',
    buttonText: '회원가입',
    question: '계정이 이미 있으신가요?',
    actionLink: '/login',
  },
} as const;

const AuthForm = ({ mode }: Props) => {
  const router = useRouter();
  const { usernamePlaceholder, passwordPlaceholder, buttonText, question, actionLink } = AUTH_DESCRIPTIONS[mode];

  const { mutate } = useMutation((form: AuthForm) => axios.post(`api/auth/${mode}`, form), {
    onSuccess: () => {
      return router.push(actionLink);
    },
  });

  const { handleChange, handleSubmit } = useFormik<AuthForm>({
    initialValues: { username: '', password: '' },
    onSubmit: (formValue) => {
      return mutate(formValue);
    },
  });

  return (
    <Block>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Username</Label>
          <Input name="username" onChange={handleChange} placeholder={usernamePlaceholder} />
        </InputGroup>

        <InputGroup>
          <Label>Password</Label>
          <Input name="password" onChange={handleChange} placeholder={passwordPlaceholder} />
        </InputGroup>

        <Button width="100%" type="submit">
          {buttonText}
        </Button>

        <QuestionLink actionLink={actionLink} question={question} />
      </form>
    </Block>
  );
};

export default AuthForm;

const Block = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  box-sizing: border-box;
`;

const InputGroup = styled.div`
  width: 300px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${COLORS.gray2};
  text-decoration: none;
`;
