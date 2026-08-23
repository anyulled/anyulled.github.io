const technologyCatalog = {
  'apache ant': ['Apache Ant', 'Used to automate the Java build and delivery tasks.'],
  'apache camel': ['Apache Camel', 'Used to build Java integration routes and data-transformation flows.'],
  'apache kafka': ['Apache Kafka', 'Used for event streaming and asynchronous communication between services.'],
  'apache maven jarsigner plugin': ['Apache Maven Jarsigner Plugin', 'Used to sign and verify Java artifacts as part of the Maven build.'],
  'apache struts': ['Apache Struts', 'Used as the Java MVC web framework for the application.'],
  'apache struts 2': ['Apache Struts 2', 'Used as the Java MVC web framework for the application.'],
  'apache tiles': ['Apache Tiles', 'Used to compose reusable layouts in the Java web application.'],
  'apache tomcat': ['Apache Tomcat', 'Used as the servlet container for the Java web application.'],
  'archunit': ['ArchUnit', 'Used to verify architectural rules in automated Java tests.'],
  'assertj': ['AssertJ', 'Used to write fluent and readable assertions in Java tests.'],
  'aws sdk': ['AWS SDK', 'Used to integrate Java services with AWS infrastructure and APIs.'],
  'checkstyle': ['Checkstyle', 'Used to enforce Java source-code style rules.'],
  'eclipse jkube': ['Eclipse JKube', 'Used to build container images and generate Kubernetes resources and Helm charts from Java projects.'],
  'gradle': ['Gradle', 'Used to define the Java build, dependency management, and delivery tasks.'],
  'google cloud platform (gcp) sdk': ['Google Cloud Platform (GCP) SDK', 'Used to integrate Java services with GCP infrastructure and APIs.'],
  'hibernate envers': ['Hibernate Envers', 'Used to audit and version changes to Hibernate entities.'],
  'hibernate orm': ['Hibernate ORM', 'Used to map Java domain objects to relational database data.'],
  'jackson': ['Jackson', 'Used to serialize and deserialize Java objects and service payloads.'],
  'jackson serialization': ['Jackson', 'Used to serialize and deserialize Java objects and service payloads.'],
  'itext': ['iText', 'Used to generate and process PDF documents from Java applications.'],
  'java': ['Java', 'Used as the primary implementation language for the application and its supporting services.'],
  'java 1.4': ['Java 1.4', 'Used as the implementation language for the legacy application.'],
  'java 1.6': ['Java 6', 'Used as the implementation language for the enterprise application.'],
  'java 8': ['Java 8', 'Used as the implementation language for the application and its automated tests.'],
  'java 11': ['Java 11', 'Used as the runtime and implementation language for the Java services.'],
  'java 17': ['Java 17', 'Used to implement the Java services and take advantage of the modern runtime baseline.'],
  'java 21': ['Java 21', 'Used as the implementation language for modern Java services and platform components.'],
  'java mainframe connector (jmc)': ['Java Mainframe Connector (JMC)', 'Used to connect Java and cloud workloads with mainframe data and processes.'],
  'jax-ws': ['JAX-WS', 'Used to expose and consume SOAP web services from Java applications.'],
  'jdbc': ['JDBC', 'Used to connect Java application code with relational database systems.'],
  'jbehave': ['JBehave', 'Used to connect readable behavior scenarios with executable Java acceptance tests.'],
  'jboss': ['JBoss EAP', 'Used as the Java application server for the enterprise application.'],
  'jpa': ['JPA', 'Used to define the Java persistence model and database interactions.'],
  'jsp servlets': ['JSP and Servlets', 'Used to render views and handle HTTP requests in the Java web application.'],
  'junit 4': ['JUnit 4', 'Used to structure and execute automated Java tests.'],
  'junit 5': ['JUnit 5', 'Used to structure and execute the automated Java test suite.'],
  'junit 6': ['JUnit 6', 'Used to structure and execute the automated Java test suite.'],
  'jacoco': ['JaCoCo', 'Used to measure Java test coverage.'],
  'keycloak': ['Keycloak', 'Used to provide identity and access management for Java services.'],
  'log4j': ['Log4j', 'Used to provide structured application logging.'],
  'mainframe connector': ['Java Mainframe Connector (JMC)', 'Used to connect Java and cloud workloads with mainframe data and processes.'],
  'maven': ['Maven', 'Used to manage the Java build lifecycle and project dependencies.'],
  'maven archetype': ['Maven Archetype', 'Used to generate consistent Java service structures and bootstrap production-ready applications.'],
  'micrometer': ['Micrometer', 'Used to expose application metrics from Java services.'],
  'mockito': ['Mockito', 'Used to isolate collaborators and control dependencies during automated tests.'],
  'netty': ['Netty', 'Used as the asynchronous networking foundation for Java services.'],
  'oc4j': ['OC4J', 'Used as the legacy Java EE application server for enterprise applications before migration to WebLogic.'],
  'openfeature': ['OpenFeature', 'Used to standardize feature-flag integration across Java services.'],
  'opentelemetry': ['OpenTelemetry', 'Used to instrument Java services and propagate distributed traces and telemetry.'],
  'oracle': ['Oracle Database', 'Used as the relational database platform for the Java application.'],
  'orika mapper': ['Orika Mapper', 'Used to map between Java objects and transfer models.'],
  'pact contract test': ['Pact JVM', 'Used to verify consumer-driven contracts between Java services.'],
  'pact': ['Pact JVM', 'Used to verify consumer-driven contracts between Java services.'],
  'pmd': ['PMD', 'Used to detect common Java source-code problems and code smells.'],
  'quartz': ['Quartz', 'Used to schedule recurring jobs in Java applications.'],
  'reactive java': ['Project Reactor', 'Used to implement non-blocking and reactive Java flows.'],
  'resilience4j': ['Resilience4j', 'Used to apply retries, circuit breakers and other resilience patterns.'],
  'ribbon': ['Netflix Ribbon', 'Used for client-side load balancing between Java services.'],
  'selenium': ['Selenium', 'Used to automate browser interactions for end-to-end Java tests.'],
  'spring': ['Spring Framework', 'Used to structure the application and configure its Java components.'],
  'spring boot': ['Spring Boot', 'Used to build and configure independently deployable Java applications.'],
  'spring boot webmvc': ['Spring Boot Web MVC', 'Used to build HTTP APIs and web endpoints with Spring Boot.'],
  'spring cloud': ['Spring Cloud', 'Used to support distributed-system patterns across Java services.'],
  'spring cloud openfeign': ['Spring Cloud OpenFeign', 'Used to create declarative HTTP clients between Java services.'],
  'spring cloud streams': ['Spring Cloud Stream', 'Used to build event-driven integrations and message-driven Java services.'],
  'spring contract test': ['Spring Cloud Contract', 'Used to verify contracts between Spring-based services.'],
  'spring framework 2': ['Spring Framework 2', 'Used to structure the legacy Java application and configure its components.'],
  'spring framework 3': ['Spring Framework 3', 'Used to structure the legacy Java application and configure its components.'],
  'spring mvc': ['Spring MVC', 'Used as the Java web MVC framework for HTTP request handling.'],
  'spring security': ['Spring Security', 'Used to secure Java applications and manage authentication and authorization.'],
  'spring security ': ['Spring Security', 'Used to secure Java applications and manage authentication and authorization.'],
  'struts': ['Apache Struts', 'Used as the Java MVC web framework for the application.'],
  'struts 2': ['Apache Struts 2', 'Used as the Java MVC web framework for the application.'],
  'test automation': ['Test Automation', 'Used to automate acceptance and regression checks for the application.'],
  'testcontainers': ['Testcontainers', 'Used to run integration tests against containerized infrastructure dependencies.'],
  'vavr': ['Vavr', 'Used to apply functional programming patterns and explicit error handling in Java code.'],
  'webclient': ['Spring WebClient', 'Used to implement non-blocking HTTP communication from Java services.'],
  'wildfly': ['WildFly', 'Used as a Java application runtime for teams with different deployment requirements.'],
  'zuul': ['Netflix Zuul', 'Used as an API gateway and edge-routing component for Java services.'],
  'eureka': ['Netflix Eureka', 'Used for service discovery between Java services.']
};

const aliases = {
  'apache struts': 'Apache Struts',
  'apache struts 2': 'Apache Struts 2',
  'eureka': 'Netflix Eureka',
  'iText': 'iText',
  'jacoco': 'JaCoCo',
  'jkube': 'Eclipse JKube',
  'log4j': 'Log4j',
  'mainframe connector': 'Java Mainframe Connector (JMC)',
  'opentelemetry': 'OpenTelemetry',
  'pact contract test': 'Pact JVM',
  'reactive java': 'Project Reactor',
  'ribbon': 'Netflix Ribbon',
  'spring cloud streams': 'Spring Cloud Stream',
  'struts': 'Apache Struts',
  'struts 2': 'Apache Struts 2',
  'testcontainers': 'Testcontainers',
  'zuul': 'Netflix Zuul'
};

export function normalizeTechnologyName(name) {
  const key = name.trim().toLowerCase();
  return aliases[key] || technologyCatalog[key]?.[0] || name.trim();
}

export function describeTechnology(name, fallback = '') {
  const key = name.trim().toLowerCase();
  const canonical = Object.values(technologyCatalog).find(([canonicalName]) => canonicalName.toLowerCase() === key);
  return technologyCatalog[key]?.[1] || technologyCatalog[normalizeTechnologyName(name).toLowerCase()]?.[1] || canonical?.[1] || fallback;
}

export function isRelevantTechnology(name) {
  const normalized = normalizeTechnologyName(name).toLowerCase();
  const canonicalNames = new Set(Object.values(technologyCatalog).map(([canonicalName]) => canonicalName.toLowerCase()));
  return Boolean(technologyCatalog[normalized] || technologyCatalog[name.trim().toLowerCase()] || canonicalNames.has(normalized));
}
