'use strict';
// main app module
var chatApp = angular.module('chatApp', ['ngRoute', 'chatAppControllers']);

// app route config
chatApp.config(['$routeProvider', 
    function ($routeProvider)
    {
      $routeProvider.
      when('/chat', {
            templateUrl: '/partial/chat.html',
            controller: 'chatCtrl'
        }).
      otherwise({
            redirectTo: '/chat'            
        });
    }]);

// get socket service
chatApp.factory('socket', function ()
{
    var socket = io.connect('http://localhost:3000');
    return socket;
});

// app controllers module
var chatAppControllers = angular.module('chatAppControllers', []);

// chat partial controller
chatAppControllers.controller('chatCtrl', ['$scope', 'socket',
    function ($scope, socket)
    {
        $scope.msgs = [];
        $scope.sendMsg = function ()
        {
            var clientMsg = $scope.msg.text;
            socket.emit('send message', clientMsg); // emit message to server
            $scope.msgs.push(clientMsg + '     sent time: ' + new Date().toString()); // add message to local array
            $scope.msg.text = ''; // clear input box
        };
        
        socket.on('get message', function (data)
        {
            $scope.msgs.push(data); // add message emitted from server to local array
            $scope.$digest(); // refresh local array
        })
    }]);