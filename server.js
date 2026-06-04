const express = require('express');
const path = require('path');
const escapeHtml = require('escape-html');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * XSS Mitigation Demo API Endpoint
 * Accepts input query, escapes HTML entities, and returns both original and sanitized strings.
 */
app.get('/api/sanitize', (req, res) => {
    const rawInput = req.query.name || '';
    const escapedHtml = escapeHtml(rawInput);
    
    res.json({
        rawInput,
        escapedHtml
    });
});

/**
 * Input Validation / Injection Prevention Demo API Endpoint
 * Validates IP addresses structurally using regex patterns to ensure safety.
 */
app.get('/api/validate-ip', (req, res) => {
    const ip = req.query.ip || '';
    
    // Strict IPv4 validation regex
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    
    const isValid = ipv4Regex.test(ip);
    
    res.json({
        ip,
        valid: isValid,
        pattern: ipv4Regex.toString()
    });
});

// Serve the index.html on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Secure Coding Dashboard running at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});
