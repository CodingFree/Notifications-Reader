(function () {
    var notifReader = {
        notify: function (titleid, body, bodyid, onClick) {
            var notification = new window.Notification(titleid, {
                body: body,
                icon: 'https://codingfree.com/nr_32.png'
            });

            notification.onclick = function(){
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
        talk: function (text, lang){
            var msg = new SpeechSynthesisUtterance(text);
            if(lang){
                msg.lang = lang;
            }else if(navigator.mozL10n){
                msg.lang = navigator.mozL10n.language.code; 
            }else{
                msg.lang = "en-US";
            }        
            window.speechSynthesis.speak(msg); 
        },
        handleEvent: function(evt){
            switch (evt.type) {
                case 'mozChromeNotificationEvent':
                    if (evt.detail.type === 'desktop-notification') {
                            this.talk(evt.detail.title, null);
                            this.talk(evt.detail.text, null);                         
                    }
                    break;

                default:
                    break;
            }
        },
        multipleInjections: function(){
            if (document.querySelector('.fxos-notifReader')) {
                this.notify('Notifications Reader: ', "Multiple Injections detected", null, false);
                return;
            }else{
                //Add the fxos-notifReader class to disable injections.
                var body = document.querySelector('body');
                var fxosNotifReader = document.createElement('div');
                fxosNotifReader.classList.add('fxos-notifReader');
                body.appendChild(fxosNotifReader);

                this.talk("Notification Reader enabled!", "en-US");             
                window.addEventListener('mozChromeNotificationEvent', this.handleEvent);
            }
        },
        checkDisabled: function(){
            navigator.mozApps.mgmt.addEventListener('enabledstatechange', function(event) {
                var app = event.application;
                var wasEnabled = app.enabled;
                if(!wasEnabled){
                    this.talk("Notification Reader disabled", "en-US");
                    window.removeEventListener('mozChromeNotificationEvent', this.handleEvent);

                    //Remove the fxos-notifReader class to enable injections.
                    if(fxosNotifReader){
                        var body = document.querySelector('body');
                        var fxosNotifReader = body.getElementsByClassName("fxos-notifReader");
                        fxosNotifReader.parentNode.removeChild(fxosNotifReader);
                    }
                }
            });
        },
        initialize: function initialize() {
            this.notify('Notifications Reader: ', "http://www.twitter.com/codingfree", null, true);
            if(window.speechSynthesis){
                this.multipleInjections();
                this.checkDisabled();
            }else{
                ehis.notify('Notifications Reader: ', "Sorry, your device does not support the Speech API.");
            }

        }
    }

    if (document.documentElement) {
        notifReader.initialize();
    } else {
        window.addEventListener('DOMContentLoaded', notifReader.initialize);
    }
}());