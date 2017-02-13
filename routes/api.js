var router = require('express').Router()

router.get('/', function(req, res) {
    res.render('api', {
        title: 'RestFul API',
        content: 'Webservice RestFul API',
		code: JSON.stringify(router.stack, null, 2)
    })
})
router.get('/info', function(req, res) {
	res.send(router.stack)
})
router.post('/', function(req, res) {
    response(req, res)
})
router.get('/id/:id', function(req, res) {
    response(req, res)
})
router.put('/id/:id', function(req, res) {
    response(req, res)
})
router.delete('/id/:id', function(req, res) {
    response(req, res)
})
module.exports = router

function response(req, res) {
    res.json({ 'api-key' : req.headers['api-key'], method: req.method, id: req.params.id, body: req.body })
}