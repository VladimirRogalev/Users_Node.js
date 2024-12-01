import {getUsers, addUser, userExists} from './models/user.mjs';

import {createServer, IncomingMessage, ServerResponse} from 'http';

const PORT = 9192;
const parseBody = async (req) =>{
   return new Promise((resolve, reject) => {
       let body= '';
       req.on('data', (chunk) => {
           body+= chunk.toString();
       })
       req.on('end', () => {
           try{
               resolve(JSON.parse(body));
           } catch (e) {
               reject (new Error('Invalid JSON'))
           }
       })
   })
}

const server = createServer(async (req, res) => {
    const {method, url} = req;

    switch (url + method) {
        case '/api/users' + 'GET': {
            const  users = getUsers()
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(users));
            break;
        }
        case '/api/users' + 'POST': {
            const body = await parseBody(req);
            if(userExists(body.id)){
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('User already exists');
                break;
            }
            addUser(body);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Users added');
            break;
        }
        default: {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error');
        }
    }


})

server.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}` );
})
