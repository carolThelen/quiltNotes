function renderDieGallery(options) {
  var category = options.category;
  var containerId = options.containerId;
  var heading = options.heading || "";
  var imageWidth = options.imageWidth || 100;

  var container = document.getElementById(containerId);

  if (!container) {
    console.log("Gallery container not found: " + containerId);
    return;
  }

  if (
    typeof ACCUQUILT === "undefined" ||
    !ACCUQUILT[category] ||
    !ACCUQUILT[category].length
  ) {
    console.log("No dies found in ACCUQUILT[" + category + "]");
    return;
  }

  // Prevent duplicate output if the function is called twice.
  container.innerHTML = "";

  if (heading) {
    var galleryHeading = document.createElement("h2");
    galleryHeading.textContent = heading;
    container.appendChild(galleryHeading);
  }

  var galleryWrapper = document.createElement("div");
  galleryWrapper.className = "w3-row-padding";

  var sortedDies = ACCUQUILT[category].slice().sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  sortedDies.forEach(function(die) {
    var gallery = document.createElement("div");
    gallery.className = "w3-col s6 m4 l3 w3-center";
    gallery.style.minHeight = "220px";

    var imageWrapper = document.createElement("div");
    imageWrapper.className = "w3-center";

    var image = document.createElement("img");

    image.src =
      "https://cdn.jsdelivr.net/gh/carolThelen/quiltNotes@main/images/accuquilt/" +
      die.image;

    image.alt = die.imageAlt || die.name;
    image.width = imageWidth;
    image.loading = "lazy";

    if (die.url) {
      var imageLink = document.createElement("a");
      imageLink.href = die.url;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.appendChild(image);
      imageWrapper.appendChild(imageLink);
    } else {
      imageWrapper.appendChild(image);
    }

    var desc = document.createElement("div");
    desc.className = "w3-center";
    desc.textContent = die.name;

    gallery.appendChild(imageWrapper);
    gallery.appendChild(desc);
    galleryWrapper.appendChild(gallery);
  });

  container.appendChild(galleryWrapper);
}
