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
        executiveSummary: "Reduce no-shows by 95%. Increase rebooking rate by 40%. Save $24,000/year vs hiring front desk staff.",
        problems: [
            "🚫 No-shows cost you $8,000-$15,000 annually in lost revenue",
            "💳 Manual end-of-day reconciliation takes 45 minutes daily",
            "🔄 Only 30% of clients rebook - leaving 70% of potential revenue on the table",
            "📦 Inventory shrinkage and stockouts cost 10-15% of product revenue",
            "📊 Commission errors damage stylist morale and retention"
        ],
        automations: [
            "✅ 95% show-up rate with automated 24-hour reminders (vs 75% industry average)",
            "💰 Daily revenue summaries delivered to your phone by 8 PM",
            "💬 40% rebooking rate with automated follow-ups (vs 30% without)",
            "🚨 Zero stockouts with real-time inventory alerts",
            "🎯 100% accurate commission reports delivered weekly"
        ],
        liveExample: {
            title: "No-Show Prevention = Direct Revenue Protection",
            steps: [
                { time: "Tuesday 10:00 AM", action: "Sarah books haircut for Wednesday 10:00 AM", detail: "Service value: $85 + $20 tip = $105 revenue at stake" },
                { time: "Tuesday 10:02 AM", action: "AI sends instant confirmation", detail: "'Thanks Sarah! Excited to see you tomorrow ✨'" },
                { time: "Wednesday 9:00 AM", action: "24-hour reminder automatically sent", detail: "'Hi Sarah! Reminder: Your appointment is in 1 hour'" },
                { time: "Wednesday 10:00 AM", action: "Sarah arrives on time", detail: "🎯 $105 revenue secured • Chair utilization: 100%" }
            ],
            timePerWeek: "5 hours",
            timePerMonth: "20 hours",
            value: "ROI: Prevent 3-5 no-shows weekly = $1,200-$2,000 recovered monthly. That's $14,400-$24,000 annually. Cost of OperatorX-AI? Less than 10% of what you recover."
        }
    },
    contractor: {
        businessType: "Contractor / Home Services",
        executiveSummary: "Improve cash flow by 35%. Get paid 18 days faster on average. Replace $50K/year office manager cost.",
        problems: [
            "💵 $50K-$150K tied up in unpaid invoices at any given time",
            "❌ 30% of jobs are less profitable than you think (hidden costs)",
            "🧑‍💻 Manual data entry costs 10-12 hours/week in lost productive time",
            "📉 60% of estimates go cold - that's potential revenue walking away",
            "🛠️ Crew scheduling chaos costs 2-3 billable hours daily"
        ],
        automations: [
            "💸 Get paid in 18 days (vs 35-day industry average) with automated follow-ups",
            "📊 Real-time job costing shows profitability before final invoice",
            "✅ Zero data entry - receipts processed automatically via photo/email",
            "💬 40% estimate conversion rate (vs 25% without follow-up)",
            "📅 100% crew accountability with automated daily confirmations"
        ],
        liveExample: {
            title: "Cash Flow Acceleration = Business Growth Fuel",
            steps: [
                { time: "Monday", action: "Invoice #2891 is 7 days overdue", detail: "$3,450 from Martinez HVAC install • Your cash is tied up" },
                { time: "Monday 8:00 AM", action: "AI sends polite but firm reminder", detail: "'Quick check-in on payment for your recent install...'" },
                { time: "Thursday", action: "No response - AI escalates strategically", detail: "'This is OperatorX-AI for ABC Contractors, following up...'" },
                { time: "Friday 2:00 PM", action: "Payment received and reconciled", detail: "✅ $3,450 in bank • Books updated • Cash flow improved" }
            ],
            timePerWeek: "12 hours",
            timePerMonth: "48 hours",
            value: "ROI: 35% cash flow improvement means you can take more jobs without credit lines. Save $50K/year vs hiring. Get paid 18 days faster = $30K-$80K freed up for business growth."
        }
    },
    retail: {
        businessType: "Retail Store",
        executiveSummary: "Eliminate $12K-$18K annual stockout losses. Reduce dead inventory by 40%. Save 24 hours monthly.",
        problems: [
            "📦 Stockouts cost $12K-$18K yearly in missed sales opportunities",
            "💵 End-of-day reconciliation takes 45-60 minutes daily",
            "💸 Late payment fees to suppliers cost $200-$500 monthly",
            "📉 Dead inventory ties up $8K-$15K in unsold products",
            "🚪 65% of customers never return after first purchase"
        ],
        automations: [
            "Inventory alerts when stock drops below minimum levels",
            "Daily sales summaries with profit margins calculated",
            "Automatic payment reminders for supplier invoices",
            "Monthly product profitability reports (top sellers vs. dead stock)",
            "Re-engagement texts sent to customers after 60 days"
        ],
        liveExample: {
            title: "Inventory Intelligence = Revenue Protection",
            steps: [
                { time: "Tuesday 3:00 PM", action: "Best-selling sneakers hit critical level", detail: "Nike Air Max: 3 pairs left • Sells 8/week • Stockout risk in 48 hours" },
                { time: "Tuesday 3:05 PM", action: "AI sends instant mobile alert", detail: "'🚨 URGENT: Nike Air Max low stock - 3 left, need 20'" },
                { time: "Tuesday 3:15 PM", action: "AI drafts supplier order for approval", detail: "'Ready to order 20 pairs from Nike ($1,200) - Approve?'" },
                { time: "Tuesday 3:20 PM", action: "One-tap approval, order placed", detail: "✅ Stockout prevented • $2,400 in sales protected this week" }
            ],
            timePerWeek: "6 hours",
            timePerMonth: "24 hours",
            value: "ROI: Prevent $12K-$18K annual stockout losses. Reduce dead inventory 40% (free up $8K). Automate tasks = eliminate need for part-time inventory manager ($18K/year saved)."
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
    
    // Trigger confetti
    createConfetti();
    
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

function createConfetti() {
    conAdd progress bar
    html += '<div class="progress-bar-container"><div class="progress-bar"></div></div>';
    
    // Section 1: Problems
    html += '<div class="section-header">⚠️ What\'s Costing You Time Every Week</div>';
    html += '<ul class="problem-list">';
    currentDemo.problems.forEach((problem, index) => {
        html += `<li class="problem-item" style="animation-delay: ${index * 0.1}sElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDela(automation, index) => {
        html += `<li class="automation-item" style="animation-delay: ${index * 0.15}s(Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), 3000);
    }
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
    
    // Trigger confetti at savings reveal
    setTimeout(() => {
        createConfetti();
    }, 2000);
    
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
