import express     from 'express';
import middlewares from '../middlewares.mjs';
import controllers from './controllers/index.mjs';

const router = express.Router();

const checkSession = controllers.sessions.check;
const filesUpload = middlewares.filesUpload;

// Actions
router.post('/actions/:id', controllers.actions.submit);

// Sessions
router.post('/sessions', controllers.sessions.create);

// Bots
router.post('/bots', controllers.bots.create);
router.get('/bots', controllers.bots.list);

// Users
router.post('/users',                     controllers.users.create);
router.post('/users/resetPassword',       controllers.users.resetPassword);
router.get('/users/:id',    checkSession, controllers.users.show);
router.get('/users',        checkSession, controllers.users.list);
router.put('/users/:id',    checkSession, controllers.users.update);
router.delete('/users/:id', checkSession, controllers.users.delete);

// Files
router.post('/files/xmltoprd/', filesUpload, controllers.pdf.create);
router.post('/files/statement', controllers.statements.create);
router.post('/files/jsontodocx/', filesUpload, controllers.docx.create);
router.get('/targets', controllers.targets.list);

export default router;
