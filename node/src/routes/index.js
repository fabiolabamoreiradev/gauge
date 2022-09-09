import express from "express";
import stores from "./storesRoute.js";

const routes = (app) => {
    
    app.route('/').get((req,res) => {
        res.status(200).send({titulo:"Desafio Gauge"})        
    })

    app.use (
        express.json({limit: '50mb', extended: true}),
        express.urlencoded({limit: '50mb', extended: true}),
        stores        
    )

}

export default routes