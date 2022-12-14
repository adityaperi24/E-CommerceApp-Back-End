const express = require('express') 

const passQuery = require('./database.js')
productRouter = express.Router();



productRouter.get('/:productName',  async (req,res,next)=>{
    

    try{
      console.log('request received')
      const name = req.params.productName
     let query = 'Select * from public."Product Information" where "Name"=$1'

     const params = [name]
    const products =  await passQuery(query, params)
    const product = products[0]
    if (! product){
        throw new Error('Product not found, please try Again')
    }
    else{
        const responseObject = {product : product}
        res.status(200).send(responseObject)
    }
    
    } catch(err){
     next(err)
    }



})

productRouter.get('/type/:type',  async (req,res,next)=>{
    

    try{
      console.log('request received')
      const type = req.query.type
     let query = 'Select * from public."Product Information" where "Type"=$1'

     const params = [type]
    const products =  await passQuery(query, params)
    if (! products[0]){
        throw new Error('No such Products, please try Again')
    }
    else{
        const responseObject = {products : products}
        res.status(200).send(responseObject)
    }
    
    } catch(err){
     next(err)
    }



})

productRouter.use((err, req, res, next) => {
    
    res.status(500).send({message: err.message})
  })

module.exports = productRouter