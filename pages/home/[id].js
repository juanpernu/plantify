import Link from 'next/link';
import dbConnect from '../../utils/dbConnect';
import Plant from '../../models/Plant';

const Index = ({ plants }) => (
  <>
    {plants.map((plant) => (
      <div key={plant._id}>
        <div className="card">
          <img src={plant.image_url} alt={plant.name} />
          <h5 className="plant-name">{plant.name}</h5>
          <div className="main-content">
            <p className="plant-name">{plant.name}</p>

            {/* Extra Plant Info: Likes and Dislikes */}
            {!!plant.likes.length && <div className="likes info">
              <p className="label">Likes</p>
              <ul>
                {plant.likes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>}
            {!!plant.dislikes.length && <div className="dislikes info">
              <p className="label">Dislikes</p>
              <ul>
                {plant.dislikes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>}

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${plant._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${plant._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves plant(s) data from mongodb database */
export async function getServerSideProps(req) {
  const { id } = req.params;
  await dbConnect();

  /* find all the data in our database */
  const result = await Plant.find({ owner: id }).populate("User");
    const plants = result.map((doc) => {
    const plant = doc.toObject();
    plant._id = plant._id.toString();
    plant.owner = plant.owner.toString();
    return plant;
  });

  return { props: { plants } };
}

export default Index;
