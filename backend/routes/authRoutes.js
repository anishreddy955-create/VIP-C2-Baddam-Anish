import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser,
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/me').get(protect, getUserProfile);
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id')
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
