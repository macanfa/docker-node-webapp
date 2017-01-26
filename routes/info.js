var router = require('express').Router(),
    os = require('os')

router.get('/', function(req, res) {
    res.render('index', { title: 'Informationen', content: 'OS & Framework Informationen', code: JSON.stringify(getInfo(req), null, 2) })
})
module.exports = router

function getInfo(req) {
    info = []
    info.push({ 'req.headers': req.headers })
    info.push({ 'process.versions': process.versions })
    info.push({ 'process.env': process.env })
    info.push({ 'os.type': os.type() })
    info.push({ 'os.platform': os.platform() })
    info.push({ 'os.arch': os.arch() })
    info.push({ 'os.release': os.release() })
    info.push({ 'os.hostname': os.hostname() })
    info.push({ 'os.tmpDir': os.tmpDir() })
    info.push({ 'os.networkInterfaces': os.networkInterfaces() })
    info.push({ 'os.uptime': os.uptime() })
    info.push({ 'os.totalmem': os.totalmem() })
    info.push({ 'os.freemem': os.freemem() })
    info.push({ 'os.loadavg': os.loadavg() })
    info.push({ 'os.cpus': os.cpus() })
    return info
}