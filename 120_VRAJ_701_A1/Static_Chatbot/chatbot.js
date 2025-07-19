const ChatbotReply = function(message) {
    const Bot_Age = 25;
    const Bot_Name = "name1";
    const Bot_University = "VNSGU";
    const Bot_Country = "India";

    message = message.toLowerCase();

    if (message.includes("hi") || message.includes("hello") || message.includes("welcome")) {
        return "Hi!";
    } else if (message.includes("age") && message.includes("your")) {
        return "I'm " + Bot_Age;
    } else if (message.includes("how") && message.includes("are") && message.includes("you")) {
        return "I'm fine ^_^";
    } else if (message.includes("where") && message.includes("live") && message.includes("you")) {
        return "I live in " + Bot_Country;
    }

    return "Sorry, I didn't get it :( ";
};

export default ChatbotReply;
