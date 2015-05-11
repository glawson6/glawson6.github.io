---
layout: post
title:  "Using Spring Boot With Mule"
date:   2015-04-22 15:26:17
categories: spring mule
---

## Using Spring Boot With Mule

April 22, 2015 by [Gregory Lawson](/about.html)

In recent years there has been a surge in the idea of [microservices](http://martinfowler.com/articles/microservices.html).
Although this term is vague in nature there are some ideas on how to deploy and run applications
with "microservices" in mind. Spring has come to the forefront of the microservice architecture with its
["opinionated view of building production-ready Spring applications"](http://projects.spring.io/spring-boot/).
 While Spring Boot provides several "starter" configurations for most application needs, Spring will at times have to
integrate or take a back seat to other systems. By design, that is the beauty of Spring...it can utilized as a top level container
or nicely integrated into your current solution. Check out its many [use scenarios](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#overview-usagescenarios).

Many open source projects use Spring under the covers. Mule, Camel, ActiveMQ are a few examples that come to mind.
In this blog, I plan to utilize Spring Boot along with [Mule](https://www.mulesoft.com/platform/soa/mule-esb-open-source-esb).
 Mule is a full featured Enterprise Service Bus [(ESB)](http://en.wikipedia.org/wiki/Enterprise_service_bus) which is usually installed
as a server to a file system. For major deployments this works extremely well. In the case of microservices this approach may be
unwanted. To fully get the benefits of a microservices architecture, it would be ideal if Mule could be shipped as a
stand alone artifact. This is the sweet spot of Spring Boot. Enough talking about microservices and ESBs. Let's roll
up our sleeves and get to work.

## Mule Starter App

We will use a Mule Maven archetype to get us started. It can be found at [Mule's Maven Tools](http://www.mulesoft.org/documentation/display/current/Maven+Tools+for+Mule+ESB#MavenToolsforMuleESB-CreatingaMuleApplication).
In a bash shell issue type:

<?prettify lang=sh?>
<pre class="prettyprint">
mvn archetype:generate -DarchetypeGroupId=org.mule.tools.Maven -DarchetypeArtifactId=Maven-achetype-mule-app -DarchetypeVersion=1.0 -DgroupId=org.taptech.app -DartifactId=mule-starter-app -Dversion=1.0-SNAPSHOT -DmuleVersion=3.6.1 -Dpackage=org.taptech.app -Dtransports=http,jms,vm,file,ftp -Dmodules=db,xml,jersey,json,ws
</pre>

This should create/scaffold a Maven project. The standard Maven project contains one flow and  a functional test. The 
directory structure is what you would expect for a Maven project with the addition of a src/main/app directory that 
has a Mule properties and config file.

The project has Mule jars which are dependent on a previous version of Spring. In order to get Spring Boot, which depends 
on Spring 4, to run with Mule we have to use a different version of Mule. We will also have to transform our pom.xml to 
use the Spring Boot as its parent. We will also change the packaging from mule to jar. There are also some dependencies 
Mule needs in order to be embedded. Those dependencies are also added to the pom. You can view all the changes [here](https://github.com/glawson6/mule-starter-app/blob/master/pom.xml).

At this point the project should be ready to go. 

You can try running it at command line:

<?prettify lang=sh?>
<pre class="prettyprint">
mvn clean package  && java -jar target/mule-starter-app-1.0-SNAPSHOT.jar
</pre>

<img class="side-image img-responsive" src="/img/terminal-start-Mule.png" alt="Terminal Starting Mule">

Congratulations, you just started Mule from a single, deployable, jar file with Spring Boot!

The complete source code and Github project can be found [here](https://github.com/glawson6/mule-starter-app).

####Further reading
* [Choosing The Right ESB Platform](http://blogs.mulesoft.org/choosing-the-right-esb-platform/)
* [Why Use An ESB?](http://www.mulesoft.org/why-use-esb)
