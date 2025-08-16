import React, { useState, useEffect } from 'react';

const EducationTab = () => {
  const [question, setQuestion] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  // Configuration
  const GEMINI_API_KEY = "AIzaSyC0An0akhrB9OSThPjHaNoMgQ6VQon_UDg"; // YOUR ACTUAL API KEY
  const MODEL_NAME = "gemini-2.0-flash";
  const systemInstructionText = "You are a knowledgeable farmer instructor and advisor who always responds. You provide detailed, accurate, and practical answers only to topics that directly affect farming — such as crop cultivation, fertilizers, soil health, irrigation, pest control, weather conditions, farming tools, agricultural techniques, and related advice for farmers. If a user asks about something unrelated to farming or agriculture, politely respond with: ‘Sorry, I can only answer questions related to farming, crops, fertilizers, or agriculture. Please ask something in that area.’ Always ensure that your farming-related answers are clear, thorough, and easy to understand.";
  // Initialize with welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setOutput(`welcome to farmer Dude ai helper`);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAskQuestion = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setOutput('<div class="error-message"><i class="fas fa-exclamation-circle"></i> Please enter a  your question first!</div>');
      return;
    }

    setOutput('');
    setIsLoading(true);

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            { text: trimmedQuestion }
          ]
        }
      ],
      systemInstruction: {
        parts: [
          { text: systemInstructionText }
        ]
      }
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorMsg = `API Error: ${response.status}`;
        let errorDetails = "Could not retrieve error details.";
        try {
          const errorData = await response.json();
          if (errorData.error && errorData.error.message) {
            errorDetails = errorData.error.message;
          }
          errorMsg = `${errorMsg} - ${errorDetails}`;
          if (errorData.error && errorData.error.status) {
            errorMsg += ` (Status: ${errorData.error.status})`;
          }
          // Check for API key specific issues
          if (errorDetails.toLowerCase().includes("api key not valid") || errorDetails.toLowerCase().includes("permission denied")) {
            errorMsg += "<br><strong>Please double-check your API key and ensure it's correctly enabled for the Gemini API in your Google Cloud Console or AI Studio.</strong>";
          }

        } catch (parseError) {
          errorMsg = `${errorMsg} (Could not parse error response: ${response.statusText})`;
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0 &&
        data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const answerText = data.candidates[0].content.parts[0].text;

        // Format the response with code highlighting
        let formattedText = answerText;

        // Simple formatting: wrap code snippets in <code> tags
        formattedText = formattedText.replace(/(```[\s\S]*?```)|(`[^`]+`)/g, (match) => {
          if (match.startsWith('```')) {
            return `<pre><code>${match.replace(/```/g, '')}</code></pre>`;
          } else {
            return `<code>${match.replace(/`/g, '')}</code>`;
          }
        });

        // Convert line breaks to paragraphs for better readability
        const paragraphs = formattedText.split('\n\n');
        let htmlOutput = '';

        for (const paragraph of paragraphs) {
          if (paragraph.trim() !== '') {
            htmlOutput += `<p>${paragraph}</p>`;
          }
        }

        setOutput(htmlOutput);
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        setOutput(`<div class="error-message"><i class="fas fa-ban"></i> Blocked due to: ${data.promptFeedback.blockReason}. Details: ${data.promptFeedback.blockReasonMessage || ''}</div>`);
      } else {
        console.warn("Unexpected response structure:", data);
        setOutput('<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Received an unexpected response structure from the AI.</div>');
      }

    } catch (error) {
      console.error('Frontend Error:', error);
      setOutput(`<div class="error-message"><i class="fas fa-bug"></i> Failed to get answer: ${error.message}</div>`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAskQuestion();
    }
  };

  const handleMenuClick = (index) => {
    setActiveMenuItem(index);
  };

  const menuItems = ['Dashboard', 'Questions', 'History', 'Settings'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <i className="fas fa-code text-blue-600 mr-3"></i>
            farmer Dude AI
          </h1>
          <p className="text-gray-600">Your personal farm Dude</p>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-4">
          <div className="flex space-x-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(index)}
                className={`menu-item px-4 py-2 rounded-md transition-colors ${
                  activeMenuItem === index
                    ? 'bg-blue-500 text-white active'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Question Input */}
          <div className="mb-6">
            <label htmlFor="questionInput" className="block text-sm font-medium text-gray-700 mb-2 ">
              Ask your problem:
            </label>
            <textarea
              id="questionInput"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your programming question here..."
              className="w-full p-3 border border-gray-300 rounded-md resize-vertical min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              rows="4"
            />
          </div>

          {/* Ask Button */}
          <div className="mb-6">
            <button
              id="askButton"
              onClick={handleAskQuestion}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i>
                  Ask Question
                </>
              )}
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div id="loadingIndicator" className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">AI is thinking...</p>
            </div>
          )}

          {/* Output Area */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Response:</h3>
            <div
              id="outputArea"
              className=" p-4 rounded-md min-h-[200px] prose max-w-none text-black bg-gray-300"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          </div>
        </div>
      </div>

      {/* Styles for the component */}
      <style>{`
        .error-message {
          color: #dc2626;
          background-color: #fef2f2;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #fecaca;
        }
        
        pre {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          padding: 16px;
          overflow-x: auto;
        }
        
        code {
          background-color: #f8f9fa;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        
        pre code {
          background-color: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default EducationTab;