// Get the input element and the result element
const input = document.querySelector('input[type="text"]');
const result = document.querySelector('#result');

// Function to calculate the minimum cost of connecting ropes
function connectRopes(arr) {
  // Create a min heap or priority queue of rope lengths
  const pq = new MinPriorityQueue();
  arr.forEach(len => pq.enqueue(len, len));

  let cost = 0;
  // Connect ropes until only one rope is left
  while (pq.size() > 1) {
    // Get the two smallest ropes
    const rope1 = pq.dequeue().element;
    const rope2 = pq.dequeue().element;

    // Connect the ropes and add the cost
    const newRope = rope1 + rope2;
    cost += newRope;

    // Add the new rope to the min heap
    pq.enqueue(newRope, newRope);
  }

  // Return the total cost
  return cost;
}

// Add a submit event listener to the input element
input.addEventListener('submit', event => {
  event.preventDefault();
  // Get the rope lengths as an array of integers
  const arr = input.value.split(',').map(Number);
  // Calculate the minimum cost of connecting the ropes
  const minCost = connectRopes(arr);
  // Display the result
  result.textContent = `Minimum cost: ${minCost}`;
});
