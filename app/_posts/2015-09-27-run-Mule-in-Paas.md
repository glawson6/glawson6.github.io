---
layout: post
title:  "Running Mule in Dokku and Heroku"
date:   2015-09-27 15:26:17
categories: mule dokku heroku paas
---

## Running Mule in Dokku and Heroku

September 27, 2015 by [Gregory Lawson](/about.html)

In a previous blog, "[Using Spring Boot with Mule](https://github.com/glawson6/activemq-mule-embedded)", I described and 
implemented embedding Mule into a Spring Boot application. This allows the running Mule from command line without having 
to install Mule server on the target system. Running Mule in this manner has multiple use cases. One of these use cases is
running Mule in a [PaaS](http://www.interoute.com/what-paas). There are many PaaS providers so I will focus on two. 

The first is [Heroku](https://devcenter.heroku.com/). Heroku offers a simple deployment model for developers. There are 
many options for app developers. These options range from Ruby, Java, Node.js, Python, PHP, Clojure, Scala, Go as the 
programming languages for developing applications. Heroku allows the deployment of an application to its platform by Git.
After creating a Heroku account and creating an application, a local Git repository can push to the remote for a deployment
of the application.

The second is [Dokku](http://progrium.viewdocs.io/dokku/). Dokku is an open source Heroku implementation. You can install 
it for free with an Ubuntu Linux distribution. If offers the same capabilities as Heroku but is only scaled for one
computer system.
 
Download the project. The complete source code and Github project can be found [here](https://github.com/glawson6/spring-boot-mule-pass).

On the command line from the project root execute the command:

<?prettify lang=sh?>
<pre class="prettyprint">
mvn clean package && java -Dhttp.port=8080 -jar target/spring-boot-mule-pass-1.0-SNAPSHOT.jar
</pre>

This will build, package, and run the Mule Embedded in Spring Boot locally.

Start another terminal or shell  and issue the command:

<?prettify lang=sh?>
<pre class="prettyprint">
curl http://localhost:8080/test
</pre>

If you see "Welcome Paas Mule!", you have just verified that the Embedded Mule can run locally. 

Now, create an application in Heroku and follow the directions with "Deploy using Heroku Git".

>Install the Heroku Toolbelt

>Download and install the [Heroku Toolbelt](https://toolbelt.heroku.com/) or learn more about the [Heroku Command Line Interface](https://devcenter.heroku.com/categories/command-line).

>If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
<?prettify lang=sh?>
<pre class="prettyprint">
$ heroku login
</pre>

After logging in, you can add the local Get repo to Heroku's remote repo:

<?prettify lang=sh?>
<pre class="prettyprint">
heroku git:remote -a YOUR-APPLICATION-NAME
</pre>

In my case I created an app called test-glawson6. My command becomes:

<?prettify lang=sh?>
<pre class="prettyprint">
heroku git:remote -a test-glawson6
</pre>

>Deploy your application

>Commit your code to the repository and deploy it to Heroku using Git.

<?prettify lang=sh?>
<pre class="prettyprint">
$ git add .
$ git commit -am "make it better"
$ git push heroku master
</pre>


####Further reading
* [Dokku](http://progrium.viewdocs.io/dokku/)
* [Heroku](https://devcenter.heroku.com/)
* [Spring Boot in Heroku](http://docs.spring.io/spring-boot/docs/1.2.6.RELEASE/reference/htmlsingle/#cloud-deployment-heroku)
* [Java in Heroku](https://devcenter.heroku.com/articles/getting-started-with-java#introduction)
* [Deploying the Right Way: Dokku on Digital Ocean](https://www.andrewmunsell.com/blog/dokku-tutorial-digital-ocean)
* [Spring Boot](http://projects.spring.io/spring-boot/)

