import { useState } from 'react';
import { useRouter } from 'next/router';
import { putData, postData } from '../services/plants';

const Form = ({ formId, plantForm, forNewPlant = true }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: plantForm.name,
    species: plantForm.species,
    age: plantForm.age,
    poddy_trained: plantForm.poddy_trained,
    diet: plantForm.diet,
    image_url: plantForm.image_url,
    likes: plantForm.likes,
    dislikes: plantForm.dislikes,
    owner: plantForm.owner,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const handlePutData = async (form) => {
    const { id } = router.query
    try {
      await putData(form, id);
      router.push('/home');
    } catch (error) {
      setMessage('Failed to update plant')
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const handlePostData = async (form) => {
    try {
      await postData(form);
      router.push(`/home/[id]`, `/home/${plantForm.owner}`);
    } catch (error) {
      setMessage('Failed to add plant');
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewPlant ? handlePostData(form) : handlePutData(form);
    } else {
      setErrors({ errs });
    }
  }

  /* Makes sure plant info is filled for plant name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.species) err.species = 'Species is required'
    if (!form.image_url) err.image_url = 'Image URL is required'
    return err
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="species">Species</label>
        <input
          type="text"
          maxLength="30"
          name="species"
          value={form.species}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <label htmlFor="poddy_trained">Potty Trained</label>
        <input
          type="checkbox"
          name="poddy_trained"
          checked={form.poddy_trained}
          onChange={handleChange}
        />

        <label htmlFor="diet">Diet</label>
        <textarea
          name="diet"
          maxLength="60"
          value={form.diet}
          onChange={handleChange}
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <label htmlFor="likes">Likes</label>
        <textarea
          name="likes"
          maxLength="60"
          value={form.likes}
          onChange={handleChange}
        />

        <label htmlFor="dislikes">Dislikes</label>
        <textarea
          name="dislikes"
          maxLength="60"
          value={form.dislikes}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
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
