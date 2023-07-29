let inputFloor = document.getElementById("inputFloor");
let inputLift = document.getElementById("inputLift");
const homePage = document.getElementById("home-page");
const generate = document.getElementById("generate-btn");
const container = document.querySelector(".lift-container");
const firstLift = document.querySelector(".first-lift");

generate.addEventListener("click", (e) => {
  e.preventDefault();
  inputFloor = inputFloor.value;
  inputLift = inputLift.value;

  if (inputFloor > 0 && inputFloor < 100) {
    container.classList.remove("hidden");
    homePage.classList.add("hidden");

    for (let index = 1; index < inputFloor; index++) {
      container.insertAdjacentHTML(
        "afterbegin",
        ` <div class="floor-container">
            <div class="btn-container">
              <span><button class=" btn btn-up">Up</button></span>

              <span><button class=" btn btn-down">Down</button></span>
            </div>
            <div class="horizontal-flex">
              <hr/>
              <p>Floor ${index}</p>
            </div>
          </div>`
      );
    }
    container.insertAdjacentHTML(
      "afterbegin",
      ` <div class="floor-container">
          <div class="btn-container">
            <span><button class=" btn btn-down">Down</button></span>
          </div>
          <div class="horizontal-flex">
            <hr/>
            <p>Floor ${inputFloor}</p>
          </div>
        </div>`
    );

    if (window.innerWidth <= 500) {
      if (inputLift > 0 && inputLift < 4) {
        generateLifts();
      } else {
        alert(
          "As you are in Small device Enter the Value of lifts in between 0 to 4"
        );
        location.reload();
      }
    } else if (window.innerWidth > 500 && window.innerWidth <= 768) {
      if (inputLift > 0 && inputLift < 5) {
        generateLifts();
      } else {
        alert(" Enter the Value of lifts in between 0 to 5");
        location.reload();
      }
    } else if (window.innerWidth > 500 && window.innerWidth <= 1024) {
      if (inputLift > 0 && inputLift < 7) {
        generateLifts();
      } else {
        alert(" Enter the Value of lifts in between 0 to 7");
        location.reload();
      }
    } else {
      if (inputLift > 0 && inputLift < 11) {
        generateLifts();
      } else {
        alert(" Enter the Value in between 0 to 11");
        location.reload();
      }
    }

    function generateLifts() {
      for (let index = 1; index < inputLift; index++) {
        console.log("generating lift");
        firstLift.insertAdjacentHTML(
          "afterend",
          ` <div class="lift">
                  <div class="left-door"></div>
                  <div class="right-door"></div>
              </div> `
        );
      }
    }

    const lift = [...document.querySelectorAll(".lift")];
    const leftDoor = document.querySelectorAll(".left-door");
    const rightDoor = document.querySelectorAll(".right-door");
    let indexLift = 0;
    let liftAnimationIdx = 0;

    // function for lift animation
    function liftAnimation({ block, buttons, liftAnimationIdx, indexLift }) {
      if (!leftDoor[liftAnimationIdx]) return;
      // opens the doors
      leftDoor[liftAnimationIdx].classList.add("left-move-open");
      rightDoor[liftAnimationIdx].classList.add("right-move-open");

      // to close the doors
      leftDoor[liftAnimationIdx].addEventListener("transitionend", () => {
        leftDoor[liftAnimationIdx].classList.add("left-move-close");
        rightDoor[liftAnimationIdx].classList.add("right-move-close");
        //  to remove all the classes after transition
        setTimeout(() => {
          leftDoor[liftAnimationIdx].classList.remove("left-move-close");
          rightDoor[liftAnimationIdx].classList.remove("right-move-close");
          leftDoor[liftAnimationIdx].classList.remove("left-move-open");
          rightDoor[liftAnimationIdx].classList.remove("right-move-open");
          //make index to 0 after the last lift
          indexLift = 0;
        }, 2500);
      });
    }
    // events for Button up
    const btnUp = [...document.querySelectorAll(".btn-up")];
    let count = 0;
    btnUp.reverse(); //reversed the order of array
    btnUp.map(function (block, index) {
      block.addEventListener("click", function () {
        block.classList.add("btn-clicked");
        let countUp = index * 2; //multiplied by 2 to make every transition for floor to take 2s

        const buttons = document.querySelectorAll(".btn");
        //To Check that user not clicked the same floor
        if (count !== countUp) {
          let translateValue = -10 * index - 1;
          let transitionTime = Math.abs(countUp - count);
          lift[indexLift].style.transform = `translateY(${translateValue}rem)`;
          lift[
            indexLift
          ].style.transition = `transform ${transitionTime}s ease`;

          function transitionRunListener() {
            if (indexLift < inputLift - 1) {
              //to check that index is not greater than the number of lifts
              liftAnimationIdx = indexLift;
              indexLift++;
            } else {
              liftAnimationIdx = indexLift;
              indexLift = 0;
            }
            this.removeEventListener("transitionrun", transitionRunListener);
          }
          // transition finished event
          function transitionEndListener() {
            block.classList.remove("btn-clicked");
            liftAnimation({ block, buttons, liftAnimationIdx, indexLift });
            this.removeEventListener("transitionend", transitionEndListener);
          }

          lift[indexLift].addEventListener(
            "transitionrun",
            transitionRunListener
          );
          lift[indexLift].addEventListener(
            "transitionend",
            transitionEndListener
          );
          return (count = countUp);
        }
        //if same floor
        else {
          block.classList.remove("btn-clicked");
          liftAnimation({ block, buttons });
        }
      });
    });

    // events for Button down
    const btnDown = [...document.querySelectorAll(".btn-down")];
    btnDown.reverse();
    btnDown.map(function (block, index) {
      block.addEventListener("click", function () {
        block.classList.add("btn-clicked");
        const buttons = document.querySelectorAll(".btn");

        // lift.classList.add("move-up");
        let countUp = (index + 1) * 2; //multiplied by 2 to make every transition for floor to take 2s
        //To Check that user not clicked the same floor
        if (count != countUp) {
          let translateValue = -10 * index - 11; //added 10 extra because down is starting from 1st floor
          let transitionTime = Math.abs(countUp - count);
          lift[indexLift].style.transform = `translateY(${translateValue}rem)`;
          lift[
            indexLift
          ].style.transition = `transform  ${transitionTime}s ease  `;

          function transitionRunListener() {
            if (indexLift < inputLift - 1) {
              liftAnimationIdx = indexLift;
              indexLift = indexLift + 1;
            } else {
              liftAnimationIdx = indexLift;
              indexLift = 0;
            }
            this.removeEventListener("transitionrun", transitionRunListener);
          }
          // transition finished event
          function transitionEndListener() {
            block.classList.remove("btn-clicked");
            liftAnimation({ block, buttons, liftAnimationIdx, indexLift });
            this.removeEventListener("transitionend", transitionEndListener);
          }

          lift[indexLift].addEventListener(
            "transitionrun",
            transitionRunListener
          );
          lift[indexLift].addEventListener(
            "transitionend",
            transitionEndListener
          );
          return (count = countUp);
        }
        //if same floor
        else {
          block.classList.remove("btn-clicked");
          liftAnimation({ block, buttons });
        }
      });
    });
  } else {
    alert("Please Enter a Floors Value between 0 and 100");
    location.reload();
  }
});
