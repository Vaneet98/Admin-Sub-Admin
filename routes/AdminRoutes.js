const express = require("express");
const router = express.Router();
const controller = require("../controller");
 const IsAdmin= require("../middleware/IsAdmin.js")
const IsAuth= require("../middleware/IsAuth.js")
const RegPermission= require("../middleware/RegPermi.js")
const BlockPermis= require("../middleware/BlockPermis.js")
const unblockPermis= require("../middleware/UnblockPermis.js")
const deletePermis= require("../middleware/DeletePermis.js")
const EditPermis= require("../middleware/EditPermis.js")

//Registration for Admin only
router.post("/AdminRegistration",async (req, res) => {
  let admin = await controller.AdminRegister.Registration(req.body);
  res.json(admin);
});

//Registration  for Sub-Admin by admin and sub-admin if they have a permission API
router.post("/registration",IsAuth,RegPermission,async (req, res) => {
  let admin = await controller.AdminRegister.Registration(req.body);
  res.json(admin);
});

//login admin and sub-admin
router.post("/login",async(req,res)=>{
  let user= await controller.AdminRegister.loginAdmin(req.body)
  res.json(user);
})

//Blocked not-blocked and not deleted user detail
router.get("/blocked",async(req,res)=>{
  let user= await controller.AdminRegister.Blocked();
  res.json(user)
})

//filter on the based on blocked or not_blocked (blocked=1 and not_blocked=0)
router.get("/filter/:id",async(req,res)=>{
  let user= await controller.AdminRegister.filter(req,res);
  res.json(user)
})

//View all admin details
router.get("/view",async(req,res)=>{
  let user= await controller.AdminRegister.viewAll();
  res.json(user)
})

//view specific preson
router.get("/view/:adminId",async(req,res)=>{
  let user= await controller.AdminRegister.viewperson(req.params);
  res.json(user)
})

//Admin can block the user

router.put("/block",IsAuth, BlockPermis,async(req,res)=>{
  let user= await controller.AdminRegister.block(req.body)
  res.json(user)
})

//Admin unblock the user
router.put("/unblock",IsAuth, unblockPermis,async(req,res)=>{
  let user= await controller.AdminRegister.unblock(req.body)
  res.json(user)
})


//admin edit the details
router.put("/edit",IsAuth, EditPermis,async(req,res)=>{
  let user= await controller.AdminRegister.edit(req.body)
  res.json(user)
})

//Delete user
router.delete("/delete",IsAuth, deletePermis,async(req,res)=>{
  let user= await controller.AdminRegister.deleteperson(req.body);
  res.json(user)
})


module.exports = router;
