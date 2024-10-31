// Handle game start click
document.querySelector(".control-buttons span").onclick = function () {
  // Get player name
  let yourName = prompt("Whats Your Name?");

  // Set player name or default to "Unknown"
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  // Remove start screen
  document.querySelector(".control-buttons").remove();
};

// Effect duration
let duration = 1000;

// select blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");

// create array from game blocks
let blocks = Array.from(blocksContainer.children);

// create range of keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// set blocks order style
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // add click event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");
  // collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // if theres two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();
    // check matched block function
    checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// stop clicking function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // remove class no clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//check matched block
function checkMatchedBlock(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("succes").play();
  } else {
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    document.getElementById("fail").play();
  }
}

// Shuffle Function
function shuffle(array) {
  // settings vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    //get random number
    random = Math.floor(Math.random() * current);

    //decrease length by one
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
