var app = angular.module('fakeApplication', []);

let allHistoryData = [];
let queryHistory;
// let queryEnterance_result;
let allStatusData = [];
let queryEnterance;


app.controller('fakeAppController', function($scope, appFactory,$filter) {

    //queryAllenterance 라는 ng-click에 function() 이하를 넣는다
    $scope.queryAllEnterance = function () {
        appFactory.queryAllEnterance(function (data) { //appFactory.queryAllEnterance하면 get방식으로 enterance모든 데이터가 callback으로 넘겨짐
            var array = [];
            for (var i = 0; i < data.length; i++) {
                parseInt(data[i].Key);
                data[i].Record.Key = parseInt(data[i].Key);
                array.push(data[i].Record);
            }
            array.sort(function (a, b) {
                return parseInt(a.Key) - parseInt(b.Key);
            });
            allStatusData = array;
            return allStatusData;
        });
    }
    queryAllEntrance = $scope.queryAllEnterance;


    $scope.queryEnterance = (id) => {
        try {
            appFactory.queryEnterance(id, function (data) {
                // queryEnterance_result = data;
                return data;
            });
        }
        catch (e) {
            console.log(e);
            alert("queryEnterance 불가!!");
        }
    }
    queryEnterance = $scope.queryEnterance;



/*     $scope.queryHistory = (id) => {
        let resultArr = [];
        for (let i = 0; i < allHistoryData.length; i++) {
            if (id == allHistoryData[i].Key) {
                resultArr.push(allHistoryData[i]);
            }
        }
        return resultArr;
    }
    queryHistory = $scope.queryHistory(); */

/*     $scope.queryHistoryTop10 = () => {
        let arr = [];
        let getArr = $scope.queryHistory(userData.Key);
        getArr.sort((a, b) => { return ((a.timestamp == b.timestamp) ? 0 : ((a.timestamp > b.timestamp) ? -1 : 1)); });
        for (let i = 0; i < getArr.length; i++) {
            arr.push(getArr[i]);
            test.push(getArr[i]);
            if (arr.length == 8) break;
        }
        return arr;
    } */




})

// Angular Factory
app.factory('appFactory', function ($http) {

    var factory = {};

    factory.queryAllEnterance = function (callback) {

        $http.get('/get_all_enterance/').success(function (output) {
            callback(output)
        });
    }

    factory.queryEnterance = function (id, callback) {
        $http.get('/get_enterance/' + id)
            .then(function success(output) {
                console.log(output);
                callback(output)
            }, function error(err) {
                console.error(err);
                callback(err);
            });
    }

    factory.queryHistory = (id, callback) => {
        $http.get('/get_history/' + id)
            .then(function success(output) {
                callback(output)
            }, function error(err) {
                console.error(err);
                callback(err);
            });
    }

    factory.recordBarcode = function (data, callback) {

        var enterance = data.id + "-" + data.name + "-" + data.timestamp + "-" + data.location + "-" + data.state;

        $http.get('/add_barcode/' + enterance).success(function (output) {
            callback(output)
        });
    }

    factory.UpdateEnterance = function (data, callback) {

        var updated_enterance = data.id + "-" + data.timestamp + "-" + data.location + "-" + data.state;

        $http.get('/update_enterance/' + updated_enterance).success(function (output) {
            callback(output)
        });
    }

    return factory;
});
