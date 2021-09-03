# Auto-Check-IP

## What is that
Unfortunatly I have an dynamic public ip with my internet provider so I made this **automation** to update my **DNS records** in my Ionos account when my home **public ip** come to change.


## What does this application do

Things do this app for now : 

1. check your public **IPV4** adress
2. create a JSON file on the same **PATH** and
store in this file your actual **IP**
3. check every hour if the **ip** has changed and if so update the JSON file and run the **puppeteer script**



## Tech used 

<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/nodejs/nodejs-original-wordmark.svg" alt="drawing" width=80 height=80/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/docker/docker-original-wordmark.svg" alt="drawing" width=60 height=80/>

## Prerequisite
[NodeJS](https://nodejs.org/en/download/) or [Docker](https://docs.docker.com/get-docker/)

## How to use 

### Dockerized usage
1. download the project on your machine
2. execute `docker-compose up -d` in projet folder

PS: be aware, dockerized version need 2,3gb of space ! 

### simple Node app
#### be aware, it's just simple node app, if you want to automate it you must use something else like [cron](https://help.ubuntu.com/community/CronHowto) or [pm2](https://pm2.keymetrics.io/)
1. install chromium `sudo apt install chromium` or `sudo apt install chromium-browser`
2. download the project on your machine
3. replace `./app.js` with `./without-docker/app.js`
4. execute `npm i` in project folder
5. execute `npm start`


### ENV VARIABLES
**They must be specified in `.env` file for both usage methods**

- LOGIN => your Ionos login
- PASSWORD => your Ionos password
- TARGET_URL => target of form where you want to do update
- NODE_ENV => dev (on dev env, headless is set to false) || production
- BROWSER_PATH => it's optional, but if your specify something here, it must be `chromium` or `chromium-browser`

### More
I did this project to run it on my Raspberry Pi 4 with a 64bit architecture.

I was unable to install `chromium:arm64` or `chromium:armhf` only `chromium-browser:armhf` was installable on my Pi host. 

But in docker container the only one package who works was `chromium:armhf` that's why I use **node** image for 32bit architecture. 

Tips: if you use `cron` you cannot call `node` or `npm` from cron job, my solution :
1. execute `which node` and copy this
2. instead of `node` past here copied absolute path for node and the absolute path of `app.js`


### NEXT 

Code something like telegram bot to send message on my phone when ip change