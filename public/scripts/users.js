(function() {
    "use strict";

    angular
        .module('app')
        .controller('UsersCtrl', ['$http', usersController]);

    function usersController($http) {

        let vm = this;
        vm.showLoadMore = true;

        const userURL = "https://jsonplaceholder.typicode.com/users" ;
        const albumURL = "https://jsonplaceholder.typicode.com/albums" ;
        const photosURL = "https://jsonplaceholder.typicode.com/photos";

        vm.getUsers = () => {
            $http.get(userURL)
                .then(successfulResponse, errorResponse);

            function successfulResponse(res) {
                let results = res.data;
                vm.userData = results;
            }

            function errorResponse() {
                console.log('Users API Call Error');
            }
        };

        const getPhotos = (id, start, limit = 10) =>{
            if (start === undefined) {
                vm.start = vm.start + 10
            } else {
                vm.start = start;
            }
            return $http.get(photosURL + '?albumId=' + id + "&_start=" + vm.start + "&_limit=" + limit)
                .then(successfulResponse, errorResponse);

            function successfulResponse(res) {
                return res.data;
            }

            function errorResponse() {
                console.log('Photos API Call Error');
            }
        };

        vm.loadMorePhotos = (albumId) => {
            getPhotos(albumId).then(photos => {
                if (photos.length < 1) {
                    vm.showLoadMore = false
                }
                vm.photos = [...vm.photos, ...photos];
            });
        };

        vm.getAlbums = (id) =>{
            vm.photos = null;
            vm.user = vm.userData.find(user => user.id === id);

            $http.get(albumURL + '?userId=' + id)
                .then(successfulResponse, errorResponse);

            function successfulResponse(res) {
                let results = res.data;

                results.map(album => {
                    getPhotos(album.id, 0, 10).then(photos => {
                        album.photos = photos;
                        album.thumbnail = photos[0].thumbnailUrl;
                        album.start = 0;
                        album.limit = 10;
                    });
                });


                vm.albums = results;
            }

            function errorResponse() {
                console.log('Albums API Call Error');
            }

        };

        vm.displayPhotoAlbum = (id) => {
            vm.photo = null;
            vm.showLoadMore = true;
            vm.album = vm.albums.find(album => album.id === id);
            vm.photos = vm.album.photos;
        };

        vm.getPhoto = (id) => {
            vm.photo = vm.photos.find(photo => photo.id === id)
        }
    }
})();