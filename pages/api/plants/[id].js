import dbConnect from '../../../utils/dbConnect';
import Plant from '../../../models/Plant';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const plant = await Plant.findById(id)
        if (!plant) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: plant })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const plant = await Plant.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!plant) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: plant })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPlant = await Plant.deleteOne({ _id: id })
        if (!deletedPlant) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
