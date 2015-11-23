(function () {
    var notifReader = {
        notify: function notify(titleid, body,, url, onClick) {
            var canSend = false;

            if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                canSend = true;
            }

            // Otherwise, we need to ask the user for permission
            if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        canSend = true;
                    }
                });
            }

            if(canSend) {
                var notification = new window.Notification(titleid, {
                    body: body,
                    icon: 'https://codingfree.com/nr_32.png'
                });
                notification.onclick = function () {
                    notification.close();
                    if (onClick) {
                        new MozActivity({
                            name: "view",
                            data: {
                                type: "url",
                                url: body
                            }
                        });
                    }
                };
            }
        },        
        initialize: function initialize() {
            that.notify("Notifications Reader", "Click this notification for support!", "http//www.twitter.com/CodingFree", true);
            var that = this;

    };

    if (document.documentElement) {
        notifReader.initialize();
    }else{
        window.addEventListener('DOMContentLoaded', notifReader.initialize);
    }
}());