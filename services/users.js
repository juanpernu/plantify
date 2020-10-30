const contentType = 'application/json';

export const postData = async (form) => {
  const res = await fetch('/api/users', {
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
};

export const login = async (userPassword, userName) => {
  const userData = { userPassword, userName };
  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
    },
    body: JSON.stringify(userData),
  });

  // Throw error with status code in case Fetch API req failed
  if (!res.ok) {
    throw new Error(res.status);
  }

  const { data } = await res.json();
  return data;
};

