const Product = require('../models/product')
const slugify = require('slugify')
const product = require('../models/product')

// exports moddelwares: logica de negocio
exports.create = async (req, res) => {
  try {
    console.log(req)
    req.body.slug = slugify(req.body.title)
    const newProduct = new Product(req.body).save()
    res.json(newProduct)
  }catch(e){
    res.status(400).json({
      err: e.message,
      code: e.code
    })
  }
}

exports.productsCount = async (req, res) => {
  let total = await Product.find({ status: 'Active' }).estimateDocumentCount().exec()
  res.json(total)
}

exports.listAll = async (req, res) => {
  let products = await Product.find({ status: 'Active' })
    .limit(parseInt(req.params.count))
    .exec()
    res.json(products)
}

exports.remove = async (req,res) => {
  try {
    const deleted = await Product.findOneAndUpdate({
      slug: req.params.slug
    },
    {
      status: 'Inactive'
    },
    {
      new: true
    })
    res.json(deleted)
  } catch(err) {
    console.log(err)
    return res.status(400).send('Product deleted failed')
  }
}

exports.remove2 = async (req,res) => {
  try{
    const deleted = await product.findOneAndRemove({
      slug: req.param.slug 
    }).exec()
    res.json(deleted)
  }catch(err){
    console.log(err);
    return res.status(400).send('Product deleted failed')
  }
}

exports.read = async (req,res) => {
  const product = await Product.findOne({
    slug: req.param.slug,
    status: 'Active'
  }).exec()
  res.json(product)
}

exports.update = async (req,res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const updated = await Product.findOneAndUpdate({
      slug: req.param.slug
    },
    req.body,
    { new: true }
    ).exec()
    res.json(updated)
  }catch(err){
    console.log('Product updated error', err)
    // return res.status(400).send('Product update failed')
  }
}