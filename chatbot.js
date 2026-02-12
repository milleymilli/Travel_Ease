// chatbot.js - Travel Ease AI Assistant

class TravelChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    // Create chatbot HTML
    const chatbotHTML = `
      <div id="chatbot-container">
        <!-- Chatbot Button -->
        <button id="chatbot-toggle" class="chatbot-toggle">
          <i class="fa fa-comments"></i>
        </button>

        <!-- Chatbot Window -->
        <div id="chatbot-window" class="chatbot-window">
          <div class="chatbot-header">
            <div class="chatbot-header-content">
              <i class="fa fa-robot"></i>
              <span>Travel Ease Assistant</span>
            </div>
            <button id="chatbot-close" class="chatbot-close">
              <i class="fa fa-times"></i>
            </button>
          </div>
          
          <div id="chatbot-messages" class="chatbot-messages">
            <div class="chatbot-message bot-message">
              <div class="message-content">
                👋 Hi! I'm your Travel Ease assistant. I can help you with:
                <br><br>
                • Finding destinations
                <br>• Booking information
                <br>• Travel tips
                <br>• Navigating our website
                <br><br>
                What can I help you with today?
              </div>
            </div>
          </div>

          <div class="chatbot-input-container">
            <input 
              type="text" 
              id="chatbot-input" 
              placeholder="Ask me anything..."
              autocomplete="off"
            />
            <button id="chatbot-send" class="chatbot-send-btn">
              <i class="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Add event listeners
    this.attachEventListeners();
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');

    toggle.addEventListener('click', () => this.toggleChat());
    close.addEventListener('click', () => this.toggleChat());
    send.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    const toggle = document.getElementById('chatbot-toggle');
    
    if (this.isOpen) {
      window.classList.add('active');
      toggle.classList.add('hidden');
    } else {
      window.classList.remove('active');
      toggle.classList.remove('hidden');
    }
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to chat
    this.addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    this.showTyping();

    try {
      // Call Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a helpful travel assistant for Travel Ease, a travel booking website. 
          
Help users with:
- Finding destinations (we offer Dubai, Tokyo, New York, Paris)
- Booking information and how to check availability
- Navigation help around the website
- Travel tips and recommendations
- Contact information (email: 808hasan@travelease.com, phone: [44] 123 456 789)

Be friendly, concise, and helpful. Keep responses under 3-4 sentences when possible.
If users want to book, guide them to the booking form on the homepage.
For contact inquiries, direct them to the contact page.`,
          messages: [
            ...this.messages,
            { role: 'user', content: message }
          ]
        })
      });

      const data = await response.json();
      
      // Remove typing indicator
      this.hideTyping();

      // Get assistant response
      const assistantMessage = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');

      // Add to messages history
      this.messages.push(
        { role: 'user', content: message },
        { role: 'assistant', content: assistantMessage }
      );

      // Display assistant message
      this.addMessage(assistantMessage, 'bot');

    } catch (error) {
      this.hideTyping();
      this.addMessage('Sorry, I encountered an error. Please try again or contact us directly.', 'bot');
      console.error('Chatbot error:', error);
    }
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'chatbot-message bot-message';
    typingDiv.innerHTML = `
      <div class="message-content typing">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TravelChatbot();
});