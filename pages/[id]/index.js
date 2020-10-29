import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../utils/dbConnect';
import Plant from '../../models/Plant';

const PlantPage = ({ plant }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const plantID = router.query.id;
    try {
      await fetch(`/api/plants/${plantID}`, {
        method: 'Delete',
      })
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the plant.');
    }
  };

  return (
    <div key={plant._id}>
      <div className="card">
        <img src={plant.image_url} />
        <h5 className="plant-name">{plant.name}</h5>
        <div className="main-content">
          <p className="plant-name">{plant.name}</p>

          {/* Extra Plant Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {plant.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {plant.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${plant._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect();

  const plant = await Plant.findById(params.id).lean();
  plant._id = plant._id.toString();

  return { props: { plant } }
}

export default PlantPage;
