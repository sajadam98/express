const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

//Get All Members
router.get("/", (req, res) => {
  res.json(members);
});

//Get Singel Member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No Member With Id Of ${req.params.id}` });
  }
});

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: req.body.status
  };

  if (!newMember.name || !newMember.email || !newMember.status) {
    return res
      .status(400)
      .json({ msg: "Please Include a name and email and status !!!" });
  }

  members.push(newMember);
  res.json(members);
  res.redirect('/');
});

//Update Singel Member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
        if(member.id === parseInt(req.params.id)){
            member.name = updateMember.name ? updateMember.name:member.name;
            member.email = updateMember.email ? updateMember.email: member.email;
            member.status = updateMember.status ? updateMember.status : member.status;

            res.json({msg: 'Member Updated :)' , member})
        }
    });
  } else {
    res.status(400).json({ msg: `No Member With Id Of ${req.params.id}` });
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({msg : "Member Deleted :) " ,members: members.filter(member => member.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ msg: `No Member With Id Of ${req.params.id}` });
  }
});

module.exports = router;
