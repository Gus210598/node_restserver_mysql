import express, { Application } from 'express';
import cors from 'cors'

import userRoutes from '../routes/usuario'
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios/'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '4000';

        this.dbConnection();
        this.middlewares();

        // Definir mis rutas
        this.routes();
    }

    middlewares() {

        // Cors
        this.app.use( cors() );

        // Lectur del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );

    }

    async dbConnection() {
        
        try {

            await db.authenticate();
            console.log('');
            console.log('Aer DB online.... bkn...')
            
        } catch (  error ) {
            console.log( error )
        }
    }

    routes() {

        this.app.use( this.apiPaths.usuarios, userRoutes )

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto '+ this.port +' Arriba los cuescos');
        }) 
    }
}

export default Server;
