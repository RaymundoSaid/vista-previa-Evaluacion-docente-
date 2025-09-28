// Teacher Evaluation 360° Platform - Navigation and UI Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initMobileMenu();
    initActiveNavigation();
    initModalHandlers();
    initFormValidation();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Store active page in localStorage
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                localStorage.setItem('activePage', href);
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.cssText = `
        display: none;
        background: var(--accent-primary);
        color: white;
        border: none;
        padding: 10px;
        font-size: 18px;
        cursor: pointer;
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 1001;
        border-radius: 5px;
    `;
    
    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(mobileMenuToggle);
    
    const sidebar = document.querySelector('.sidebar');
    
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('mobile-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });
}

// Set active navigation based on current page
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && href === 'dashboard.html') ||
            (currentPage === '' && href === 'dashboard.html')) {
            link.classList.add('active');
        }
    });
}

// Modal handlers for buttons
function initModalHandlers() {
    // Simulate modal for action buttons
    const actionButtons = document.querySelectorAll('[data-action]');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            showSimulatedModal(action);
        });
    });
}

// Show simulated modal
function showSimulatedModal(action) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--bg-card);
        padding: 30px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        max-width: 400px;
        width: 90%;
        text-align: center;
    `;
    
    const actionText = getActionText(action);
    modalContent.innerHTML = `
        <h3 style="color: var(--accent-primary); margin-bottom: 15px;">${actionText}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 20px;">This is a prototype. This action would ${action.toLowerCase()} in the real application.</p>
        <button onclick="this.closest('.modal').remove()" class="btn btn-primary">Close</button>
    `;
    
    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Get action text for modals
function getActionText(action) {
    const actionTexts = {
        'add-user': 'Add New User',
        'edit-user': 'Edit User',
        'delete-user': 'Delete User',
        'add-evaluation': 'Create New Evaluation',
        'view-results': 'View Evaluation Results',
        'new-complaint': 'Submit New Complaint',
        'add-committee': 'Create New Committee',
        'view-details': 'View Committee Details',
        'export-report': 'Export Report',
        'save-settings': 'Save Settings'
    };
    
    return actionTexts[action] || 'Action';
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Simulate form submission
            console.log('Form submitted:', data);
            
            // For login form, redirect to dashboard
            if (form.id === 'loginForm') {
                window.location.href = 'dashboard.html';
            } else {
                showSimulatedModal('save-settings');
            }
        });
    });
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 3000;
        font-weight: 500;
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: var(--success);' : ''}
        ${type === 'error' ? 'background: var(--danger);' : ''}
        ${type === 'warning' ? 'background: var(--warning); color: var(--bg-primary);' : ''}
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Theme toggle (bonus feature)
function toggleTheme() {
    // This would toggle between light and dark themes in a real app
    showNotification('Theme toggle is not implemented in this prototype', 'warning');
}

// Chart simulation
function initCharts() {
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    
    chartPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            showNotification('Charts would be interactive in the real application', 'info');
        });
    });
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', initCharts);

// Export functions for global use
window.showNotification = showNotification;
window.toggleTheme = toggleTheme;
