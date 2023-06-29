import { Router } from 'express';
import { getUsuarios, getUsuario, postUsuario, deleteUsuario, putUsuario } from '../controllers/usuarios';

const router = Router();

router.get('/'      , getUsuarios );
router.get('/:id'   , getUsuario );
router.post('/'     , postUsuario );
router.put('/:id'   , putUsuario );
router.delete('/:id', deleteUsuario );


export default router;
