import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditPlant = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: plant, error } = useSWR(id ? `/api/plants/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (!plant) return <p>Loading...</p>;

  const plantForm = {
    name: plant.name,
    species: plant.species,
    age: plant.age,
    poddy_trained: plant.poddy_trained,
    diet: plant.diet,
    image_url: plant.image_url,
    likes: plant.likes,
    dislikes: plant.dislikes,
  };

  return <Form formId="edit-plant-form" plantForm={plantForm} forNewPlant={false} />;
}

export default EditPlant;
