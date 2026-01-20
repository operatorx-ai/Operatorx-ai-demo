
// ===== LEGACY SCENARIO DATA (for backwards compatibility) =====
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

    // Show target screen, fallback to first screen if not found
    let targetScreen = document.querySelector(`[data-screen="${screenNumber}"]`);
    if (!targetScreen) {
        targetScreen = document.querySelector('.screen'); // fallback to first screen
        screenNumber = targetScreen ? targetScreen.getAttribute('data-screen') : 1;
    }
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = Number(screenNumber);

        // Robust dynamic content fallback
        try {
            // Example: ensure industryContent exists for selected org
            const orgSelector = document.getElementById('orgSelector');
            let org = orgSelector ? orgSelector.value : 'property';
            if (!industryContent[org]) {
                org = 'property';
                if (orgSelector) orgSelector.value = 'property';
                console.error('Industry content missing for selected org, falling back to Property Management. - script.js:198');
            }
            // You can add more fallback logic here for other dynamic containers
        } catch (err) {
            console.error('Error rendering dynamic content: - script.js:202', err);
        }

        // Initialize screen-specific content
        if (Number(screenNumber) === 9) {
            populateAuditLog();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ===== INDUSTRY-SPECIFIC SCENARIOS =====
const industryScenarios = {
    property: {
        scenario1: {
            title: "Rent Collection Automation",
            input: "Collect rent on the 1st unless occupancy is below 90%.",
            steps: [
                {
                    title: "Intent Identified",
                    content: "Recurring rent collection detected.<br><strong>Frequency:</strong> Monthly<br><strong>Conditional logic applied</strong>",
                    status: "success",
                    timestamp: "09:00:01"
                },
                {
                    title: "Policy Validation",
                    content: "Collection rules verified against property management policies.<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Policies satisfied</span>",
                    status: "success",
                    timestamp: "09:00:02"
                },
                {
                    title: "Condition Verification",
                    content: "Occupancy rate evaluated.<br><strong>Current occupancy:</strong> 94%<br><strong>Required minimum:</strong> 90%",
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
                title: "Operation Approved",
                details: [
                    { label: "Action", value: "Rent Collection" },
                    { label: "Amount", value: "$28,450.00" },
                    { label: "Execution Date", value: "February 1, 2026" },
                    { label: "Method", value: "ACH" }
                ],
                note: "Conditions are re-evaluated before every execution."
            }
        },
        scenario2: {
            title: "Late Payment Handling",
            input: "Automated workflow detected from transaction feed",
            steps: [
                {
                    title: "Late payment detected from transaction feed",
                    content: "Payment delay identified and categorized.<br><strong>Category:</strong> Late Payment",
                    status: "success",
                    timestamp: "10:30:01"
                },
                {
                    title: "Category: Delinquent Accounts",
                    content: "Payments categorized automatically.<br>AI confidence: 98%",
                    status: "success",
                    timestamp: "10:30:02"
                },
                {
                    title: "Grace period evaluated",
                    content: "Policy thresholds checked<br>Notification scheduled",
                    status: "success",
                    timestamp: "10:30:03"
                },
                {
                    title: "Reminder scheduled",
                    content: "Automated notification queued<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Workflow completed</span><br><span style='font-size: 0.75rem; color: var(--color-text-tertiary); display: block; margin-top: 0.5rem;'>No manual intervention required.</span>",
                    status: "success",
                    timestamp: "10:30:04"
                }
            ]
        },
        scenario3: {
            title: "Maintenance Invoice Scheduling",
            input: "Simulated: Payment failed due to insufficient funds",
            steps: [
                {
                    title: "Failure detected",
                    content: "A payment attempt failed due to insufficient funds.<br>Maintenance invoice: $2,150.00<br>Account balance: $1,280.50",
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
                    content: "Alert sent to property manager<br>Manual review available",
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
    },
    medical: {
        scenario1: {
            title: "Lab Payment Automation",
            input: "Pay lab invoices weekly unless charges exceed $10,000.",
            steps: [
                {
                    title: "Intent Identified",
                    content: "Recurring lab payment detected.<br><strong>Frequency:</strong> Weekly<br><strong>Conditional logic applied</strong>",
                    status: "success",
                    timestamp: "09:00:01"
                },
                {
                    title: "Policy Validation",
                    content: "Healthcare payment rules verified.<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Compliance satisfied</span>",
                    status: "success",
                    timestamp: "09:00:02"
                },
                {
                    title: "Condition Verification",
                    content: "Invoice amount evaluated.<br><strong>Current total:</strong> $7,340.50<br><strong>Threshold limit:</strong> $10,000",
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
                title: "Operation Scheduled",
                details: [
                    { label: "Action", value: "Lab Payment" },
                    { label: "Amount", value: "$7,340.50" },
                    { label: "Execution Date", value: "January 22, 2026" },
                    { label: "Method", value: "ACH" }
                ],
                note: "Conditions are re-evaluated before every execution."
            }
        },
        scenario2: {
            title: "Insurance Invoice Categorization",
            input: "Automated workflow detected",
            steps: [
                {
                    title: "Insurance invoice detected from transaction feed",
                    content: "Invoice identified and categorized.<br><strong>Category:</strong> Insurance Claims",
                    status: "success",
                    timestamp: "10:30:01"
                },
                {
                    title: "Category: Insurance Billing",
                    content: "Claims categorized automatically.<br>AI confidence: 97%",
                    status: "success",
                    timestamp: "10:30:02"
                },
                {
                    title: "Claim verification scheduled",
                    content: "Authorization status checked<br>Payment queue updated",
                    status: "success",
                    timestamp: "10:30:03"
                },
                {
                    title: "Payment prepared",
                    content: "Invoice queued for processing<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Workflow completed</span>",
                    status: "success",
                    timestamp: "10:30:04"
                }
            ]
        },
        scenario3: {
            title: "Subscription Service Monitoring",
            input: "Monitor medical software subscriptions",
            steps: [
                {
                    title: "Subscription renewal detected",
                    content: "Medical software subscription identified.<br>Service: EMR Platform<br>Amount: $850/month",
                    status: "success",
                    timestamp: "09:00:01"
                },
                {
                    title: "Usage validation",
                    content: "Service utilization verified.<br>Active users: 12<br>License compliance: ✔",
                    status: "success",
                    timestamp: "09:00:02"
                },
                {
                    title: "Budget check",
                    content: "Spending allocation verified.<br><strong>IT Budget remaining:</strong> $15,400",
                    status: "success",
                    timestamp: "09:00:03"
                },
                {
                    title: "Renewal approved",
                    content: "Payment authorized and scheduled.<br><span class='badge' style='background: var(--gradient-success); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; display: inline-block; margin-top: 0.5rem;'>Approved for execution</span>",
                    status: "success",
                    timestamp: "09:00:04"
                }
            ],
            result: {
                title: "Subscription Renewed",
                details: [
                    { label: "Action", value: "EMR Platform Renewal" },
                    { label: "Amount", value: "$850.00" },
                    { label: "Execution Date", value: "February 1, 2026" },
                    { label: "Method", value: "Credit Card" }
                ],
                note: "Auto-renewal active. Manual cancellation available anytime."
            }
        }
    },
    logistics: {
        scenario1: {
            title: "Carrier Payment Automation",
            input: "Pay carriers within net-15 if delivery is confirmed.",
            steps: [
                {
                    title: "Intent Identified",
                    content: "Carrier payment detected.<br><strong>Payment terms:</strong> Net-15<br><strong>Conditional logic applied</strong>",
                    status: "success",
                    timestamp: "09:00:01"
                },
                {
                    title: "Policy Validation",
                    content: "Logistics payment rules verified.<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Policies satisfied</span>",
                    status: "success",
                    timestamp: "09:00:02"
                },
                {
                    title: "Condition Verification",
                    content: "Delivery confirmation checked.<br><strong>Status:</strong> Delivered<br><strong>Proof of delivery:</strong> Verified",
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
                title: "Payment Scheduled",
                details: [
                    { label: "Action", value: "Carrier Payment" },
                    { label: "Amount", value: "$4,250.00" },
                    { label: "Execution Date", value: "January 28, 2026" },
                    { label: "Method", value: "ACH" }
                ],
                note: "Payment released only after delivery confirmation."
            }
        },
        scenario2: {
            title: "Fuel Expense Tracking",
            input: "Automated fuel expense categorization",
            steps: [
                {
                    title: "Fuel expense detected from transaction feed",
                    content: "Transaction identified and categorized.<br><strong>Category:</strong> Fleet Fuel",
                    status: "success",
                    timestamp: "10:30:01"
                },
                {
                    title: "Category: Operations Expense",
                    content: "Expenses categorized automatically.<br>AI confidence: 99%",
                    status: "success",
                    timestamp: "10:30:02"
                },
                {
                    title: "Budget allocation checked",
                    content: "Spending limits verified<br>Fleet budget: Within limits",
                    status: "success",
                    timestamp: "10:30:03"
                },
                {
                    title: "Expense logged",
                    content: "Transaction recorded and approved<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Workflow completed</span>",
                    status: "success",
                    timestamp: "10:30:04"
                }
            ]
        },
        scenario3: {
            title: "Delayed Invoice Dispute",
            input: "Simulated: Invoice dispute detected",
            steps: [
                {
                    title: "Dispute detected",
                    content: "Invoice discrepancy identified.<br>Expected: $3,200<br>Invoiced: $4,150",
                    status: "warning",
                    timestamp: "09:00:01"
                },
                {
                    title: "Payment halted",
                    content: "Transaction paused for review.<br>Dispute flag raised",
                    status: "success",
                    timestamp: "09:00:02"
                },
                {
                    title: "Review queued",
                    content: "Manual review requested<br>Vendor contacted automatically",
                    status: "success",
                    timestamp: "09:00:03"
                },
                {
                    title: "Resolution pending",
                    content: "Awaiting vendor response<br>Payment on hold until resolved",
                    status: "success",
                    timestamp: "09:00:04"
                }
            ],
            alert: {
                title: "Payment Under Review",
                message: "Invoice discrepancy detected. Payment paused until dispute is resolved. No unauthorized charges.",
                badge: "⚠ Manual review required"
            }
        }
    },
    retail: {
        scenario1: {
            title: "Vendor Payment Automation",
            input: "Pay vendors monthly after inventory reconciliation.",
            steps: [
                {
                    title: "Intent Identified",
                    content: "Vendor payment detected.<br><strong>Frequency:</strong> Monthly<br><strong>Conditional logic applied</strong>",
                    status: "success",
                    timestamp: "09:00:01"
                },
                {
                    title: "Policy Validation",
                    content: "Retail payment rules verified.<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Policies satisfied</span>",
                    status: "success",
                    timestamp: "09:00:02"
                },
                {
                    title: "Condition Verification",
                    content: "Inventory reconciliation completed.<br><strong>Match status:</strong> 98% match<br><strong>Discrepancies:</strong> Resolved",
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
                title: "Payment Scheduled",
                details: [
                    { label: "Action", value: "Vendor Payment" },
                    { label: "Amount", value: "$18,750.00" },
                    { label: "Execution Date", value: "February 1, 2026" },
                    { label: "Method", value: "ACH" }
                ],
                note: "Payment released only after inventory verification."
            }
        },
        scenario2: {
            title: "Inventory Invoice Tracking",
            input: "Automated invoice categorization",
            steps: [
                {
                    title: "Inventory invoice detected from transaction feed",
                    content: "Purchase order matched to invoice.<br><strong>Category:</strong> Inventory",
                    status: "success",
                    timestamp: "10:30:01"
                },
                {
                    title: "Category: COGS",
                    content: "Invoices categorized automatically.<br>AI confidence: 96%",
                    status: "success",
                    timestamp: "10:30:02"
                },
                {
                    title: "PO matching completed",
                    content: "Invoice matched to PO #4521<br>Quantities verified",
                    status: "success",
                    timestamp: "10:30:03"
                },
                {
                    title: "Payment queued",
                    content: "Invoice approved for payment<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Workflow completed</span>",
                    status: "success",
                    timestamp: "10:30:04"
                }
            ]
        },
        scenario3: {
            title: "Franchise Royalty Automation",
            input: "Calculate and pay franchise royalties",
            steps: [
                {
                    title: "Royalty calculation initiated",
                    content: "Monthly revenue data collected.<br><strong>Gross sales:</strong> $125,400<br><strong>Royalty rate:</strong> 6%",
                    status: "success",
                    timestamp: "09:00:01"
                },
                {
                    title: "Calculation verified",
                    content: "Royalty amount computed.<br><strong>Amount due:</strong> $7,524.00",
                    status: "success",
                    timestamp: "09:00:02"
                },
                {
                    title: "Payment authorization",
                    content: "Franchise agreement terms verified.<br>Payment terms: Net-30",
                    status: "success",
                    timestamp: "09:00:03"
                },
                {
                    title: "Payment scheduled",
                    content: "Royalty payment scheduled for February 1, 2026.<br><span class='step-status success' style='display: inline-block; margin-top: 0.5rem;'>✔ Workflow completed</span>",
                    status: "success",
                    timestamp: "09:00:04"
                }
            ],
            result: {
                title: "Royalty Payment Scheduled",
                details: [
                    { label: "Action", value: "Franchise Royalty Payment" },
                    { label: "Amount", value: "$7,524.00" },
                    { label: "Execution Date", value: "February 1, 2026" },
                    { label: "Method", value: "ACH" }
                ],
                note: "Payment released only after revenue verification."
            }
        }
    }
};

function loadScenario(scenarioType) {
    // Use industryScenarios if available, fallback to legacy scenarios
    const scenario = industryScenarios[scenarioType] || scenarios[scenarioType];
    if (!scenario) return;
    const aiInput = document.getElementById('aiInput');
    aiInput.value = scenario.input;
    aiInput.style.borderColor = 'var(--color-accent-primary)';
    setTimeout(() => {
        aiInput.style.borderColor = '';
    }, 1000);
    showScenarioResult(scenarioType);
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
    
    console.log('%c🤖 OperatorxAI Demo Loaded - script.js:925', 'font-size: 20px; color: #6366f1; font-weight: bold;');
    console.log('%cKeyboard Shortcuts: - script.js:926', 'font-size: 14px; color: #8b5cf6;');
    console.log('Ctrl/Cmd + → : Next Screen - script.js:927');
    console.log('Ctrl/Cmd + ← : Previous Screen - script.js:928');
    console.log('ESC : Return to Home - script.js:929');
    console.log('Ctrl/Cmd + Enter (in AI Input) : Execute Command - script.js:930');
});

// ===== ORGANIZATION SWITCHING =====
function switchOrganization(orgType) {
    currentOrg = orgType;
    const content = industryContent[orgType];
    
    console.log(`Switching to ${content.name}... - script.js:938`);
    
    // Update hero section
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
        heroHeadline.innerHTML = content.heroHeadline;
    }
    
    const heroSubheadline = document.querySelector('.hero-subheadline');
    if (heroSubheadline) {
        heroSubheadline.textContent = content.heroSubheadline;
    }
    
    const ctaMicro = document.querySelector('[data-dynamic="cta-micro"]');
    if (ctaMicro) {
        ctaMicro.textContent = content.ctaMicro;
    }
    
    // Update Executive Dashboard (Screen 2)
    updateDashboard(content);
    
    // Start rotating CEO-level prompts
    startPlaceholderRotation();
    
    // Update Screen 3 (What It Does)
    const screen2Header = document.querySelector('.section-title');
    if (screen2Header) {
        screen2Header.textContent = content.screen2Header;
    }
    
    const featureCards = document.querySelectorAll('.feature-card p:first-of-type');
    if (featureCards.length >= 2) {
        featureCards[0].textContent = content.card1Desc;
        featureCards[1].textContent = content.card2Desc;
    }
    
    // Update Screen 4 (Command Center)
    const commandHeader = document.querySelector('.command-header h2');
    if (commandHeader) {
        commandHeader.textContent = content.screen3Header;
    }
    
    const inputPlaceholder = document.getElementById('aiInput');
    if (inputPlaceholder) {
        inputPlaceholder.placeholder = content.inputPlaceholder;
    }
    
    // Update Quick Actions
    const quickActionsContainer = document.querySelector('.quick-actions');
    if (quickActionsContainer) {
        quickActionsContainer.innerHTML = `
            <p class="quick-label">Quick Start:</p>
            ${content.quickActions.map(action => `
                <button class="quick-btn" onclick="loadScenario('${action.scenario}')">
                    ${action.text}
                </button>
            `).join('')}
            <p style="font-size: 0.75rem; color: var(--color-text-tertiary); margin-top: 0.5rem; font-style: italic;">These are simulated enterprise workflows.</p>
        `;
    }
    
    console.log(`✓ Switched to ${content.name} organization - script.js:999`);
}

// ===== UPDATE DASHBOARD =====
function updateDashboard(content) {
    if (!content.roiMetrics) return;
    
    // Update dashboard subtitle
    const dashboardSubtitle = document.querySelector('[data-dynamic="dashboard-subtitle"]');
    if (dashboardSubtitle) {
        dashboardSubtitle.textContent = content.dashboardSubtitle;
    }
    
    // Update ROI metrics
    const roiContainer = document.querySelector('[data-dynamic-container="roi-metrics"]');
    if (roiContainer && content.roiMetrics) {
        roiContainer.innerHTML = content.roiMetrics.map((metric, index) => {
            const types = ['primary', 'success', 'warning', 'info'];
            return `
                <div class="roi-card ${types[index % 4]}">
                    <div class="roi-icon">${metric.icon}</div>
                    <div class="roi-value">${metric.value}</div>
                    <div class="roi-label">${metric.label}</div>
                    <div class="roi-detail">${metric.detail}</div>
                </div>
            `;
        }).join('');
    }
    
    // Update Before/After comparison
    const beforeAfterContainer = document.querySelector('[data-dynamic-container="before-after"]');
    if (beforeAfterContainer && content.beforeAfter) {
        beforeAfterContainer.innerHTML = `
            <div class="comparison-card before">
                <div class="comparison-badge before">Before</div>
                <h4>Manual Operations</h4>
                <ul class="comparison-list">
                    ${content.beforeAfter.before.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <div class="cost-indicator before">
                    <span class="cost-label">Monthly Cost:</span>
                    <span class="cost-value">${content.beforeAfter.beforeCost}</span>
                </div>
            </div>
            
            <div class="transformation-arrow">
                <div class="arrow-icon">→</div>
                <div class="arrow-label">With Operatorx-AI</div>
            </div>
            
            <div class="comparison-card after">
                <div class="comparison-badge after">After</div>
                <h4>AI-Powered Operations</h4>
                <ul class="comparison-list">
                    ${content.beforeAfter.after.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <div class="cost-indicator after">
                    <span class="cost-label">Monthly Cost:</span>
                    <span class="cost-value">${content.beforeAfter.afterCost}</span>
                </div>
            </div>
        `;
    }
    
    // Update Business Outcomes
    const outcomesContainer = document.querySelector('[data-dynamic-container="business-outcomes"]');
    if (outcomesContainer && content.businessOutcomes) {
        outcomesContainer.innerHTML = content.businessOutcomes.map(outcome => `
            <div class="outcome-card">
                <div class="outcome-icon">${outcome.icon}</div>
                <h4>${outcome.title}</h4>
                <p>${outcome.description}</p>
                <span class="outcome-badge">${outcome.badge}</span>
            </div>
        `).join('');
    }
}

// Updated loadScenario to handle industry-specific scenarios
function loadIndustryScenario(scenarioKey) {
    const scenario = industryScenarios[currentOrg]?.[scenarioKey];
    if (!scenario) {
        console.error(`Scenario ${scenarioKey} not found for ${currentOrg} - script.js:1081`);
        return;
    }
    
    const aiInput = document.getElementById('aiInput');
    aiInput.value = scenario.input;
    
    // Highlight the input field briefly
    aiInput.style.borderColor = 'var(--color-accent-primary)';
    setTimeout(() => {
        aiInput.style.borderColor = '';
    }, 1000);
}

// Initialize organization selector
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded  Initializing organization selector... - script.js:1097');
    
    // Small delay to ensure all DOM elements are fully rendered
    setTimeout(() => {
        const orgSelector = document.getElementById('orgSelector');
        if (orgSelector) {
            orgSelector.addEventListener('change', function() {
                console.log('Organization changed to: - script.js:1104', this.value);
                switchOrganization(this.value);
            });
            
            // Initialize with default organization
            console.log('Initializing default organization: property - script.js:1109');
            switchOrganization('property');
        } else {
            console.error('Organization selector not found! - script.js:1112');
        }
    }, 100);
});

// Update loadScenario to route to industry scenarios
const originalLoadScenario = loadScenario;
loadScenario = function(scenarioKey) {
    // Check if it's an industry scenario key (scenario1, scenario2, scenario3)
    if (scenarioKey.startsWith('scenario')) {
        loadIndustryScenario(scenarioKey);
    } else {
        // Fall back to original scenarios for backwards compatibility
        originalLoadScenario(scenarioKey);
    }
};

// Update executeAI to use industry scenarios
const originalExecuteAI = executeAI;
executeAI = async function() {
    if (isExecuting) return;
    
    const inputValue = document.getElementById('aiInput').value.trim();
    
    if (!inputValue) {
        alert('Please enter a command or select an example.');
        return;
    }
    
    // Determine which industry scenario to use
    let scenarioKey = 'scenario1'; // default
    const orgScenarios = industryScenarios[currentOrg];
    
    // Try to match input to scenarios
    for (const [key, scenario] of Object.entries(orgScenarios)) {
        if (inputValue.toLowerCase().includes(scenario.input.toLowerCase().substring(0, 20))) {
            scenarioKey = key;
            break;
        }
    }
    
    const scenario = orgScenarios[scenarioKey];
    if (!scenario) {
        console.error('No scenario found - script.js:1155');
        return;
    }
    
    isExecuting = true;
    
    // Always stay on Command Center (screen 4)
    navigateToScreen(4);

    // Clear timeline in Command Center center panel
    const timeline = document.getElementById('timeline');
    if (timeline) {
        timeline.innerHTML = '';
    }

    // Update system status to show execution in progress (right panel)
    const statusMetrics = document.getElementById('statusMetrics');
    if (statusMetrics) {
        statusMetrics.innerHTML = `
            <div class="metric">
                <div class="metric-label">Status</div>
                <div class="metric-value" style="color: var(--color-accent-warning);">EXECUTING</div>
            </div>
            <div class="metric">
                <div class="metric-label">Operation</div>
                <div class="metric-value" style="font-size: 0.875rem;">${scenario.title}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Steps Complete</div>
                <div class="metric-value" id="stepsComplete">0/${scenario.steps.length}</div>
            </div>
        `;
    }

    // Wait a moment before starting execution
    await sleep(500);

    // Add steps progressively to center panel timeline
    for (let i = 0; i < scenario.steps.length; i++) {
        await sleep(800);
        if (timeline) {
            const step = scenario.steps[i];
            const stepEl = document.createElement('div');
            stepEl.className = 'timeline-step';
            stepEl.style.animationDelay = `${i * 0.1}s`;
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
        // Update progress counter in right panel
        const stepsCounter = document.getElementById('stepsComplete');
        if (stepsCounter) {
            stepsCounter.textContent = `${i + 1}/${scenario.steps.length}`;
        }
    }

    // Show result or alert in center panel after steps
    await sleep(1000);
    if (timeline) {
        if (scenario.alert) {
            timeline.innerHTML += `
                <div class="result-card mt-xl">
                    <div class="result-header">
                        <div class="result-icon">⚠️</div>
                        <div class="result-title" style="color: var(--color-accent-danger);">${scenario.alert.title}</div>
                    </div>
                    <div class="step-content">${scenario.alert.message}</div>
                    <div class="safety-badge">🛡️ ${scenario.alert.badge}</div>
                </div>
            `;
        } else if (scenario.result) {
            timeline.innerHTML += `
                <div class="result-card mt-xl">
                    <div class="result-header">
                        <div class="result-icon">✅</div>
                        <div class="result-title" style="color: var(--color-accent-success);">${scenario.result.title}</div>
                    </div>
                    <div class="result-details">
                        ${scenario.result.details ? scenario.result.details.map(detail => `
                            <div class="result-detail">
                                <div class="detail-label">${detail.label}</div>
                                <div class="detail-value">${detail.value}</div>
                            </div>
                        `).join('') : ''}
                    </div>
                    <div class="side-note">${scenario.result.note || ''}</div>
                </div>
            `;
        }
    }

    // Also update right panel with result/alert
    if (scenario.alert) {
        showAlertInCommandCenter(scenario.alert);
    } else if (scenario.result) {
        showResultInCommandCenter(scenario.result);
    }

    isExecuting = false;

    // Log to audit trail
    auditLog.unshift({
        timestamp: formatTimestamp(),
        action: scenario.title,
        decision: scenario.alert ? "Paused" : "Approved",
        policy: industryContent[currentOrg].name + " Rules",
        result: scenario.alert ? "Halted" : "Success"
    });
};

// New function to show alerts in Command Center right panel
function showAlertInCommandCenter(alert) {
    const statusMetrics = document.getElementById('statusMetrics');
    if (statusMetrics) {
        statusMetrics.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-lg); padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.5rem;">⚠️</span>
                    <h4 style="margin: 0; color: var(--color-accent-danger);">${alert.title}</h4>
                </div>
                <p style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 0.9375rem;">${alert.message}</p>
                <div class="badge" style="background: rgba(239, 68, 68, 0.2); color: var(--color-accent-danger); padding: 0.5rem 1rem; border-radius: var(--radius-md); display: inline-block;">
                    ${alert.badge}
                </div>
                <button class="btn-secondary" style="width: 100%; margin-top: 1rem;" onclick="resetCommandCenter()">
                    Reset & Try Again
                </button>
            </div>
        `;
    }
}

// New function to show results in Command Center right panel
function showResultInCommandCenter(result) {
    const statusMetrics = document.getElementById('statusMetrics');
    if (statusMetrics) {
        statusMetrics.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-lg); padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.5rem;">✅</span>
                    <h4 style="margin: 0; color: var(--color-accent-success);">${result.title}</h4>
                </div>
                ${result.details.map(detail => `
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border);">
                        <span style="color: var(--color-text-tertiary); font-size: 0.875rem;">${detail.label}</span>
                        <span style="color: var(--color-text-primary); font-weight: var(--font-weight-medium); font-size: 0.875rem;">${detail.value}</span>
                    </div>
                `).join('')}
                <p style="color: var(--color-text-tertiary); font-size: 0.75rem; margin-top: 1rem; font-style: italic;">${result.note}</p>
                <button class="btn-secondary" style="width: 100%; margin-top: 1rem;" onclick="resetCommandCenter()">
                    Execute Another Operation
                </button>
            </div>
        `;
    }
}

// New function to reset Command Center after execution
function resetCommandCenter() {
    const timeline = document.getElementById('timeline');
    if (timeline) {
        timeline.innerHTML = '<div class="timeline-empty"><p>Select a command to begin AI execution</p></div>';
    }
    const statusMetrics = document.getElementById('statusMetrics');
    if (statusMetrics) {
        statusMetrics.innerHTML = `
            <div class="metric">
                <div class="metric-label">Active Policies</div>
                <div class="metric-value">12</div>
            </div>
            <div class="metric">
                <div class="metric-label">Risk Level</div>
                <div class="metric-value metric-success">LOW</div>
            </div>
            <div class="metric">
                <div class="metric-label">Auth Status</div>
                <div class="metric-value metric-success">VERIFIED</div>
            </div>
            <div class="metric">
                <div class="metric-label">Operations Today</div>
                <div class="metric-value">8</div>
            </div>
        `;
    }
    
    // Clear the input
    const aiInput = document.getElementById('aiInput');
    if (aiInput) {
        aiInput.value = '';
    }
}

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

// ===== HERO DEMO PLAYER =====
const heroDemoContent = {
    prevent: {
        title: "Prevent $45K Duplicate Payment",
        icon: "🛡️",
        steps: [
            { icon: "📥", text: "New vendor invoice received: $45,000" },
            { icon: "🔍", text: "AI scanning payment history..." },
            { icon: "⚠️", text: "ALERT: Duplicate payment detected!" },
            { icon: "🛑", text: "Payment automatically blocked" }
        ],
        result: {
            title: "Crisis Prevented",
            savings: "$45,000",
            message: "AI detected this invoice was already paid under a different reference number"
        },
        frequency: "12,450",
        period: "month"
    },
    automate: {
        title: "Auto-Collect Rent from 47 Units",
        icon: "⚡",
        steps: [
            { icon: "📋", text: "47 rent payments due today" },
            { icon: "🤖", text: "AI initiating auto-collection..." },
            { icon: "💳", text: "Processing payments automatically" },
            { icon: "✅", text: "46/47 collected successfully" }
        ],
        result: {
            title: "Collection Complete",
            savings: "98%",
            message: "1 declined payment flagged for follow-up"
        },
        frequency: "8,200",
        period: "month"
    },
    detect: {
        title: "Catch $12K Vendor Overcharge",
        icon: "🔍",
        steps: [
            { icon: "📄", text: "Vendor invoice: $24,500" },
            { icon: "📊", text: "AI cross-checking contract terms..." },
            { icon: "⚠️", text: "ALERT: Price exceeds contract by $12,300" },
            { icon: "🛑", text: "Payment paused for review" }
        ],
        result: {
            title: "Overcharge Detected",
            savings: "$12,300",
            message: "Invoice pricing doesn't match contract terms"
        },
        frequency: "3,800",
        period: "month"
    }
};

async function playHeroDemo(demoType) {
    const demo = heroDemoContent[demoType];
    if (!demo) return;
    
    // Show the demo player
    const demoPlayer = document.getElementById('heroDemoPlayer');
    demoPlayer.classList.remove('hide-element');
    demoPlayer.style.display = 'block';
    demoPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Update title
    document.querySelector('.demo-player-header h4').textContent = demo.title;
    
    // Get containers
    const timeline = document.getElementById('heroTimeline');
    const result = document.getElementById('heroResult');
    const impactBanner = document.getElementById('heroImpactBanner');
    // Clear previous content
    timeline.innerHTML = '';
    result.innerHTML = '';
    result.classList.add('hide-element');
    impactBanner.classList.add('hide-element');
    impactBanner.style.display = 'none';
    
    // Auto-play the demo (8 seconds total, 2 seconds per step)
    for (let i = 0; i < demo.steps.length; i++) {
        const step = demo.steps[i];
        const stepEl = document.createElement('div');
        stepEl.className = 'timeline-step active';
        stepEl.innerHTML = `
            <span class="step-icon">${step.icon}</span>
            <span class="step-text">${step.text}</span>
        `;
        timeline.appendChild(stepEl);
        
        // Wait 2 seconds between steps
        await sleep(2000);
    }
    
    // Show result after timeline completes
    await sleep(500);
    result.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="font-size: 2rem;">${demo.icon}</span>
            <div>
                <h4 style="margin: 0; color: var(--color-accent-success);">${demo.result.title}</h4>
                <p style="margin: 0; color: var(--color-text-tertiary); font-size: 0.875rem;">${demo.result.message}</p>
            </div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.15); padding: 1rem; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-accent-success);">${demo.result.savings}</div>
            <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">Saved</div>
        </div>
    `;
    result.classList.remove('hide-element');
    await sleep(500);
    impactBanner.style.display = 'flex';
    impactBanner.classList.remove('hide-element');
    impactBanner.innerHTML = `
        <div class="impact-text">
            <div class="impact-label">Automatically Handled</div>
            <div class="impact-value">${demo.frequency} times/${demo.period}</div>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button class="btn-primary" onclick="navigateToScreen(4)">
                Try It Yourself →
            </button>
            <button class="btn-secondary" onclick="navigateToScreen(2)">
                See Business Impact
            </button>
        </div>
    `;
}

function closeHeroDemo() {
    const demoPlayer = document.getElementById('heroDemoPlayer');
    demoPlayer.classList.add('hide-element');
    demoPlayer.style.display = 'none';
}

// ===== CEO-LEVEL PLACEHOLDER ROTATION =====
function startPlaceholderRotation() {
    // Clear any existing interval
    if (placeholderRotationInterval) {
        clearInterval(placeholderRotationInterval);
    }
    
    const aiInput = document.getElementById('aiInput');
    if (!aiInput) return;
    
    const prompts = ceoLevelPrompts[currentOrg];
    let currentIndex = 0;
    
    // Set initial placeholder
    aiInput.placeholder = prompts[currentIndex];
    
    // Rotate every 4 seconds
    placeholderRotationInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % prompts.length;
        aiInput.placeholder = prompts[currentIndex];
    }, 4000);
}

// Stop rotation when user starts typing
document.addEventListener('DOMContentLoaded', () => {
    const aiInput = document.getElementById('aiInput');
    if (aiInput) {
        aiInput.addEventListener('focus', () => {
            if (placeholderRotationInterval) {
                clearInterval(placeholderRotationInterval);
                placeholderRotationInterval = null;
            }
        });
        
        aiInput.addEventListener('blur', () => {
            if (!aiInput.value.trim()) {
                startPlaceholderRotation();
            }
        });
    }
    
    // Start rotation on page load
    startPlaceholderRotation();
});


// Ensure demo functions are available globally for HTML event handlers
window.playHeroDemo = playHeroDemo;
window.closeHeroDemo = closeHeroDemo;
