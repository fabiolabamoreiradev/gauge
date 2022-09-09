import mongoose from "mongoose";

mongoose.connect("mongodb+srv://fabiolabamoreira:fb08AABB@cluster0.rjdpyxp.mongodb.net/gauge");

let db = mongoose.connection;

export default db;