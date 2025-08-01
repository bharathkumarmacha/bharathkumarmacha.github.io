public class ChatbotRequest {
    private String userInput;
    private String sessionId;

    public ChatbotRequest() {
    }

    public ChatbotRequest(String userInput, String sessionId) {
        this.userInput = userInput;
        this.sessionId = sessionId;
    }

    public String getUserInput() {
        return userInput;
    }

    public void setUserInput(String userInput) {
        this.userInput = userInput;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}