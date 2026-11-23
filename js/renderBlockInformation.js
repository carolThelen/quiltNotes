(function (global) {

    "use strict";


    /*
     * ==========================================
     * QUILTNOTES BLOCK INFORMATION TEMPLATE
     * ==========================================
     *
     * Required lookup:
     *
     *     BLOCKS[101]
     *
     * The calculator page supplies only the
     * block number.
     *
     * Example:
     *
     *     const BLOCK_NUMBER = 120;
     *
     *     const block =
     *         QuiltNotesBlocks.initialize(
     *             BLOCK_NUMBER
     *         );
     *
     * ==========================================
     */


    const BLOCK_CATEGORY = 101;

    const IMAGE_BASE =
        "https://cdn.jsdelivr.net/gh/CarolThelen/quiltNotes@main/images/";


    /*
     * ==========================================
     * INITIALIZE BLOCK
     * ==========================================
     *
     * Finds the requested block and renders the
     * introductory information in #blockInfo.
     *
     * Returns the complete block record so the
     * calculator can use it in the results.
     */

    function initialize(
        blockNumber,
        options
    ) {

        const settings =
            normalizeOptions(options);

        const block =
            findBlock(
                settings.category,
                blockNumber
            );


        renderBlockInformation(
            block,
            settings.infoContainerId,
            blockNumber
        );


        return block;

    }



    /*
     * ==========================================
     * FIND BLOCK
     * ==========================================
     */

    function findBlock(
        category,
        blockNumber
    ) {

        if (
            typeof global.BLOCKS === "undefined" ||
            !Array.isArray(
                global.BLOCKS[category]
            )
        ) {

            return null;

        }


        return (
            global.BLOCKS[category]
                .find(function (item) {

                    return (
                        Number(item.number) ===
                        Number(blockNumber)
                    );

                }) ||
            null
        );

    }



    /*
     * ==========================================
     * INTRODUCTORY BLOCK INFORMATION
     * ==========================================
     *
     * Displays before the calculator form:
     *
     *     blkName
     *     image
     *     imageAlt
     *     comments
     *     video
     *     videoAlt
     *     qImage
     *     qImageAlt
     *     qImage2
     *     qImage2Alt
     *     instructions
     *     eq8
     *     test-block reminder
     */

    function renderBlockInformation(
        block,
        containerId,
        blockNumber
    ) {

        const container =
            document.getElementById(
                containerId || "blockInfo"
            );


        if (!container) {
            return;
        }


        if (!block) {

            container.innerHTML = `
                <p class="w3-center">
                    Block ${escapeText(blockNumber)}
                    was not found in
                    BLOCKS[${BLOCK_CATEGORY}].
                </p>

                <p class="w3-center">
                    *** Always Cut and Piece
                    A Test Block ***
                </p>
            `;

            return;
        }


        let html = `
            <h3 class="w3-center">
                QuiltNotes&trade;.com Calculators
                <br>
                ${escapeText(
                    getBlockName(block)
                )}
            </h3>
        `;


        /*
         * Main block image
         */

        if (
            hasValue(
                block.image
            )
        ) {

            html += `
                <p class="w3-center">
                    <img
                        src="${escapeAttribute(
                            buildImageUrl(
                                block.image
                            )
                        )}"
                        style="
                            width:40%;
                            max-width:100%;
                            height:auto;
                        "
                        alt="${escapeAttribute(
                            block.imageAlt ||
                            getBlockName(block) ||
                            "Quilt block"
                        )}"
                    >
                </p>
            `;

        }


        /*
         * Comments
         *
         * Intentionally rendered as HTML.
         *
         * The comments field may contain:
         *
         *     p
         *     br
         *     strong
         *     ol
         *     ul
         *     li
         *     img
         *     a
         */

        if (
            hasValue(
                block.comments
            )
        ) {

            html += `
                <div class="block-comments">
                    ${block.comments}
                </div>
            `;

        }


        /*
         * Video
         */

        if (
            hasValue(
                block.video
            )
        ) {

            html += `
                <p class="w3-center">
                    <a
                        href="${escapeAttribute(
                            block.video
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="${IMAGE_BASE}Video-icon.png"
                            style="
                                width:10%;
                                max-width:100%;
                                height:auto;
                            "
                            alt="${escapeAttribute(
                                block.videoAlt ||
                                "Watch video"
                            )}"
                        >
                    </a>
                </p>
            `;

        }


        /*
         * Quilt image 1
         */

        if (
            hasValue(
                block.qImage
            )
        ) {

            html += `
                <p class="w3-center">
                    <img
                        src="${escapeAttribute(
                            buildImageUrl(
                                block.qImage
                            )
                        )}"
                        style="
                            width:40%;
                            max-width:100%;
                            height:auto;
                        "
                        alt="${escapeAttribute(
                            block.qImageAlt ||
                            "Quilt image"
                        )}"
                    >
                </p>
            `;

        }


        /*
         * Quilt image 2
         */

        if (
            hasValue(
                block.qImage2
            )
        ) {

            html += `
                <p class="w3-center">
                    <img
                        src="${escapeAttribute(
                            buildImageUrl(
                                block.qImage2
                            )
                        )}"
                        style="
                            width:40%;
                            max-width:100%;
                            height:auto;
                        "
                        alt="${escapeAttribute(
                            block.qImage2Alt ||
                            "Additional quilt image"
                        )}"
                    >
                </p>
            `;

        }


        /*
         * Downloadable block instructions
         */

        if (
            hasValue(
                block.instructions
            )
        ) {

            html += `
                <p class="w3-center">
                    <a
                        href="${escapeAttribute(
                            block.instructions
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Block Instructions
                    </a>
                </p>
            `;

        }


        /*
         * Downloadable EQ8 file
         */

        if (
            hasValue(
                block.eq8
            )
        ) {

            html += `
                <p class="w3-center">
                    <a
                        href="${escapeAttribute(
                            block.eq8
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download EQ8 File
                    </a>
                </p>
            `;

        }


        /*
         * Test-block reminder
         */

        html += `
            <p class="w3-center">
                *** Always Cut and Piece
                A Test Block ***
            </p>
        `;


        container.innerHTML =
            html;

    }



    /*
     * ==========================================
     * RESULTS HEADER
     * ==========================================
     *
     * Displays at the top of the calculated
     * results:
     *
     *     diagram
     *     diagramAlt
     *     calculator heading
     *
     * Use:
     *
     *     output +=
     *         QuiltNotesBlocks.renderResultsHeader(
     *             block
     *         );
     */

    function renderResultsHeader(
        block,
        options
    ) {

        const settings =
            normalizeOptions(options);


        let html = `
            <hr class="new1">
        `;


        /*
         * Results diagram
         */

        html +=
            renderDiagram(
                block,
                settings.diagramWidth
            );


        /*
         * Results heading
         */

        html += `
            <h3 class="w3-center">
                QuiltNotes&trade;.com Calculators
                <br>
                ${escapeText(
                    getBlockName(block)
                )}
            </h3>
        `;


        return html;

    }



    /*
     * ==========================================
     * RESULTS DIAGRAM
     * ==========================================
     *
     * Displays:
     *
     *     diagram
     *     diagramAlt
     */

 function renderDiagram(
    block,
    width
) {

    if (
        !block ||
        !hasValue(block.diagram)
    ) {
        return "";
    }


    const filename =
        String(block.diagram)
            .trim()
            .replace(/^\/+/, "");


    const jsDelivrUrl =
        buildImageUrl(filename);


    const githubRawUrl =
        "https://raw.githubusercontent.com/" +
        "CarolThelen/quiltNotes/main/images/" +
        filename;


    const diagramWidth =
        normalizeWidth(
            width,
            "40%"
        );


    return `
        <p class="w3-center">

            <img
                src="${escapeAttribute(
                    jsDelivrUrl
                )}"

                data-fallback="${escapeAttribute(
                    githubRawUrl
                )}"

                style="
                    width:${diagramWidth};
                    max-width:100%;
                    height:auto;
                "

                alt="${escapeAttribute(
                    block.diagramAlt ||
                    getBlockName(block) ||
                    "Block diagram"
                )}"

                onerror="
                    if (
                        this.dataset.fallback &&
                        this.src !== this.dataset.fallback
                    ) {
                        this.src =
                            this.dataset.fallback;
                    } else {
                        this.onerror = null;
                    }
                "
            >

        </p>
    `;

}


    /*
     * ==========================================
     * PIECING INSTRUCTIONS
     * ==========================================
     *
     * Displays below the calculated results.
     *
     * Primary field:
     *
     *     piecing
     *
     * Earlier spelling also supported:
     *
     *     piecig
     *
     * Use:
     *
     *     output +=
     *         QuiltNotesBlocks.renderPiecing(
     *             block
     *         );
     *
     * The field is intentionally rendered as
     * HTML and may contain:
     *
     *     p
     *     ol
     *     ul
     *     li
     *     img
     *     a
     *     strong
     */

    function renderPiecing(
        block,
        options
    ) {

        if (!block) {
            return "";
        }


        const piecing =
            hasValue(block.piecing)
                ? block.piecing
                : block.piecig;


        if (
            !hasValue(
                piecing
            )
        ) {

            return "";

        }


        const settings =
            normalizeOptions(options);

        const heading =
            hasValue(
                settings.piecingHeading
            )
                ? settings.piecingHeading
                : "Piecing";


        return `
            <hr
                style="
                    height:2px;
                    border-width:0;
                    color:gray;
                    background-color:gray;
                "
            >

            <div class="w3-container block-piecing">

                <p class="w3-center">
                    <b>
                        ${escapeText(
                            heading
                        )}
                    </b>
                </p>

                ${piecing}

            </div>

            <hr
                style="
                    height:2px;
                    border-width:0;
                    color:gray;
                    background-color:gray;
                "
            >
        `;

    }



    /*
     * ==========================================
     * OPTIONAL COMPLETE RESULTS WRAPPER
     * ==========================================
     *
     * This helper can wrap already-created
     * calculator results between the diagram
     * header and the piecing instructions.
     *
     * Example:
     *
     *     output =
     *         QuiltNotesBlocks.wrapResults(
     *             block,
     *             calculatorResults
     *         );
     */

    function wrapResults(
        block,
        calculatorResults,
        options
    ) {

        return (
            renderResultsHeader(
                block,
                options
            ) +

            (
                calculatorResults ||
                ""
            ) +

            renderPiecing(
                block,
                options
            )
        );

    }



    /*
     * ==========================================
     * BUILD IMAGE URL
     * ==========================================
     *
     * A filename:
     *
     *     120-diagram.jpg
     *
     * becomes:
     *
     *     IMAGE_BASE + 120-diagram.jpg
     *
     * A complete URL is used unchanged.
     */

    function buildImageUrl(
        imageValue
    ) {

        if (
            !hasValue(
                imageValue
            )
        ) {

            return "";

        }


        const value =
            String(
                imageValue
            ).trim();


        if (
            value.startsWith(
                "https://"
            ) ||
            value.startsWith(
                "http://"
            )
        ) {

            return value;

        }


        return (
            IMAGE_BASE +
            value.replace(
                /^\/+/,
                ""
            )
        );

    }



    /*
     * ==========================================
     * BLOCK NAME
     * ==========================================
     */

    function getBlockName(
        block
    ) {

        if (!block) {
            return "Quilt Block";
        }


        if (
            hasValue(
                block.blkName
            )
        ) {

            return block.blkName;

        }


        if (
            hasValue(
                block.galleryName
            )
        ) {

            return block.galleryName;

        }


        if (
            hasValue(
                block.name
            )
        ) {

            return block.name;

        }


        return "Quilt Block";

    }



    /*
     * ==========================================
     * OPTIONAL VALUE CHECK
     * ==========================================
     */

    function hasValue(
        value
    ) {

        return (
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ""
        );

    }



    /*
     * ==========================================
     * OPTIONS
     * ==========================================
     */

    function normalizeOptions(
        options
    ) {

        const incoming =
            options &&
            typeof options === "object"
                ? options
                : {};


        return {

            category:
                Number.isFinite(
                    Number(
                        incoming.category
                    )
                )
                    ? Number(
                        incoming.category
                    )
                    : BLOCK_CATEGORY,

            infoContainerId:
                hasValue(
                    incoming.infoContainerId
                )
                    ? incoming.infoContainerId
                    : "blockInfo",

            diagramWidth:
                hasValue(
                    incoming.diagramWidth
                )
                    ? incoming.diagramWidth
                    : "40%",

            piecingHeading:
                hasValue(
                    incoming.piecingHeading
                )
                    ? incoming.piecingHeading
                    : "Piecing"

        };

    }



    /*
     * ==========================================
     * WIDTH VALIDATION
     * ==========================================
     */

    function normalizeWidth(
        value,
        fallback
    ) {

        const width =
            String(
                value || fallback
            ).trim();


        if (
            /^[0-9]+(?:\.[0-9]+)?(?:%|px|rem|em)$/
                .test(width)
        ) {

            return width;

        }


        return fallback;

    }



    /*
     * ==========================================
     * ESCAPE TEXT
     * ==========================================
     */

    function escapeText(
        value
    ) {

        return String(
            value === null ||
            value === undefined
                ? ""
                : value
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }



    /*
     * ==========================================
     * ESCAPE ATTRIBUTE
     * ==========================================
     */

    function escapeAttribute(
        value
    ) {

        return escapeText(
            value
        );

    }



    /*
     * ==========================================
     * PUBLIC FUNCTIONS
     * ==========================================
     */

    global.QuiltNotesBlocks = {

        initialize:
            initialize,

        findBlock:
            findBlock,

        renderBlockInformation:
            renderBlockInformation,

        renderResultsHeader:
            renderResultsHeader,

        renderDiagram:
            renderDiagram,

        renderPiecing:
            renderPiecing,

        wrapResults:
            wrapResults,

        buildImageUrl:
            buildImageUrl,

        hasValue:
            hasValue

    };


})(window);
