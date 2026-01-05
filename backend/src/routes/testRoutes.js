import express from "express"
const testRouter = express.Router();

testRouter.post('/', (req, res) => { console.log(req.body); res.status(200) });
testRouter.get('/', (req, res) => console.log("Arrived at test"))

export { testRouter }
