import {body, validationResult} from 'express-validator';

const validateRequest = async (req,res,next)=>{
  // Validating the data
  // const {name, price, imageUrl} = req.body;
  // let errors=[];
  // if(!name || name.trim()==''){
  //   errors.push("Name is required");
  // }
  // if(!price || parseFloat(price)<1){
  //   errors.push("Price must be greater than zero.");
  // }
  // try{
  //   const validUrl = new URL(imageUrl);
  // } catch(err) {
  //   errors.push("Invalid Image Url.");
  // }
  // if(errors.length>0){
  //   return res.render('new-products',{errorMessage:errors[0]});
  // }

  // Express-validator utilization
  console.log(req.body);
  // 1. Setup the rules for validation
  const rules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({gt:0}).withMessage('Price should be greater than 0'),
    body('imageUrl').custom((value, {req})=>{
      if(!req.file){
        throw new Error("Image is required");
      }
      return true;
    })
  ];
  // 2. Run those rules
  await Promise.all(rules.map((rule)=>rule.run(req)));
  // 3. Check for any errors after running the rules
  var validationErrors = validationResult(req);
  console.log(validationErrors);
  // 4. If there are any errors, return the errorMessage
  if(!validationErrors.isEmpty()){
    return res.render('new-products',{errorMessage:validationErrors.array()[0].msg});
  }
  next();
}

export default validateRequest;