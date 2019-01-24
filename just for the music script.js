const Discord = require("discord.js");  //if you already have this, don't duplicate it
var bot = new Discord.Client();

var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}


const YTDL = require('ytdl-core');
bot.on("ready", function() {
    console.log("ready");

});

bot.on("message", function(message) {        //if you already have this don't bother copy and pasting this line of script.
    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {

            case "play":
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
                
            if (!args[1]) {
                    message.channel.send("You either didn't provide me a valid link or something went wrong");
                    return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("You must be in a voice channel or I can't play music to you!");
                return;    
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
                
                
           };
            var server = servers[message.guild.id];
            server.queue.push(args[1]);

            
            
            try {
                
            } catch (error) {
                
            }
            
            
           
            

         
            break;
        } 
    });
    // you know what to do