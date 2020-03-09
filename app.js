var app = angular.module('myApp', ['ngMaterial',]);
app.controller('myController', function ($scope, $timeout) {
    const firstDay =  moment(new Date(Date.UTC(2012, 0, 1))).utc();
    const RRule = rrule.RRule;
    const rules = [
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 0, 1, 10, 30)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 0, 5, 12, 30)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 0, 10, 14, 1)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 0, 15, 17, 30)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 0, 20, 17, 2)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 0, 25, 17, 3)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 0, 30, 17, 4)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 1, 1, 10, 5)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 1, 5, 12, 6)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 1, 10, 14, 7)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 1, 15, 17, 8)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 1, 20, 17, 9)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 1, 25, 17, 10)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 1, 30, 17, 11)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 2, 1, 10, 12)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 2, 5, 12, 13)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 2, 10, 14, 14)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 2, 15, 17, 15)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 2, 20, 17, 16)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 2, 25, 17, 17)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 2, 30, 17, 18)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 3, 1, 10, 19)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 3, 5, 12, 20)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 3, 10, 14, 21)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 3, 15, 17, 22)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 3, 20, 17, 23)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 3, 25, 17, 24)),
        }),
        new RRule({
            freq: RRule.DAILY,
            interval: 1,
            dtstart: new Date(Date.UTC(2012, 3, 30, 17, 25)),
        })
    ];
    const rruleSet = new rrule.RRuleSet();
    for (let rule of rules) {
        rruleSet.rrule(rule);
    }
    $scope.infiniteItems = {
        cache: [],
        getItemAtIndex: function(index) {
            if (this.cache[index]) {
                return this.cache[index];
            }
            // assuming zero index to be 1st jan 2012
            const date = moment(firstDay).add('days', index);
            let startOfMonth = moment(date).startOf('month');
            const endOfMonth = moment(date).endOf('month');
            while(startOfMonth.isSameOrBefore(endOfMonth)) {
                let cacheIndex = -firstDay.diff(startOfMonth, 'days');
                this.cache[cacheIndex] = {
                    date: moment(startOfMonth).format('YYYY/MM/DD')
                };
                startOfMonth.add(1, 'day')
            }
            startOfMonth = moment(date).startOf('month');
            // console.log(index, startOfMonth.toDateString(), endOfMonth.toDateString());
            for (let date of rruleSet.between(startOfMonth.toDate(), endOfMonth.toDate())) {
                let cacheIndex = -firstDay.diff(date, 'days');
                const endDatetime = new Date(date + 30 * 60 * 1000);  // 30 mins in milliseconds
                this.cache[cacheIndex].events = this.cache[cacheIndex].events || [];
                this.cache[cacheIndex].events.push({
                    startDatetime: date,
                    endDatetime: endDatetime,
                    displayText: 'Event from ' + moment(date).format('HH:mm') + ' to ' + moment(endDatetime).format('HH:mm') + '.',
                });
            }
            return this.cache[index];
        },

        // Required.
        // For infinite scroll behavior, we always return a slightly higher
        // number than the previously loaded items.
        getLength: function() {
            return this.cache.length + 15;
        },
    };
});
