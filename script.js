// DOM Elements
const firstNumberInput = document.getElementById('firstNumber');
const secondNumberInput = document.getElementById('secondNumber');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const resultDiv = document.getElementById('result');
const explanationDiv = document.getElementById('explanation');

/**
 * Calculate percent difference between two numbers
 * @param {number} first - The original number
 * @param {number} second - The new number to compare
 * @returns {number} The percentage difference
 */
function calculatePercentDifference(first, second) {
    if (first === 0) {
        throw new Error('First number cannot be zero (division by zero)');
    }
    return ((second - first) / first) * 100;
}

/**
 * Format the result with appropriate styling
 * @param {number} result - The calculated percentage
 * @returns {string} HTML string for the result display
 */
function formatResult(result) {
    const absoluteValue = Math.abs(result);
    const isPositive = result > 0;
    const isNegative = result < 0;
    
    let className = 'neutral';
    let changeType = 'no change';
    
    if (isPositive) {
        className = 'positive';
        changeType = 'increase';
    } else if (isNegative) {
        className = 'negative';
        changeType = 'decrease';
    }
    
    return `
        <h3>Calculation Result:</h3>
        <div class="result-value ${className}">
            ${isPositive ? '+' : ''}${result.toFixed(2)}%
        </div>
        <p>The second number represents a <strong>${absoluteValue.toFixed(2)}% ${changeType}</strong> from the first number.</p>
    `;
}

/**
 * Generate explanation text based on the calculation
 * @param {number} first - First number
 * @param {number} second - Second number
 * @param {number} result - Percentage result
 */
function generateExplanation(first, second, result) {
    const difference = second - first;
    const absoluteDifference = Math.abs(difference);
    
    let explanation = `
        <strong>Calculation Breakdown:</strong><br>
        • Difference: ${second} - ${first} = ${difference.toFixed(2)}<br>
        • Relative Change: (${difference.toFixed(2)} / ${Math.abs(first)}) × 100<br>
        • Result: ${result.toFixed(2)}%<br><br>
    `;
    
    if (result > 0) {
        explanation += `The second number is <strong>${result.toFixed(2)}% larger</strong> than the first number.`;
    } else if (result < 0) {
        explanation += `The second number is <strong>${Math.abs(result).toFixed(2)}% smaller</strong> than the first number.`;
    } else {
        explanation += `Both numbers are equal - no percentage difference.`;
    }
    
    return explanation;
}

/**
 * Handle the calculate button click
 */
function handleCalculate() {
    try {
        // Get and validate input values
        const first = parseFloat(firstNumberInput.value);
        const second = parseFloat(secondNumberInput.value);
        
        if (isNaN(first) || isNaN(second)) {
            throw new Error('Please enter valid numbers in both fields');
        }
        
        // Calculate percentage difference
        const result = calculatePercentDifference(first, second);
        
        // Display results
        resultDiv.innerHTML = formatResult(result);
        explanationDiv.innerHTML = generateExplanation(first, second, result);
        
    } catch (error) {
        resultDiv.innerHTML = `
            <h3 style="color: #dc3545;">Error</h3>
            <p>${error.message}</p>
        `;
        explanationDiv.innerHTML = '';
    }
}

/**
 * Handle the clear button click
 */
function handleClear() {
    firstNumberInput.value = '';
    secondNumberInput.value = '';
    resultDiv.innerHTML = '<p>Enter numbers above to see the percentage difference</p>';
    explanationDiv.innerHTML = '';
    firstNumberInput.focus();
}

/**
 * Handle Enter key press in input fields
 */
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleCalculate();
    }
}

// Event Listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Add Enter key support
firstNumberInput.addEventListener('keypress', handleKeyPress);
secondNumberInput.addEventListener('keypress', handleKeyPress);

// Focus on first input when page loads
window.addEventListener('load', () => {
    firstNumberInput.focus();
});

// Input validation - prevent non-numeric input
[firstNumberInput, secondNumberInput].forEach(input => {
    input.addEventListener('input', (e) => {
        // Allow numbers, decimal point, and negative sign
        e.target.value = e.target.value.replace(/[^-\d.]/g, '');
        
        // Ensure only one decimal point
        const parts = e.target.value.split('.');
        if (parts.length > 2) {
            e.target.value = parts[0] + '.' + parts.slice(1).join('');
        }
    });
});

console.log('Percent Difference Calculator loaded successfully!');

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

/**
 * Initialize navigation between sections
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target section
            const targetSection = link.getAttribute('data-section');
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link and target section
            link.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    initNavigation();
    firstNumberInput.focus();
    
    // Percent From event listeners
    const calculatePercentFromBtn = document.getElementById('calculatePercentFrom');
    const clearPercentFromBtn = document.getElementById('clearPercentFrom');
    
    if (calculatePercentFromBtn) {
        calculatePercentFromBtn.addEventListener('click', handlePercentFromCalculate);
    }
    
    if (clearPercentFromBtn) {
        clearPercentFromBtn.addEventListener('click', handlePercentFromClear);
    }
    
    // Add Enter key support for Percent From inputs
    const baseNumberInput = document.getElementById('baseNumber');
    if (baseNumberInput) {
        baseNumberInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handlePercentFromCalculate();
            }
        });
    }
});

// ============================================
// PERCENT FROM FUNCTIONALITY
// ============================================

/**
 * Calculate result by adding or subtracting percentage from base number
 */
function handlePercentFromCalculate() {
    try {
        const baseNumber = parseFloat(document.getElementById('baseNumber').value);
        const percent = parseFloat(document.getElementById('percentSelect').value);
        const isSubtract = document.getElementById('subtractCheckbox').checked;
        
        if (isNaN(baseNumber)) {
            throw new Error('Please enter a valid base number');
        }
        
        // Calculate the percentage amount
        const percentAmount = (baseNumber * percent) / 100;
        
        // Add or subtract based on checkbox
        const result = isSubtract ? baseNumber - percentAmount : baseNumber + percentAmount;
        
        // Display result
        const operation = isSubtract ? 'subtracted from' : 'added to';
        const symbol = isSubtract ? '−' : '+';
        const resultClass = isSubtract ? 'negative' : 'positive';
        
        document.getElementById('percentFromResult').innerHTML = `
            <h3>Calculation Result:</h3>
            <div class="result-value ${resultClass}">
                ${result.toFixed(2)}
            </div>
            <p>${percent}% ${operation} ${baseNumber} equals <strong>${result.toFixed(2)}</strong></p>
        `;
        
        document.getElementById('percentFromExplanation').innerHTML = `
            <strong>Calculation Breakdown:</strong><br>
            • Base Number: ${baseNumber}<br>
            • Percent: ${percent}%<br>
            • Percent Amount: ${percentAmount.toFixed(2)}<br>
            • Operation: ${baseNumber} ${symbol} ${percentAmount.toFixed(2)}<br>
            • Result: ${result.toFixed(2)}
        `;
        
    } catch (error) {
        document.getElementById('percentFromResult').innerHTML = `
            <h3 style="color: #dc3545;">Error</h3>
            <p>${error.message}</p>
        `;
        document.getElementById('percentFromExplanation').innerHTML = '';
    }
}

/**
 * Clear the Percent From form
 */
function handlePercentFromClear() {
    document.getElementById('baseNumber').value = '';
    document.getElementById('percentSelect').selectedIndex = 0;
    document.getElementById('subtractCheckbox').checked = false;
    document.getElementById('percentFromResult').innerHTML = '<p>Enter a base number and select a percent to calculate</p>';
    document.getElementById('percentFromExplanation').innerHTML = '';
    document.getElementById('baseNumber').focus();
}

// ============================================
// COST AVERAGE CALCULATION FUNCTIONALITY
// ============================================

/**
 * Calculate cost average for stock purchases
 */
function handleCostAvgCalculate() {
    try {
        const purchases = [];
        let totalCost = 0;
        let totalShares = 0;
        
        // Collect all purchase data
        for (let i = 1; i <= 4; i++) {
            const shares = parseFloat(document.getElementById(`shares${i}`).value);
            const price = parseFloat(document.getElementById(`price${i}`).value);
            
            // Skip empty entries
            if (isNaN(shares) && isNaN(price)) {
                continue;
            }
            
            // Validate individual entries
            if (isNaN(shares) || isNaN(price)) {
                throw new Error(`Purchase ${i}: Please enter both shares and price, or leave both empty`);
            }
            
            if (shares < 0 || price < 0) {
                throw new Error(`Purchase ${i}: Values cannot be negative`);
            }
            
            // Only include if shares > 0
            if (shares > 0) {
                const cost = shares * price;
                purchases.push({ shares, price, cost, index: i });
                totalShares += shares;
                totalCost += cost;
            }
        }
        
        // Check if at least one purchase was entered
        if (purchases.length === 0) {
            throw new Error('Please enter at least one purchase with shares greater than 0');
        }
        
        // Calculate average cost
        const avgCost = totalCost / totalShares;
        
        // Build breakdown text
        let breakdownText = '<strong>Calculation Breakdown:</strong><br>';
        purchases.forEach(p => {
            breakdownText += `• Purchase ${p.index}: ${p.shares} shares @ $${p.price.toFixed(2)} = $${p.cost.toFixed(2)}<br>`;
        });
        breakdownText += `<br>• Total Cost: $${totalCost.toFixed(2)}<br>`;
        breakdownText += `• Total Shares: ${totalShares}<br>`;
        breakdownText += `• Average Cost: $${totalCost.toFixed(2)} ÷ ${totalShares} = <strong>$${avgCost.toFixed(2)}</strong>`;
        
        // Display result
        document.getElementById('costAvgResult').innerHTML = `
            <h3>Calculation Result:</h3>
            <div class="result-value neutral">
                $${avgCost.toFixed(2)}
            </div>
            <p>Your average cost per share is <strong>$${avgCost.toFixed(2)}</strong></p>
            <p>Total Shares: <strong>${totalShares}</strong> | Total Cost: <strong>$${totalCost.toFixed(2)}</strong></p>
        `;
        
        document.getElementById('costAvgExplanation').innerHTML = breakdownText;
        
    } catch (error) {
        document.getElementById('costAvgResult').innerHTML = `
            <h3 style="color: #dc3545;">Error</h3>
            <p>${error.message}</p>
        `;
        document.getElementById('costAvgExplanation').innerHTML = '';
    }
}

/**
 * Clear the Cost Average form
 */
function handleCostAvgClear() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`shares${i}`).value = '';
        document.getElementById(`price${i}`).value = '';
    }
    document.getElementById('costAvgResult').innerHTML = '<p>Enter your purchase details above to calculate the average cost</p>';
    document.getElementById('costAvgExplanation').innerHTML = '';
    document.getElementById('shares1').focus();
}

// Event listeners for Cost Average Calculator
document.addEventListener('DOMContentLoaded', () => {
    const calculateCostAvgBtn = document.getElementById('calculateCostAvg');
    const clearCostAvgBtn = document.getElementById('clearCostAvg');
    
    if (calculateCostAvgBtn) {
        calculateCostAvgBtn.addEventListener('click', handleCostAvgCalculate);
    }
    
    if (clearCostAvgBtn) {
        clearCostAvgBtn.addEventListener('click', handleCostAvgClear);
    }
    
    // Add Enter key support for Cost Avg inputs
    for (let i = 1; i <= 4; i++) {
        const sharesInput = document.getElementById(`shares${i}`);
        const priceInput = document.getElementById(`price${i}`);
        
        if (sharesInput) {
            sharesInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleCostAvgCalculate();
                }
            });
        }
        
        if (priceInput) {
            priceInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleCostAvgCalculate();
                }
            });
        }
    }
});