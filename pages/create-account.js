import Form from '../components/AccountForm';

const CreateAccount = () => {
  const accountForm = {
    userName: '',
    name: '',
    email: '',
    password: '',
  };

  return <Form formId="new-account-form" accountForm={accountForm} />;
};

export default CreateAccount;
