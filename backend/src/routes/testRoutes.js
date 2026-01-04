const express = require('express');
const testRouter = express.Router();

testRouter.post('/', (req, res) => {console.log(req.body); res.status(200)});
testRouter.get('/', (req, res) => res.json({
    gotHere: true
}));

module.exports = testRouter;
