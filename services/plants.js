import { mutate } from 'swr';
const contentType = 'application/json';

const putData = async (form, id) => {
  const res = await fetch(`/api/plants/${id}`, {
    method: 'PUT',
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
    },
    body: JSON.stringify(form),
  })

  // Throw error with status code in case Fetch API req failed
  if (!res.ok) {
    throw new Error(res.status);
  }

  const { data } = await res.json();

  mutate(`/api/plants/${id}`, data, false); // Update the local data without a revalidation
};

const postData = async (form) => {
  const res = await fetch('/api/plants', {
    method: 'POST',
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
    },
    body: JSON.stringify(form),
  })

  // Throw error with status code in case Fetch API req failed
  if (!res.ok) {
    console.log(res.status)
    throw new Error(res.status);
  }
}

export {
  putData,
  postData,
}