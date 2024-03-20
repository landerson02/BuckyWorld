# pulls latest gradle image, labels it builder
# creates working directory app if not present
# gives gradle "user" owner permissions, because it is not root by default
# executes build

FROM gradle:latest as builder  
WORKDIR /app
COPY --chown=gradle:gradle . /app
RUN ./gradlew build

# pulls latest open:jdk image
# /app/build/libs/*.jar /app/app.jar  
# gets jar file from builder and copies it over
# runs backend
FROM openjdk:latest 
WORKDIR /app 
COPY --from=builder /app/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]
