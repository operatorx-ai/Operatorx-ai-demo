// Demo data for different business types
const demoData = {
    default: {
        businessType: "Local Service Business",
        problems: [
            "Chasing unpaid invoices and following up on late payments",
            "Manually tracking expenses across multiple vendors and suppliers",
            "Scheduling appointments and sending reminder messages",
            "Creating weekly reports to know if you're actually making money",
            "Following up with customers who haven't returned in a while"
        ],
        automations: [
            "Invoice follow-ups sent automatically 3 days after due date",
            "All expenses tracked and categorized in real-time",
            "Appointment reminders sent 24 hours before scheduled time",
            "Daily profit/loss summaries delivered to your phone",
            "Re-engagement messages sent to inactive customers automatically"
        ],
        liveExample: {
            title: "Invoice Follow-Up Automation",
            steps: [
                { time: "Monday 9:00 AM", action: "Invoice #1847 becomes 3 days overdue", detail: "$850 from Johnson Plumbing" },
                { time: "Monday 9:02 AM", action: "AI sends polite payment reminder via email and text", detail: "\"Hi Mike, just a friendly reminder about invoice #1847...\"" },
                { time: "Monday 11:30 AM", action: "Customer responds and pays immediately", detail: "$850 received via ACH transfer" },
                { time: "Monday 11:31 AM", action: "AI updates your books and sends you confirmation", detail: "\"Johnson Plumbing payment received and recorded\"" }
            ],
            timePerWeek: "8 hours",
            timePerMonth: "32 hours",
            value: "This is like having an office manager who never sleeps, never forgets, and costs less than $10/day."
        }
    },
    salon: {
        businessType: "Beauty Salon / Spa",
        problems: [
            "Clients booking appointments and not showing up",
            "Manually counting cash and credit card receipts at end of day",
            "Forgetting to follow up with clients for their next appointment",
            "Tracking which products are running low on inventory",
            "Managing multiple stylists' schedules and commissions"
        ],
        automations: [
            "Appointment reminders sent 24 hours before (95% show-up rate)",
            "Daily income summaries calculated and sent to your phone",
            "Rebooking messages sent automatically 3 weeks after service",
            "Low inventory alerts when products need reordering",
            "Weekly commission reports generated for each stylist"
        ],
        liveExample: {
            title: "No-Show Prevention Automation",
            steps: [
                { time: "Tuesday 10:00 AM", action: "Sarah books a haircut for Wednesday at 10:00 AM", detail: "Service value: $85 + $20 tip expected" },
                { time: "Tuesday 10:02 AM", action: "Confirmation text sent immediately", detail: "\"Thanks Sarah! See you tomorrow at 10am ✨\"" },
                { time: "Wednesday 9:00 AM", action: "24-hour reminder sent automatically", detail: "\"Hi Sarah! Reminder: Your appointment is today at 10am\"" },
                { time: "Wednesday 10:00 AM", action: "Sarah arrives on time (no-show avoided)", detail: "$105 revenue secured" }
            ],
            timePerWeek: "5 hours",
            timePerMonth: "20 hours",
            value: "You prevent 3-5 no-shows per week, which means an extra $1,200-$2,000 in monthly revenue that you used to lose."
        }
    },
    contractor: {
        businessType: "Contractor / Home Services",
        problems: [
            "Customers take 30-60 days to pay invoices",
            "Losing track of which jobs are profitable vs. losing money",
            "Manually entering vendor bills and receipts into QuickBooks",
            "Following up on job estimates that never got approved",
            "Scheduling crews and tracking who's working where"
        ],
        automations: [
            "Payment reminders sent automatically on invoice due dates",
            "Real-time job profitability tracking for every project",
            "Vendor bills automatically logged and categorized",
            "Follow-up texts sent to prospects who haven't responded",
            "Daily crew schedule confirmations sent each morning"
        ],
        liveExample: {
            title: "Late Payment Recovery Automation",
            steps: [
                { time: "Monday", action: "Invoice #2891 is 7 days overdue", detail: "$3,450 from Martinez HVAC install" },
                { time: "Monday 8:00 AM", action: "First reminder email sent politely", detail: "\"Just checking in on payment for your recent install...\"" },
                { time: "Thursday", action: "No response - AI escalates with phone call script", detail: "\"This is OperatorX-AI for ABC Contractors...\"" },
                { time: "Friday 2:00 PM", action: "Payment received and recorded automatically", detail: "$3,450 deposited - books updated instantly" }
            ],
            timePerWeek: "12 hours",
            timePerMonth: "48 hours",
            value: "Your cash flow improves by 30-40% because you get paid faster without hiring an office person for $3,500/month."
        }
    },
    retail: {
        businessType: "Retail Store",
        problems: [
            "Running out of popular items without realizing it",
            "Manually counting cash drawer and reconciling at end of day",
            "Forgetting to pay suppliers on time (late fees add up)",
            "Not knowing which products make money vs. lose money",
            "Losing customers who bought once and never came back"
        ],
        automations: [
            "Inventory alerts when stock drops below minimum levels",
            "Daily sales summaries with profit margins calculated",
            "Automatic payment reminders for supplier invoices",
            "Monthly product profitability reports (top sellers vs. dead stock)",
            "Re-engagement texts sent to customers after 60 days"
        ],
        liveExample: {
            title: "Inventory Shortage Prevention",
            steps: [
                { time: "Tuesday 3:00 PM", action: "Best-selling sneakers drop to 3 pairs remaining", detail: "Item: Nike Air Max (sells 8 pairs/week)" },
                { time: "Tuesday 3:05 PM", action: "AI sends alert to your phone", detail: "\"🚨 Low stock: Nike Air Max - Only 3 left\"" },
                { time: "Tuesday 3:15 PM", action: "AI drafts reorder message to supplier", detail: "\"Ready to order 20 more pairs - approve?\"" },
                { time: "Tuesday 3:20 PM", action: "You approve, order placed automatically", detail: "Stockout prevented - no lost sales this week" }
            ],
            timePerWeek: "6 hours",
            timePerMonth: "24 hours",
            value: "You prevent stockouts that cost you $800-$1,500 in lost sales every month, and you never spend weekend evenings doing inventory."
        }
    }
};

let currentDemo = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const resetBtn = document.getElementById('resetBtn');

    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const demoType = this.getAttribute('data-type');
            startDemo(demoType);
        });
    });

    resetBtn.addEventListener('click', function() {
        resetDemo();
    });
});

function startDemo(type) {
    currentDemo = demoData[type];
    
    // Hide selector, show demo container
    document.querySelector('.demo-selector').style.display = 'none';
    document.getElementById('demoContainer').style.display = 'block';
    document.getElementById('footerActions').style.display = 'block';
    
    // Show typing indicator
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'flex';
    
    // Start animation sequence
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        animateDemo();
    }, 2000);
}

function animateDemo() {
    const outputSection = document.getElementById('outputSection');
    let html = '';
    
    // Section 1: Problems
    html += '<div class="section-header">⚠️ What\'s Costing You Time Every Week</div>';
    html += '<ul class="problem-list">';
    currentDemo.problems.forEach(problem => {
        html += `<li class="problem-item">${problem}</li>`;
    });
    html += '</ul>';
    
    // Section 2: Automations
    html += '<div class="section-header">✨ What\'s Now Automated For You</div>';
    html += '<ul class="automation-list">';
    currentDemo.automations.forEach(automation => {
        html += `<li class="automation-item">${automation}</li>`;
    });
    html += '</ul>';
    
    // Section 3: Live Example
    html += '<div class="section-header">🎬 Live Automation Example</div>';
    html += `<div class="live-example">`;
    html += `<h3 style="color: #667eea; margin-bottom: 20px;">${currentDemo.liveExample.title}</h3>`;
    currentDemo.liveExample.steps.forEach(step => {
        html += `
            <div class="example-step">
                <div class="step-time">${step.time}</div>
                <div style="font-weight: 600; margin: 8px 0;">${step.action}</div>
                <div style="color: #666; font-size: 0.95em;">${step.detail}</div>
            </div>
        `;
    });
    html += '</div>';
    
    // Section 4: Time Saved
    html += '<div class="section-header">⏰ Time & Money Saved</div>';
    html += `
        <div class="savings-box">
            <div class="savings-label">Time Saved Per Week</div>
            <div class="savings-stat">${currentDemo.liveExample.timePerWeek}</div>
            <div class="savings-label">Time Saved Per Month</div>
            <div class="savings-stat">${currentDemo.liveExample.timePerMonth}</div>
        </div>
    `;
    
    // Section 5: Value Statement
    html += `<div class="value-statement">💡 ${currentDemo.liveExample.value}</div>`;
    
    outputSection.innerHTML = html;
    
    // Animate sections appearing
    const sections = outputSection.querySelectorAll('.section-header, .problem-list, .automation-list, .live-example, .savings-box, .value-statement');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

function resetDemo() {
    document.querySelector('.demo-selector').style.display = 'block';
    document.getElementById('demoContainer').style.display = 'none';
    document.getElementById('footerActions').style.display = 'none';
    document.getElementById('outputSection').innerHTML = '';
    currentDemo = null;
}
