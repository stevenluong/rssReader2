'use strict';

// Imports dependencies and set up http server
const
express = require('express'),
        bodyParser = require('body-parser'),
        app = express().use(bodyParser.json()); // creates express http server
const request = require('request');
const PAGE_ACCESS_TOKEN = "EAADSjEpQ4ScBABhH0wUENTSvBEll8HWkPSnvEZAMKoQxQhfCBfMVaLZBnQ6lDP8uRgJq1x6S3gTwntCdgAnfkGu3P4ERz38ieA6mZBQYmW0ctqAFIASHYdppS2oCzBDqtDVUCZCXAZCOafgoc3tAQZASntZBXhgepFCdndP9tOQeAZDZD"
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            let sender_psid = webhook_event.sender.id;
            //console.log('Sender PSID: ' + sender_psid);
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);        
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});
function handleMessage(sender_psid, received_message) {

    // Create the payload for a basic text message
    var rLooking = {
        "text": "Looking for news on: "+received_message.text 
    };
    // Sends the response message
    callSendAPIMessage(sender_psid, rLooking);    
    // Check if the message contains text
    var text = received_message.text;
    if (text) {    
        //from scrapper
        text = text.toLowerCase().replace(/[ç]/g,"c").replace(/[üùû]/g,"u").replace(/[îï]/g,"i").replace(/[àâ]/g,"a").replace(/[öô]/g,"o").replace(/[œ]/g,"oe").replace(/[€ëéèê]/g,"e").replace(/[^a-zA-Z0-9]/g," ");
        var t = text.split(" ");
        if (t.length>1) {    
            var regex = "";
            t.forEach(subt => {
                regex=regex+"(?=.*?("+subt+"))"
            })
            var filter = "?filter[where][title][regexp]=/"+regex+"/&filter[limit]=3&filter[order]=datetime DESC";
            request.get({url:"http://apollo-loopback.slapps.fr/api/News"+filter},function(error,response,body){
                if (!error && response.statusCode == 200) {
                    //console.log(response);
                    //console.log(body);
                    var news = JSON.parse(body);
                    console.log("---NEWS");
                    //console.log(news);
                    if(news.length==0){
                        console.log("---NONE");
                        let rNo = {
                            "text": "I found no recent news"
                        };                       
                        callSendAPIMessage(sender_psid, rNo);    
                    }else{
                        callSendAPIPayload(sender_psid,news)
                    }
                    //console.log(body);
                }else{
                    //console.log(body);
                    //console.log(error);
                    console.log("ERROR");
                }
            })
            /*
               let rMany = {
               "text": `Hey sorry, I can only understand 1 keyword at the moment, I will learn how to understand many words later ! ;)`
               };
               callSendAPI(sender_psid, rMany);    
               */
        }else{
            var filter = "?filter[where][title][regexp]=/"+text+"/&filter[limit]=3&filter[order]=datetime DESC";
            request.get({url:"http://apollo-loopback.slapps.fr/api/News"+filter},function(error,response,body){
                if (!error && response.statusCode == 200) {
                    //console.log(response);
                    //console.log(body);
                    var news = JSON.parse(body);
                    console.log("---NEWS");
                    console.log(news);
                    if(news.length==0){
                        console.log("---NONE");
                        let rNo = {
                            "text": "I found no recent news"
                        };                       
                        callSendAPIMessage(sender_psid, rNo);    
                    }else{
                        callSendAPIPayload(sender_psid, news);    
                    }
                    //console.log(body);
                }else{
                    //console.log(body);
                    //console.log(error);
                    console.log("ERROR");
                }
            })
        }

    }else{
        let rOther = {
            "text": `Hey sorry, I don't know how to handle this yet!`
        };                       
        callSendAPIMessage(sender_psid, rOther);    
    }
    // Sends the response message

}
function handleNews(news){
    var response = [];
    news.forEach(n=>{
        //TODO LINK 
        //let r = {
        //    "text": n.title+" - "+n.source+" - "+n.datetime
        //};                       
        response.push({
            "title": n.title,
            "image_url": n.image_link,
            "subtitle": n.source,
            "default_action": {
                "type": "web_url",
                "url": n.link,
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                //"fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            }
        })
    });
    return response;
}
// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}
// Sends response messages via the Send API
function callSendAPIPayload(sender_psid, response) {
    //console.log(response);
    var request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "list",
                    "top_element_style": "compact",
                    "elements": [],
                }
            }
        },
    }
    response.forEach(n=>{
        //request_body.message.attachment.payload.elements.push(r)
        request_body.message.attachment.payload.elements.push({
            //                "title":"Welcome!",
            //                    "image_url":"https://petersfancybrownhats.com/company_image.png",
            //                    "subtitle":"We have the right hat for everyone.",
            //                    "default_action": {
            //                      "type": "web_url",
            //                      "url": "https://petersfancybrownhats.com/view?item=103",
            //                      "webview_height_ratio": "tall"}
            "title": n.title,
            "image_url": n.image_link,
            "subtitle": n.source,
            "default_action": {
                "type": "web_url",
                "url": n.link,
           //     "messenger_extensions": true,
                "webview_height_ratio": "tall",
                //"fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            }
        })
    })
    console.log(JSON.stringify(request_body));
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    }); 
}

// Sends response messages via the Send API
function callSendAPIMessage(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!'+response.text)
        } else {
            console.error("Unable to send message:" + err);
        }
    }); 
}
// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "helloapollo"

        // Parse the query params
        let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
        }
    }
});
