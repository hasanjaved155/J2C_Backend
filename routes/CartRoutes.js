import express from "express";

import {
    createCartController,
    deleteCartController,
    getCartController,
    updateCartController
} from "../controllers/CartController.js";
const router = express.Router();



router.post('/create-cart/:_id', createCartController)
router.get('/get-cart/:_id', getCartController);

router.delete('/:_id/delete-cart/:cart_id', deleteCartController);

router.put('/update-cart/:cartItemId', updateCartController);

export default router;