# FROM openjdk:17-oracle
# ARG JAR_FILE=build/libs/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

FROM gradle:latest as builder
WORKDIR /app
COPY --chown=gradle:gradle . /app
RUN ./gradlew build

FROM openjdk:latest
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]
