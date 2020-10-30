import { useContext } from 'react';
import Form from '../components/Form';
import { Context } from './context';

const NewPlant = () => {
  const { user } = useContext(Context);
  const plantForm = {
    name: '',
    species: '',
    owner: user.id,
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
  };

  return <Form formId="add-plant-form" plantForm={plantForm} />;
}

export default NewPlant;
