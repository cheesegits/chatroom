$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var userCount = $('#numberOfUsers');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    var addUserCount = function(numberOfUsers) {
        console.log(numberOfUsers);
        userCount.html('<p>Number of users: ' + numberOfUsers + '</p>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message', addMessage);
    socket.on('userCount', addUserCount);
});