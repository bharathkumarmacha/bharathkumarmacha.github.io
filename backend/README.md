# README.md for Backend

# My Workspace Backend

This is the backend part of the My Workspace project, built using Spring Boot. It provides the necessary APIs for the React frontend, including a chatbot feature that processes user requests and generates responses based on trained fields.

## Project Structure

- `src/main/java/com/example/myapp/MyAppApplication.java`: Main entry point for the Spring Boot application.
- `src/main/java/com/example/myapp/controller/ChatbotController.java`: Handles incoming requests related to the chatbot.
- `src/main/java/com/example/myapp/service/ChatbotService.java`: Contains business logic for processing chatbot requests.
- `src/main/java/com/example/myapp/model/ChatbotRequest.java`: Represents the structure of the request sent to the chatbot.
- `src/main/resources/application.properties`: Configuration properties for the Spring Boot application.
- `src/test/java/com/example/myapp/MyAppApplicationTests.java`: Test cases for the Spring Boot application.
- `pom.xml`: Maven configuration file for dependencies and build settings.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd my-workspace/backend
   ```

2. **Build the project**:
   ```
   mvn clean install
   ```

3. **Run the application**:
   ```
   mvn spring-boot:run
   ```

4. **Access the API**:
   The backend will be running on `http://localhost:8080`. You can access the chatbot API endpoints defined in `ChatbotController`.

## Usage

- The chatbot API can be accessed via POST requests to the appropriate endpoints defined in the `ChatbotController`.
- Ensure that the frontend is configured to communicate with the backend by setting the correct API URLs.

## Testing

To run the tests, use the following command:
```
mvn test
```

This will execute the test cases defined in `MyAppApplicationTests.java` to ensure the application is functioning as expected.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.