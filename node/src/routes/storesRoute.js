import express from "express";
import storeController from "../controllers/storeController.js";
import multer from "multer";


const router = express.Router();
const upload = multer({ dest: '../imagens/' })

router
    .get("/listar",storeController.listarStores)
    .post("/store/:slug/banners",upload.fields([{ name: 'banner', maxCount: 1 }]), storeController.cadastrarBanner)

export default router;