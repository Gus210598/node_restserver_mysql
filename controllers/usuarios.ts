import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios = async( req: Request, res: Response ) => {

    const usuarios = await Usuario.findAll()

    res.json({
        msg: 'getUsuarios',
        usuarios
    })
}

export const getUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk( id )

    if ( usuario ) {
        res.json({usuario})
    } else {
        res.status(404).json({
            msg: `No existe usuario con id ${ id }`
        })
    }
}

export const postUsuario = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if ( existeEmail ) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese correo '+ body.email
            });
        }
        const usuario = new Usuario( body );

        await usuario.save();
    
        res.json( usuario )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk( id );

        if ( !usuario ) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese id '+ id
            });
        }
        // const usuario = new Usuario( body );

        await usuario.update( body );
    
        res.json( usuario )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk( id );

        if ( !usuario ) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese id '+ id
            });
        }
        // Eliminación física
        // await usuario.destroy();
        
        // Eliminación logica
        await usuario.update({ estado: false });
    
        res.json({ msg: 'Usuario Borrado', id })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
