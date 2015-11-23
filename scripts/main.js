(function () {
    var notifReader = {
        notify: function (titleid, body, bodyid, onClick) {
            console.log("A notification would be send: " + titleid);
            var notification = new window.Notification(titleid, {
                body: body,
                icon: '/style/icons/Gallery.png'
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
        },
        initialize: function initialize() {
            var that = this;
            this.notify('Notifications Reader: ', "http://www.twitter.com/codingfree", null, true);

        }
    }

    if (document.documentElement) {
        notifReader.initialize();
    } else {
        window.addEventListener('DOMContentLoaded', notifReader.initialize);
    }
}());