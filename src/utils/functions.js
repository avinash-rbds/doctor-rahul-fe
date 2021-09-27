var moment = require("moment");

module.exports = {
    calcuteTimeForFeedFromNow: (feedTime) => {
        //use "moment(ISO).valueOf()"" to get milliseconds to support 'safari' which returns NaN
        //let diff = new Date().getTime() - new Date(feedTime).getTime()
        let diff = new Date().getTime() - moment(feedTime).valueOf();

        let diffSeconds = diff / 1000;
        diffSeconds = Math.round(diffSeconds);

        let diffMinutes = diffSeconds / 60;
        diffMinutes = Math.round(diffMinutes);

        let diffHours = diffMinutes / 60;
        diffHours = Math.round(diffHours);

        let diffInDays = diffHours / 24;
        diffInDays = Math.round(diffInDays);

        let diffInWeeks = diffInDays / 7;
        diffInWeeks = Math.round(diffInWeeks);

        let diffInMonths = diffInDays / 30;
        diffInMonths = Math.round(diffInMonths);

        let diffInYears = diffInMonths / 12;
        diffInYears = Math.round(diffInYears);

        if (diffInYears > 1) {
            return diffInYears + " years ago";
        } else if (diffInYears <= 1 && diffInMonths >= 12) {
            return diffInYears + " year ago";
        } else if (
            diffInYears < 0 &&
            Math.abs(diffInYears) === 1 &&
            Math.abs(diffInMonths) >= 12
        ) {
            return Math.abs(diffInYears) + " year from now";
        } else if (
            diffInYears < 0 &&
            Math.abs(diffInYears) > 1 &&
            Math.abs(diffInMonths) >= 12
        ) {
            return Math.abs(diffInYears) + " years from now";
        } else if (diffInMonths < 12 && diffInMonths > 1 && diffInWeeks > 4) {
            return diffInMonths + " months ago";
        } else if (diffInMonths === 1 && diffInWeeks > 4) {
            return diffInMonths + " month ago";
        } else if (
            diffInMonths < 0 &&
            Math.abs(diffInMonths) === 1 &&
            Math.abs(diffInWeeks) > 4
        ) {
            return Math.abs(diffInMonths) + " month from now";
        } else if (
            diffInMonths < 0 &&
            Math.abs(diffInMonths) > 1 &&
            Math.abs(diffInWeeks) > 4
        ) {
            return Math.abs(diffInMonths) + " months from now";
        } else if (diffInWeeks <= 4 && diffInWeeks > 1) {
            return diffInWeeks + " weeks ago";
        } else if (diffInWeeks === 1 && diffInDays > 7) {
            return diffInWeeks + " week ago";
        } else if (
            diffInWeeks < 0 &&
            Math.abs(diffInWeeks) === 1 &&
            Math.abs(diffInDays) > 7
        ) {
            return Math.abs(diffInWeeks) + " week from now";
        } else if (diffInWeeks < 0 && Math.abs(diffInWeeks) > 1) {
            return Math.abs(diffInWeeks) + " weeks from now";
        } else if (diffInDays <= 7 && diffInDays > 1) {
            return diffInDays + " days ago";
        } else if (diffInDays <= 1 && diffHours > 24) {
            return diffInDays + " day ago";
        } else if (diffInDays < 0 && Math.abs(diffInDays) === 1) {
            return Math.abs(diffInDays) + " day from now";
        } else if (diffInDays < 0 && Math.abs(diffInDays) > 1) {
            return Math.abs(diffInDays) + " days from now";
        } else if (diffHours <= 24 && diffHours > 1) {
            return diffHours + " hours ago";
        } else if (diffHours <= 1 && diffMinutes > 60) {
            return diffHours + " hour ago";
        } else if (diffHours < 0 && Math.abs(diffHours) === 1) {
            return Math.abs(diffHours) + " hour from now";
        } else if (diffHours < 0 && Math.abs(diffHours) > 1) {
            return Math.abs(diffHours) + " hours from now";
        } else if (diffMinutes <= 60 && diffMinutes > 1) {
            return diffMinutes + " minutes ago";
        } else if (diffMinutes <= 1 && diffSeconds > 60) {
            return diffMinutes + " minute ago";
        } else if (diffMinutes < 0 && Math.abs(diffMinutes) === 1) {
            return Math.abs(diffMinutes) + " minute from now";
        } else if (diffMinutes < 0 && Math.abs(diffMinutes) > 1) {
            return Math.abs(diffMinutes) + " minutes from now";
        } else if (diffSeconds <= 60 && diffSeconds === 1) {
            return diffSeconds + " second ago";
        } else if (diffSeconds <= 60 && diffSeconds > 0) {
            return diffSeconds + " seconds ago";
        } else if (diffSeconds < 0 && Math.abs(diffSeconds) === 1) {
            return Math.abs(diffSeconds) + " second from now";
        } else if (diffSeconds < 0 && Math.abs(diffSeconds) > 1) {
            return Math.abs(diffSeconds) + " seconds from now";
        } else {
            return " just now";
        }
    },
};
