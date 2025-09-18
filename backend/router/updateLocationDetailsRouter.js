import express from 'express'
import { createBungalow, deleteBungalow, getAllBungalows, getBungalowById, updateBungalow } from '../Controller/updateLocationDetailsController.js';

const updateLocationDetailsRouter = express.Router();

updateLocationDetailsRouter.post("/", createBungalow)
updateLocationDetailsRouter.get("/getAll",getAllBungalows)
updateLocationDetailsRouter.get("/:id",getBungalowById)
updateLocationDetailsRouter.put("/:id", updateBungalow)
updateLocationDetailsRouter.delete("/:id",deleteBungalow)


export default updateLocationDetailsRouter;