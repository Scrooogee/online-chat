import express from "express";
import bcrypt from "bcrypt";
import { validationResult, Result } from "express-validator";
import jwt from "jsonwebtoken";

import  UserModel  from "../models/User.js";
import  createJWToken  from "../utils/createJWToken.js";

class UserController {
  io;

  constructor(io) {
    this.io = io;
  }

  show = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json(user);
    });
  };

  getMe = (req, res) => {
    const id = req.user && req.user._id;
    UserModel.findById(id, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json(user);
    });
  };

  findUsers = (req, res) => {
    const query = req.query.query;
    UserModel.find()
      .or([
        { fullname: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ])
      .then((users) => res.json(users))
      .catch((err) => {
        return res.status(404).json({
          status: "error",
          message: err,
        });
      });
  };

  delete = (req, res) => {
    const id = req.params.id;
    UserModel.findOneAndRemove({ _id: id })
      .then((user ) => {
        if (user) {
          res.json({
            message: `User ${user.fullname} deleted`,
          });
        } else {
          res.status(404).json({
            status: "error",
          });
        }
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      });
  };
  
  create = async (req, res) => {
    try {
      const errors = validationResult(req)

      if(!errors.isEmpty) {
          return res.status(400).json(errors.array())
      }

      const password = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const doc = new UserModel({
        email: req.body.email,
        fullname: req.body.fullname,
        passwordHash: hash,
        avatar: req.body.avatar
      });

      

      const user = await doc.save()


      const token = jwt.sign(
          {
              _id: user._id
          },
          'secretToken',
          {
              expiresIn: '30d'
          }
      );

      const {passwordHash, ...userData} = user._doc;

      res.json({userData, token})
  } catch (error) {
      console.log(error)
      res.status(500).json({
          message: 'Failed to register user'
      })
  }
  };


  verify =  (req, res) => {
    const hash = req.query.hash;

    if (!hash) {
      res.status(422).json({ errors: "Invalid hash" });
    } else {
      UserModel.findOne({ confirm_hash: hash }, (err, user) => {
        if (err || !user) {
          return res.status(404).json({
            status: "error",
            message: "Hash not found",
          });
        }

        user.confirmed = true;
        user.save((err) => {
          if (err) {
            return res.status(404).json({
              status: "error",
              message: err,
            });
          }

          res.json({
            status: "success",
            message: "Аккаунт успешно подтвержден!",
          });
        });
      });
    }
  };

  login = async (req, res) => {
    try {
      const user = await UserModel.findOne({email: req.body.email});
      
      if(!user) {
          return res.status(404).json({
              message: 'Login or password is incorrect'
          })
      };


      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

      if (!isValidPass) {
          return res.status(404).json({
              message: 'Login or password is incorrect'
          })
      };

      const token = jwt.sign(
          {
              _id: user._id
          },

          'secretToken',
          {
              expiresIn: "30d"
          }
      );

      const {passwordHash, ...userData} = user._doc

      res.json({userData, token})
  } catch (error) {
      console.log(error)
      res.status(500).json({
          message: 'Failed to login'
      })
  }
  };
}

export default UserController;
