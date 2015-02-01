app.controller("ContactsEditCtrl", function($scope, $routeParams, $location, Contact) {

  if ($routeParams.id) {
    $scope.contact = Contact.show({ id: $routeParams.id });
  } else {
    $scope.contact = new Contact();
  }
  $scope.message = '';
  $scope.submit = function() {
    console.log("submit")

    function success(response) {
      console.log("success", response)
      $location.path("/contacts");
    }

    function failure(response) {
      console.log("failure", response)

      _.each(response.data, function(errors, key) {
        _.each(errors, function(e) {
          $scope.form[key].$dirty = true;
          $scope.form[key].$setValidity(e, false);
          $scope.message = $scope.message + e;
        });
      });
    }

    if ($routeParams.id) {
      Contact.update($scope.contact, success, failure);
    } else {
      Contact.create($scope.contact, success, failure);
    }

  };

  $scope.cancel = function() {
     if($scope.contact.id) {
        $location.path("/contacts/"+$scope.contact.id);
     }
     else {
        $location.path("/contacts");
     }
    
  };
  
  $scope.destroy = function() {
     // function success(response) {
     //   console.log("success", response)
     //   $location.path("/contacts");
     // }
     //
     // function failure(response) {
     //   console.log("failure", response)
     //
     //   _.each(response.data, function(errors, key) {
     //     _.each(errors, function(e) {
     //       $scope.form[key].$dirty = true;
     //       $scope.form[key].$setValidity(e, false);
     //       $scope.message = $scope.message + e;
     //     });
     //   });
     // }
     $location.path("/contacts");
     Contact.destroy($scope.contact);
     // $scope.contacts.$remove($scope.contact).then(function(data) {
     //     $location.path('/contacts');
     // });
  };

  $scope.errorClass = function(name) {
    var s = $scope.form[name];
    return s.$invalid && s.$dirty ? "error" : "";
  };

  $scope.errorMessage = function(name) {
    var s = $scope.form[name].$error;
    result = [];
    _.each(s, function(key, value) {
      result.push(value);
    });
    return result.join(", ");
  };
});