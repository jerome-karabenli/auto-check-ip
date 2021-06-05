# Auto-Check-IP

## What is that
I love money, and save my money.. So, I don't want to hosting my website on cloud but just have a domain name and also beceause I have a wonderfull Raspberry PI 4 4gb CPU 5ghz... hmm hmm sorry I'm confused I love too much this things.. 

BUT when you define your **DNS records**, you cannot define the **CNAME** record as your main domain (ex : *mydomain.com*) but only for your subdomains (ex : www.mydomain.com) BUT I want to access to my website directy with no subdomains..

The only way to do that is to set **A RECORDS** and **AAAA RECORDS** manualy on your dns provider account. 

And if your are like me, unlucky, beceause your internet provider not allow you to have an static public **IP** adress and you don't want to set your **RECORDS** at every reboot of your router, your are on the good place ! 

## What does this application do

Things do this app for now : 

1. check your public **IPV4** and **IPV6** adress
2. create a JSON file on the same **PATH**
3. store in this file your actual **IP**'s
4. if your **IP's** changed update the JSON file

Next step => wait to have access as beta user for IONOS api.. And guess what ? 

### ===> Automate it <===

## Tech used 


<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/nodejs/nodejs-original-wordmark.svg" alt="drawing" width=80 height=80/>

## How to use 

1. download the project on your machine
2. execute `npm install` to install dependecies
3. execute `node app.js` you have now a JSON file
4. open this file and magic.. your ip's !