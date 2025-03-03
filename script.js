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
});
