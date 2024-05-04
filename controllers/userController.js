const User = require("../models/userModel")
const url = require('url');
const querystring = require('querystring');

module.exports = {
    create: function (req, res) {
        let body = req.body
        const user = new User({
            firstName: body.firstName,
            lastName: body.lastName
        });
        User.create(user)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                if (err.code === 11000) {
                    res.status(409).end("ID CONFLICT ERROR");
                } else {
                    res.status(400).json({err});
                }
            });
    },
    get: function (req, res) {
        let parsedRouteUrl = url.parse(req.url);
        let paramDict = querystring.parse(parsedRouteUrl.query);
        if (Object.keys(paramDict).length === 0)
        {
            User.find({})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
            return;
        }
        const id = paramDict["id"]
        if (!id)
            res.status(400).end("Provided wrong parameters");
        User.findById({id})
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(404).end("Not Found");
            });
    },
    delete: async function (req, res) {
        let parsedRouteUrl = url.parse(req.url);
        let paramDict = querystring.parse(parsedRouteUrl.query);
        if (Object.keys(paramDict).length === 0)
            return res.status(405).end("Method Not Allowed");
        let user_id = paramDict["id"]
        if (user_id == null)
        {
            return res.status(400).end("No id provided");
        }

        try {
            const user = await User.findByIdAndDelete(user_id);
            res.status(200).json(user);
        }
        catch(error)
        {
            res.status(404).end("Invalid user id.");
        }
    },
    put: async function (req, res) {
        let parsedRouteUrl = url.parse(req.url);
        let paramDict = querystring.parse(parsedRouteUrl.query);
        if (Object.keys(paramDict).length === 0)
            return res.status(405).end("Method Not Allowed");
        let user_id = paramDict["id"]
        if (user_id == null)
        {
            return res.status(400).end("No id provided");
        }
        let user = await User.findById(user_id);

        if (!user) {
            return res.status(404).end("Could not find user");
        }
        const firstName = req.body["firstName"]
        const lastName = req.body["lastName"]
        user.set({firstName:firstName , lastName: lastName});
        await user.save();
        res.status(200).json(user);
    }

}