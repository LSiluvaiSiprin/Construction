// Global error handler for the frontend application
class ErrorHandler {
  static init() {
    // Handle network errors
    window.addEventListener('online', () => {
      console.log('Connection restored');
      this.hideNetworkError();
    });

    window.addEventListener('offline', () => {
      console.log('Connection lost');
      this.showNetworkError();
    });

    // Handle JavaScript errors
    window.addEventListener('error', (e) => {
      console.error('JavaScript Error:', e.error);
      this.logError('JavaScript Error', e.error.message, e.filename, e.lineno);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled Promise Rejection:', e.reason);
      this.logError('Promise Rejection', e.reason);
    });
  }

  static showNetworkError() {
    const existingError = document.getElementById('network-error');
    if (existingError) return;

    const errorDiv = document.createElement('div');
    errorDiv.id = 'network-error';
    errorDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #dc2626;
      color: white;
      padding: 10px;
      text-align: center;
      z-index: 9999;
      font-size: 14px;
    `;
    errorDiv.innerHTML = `
      <i class="fas fa-wifi" style="margin-right: 8px;"></i>
      No internet connection. Please check your network.
    `;
    
    document.body.appendChild(errorDiv);
  }

  static hideNetworkError() {
    const errorDiv = document.getElementById('network-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  static logError(type, message, filename = '', line = '') {
    const errorData = {
      type,
      message,
      filename,
      line,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Log to console for debugging
    console.error('Error logged:', errorData);

    // In a production app, you might send this to a logging service
    // this.sendToLoggingService(errorData);
  }

  static async sendToLoggingService(errorData) {
    try {
      await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorData)
      });
    } catch (e) {
      console.error('Failed to send error to logging service:', e);
    }
  }

  // Utility method to check if backend is reachable
  static async checkBackendHealth() {
    try {
      const response = await fetch('/health', {
        method: 'GET',
        timeout: 5000
      });
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
}

// Initialize error handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  ErrorHandler.init();
});

// Export for use in other scripts
window.ErrorHandler = ErrorHandler;