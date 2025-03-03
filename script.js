document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Update common conversions based on active tab
            updateCommonConversions(tabId);
        });
    });
    
    // Update common conversions function
    function updateCommonConversions(tabId) {
        const conversionCategories = document.querySelectorAll('.conversion-category');
        conversionCategories.forEach(category => {
            category.classList.remove('active');
        });
        
        const commonConversionsContent = document.getElementById('common-conversions-content');
        
        // Check if category exists, if not create it
        let categoryElement = document.getElementById(`common-${tabId}-conversions`);
        
        if (!categoryElement) {
            categoryElement = document.createElement('div');
            categoryElement.id = `common-${tabId}-conversions`;
            categoryElement.className = 'conversion-category';
            categoryElement.innerHTML = `<h4>${capitalizeFirstLetter(tabId)} Conversions</h4><ul></ul>`;
            commonConversionsContent.appendChild(categoryElement);
            
            // Populate with conversions based on tab
            const list = categoryElement.querySelector('ul');
            switch(tabId) {
                case 'weight':
                    list.innerHTML = `
                        <li>1 kg = 2.20462 lb</li>
                        <li>1 lb = 0.453592 kg</li>
                        <li>1 kg = 1000 g</li>
                        <li>1 lb = 16 oz</li>
                        <li>1 stone = 14 lb</li>
                    `;
                    break;
                case 'length':
                    list.innerHTML = `
                        <li>1 m = 3.28084 ft</li>
                        <li>1 ft = 0.3048 m</li>
                        <li>1 in = 2.54 cm</li>
                        <li>1 km = 0.621371 mi</li>
                        <li>1 mi = 1.60934 km</li>
                    `;
                    break;
                case 'volume':
                    list.innerHTML = `
                        <li>1 L = 0.264172 gal (US)</li>
                        <li>1 gal (US) = 3.78541 L</li>
                        <li>1 L = 1000 mL</li>
                        <li>1 cup (US) = 236.588 mL</li>
                        <li>1 L = 4.22675 cups (US)</li>
                    `;
                    break;
                case 'temperature':
                    list.innerHTML = `
                        <li>0°C = 32°F</li>
                        <li>100°C = 212°F</li>
                        <li>°F = (°C × 9/5) + 32</li>
                        <li>°C = (°F - 32) × 5/9</li>
                        <li>K = °C + 273.15</li>
                    `;
                    break;
                case 'data':
                    list.innerHTML = `
                        <li>1 KB = 1,000 bytes</li>
                        <li>1 MB = 1,000 KB</li>
                        <li>1 GB = 1,000 MB</li>
                        <li>1 KiB = 1,024 bytes</li>
                        <li>1 MiB = 1,024 KiB</li>
                    `;
                    break;
                case 'calculator':
                    list.innerHTML = `
                        <li>% of a number: number × (percent / 100)</li>
                        <li>Addition: a + b</li>
                        <li>Subtraction: a - b</li>
                        <li>Multiplication: a × b</li>
                        <li>Division: a ÷ b</li>
                    `;
                    break;
            }
        }
        
        categoryElement.classList.add('active');
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Initialize converters
    initWeightConverter();
    initLengthConverter();
    initVolumeConverter();
    initTemperatureConverter();
    initDataConverter();
    initCalculator();
    
    // Weight Converter
    function initWeightConverter() {
        const weightInput = document.getElementById('weight-input');
        const weightFrom = document.getElementById('weight-from');
        const weightTo = document.getElementById('weight-to');
        const weightResult = document.getElementById('weight-result');
        const weightFormula = document.getElementById('weight-formula');
        
        const weightConversionRates = {
            kg: {
                kg: 1,
                g: 1000,
                mg: 1000000,
                lb: 2.20462,
                oz: 35.274,
                st: 0.157473,
                ton: 0.001
            },
            g: {
                kg: 0.001,
                g: 1,
                mg: 1000,
                lb: 0.00220462,
                oz: 0.035274,
                st: 0.000157473,
                ton: 0.000001
            },
            mg: {
                kg: 0.000001,
                g: 0.001,
                mg: 1,
                lb: 0.00000220462,
                oz: 0.000035274,
                st: 0.000000157473,
                ton: 0.000000001
            },
            lb: {
                kg: 0.453592,
                g: 453.592,
                mg: 453592,
                lb: 1,
                oz: 16,
                st: 0.0714286,
                ton: 0.000453592
            },
            oz: {
                kg: 0.0283495,
                g: 28.3495,
                mg: 28349.5,
                lb: 0.0625,
                oz: 1,
                st: 0.00446429,
                ton: 0.0000283495
            },
            st: {
                kg: 6.35029,
                g: 6350.29,
                mg: 6350290,
                lb: 14,
                oz: 224,
                st: 1,
                ton: 0.00635029
            },
            ton: {
                kg: 1000,
                g: 1000000,
                mg: 1000000000,
                lb: 2204.62,
                oz: 35274,
                st: 157.473,
                ton: 1
            }
        };
        
        function convertWeight() {
            const fromUnit = weightFrom.value;
            const toUnit = weightTo.value;
            const inputValue = parseFloat(weightInput.value);
            
            if (!isNaN(inputValue)) {
                const result = inputValue * weightConversionRates[fromUnit][toUnit];
                weightResult.value = result.toFixed(result < 0.01 ? 6 : result < 1 ? 4 : 2);
                
                // Update formula
                const formula = `1 ${fromUnit} = ${weightConversionRates[fromUnit][toUnit].toFixed(6)} ${toUnit}`;
                weightFormula.textContent = `Formula: ${formula}`;
            }
        }
        
        weightInput.addEventListener('input', convertWeight);
        weightFrom.addEventListener('change', convertWeight);
        weightTo.addEventListener('change', convertWeight);
        
        // Initialize with default values
        convertWeight();
    }
    
    // Length Converter
    function initLengthConverter() {
        const lengthInput = document.getElementById('length-input');
        const lengthFrom = document.getElementById('length-from');
        const lengthTo = document.getElementById('length-to');
        const lengthResult = document.getElementById('length-result');
        const lengthFormula = document.getElementById('length-formula');
        
        const lengthConversionRates = {
            m: {
                m: 1,
                km: 0.001,
                cm: 100,
                mm: 1000,
                ft: 3.28084,
                in: 39.3701,
                yd: 1.09361,
                mi: 0.000621371
            },
            km: {
                m: 1000,
                km: 1,
                cm: 100000,
                mm: 1000000,
                ft: 3280.84,
                in: 39370.1,
                yd: 1093.61,
                mi: 0.621371
            },
            cm: {
                m: 0.01,
                km: 0.00001,
                cm: 1,
                mm: 10,
                ft: 0.0328084,
                in: 0.393701,
                yd: 0.0109361,
                mi: 0.00000621371
            },
            mm: {
                m: 0.001,
                km: 0.000001,
                cm: 0.1,
                mm: 1,
                ft: 0.00328084,
                in: 0.0393701,
                yd: 0.00109361,
                mi: 0.000000621371
            },
            ft: {
                m: 0.3048,
                km: 0.0003048,
                cm: 30.48,
                mm: 304.8,
                ft: 1,
                in: 12,
                yd: 0.333333,
                mi: 0.000189394
            },
            in: {
                m: 0.0254,
                km: 0.0000254,
                cm: 2.54,
                mm: 25.4,
                ft: 0.0833333,
                in: 1,
                yd: 0.0277778,
                mi: 0.0000157828
            },
            yd: {
                m: 0.9144,
                km: 0.0009144,
                cm: 91.44,
                mm: 914.4,
                ft: 3,
                in: 36,
                yd: 1,
                mi: 0.000568182
            },
            mi: {
                m: 1609.34,
                km: 1.60934,
                cm: 160934,
                mm: 1609340,
                ft: 5280,
                in: 63360,
                yd: 1760,
                mi: 1
            }
        };
        
        function convertLength() {
            const fromUnit = lengthFrom.value;
            const toUnit = lengthTo.value;
            const inputValue = parseFloat(lengthInput.value);
            
            if (!isNaN(inputValue)) {
                const result = inputValue * lengthConversionRates[fromUnit][toUnit];
                lengthResult.value = result.toFixed(result < 0.01 ? 6 : result < 1 ? 4 : 2);
                
                // Update formula
                const formula = `1 ${fromUnit} = ${lengthConversionRates[fromUnit][toUnit].toFixed(6)} ${toUnit}`;
                lengthFormula.textContent = `Formula: ${formula}`;
            }
        }
        
        lengthInput.addEventListener('input', convertLength);
        lengthFrom.addEventListener('change', convertLength);
        lengthTo.addEventListener('change', convertLength);
        
        // Initialize with default values
        convertLength();
    }
    
    // Volume Converter
    function initVolumeConverter() {
        const volumeInput = document.getElementById('volume-input');
        const volumeFrom = document.getElementById('volume-from');
        const volumeTo = document.getElementById('volume-to');
        const volumeResult = document.getElementById('volume-result');
        const volumeFormula = document.getElementById('volume-formula');
        
        const volumeConversionRates = {
            l: {
                l: 1,
                ml: 1000,
                m3: 0.001,
                gal: 0.264172,
                qt: 1.05669,
                pt: 2.11338,
                cup: 4.22675,
                floz: 33.814,
                tbsp: 67.628,
                tsp: 202.884
            },
            ml: {
                l: 0.001,
                ml: 1,
                m3: 0.000001,
                gal: 0.000264172,
                qt: 0.00105669,
                pt: 0.00211338,
                cup: 0.00422675,
                floz: 0.033814,
                tbsp: 0.067628,
                tsp: 0.202884
            },
            m3: {
                l: 1000,
                ml: 1000000,
                m3: 1,
                gal: 264.172,
                qt: 1056.69,
                pt: 2113.38,
                cup: 4226.75,
                floz: 33814,
                tbsp: 67628,
                tsp: 202884
            },
            gal: {
                l: 3.78541,
                ml: 3785.41,
                m3: 0.00378541,
                gal: 1,
                qt: 4,
                pt: 8,
                cup: 16,
                floz: 128,
                tbsp: 256,
                tsp: 768
            },
            qt: {
                l: 0.946353,
                ml: 946.353,
                m3: 0.000946353,
                gal: 0.25,
                qt: 1,
                pt: 2,
                cup: 4,
                floz: 32,
                tbsp: 64,
                tsp: 192
            },
            pt: {
                l: 0.473176,
                ml: 473.176,
                m3: 0.000473176,
                gal: 0.125,
                qt: 0.5,
                pt: 1,
                cup: 2,
                floz: 16,
                tbsp: 32,
                tsp: 96
            },
            cup: {
                l: 0.236588,
                ml: 236.588,
                m3: 0.000236588,
                gal: 0.0625,
                qt: 0.25,
                pt: 0.5,
                cup: 1,
                floz: 8,
                tbsp: 16,
                tsp: 48
            },
            floz: {
                l: 0.0295735,
                ml: 29.5735,
                m3: 0.0000295735,
                gal: 0.0078125,
                qt: 0.03125,
                pt: 0.0625,
                cup: 0.125,
                floz: 1,
                tbsp: 2,
                tsp: 6
            },
            tbsp: {
                l: 0.0147868,
                ml: 14.7868,
                m3: 0.0000147868,
                gal: 0.00390625,
                qt: 0.015625,
                pt: 0.03125,
                cup: 0.0625,
                floz: 0.5,
                tbsp: 1,
                tsp: 3
            },
            tsp: {
                l: 0.00492892,
                ml: 4.92892,
                m3: 0.00000492892,
                gal: 0.00130208,
                qt: 0.00520833,
                pt: 0.0104167,
                cup: 0.0208333,
                floz: 0.166667,
                tbsp: 0.333333,
                tsp: 1
            }
        };
        
        function convertVolume() {
            const fromUnit = volumeFrom.value;
            const toUnit = volumeTo.value;
            const inputValue = parseFloat(volumeInput.value);
            
            if (!isNaN(inputValue)) {
                const result = inputValue * volumeConversionRates[fromUnit][toUnit];
                volumeResult.value = result.toFixed(result < 0.01 ? 6 : result < 1 ? 4 : 2);
                
                // Update formula
                const formula = `1 ${fromUnit} = ${volumeConversionRates[fromUnit][toUnit].toFixed(6)} ${toUnit}`;
                volumeFormula.textContent = `Formula: ${formula}`;
            }
        }
        
        volumeInput.addEventListener('input', convertVolume);
        volumeFrom.addEventListener('change', convertVolume);
        volumeTo.addEventListener('change', convertVolume);
        
        // Initialize with default values
        convertVolume();
    }
    
    // Temperature Converter
    function initTemperatureConverter() {
        const tempInput = document.getElementById('temp-input');
        const tempFrom = document.getElementById('temp-from');
        const tempTo = document.getElementById('temp-to');
        const tempResult = document.getElementById('temp-result');
        const tempFormula = document.getElementById('temp-formula');
        
        function convertTemperature() {
            const fromUnit = tempFrom.value;
            const toUnit = tempTo.value;
            const inputValue = parseFloat(tempInput.value);
            
            if (!isNaN(inputValue)) {
                let result;
                let formula;
                
                // Convert to Celsius first (as a middle step)
                let celsius;
                switch(fromUnit) {
                    case 'c': celsius = inputValue; break;
                    case 'f': celsius = (inputValue - 32) * 5/9; break;
                    case 'k': celsius = inputValue - 273.15; break;
                    case 'r': celsius = (inputValue - 491.67) * 5/9; break;
                }
                
                // Convert from Celsius to target unit
                switch(toUnit) {
                    case 'c':
                        result = celsius;
                        formula = fromUnit === 'c' ? 'Direct conversion' : getTemperatureFormula(fromUnit, 'c');
                        break;
                    case 'f':
                        result = celsius * 9/5 + 32;
                        formula = fromUnit === 'f' ? 'Direct conversion' : getTemperatureFormula(fromUnit, 'f');
                        break;
                    case 'k':
                        result = celsius + 273.15;
                        formula = fromUnit === 'k' ? 'Direct conversion' : getTemperatureFormula(fromUnit, 'k');
                        break;
                    case 'r':
                        result = (celsius + 273.15) * 9/5;
                        formula = fromUnit === 'r' ? 'Direct conversion' : getTemperatureFormula(fromUnit, 'r');
                        break;
                }
                
                tempResult.value = result.toFixed(2);
                tempFormula.textContent = `Formula: ${formula}`;
            }
        }
        
        function getTemperatureFormula(from, to) {
            switch(from + to) {
                case 'cf': return '°F = (°C × 9/5) + 32';
                case 'ck': return 'K = °C + 273.15';
                case 'cr': return '°R = (°C + 273.15) × 9/5';
                case 'fc': return '°C = (°F - 32) × 5/9';
                case 'fk': return 'K = (°F - 32) × 5/9 + 273.15';
                case 'fr': return '°R = °F + 459.67';
                case 'kc': return '°C = K - 273.15';
                case 'kf': return '°F = (K - 273.15) × 9/5 + 32';
                case 'kr': return '°R = K × 9/5';
                case 'rc': return '°C = (°R - 491.67) × 5/9';
                case 'rf': return '°F = °R - 459.67';
                case 'rk': return 'K = °R × 5/9';
                default: return 'Direct conversion';
            }
        }
        
        tempInput.addEventListener('input', convertTemperature);
        tempFrom.addEventListener('change', convertTemperature);
        tempTo.addEventListener('change', convertTemperature);
        
        // Initialize with default values
        convertTemperature();
    }
    
    // Data Size Converter
    function initDataConverter() {
        const dataInput = document.getElementById('data-input');
        const dataFrom = document.getElementById('data-from');
        const dataTo = document.getElementById('data-to');
        const dataResult = document.getElementById('data-result');
        const dataFormula = document.getElementById('data-formula');
        
        // Conversion to bytes
        const dataToBytes = {
            b: 1,
            kb: 1000,
            mb: 1000000,
            gb: 1000000000,
            tb: 1000000000000,
            pb: 1000000000000000,
            kib: 1024,
            mib: 1048576,
            gib: 1073741824,
            tib: 1099511627776,
            pib: 1125899906842624
        };
        
        function convertData() {
            const fromUnit = dataFrom.value;
            const toUnit = dataTo.value;
            const inputValue = parseFloat(dataInput.value);
            
            if (!isNaN(inputValue)) {
                // Convert to bytes first, then to target unit
                const bytes = inputValue * dataToBytes[fromUnit];
                const result = bytes / dataToBytes[toUnit];
                
                dataResult.value = result.toFixed(result < 0.01 ? 8 : result < 1 ? 6 : 3);
                
                // Update formula
                const conversionFactor = dataToBytes[fromUnit] / dataToBytes[toUnit];
                const formula = `1 ${fromUnit} = ${conversionFactor} ${toUnit}`;
                dataFormula.textContent = `Formula: ${formula}`;
            }
        }
        
        dataInput.addEventListener('input', convertData);
        dataFrom.addEventListener('change', convertData);
        dataTo.addEventListener('change', convertData);
        
        // Initialize with default values
        convertData();
    }
    
    // Calculator
    function initCalculator() {
        const calculator = {
            displayValue: '0',
            firstOperand: null,
            waitingForSecondOperand: false,
            operator: null,
        };
        
        const calculatorDisplay = document.getElementById('calculator-result');
        const keys = document.querySelector('.calculator-keys');
        
        function updateDisplay() {
            calculatorDisplay.value = calculator.displayValue;
        }
        
        function resetCalculator() {
            calculator.displayValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }
        
        function inputDigit(digit) {
            const { displayValue, waitingForSecondOperand } = calculator;
            
            if (waitingForSecondOperand) {
                calculator.displayValue = digit;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
            }
        }
        
        function inputDecimal(dot) {
            if (calculator.waitingForSecondOperand) {
                calculator.displayValue = '0.';
                calculator.waitingForSecondOperand = false;
                return;
            }
            
            if (!calculator.displayValue.includes(dot)) {
                calculator.displayValue += dot;
            }
        }
        
        function handleOperator(nextOperator) {
            const { firstOperand, displayValue, operator } = calculator;
            const inputValue = parseFloat(displayValue);
            
            if (operator && calculator.waitingForSecondOperand) {
                calculator.operator = nextOperator;
                return;
            }
            
            if (firstOperand === null && !isNaN(inputValue)) {
                calculator.firstOperand = inputValue;
            } else if (operator) {
                const result = calculate(firstOperand, inputValue, operator);
                calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
                calculator.firstOperand = result;
            }
            
            calculator.waitingForSecondOperand = true;
            calculator.operator = nextOperator;
        }
        
        function calculate(firstOperand, secondOperand, operator) {
            switch (operator) {
                case 'add':
                    return firstOperand + secondOperand;
                case 'subtract':
                    return firstOperand - secondOperand;
                case 'multiply':
                    return firstOperand * secondOperand;
                case 'divide':
                    return firstOperand / secondOperand;
                default:
                    return secondOperand;
            }
        }
        
        function handlePercent() {
            const { displayValue } = calculator;
            const value = parseFloat(displayValue) / 100;
            calculator.displayValue = String(value);
        }
        
        function handleSignChange() {
            const { displayValue } = calculator;
            const value = parseFloat(displayValue) * -1;
            calculator.displayValue = String(value);
        }
        
        keys.addEventListener('click', (event) => {
            const { target } = event;
            
            if (!target.matches('button')) {
                return;
            }
            
            if (target.classList.contains('key-operator')) {
                handleOperator(target.dataset.action);
                updateDisplay();
                return;
            }
            
            if (target.classList.contains('key-equals')) {
                handleOperator('equals');
                updateDisplay();
                return;
            }
            
            if (target.classList.contains('key-clear')) {
                resetCalculator();
                updateDisplay();
                return;
            }
            
            if (target.classList.contains('key-decimal')) {
                inputDecimal('.');
                updateDisplay();
                return;
            }
            
            if (target.classList.contains('key-percent')) {
                handlePercent();
                updateDisplay();
                return;
            }
            
            if (target.classList.contains('key-sign')) {
                handleSignChange();
                updateDisplay();
                return;
            }
            
            if (target.classList.contains('key-number')) {
                inputDigit(target.dataset.digit);
                updateDisplay();
                return;
            }
        });
        
        // Initialize calculator display
        updateDisplay();
    }
    
    // Initialize the first tab's common conversions
    updateCommonConversions('weight');
    
    // Add event listeners for tab links in the footer
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            const tabButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
            if (tabButton) {
                tabButton.click();
                // Scroll to the tab container
                document.querySelector('.tab-container').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add event listeners for SEO tracking
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Track tab change events - this would connect to analytics in a real implementation
            trackEvent('tab_change', { 
                category: 'conversion',
                tab: this.getAttribute('data-tab')
            });
        });
    });
    
    // Track conversion events
    ['weight', 'length', 'volume', 'temp', 'data'].forEach(type => {
        const input = document.getElementById(`${type}-input`);
        if (input) {
            input.addEventListener('change', function() {
                trackEvent('conversion_performed', {
                    category: type,
                    from: document.getElementById(`${type}-from`).value,
                    to: document.getElementById(`${type}-to`).value
                });
            });
        }
    });
    
    // Mock tracking function - would be replaced with actual analytics implementation
    function trackEvent(eventName, params) {
        // This would connect to Google Analytics, Matomo, etc.
        console.log(`Event tracked: ${eventName}`, params);
        
        // Example implementation with Google Analytics
        // if (typeof gtag === 'function') {
        //     gtag('event', eventName, params);
        // }
    }
});
