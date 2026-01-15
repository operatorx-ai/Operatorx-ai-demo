// ========================================
// OPERATORX-AI - PRODUCTION DEMO ENGINE
// Enterprise AI Operations Platform
// ========================================

// ===== GLOBAL STATE =====
let currentScreen = 1;
let isExecuting = false;
const auditLog = [];

// ===== SCENARIO DATA =====
const scenarios = {
    rent: {
        title: "Rent Payment Automation",
        input: "Pay rent on the 1st of every month unless my balance is below $2,000.",
        steps: [
            {
                title: "Intent Identified",
                content: "Recurring rent payment detected.<br><strong>Frequency:</strong> Monthly<br><strong>Conditional logic applied</strong>",
                status: "success",
                timestamp: "09:00:01"
            },
            {
                title: "Policy Check",
                content: "Payment amount, frequency, and authorization verified.<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Policies satisfied</span>",
                status: "success",
                timestamp: "09:00:02"
            },
            {
                title: "Balance Check",
                content: "Current available balance evaluated.<br><strong>Balance:</strong> $3,420.17<br><strong>Required minimum:</strong> $2,000",
                status: "success",
                timestamp: "09:00:03"
            },
            {
                title: "Decision Engine",
                content: "Conditions met. Operation approved.<br><span class='badge' style='background: var(--gradient-success); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; display: inline-block; margin-top: 0.5rem;'>Approved for execution</span>",
                status: "success",
                timestamp: "09:00:04"
            }
        ],
        result: {
            title: "Operation Scheduled Successfully",
            details: [
                { label: "Action", value: "Rent Payment" },
                { label: "Amount", value: "$1,450.00" },
                { label: "Execution Date", value: "February 1, 2026" },
                { label: "Payment Method", value: "ACH" }
            ],
            note: "Conditions will be re-evaluated before every execution."
        }
    },
    bills: {
        title: "Bill Detection & Categorization",
        input: "Handle my utilities automatically.",
        bills: [
            {
                name: "Electric Company",
                amount: "$127.45",
                category: "Utilities",
                dueDate: "Feb 15, 2026",
                status: "Detected"
            },
            {
                name: "Water & Sewage",
                amount: "$89.12",
                category: "Utilities",
                dueDate: "Feb 10, 2026",
                status: "Scheduled"
            },
            {
                name: "Internet Service",
                amount: "$79.99",
                category: "Utilities",
                dueDate: "Feb 5, 2026",
                status: "Paid"
            }
        ],
        steps: [
            {
                title: "Bill detected from transaction feed",
                content: "Utility bill identified and categorized.<br><strong>Category:</strong> Utilities",
                status: "success",
                timestamp: "10:30:01"
            },
            {
                title: "Category: Utilities",
                content: "Bills categorized automatically.<br>AI confidence: 98%",
                status: "success",
                timestamp: "10:30:02"
            },
            {
                title: "Due date extracted",
                content: "Payment deadlines parsed<br>Calendar synchronized",
                status: "success",
                timestamp: "10:30:03"
            },
            {
                title: "Payment scheduled",
                content: "3 payments queued<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Workflow completed</span><br><span style='font-size: 0.75rem; color: var(--color-text-tertiary); display: block; margin-top: 0.5rem;'>No manual sorting required.</span>",
                status: "success",
                timestamp: "10:30:04"
            }
        ]
    },
    failure: {
        title: "Failure Handling & Safety Protocols",
        input: "Simulated: Payment failed due to insufficient funds",
        steps: [
            {
                title: "Failure detected",
                content: "A payment attempt failed due to insufficient funds.<br>Rent payment: $1,450.00<br>Account balance: $1,280.50",
                status: "danger",
                timestamp: "09:00:01"
            },
            {
                title: "Transaction halted",
                content: "Payment execution stopped immediately.<br>Zero duplicate charge risk",
                status: "success",
                timestamp: "09:00:02"
            },
            {
                title: "Retry scheduled",
                content: "Automatic retry in 24 hours<br>Policy: Max 3 attempts",
                status: "success",
                timestamp: "09:00:03"
            },
            {
                title: "User notification generated",
                content: "Alert sent to user<br>Manual review available",
                status: "success",
                timestamp: "09:00:04"
            }
        ],
        alert: {
            title: "Execution Paused",
            message: "A payment attempt failed due to insufficient funds. No duplicate charges. No silent failures.",
            badge: "⚠ Action safely paused"
        }
    }
};

// ===== AUDIT LOG DATA =====
const sampleAuditEntries = [
    {
        timestamp: "2026-01-15 09:02:15",
        action: "Rent Payment",
        decision: "Approved",
        policy: "Balance ≥ $2,000",
        result: "Scheduled"
    },
    {
        timestamp: "2026-01-15 08:45:33",
        action: "Bill Categorization",
        decision: "Automated",
        policy: "ML Confidence >95%",
        result: "Success"
    },
    {
        timestamp: "2026-01-15 07:12:08",
        action: "Payment Failure",
        decision: "Rejected",
        policy: "Insufficient Funds",
        result: "Halted"
    },
    {
        timestamp: "2026-01-14 22:30:45",
        action: "Subscription Payment",
        decision: "Approved",
        policy: "Auto-pay Enabled",
        result: "Completed"
    },
    {
        timestamp: "2026-01-14 18:15:22",
        action: "Invoice Received",
        decision: "Pending Review",
        policy: "Amount >$5,000",
        result: "Escalated"
    }
];

// ===== SCREEN NAVIGATION =====
function navigateToScreen(screenNumber) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.querySelector(`[data-screen="${screenNumber}"]`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenNumber;
        
        // Initialize screen-specific content
        if (screenNumber === 9) {
            populateAuditLog();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ===== AI COMMAND CENTER =====
function loadScenario(scenarioType) {
    const scenario = scenarios[scenarioType];
    if (!scenario) return;
    
    const aiInput = document.getElementById('aiInput');
    aiInput.value = scenario.input;
    
    // Highlight the input field briefly
    aiInput.style.borderColor = 'var(--color-accent-primary)';
    setTimeout(() => {
        aiInput.style.borderColor = '';
    }, 1000);
}

function executeAI() {
    if (isExecuting) return;
    
    const inputValue = document.getElementById('aiInput').value.trim();
    
    if (!inputValue) {
        alert('Please enter a command or select an example.');
        return;
    }
    
    // Determine scenario based on input
    let scenarioType = 'rent'; // default
    if (inputValue.toLowerCase().includes('bill') || inputValue.toLowerCase().includes('utilities')) {
        scenarioType = 'bills';
    } else if (inputValue.toLowerCase().includes('fail') || inputValue.toLowerCase().includes('detect')) {
        scenarioType = 'failure';
    }
    
    isExecuting = true;
    
    // Clear timeline
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    // Show scenario
    const scenario = scenarios[scenarioType];
    
    // Animate steps
    scenario.steps.forEach((step, index) => {
        setTimeout(() => {
            addTimelineStep(step, index);
            
            // After last step, show result
            if (index === scenario.steps.length - 1) {
                setTimeout(() => {
                    showScenarioResult(scenarioType);
                }, 800);
            }
        }, index * 600);
    });
}

function addTimelineStep(step, index) {
    const timeline = document.getElementById('timeline');
    
    const stepEl = document.createElement('div');
    stepEl.className = 'timeline-step';
    stepEl.style.animationDelay = `${index * 0.1}s`;
    
    stepEl.innerHTML = `
        <div class="step-header">
            <div class="step-title">${step.title}</div>
            <div class="step-timestamp">${step.timestamp}</div>
        </div>
        <div class="step-content">${step.content}</div>
        <div class="step-status ${step.status}">
            ${step.status === 'success' ? '✓ Success' : step.status === 'warning' ? '⚠ Warning' : '✗ Error'}
        </div>
    `;
    
    timeline.appendChild(stepEl);
}

function showScenarioResult(scenarioType) {
    const scenario = scenarios[scenarioType];
    const scenarioContent = document.getElementById('scenarioContent');
    
    if (scenarioType === 'rent') {
        scenarioContent.innerHTML = `
            <div class="result-card">
                <div class="result-header">
                    <div class="result-icon">✔</div>
                    <div class="result-title" style="color: var(--color-accent-success);">${scenario.result.title}</div>
                </div>
                <div class="result-details">
                    ${scenario.result.details.map(detail => `
                        <div class="result-detail">
                            <div class="detail-label">${detail.label}</div>
                            <div class="detail-value">${detail.value}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="side-note">
                    ${scenario.result.note}
                </div>
            </div>
            <div class="screen-nav">
                <button class="nav-btn" onclick="navigateToScreen(3)">← Back to Command Center</button>
                <button class="nav-btn btn-primary" onclick="navigateToScreen(7)">View Bill Demo →</button>
            </div>
        `;
    } else if (scenarioType === 'bills') {
        const billsDemo = document.getElementById('billsDemo');
        billsDemo.innerHTML = `
            <div class="bills-flow">
                ${scenario.bills.map((bill, index) => `
                    <div class="bill-card" style="animation-delay: ${index * 0.2}s">
                        <div class="bill-info">
                            <h4>${bill.name}</h4>
                            <p>${bill.amount} • Due ${bill.dueDate}</p>
                            <span class="bill-category">${bill.category}</span>
                        </div>
                        <div class="bill-status">
                            <span class="step-status success">${bill.status}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="result-card mt-xl">
                <div class="result-header">
                    <div class="result-icon">📊</div>
                    <div class="result-title">Automated Bill Management</div>
                </div>
                <div class="step-content">
                    All utility bills detected, categorized, and scheduled for payment.
                    Calendar synchronized. No manual intervention required.
                </div>
            </div>
            <div class="screen-nav">
                <button class="nav-btn" onclick="navigateToScreen(3)">← Back to Command Center</button>
                <button class="nav-btn btn-primary" onclick="navigateToScreen(8)">View Failure Handling →</button>
            </div>
        `;
        navigateToScreen(7);
    } else if (scenarioType === 'failure') {
        const failureDemo = document.getElementById('failureDemo');
        failureDemo.innerHTML = `
            <div class="failure-alert">
                <div class="alert-header">
                    <div class="alert-icon">⚠️</div>
                    <div class="alert-title">${scenario.alert.title}</div>
                </div>
                <div class="step-content">
                    ${scenario.alert.message}
                </div>
                <div class="safety-badge">
                    🛡️ ${scenario.alert.badge}
                </div>
            </div>
            
            <div class="timeline-container mt-xl">
                <h3 style="margin-bottom: var(--space-md); color: var(--color-text-secondary);">
                    AI Response Timeline
                </h3>
                ${scenario.steps.map((step, index) => `
                    <div class="timeline-step" style="animation-delay: ${index * 0.1}s">
                        <div class="step-header">
                            <div class="step-title">${step.title}</div>
                            <div class="step-timestamp">${step.timestamp}</div>
                        </div>
                        <div class="step-content">${step.content}</div>
                        <div class="step-status ${step.status}">
                            ${step.status === 'success' ? '✓ Safe' : step.status === 'warning' ? '⚠ Alert' : '✗ Blocked'}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="screen-nav">
                <button class="nav-btn" onclick="navigateToScreen(3)">← Back to Command Center</button>
                <button class="nav-btn btn-primary" onclick="navigateToScreen(9)">View Audit Log →</button>
            </div>
        `;
        navigateToScreen(8);
    }
    
    navigateToScreen(4);
    document.getElementById('scenarioTitle').textContent = scenario.title;
    isExecuting = false;
}

// ===== AUDIT LOG =====
function populateAuditLog() {
    const auditTableBody = document.getElementById('auditTableBody');
    
    if (!auditTableBody) return;
    
    auditTableBody.innerHTML = sampleAuditEntries.map(entry => `
        <tr>
            <td>${entry.timestamp}</td>
            <td>${entry.action}</td>
            <td>${entry.decision}</td>
            <td>${entry.policy}</td>
            <td>
                <span class="step-status ${entry.result.toLowerCase().includes('success') || entry.result === 'Completed' || entry.result === 'Scheduled' ? 'success' : entry.result === 'Escalated' || entry.result === 'Pending Review' ? 'warning' : 'danger'}">
                    ${entry.result}
                </span>
            </td>
        </tr>
    `).join('');
}

// ===== ANIMATIONS ON SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-up, .fade-in-sequence').forEach(el => {
        observer.observe(el);
    });
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Right Arrow = Next Screen
        if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
            if (currentScreen < 12) {
                navigateToScreen(currentScreen + 1);
            }
        }
        // Ctrl/Cmd + Left Arrow = Previous Screen
        if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
            if (currentScreen > 1) {
                navigateToScreen(currentScreen - 1);
            }
        }
        // Escape = Return to Home
        if (e.key === 'Escape') {
            navigateToScreen(1);
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Show first screen
    navigateToScreen(1);
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Add Enter key support for AI input
    const aiInput = document.getElementById('aiInput');
    if (aiInput) {
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                executeAI();
            }
        });
    }
    
    console.log('%c🤖 Operatorx-AI Demo Loaded', 'font-size: 20px; color: #6366f1; font-weight: bold;');
    console.log('%cKeyboard Shortcuts:', 'font-size: 14px; color: #8b5cf6;');
    console.log('  Ctrl/Cmd + → : Next Screen');
    console.log('  Ctrl/Cmd + ← : Previous Screen');
    console.log('  ESC : Return to Home');
    console.log('  Ctrl/Cmd + Enter (in AI Input) : Execute Command');
});

// ===== UTILITY FUNCTIONS =====
function formatTimestamp(date = new Date()) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToScreen,
        loadScenario,
        executeAI
    };
}
