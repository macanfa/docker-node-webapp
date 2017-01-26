//
//  Page Functions
//
function prettify(obj) {
    return JSON.stringify(obj, null, 2);
}

function callback(data) {
    if (data) {
        console.log(prettify(data));
    }
}

function displayList(data) {
    callback(data)
    dataList.innerHTML = ''
    for (var i = 0; i < data.length; i++) {
        dataObject = JSON.stringify(data[i])
        if (data[i].name.charAt(0) != '.') {
            dataList.innerHTML += '<button onclick="playMedia(' + data[i].id + ')">' + data[i].name + '</button>' + "\n"
        }
    }
}

function playMedia(id) {
    $.getJSON('/media/list/' + id, function(media) {
        dataName.innerHTML = '<i>Streaming : ' + media.name + '</i>'
        videoID.innerHTML = '<video controls preload autoplay>' +
            '<source src="/media/play/' + media.id + '" type="' + media.mime + '">' +
            '</video>'
    })
}

//
//	Extend jQuery Functions
//
$.put = function(url, data, callback, type) {
    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    });
}
$.delete = function(url, data, callback, type) {
    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: data,
        contentType: type
    });
}

//
//  jQuery API Calls
//
function restFul(methode, id, object, callback) {
    switch (methode) {
        case 'get':
            $.get('/api/id/' + id, function(data) {
                callback(data)
            })
            break
        case 'post':
            $.post('/api/', object,
                function(data, textStatus, jqXHR) {
                    callback(data)
                }
            )
            break
        case 'put':
            $.put('/api/id/' + id, object,
                function(data, textStatus, jqXHR) {
                    callback(data)
                }
            )
            break
        case 'delete':
            $.delete('/api/id/' + id, function(data) {
                callback(data)
            })
            break
    }
}

//
//  jQuery Media Calls
//
function getMediaList() {
    $.get('/media/list', null,
        function(data, textStatus, jqXHR) {
            displayList(data)
        }
    )
}