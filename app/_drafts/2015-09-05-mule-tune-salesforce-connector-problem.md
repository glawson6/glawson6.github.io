---
layout: post
title:  "Mule Salesforce Connector Avoiding Invalid Session ID"
date:   2015-09-05 15:26:17
categories: mule salesforce 
---

## Mule Salesforce Connector Avoiding Invalid Session ID

September 05, 2015 by [Gregory Lawson](/about.html)

I was recently tasked with providing data to Android application that was an extension of an existing PHP application. 
The PHP application is backed by a MySQL database with a hosting service. I decided to create RESTful apis in my language
of choice which was Java. In order to achieve this , I decided I needed to deploy a Java app along with a PHP app on 
the same machine. Two Paas services immediately came to mind, [Heroku](https://www.heroku.com/) and [Openshift](https://www.openshift.com). Both of these Paas have deployment 
models based on pushing files to git, a natural choice for developers of small apps. I chose Heroku because its support 
for Java included allowing the developer to choose how the jvm is invoked. You specify "java -jar, etc" and Heroku will
execute. This allows for the flexibility on what Java apps, code can be run, but does not allow control of the machine 
hosting the application. 

Introduce [Dokku](http://progrium.viewdocs.io/dokku/index), a lightweight version of Heroku that can be run on one system. You can download Dokku and run it on Ubuntu. 
You can also choose a droplet from [Digital Ocean](https://www.digitalocean.com) with Dokku already installed. I chose Digital Ocean along with a 
preconfigured system with Dokku installed.  Directions for setting up Dokku can be found [here](https://www.digitalocean.com/community/tutorials/how-to-use-the-dokku-one-click-digitalocean-image-to-run-a-node-js-app).

With a machine configured with Dokku on Digital Ocean, I am able to deploy two apps and a database with 2 GB of RAM. If 
you create the Dokku git remote, you can push your PHP app to that directory with a subdomain. As long as there is an index.php
in the root folder, Dokku should recognize that this is a PHP app and start the appropriate service pointing to your root
directoty. Because I used MySQL, I followed the instructions [here](https://github.com/hughfletcher/dokku-mysql-plugin) to install MySQL as well.
After MySQL installation , I had to run an appropriate DDL for table creation and population. I was able to get a dump file 
from hosting service the PHP app originated. If all goes well, you should have a fully configured PHP app should be served
from the app name given in your Dokku remote git add.

Heroku supports deployment of Java based applications that use Heroku [Dynos](https://devcenter.heroku.com/articles/dynos#dynos).
Because Dokku is a mini Heroku,  a Java based web application that serves json can be deployed on Dokku. I chose SpringBoot
for its speed in getting an application up and running. [Spring Data](http://projects.spring.io/spring-data/) which is 
an umbrella project for [Spring Data JPA](http://projects.spring.io/spring-data-jpa/) enables faster development of apis 
 centered around relational database data by allowing developers to write repository interfaces, including custom finder methods, and 
 Spring will provide the implementation automatically.
 
 In this example, the PHP application uses a MySQL database. Because the schema is already designed, a reverse engineering 
 tool can be used create JPA Entity objects from the tables. [Netbeans](https://netbeans.org/) is a freely distributed IDE which can easily 
 generate JPA Entity beans from a database schema. Start Netbeans and click on the Services tab in the top left corner after
 Netbeans has started.
 
 

<?prettify lang=sh?>
<pre class="prettyprint">
export MULE_HOME=/path/to/unzipped/Mule/distribution
</pre>

Download the project. The complete source code and Github project can be found [here](https://github.com/glawson6/activemq-mule-embedded).

Run:

<?prettify lang=sh?>
<pre class="prettyprint">
mvn clean install
</pre>

This will build, package, and copy the Mule zip file to the MULE_HOME apps directory.

Start another terminal or shell and navigate to MULE_HOME/bin directory and issue the command:

<?prettify lang=sh?>
<pre class="prettyprint">
./mule
</pre>

This will start Mule and the embedded instance of ActiveMQ. I have included a flow in the project to verify that the
ActiveMQ broker was created along with a destination called queue1. There is a small application used to send a single 
message to the destination defined in the embedded broker.

Get another shell/terminal and navigate to the project directory and issue the command:

<?prettify lang=sh?>
<pre class="prettyprint">
mvn exec:java
</pre>

After issuing this command, you should see a log message from the client.
<img class="side-image img-responsive" src="/img/terminal-activemq-embedded-client.png" alt="Terminal Client Sending Message">
 
There should be a corresponding log message on the Mule side for receiving the JMS message.
<img class="side-image img-responsive" src="/img/terminal-activemq-embedded-mule.png" alt="Terminal Mule Response">

Congratulations! You just embedded ActiveMQ inside Mule server, sent a message to ActiveMQ and logged the message in a 
Mule application!


####Further reading
* [How do I embed a Broker inside a Connection](http://activemq.apache.org/how-do-i-embed-a-broker-inside-a-connection.html)
* [ActiveMQ Topologies](http://activemq.apache.org/topologies.html)
* [ActiveMQ/Mule Integeration Examples](http://www.mulesoft.org/mule-activemq-integration-examples)

*[Deploying the Right Way: Dokku on Digital Ocean](https://www.andrewmunsell.com/blog/dokku-tutorial-digital-ocean)
*[]()
