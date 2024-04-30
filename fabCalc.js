 // Function to calculate fabric and return output values
        function fabCalc(numNeeded, width, length) {
            // Find number of strips
            let strips = Math.ceil((numNeeded * width) / 40);

            // Find inches of fabric needed
            let fabIn = Math.ceil(strips * length);

            // Find yards with 2 decimal places
            let ydsFabIn = fabIn / 36;
            let fabYd = ydsFabIn.toFixed(2);

            const fabResults = [strips, fabIn, fabYd];

            // Return values
            console.log(fabResults); // Log the result before returning
            return fabResults;
