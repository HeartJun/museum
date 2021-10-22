const express = require('express');
const {
    check,
    validationResult
} = require("express-validator");
const Museum = require('../model/museumModel')
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, [
    check('title', "Please Enter a Valid Title")
        .not()
        .isEmpty(),
    check('image', "Please Enter a Valid Image")
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
        sort
    } = req.body;

    try {
        let museum = await Museum.findOne({
            title
        });
        if (museum) {
            return res.send({
                code: 40000,
                message: title + '已存在'
            })
        }

        museum = new Museum({
            title,
            image,
            sort
        });

        await museum.save();

        res.send({
            code: 20000,
            data: 'success'
        })
    } catch (error) {
        res.send('error msg')
    }
})

router.get('/list', async (req, res) => {
    const { title, page = 1, limit = 10 } = req.query;
    console.log(req.query);

    let query = {};
    if (title)
        query.title = new RegExp(title);

    try {
        const pageList = await Museum.find(query).sort({ 'sort': '1' }).limit(Number(limit)).skip(Number(page - 1) * Number(limit));
        const total = await Museum.find(query).countDocuments();

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
    try {
        const dataList = await Museum.find().sort({ 'sort': '1' });

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
    check('image', "Please Enter a Valid Image")
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
        sort
    } = req.body;

    const bodyParam = {
        title,
        image,
        sort
    }

    try {
        const findDate = await Museum.findById(_id)
        console.log("findDate:", findDate)
        if (findDate) {
            const data = await Museum.updateOne({
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
        const result = await Museum.deleteOne({ _id });

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