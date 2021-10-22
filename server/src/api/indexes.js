const express = require('express');
const {
    check,
    validationResult
} = require("express-validator");
const Museum = require('../model/museumModel')
const IndexesModel = require('../model/indexesModel')
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, [
    check('title', "Please Enter a Valid Title")
        .not()
        .isEmpty(),
    check('museumId', "Please Enter a Valid MuseumId")
        .not()
        .isEmpty(),
    check('sort', "Please Enter a Valid Sort")
        .not()
        .isEmpty()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }

    const {
        title,
        museumId,
        sort
    } = req.body;

    try {
        let museum = await Museum.findOne({
            _id: museumId
        });
        if (!museum) {
            return res.send({
                code: 40000,
                message: '展馆不存在'
            })
        }

        let indexes = await IndexesModel.findOne({
            title,
            museumId
        });
        if (indexes) {
            return res.send({
                code: 40000,
                message: title + '已存在'
            })
        }

        indexes = new IndexesModel({
            title,
            museumId: museum._id,
            museumTitle: museum.title,
            sort
        });
        console.log("indexes:", indexes)
        await indexes.save();

        res.send({
            code: 20000,
            data: 'success'
        })
    } catch (error) {
        res.send('error msg')
    }
})

router.get('/list', async (req, res) => {
    const { title, museumId, page = 1, limit = 10 } = req.query;
    console.log(req.query);

    let query = {};
    if (title)
        query.title = new RegExp(title);
    if (museumId)
        query.museumId = museumId;

    try {
        const pageList = await IndexesModel.find(query).sort({ 'museumId':1,'sort': 1 }).limit(Number(limit)).skip(Number(page - 1) * Number(limit));
        const total = await IndexesModel.find(query).countDocuments();

        res.send({
            code: 20000,
            data: {
                total: total,
                items: pageList
            }
        })
    } catch (error) {
        res.send('error msg')
    }
})

router.get('/all', async (req, res) => {
    const {  museumId } = req.query;

    let query = {};

    if (museumId)
        query.museumId = museumId;

    try {
        const dataList = await IndexesModel.find(query).sort({ 'museumId':1,'sort': 1 });

        res.send({
            code: 20000,
            data: dataList
        })
    } catch (error) {
        res.send('error msg')
    }
})

router.post('/update', auth, [
    check('title', "Please Enter a Valid Title")
        .not()
        .isEmpty(),
    check('museumId', "Please Enter a Valid MuseumId")
        .not()
        .isEmpty(),
    check('sort', "Please Enter a Valid Sort")
        .not()
        .isEmpty()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }

    const {
        _id,
        title,
        museumId,
        sort
    } = req.body;

    try {
        let museum = await Museum.findOne({
            _id: museumId
        });
        if (!museum) {
            return res.send({
                code: 40000,
                message: '展馆不存在'
            })
        }

        let indexes = await IndexesModel.findOne({
            title,
            museumId
        });
        if (indexes&&indexes._id!=_id) {
            return res.send({
                code: 40000,
                message: title + '已存在'
            })
        }

        const bodyParam = {
            title,
            museumId: museum._id,
            museumTitle: museum.title,
            sort
        }

        const findDate = await IndexesModel.findById(_id)

        if (findDate) {
            const data = await IndexesModel.updateOne({
                _id
            }, bodyParam);
            res.send({
                code: 20000,
                data: 'success'
            })
        } else {
            res.send({
                code: 40000,
                message: title + '不已存在'
            })
        }
    } catch (error) {
        console.log("error:", error)
        res.send('error msg')
    }
})


router.post('/delete', auth, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }

    const { _id } = req.body;

    try {
        const result = await IndexesModel.deleteOne({ _id });

        res.send({
            code: 20000,
            data: 'success'
        })
    } catch (error) {
        console.log("error:", error)
        res.send('error msg')
    }
})


module.exports = router