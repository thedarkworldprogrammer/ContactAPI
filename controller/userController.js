import express from 'express'
import mongoose from 'mongoose'
import { User } from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

// API - /api/user/signup
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    let checkUser = await User.findOne({ email })

    if (!checkUser) {
        let hasPassword = await bcrypt.hash(password, 10)
        let user = await User.create({ name, email, password: hasPassword })
        res.json({ message: 'User Registration Successful', user, status: true })
    } else {
        res.json({ message: 'User Already Exist.', status: false })
    }
}

// API - /api/user/login
export const login = async (req, res) => {
    const { email, password } = req.body;
    let checkUser = await User.findOne({ email })

    if (!checkUser) {
        res.json({
            message: "user not",
            status: false
        })
    } else {
        let validUser = await bcrypt.compare(password, checkUser.password)
        if (validUser) {
            let token = await jwt.sign({ userId: checkUser._id }, process.env.SECRET_KEY,{
                expiresIn: '1d'
            })
            res.json({
                message: "Login Successfull", status: true, token
            })
        }else{
            res.json({
                message: "Login Unsuccessfull", status: false
            })
        }
    }

}