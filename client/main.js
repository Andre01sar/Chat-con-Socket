var socket = io.connect('http://192.168.1.42:6677',{'forceNew': true});


socket.on('messages', function(data){
    console.log(data);
    render(data); 
});

function render(data) {
    var html = data.map(function(message, index) {
        return `
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `;
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    if (div_msgs) { 
        div_msgs.innerHTML = html;
        div_msgs.scrollTop = div_msgs.scrollHeight;
    }
}

function addMessage(e) {

    e.preventDefault();


    var nickname = document.getElementById('nickname').value;
    var text = document.getElementById('text').value;


    if (nickname.trim() === '' || text.trim() === '') {
        alert('Por favor, completa ambos campos antes de enviar un mensaje.');
        return false;
    }


    var message = {
        nickname: nickname,
        text: text
    };


    document.getElementById('nickname').style.display = 'none'; 


    if (typeof socket !== 'undefined') { 
        socket.emit('add-message', message);
    } else {
        console.error('Socket no está definido.');
    }


    document.getElementById('text').value = '';



    return false; // Evita la recarga de la página
}


