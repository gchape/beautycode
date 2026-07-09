FROM maven:3.9.14-eclipse-temurin-25 AS builder
WORKDIR /app
COPY pom.xml ./
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests clean package

FROM gcr.io/distroless/java25-debian13:nonroot
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xms128m", "-Xmx384m", "-jar", "app.jar"]