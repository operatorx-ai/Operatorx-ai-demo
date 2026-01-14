# Operatorx-AI Live Demo

A professional, interactive demo for showing Operatorx-AI to potential clients.

## 🚀 How to Run the Demo

### Option 1: Open Directly
1. Navigate to the demo folder
2. Double-click `index.html` to open in your browser
3. Select a business type and watch the automation unfold

### Option 2: Use Live Server (Recommended for presentations)
1. Open the folder in VS Code
2. Install "Live Server" extension if you don't have it
3. Right-click `index.html` and select "Open with Live Server"
4. Present from `http://localhost:5500`

## 📋 Demo Script

Follow these steps during your live presentation:

### 1. Opening (10 seconds)
**Say exactly:** "Let me show you what this looks like when it's already working for your business."

### 2. Select Business Type
- Choose the client's industry from the 4 options
- The demo runs automatically

### 3. While Scrolling (Read out loud)
- "These are the problems most owners deal with every week."
- "This runs in the background automatically."
- "No new staff. No extra apps to manage."
- "This is time you get back every single week."

### 4. Close (15 seconds)
**Ask:** "If this was running in your business, would it make your life easier or harder?"

### 5. After Demo - Use ONE of these lines:
- "This runs every day whether you're here or not."
- "This replaces hours of admin work each week."
- "This is why owners pay for Operatorx-AI."

## 🎯 Available Demos

1. **General Service Business** - Default for any service-based business
2. **Salon / Beauty / Nails** - Appointment-based businesses
3. **Contractor / HVAC** - Home service contractors
4. **Retail / Store** - Physical retail locations

## 💡 Tips for Best Results

- **Keep it simple** - Don't explain technology, focus on results
- **Let it breathe** - Give them time to read the examples
- **Watch their reaction** - The "time saved" section usually gets the biggest response
- **Ask the close question** - "Would this make your life easier or harder?"
- **Be quiet after asking** - Let them answer first

## 🎨 Customization

To add more industry-specific demos, edit the `demoData` object in `script.js`:

```javascript
newIndustry: {
    businessType: "Your Industry Name",
    problems: [...],
    automations: [...],
    liveExample: {...}
}
```

## 📱 Works On

- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Tablets (iPad, Android tablets)
- ✅ Mobile phones (responsive design)
- ✅ Presentation mode (fullscreen compatible)

## 🔧 Troubleshooting

**Demo won't load?**
- Check that all 3 files are in the same folder: `index.html`, `styles.css`, `script.js`

**Animation issues?**
- Clear browser cache and reload
- Try a different browser

**Text too small during presentation?**
- Use browser zoom (Ctrl/Cmd + Plus)
- Or press F11 for fullscreen mode

## 📞 Support

For issues or customization requests, contact the Operatorx-AI team.

---

**Remember:** This demo closes deals. Keep it simple, let it run, and ask the impact question.
