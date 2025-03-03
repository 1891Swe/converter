document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const commonConversionsTitle = document.querySelector('.common-conversions h3');
    const commonConversionsList = document.getElementById('common-weight-conversions');
    
    // Track which tab is currently active
    let activeTab = 'weight';

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding tab content
            const tabId = button.dataset.tab;
            activeTab = tabId;
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
            
            // Update common conversions section based on active tab
            updateCommonConversions(tabId);
        });
    });

    // Weight conversion functionality
    const weightInput = document.getElementById('weight-input');
    const weightFrom = document.getElementById('weight-from');
    const weightTo = document.getElementById('weight-to');
    const weightResult = document.getElementById('weight-result');
    const weightFormula = document.getElementById('weight-formula');
    
    // Track which input was last modified
    let lastModified = 'input'; // Default to input field

    // Conversion rates (to kg as base unit)
    const weightConversions = {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.45359237,
        oz: 0.0283495231,
        st: 6.35029318,
        ton: 1000
    };

    // Perform weight conversion from input to result
    function convertFromInput() {
        const fromUnit = weightFrom.value;
        const toUnit = weightTo.value;
        const inputValue = parseFloat(weightInput.value);

        if (isNaN(inputValue)) {
            weightResult.value = '';
            return;
        }

        // Convert input to kg first (base unit), then to target unit
        const valueInKg = inputValue * weightConversions[fromUnit];
        const result = valueInKg / weightConversions[toUnit];
        
        // Display with appropriate precision
        weightResult.value = formatResult(result);
        
        // Update formula display
        updateWeightFormula(fromUnit, toUnit);
    }
    
    // Perform weight conversion from result to input
    function convertFromResult() {
        const fromUnit = weightFrom.value;
        const toUnit = weightTo.value;
        const resultValue = parseFloat(weightResult.value);

        if (isNaN(resultValue)) {
            weightInput.value = '';
            return;
        }

        // Convert result to kg first (base unit), then to source unit
        const valueInKg = resultValue * weightConversions[toUnit];
        const input = valueInKg / weightConversions[fromUnit];
        
        // Display with appropriate precision
        weightInput.value = formatResult(input);
        
        // Update formula display
        updateWeightFormula(fromUnit, toUnit);
    }
    
    // Wrapper function to determine which conversion to perform
    function convertWeight() {
        if (lastModified === 'input') {
            convertFromInput();
        } else {
            convertFromResult();
        }
    }

    // Format result to appropriate decimal places
    function formatResult(value) {
        if (value >= 1000) {
            return value.toFixed(1);
        } else if (value >= 10) {
            return value.toFixed(2);
        } else if (value >= 0.1) {
            return value.toFixed(3);
        } else if (value >= 0.01) {
            return value.toFixed(4);
        } else if (value >= 0.001) {
            return value.toFixed(5);
        } else {
            return value.toFixed(6);
        }
    }

    // Update weight conversion formula display
    function updateWeightFormula(fromUnit, toUnit) {
        if (fromUnit === toUnit) {
            weightFormula.textContent = `Formula: No conversion needed (same units)`;
            return;
        }

        // Calculate the conversion factor between the two units
        const conversionFactor = weightConversions[fromUnit] / weightConversions[toUnit];
        
        weightFormula.textContent = `Formula: 1 ${fromUnit} = ${formatResult(conversionFactor)} ${toUnit}`;
    }

    // Update common conversions based on active tab
    function updateCommonConversions(tabId) {
        switch(tabId) {
            case 'weight':
                commonConversionsTitle.textContent = 'Common Weight Conversions';
                commonConversionsList.innerHTML = `
                    <li>1 kg = 2.20462 lb</li>
                    <li>1 lb = 0.453592 kg</li>
                    <li>1 kg = 1000 g</li>
                    <li>1 lb = 16 oz</li>
                    <li>1 stone = 14 lb</li>
                `;
                break;
            case 'length':
                commonConversionsTitle.textContent = 'Common Length Conversions';
                commonConversionsList.innerHTML = `
                    <li>1 m = 3.28084 ft</li>
                    <li>1 ft = 0.3048 m</li>
                    <li>1 km = 0.621371 miles</li>
                    <li>1 inch = 2.54 cm</li>
                    <li>1 yard = 0.9144 m</li>
                `;
                break;
            case 'volume':
                commonConversionsTitle.textContent = 'Common Volume Conversions';
                commonConversionsList.innerHTML = `
                    <li>1 liter = 0.264172 gallons (US)</li>
                    <li>1 gallon (US) = 3.78541 liters</li>
                    <li>1 liter = 1000 ml</li>
                    <li>1 cup = 236.588 ml</li>
                    <li>1 pint = 0.473176 liters</li>
                `;
                break;
            case 'temperature':
                commonConversionsTitle.textContent = 'Common Temperature Conversions';
                commonConversionsList.innerHTML = `
                    <li>0°C = 32°F</li>
                    <li>100°C = 212°F</li>
                    <li>°F = (°C × 9/5) + 32</li>
                    <li>°C = (°F − 32) × 5/9</li>
                    <li>K = °C + 273.15</li>
                `;
                break;
        }
    }

    // Event listeners for weight conversion
    weightInput.addEventListener('input', function() {
        lastModified = 'input';
        convertWeight();
    });
    
    weightResult.addEventListener('input', function() {
        lastModified = 'result';
        convertWeight();
    });
    
    weightFrom.addEventListener('change', function() {
        // Always recalculate based on the last modified field
        convertWeight();
    });
    
    weightTo.addEventListener('change', function() {
        // Always recalculate based on the last modified field
        convertWeight();
    });

    // Initialize with default conversion
    lastModified = 'input';
    convertWeight();
    
    // Length conversion functionality
    const lengthInput = document.getElementById('length-input');
    const lengthFrom = document.getElementById('length-from');
    const lengthTo = document.getElementById('length-to');
    const lengthResult = document.getElementById('length-result');
    const lengthFormula = document.getElementById('length-formula');
    
    // Track which length input was last modified
    let lengthLastModified = 'input';
    
    // Conversion rates (to meters as base unit)
    const lengthConversions = {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        ft: 0.3048,
        in: 0.0254,
        yd: 0.9144,
        mi: 1609.344
    };
    
    // Perform length conversion from input to result
    function convertLengthFromInput() {
        const fromUnit = lengthFrom.value;
        const toUnit = lengthTo.value;
        const inputValue = parseFloat(lengthInput.value);
        
        if (isNaN(inputValue)) {
            lengthResult.value = '';
            return;
        }
        
        // Convert input to meters first (base unit), then to target unit
        const valueInMeters = inputValue * lengthConversions[fromUnit];
        const result = valueInMeters / lengthConversions[toUnit];
        
        // Display with appropriate precision
        lengthResult.value = formatResult(result);
        
        // Update formula display
        updateLengthFormula(fromUnit, toUnit);
    }
    
    // Perform length conversion from result to input
    function convertLengthFromResult() {
        const fromUnit = lengthFrom.value;
        const toUnit = lengthTo.value;
        const resultValue = parseFloat(lengthResult.value);
        
        if (isNaN(resultValue)) {
            lengthInput.value = '';
            return;
        }
        
        // Convert result to meters first (base unit), then to source unit
        const valueInMeters = resultValue * lengthConversions[toUnit];
        const input = valueInMeters / lengthConversions[fromUnit];
        
        // Display with appropriate precision
        lengthInput.value = formatResult(input);
        
        // Update formula display
        updateLengthFormula(fromUnit, toUnit);
    }
    
    // Wrapper function to determine which length conversion to perform
    function convertLength() {
        if (lengthLastModified === 'input') {
            convertLengthFromInput();
        } else {
            convertLengthFromResult();
        }
    }
    
    // Update length conversion formula display
    function updateLengthFormula(fromUnit, toUnit) {
        if (fromUnit === toUnit) {
            lengthFormula.textContent = `Formula: No conversion needed (same units)`;
            return;
        }
        
        // Calculate the conversion factor between the two units
        const conversionFactor = lengthConversions[fromUnit] / lengthConversions[toUnit];
        
        lengthFormula.textContent = `Formula: 1 ${fromUnit} = ${formatResult(conversionFactor)} ${toUnit}`;
    }
    
    // Event listeners for length conversion
    lengthInput.addEventListener('input', function() {
        lengthLastModified = 'input';
        convertLength();
    });
    
    lengthResult.addEventListener('input', function() {
        lengthLastModified = 'result';
        convertLength();
    });
    
    lengthFrom.addEventListener('change', function() {
        convertLength();
    });
    
    lengthTo.addEventListener('change', function() {
        convertLength();
    });
    
    // Initialize length conversion
    convertLength();
});
