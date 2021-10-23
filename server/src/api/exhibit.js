const express = require('express');
const {
    check,
    validationResult
} = require("express-validator");
const Museum = require('../model/museumModel')
const Exhibit = require('../model/exhibitModel')
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, [
    check('title', "Please Enter a Valid Title")
        .not()
        .isEmpty(),
    check('image', "Please Enter a Valid Image")
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
        image,
        museumId,
        sort,
        explain
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

        let exhibit = await Exhibit.findOne({
            title,
            museumId
        });
        if (exhibit) {
            return res.send({
                code: 40000,
                message: title + '已存在'
            })
        }

        exhibit = new Exhibit({
            title,
            image,
            museumId: museum._id,
            museumTitle: museum.title,
            sort,
            explain
        });

        await exhibit.save();

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
    console.log("query:",req.query);

    let query = {};
    if (title)
        query.title = new RegExp(title);
    if (museumId)
        query.museumId = museumId;

    try {
        const pageList = await Exhibit.find(query).sort({ 'museumId': 1, 'sort': 1 }).limit(Number(limit)).skip(Number(page - 1) * Number(limit));
        const total = await Exhibit.find(query).countDocuments();

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

router.get('/listByClient', async (req, res) => {
    const { title, museumId } = req.query;
    console.log("query:",req.query);

    let query = {};
    if (title)
        query.title = new RegExp(title);
    if (museumId)
        query.museumId = museumId;

    try {
        const pageList = await Exhibit.find(query).sort({ 'museumId': 1, 'sort': 1 });

        res.send({
            code: 20000,
            data: {
                items: pageList
            }
        })
    } catch (error) {
        res.send('error msg')
    }
})

router.post('/update', auth, [
    check('title', "Please Enter a Valid Title")
        .not()
        .isEmpty(),
    check('image', "Please Enter a Valid Image")
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
        image,
        museumId,
        sort,
        explain
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

        let exhibit = await Exhibit.findOne({
            title,
            museumId
        });
        if (exhibit && exhibit._id != _id) {
            return res.send({
                code: 40000,
                message: museum.title+","+title + '已存在'
            })
        }

        const bodyParam = {
            title,
            image,
            museumId: museum._id,
            museumTitle: museum.title,
            sort,
            explain
        }

        const findDate = await Exhibit.findById(_id)

        if (findDate) {
            const data = await Exhibit.updateOne({
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
        const result = await Exhibit.deleteOne({ _id });

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