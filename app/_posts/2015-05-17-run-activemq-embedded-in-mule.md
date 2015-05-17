---
layout: post
title:  "Run ActiveMQ Embedded in Mule"
date:   2015-05-17 15:26:17
categories: activemq mule
---
<img class="side-image img-responsive" src="/img/embedded-activemq.png" alt="Terminal Mule Response">

## Run ActiveMQ Embedded in Mule

May 17, 2015 by [Gregory Lawson](/about.html)

Mule when used with ActiveMQ offers great integration capabilities. According to ActiveMQ, "Apache ActiveMQ is a messaging provider, with extensive capabilities for message brokering. Mule is described as an ESB, in that it defines and executes the brokering of message exchanges among integrated software components."
ActiveMQ's response can be read [here](http://activemq.apache.org/how-does-activemq-compare-to-mule.html).

Because ActiveMQ can be started from Java or configured to start with Spring, ActiveMQ can be started in the same process 
as Mule or be embedded. Embedding ActiveMQ into Mule offers an architectural design option for Mule flows. Mule flows 
can be configured easily as inbound or outbound endpoints to ActiveMQ queues or topics. The default behavior is to connect
to an ActiveMQ instance that is running in a process outside of Mule. This offers several advantages in terms of scalability
of the messaging system, but offers more challenges with respect to administration of ActiveMQ.

In this example, you need to download [Mule Community Edition](https://www.mulesoft.org/download-mule-esb-community-edition).
Make sure you have the Mule ESB standalone runtime zip or tar.gz file. After you have downloaded and unzipped/tarred the 
file, create and environment variable 'MULE_HOME' that points to that directory. The following code snippet for Linux/Unix environments:

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
