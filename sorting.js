// ==========================================
// BUBBLE SORT
// ==========================================

async function bubbleSort() {

    var n = array.length;

    for (var i = 0; i < n - 1; i++) {

        for (var j = 0; j < n - i - 1; j++) {

            comparisons++;
            updateStatistics();

            colorBar(j, "compare");
            colorBar(j + 1, "compare");

            await sleep(delay);

            if (array[j] > array[j + 1]) {

                colorBar(j, "swap");
                colorBar(j + 1, "swap");

                swap(j, j + 1);

                updateBars();

                await sleep(delay);

                removeColor(j, "swap");
                removeColor(j + 1, "swap");

            }

            removeColor(j, "compare");
            removeColor(j + 1, "compare");

        }

    }

    await finishSorting();

}



// ==========================================
// SELECTION SORT
// ==========================================

async function selectionSort() {

    var n = array.length;

    for (var i = 0; i < n - 1; i++) {

        var minIndex = i;

        colorBar(minIndex, "minimum");

        for (var j = i + 1; j < n; j++) {

            comparisons++;
            updateStatistics();

            colorBar(j, "compare");

            await sleep(delay);

            if (array[j] < array[minIndex]) {

                removeColor(minIndex, "minimum");

                minIndex = j;

                colorBar(minIndex, "minimum");

            }

            removeColor(j, "compare");

        }

        if (minIndex != i) {

            colorBar(i, "swap");
            colorBar(minIndex, "swap");

            swap(i, minIndex);

            updateBars();

            await sleep(delay);

            removeColor(i, "swap");
            removeColor(minIndex, "swap");

        }

        removeColor(minIndex, "minimum");

    }

    await finishSorting();

}



// ==========================================
// INSERTION SORT
// ==========================================

async function insertionSort() {

    var n = array.length;

    for (var i = 1; i < n; i++) {

        var key = array[i];

        var j = i - 1;

        colorBar(i, "compare");

        await sleep(delay);

        while (j >= 0 && array[j] > key) {

            comparisons++;
            updateStatistics();

            colorBar(j, "compare");

            array[j + 1] = array[j];

            swaps++;

            updateStatistics();

            updateBars();

            await sleep(delay);

            removeColor(j, "compare");

            j--;

        }

        array[j + 1] = key;

        updateBars();

        removeColor(i, "compare");

    }

    await finishSorting();

}



// ==========================================
// QUICK SORT
// ==========================================

async function quickSort(low, high) {

    if (low < high) {

        var pivotIndex = await partition(low, high);

        await quickSort(low, pivotIndex - 1);

        await quickSort(pivotIndex + 1, high);

    }

}



// ==========================================
// PARTITION FUNCTION
// ==========================================

async function partition(low, high) {

    var pivot = array[high];

    colorBar(high, "pivot");

    var i = low - 1;

    for (var j = low; j < high; j++) {

        comparisons++;
        updateStatistics();

        colorBar(j, "compare");

        await sleep(delay);

        if (array[j] < pivot) {

            i++;

            colorBar(i, "swap");
            colorBar(j, "swap");

            swap(i, j);

            updateBars();

            await sleep(delay);

            removeColor(i, "swap");
            removeColor(j, "swap");

        }

        removeColor(j, "compare");

    }

    swap(i + 1, high);

    updateBars();

    removeColor(high, "pivot");

    return i + 1;

}
// ==========================================
// MERGE SORT
// ==========================================

async function mergeSort(left, right) {

    if (left >= right) {
        return;
    }

    var middle = Math.floor((left + right) / 2);

    await mergeSort(left, middle);

    await mergeSort(middle + 1, right);

    await merge(left, middle, right);

}



// ==========================================
// MERGE FUNCTION
// ==========================================

async function merge(left, middle, right) {

    var leftArray = [];
    var rightArray = [];

    var i;
    var j;
    var k;

    for (i = left; i <= middle; i++) {
        leftArray.push(array[i]);
    }

    for (i = middle + 1; i <= right; i++) {
        rightArray.push(array[i]);
    }

    i = 0;
    j = 0;
    k = left;

    while (i < leftArray.length && j < rightArray.length) {

        comparisons++;
        updateStatistics();

        colorBar(k, "compare");

        await sleep(delay);

        if (leftArray[i] <= rightArray[j]) {

            array[k] = leftArray[i];
            i++;

        } else {

            array[k] = rightArray[j];
            j++;

        }

        swaps++;
        updateStatistics();

        updateBars();

        removeColor(k, "compare");

        k++;

    }

    while (i < leftArray.length) {

        array[k] = leftArray[i];

        swaps++;

        updateStatistics();

        updateBars();

        await sleep(delay);

        i++;
        k++;

    }

    while (j < rightArray.length) {

        array[k] = rightArray[j];

        swaps++;

        updateStatistics();

        updateBars();

        await sleep(delay);

        j++;
        k++;

    }

}



// ==========================================
// HEAP SORT
// ==========================================

async function heapSort() {

    var n = array.length;

    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {

        await heapify(n, i);

    }

    for (var i = n - 1; i > 0; i--) {

        colorBar(0, "swap");
        colorBar(i, "swap");

        swap(0, i);

        updateBars();

        await sleep(delay);

        removeColor(0, "swap");
        removeColor(i, "swap");

        await heapify(i, 0);

    }

    await finishSorting();

}



// ==========================================
// HEAPIFY
// ==========================================

async function heapify(size, root) {

    var largest = root;

    var left = (2 * root) + 1;
    var right = (2 * root) + 2;

    if (left < size) {

        comparisons++;
        updateStatistics();

        colorBar(left, "compare");
        colorBar(largest, "compare");

        await sleep(delay);

        if (array[left] > array[largest]) {

            largest = left;

        }

        removeColor(left, "compare");
        removeColor(root, "compare");

    }

    if (right < size) {

        comparisons++;
        updateStatistics();

        colorBar(right, "compare");
        colorBar(largest, "compare");

        await sleep(delay);

        if (array[right] > array[largest]) {

            largest = right;

        }

        removeColor(right, "compare");
        removeColor(root, "compare");

    }

    if (largest != root) {

        colorBar(root, "swap");
        colorBar(largest, "swap");

        swap(root, largest);

        updateBars();

        await sleep(delay);

        removeColor(root, "swap");
        removeColor(largest, "swap");

        await heapify(size, largest);

    }

}
// ==========================================
// SHELL SORT
// ==========================================

async function shellSort() {

    var n = array.length;

    for (var gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {

        for (var i = gap; i < n; i++) {

            var temp = array[i];

            var j = i;

            while (j >= gap && array[j - gap] > temp) {

                comparisons++;
                updateStatistics();

                colorBar(j, "compare");
                colorBar(j - gap, "compare");

                await sleep(delay);

                array[j] = array[j - gap];

                swaps++;
                updateStatistics();

                updateBars();

                removeColor(j, "compare");
                removeColor(j - gap, "compare");

                j = j - gap;

            }

            array[j] = temp;

            updateBars();

            await sleep(delay);

        }

    }

    await finishSorting();

}



// ==========================================
// BUCKET SORT
// ==========================================

async function bucketSort() {

    if (array.length == 0) {
        await finishSorting();
        return;
    }

    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);

    var bucketCount = 10;
    var buckets = [];

    for (var i = 0; i < bucketCount; i++) {
        buckets.push([]);
    }

    var bucketSize = Math.floor((max - min) / bucketCount) + 1;

    for (var i = 0; i < array.length; i++) {

        var index = Math.floor((array[i] - min) / bucketSize);

        buckets[index].push(array[i]);

    }

    var position = 0;

    for (var i = 0; i < buckets.length; i++) {

        buckets[i].sort(function (a, b) {
            return a - b;
        });

        for (var j = 0; j < buckets[i].length; j++) {

            array[position] = buckets[i][j];

            swaps++;
            updateStatistics();

            updateBars();

            colorBar(position, "swap");

            await sleep(delay);

            removeColor(position, "swap");

            position++;

        }

    }

    await finishSorting();

}



// ==========================================
// RADIX SORT
// ==========================================

async function radixSort() {

    var max = getMaximumValue();

    for (var place = 1; Math.floor(max / place) > 0; place = place * 10) {

        await countingSort(place);

    }

    await finishSorting();

}



// ==========================================
// COUNTING SORT (USED BY RADIX SORT)
// ==========================================

async function countingSort(place) {

    var output = [];
    var count = [];

    var i;

    for (i = 0; i < 10; i++) {
        count[i] = 0;
    }

    for (i = 0; i < array.length; i++) {

        var digit = Math.floor(array[i] / place) % 10;

        count[digit]++;

    }

    for (i = 1; i < 10; i++) {

        count[i] = count[i] + count[i - 1];

    }

    for (i = array.length - 1; i >= 0; i--) {

        var digit = Math.floor(array[i] / place) % 10;

        output[count[digit] - 1] = array[i];

        count[digit]--;

    }

    for (i = 0; i < array.length; i++) {

        array[i] = output[i];

        swaps++;
        updateStatistics();

        colorBar(i, "swap");

        updateBars();

        await sleep(delay);

        removeColor(i, "swap");

    }

}



// ==========================================
// GET MAXIMUM VALUE
// ==========================================

function getMaximumValue() {

    var max = array[0];

    for (var i = 1; i < array.length; i++) {

        if (array[i] > max) {

            max = array[i];

        }

    }

    return max;

}