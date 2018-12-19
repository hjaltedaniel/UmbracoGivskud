angular.module("umbraco").controller("OsmMaps.PropertyEditorController",
    function ($rootScope, $scope, notificationsService, dialogService, assetsService) {
        
        var
            place,
            geocoder,
            mapCenter,

            //Getting prevalues
            defaultLat = $scope.model.config.lat,
            defaultLng = $scope.model.config.lng,
            defaultZoomLvl = parseInt($scope.model.config.zoomlevel);
        // key = $scope.model.config.key;
        var self = this;
        self.map = null;
        self.marker = null;

        $scope.model.uid = generateID();

        self.mapElement = $scope.model.alias + '_' + $scope.model.uid + '_map';


        //Loading the styles
        assetsService.loadCss("/app_plugins/OsmMaps/assets/css/osmmaps.css");
        assetsService.loadCss('/app_plugins/OsmMaps/assets/leaflet/leaflet.css');
        assetsService.loadJs('/app_plugins/OsmMaps/assets/leaflet/leaflet.js')
            .then(function () {
                initializeMap();
            });

        function generateID() {
            var d = new Date().getTime();
            var id = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return id;
        };

        
        function initializeMap() {
            self.map = L.map(self.mapElement);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(self.map);

            // Getting text for the reset button
            $scope.resetTxt = $scope.model.config.resetTxt;

            
            
            var location = $scope.model.value.split(','),
                resetBtn = document.getElementById("umb-osmmaps-reset-" + $scope.model.uid);

            if (location !== undefined && location !== null && location.length >= 2) {
                var zoom = defaultZoomLvl;
                if (location.length === 3) {
                    zoom = location[2];
                }
                self.map.setView([location[0],location[1]], zoom);
                self.marker = L.marker(location).addTo(self.map);
                //lookupPosition(new google.maps.LatLng(latLngArray[0], latLngArray[1]));
                //addMarkerDragEndListener();
            }
            else {
                self.map.setView([defaultLat, defaultLng], defaultZoomLvl);
                self.marker = L.marker([defaultLat, defaultLng]).addTo(self.map);
            }

            var mapElement = document.getElementById($scope.model.alias + '_' + $scope.model.uid + '_map');

            //geocoder = new google.maps.Geocoder();

            //var lookupInputElement = document.getElementById($scope.model.alias + '_' + $scope.model.uid + '_lookup');
            //var options = {};

            //place = new google.maps.places.Autocomplete(lookupInputElement, options);

            //addPlaceChangedListener();

            //// Calls the resetMap() function
            //google.maps.event.addDomListener(resetBtn,'click',resetMap);

            self.map.on('resize', function (e) {
                var center = self.map.getCenter();
                self.map.setView(center);
            });

            self.map.on('click', function (e) {
                var center = e.latlng;
                //alert(e.latlng); // e is an event object (MouseEvent in this case)
                $scope.model.value = e.latlng.lat + "," + e.latlng.lng + "," + self.map.getZoom();
                self.marker.setLatLng(e.latlng); // .update(); // we coude use .update() if we update the latlng object
            });
        }

        function resetMap() {

            self.map = L.map(self.mapElement);

            // Getting text for the reset button
            $scope.resetTxt = $scope.model.config.resetTxt;

            var location = $scope.model.value,
                resetBtn = document.getElementById("umb-osmmaps-reset-" + $scope.model.uid);

            if (location !== '') {
                var latLngArray = location.split(',');
                self.map.setView([latLngArray[0], latLngArray[1]], defaultZoomLvl);

                // marker = L.marker([51.5, -0.09]).addTo(map);
                //lookupPosition(new google.maps.LatLng(latLngArray[0], latLngArray[1]));
                //addMarkerDragEndListener();
            }
            else {
                map.setView([defaultLat, defaultLng], defaultZoomLvl);
            }

            return false;
        }

        function addMarkerDragEndListener() {

            google.maps.event.addListener(marker, "dragend", function (e) {

                lookupPosition(marker.getPosition());
            });
        }

        function addPlaceChangedListener() {

            google.maps.event.addListener(place, 'place_changed', function () {
                var geometry = place.getPlace().geometry;

                if (geometry) {
                    var newLocation = place.getPlace().geometry.location;

                    if (marker !== null) {
                        marker.setMap(null);
                    }

                    marker = new google.maps.Marker({
                        map: map,
                        position: newLocation,
                        draggable: true
                    });
                    marker.setMap(map);

                    lookupPosition(newLocation);
                    addMarkerDragEndListener();

                    map.setCenter(newLocation);
                    map.panTo(newLocation);
                }
            });
        }

        function lookupPosition(latLng) {

            geocoder.geocode({ 'latLng': latLng }, function (results, status) {

                //Fetches the translations from the view - it's a bit of a hack currently. It's also run each time a change happens
                var geoCodeError = document.getElementById("geoCodeError").innerText,
                    locationSet = document.getElementById("locationSet").innerText;

                if (status === google.maps.GeocoderStatus.OK) {
                    var location = results[0].formatted_address;

                    $rootScope.$apply(function () {
                        notificationsService.success(locationSet, location);

                        var newLat = marker.getPosition().lat();
                        var newLng = marker.getPosition().lng();

                        $scope.model.value = newLat + "," + newLng;
                        $scope.formattedAddress = location + ' (' + newLat + "," + newLng + ')';
                    });
                } else {
                    notificationsService.error(geoCodeError);
                }
            });
        }

    });

//Translation directive
angular.module("umbraco.directives").directive('gmapsLocalize', function (gmapsLocalizationService) {
    var linker = function (scope, element, attrs) {

        var key = scope.key;

        gmapsLocalizationService.localize(key).then(function (value) {
            if (value) {
                element.html(value);
            }
        });
    }

    return {
        restrict: "E",
        rep1ace: true,
        link: linker,
        scope: {
            key: '@'
        }
    }
});


//Translation service
angular.module('umbraco.services').factory('gmapsLocalizationService', function ($http, $q, userService) {
    var service = {
        resourceFileLoaded: false,
        dictionary: {},
        localize: function (key) {
            var deferred = $q.defer();

            if (service.resourceFileLoaded) {
                var value = service._lookup(key);
                deferred.resolve(value);
            }
            else {
                service.initLocalizedResources().then(function (dictionary) {
                    var value = service._lookup(key);
                    deferred.resolve(value);
                });
            }

            return deferred.promise;
        },
        _lookup: function (key) {
            return service.dictionary[key];
        },
        initLocalizedResources: function () {
            var deferred = $q.defer();
            userService.getCurrentUser().then(function (user) {
                $http.get("/App_plugins/OsmMaps/langs/" + user.locale + ".js")
                    .then(function (response) {
                        service.resourceFileLoaded = true;
                        service.dictionary = response.data;

                        return deferred.resolve(service.dictionary);
                    }, function (err) {
                        return deferred.reject("Lang file missing");
                    });
            });
            return deferred.promise;
        }
    }

    return service;
});
