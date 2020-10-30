import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Context } from './context';
import { login } from '../services/users';

const Index = () => {
  const { setUserData } = useContext(Context);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const router = useRouter();

  const onSubmitHandler = async () => {
    try {
      const [result] = await login(userPassword, userName);
      if (result) {
        setUserData(result);
        router.push(`/home/[id]`, `/home/${result._id}`);
      };
    } catch (error) {
      console.log('error', error);
    }
  }
  const setValue = e => {
    e.target.name === "userName" && setUserName(e.target.value);
    e.target.name === "userPassword" && setUserPassword(e.target.value);
  }
  return (
    <section id="login-page">
      <div className="card">
        <h2>Welcome!</h2>
        <p>User name</p>
        <input type="text" value={userName} name="userName" onChange={e => setValue(e)}/>
        <p>Password</p>
        <input type="password" value={userPassword} name="userPassword" onChange={e => setValue(e)}/>
        <button type="submit" onClick={onSubmitHandler}>Login</button>
        <Link href="/create-account">
          <button className="btn view">Create account</button>
        </Link>
      </div>
    </section>
  )
};

export async function getServerSideProps() {
  return { props: { pageName: 'login' } };
}

export default Index;
