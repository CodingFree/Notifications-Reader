(function () {
    var notifReader = {
        notify: function (titleid, body, bodyid, onClick) {
            console.log("A notification would be send: " + titleid);
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
        },
        handleEvent: function (evt) {
            switch (evt.type) {
                case 'mozChromeEvent':
                    if (evt.detail.type === 'desktop-notification') {
                        console.log("Notification Reader: notification found.");
                    }
                    break;

                default:
                    console.debug('Unhandled event: ' + evt.type);
                    break;
            }
        },
        initialize: function initialize() {
            var that = this;
            this.notify('Notifications Reader: ', "http://www.twitter.com/codingfree", null, true);
            window.addEventListener('mozChromeEvent', this.handleEvent);
        }
    }

    if (document.documentElement) {
        notifReader.initialize();
    } else {
        window.addEventListener('DOMContentLoaded', notifReader.initialize);
    }
}());