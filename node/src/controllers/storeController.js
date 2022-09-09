import stores from "../models/Store.js";
import { createRequire } from 'module';

class StoreController {

    static listarStores = (req, res) => {
        stores
            .find()
            .exec((err, stores) => {
                return res.status(200).json(stores)
            });
        return true;
    }

    static cadastrarBanner = (req, res) => {

        let slug = req.params.slug;

        if (!slug) {
            return res.status(400).send({message: 'Slug Vazio'});
        }

        // Verifica o tamanho do Slug
        if (slug.length > 30) {
            return res.status(401).send({message: 'Slug não pode ter mais de 30 caracteres'});
        }

        // Verifica se o Slug tem caracteres especiais
        let regex = /^[a-zA-Z0-9_-]+$/g;

        if (!regex.test(slug)) {
            return res.status(400).send({message: 'Slug possui caracteres especiais'});
        }

        const require = createRequire(import.meta.url);

        let nome_imagem = '';
        let objStore = new stores();
        

        const { banner, teste } = req.body;

        if (!banner) {
            return res.status(400).send({message: 'Banner Vazio'});
        }

        if (banner.substring(0, 15) != 'data:image/jpeg') {
            return res.status(400).send({message: 'Imagem deve ser JPG'});
        }

        let imagem = decodeBase64Image(banner);

        const sizeOf = require('image-size');
        const medidasImagem = sizeOf(imagem.data);

        if (medidasImagem.width != 343) {
            return res.status(400).send({message: 'Imagem deve ter 343px de largura'});
        }

        if (medidasImagem.height != 430) {
            return res.status(400).send({message: 'Imagem deve ter 430px de altura'});
        }
                

        stores.findOne({'slug': slug}, {}, (err,objStores) => {
            //console.log('ERrro:' + err);
            //console.log('ID' + objStores);
            if (!objStores) {
                // Cadastra
                // Lojas não existe, cadastra

                // Gera o nome da imagem no formato YYYY-MM-DD-HHMMSSNNNN, onde NNNN é um número aleatório para evitar ainda mais a colisão
                let ts = Date.now();

                let date_ob = new Date(ts);
                let numeroAleatorio = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
                nome_imagem = date_ob.getFullYear() + '-' + date_ob.getMonth() + 1 + '-' + date_ob.getDate() + date_ob.getHours() + date_ob.getMinutes() + date_ob.getSeconds() + '-' + numeroAleatorio + '.jpg';

                // Salva a imagem com o mesmo nome para evitar de fazer o update
                const fs = require('fs');
                fs.writeFile("imagens/" + nome_imagem, imagem.data, function (err) {
                    return res.status(500).send({message: 'Erro ao salvar a imagem'});
                });                
                
                objStore.slug = slug;
                objStore.nome_imagem = nome_imagem;
                objStore.save((err) => {
                    if (err) {
                        return res.status(500).send({ message: `${err.message} - Falha ao cadastrar` })
                    } else {
                        let url = req.protocol + '://' + req.get('host') + '/imagens/' + nome_imagem;

                        let json = '{"url":"' + url + '"}';
                        return res.status(201).send(JSON.parse(json));
                    }
                })
            } else {
                // Altera, ou melhor, aproveito o mesmo nome de imagem para não precisar fazer update no mongo.
                // Loja já existe
                // Como mantenho o mesmo nome da imagem, não preciso fazer update.
                nome_imagem = objStores.nome_imagem;

                // Salva a imagem com o mesmo nome para evitar de fazer o update
                const fs = require('fs');
                fs.writeFile("imagens/" + nome_imagem, imagem.data, function (err) {
                    return res.status(500).send({message: 'Erro ao salvar a imagem'});
                });

                let url = req.protocol + '://' + req.get('host') + '/imagens/' + nome_imagem;
                let json = '{"url":"' + url + '"}';
                return res.status(201).send(JSON.parse(json));
            }    
        })

        return true;
    }
}

function decodeBase64Image(dataString) {

    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer(matches[2], 'base64');

    return response;
}

export default StoreController