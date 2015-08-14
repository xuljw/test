/// <reference path="typings/knockout/knockout.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
var RammTest;
(function (RammTest) {
    var View;
    (function (View) {
        "use strict";
        $(document).ready(function () {
            var viewModel = new ViewModel();
            ko.applyBindings(viewModel);
        });
        var ViewModel = (function () {
            function ViewModel() {
                this.people = ko.observableArray();
                this.jobs = ko.observableArray();
                this.selectedPerson = ko.observable();
                this.loadPeople();
            }
            ViewModel.prototype.loadPeople = function () {
                var _this = this;
                $.ajax({
                    url: location.protocol + '//' + location.host + location.pathname + 'api/people/getpeople/',
                    success: function (data, textStatus, request) {
                        _this.people(data);
                        _this.selectedPerson(data[0]);
                        _this.loadJobs();
                    },
                    error: function (request, textStatus, errorThrown) {
                    }
                });
            };
            ViewModel.prototype.loadJobs = function () {
                var _this = this;
                $.ajax({
                    url: location.protocol + '//' + location.host + location.pathname + 'api/people/getjobs/' + this.selectedPerson().Id,
                    success: function (data, textStatus, request) {
                        _this.jobs(data);
                    },
                    error: function (request, textStatus, errorThrown) {
                    }
                });
            };
            ViewModel.prototype.resetDoneJobs = function () {
                $.ajax({
                    url: location.protocol + '//' + location.host + location.pathname + 'api/people/getresetdonejobs/' + this.selectedPerson().Id,
                    success: function (data, textStatus, request) {
                    },
                    error: function (request, textStatus, errorThrown) {
                    }
                });
            };
            return ViewModel;
        })();
        View.ViewModel = ViewModel;
    })(View = RammTest.View || (RammTest.View = {}));
})(RammTest || (RammTest = {}));
//# sourceMappingURL=rammTest.js.map