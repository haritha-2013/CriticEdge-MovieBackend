import express from "express";
import { createCast, deleteCast, getAllCast, getCastById, updateCast, } from "../controllers/castController.js";

const router = express.Router();

// Create a new cast memeber
router.post('/', createCast);

// Get all cast memebers
router.get('/', getAllCast);

// Get a cast member by ID
router.get('/:id', getCastById);

// Update a cast memeber
router.put('/:id', updateCast);

// Delete a cast member
router.delete('/:id', deleteCast);

export default router;