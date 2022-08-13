import Button from '../system/Button';

interface Props {
  mode: 'login' | 'register';
}

const AuthForm = ({ mode }: Props) => {
  return (
    <form>
      <div>
        <div>username</div>
        <input />
      </div>

      <div>
        <div>password</div>
        <input />
      </div>

      <Button>로그인</Button>
    </form>
  );
};

export default AuthForm;
