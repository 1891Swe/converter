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
            
            // Ensure the current tab's conversion is performed
            if (tabId === 'weight') {
                convertWeight();
            } else if (tabId === 'length') {
                convertLength();
            } else if (tabId === 'volume') {
                convertVolume();
            } else if (tabId === 'temperature') {
                convertTemp();
            } else if (tabId === 'data') {
                convertData();
            } else if (tabId === 'calculator') {
                // No specific initialization needed for calculator beyond what's in the setup
            }
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
            case 'data':
                commonConversionsTitle.textContent = 'Common Data Size Conversions';
                commonConversionsList.innerHTML = `
                    <li>1 KB = 1,000 bytes</li>
                    <li>1 MB = 1,000 KB</li>
                    <li>1 GB = 1,000 MB</li>
                    <li>1 KiB = 1,024 bytes</li>
                    <li>1 MiB = 1,024 KiB</li>
                `;
                break;
            case 'calculator':
                commonConversionsTitle.textContent = 'Common Math Shortcuts';
                commonConversionsList.innerHTML = `
                    <li>% of a number: multiply by the percentage, then divide by 100</li>
                    <li>Square root: use √ button or raise to power 0.5</li>
                    <li>Percentage increase: (new - old) / old × 100</li>
                    <li>Percentage decrease: (old - new) / old × 100</li>
                    <li>To add tax: multiply by (1 + tax rate)</li>
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
    
    // Volume conversion functionality
    const volumeInput = document.getElementById('volume-input');
    const volumeFrom = document.getElementById('volume-from');
    const volumeTo = document.getElementById('volume-to');
    const volumeResult = document.getElementById('volume-result');
    const volumeFormula = document.getElementById('volume-formula');
    
    // Track which volume input was last modified
    let volumeLastModified = 'input';
    
    // Conversion rates (to liters as base unit)
    const volumeConversions = {
        l: 1,
        ml: 0.001,
        m3: 1000,
        gal: 3.78541,
        qt: 0.946353,
        pt: 0.473176,
        cup: 0.236588,
        floz: 0.0295735,
        tbsp: 0.0147868,
        tsp: 0.00492892
    };
    
    // Perform volume conversion from input to result
    function convertVolumeFromInput() {
        const fromUnit = volumeFrom.value;
        const toUnit = volumeTo.value;
        const inputValue = parseFloat(volumeInput.value);
        
        if (isNaN(inputValue)) {
            volumeResult.value = '';
            return;
        }
        
        // Convert input to liters first (base unit), then to target unit
        const valueInLiters = inputValue * volumeConversions[fromUnit];
        const result = valueInLiters / volumeConversions[toUnit];
        
        // Display with appropriate precision
        volumeResult.value = formatResult(result);
        
        // Update formula display
        updateVolumeFormula(fromUnit, toUnit);
    }
    
    // Perform volume conversion from result to input
    function convertVolumeFromResult() {
        const fromUnit = volumeFrom.value;
        const toUnit = volumeTo.value;
        const resultValue = parseFloat(volumeResult.value);
        
        if (isNaN(resultValue)) {
            volumeInput.value = '';
            return;
        }
        
        // Convert result to liters first (base unit), then to source unit
        const valueInLiters = resultValue * volumeConversions[toUnit];
        const input = valueInLiters / volumeConversions[fromUnit];
        
        // Display with appropriate precision
        volumeInput.value = formatResult(input);
        
        // Update formula display
        updateVolumeFormula(fromUnit, toUnit);
    }
    
    // Wrapper function to determine which volume conversion to perform
    function convertVolume() {
        if (volumeLastModified === 'input') {
            convertVolumeFromInput();
        } else {
            convertVolumeFromResult();
        }
    }
    
    // Update volume conversion formula display
    function updateVolumeFormula(fromUnit, toUnit) {
        if (fromUnit === toUnit) {
            volumeFormula.textContent = `Formula: No conversion needed (same units)`;
            return;
        }
        
        // Calculate the conversion factor between the two units
        const conversionFactor = volumeConversions[fromUnit] / volumeConversions[toUnit];
        
        volumeFormula.textContent = `Formula: 1 ${fromUnit} = ${formatResult(conversionFactor)} ${toUnit}`;
    }
    
    // Event listeners for volume conversion
    volumeInput.addEventListener('input', function() {
        volumeLastModified = 'input';
        convertVolume();
    });
    
    volumeResult.addEventListener('input', function() {
        volumeLastModified = 'result';
        convertVolume();
    });
    
    volumeFrom.addEventListener('change', function() {
        // Keep the last modified field as the source of truth
        convertVolume();
    });
    
    volumeTo.addEventListener('change', function() {
        // Keep the last modified field as the source of truth
        convertVolume();
    });
    
    // Initialize volume conversion
    convertVolume();
    
    // Temperature conversion functionality
    const tempInput = document.getElementById('temp-input');
    const tempFrom = document.getElementById('temp-from');
    const tempTo = document.getElementById('temp-to');
    const tempResult = document.getElementById('temp-result');
    const tempFormula = document.getElementById('temp-formula');
    
    // Track which temperature input was last modified
    let tempLastModified = 'input';
    
    // Temperature conversion is special - can't use simple ratios
    // We'll convert everything to Celsius first, then to target unit
    
    // Convert from any temperature unit to Celsius
    function toCelsius(value, unit) {
        switch(unit) {
            case 'c': return value; // Already Celsius
            case 'f': return (value - 32) * 5/9; // Fahrenheit to Celsius
            case 'k': return value - 273.15; // Kelvin to Celsius
            case 'r': return (value - 491.67) * 5/9; // Rankine to Celsius
            default: return value;
        }
    }
    
    // Convert from Celsius to any temperature unit
    function fromCelsius(value, unit) {
        switch(unit) {
            case 'c': return value; // Keep as Celsius
            case 'f': return (value * 9/5) + 32; // Celsius to Fahrenheit
            case 'k': return value + 273.15; // Celsius to Kelvin
            case 'r': return (value + 273.15) * 9/5; // Celsius to Rankine
            default: return value;
        }
    }
    
    // Perform temperature conversion from input to result
    function convertTempFromInput() {
        const fromUnit = tempFrom.value;
        const toUnit = tempTo.value;
        const inputValue = parseFloat(tempInput.value);
        
        if (isNaN(inputValue)) {
            tempResult.value = '';
            return;
        }
        
        // Convert input to Celsius first, then to target unit
        const valueInCelsius = toCelsius(inputValue, fromUnit);
        const result = fromCelsius(valueInCelsius, toUnit);
        
        // Display with appropriate precision for temperature
        tempResult.value = result.toFixed(2);
        
        // Update formula display
        updateTempFormula(fromUnit, toUnit);
    }
    
    // Perform temperature conversion from result to input
    function convertTempFromResult() {
        const fromUnit = tempFrom.value;
        const toUnit = tempTo.value;
        const resultValue = parseFloat(tempResult.value);
        
        if (isNaN(resultValue)) {
            tempInput.value = '';
            return;
        }
        
        // Convert result to Celsius first, then to source unit
        const valueInCelsius = toCelsius(resultValue, toUnit);
        const input = fromCelsius(valueInCelsius, fromUnit);
        
        // Display with appropriate precision for temperature
        tempInput.value = input.toFixed(2);
        
        // Update formula display
        updateTempFormula(fromUnit, toUnit);
    }
    
    // Wrapper function to determine which temperature conversion to perform
    function convertTemp() {
        if (tempLastModified === 'input') {
            convertTempFromInput();
        } else {
            convertTempFromResult();
        }
    }
    
    // Update temperature conversion formula display
    function updateTempFormula(fromUnit, toUnit) {
        if (fromUnit === toUnit) {
            tempFormula.textContent = `Formula: No conversion needed (same units)`;
            return;
        }
        
        // Show the appropriate formula based on the conversion
        let formula = '';
        
        if (fromUnit === 'c' && toUnit === 'f') {
            formula = '°F = (°C × 9/5) + 32';
        } else if (fromUnit === 'f' && toUnit === 'c') {
            formula = '°C = (°F − 32) × 5/9';
        } else if (fromUnit === 'c' && toUnit === 'k') {
            formula = 'K = °C + 273.15';
        } else if (fromUnit === 'k' && toUnit === 'c') {
            formula = '°C = K − 273.15';
        } else if (fromUnit === 'f' && toUnit === 'k') {
            formula = 'K = (°F − 32) × 5/9 + 273.15';
        } else if (fromUnit === 'k' && toUnit === 'f') {
            formula = '°F = (K − 273.15) × 9/5 + 32';
        } else if (fromUnit === 'c' && toUnit === 'r') {
            formula = '°R = (°C + 273.15) × 9/5';
        } else if (fromUnit === 'r' && toUnit === 'c') {
            formula = '°C = (°R × 5/9) − 273.15';
        } else if (fromUnit === 'f' && toUnit === 'r') {
            formula = '°R = °F + 459.67';
        } else if (fromUnit === 'r' && toUnit === 'f') {
            formula = '°F = °R − 459.67';
        } else if (fromUnit === 'k' && toUnit === 'r') {
            formula = '°R = K × 9/5';
        } else if (fromUnit === 'r' && toUnit === 'k') {
            formula = 'K = °R × 5/9';
        }
        
        tempFormula.textContent = `Formula: ${formula}`;
    }
    
    // Event listeners for temperature conversion
    tempInput.addEventListener('input', function() {
        tempLastModified = 'input';
        convertTemp();
    });
    
    tempResult.addEventListener('input', function() {
        tempLastModified = 'result';
        convertTemp();
    });
    
    tempFrom.addEventListener('change', function() {
        // Keep the last modified field as the source of truth
        convertTemp();
    });
    
    tempTo.addEventListener('change', function() {
        // Keep the last modified field as the source of truth
        convertTemp();
    });
    
    // Initialize all converters
    convertWeight();
    convertLength();
    convertVolume();
    convertTemp();
    
    // Data size conversion functionality
    const dataInput = document.getElementById('data-input');
    const dataFrom = document.getElementById('data-from');
    const dataTo = document.getElementById('data-to');
    const dataResult = document.getElementById('data-result');
    const dataFormula = document.getElementById('data-formula');
    
    // Track which data input was last modified
    let dataLastModified = 'input';
    
    // Conversion rates (to bytes as base unit)
    // For decimal (SI) units: 1 KB = 1000 bytes
    // For binary units: 1 KiB = 1024 bytes
    const dataConversions = {
        // Decimal (SI) units
        b: 1,
        kb: 1000,
        mb: 1000000,
        gb: 1000000000,
        tb: 1000000000000,
        pb: 1000000000000000,
        
        // Binary units
        kib: 1024,
        mib: 1048576,          // 1024^2
        gib: 1073741824,       // 1024^3
        tib: 1099511627776,    // 1024^4
        pib: 1125899906842624  // 1024^5
    };
    
    // Perform data size conversion from input to result
    function convertDataFromInput() {
        const fromUnit = dataFrom.value;
        const toUnit = dataTo.value;
        const inputValue = parseFloat(dataInput.value);
        
        if (isNaN(inputValue)) {
            dataResult.value = '';
            return;
        }
        
        // Convert input to bytes first (base unit), then to target unit
        const valueInBytes = inputValue * dataConversions[fromUnit];
        const result = valueInBytes / dataConversions[toUnit];
        
        // Display with appropriate precision
        dataResult.value = formatResult(result);
        
        // Update formula display
        updateDataFormula(fromUnit, toUnit);
    }
    
    // Perform data size conversion from result to input
    function convertDataFromResult() {
        const fromUnit = dataFrom.value;
        const toUnit = dataTo.value;
        const resultValue = parseFloat(dataResult.value);
        
        if (isNaN(resultValue)) {
            dataInput.value = '';
            return;
        }
        
        // Convert result to bytes first (base unit), then to source unit
        const valueInBytes = resultValue * dataConversions[toUnit];
        const input = valueInBytes / dataConversions[fromUnit];
        
        // Display with appropriate precision
        dataInput.value = formatResult(input);
        
        // Update formula display
        updateDataFormula(fromUnit, toUnit);
    }
    
    // Wrapper function to determine which data conversion to perform
    function convertData() {
        if (dataLastModified === 'input') {
            convertDataFromInput();
        } else {
            convertDataFromResult();
        }
    }
    
    // Update data conversion formula display
    function updateDataFormula(fromUnit, toUnit) {
        if (fromUnit === toUnit) {
            dataFormula.textContent = `Formula: No conversion needed (same units)`;
            return;
        }
        
        // Calculate the conversion factor between the two units
        const conversionFactor = dataConversions[fromUnit] / dataConversions[toUnit];
        
        dataFormula.textContent = `Formula: 1 ${fromUnit.toUpperCase()} = ${formatResult(conversionFactor)} ${toUnit.toUpperCase()}`;
    }
    
    // Event listeners for data conversion
    dataInput.addEventListener('input', function() {
        dataLastModified = 'input';
        convertData();
    });
    
    dataResult.addEventListener('input', function() {
        dataLastModified = 'result';
        convertData();
    });
    
    dataFrom.addEventListener('change', function() {
        // Keep the last modified field as the source of truth
        convertData();
    });
    
    dataTo.addEventListener('change', function() {
        // Keep the last modified field as the source of truth
        convertData();
    });
    
    // Initialize data conversion
    convertData();
    
    // Calculator functionality
    const calculatorResult = document.getElementById('calculator-result');
    const calculatorKeys = document.querySelector('.calculator-keys');
    
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;
    
    // Update the display
    function updateCalculatorDisplay() {
        calculatorResult.value = displayValue;
    }
    
    // Handle digit input
    function inputDigit(digit) {
        if (waitingForSecondOperand) {
            displayValue = digit;
            waitingForSecondOperand = false;
        } else {
            // Overwrite displayValue if it's '0', otherwise append
            displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }
    
    // Handle decimal point
    function inputDecimal() {
        // If waiting for second operand, start it with '0.'
        if (waitingForSecondOperand) {
            displayValue = '0.';
            waitingForSecondOperand = false;
            return;
        }
        
        // Add a decimal point only if one doesn't already exist
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    }
    
    // Handle operators
    function handleOperator(nextOperator) {
        // Convert current display value to number
        const inputValue = parseFloat(displayValue);
        
        // If there's a pending operator and we were waiting for second operand
        if (operator && waitingForSecondOperand) {
            // Just update the operator and exit
            operator = nextOperator;
            return;
        }
        
        // If there's no first operand yet, store current value
        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            // If we already have first operand and operator, perform the calculation
            const result = performCalculation();
            // Round to avoid floating point issues
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }
        
        waitingForSecondOperand = true;
        operator = nextOperator;
    }
    
    // Perform calculation based on operator
    function performCalculation() {
        const inputValue = parseFloat(displayValue);
        
        if (operator === 'add') {
            return firstOperand + inputValue;
        } else if (operator === 'subtract') {
            return firstOperand - inputValue;
        } else if (operator === 'multiply') {
            return firstOperand * inputValue;
        } else if (operator === 'divide') {
            if (inputValue === 0) {
                // Handle division by zero
                alert('Cannot divide by zero');
                resetCalculator();
                return 0;
            }
            return firstOperand / inputValue;
        }
        
        // If no operator matches, return the input value
        return inputValue;
    }
    
    // Handle percentage
    function handlePercentage() {
        const inputValue = parseFloat(displayValue);
        
        if (operator && firstOperand !== null) {
            // If we're calculating with a previous value
            // For + and -, treat percent as percent of first operand
            // For * and /, just divide by 100
            if (operator === 'add' || operator === 'subtract') {
                displayValue = `${parseFloat((firstOperand * (inputValue / 100)).toFixed(7))}`;
            } else {
                displayValue = `${parseFloat((inputValue / 100).toFixed(7))}`;
            }
        } else {
            // Simple percentage - just divide by 100
            displayValue = `${parseFloat((inputValue / 100).toFixed(7))}`;
        }
    }
    
    // Toggle sign
    function toggleSign() {
        displayValue = (parseFloat(displayValue) * -1).toString();
    }
    
    // Reset calculator
    function resetCalculator() {
        displayValue = '0';
        firstOperand = null;
        waitingForSecondOperand = false;
        operator = null;
    }
    
    // Event listener for calculator keys
    calculatorKeys.addEventListener('click', (event) => {
        const target = event.target;
        
        // Exit if the clicked element isn't a button
        if (!target.matches('button')) {
            return;
        }
        
        // Handle different key types
        if (target.classList.contains('key-operator')) {
            handleOperator(target.dataset.action);
            updateCalculatorDisplay();
            return;
        }
        
        if (target.classList.contains('key-equals')) {
            if (operator && !waitingForSecondOperand) {
                const result = performCalculation();
                displayValue = `${parseFloat(result.toFixed(7))}`;
                firstOperand = null;
                waitingForSecondOperand = false;
                operator = null;
            }
            updateCalculatorDisplay();
            return;
        }
        
        if (target.classList.contains('key-clear')) {
            resetCalculator();
            updateCalculatorDisplay();
            return;
        }
        
        if (target.classList.contains('key-sign')) {
            toggleSign();
            updateCalculatorDisplay();
            return;
        }
        
        if (target.classList.contains('key-percent')) {
            handlePercentage();
            updateCalculatorDisplay();
            return;
        }
        
        if (target.classList.contains('key-decimal')) {
            inputDecimal();
            updateCalculatorDisplay();
            return;
        }
        
        // Handle number keys
        if (target.classList.contains('key-number')) {
            inputDigit(target.dataset.digit);
            updateCalculatorDisplay();
        }
    });
    
    // Initialize calculator display
    updateCalculatorDisplay();
});
