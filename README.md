# Auto-Check-IP

## What is that
Unfortunatly I have an dynamic public ip with my internet provider so I made this **automation** to update my **DNS records** in my Ionos account when my home **public ip** come to change.


## What does this application do

Things do this app for now : 

1. check your public **IPV4** adress
2. create a JSON file on the same **PATH** and
store in this file your actual **IP**
3. send an telegram message if ip has changed or on error



## Tech used 

[<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/nodejs/nodejs-original-wordmark.svg" alt="drawing" width=80 height=80/>](https://nodejs.org/en/download/)



#### it's just simple node app, if you want to automate it you must use something like [cron](https://help.ubuntu.com/community/CronHowto) or [pm2](https://pm2.keymetrics.io/) to run javascript on scheduled time



## How to use 

1. install chromium `sudo apt install chromium` or `sudo apt install chromium-browser` for linux users
2. download the project on your machine
3. execute `npm i` in project folder
4. execute `npm start`


### ENV VARIABLES
**They must be specified in `env.js` file for both usage methods**

- LOGIN => your Ionos login
- PASSWORD => your Ionos password
- TARGET_URL => target of form where you want to do update
- NODE_ENV => dev (on dev env, headless is set to false) || production
- BROWSER_PATH => it's optional, but if your specify something here, it must be `chromium` or `chromium-browser`
- BOT_TOKEN => your telegram bot token : [tuto](https://www.section.io/engineering-education/telegram-bot-in-nodejs/)
- CHAT_ID => chat id for telegram

### More
I did this project to run it on my Raspberry Pi 4 with a 64bit architecture.

I was unable to install `chromium:arm64` or `chromium:armhf` only `chromium-browser:armhf` was installable on my Pi host. 


Tips: if you use `cron` you cannot just call `node` or `npm` from cron job, my solution :
1. execute `which node` and copy this
2. instead of `node` past here copied absolute path for node and the absolute path of `app.js`

eg: `/home/pi/.nvm/versions/node/v16.6.2/bin/node /home/pi/node/auto-check-ip/app.js`

