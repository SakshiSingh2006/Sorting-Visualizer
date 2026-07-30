// =====================================
// GLOBAL VARIABLES
// =====================================

var array = [];
var originalArray = [];

var comparisons = 0;
var swaps = 0;

var sorting = false;
var paused = false;

var speed = 50;
var delay = 50;

var startTime = 0;
var endTime = 0;


// =====================================
// HTML ELEMENTS
// =====================================

var visualizer = document.getElementById("visualizer");

var algorithm = document.getElementById("algorithm");

var arraySize = document.getElementById("arraySize");
var speedSlider = document.getElementById("speed");

var arraySizeValue = document.getElementById("arraySizeValue");
var speedValue = document.getElementById("speedValue");

var generateBtn = document.getElementById("generateBtn");
var resetBtn = document.getElementById("resetBtn");
var startBtn = document.getElementById("startBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resumeBtn = document.getElementById("resumeBtn");

var algorithmName = document.getElementById("algorithmName");
var comparisonsText = document.getElementById("comparisons");
var swapsText = document.getElementById("swaps");
var timeText = document.getElementById("time");


// =====================================
// CREATE RANDOM ARRAY
// =====================================

function generateArray() {

    array = [];

    for (var i = 0; i < arraySize.value; i++) {

        var randomNumber = Math.floor(Math.random() * 450) + 20;

        array.push(randomNumber);

    }

    originalArray = array.slice();

    resetStatistics();

    drawBars();

}


// =====================================
// DRAW BARS
// =====================================

function drawBars() {

    visualizer.innerHTML = "";

    for (var i = 0; i < array.length; i++) {

        var bar = document.createElement("div");

        bar.className = "bar";

        bar.style.height = array[i] + "px";

        visualizer.appendChild(bar);

    }

}


// =====================================
// UPDATE BAR HEIGHTS
// =====================================

function updateBars() {

    var bars = document.getElementsByClassName("bar");

    for (var i = 0; i < bars.length; i++) {

        bars[i].style.height = array[i] + "px";

    }

}


// =====================================
// RESET ARRAY
// =====================================

function resetArray() {

    if (sorting) return;

    array = originalArray.slice();

    resetStatistics();

    drawBars();

}


// =====================================
// RESET STATISTICS
// =====================================

function resetStatistics() {

    comparisons = 0;
    swaps = 0;

    updateStatistics();

    timeText.innerHTML = "0 ms";

}


// =====================================
// UPDATE STATISTICS
// =====================================

function updateStatistics() {

    comparisonsText.innerHTML = comparisons;

    swapsText.innerHTML = swaps;

    algorithmName.innerHTML =
        algorithm.options[algorithm.selectedIndex].text;

    animateCards();

}


// =====================================
// CARD ANIMATION
// =====================================

function animateCards() {

    var cards = document.getElementsByClassName("card");

    for (var i = 0; i < cards.length; i++) {

        cards[i].classList.remove("animate");

        void cards[i].offsetWidth;

        cards[i].classList.add("animate");

    }

}


// =====================================
// CHANGE SPEED
// =====================================

speedSlider.addEventListener("input", function () {

    speed = Number(speedSlider.value);

    speedValue.innerHTML = speed;

    delay = 101 - speed;

});


// =====================================
// CHANGE ARRAY SIZE
// =====================================

arraySize.addEventListener("input", function () {

    arraySizeValue.innerHTML = arraySize.value;

    if (!sorting) {

        generateArray();

    }

});


// =====================================
// GENERATE BUTTON
// =====================================

generateBtn.addEventListener("click", function () {

    generateArray();

});


// =====================================
// RESET BUTTON
// =====================================

resetBtn.addEventListener("click", function () {

    resetArray();

});


// =====================================
// START SORTING
// =====================================

startBtn.addEventListener("click", async function () {

    if (sorting) return;

    sorting = true;

    disableControls();

    startTime = performance.now();

    var selected = algorithm.value;

    if (selected == "bubble") {

        await bubbleSort();

    }

    else if (selected == "selection") {

        await selectionSort();

    }

    else if (selected == "insertion") {

        await insertionSort();

    }

    else if (selected == "quick") {

        await quickSort(0, array.length - 1);

        await finishSorting();

    }

    else if (selected == "merge") {

        await mergeSort(0, array.length - 1);

        await finishSorting();

    }

    else if (selected == "heap") {

        await heapSort();

    }

    else if (selected == "shell") {

        await shellSort();

    }

    else if (selected == "bucket") {

        await bucketSort();

    }

    else if (selected == "radix") {

        await radixSort();

    }

});


// =====================================
// PAUSE
// =====================================

pauseBtn.addEventListener("click", function () {

    paused = true;

});


// =====================================
// RESUME
// =====================================

resumeBtn.addEventListener("click", function () {

    paused = false;

});


// =====================================
// WAIT FUNCTION
// =====================================

async function sleep(milliseconds) {

    while (paused) {

        await new Promise(function (resolve) {

            setTimeout(resolve, 100);

        });

    }

    return new Promise(function (resolve) {

        setTimeout(resolve, milliseconds);

    });

}


// =====================================
// SWAP
// =====================================

function swap(i, j) {

    var temp = array[i];

    array[i] = array[j];

    array[j] = temp;

    swaps++;

    updateStatistics();

}


// =====================================
// HIGHLIGHT BARS
// =====================================

function colorBar(index, className) {

    var bars = document.getElementsByClassName("bar");

    if (bars[index]) {

        bars[index].classList.add(className);

    }

}


// =====================================
// REMOVE COLOR
// =====================================

function removeColor(index, className) {

    var bars = document.getElementsByClassName("bar");

    if (bars[index]) {

        bars[index].classList.remove(className);

    }

}


// =====================================
// MARK ALL SORTED
// =====================================

async function markSorted() {

    var bars = document.getElementsByClassName("bar");

    for (var i = 0; i < bars.length; i++) {

        bars[i].classList.add("sorted");

        await sleep(8);

    }

}


// =====================================
// FINISH SORTING
// =====================================

async function finishSorting() {

    await markSorted();

    endTime = performance.now();

    timeText.innerHTML =
        (endTime - startTime).toFixed(2) + " ms";

    sorting = false;

    enableControls();

}


// =====================================
// DISABLE CONTROLS
// =====================================

function disableControls() {

    algorithm.disabled = true;

    arraySize.disabled = true;

    speedSlider.disabled = true;

    generateBtn.disabled = true;

    resetBtn.disabled = true;

    startBtn.disabled = true;

}


// =====================================
// ENABLE CONTROLS
// =====================================

function enableControls() {

    algorithm.disabled = false;

    arraySize.disabled = false;

    speedSlider.disabled = false;

    generateBtn.disabled = false;

    resetBtn.disabled = false;

    startBtn.disabled = false;

}


// =====================================
// INITIAL LOAD
// =====================================

generateArray();
delay = 101 - speed;