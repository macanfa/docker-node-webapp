//
//  Page Functions
//
function prettify(obj) {
    return JSON.stringify(obj, null, 2);
}

function callback(data) {
    dataList.innerHTML = '';
    if (data) {
        dataList.innerHTML = prettify(data);
    }
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