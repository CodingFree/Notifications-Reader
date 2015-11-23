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
            console.log("Event found: "+evt.type);
            switch (evt.type) {
                case 'mozChromeEvent':
                    if (evt.detail.type === 'desktop-notification') {
                        console.log("Notification Reader: notification found.");
                        var msg = new SpeechSynthesisUtterance('Hello World');
                        window.speechSynthesis.speak(msg);
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
            if(window.speechSynthesis){
                console.log("It has sppech syntehsis capabilities, proceed.");
                var msg = new SpeechSynthesisUtterance('Notification Reader enabled!');
                //window.speechSynthesis.speak(msg);
                
                window.addEventListener('mozChromeEvent', this.handleEvent);
                
            }

        }
    }

    if (document.documentElement) {
        notifReader.initialize();
    } else {
        window.addEventListener('DOMContentLoaded', notifReader.initialize);
    }
}());