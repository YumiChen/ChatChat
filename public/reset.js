var reset;

window.onload = function(){
    // leave if no token is sent
    if(location.href){

    }
    
    reset = function(event){
        event.preventDefault();
        var input = document.querySelector("password");
        var api = "/resetPassword";
        fetch(api,{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: {
                _id: "",
                password: input.value
            }
        }).then(function(data){
            return data.json();
        }).then(function(data){
            if(data.success){
                // success
            }else{
                // fail
            }
        });
    };
}