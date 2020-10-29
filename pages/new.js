import Form from '../components/Form';

const NewPlant = () => {
  const plantForm = {
    name: '',
    species: '',
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
