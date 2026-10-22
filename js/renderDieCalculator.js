function renderDieCalculator(dieNumber, numPatch) {

    let die = null;

    // ================================
    // SEARCH SQUARE DIES (shape 101)
    // ================================
    if (typeof ACCUQUILT !== "undefined" &&
        Array.isArray(ACCUQUILT[101])) {

        die = ACCUQUILT[101].find(d => d.number == dieNumber);
    }

    // ================================
    // SEARCH RECTANGLE DIES (shape 102)
    // ================================
    if (!die &&
        typeof ACCUQUILT !== "undefined" &&
        Array.isArray(ACCUQUILT[102])) {

        die = ACCUQUILT[102].find(d => d.number == dieNumber);
    }

    // ================================
    // IF STILL NOT FOUND
    // ================================
    if (!die) {
        return `<p>Die #${dieNumber} not found in lookup tables.</p>`;
    }

    // ================================
    // EXTRACT DIE FIELDS
    // ================================
    const {
        number,
        name,
        size,
        widthGrain,
        lengthGrain,
        image,
        imageAlt,
        affiliate,
        patches,
        dieType,
        qubeSize,
        qubeShape,
        boardSize,
        cutter,
        video,
        assembly
    } = die;

    // Lookup tables
    const shapeLookup = {
        101: "Square",
        102: "Rectangle"
    };

    const matLookup = {
        510: '5" x 10"',
        66: '6" x 6"',
        612: '6" x 12"',
        624: '6" x 24"',
        1010: '10" x 10"',
        1024: '10" x 24"',
        1416: '14" x 16"'
    };

    const cutterLookup = {
        1: "GO! Baby, GO! Me",
        12: "GO! Baby, GO! Me<br>GO Fabric Cutter",
        123: "GO! Baby, GO! Me<br>GO Fabric Cutter, GO! Big",
        23: "GO Fabric Cutter, GO! Big",
        3: "GO! Big"
    };

    const type = shapeLookup[die.shape] || "Patch";
    const mat = matLookup[boardSize] || "";
    const machine = cutterLookup[cutter] || "";

    // Patch math
    const numPatchCuts = numPatch / patches;

    // Fabric calculator
    const results = fabCalc(numPatchCuts, widthGrain, lengthGrain);

    // ================================
    // BUILD HTML
    // ================================
    let html = `
        <h3 class="w3-center">QuiltNotes™ Calculators<br>${name}<br>AccuQuilt Die #${dieNumber}</h3>

        <p><b>Cutting Mat Size:</b> ${mat}<br>
           <b>Cutters:</b> ${machine}</p>
    `;

    if (assembly) {
        html += `<p><a href="${assembly}" target="_blank"><b>Download Assembly Instructions</b></a></p>`;
    }

    if (affiliate) {
        html += `
            <p><a href="${affiliate}" target="_blank">
                <img src="../images/accuquilt/${image}" alt="${imageAlt}" style="width:60%">
            </a></p>
            <p>Click image for more information</p>
        `;
    } else {
        html += `<p><img src="../images/accuquilt/${image}" alt="${imageAlt}" style="width:60%"></p>`;
    }

    if (video) {
        html += `<p><a href="${video}" target="_blank"><img src="../images/Video-icon.png" style="width:100px"></a></p>`;
    }

    html += `
        <p><b>Number of ${type}s:</b> ${numPatch}</p>
        <p><b>Fabric:</b> ${results[1]} inches or ${results[2]} yards</p>

        <ol>
            <li>Cut ${results[0]} strips @ ${lengthGrain}" × WOF.</li>
            <li>Fanfold into ${widthGrain}" widths.</li>
            <li>Place up to 6 layers on blade and cut ${numPatch} patches.</li>
        </ol>
    `;

    return html;
}


