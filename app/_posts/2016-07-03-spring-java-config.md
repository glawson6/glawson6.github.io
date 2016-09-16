---
layout: post
title:  "Spring Java Configuration"
date:   2016-07-03 15:26:17
categories: spring java config
---

## Spring Bean Configuration using Java  [Part 1 of 6](/spring/java/config/2016/07/03/spring-java-config.html)

June 03, 2016 by [Gregory Lawson](/about.html)

This is a six part blog on an auction-demo application. It is a Spring Boot application consisting 
of Spring Data Rest, Spring Security, Spring custom wiring techniques and Spring Java Configuration.

Since the advent of annotations and the use of metadata about code, frameworks ,such as Spring, 
have built ingenious systems around these concepts. Spring has migrated its bean wiring from XML to Java.
Gone are the days of XML loaded with Spring beans wired together for the 
application context.Although Spring still supports XML files, it is considered the exception
rather than the norm.

For those still mulling over the idea of "beans wired together", the following should help.
Spring is known as an ["Inversion of Control" container.](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html).
This means that application developers using Spring allow it to handle the creation of objects needed for the
running java application. This is important in that objects themselves are not responsible for 
locating the objects it needs, known as the *Service Locator* design pattern. It also enforces that these object dependencies be available at application
startup.

An example of Spring XML may be as follows:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
      http://www.springframework.org/schema/context/spring-context-4.2.xsd">
    <context:property-placeholder location="classpath:ldap.properties" />

    <bean id="contextSource"
          class="org.springframework.security.ldap.DefaultSpringSecurityContextSource">
        <constructor-arg value="${ldap.url}"/>
        <property name="userDn" value="${ldap.userDn}"/>
        <property name="password" value="${ldap.password}"/>
    </bean>

    <bean id="preAuthProvider"
          class="org.springframework.security.ldap.authentication.LdapAuthenticationProvider">
        <constructor-arg>
            <bean class="org.springframework.security.ldap.authentication.BindAuthenticator">
                <constructor-arg ref="contextSource"/>
                <property name="userDnPatterns">
                    <list><value>uid={0},cn=users</value></list>
                </property>
            </bean>
        </constructor-arg>
        <constructor-arg>
            <bean
                    class="org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator">
                <constructor-arg ref="contextSource"/>
                <constructor-arg value="cn=groups"/>
                <property name="groupRoleAttribute" value="cn"/>
                <property name="rolePrefix" value=""/>
            </bean>
        </constructor-arg>
    </bean>
</beans>
```

This can be expressed from Java as:

<?prettify lang=java?>
<pre class="prettyprint">
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.authentication.BindAuthenticator;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;

 @Configuration
    @ConditionalOnProperty(prefix = "ldap.config", name = "java", havingValue = "true", matchIfMissing = true)
    public static class LDAPJavaSecurityConfiguration{

        public LDAPJavaSecurityConfiguration() {
            logger.info("Using LDAPJavaSecurityConfiguration!");
        }

        @Value("${ldap.userDn}")
        String ldapUserDn;

        @Value("${ldap.password}")
        String ldapPassword;

        @Value("${ldap.url}")
        String ldapUrl;

        @Bean(name = "contextSource")
        DefaultSpringSecurityContextSource defaultSpringSecurityContextSource(){
            DefaultSpringSecurityContextSource defaultSpringSecurityContextSource = new DefaultSpringSecurityContextSource(ldapUrl);
            defaultSpringSecurityContextSource.setUserDn(ldapUserDn);
            defaultSpringSecurityContextSource.setPassword(ldapPassword);
            return defaultSpringSecurityContextSource;
        }

        private static String[] userDnArray = {"uid={0},cn=users"};

        @Bean(name="bindAuthenticator")
        BindAuthenticator bindAuthenticator(@Qualifier("contextSource")DefaultSpringSecurityContextSource defaultSpringSecurityContextSource){
            BindAuthenticator bindAuthenticator = new BindAuthenticator(defaultSpringSecurityContextSource);
            bindAuthenticator.setUserDnPatterns(userDnArray);
            return bindAuthenticator;
        }

        @Bean(name="defaultLdapAuthoritiesPopulator")
        DefaultLdapAuthoritiesPopulator defaultLdapAuthoritiesPopulator(@Qualifier("contextSource")DefaultSpringSecurityContextSource defaultSpringSecurityContextSource){
            DefaultLdapAuthoritiesPopulator defaultLdapAuthoritiesPopulator = new DefaultLdapAuthoritiesPopulator(
                    defaultSpringSecurityContextSource , "cn=groups");
            defaultLdapAuthoritiesPopulator.setGroupRoleAttribute("cn");
           // defaultLdapAuthoritiesPopulator.setRolePrefix("");
            defaultLdapAuthoritiesPopulator.setRolePrefix("ROLE_");
            return defaultLdapAuthoritiesPopulator;
        }

        @Bean(name="preAuthProvider")
        LdapAuthenticationProvider ldapAuthenticationProvider(@Qualifier("bindAuthenticator")BindAuthenticator bindAuthenticator,
                                                              DefaultLdapAuthoritiesPopulator defaultLdapAuthoritiesPopulator  ){
            LdapAuthenticationProvider ldapAuthenticationProvider = new LdapAuthenticationProvider(bindAuthenticator, defaultLdapAuthoritiesPopulator);
            return ldapAuthenticationProvider;
        }
    }
</pre>

Upon first inspection, there seems to be a few annotations of interest:


**@Configuration**|Indicates that the class can be used by the Spring IoC container as a source of bean definitions 
**@Bean**|Annotation representing the bean tag from XML
**@Value**|Represents a SPEL of property that is discovered during initalization 
**@Qualifier**|Represents the bean name that should be passed into the methods creating beans.

These are the first changes that could be made when transitioning XML configuration into Java configuration. 

In the next blog I will show you how to use some auto configuration along with some advanced wiring techniques to auto wire this configuration.


More can be found on these annotations [here.](http://www.tutorialspoint.com/spring/spring_annotation_based_configuration.htm)


#### Further reading

* [Spring](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/)
* [Spring Dependency Injection](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/overview.html#overview-dependency-injection)
* [Spring Java Annotations](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/annotation/package-summary.html)
* [Spring Java Annotations](http://www.tutorialspoint.com/spring/spring_annotation_based_configuration.htm)
* [Deploying the Right Way: Dokku on Digital Ocean](https://www.andrewmunsell.com/blog/dokku-tutorial-digital-ocean)
* [Spring Boot](http://projects.spring.io/spring-boot/)

