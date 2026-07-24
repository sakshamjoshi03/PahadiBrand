const handleSendMessage = async (message) => {

    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [
        ...prev,
        {
            role: "user",
            content: message,
        }
    ]);

    setLoading(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    setMessages(prev => [
        ...prev,
        {
            role: "assistant",
            content:
                "🌿 This is a dummy AI response from Your Pahadi Bhula.",
        }
    ]);

    setLoading(false);
};