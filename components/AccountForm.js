import { useState } from 'react';
import { useRouter } from 'next/router';
import { postData } from '../services/users';

const Form = ({ formId, accountForm }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    userName: accountForm.userName,
    name: accountForm.name,
    email: accountForm.email,
    password: accountForm.password,
  })

  /* The POST method adds a new entry in the mongodb database. */
  const handlePostData = async (form) => {
    try {
      await postData(form);
      router.push('/');
    } catch (error) {
      setMessage('Failed to add plant');
    }
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    Object.keys(errs).length === 0 ? handlePostData(form) : setErrors({ errs });
  }

  /* Makes sure plant info is filled for plant name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.userName) err.userName = 'User name is required';
    if (!form.name) err.name = 'Name is required';
    if (!form.email) err.email = 'Email is required';
    if (!form.password) err.password = 'Password is required';
    return err;
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">User Name</label>
        <input
          type="text"
          maxLength="20"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          required
        />

        <label htmlFor="species">Name</label>
        <input
          type="text"
          maxLength="30"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Email</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="poddy_trained">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
};

export default Form;
