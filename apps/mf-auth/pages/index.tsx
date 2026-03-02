import type { GetServerSideProps } from 'next';
import AuthWidget from '../components/AuthWidget';

type AuthPageProps = {
  initialAuthenticated: boolean;
};

export const getServerSideProps: GetServerSideProps<AuthPageProps> = async ({ req }) => {
  return {
    props: {
      initialAuthenticated: Boolean(req.cookies.mf_token)
    }
  };
};

export default function AuthPage({ initialAuthenticated }: AuthPageProps) {
  return <AuthWidget initialAuthenticated={initialAuthenticated} />;
}
