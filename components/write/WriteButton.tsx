import Link from 'next/link';

import Button from '../system/Button';

const WriteButton = () => {
  return (
    <Link href="/write">
      <a>
        <Button>글쓰기</Button>
      </a>
    </Link>
  );
};

export default WriteButton;
