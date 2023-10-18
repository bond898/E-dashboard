const express = require('express');
const cors = require('cors');
const Users = require('./Db/Users');
const product = require('./Db/product');

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';


require("./Db/config");
require("./Db/Users")
const app = express();
app.use(express.json())

app.use(cors());

// const connectDb= async ()=>{
//     mongoose.connect('mongodb://localhost:27017/');
//     const productSchema=new mongoose.Schema({});
//     const product = mongoose.model('product',productSchema);
//     const data = product.find();
//     console.warn(data);
// }

// connectDb();

// app.get("/",(req,res)=>{
//     res.send("app is working")
// });

app.post("/register", async (req, res) => {
    let user = new Users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "something went wrong, please try after sometime" })
        }
        res.send({ result, auth: token })
    })
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await Users.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong, please try after sometime" })
                }
                res.send({ user, auth: token })
            })

        }
        else {
            res.send({ result: "user not found" })
        }
    }
    else {
        res.send({ result: "user not found" })
    }

})

app.post("/add-product", TokenVerify, async (req, res) => {
    let Product = new product(req.body);
    let result = await Product.save();
    res.send(result);
});

app.get("/products",TokenVerify, async (req, res) => {
    let Products = await product.find();
    if (Products.length > 0) {
        res.send(Products)
    }
    else {
        res.send({ result: "No products found" });
    }
})

app.delete("/product/:id",TokenVerify, async (req, res) => {
    let result = await product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get("/product/:id",TokenVerify, async (req, res) => {
    let result = await product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "No record found" })
    }
})

app.put("/product/:id",TokenVerify, async (req, res) => {
    let result = await product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})


app.get("/search/:key", TokenVerify, async (req, res) => {
    let result = await product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }

        ]
    })
    res.send(result)
})


function TokenVerify(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1];
        // console.warn("middleware called... if", token)
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "please provide valid token" })

            }
            else {
                next()

            }
        })
    }
    else {
        res.status(403).send({ result: "please add token with header" })
    }
    // console.warn("middleware called...", token)
}

app.listen(5000);