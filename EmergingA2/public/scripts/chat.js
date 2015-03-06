'use strict';
var chatApp = angular.module('chatApp', []);

chatApp.factory('socket', function () {
    var socket = io.connect('http://localhost:3000');
    return socket;
});

chatApp.controller('chatCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        $scope.msgs=[];
        $scope.sendMsg = function () {
            socket.emit('send message', $scope.msg.text);
            $scope.msg.text='';
        };

        socket.on('get message', function (data) {
            $scope.msgs.push(data);
            $scope.$digest();
        })
    }]);