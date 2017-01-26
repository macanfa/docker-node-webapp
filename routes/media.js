var router = require('express').Router(),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    mediaRoot = './media'

function dump_req(req) {
    return req.method + " " + req.url + " " + req.httpVersion + "\n" +
        JSON.stringify(req.headers)
}

function dump_res(res) {
    return res._header
}

router.get('/', function(req, res) {
    res.render('media', { title: 'Streaming Media', content: 'Streaming Video from ' + mediaRoot });
})
router.get('/list', function(req, res) {
    res.json(listFolder(mediaRoot))
})

router.get('/list/:id', function(req, res) {
    res.json(listFolder(mediaRoot)[req.params.id])
})

router.get('/play/:id', function(req, res) {
    streamVideo(req, res);
})

function listFolder(mediaRoot) {
    dataJSON = []
    folderList = fs.readdirSync(mediaRoot)
    for (var i = 0; i < folderList.length; i++) {
        if (fs.lstatSync(mediaRoot + '/' + folderList[i]).isFile()) {
            dataJSON.push({
                'id': i,
                'path': mediaRoot + '/' + folderList[i],
                'mime': mime.lookup(mediaRoot + '/' + folderList[i]),
                'name': path.basename(folderList[i], path.extname(folderList[i])),
                'size': fs.statSync(mediaRoot + '/' + folderList[i]).size
            })
        }
    }
    return dataJSON
}

function streamVideo(req, res) {
    media = listFolder(mediaRoot)[req.params.id]
        //console.log('*** Request: ', dump_req(req))
    stat = fs.statSync(media.path),
        total = stat.size

    //console.log('*** REQ-HEADERS: ' + JSON.stringify(req.headers, null, 2))

    if (req.headers['range']) {
        var range = req.headers.range,
            parts = range.replace(/bytes=/, "").split("-"),
            partialstart = parts[0],
            partialend = parts[1],
            start = parseInt(partialstart, 10),
            end = partialend ? parseInt(partialend, 10) : total - 1,
            chunksize = (end - start) + 1
            //console.log('*** RANGE: ' + start + ' - ' + end + ' = ' + chunksize);
        var file = fs.createReadStream(media.path, { start: start, end: end })

        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        })
        file.pipe(res)
    } else {
        //console.log('*** ALL: ' + total)
        res.writeHead(200, {
            'Content-Length': total,
            'Content-Type': 'video/mp4'
        })
        fs.createReadStream(media.path).pipe(res)
    }
}

module.exports = router