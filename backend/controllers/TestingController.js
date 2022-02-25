const express = require('express');
const mongoose = require('mongoose');

class TestingController{
    async Testing(req, res) {
        return res.status(200).send({message: 'Testing successful'});
    }
}
module.exports = new TestingController();