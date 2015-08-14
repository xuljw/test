/// <reference path="typings/knockout/knockout.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />

module RammTest.View {
    "use strict";

    $(document).ready(function (): void {
        var viewModel = new ViewModel();
        ko.applyBindings(viewModel);
    });

    export class ViewModel {
        people: KnockoutObservableArray<IPersonModel>;
        jobs: KnockoutObservableArray<IJobModel>;
        selectedPerson: KnockoutObservable<IPersonModel>;

        constructor() {
            this.people = ko.observableArray<IPersonModel>();
            this.jobs = ko.observableArray<IJobModel>();
            this.selectedPerson = ko.observable<IPersonModel>();

            this.loadPeople();
        }

        private loadPeople(): void {
            $.ajax({
                url: location.protocol + '//' + location.host + location.pathname + 'api/people/getpeople/',
                success: (data: IPersonModel[], textStatus: string, request: JQueryXHR): any => {
                    this.people(data);
                    this.selectedPerson(data[0]);
                    this.loadJobs();
                },
                error: (request: JQueryXHR, textStatus: string, errorThrown: string): any => {

                }
            });
        }

        private loadJobs(): void {
            $.ajax({
                url: location.protocol + '//' + location.host + location.pathname + 'api/people/getjobs/' + this.selectedPerson().Id,
                success: (data: IJobModel[], textStatus: string, request: JQueryXHR): any => {
                    this.jobs(data);
                },
                error: (request: JQueryXHR, textStatus: string, errorThrown: string): any => {

                }
            });
        }

        private resetDoneJobs() {
            $.ajax({
                url: location.protocol + '//' + location.host + location.pathname + 'api/people/getresetdonejobs/' + this.selectedPerson().Id,
                success: (data: IJobModel[], textStatus: string, request: JQueryXHR): any => {
                    
                },
                error: (request: JQueryXHR, textStatus: string, errorThrown: string): any => {

                }
            });
        }
    }

    export interface IPersonModel {
        Id: number;
        Name: string;
    }

    export interface IJobModel {
        Id: number;
        Description: string;
        Done: boolean;
    }
}