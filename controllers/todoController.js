const Todo = require("../models/todoModel")
const url = require('url');
const querystring = require('querystring');

module.exports = {
    create: function (req, res) {
        const todo = new Todo({
            title: req.body.title,
            text: req.body.text,
            userId: req.body.userId
        });
        Todo.create(todo)
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
            Todo.find({})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
            return;
        }
        const user_id = paramDict["userId"]
        if (!user_id)
            res.status(400).end("No userId provided");
        Todo.find({userId: user_id})
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    delete: async function (req, res) {
        let parsedRouteUrl = url.parse(req.url);
        let paramDict = querystring.parse(parsedRouteUrl.query);
        let id = paramDict["id"]
        if (Object.keys(paramDict).length === 0)
            return res.status(405).end("Method Not Allowed");
        if (id == null)
        {
            return res.status(400).end("No id provided");
        }

        try {
            const todo = await Todo.findByIdAndDelete(id);
            res.status(200).json(todo);
        }
        catch(error)
        {
            res.status(404).end("Invalid todo id.");
        }
    },
    put: async function (req, res) {
        let parsedRouteUrl = url.parse(req.url);
        let paramDict = querystring.parse(parsedRouteUrl.query);
        if (Object.keys(paramDict).length === 0)
            return res.status(405).end("Method Not Allowed");
        let id = paramDict["id"]
        if (id == null)
        {
            return res.status(400).end("No id provided");
        }
        let todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).end("Could not find todo");
        }
        const title = req.body["title"]
        const text = req.body["text"]
        todo.set({title:title , text: text});
        await todo.save();
        res.status(200).json(todo);
    }

}