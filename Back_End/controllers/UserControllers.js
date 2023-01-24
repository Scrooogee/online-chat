import UserModel from '../models/User.js'

import { validationResult } from 'express-validator';

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'



export const Registration = async (req, res) => {
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
            userName: req.body.userName,
            name: req.body.name,
            passwordHash: hash
        });

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secretToken',
            {
                expiresIn: '7d'
            }
        );

        const {passwordHash, ...userData} = user._doc

        res.json({userData, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Couldn\'t register'
        })
    }
};

export const Login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if(!user) {
            return res.status(404).json({
                message: 'Login or password is incorrect'
            })
        }

        console.log(user)

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass) {
            return res.status(404).json({
                message: 'Login or password is incorrect'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secretToken',
            {
                expiresIn: '7d'
            }
        );

        const {passwordHash, ...UserData} = user._doc;

        res.json({UserData, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something wrong, please check your email or password'
        })
    }
};

export const AuthMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if (!user) {
            res.status(404).json({
                message: 'Error 404'
            })
        }

        const {passwordHash, userData} = user._doc;

        res.json({userData})
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Error 404'
        })
    }
}