import express from "express";
import { productController } from "../controller/productController";

const router = express.Router();

router.get("/list", productController.getProducts);
router.get("/detail/:id", productController.getProductsDetail);
router.post("/add", productController.addProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

export { router as productRouter };
