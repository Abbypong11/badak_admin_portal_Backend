// request.routes.js
import express from 'express';
import { createRequest, deleteRequest, getAllRequests, getRequestById, updateRequest} from "../controllers/request.controllers.js"

const router = express.Router();

// POST route to handle user login requests
router.post('/',createRequest);
router.get('/', getAllRequests);
router.get('/:id', getRequestById)
router.delete('/:id', deleteRequest);
router.patch('/:id', updateRequest);


export default router;
