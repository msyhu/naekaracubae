FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENV PROFILE=prod
ENTRYPOINT ["java","-Dspring.profiles.active=${PROFILE}","-jar","/app.jar"]
