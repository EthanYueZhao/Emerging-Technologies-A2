'use strict';
var chatApp = angular.module('chatApp', []);

chatApp.factory('socket', function () {
    var socket = io.connect('http://localhost:3000');
    return socket;
});

chatApp.controller('chatCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        $scope.msgs = [];
        $scope.sendMsg = function () {
            var clientMsg =  $scope.msg.text + '     sent time: ' + new Date().toString();
            socket.emit('send message', clientMsg);
            $scope.msgs.push(clientMsg);
            $scope.msg.text = '';
        };

        socket.on('get message', function (data) {
            $scope.msgs.push(data);
            $scope.$digest();
        })
    }]);