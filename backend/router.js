const router = require('express').Router();
const TestingController = require('./controllers/TestingController');
const MainController = require('./controllers/MainController');

router.get('/',TestingController.Testing);
router.post('/getdatas',MainController.GetDatas);
router.post('/getdatas1',MainController.GetDatas1);

module.exports = router;