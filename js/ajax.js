function sendAjax(url,method,data,callback){
    $.ajax({
        url : url,
        method : method,
        data : data
    }).done(function(data){
        callback(data);
    }).fail(function(){
        callback({result : false});
    })
}