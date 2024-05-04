const http = require('http');
const url = require('url');
const Router = require('./router.js');

class App {
    // Port to run the server
    port
    // All the routes; populate using "use()" fun
    router
    // All the static {<BeginningOfRoute> : <PathInRelativeWith_Main>} values; populate using "importAsset()" fun
    resourceFolders

    constructor(port) {
        this.port = port;
        this.router = new Router();
        this.resourceFolders = {};
    }

    listen() {
        // Everytime a request is received, below function is triggered
        const server = http.createServer(async (req, res) => {

            console.log('Request was made: \"' + req.url + "\" on METHOD: " + req.method);

            res = this.addResFeatures(res);
            if (req.method === 'OPTIONS') {
                res.writeHead(204); // No Content status
                res.end();
                return;
            }
            if(this.isJSONOnReq(req)) {
                this.HandleJSONReq(req, res);
            }
            else {
                this.router.handleRoute(req, res);
            }

        });

        // Start server listener
        server.listen(this.port, '0.0.0.0');
        console.log(`Listening on port ${this.port}...`);
    }

    isJSONOnReq(req) {
        return req.headers['content-type'] === 'application/json';
    }

    HandleJSONReq(req, res) {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', function () {
            let finalData = {}
            if (data){
                finalData = JSON.parse(data);
                req.body = finalData;

                this.router.handleRoute(req,res);
            }
        }.bind(this));
    }
    use(router) {
        // Glue the routes from received parameter into already existing routes in this-instance.
        this.router.getRoutes = { ...this.router.getRoutes, ...router.getRoutes }
        this.router.postRoutes = { ...this.router.postRoutes, ...router.postRoutes }
        this.router.deleteRoutes = { ...this.router.deleteRoutes, ...router.deleteRoutes }
        this.router.putRoutes = { ...this.router.putRoutes, ...router.putRoutes }
        this.router.patchRoutes = { ...this.router.patchRoutes, ...router.patchRoutes }
    }


    addResFeatures(res) {
        res.json = function (JSONObj) {

            res.end(JSON.stringify(JSONObj));
            return res;
        }

        res.status = function (newStatusCode) {
            res.statusCode = newStatusCode;
            return res;
        }

        res.redirect = (destUrl) => {

            res.writeHead(302, {'Location': destUrl});
            res.end();
        }

        res.setHeader('Access-Control-Allow-Origin', '*'); // This allows all domains
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return res;
    }
}

module.exports = App; 