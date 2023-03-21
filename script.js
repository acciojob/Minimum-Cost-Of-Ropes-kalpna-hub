// Get the input element and the result div
const input = document.getElementById("input");
const resultDiv = document.getElementById("result");

// Add an event listener for the form submission
document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting and reloading the page
  
  const inputValues = input.value.split(",").map(value => parseInt(value.trim())); // Parse the comma-separated values and convert them to integers
  const minCost = connectRopes(inputValues); // Call the connectRopes function to get the minimum cost
  
  resultDiv.innerText = `Minimum cost of connecting the ropes: ${minCost}`; // Update the result div with the minimum cost
});

function connectRopes(ropes) {
  let minCost = 0;
  const minHeap = new MinHeap(ropes); // Create a min heap from the ropes array
  
  while (minHeap.size() > 1) {
    const rope1 = minHeap.extractMin(); // Remove the smallest rope from the heap
    const rope2 = minHeap.extractMin(); // Remove the second smallest rope from the heap
    const newRope = rope1 + rope2; // Connect the two ropes
    minCost += newRope; // Add the cost of connecting the two ropes to the total cost
    minHeap.insert(newRope); // Add the new rope to the heap
  }
  
  return minCost;
}

// Implementation of a min heap
class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }
  
  buildHeap(array) {
    const firstParentIndex = Math.floor((array.length - 2) / 2);
    for (let i = firstParentIndex; i >= 0; i--) {
      this.siftDown(i, array.length - 1, array);
    }
    return array;
  }
  
  size() {
    return this.heap.length;
  }
  
  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }
  
  extractMin() {
    this.swap(0, this.heap.length - 1, this.heap);
    const minValue = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return minValue;
  }
  
  siftUp(index, heap) {
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && heap[index] < heap[parentIndex]) {
      this.swap(index, parentIndex, heap);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }
  
  siftDown(index, endIndex, heap) {
    let child1Index = index * 2 + 1;
    while (child1Index <= endIndex) {
      const child2Index = index * 2 + 2 <= endIndex ? index * 2 + 2 : -1;
      let indexToSwap;
      if (child2Index !== -1 && heap[child2Index] < heap[child1Index]) {
        indexToSwap = child2Index;
      } else {
        indexToSwap = child1Index;
      }
      if (heap[indexToSwap] < heap[index]) {
        this.swap(index, indexToSwap, heap);
        index = indexToSwap;
        child1Index = index * 2 + 1;
      } else {
        return;
      }
    }
  }
  
  swap(i, j, array) {
    const temp =
