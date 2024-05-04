function callController(req, res, selectedRoute) {
    return selectedRoute(req, res);
}

class Router {

    // Attributes in form of {string1 : fun1, string2 : fun2, ...}
    getRoutes
    postRoutes
    putRoutes
    deleteRoutes
    patchRoutes

    constructor() {
        this.getRoutes = {}
        this.postRoutes = {}
        this.putRoutes = {}
        this.deleteRoutes = {}
        this.patchRoutes = {}
    }

    get(url, controller) {
        if (this.getRoutes[url])
            console.error(`\"${url}\" was already added as GET route`)
        this.getRoutes[url] = controller
    }

    post(url, controller) {
        if (this.postRoutes[url])
            console.error(`\"${url}\" was already added as POST route`)
        this.postRoutes[url] = controller
    }

    put(url, controller) {
        if (this.putRoutes[url])
            console.error(`\"${url}\" was already added as PUT route`)
        this.putRoutes[url] = controller
    }

    delete(url, controller) {
        if (this.deleteRoutes[url])
            console.error(`\"${url}\" was already added as DELETE route`)
        this.deleteRoutes[url] = controller
    }

    patch(url, controller) {
        if (this.patchRoutes[url])
            console.error(`\"${url}\" was already added as PATCH route`)
        this.patchRoutes[url] = controller
    }

    handleRoute(req, res) {

        let reqUrl = req.url.split(`?`)[0]
        try {
            switch (req.method) {
                case "POST":
                    return callController(req, res, this.postRoutes[reqUrl]);
                case "GET":
                    return callController(req, res, this.getRoutes[reqUrl]);
                case "DELETE":
                    return callController(req, res, this.deleteRoutes[reqUrl]);
                case "PUT":
                    return callController(req, res, this.putRoutes[reqUrl]);
                case "PATCH":
                    return callController(req, res, this.patchRoutes[reqUrl]);
                default:
                    throw new Error(`no route with such http verb: ${req.method}`);
            }
        } catch (error) {
            res.status(404).json({"message": "API not found"})
        }

    }
}

module.exports = Router;
