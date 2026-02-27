const isAdmin= (req,res,next)=>{
  if(req.res.role!=="admin"){
    return res.status(403).json({
        success:false,
        error:" Admin access only."});
  }
  next();
}
module.exports=isAdmin;