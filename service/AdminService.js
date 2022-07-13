const Model = require("../model");
const { Op } = require("sequelize");
exports.getAdmin = (data) => {
  return Model.AdminRegister.findOne({
    where: { email: data.email },
  });
};

exports.addAdmin = (data) => {
  return Model.AdminRegister.create(data);
};

exports.findblocked = () => {
  return Model.AdminRegister.findAndCountAll({
    where: { destroyTime: null },
    attributes: { exclude: ["password", "blocked", "deleted"] },
  });
};
exports.findNotblocked = () => {
  return Model.AdminRegister.findAndCountAll({
    where: { Isblocked: 0 },
    attributes: {
      exclude: [
        "adminId",
        "IsAdmin",
        "password",
        "blocked",
        "deleted",
        "Isblocked",
        "BlockedPermission",
        "UnblockedPermission",
        "DeletedPermission",
        "EditPermission",
        "createdAt",
        "updatedAt",
        "destroyTime",
      ],
    },
  });
};
exports.findNotblockeds = () => {
  return Model.AdminRegister.findAndCountAll({
    where: { Isblocked: 1 },
    attributes: {
      exclude: [
        "adminId",
        "IsAdmin",
        "password",
        "blocked",
        "deleted",
        "Isblocked",
        "BlockedPermission",
        "UnblockedPermission",
        "DeletedPermission",
        "EditPermission",
        "createdAt",
        "updatedAt",
        "destroyTime",
      ],
    },
  });
};

//view all
exports.view = () => {
  return Model.AdminRegister.findAll({
    attributes: {
      exclude: [ "password", "blocked", "deleted"],
    },
  });
};
//view specific person
exports.viewperson = (data) => {
  return Model.AdminRegister.findOne({
    where: { adminId: data.adminId },
  });
};

//delete a person
exports.deleteperson = (data) => {
  return Model.AdminRegister.destroy({
    where: { name: data.name },
  });
};

//update the person

//firstly find the person

exports.get = (data) => {
  return Model.AdminRegister.findOne({
    where: { name: data.name },
  });
};
//block the person
exports.blockperson = (data) => {
  return Model.AdminRegister.update(
    { Isblocked: 1 },
    { where: { name: data.name } }
  );
};

//unblock person
exports.unblockperson = (data) => {
  return Model.AdminRegister.update(
    { Isblocked: 0 },
    { where: { name: data.name } }
  );
};

//Edit the user
exports.edit = (d) => {
  return Model.AdminRegister.update(
    {     name: d.name,
      RegistrationPermission: d.RegistrationPermission,
      BlockedPermission:d.BlockedPermission,
      UnblockedPermission:d.UnblockedPermission,
      DeletedPermission:d.DeletedPermission,
      EditPermission:d.EditPermission,
      email: d.email, },
    {
      where: { email: d.email },
    }
  );
};
