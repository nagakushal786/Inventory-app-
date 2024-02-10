import path from "path";
import ProductModel from "../models/product.models.js";

export default class ProductController{
  getProducts(req,res,next){
    var products = ProductModel.get();
    console.log(products);
    res.render("products",{products, userEmail: req.session.userEmail});
    // return res.sendFile(path.join(path.resolve(),"src","views","products.html"));
  }

  getAddForm(req,res,next){
    return res.render('new-products',{errorMessage:null, userEmail: req.session.userEmail});
  }

  addNewProduct(req,res,next){
    // console.log(req.body);
    const {name, desc, price} = req.body;
    const imageUrl = "images/"+req.file.filename
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.get();
    res.render('products',{products:products, userEmail: req.session.userEmail});
  }

  getUpdateProductView(req, res, next){
    // 1. If the product exist then return the view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if(productFound){
      res.render('update-products',{product:productFound, errorMessage:null, userEmail: req.session.userEmail});
    }
    // 2. Else return the errors
    else{
      res.status(401).send('Product not found');
    }
  }

  postUpdateProduct(req, res){
    ProductModel.update(req.body);
    var products = ProductModel.get();
    res.render('products',{products:products, userEmail: req.session.userEmail});
  }

  deleteProduct(req,res){
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if(!productFound){
      return res.status(401).send('Product not found');
    }
    ProductModel.delete(id);
    var products = ProductModel.get();
    res.render('products',{products});
  }
};

