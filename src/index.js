import _ from "lodash";
import { melody1, melody2, melody3, melody4, melody5, melody6, melody7, melody8 } from "./data/melodies";
import {
  updateLevel,
  updateDocument,
  getCollection,
  getDocumentsByQuery,
  createDocument,
} from "./utils/firestore";
import { removeEmptyArrays, formatArrayTo1d, formatArrayTo2d, arrayEquals, convertToArr } from "./utils/helpers/helpers"

// import video2 from './assets/videosgestalt_intro.mp4'
// === PART I === FUNDAMENTAL GESTALT PRINCIPLES === //

//Set the canvas using ZIM.js
const frame = new Frame(FIT, 1024, 768, light, dark);
frame.on(
  "ready",
  () => {
    const stage = frame.stage;
    let stageW = frame.width;
    let stageH = frame.height;
    let drawingEnabled = false;
    let playingCompleted = true;
    let drawings = [];
    // shape for the pen
    let shape;
    // array to store the coordinates of the line drawn by the user
    let lineCords = [];
    //track the levels progress
    let level = 1;
    //Documents of levels collection from firebase
    let levelsDocuments = [];
    //Answers relevant for each level, fetched upon entering a level
    let relevantAnswers = [];
    //Documents of the necklaces store in firebase
    let necklacesDocuments = [];
    //Answers relevant for level 12
    let necklaceAnswers = [];
    // initialize the var that contains the element id's of the elements selected by the user
    let selectedPoints;
    //For level 12
    let selectedGroups = [];
    //Store a number representing the last level for which the user have sumbitted answers
    let submittedForLevel = 0;
    // Store boolean representing whether the user have already submitted answers
    let submitted = submittedForLevel < level;

    //get dom elements
    const modalLevel1 = document.querySelector(".modal-level-1");
    const nextLevelBtn = document.querySelector(".next-level-btn");
    const modalTextContainer = document.querySelector(".modal-body-next");
    const modalInstructions = document.querySelector(".modal-instructions");
    const startLevel = document.querySelector(".start-playing");
    const modalInstructionsText = document.querySelector(
      ".modal-body-instructions"
    );
    const modalFooter = document.querySelector(".modal-footer");
    const cursor = document.querySelector(".cursor");
    const zimCanvas = document.querySelector("#myCanvas");
    const level0 = document.querySelector("#level0");
    const startBtn = document.querySelector(".startApp");
    const introVideo = document.querySelector(".intro-video");

    // === Firebase functionality === //

    const initializeGame = async () => {
      levelsDocuments = await getCollection("levels");
      relevantAnswers = await getDocumentsByQuery("answers", "level", level);
    };

    const initializeLocalStorage = () => {
       let storedProgress = JSON.parse(localStorage.getItem("gestaltGame"));
      if (!storedProgress) {
        localStorage.setItem(
          "gestaltGame",
          JSON.stringify({ answersSubmittedForLevels: 0 })
        );
      } else {
        submittedForLevel = storedProgress.answersSubmittedForLevels;
      }
    };

    startBtn.addEventListener("click", async () => {
      zimCanvas.style.display = "block";
      level0.style.display = "none";
      introVideo.src = "";
      if (level === 9.5) {
        level = 10;
        modalInstructionsText.textContent =
          "Press the 'PLAY' button and listen carefully to the recording. Then, press the 'DRAW' button and use the cursor as a brush to circle ALL the groups that you perceive. Finally, submit your interpretation by pressing the 'ENTER' key.";
        pages.go(level10);
        necklacesDocuments = await getCollection("necklaces");
        await getNecklaceAnswers(1);
      } else if (level === 10 && currentNecklace === 8){
        // redirect to chapter 6 of the dissertation
      } else {
        level = 1;
        await initializeGame();
        initializeLocalStorage();
      }
      modalInstructions.style.display = "block";
    });

    startLevel.addEventListener("click", () => {
      modalInstructions.style.display = "none";
      if(startLevel.textContent === "Try again"){
        removeDrawings()
        startLevel.textContent === "Start"
      }
    });

    (async function () {
      zimCanvas.style.display = "none";
      // level0.style.display = "none";

      // await initializeGame();
      // initializeLocalStorage();

      

      // Use code bellow to update firebase when id's of canvas elements change due to ui modifications.
      // let data = [1092, 1094, 1096, 1098, 1100, 1102, 1104];
       // await updateDocument("answers", "uIYo8V731ecHF2yZrxeD", { points: data });
    })();

    const getNecklaceAnswers = async (currentNecklace) => {
      let storedNecklaceAnswers = await getDocumentsByQuery(
        "level12Answers",
        "necklace",
        currentNecklace
      );
      necklaceAnswers = storedNecklaceAnswers.map((answer) => {
        return {
          ...answer,
          points: formatArrayTo2d(answer.points),
        };
      });
    };

    const updateLevelInfo = async () => {
      const relevantLevelDocument = levelsDocuments.find(
        (doc) => doc.level === level
      );
      await updateDocument("levels", relevantLevelDocument.id, {
        numAnswersSubmitted: relevantLevelDocument.numAnswersSubmitted + 1,
      });
    };

    const storeNewAnswer = async (points) => {
      const data = {
        level: level,
        points: points,
        timesChosen: 1,
        answerClass: Math.floor(Math.random() * 1000000000).toString(),
      };
      await createDocument("answers", data);
    };

    // === firebase functionality END === //

    // === Functionality of submitting, checking and responding to answers === //


    //Function that updates the answer and its common class answers in the db, or store a new answer if the user's
    // submission does not already exists in the db
    const updateAnswersInfo = async (index, selectedPoints) => {
      if (index !== undefined) {
        let commonClassAnswers = relevantAnswers.filter(
          (answer) => answer.answerClass === relevantAnswers[index].answerClass
        );
        for (let i = 0; i < commonClassAnswers.length; i++) {
          await updateDocument("answers", commonClassAnswers[i].id, {
            timesChosen: relevantAnswers[index].timesChosen + 1,
          });
        }
      } else {
        storeNewAnswer(selectedPoints);
      }
    };

    // Function that compares the points selected by the user with the existing answers fetched on mount from the db
    const compSelectionWithAnswers = (selectedPoints) => {
      for (let i = 0; i < relevantAnswers.length; i++) {
        if (arrayEquals(relevantAnswers[i].points, selectedPoints)) {
          return i;
        }
      }
      return undefined;
    };

    // Function that return the aproriate text to be displayed according to the user's submission,
    // and the index of the answer in the existing answers that corresponds to the user's selection
    const getResponseText = async (selectedPoints) => {
      let principle, percentage, index, text;
      // Check that a selection has been made
      if (!selectedPoints.length) {
        text = "You have not selected any point. Try again";
        return text;
      }
      index = compSelectionWithAnswers(selectedPoints);
      if (index !== undefined) {
        principle = relevantAnswers[index].principle;
        const levelDocument = levelsDocuments.find(
          (doc) => doc.level === level
        );
        percentage = (
          (Number(relevantAnswers[index].timesChosen) /
            Number(levelDocument.numAnswersSubmitted)) *
          100
        ).toFixed(2);
        text = `${percentage}% of the users have reported to experience the same grouping intuition as you submitted. ${principle ? `Your goruping intuition confirms the <strong> Gestalt principle of ${principle}.</strong>` : ""}` 
      } else {
        console.log("else");
        text =
          "Your grouping intuition matches 0% of the previously submitted reports.";
      }
      return { text, index };
    };

    // When the user answers correctly, he gets explanations about his/her intuition. This function matches the explanations to the current level.
    const submitAnswer = async (level, selectedPoints) => {
      const { text, index } = await getResponseText(selectedPoints);
      modalTextContainer.innerHTML = text;
      modalLevel1.style.display = "block";

      if (submittedForLevel < level) {
        await updateLevelInfo();
        await updateAnswersInfo(index, selectedPoints);

        //update submitted for level in local storage and in file
        submittedForLevel++;
        localStorage.setItem(
          "gestaltGame",
          JSON.stringify({ answersSubmittedForLevels: submittedForLevel })
        );
      }
    };

    // === END answer submission functionality === //

    // customizing the cursor
    document.addEventListener("mousemove", (e) => {
      cursor.setAttribute(
        "style",
        "top: " + (e.pageY - 15) + "px; left: " + (e.pageX - 12) + "px"
      );
    });

    document.addEventListener("click", () => {
      cursor.classList.add("expand");
      setTimeout(() => {
        cursor.classList.remove("expand");
      }, 500);
    });

    // === Create the level and corresponding ZIM PAGES === //

    let level1 = new Page(stageW, stageH, black).cur("none");
    level1.title = new Label({ text: "Level 1", color: white, italic: true }).loc(
      100,
      100,
      level1
    );
  
    const labelLevel1 = new Label({
      text:"Redraw",
      size:30,
      italic:true,
      color: black
   });
    new Button({
      label: labelLevel1,
      width:190,
      height:60,
      backgroundColor:"#F2D388",
      rollBackgroundColor:"#DAC0A3",
      borderRaius:8,
      shadowColor:"grey",
    })
      .loc(750, 650, level1)
      .tap(() => {
        redraw();
      });


    let level2 = new Page(stageW, stageH, black).cur("none");
    level2.title = new Label({ text: "Level 2", color: white, italic: true }).loc(
      100,
      100,
      level2
    );

    const labelLevel2 = new Label({
      text:"Redraw",
      size:30,
      italic:true,
      color: black
   });
    new Button({
      label: labelLevel2,
      width:190,
      height:60,
      backgroundColor:"#F2D388",
      rollBackgroundColor:"#DAC0A3",
      borderRaius:8,
      shadowColor:"grey",
    })
      .loc(750, 650, level2)
      .tap(() => {
        redraw();
      });


    let level3 = new Page(stageW, stageH, black).cur("none");
    level3.title = new Label({ text: "Level 3", color: white, italic: true }).loc(
      100,
      100,
      level3
    );

    const labelLevel3 = new Label({
      text:"Redraw",
      size:30,
      italic:true,
      color: black
   });
    new Button({
      label: labelLevel3,
      width:190,
      height:60,
      backgroundColor:"#F2D388",
      rollBackgroundColor:"#DAC0A3",
      borderRaius:8,
      shadowColor:"grey",
    })
      .loc(750, 650, level3)
      .tap(() => {
        redraw();
      });


    let level4 = new Page(stageW, stageH, black).cur("none");
    level4.title = new Label({ text: "Level 4", color: white, italic: true }).loc(
      100,
      100,
      level4
    );

    const labelLevel4 = new Label({
      text:"Redraw",
      size:30,
      italic:true,
      color: black
   });
    new Button({
      label: labelLevel4,
      width:190,
      height:60,
      backgroundColor:"#F2D388",
      rollBackgroundColor:"#DAC0A3",
      borderRaius:8,
      shadowColor:"grey",
    })
      .loc(750, 650, level4)
      .tap(() => {
        redraw();
      });


    let level5 = new Page(stageW, stageH, black).cur("none");
    level5.title = new Label({ text: "Level 5", color: white, italic: true }).loc(
      100,
      100,
      level5
    );

    let level6 = new Page(stageW, stageH, black).cur("none");
    level6.title = new Label({ text: "Level 6", color: white, italic: true }).loc(
      100,
      100,
      level6
    );

    let level7 = new Page(stageW, stageH, black).cur("none");
    level7.title = new Label({ text: "Level 7", color: white, italic: true }).loc(
      100,
      100,
      level7
    );

    let level8 = new Page(stageW, stageH, black).cur("none");
    level8.title = new Label({ text: "Level 8", color: white, italic: true }).loc(
      100,
      100,
      level8
    );

    let level9 = new Page(stageW, stageH, black).cur("none");
    level9.title = new Label({ text: "Level 9", color: white, italic: true }).loc(
      100,
      100,
      level9
    );

    let level10 = new Page(stageW, stageH, black).cur("grab");
    level10.title = new Label({ text: "Level 10.1", color: white, italic: true }).loc(
      100,
      100,
      level10
    );

    let level11 = new Page(stageW, stageH, black).cur("grab");
    level11.title = new Label({ text: "Level 11", color: white, italic: true  }).loc(
      100,
      100,
      level11
    );

    let level12 = new Page(stageW, stageH, black).cur("grab");
    level12.title = new Label({ text: "Level 12", color: white, italic: true  }).loc(
      100,
      100,
      level12
    );

    level2.name = "level 2";
    level3.name = "level 3";
    level4.name = "level 4";
    level5.name = "level 5";
    level6.name = "level 6";
    level7.name = "level 7";
    level8.name = "level 8";
    level9.name = "level 9";
    level10.name = "level 10";
    level11.name = "level 11";
    level12.name = "level 12";

    let pages = new Pages({
      pages: [
        { page: level1 },
        { page: level2 },
        { page: level3 },
        { page: level4 },
        { page: level5 },
        { page: level6 },
        { page: level7 },
        { page: level8 },
        { page: level9 },
        { page: level10 },
        { page: level11 },
        { page: level12 },
      ],
      transition: "slide",
      speed: 1,
    }).addTo();

    // === Create level pages END === //

    // === set up the dynamic drawing functionality === //
    let ticker;
    const dampX = new Damp(null, 0.1);
    const dampY = new Damp(null, 0.1);
    let getUpdatingPenCords;

    const getCurrentPenCords = function () {
      lineCords.push({
        x: frame.mouseX.toFixed(),
        y: frame.mouseY.toFixed(),
      });
      // console.log(lineCords);
    };

    stage.on("stagemousedown", () => {
      if ((level > 0 && level < 5) || (level === 10 && drawingEnabled)) {
        draw();
      }
    });

    const draw = () => {
      shape = new Shape().addTo();
      shape.s(pink).ss(5);

      lineCords = [];
      dampX.immediate(frame.mouseX);
      dampY.immediate(frame.mouseY);
      shape.mt(frame.mouseX, frame.mouseY);
      getUpdatingPenCords = setInterval(getCurrentPenCords, 50);

      // instead of using mousemove event
      ticker = Ticker.add(() => {
        shape.lt(dampX.convert(frame.mouseX), dampY.convert(frame.mouseY));
        stage.update();
      });
    };

    const redraw = () => {
      removeDrawings();
      lineCords = [];
    };

    document.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        let sorted;
        switch (level) {
          case 1:
            selectedPoints = getSelectedPoints(level1DotsCords, lineCords);
            await submitAnswer(level, selectedPoints);
            break;
          case 2:
            selectedPoints = getSelectedPoints(level2DotsCords, lineCords);
            await submitAnswer(level, selectedPoints);
            break;
          case 3:
            selectedPoints = getSelectedPoints(level3DotsCords, lineCords);
            await submitAnswer(level, selectedPoints);
            break;
          case 4:
            selectedPoints = getSelectedPoints(level4DotsCords, lineCords);
            await submitAnswer(level, selectedPoints);
            break;
          case 5:
            sorted = userSelectedbtns.sort((a, b) => {
              return a - b;
            });
            await submitAnswer(level, sorted);
            break;
          case 6:
            sorted = level6SelectedDots.sort((a, b) => {
              return a - b;
            });
            await submitAnswer(level, sorted);
            break;
          case 7:
            sorted = selectedSquiggles.sort((a, b) => {
              return a - b;
            });
            await submitAnswer(level, sorted);
            break;
          case 8:
            sorted = selectedSquiggles.sort((a, b) => {
              return a - b;
            });
            await submitAnswer(level, sorted);
            break;
          case 9:
            sorted = selectedRects.sort((a, b) => {
              return a - b;
            });
            await submitAnswer(level, sorted);
            break;
          case 10:
            drawingEnabled = false;
            if(selectedGroups.length === 1){
              // User selected only one gorup when minimum is two
              modalInstructionsText.textContent = "You selected only one group. Try to select all the available groups that you perceive."
              startLevel.textContent = "Try again"
              modalInstructions.style.display = "block";
              selectedGroups = []
              drawBtn.backgroundColor = "#F2D388"
            } else {
              const { index, option, answer } = checkAllAnswers();
              modalTextContainer.textContent = await getTextLevel10(
                index,
                option, 
                answer
              );
              modalLevel1.style.display = "block";
            }

            break;
            defualt: return;
        }
      }
    });

    stage.on("stagemouseup", async () => {
      if ((level > 0 && level < 5) || drawingEnabled) {
        Ticker.remove(ticker);

        clearInterval(getUpdatingPenCords);
        drawings.push(shape);

        // TODO: don't push another array to selected groups if user completes the same line, or when presses one of the buttons
        if (level === 10 && drawingEnabled) {
          let currentMelody = getCurrentMelody();
          selectedPoints = getSelectedPoints(currentMelody, lineCords);
          selectedGroups.push(selectedPoints);
        }
      }
    });

    //algorithm that checks if a point is in a polygon based on the raycast algo.
    const inside = (point, vs) => {
      let x = point[0],
        y = point[1];
      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0],
          yi = vs[i][1];
        let xj = vs[j][0],
          yj = vs[j][1];

        let intersect =
          yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // Get rid of duplicated arrays in the multi-dimensional line cords array
    const multiDimensionalUnique = (arr) => {
      let uniques = [];
      let itemsFound = {};
      for (let i = 0, l = arr.length; i < l; i++) {
        let stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) {
          continue;
        }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
      }
      return uniques;
    };


    //A function that utilizes all utility functions and returns an array with the dots selected by the user
    const getSelectedPoints = (latticeDots, lineCords) => {
      let cords = convertToArr(lineCords);
      let cordsWithoutDuplicates = multiDimensionalUnique(cords);
      let selectedPoints = [];
      for (let i = 0; i < latticeDots.cords.length; i++) {
        let pointInCircle = inside(
          [latticeDots.cords[i].x, latticeDots.cords[i].y],
          cordsWithoutDuplicates
        );
        if (pointInCircle) {
          selectedPoints.push(latticeDots.cords[i].id);
        }
      }
      return selectedPoints;
    };

    // functions for creating lattices
    // lattice with squares
    function createSquareLattice(
      Xstart,
      Ystart,
      rows,
      columns,
      step,
      color,
      level,
      levelLatticeCords,
      levelDotsCords
    ) {
      let initialValueX = Xstart;
      let initialValueY = Ystart;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let rect = new Rectangle(20, 20, color).loc(Xstart, Ystart, level);
          levelDotsCords.cords.push({ x: Xstart, y: Ystart, id: rect.id });
          Xstart += step;
        }
        Xstart = initialValueX;
        Ystart += step;
      }
      levelLatticeCords.push({
        x1: initialValueX,
        x2: initialValueX + columns * step - 30,
        y1: initialValueY,
        y2: initialValueY + rows * step - 30,
      });

    }
    let dots = [];
    // lattice with circles
    function createLattice(
      Xstart,
      Ystart,
      rows,
      columns,
      step,
      color,
      level,
      levelLatticeCords,
      levelDotsCords
    ) {
      let initialValueX = Xstart;
      let initialValueY = Ystart;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let circle = new Circle({
            radius: 10,
            color: color,
          }).loc(Xstart, Ystart, level);
          levelDotsCords.cords.push({ x: Xstart, y: Ystart, id: circle.id });
          Xstart += step;
          dots.push(circle);
        }
        Xstart = initialValueX;
        Ystart += step;
      }

      levelLatticeCords.push({
        x1: initialValueX - 10,
        x2: initialValueX + columns * step - 40,
        y1: initialValueY - 10,
        y2: initialValueY + rows * step - 30,
      });

      // console.log(levelDotsCords);
    }

    // === LEVEL 1 PROXIMITY === //

    let level1LatticeCords = [];
    let level1DotsCords = { name: "level1", cords: [] };

    // args: beginning x position, beginning y position, number of rows, munber of cols, gap magnitude (step),color,level,levelLatticeCords
    createLattice(
      250,
      300,
      6,
      4,
      50,
      green,
      level1,
      level1LatticeCords,
      level1DotsCords
    );
    createLattice(
      600,
      200,
      6,
      4,
      50,
      green,
      level1,
      level1LatticeCords,
      level1DotsCords
    );

    // === LEVEL 2 SIMILARITY-COLOR === //

    let level2LatticeCords = [];
    let level2DotsCords = { name: "level2", cords: [] };

    createLattice(
      430,
      400,
      4,
      4,
      50,
      blue,
      level2,
      level2LatticeCords,
      level2DotsCords
    );
    createLattice(
      430,
      200,
      4,
      4,
      50,
      yellow,
      level2,
      level2LatticeCords,
      level2DotsCords
    );

    // === LEVEL 3 SIMILARITY-SHAPE === //

    let level3LatticeCords = [];
    let level3DotsCords = { name: "level3", cords: [] };

    createSquareLattice(
      530,
      300,
      4,
      4,
      50,
      blue,
      level3,
      level3LatticeCords,
      level3DotsCords
    );
    createLattice(
      340,
      310,
      4,
      4,
      50,
      blue,
      level3,
      level3LatticeCords,
      level3DotsCords
    );

    // === LEVEL 4 CONTINUITY === //
    let level4LatticeCords = [];
    let level4DotsCords = { name: "level4", cords: [] };

    createLattice(
      520,
      150,
      7,
      1,
      50,
      red,
      level4,
      level4LatticeCords,
      level4DotsCords
    );
    createLattice(
      170,
      500,
      1,
      15,
      50,
      red,
      level4,
      level4LatticeCords,
      level4DotsCords
    );

    // === LEVEL 5 CONTINUITY === //

    // Declare initial variables
    let userSelectedbtns = [];
    let level5Buttons = [];
    let level5XPos = 80;
    let level5YPos = 400;
    let level5Step = 30;
    let level5Counter = 3;

    //A function to create level5 dot lattice
    function createLevel5Btns() {
      let level5Button = new Circle({
        radius: 10,
        color: red,
      })
        .loc(level5XPos - level5Step, level5YPos - level5Step, level5)
        .cur()
        .tap(() => {
          if (!userSelectedbtns.includes(level5Button.id)) {
            userSelectedbtns.push(level5Button.id);
            level5Button.color = blue;
          } else {
            userSelectedbtns.splice(
              userSelectedbtns.indexOf(level5Button.id),
              1
            );
            level5Button.color = red;
          }
          stage.update();
        });

      //number of sides
      for (let i = 0; i < 6; i++) {
        //number of dots per side
        for (let j = 0; j < 5; j++) {
          let level5Button = new Circle({
            radius: 10,
            color: red,
          })
            .loc(level5XPos, level5YPos, level5)
            .cur()
            .tap(() => {
              if (!userSelectedbtns.includes(level5Button.id)) {
                userSelectedbtns.push(level5Button.id);
                level5Button.color = blue;
              } else {
                userSelectedbtns.splice(
                  userSelectedbtns.indexOf(level5Button.id),
                  1
                );
                level5Button.color = red;
              }
              stage.update();
            });
          if (level5Counter % 2 === 0) {
            level5YPos -= level5Step;
          } else {
            level5YPos += level5Step;
          }
          level5XPos += level5Step;
        }

        if (level5Counter % 2 === 0) {
          level5YPos += level5Step * 2;
        } else {
          level5YPos -= level5Step * 2;
        }
        level5Counter++;
      }
      return level5Buttons;
    }
    createLevel5Btns();

    // === LEVEL 6 COMMON REGION === //

    // declare initial variables for level 6
    let level6Step = 230;
    let level6Xpos = 150;
    let level6DotXpos = 80;
    let level6DotStep = 140;
    let level6SelectedDots = [];

    // a function to create the lattice for level 6
    function createLevel6Lattice() {
      for (let i = 0; i < 4; i++) {
        let circle = new Blob({
          points: [
            [1, -42.6, 0, 0, -50, 0, 50, 0, "mirror"],
            [100, 0, 0, 0, 1, -40.3, -1, 40.3, "mirror"],
            [1, 42.6, 0, 0, 50, 0, -50, 0, "mirror"],
            [-100, 0, 0, 0, 0, 40.3, 0, -40.3, "mirror"],
          ],
          interactive: false,
          borderColor: red,
        }).loc(level6Xpos, 400, level6);

        for (let j = 0; j < 2; j++) {
          let dot = new Circle({
            radius: 10,
            color: yellow,
          })
            .loc(level6DotXpos, 400, level6)
            .cur()
            .tap(() => {
              if (!level6SelectedDots.includes(dot.id)) {
                dot.color = red;
                level6SelectedDots.push(dot.id);
              } else {
                dot.color = yellow;
                level6SelectedDots.splice(
                  level6SelectedDots.indexOf(dot.id),
                  1
                );
              }

              stage.update();
            });

          level6DotXpos += level6DotStep;
        }
        level6Xpos += level6Step;
        level6DotXpos -= 50;
      }
    }
    createLevel6Lattice();

    // === LEVEL 7 === PARALLELISM ===//

    // Set initial level variables
    let selectedSquiggles = [];
    let squiggles = [];
    let level7Points = [
      [
        [92.5, -52.6, 0, 0, -94.2, -28.2, 94.2, 28.2],
        [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
        [98.4, 70.1, 0, 0, -57.3, -20.4, 57.3, 20.4],
        [99.4, 134, 0, 0, -56.3, -41.9, 56.3, 41.9],
        [98.5, 190.8, 0, 0, -77.7, -7.8, 77.7, 7.8],
      ],
      [
        [92.5, -52.6, 0, 0, -94.2, -28.2, 94.2, 28.2],
        [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
        [98.4, 70.1, 0, 0, -57.3, -20.4, 57.3, 20.4],
        [99.4, 134, 0, 0, -56.3, -41.9, 56.3, 41.9],
        [98.5, 190.8, 0, 0, -77.7, -7.8, 77.7, 7.8],
      ],
      [
        [92.5, -52.6, 0, 0, 66.4, -19.5, -66.4, 19.5],
        [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
        [78.9, 70.1, 0, 0, -73.8, -23.4, 58, 18.3, "straight"],
        [68.3, 138.8, 0, 0, -56.3, -41.9, 56.3, 41.9],
        [56.7, 183, 0, 0, 48.8, 6.8, -48.8, -6.8],
      ],
      [
        [92.5, -52.6, 0, 0, 66.4, -19.5, -66.4, 19.5],
        [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
        [78.9, 70.1, 0, 0, -73.8, -23.4, 58, 18.3, "straight"],
        [68.3, 138.8, 0, 0, -56.3, -41.9, 56.3, 41.9],
        [56.7, 183, 0, 0, 48.8, 6.8, -48.8, -6.8],
      ],
      [
        [92.5, -52.6, 0, 0, -72.8, -11.7, 72.8, 11.7],
        [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
        [78, 61.3, 0, 0, -48.5, -31.1, 51.2, 32.9, "straight"],
        [94.6, 135, 0, 0, -56.3, -41.9, 56.3, 41.9],
        [83.9, 182, 0, 0, -10.5, -43.8, 10.5, 43.8],
      ],
      [
        [92.5, -52.6, 0, 0, -72.8, -11.7, 72.8, 11.7],
        [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
        [78, 61.3, 0, 0, -48.5, -31.1, 51.2, 32.9, "straight"],
        [94.6, 135, 0, 0, -56.3, -41.9, 56.3, 41.9],
        [83.9, 182, 0, 0, -10.5, -43.8, 10.5, 43.8],
      ],
    ];
    let xPosLevel7 = [230, 300, 400, 480, 540, 600];
    let yPosLevel7 = 300;

    //A function to create squiggles lattice
    function createSquiggles(num, levelPoints, yPos, xPos, pageNum) {
      for (let i = 0; i < num; i++) {
        let squiggle = new Squiggle({
          interactive: false,
          color: red,
          thickness: 5,
          points: levelPoints[i],
        })
          .loc(xPos[i], yPos, pageNum)
          .cur()
          .tap(() => {
            if (!selectedSquiggles.includes(squiggle.id)) {
              squiggle.color = blue;
              squiggle.thickness = 10;
              selectedSquiggles.push(squiggle.id);
            } else {
              squiggle.color = red;
              squiggle.thickness = 5;
              selectedSquiggles.splice(
                selectedSquiggles.indexOf(squiggle.id),
                1
              );
            }
            stage.update();
          });
        squiggles.push(squiggle);
      }
    }
    createSquiggles(6, level7Points, yPosLevel7, xPosLevel7, level7);

    // === LEVEL 8 === SYMMETRY === //

    // Declare initial variables for level 8
    let level8Points = [
      [
        [137.7, 176.4, 0, 0, -70.1, -1.5, 70.1, 1.5],
        [138.1, 101.6, 0, 0, -84.5, 1.4, 84.5, -1.4],
        [148.5, 27.2, 0, 0, -81.6, -4.3, 81.6, 4.3],
        [146.1, -41.8, 0, 0, -75.9, -8.6, 75.9, 8.6],
        [145.1, -104.7, 0, 0, -78.8, -5.7, 54.8, 4, "straight"],
      ],
      [
        [137.7, 176.4, 0, 0, 73.3, -4.4, -73.3, 4.4],
        [138.1, 101.6, 0, 0, 83.3, -1.5, -83.3, 1.5],
        [148.5, 27.2, 0, 0, 73.3, -4.3, -73.3, 4.3],
        [146.1, -41.8, 0, 0, 70.4, -4.3, -70.4, 4.3],
        [145.1, -104.7, 0, 0, 89, -11.4, -54.5, 7, "straight"],
      ],
      [
        [137.7, 176.4, 0, 0, -68.6, 28.6, 68.6, -28.6],
        [138.1, 101.6, 0, 0, -44.4, 5.7, 44.4, -5.7],
        [148.5, 27.2, 0, 0, -106, -30.1, 106, 30.1],
        [146.1, -41.8, 0, 0, -64.4, 45.9, 64.4, -45.9],
        [145.1, -104.7, 0, 0, -76, 41.7, 48.1, -26.4, "straight"],
      ],
      [
        [137.7, 176.4, 0, 0, 67.6, 45.8, -67.6, -45.8],
        [138.1, 101.6, 0, 0, 41.7, 10, -41.7, -10],
        [148.5, 27.2, 0, 0, 91.9, -35.9, -91.9, 35.9],
        [146.1, -41.8, 0, 0, 48.9, 45.9, -48.9, -45.9],
        [145.1, -104.7, 0, 0, 71.8, 43.1, -47.1, -28.3, "straight"],
      ],
      [
        [137.7, 176.4, 0, 0, -113.1, 104.7, 113.1, -104.7],
        [138.1, 101.6, 0, 0, -146.2, 30.1, 146.2, -30.1],
        [148.5, 27.2, 0, 0, -106, -30.1, 106, 30.1],
        [137.5, -53.3, 0, 0, -87.4, 34.4, 87.4, -34.4],
        [145.1, -104.7, 0, 0, -110.3, 77.5, 45, -31.6, "straight"],
      ],
      [
        [137.7, 176.4, 0, 0, 38.9, 88.9, -38.9, -88.9],
        [138.1, 101.6, 0, 0, 116.3, 31.5, -116.3, -31.5],
        [148.5, 27.2, 0, 0, 94.8, -18.6, -94.8, 18.6],
        [137.5, -53.3, 0, 0, 71.8, 43, -71.8, -43],
        [145.1, -104.7, 0, 0, 87.6, 90.4, -38.2, -39.5, "straight"],
      ],
    ];
    let yPosLevel8 = 350;
    let xPosLevel8 = [180, 260, 340, 420, 500, 595, 690, 800];

    // Call the function to create the lattice for level 8
    createSquiggles(6, level8Points, yPosLevel8, xPosLevel8, level8);

    // === LEVEL 9 HIERARCHY - CONTINUITY & SIMILARITY === //

    // Declare initial variables for level 9
    let step = 110;
    let xPos = 300;
    let yPos = 210;
    let rects = [];
    let selectedRects = [];

    // a function to create the lattice for level 9
    function createLatticeG() {
      //create first row
      for (let i = 0; i < 4; i++) {
        let rect = new Rectangle(100, 100, "blue").loc(xPos, 100, level9);
        rects.push(rect);
        xPos += step;
      }
      //Create blue rects of the left column
      for (let i = 0; i < 3; i++) {
        let rect = new Rectangle(100, 100, "blue").loc(300, yPos, level9);
        rects.push(rect);
        yPos += step;
      }
      //Create green rects of the left column
      for (let i = 0; i < 1; i++) {
        let rect = new Rectangle(100, 100, "green").loc(300, yPos, level9);
        rects.push(rect);
        yPos += step;
      }

      //Create the bottom row
      xPos = 410;
      yPos = 540;
      for (let i = 0; i < 3; i++) {
        let rect = new Rectangle(100, 100, "green").loc(xPos, yPos, level9);
        rects.push(rect);
        xPos += step;
      }
      //Create green rects of the right column
      xPos = 630;
      yPos = 430;
      for (let i = 0; i < 2; i++) {
        let rect = new Rectangle(100, 100, "green").loc(xPos, yPos, level9);
        rects.push(rect);
        yPos -= step;
      }
      //Last inner green rect
      let rect = new Rectangle(100, 100, "green").loc(
        xPos - step,
        yPos + step,
        level9
      );
      rects.push(rect);
    }
    createLatticeG();

    // Event listeners for the components of level 9
    const createEventsForRects = () => {
      rects.forEach((rect) => {
        rect.on("click", (e) => {
          rect.animate({
            props: {
              color: red,
            },
          });
          stage.update();
          if (!selectedRects.includes(rect.id)) selectedRects.push(rect.id);
        });
      });
    };
    createEventsForRects();

    // === LEVEL 11 COMPOSE === //

    //create stave:
    new Line({ length: 1300, color: white }).loc(50, 300, level11);
    new Line({ length: 1300, color: white }).loc(50, 350, level11);
    new Line({ length: 1300, color: white }).loc(50, 400, level11);
    new Line({ length: 1300, color: white }).loc(50, 450, level11);
    new Line({ length: 1300, color: white }).loc(50, 500, level11);

    // the clef is a custome made squggle with the following points:
    let clefPoints = [
      [116.4, 157.9, 0, 0, -39.9, -39.6, 39.9, 39.6],
      [120.6, -130, 0, 0, -24.3, -5.8, 13.9, 3.3],
      [103.6, -12.7, 0, 0, 49.8, -38.1, -20.7, 15.9],
      [73.4, 33.6, 0, 0, 3.4, -14.1, -2.4, 10.1, "straight"],
      [88.6, 74.5, 0, 0, -12, -8.2, 43.1, 29.4, "straight"],
      [184.2, 24.5, 0, 0, 5.8, 54.5, -5.8, -54.5],
      [120.7, 40.3, 0, 0, -33.1, -26.7, 42.8, 34.5, "straight"],
    ];

    // create a trebble clef for the stave, using the above points
    let clef = new Squiggle({
      points: clefPoints,
      color: orange,
      interactive: false,
    }).loc(-10, 410, level11);

    let circles;

    let playBtn = new Button({
      label: "PLAY",
    })
      .loc(430, 600, level11)
      .tap(function () {
        console.log(`x: ${note.dragMouseX}, y: ${note.dragMouseY}`);
        circles =
          //The ZIM page element has default children. The notes added by the user will be children of the page starting from the 10th index.
          // filter out the children that are not notes added by the user
          level11.children
            .filter((child, index) => index >= 11)
            //map through these notes and return their coordinates
            .map((child) => {
              return { x: child.x.toFixed(), y: child.y.toFixed() };
            })
            // sort them from lowest x value to higher, as melody is played from left to right
            .sort((a, b) => {
              return a.x - b.x;
            });
        // Play back the sorted melody
        playMelody(circles);
      });

    function playMelody(notes) {
      let counter = 0;
      playingCompleted = false;
      //determine which sound it is based on the note's location on the y axis
      determineAudioSrc(
        notes[counter].y,
        notes[counter].synth,
        notes[counter + 1].vol
      );
      //If the melody has more than one note
      if (notes.length > 1) {
        //a recursive function to immitate a loop with setTimeout with a dynamic delay.
        function inner() {
          window.setTimeout(() => {
            determineAudioSrc(
              notes[counter + 1].y,
              notes[counter + 1].synth,
              notes[counter + 1].vol
            );
            counter++;
            if (counter < notes.length - 1) {
              inner();
            } else {
              // drawingEnabled = true
              playingCompleted = true;
            }
            // the delay is determined by the distance on the x axis between two consequtive sounds
          }, (notes[counter + 1].x - notes[counter].x) * 10);
        }
        inner();
      }
    }

    const synth = new Tone.Synth().toDestination();
    const amSynth = new Tone.AMSynth().toDestination();

    function determineAudioSrc(y, synth, vol) {
      if (y <= 531 && y >= 520) {
        return synth.triggerAttackRelease("D4", "16n", undefined, vol);
      } else if (y <= 521 && y >= 495) {
        return synth.triggerAttackRelease("E4", "16n", undefined, vol);
      } else if (y <= 494 && y >= 470) {
        return synth.triggerAttackRelease("F4", "16n", undefined, vol);
      } else if (y <= 469 && y >= 448) {
        return synth.triggerAttackRelease("G4", "16n", undefined, vol);
      } else if (y <= 447 && y >= 415) {
        return synth.triggerAttackRelease("A4", "16n", undefined, vol);
      } else if (y <= 414 && y >= 397) {
        return synth.triggerAttackRelease("B4", "16n", undefined, vol);
      } else if (y <= 396 && y >= 364) {
        return synth.triggerAttackRelease("C5", "16n", undefined, vol);
      } else if (y <= 363 && y >= 343) {
        return synth.triggerAttackRelease("D5", "16n", undefined, vol);
      } else if (y <= 342 && y >= 319) {
        return synth.triggerAttackRelease("E5", "16n", undefined, vol);
      } else if (y <= 318 && y >= 295) {
        return synth.triggerAttackRelease("F5", "16n", undefined, vol);
      } else if (y <= 294 && y >= 272) {
        return synth.triggerAttackRelease("G5", "16n", undefined, vol);
      }
    }

    function checkTimeProx(notes) {
      let TimeProxBoundaries = [];
      if (notes.length >= 3) {
        for (let i = 0; i < notes.length - 2; i++) {
          if (
            (notes[i + 1].x - notes[i].x) * 2 <
            notes[i + 2].x - notes[i + 1].x
          ) {
            TimeProxBoundaries.push({
              boundary_after_note: i + 2,
              size: notes[i + 2].x - notes[i + 1].x,
            });
          }
        }
        console.log(TimeProxBoundaries);
        return TimeProxBoundaries;
        //remember to empty TimeProxBoundaries after feedback to user
      }
    }

    function checkPitchProx(notes) {
      console.log("pitch prox");
      let PitchProxBoundaries = [];
      if (notes.length >= 3) {
        for (let i = 0; i < notes.length - 2; i++) {
          if (
            (notes[i].y - notes[i + 1].y) * 2 <
            notes[i + 1].y - notes[i + 2].y
          ) {
            PitchProxBoundaries.push({
              boundary_after_note: i + 2,
              size: notes[i + 1].y - notes[i + 2].y,
            });
          }
        }
        console.log(PitchProxBoundaries);
        return PitchProxBoundaries;
        //remember to empty PitchProxBoundaries after feedback to user
      }
    }

    new Button({
      label: "Check",
    })
      .loc(800, 700, level11)
      .tap(function () {
        checkPitchProx(circles);
        checkTimeProx(circles);
      });

    // let focusedNote;
    let newNote;
    let addNote = new Button({
      label: "ADD NOTE",
    })
      .loc(800, 600, level11)
      .tap(function () {
        newNote = new Circle({
          color: yellow,
          radius: 15,
        })
          .loc(800, 550, level11)
          .drag();
        stage.update();
      });

    let note = new Circle({
      color: yellow,
      radius: 15,
      // interactive: false,
    })
      .loc(100, 100, level11)
      .drag();

    note.on("dblclick", () => {
      note.removeFrom(level11);
      stage.update();
    });

    // === LEVEL 12 ANIMATION GAME === //
    let gestaltPrinciples = ["proximity", "similarity", "continuity"];
    let currentlyCorrect = gestaltPrinciples[1];

    let columns = [600, 650, 700, 750];
    let rows = [300, 350, 400, 450];
    let elements = [];

    let blobPoints = [
      [-10, -10, 0, 0, 0, 0, 0, 0, "mirror"],
      [10, -10, 0, 0, 0, 0, 0, 0, "mirror"],
      [10, 10, 0, 0, 0, 0, 0, 0, "mirror"],
      [-10, 10, 0, 0, 0, 0, 0, 0, "mirror"],
    ];
    let trianglePoints = [
      [0, -10, 0, 0, 0, 0, 0, 0, "mirror"],
      [8.7, 5, 0, 0, 0, 0, 0, 0, "mirror"],
      [-8.7, 5, 0, 0, 0, 0, 0, 0, "mirror"],
      [-8.7, 5, 0, 0, 0, 0, 0, 0, "mirror"],
    ];
    let paddlePoints = [
      [-10.3, -100, 0, 0, -53.1, 1, 53.1, -1, "mirror"],
      [18, -4.1, 0, 0, 46.1, -43.8, -46.1, 43.8, "mirror"],
      [-8.2, 104.1, 0, 0, 50, 0, -50, 0, "mirror"],
      [-39.5, -2.1, 0, 0, 46.1, 40.8, -46.1, -40.8, "mirror"],
    ];
    let hourGlassPoints = [
      [10, -10, 0, 0, 0, 0, 0, 0, "mirror"],
      [-10, -10, 0, 0, 0, 0, 0, 0, "mirror"],
      [10, 10, 0, 0, 0, 0, 0, 0, "mirror"],
      [-10, 10, 0, 0, 0, 0, 0, 0, "mirror"],
    ];
    let region1Points = [
      [4.4, -94.5, 0, 0, -29.6, 59.5, 29.6, -59.5, "mirror"],
      [179.1, 9.3, 0, 0, 0, -50, 0, 50, "mirror"],
      [2.9, 126.3, 0, 0, 50, 0, -50, 0, "mirror"],
      [-161.1, 10, 0, 0, -18.3, 39, 18.3, -39, "mirror"],
    ];
    let region2Points = [
      [-62.8, -141.2, 0, 0, -59.8, 63.4, 59.8, -63.4, "mirror"],
      [143.1, -49.1, 0, 0, 0, -50, 0, 50, "mirror"],
      [0, 100, 0, 0, 50, 0, -50, 0, "mirror"],
      [-76.4, 23.6, 0, 0, -18.3, 39, 18.3, -39, "mirror"],
    ];
    let region3Points = [
      [-62.8, -141.2, 0, 0, -59.8, 63.4, 59.8, -63.4, "mirror"],
      [143.1, -49.1, 0, 0, -16.5, -67.5, 16.5, 67.5, "mirror"],
      [159.6, 138, 0, 0, 50, 0, -50, 0, "mirror"],
      [-153.3, 48, 0, 0, 17.7, 58.5, -17.7, -58.5, "mirror"],
    ];

    let square = new Blob({
      points: blobPoints,
      interactive: false,
    });
    let triangle = new Blob({
      points: trianglePoints,
      interactive: false,
    });
    let paddle = new Blob({
      points: paddlePoints,
      interactive: false,
    });
    let hourGlass = new Blob({
      points: hourGlassPoints,
      interactive: false,
    });
    let region1 = new Blob({
      points: region1Points,
      interactive: false,
    });
    let region2 = new Blob({
      points: region2Points,
      interactive: false,
    });
    let region3 = new Blob({
      points: region3Points,
      interactive: false,
    });

    let animations = [
      {
        name: "proximity1",
        x: [
          600, 600, 600, 600, 650, 650, 650, 650, 750, 750, 750, 750, 800, 800,
          800, 800,
        ],
        y: [
          300, 350, 400, 450, 300, 350, 400, 450, 300, 350, 400, 450, 300, 350,
          400, 450,
        ],
        shape: [
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
        ],
        color: [
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "proximity2",
        x: [
          400, 430, 460, 550, 600, 710, 730, 750, 770, 830, 860, 890, 920, 1050,
          1100, 1150,
        ],
        y: [
          500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,
          500, 500,
        ],
        shape: [
          hourGlass,
          triangle,
          square,
          hourGlass,
          triangle,
          hourGlass,
          square,
          triangle,
          square,
          square,
          triangle,
          square,
          hourGlass,
          square,
          triangle,
          square,
        ],
        color: [
          green,
          red,
          green,
          yellow,
          green,
          green,
          blue,
          green,
          green,
          yellow,
          green,
          green,
          red,
          blue,
          green,
          blue,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "similarity1",
        x: [
          600, 600, 600, 600, 650, 650, 650, 650, 700, 700, 700, 700, 750, 750,
          750, 750,
        ],
        y: [
          300, 350, 400, 450, 300, 350, 400, 450, 300, 350, 400, 450, 300, 350,
          400, 450,
        ],
        shape: [
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
          square,
        ],
        color: [
          green,
          blue,
          blue,
          green,
          green,
          blue,
          blue,
          green,
          green,
          blue,
          blue,
          green,
          green,
          blue,
          blue,
          green,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "common region1",
        x: [
          500, 730, 750, 650, 690, 700, 730, 740, 570, 670, 550, 500, 700, 600,
          750, 700,
        ],
        y: [
          350, 240, 510, 380, 400, 320, 450, 290, 350, 450, 430, 380, 500, 400,
          420, 270,
        ],
        shape: [
          region1,
          region2,
          region3,
          hourGlass,
          square,
          square,
          triangle,
          square,
          square,
          square,
          square,
          hourGlass,
          square,
          hourGlass,
          hourGlass,
          hourGlass,
        ],
        color: [
          yellow,
          blue,
          green,
          blue,
          orange,
          orange,
          red,
          yellow,
          red,
          blue,
          blue,
          orange,
          red,
          red,
          orange,
          orange,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "proximity3",
        x: [
          600, 600, 600, 600, 670, 670, 670, 670, 730, 730, 730, 730, 780, 780,
          780, 780,
        ],
        y: [
          300, 350, 400, 450, 300, 350, 400, 450, 400, 450, 500, 550, 400, 450,
          500, 550,
        ],
        shape: [
          square,
          triangle,
          square,
          square,
          square,
          square,
          triangle,
          square,
          square,
          triangle,
          square,
          square,
          square,
          square,
          triangle,
          square,
        ],
        color: [
          green,
          green,
          yellow,
          yellow,
          green,
          green,
          yellow,
          yellow,
          yellow,
          yellow,
          green,
          green,
          yellow,
          yellow,
          green,
          green,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "common region2",
        x: [
          550, 730, 450, 500, 550, 700, 590, 740, 570, 600, 630, 680, 720, 675,
          740, 700,
        ],
        y: [
          450, 290, 510, 510, 490, 320, 450, 290, 370, 410, 380, 360, 245, 500,
          220, 280,
        ],
        shape: [
          region1,
          region2,
          square,
          hourGlass,
          square,
          hourGlass,
          triangle,
          square,
          hourGlass,
          square,
          hourGlass,
          triangle,
          square,
          triangle,
          hourGlass,
          triangle,
        ],
        color: [
          yellow,
          blue,
          green,
          blue,
          orange,
          orange,
          red,
          yellow,
          red,
          blue,
          blue,
          yellow,
          red,
          red,
          orange,
          green,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "similarity2",
        x: [
          600, 600, 600, 600, 650, 650, 650, 650, 700, 700, 700, 700, 750, 750,
          750, 750,
        ],
        y: [
          300, 350, 400, 450, 300, 350, 400, 450, 300, 350, 400, 450, 300, 350,
          400, 450,
        ],
        shape: [
          triangle,
          triangle,
          square,
          square,
          triangle,
          triangle,
          square,
          square,
          triangle,
          triangle,
          square,
          square,
          triangle,
          triangle,
          square,
          square,
        ],
        color: [
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
          green,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "similarity3",
        x: [
          600, 600, 600, 600, 650, 650, 650, 650, 700, 700, 700, 700, 750, 750,
          750, 750,
        ],
        y: [
          300, 350, 400, 450, 300, 350, 400, 450, 300, 350, 400, 450, 300, 350,
          400, 450,
        ],
        shape: [
          square,
          hourGlass,
          hourGlass,
          square,
          square,
          hourGlass,
          hourGlass,
          square,
          square,
          hourGlass,
          hourGlass,
          square,
          square,
          hourGlass,
          hourGlass,
          square,
        ],
        color: [
          blue,
          blue,
          blue,
          blue,
          blue,
          blue,
          yellow,
          yellow,
          red,
          red,
          yellow,
          yellow,
          red,
          red,
          yellow,
          yellow,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "continuity1",
        x: [
          600, 650, 700, 750, 800, 850, 900, 900, 600, 650, 700, 700, 670, 630,
          670, 710,
        ],
        y: [
          300, 340, 380, 400, 380, 340, 300, 300, 400, 450, 500, 550, 600, 650,
          680, 690,
        ],
        shape: [
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
        ],
        color: [
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "continuity2",
        x: [
          310, 380, 450, 520, 590, 660, 730, 800, 660, 730, 800, 870, 940, 1010,
          1080, 1150,
        ],
        y: [
          470, 470, 470, 470, 470, 470, 470, 470, 500, 500, 500, 500, 500, 500,
          500, 500,
        ],
        shape: [
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          triangle,
          triangle,
          triangle,
          square,
          square,
          square,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
          hourGlass,
        ],
        color: [
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
          red,
          red,
          red,
          blue,
          blue,
          blue,
          yellow,
          yellow,
          yellow,
          yellow,
          yellow,
        ],
        scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
    ];
    let previous;
    const getRandom = () => {
      let random = Math.floor(Math.random() * 9);
      if (random === previous) {
        return getRandom();
      } else {
        return random;
      }
    };

    const animate = () => {
      let random = getRandom();
      previous = random;
      console.log(random);
      elements.forEach((element, i) => {
        element.animate({
          props: {
            x: animations[random].x[i],
            y: animations[random].y[i],
            shape: animations[random].shape[i],
            color: animations[random].color[i],
            // x: animations[4].x[i],
            // y:animations[4].y[i],
            // shape: animations[4].shape[i],
            // color: animations[4].color[i],
            // scale: animations[4].scale[i]
          },
        });
      });
    };

    let createLevel11Lattice = () => {
      for (let column = 0; column < columns.length; column++) {
        for (let row = 0; row < rows.length; row++) {
          let element = new Blob({
            points: blobPoints,
            interactive: false,
          }).loc(columns[column], rows[row], level12);
          elements.push(element);
        }
      }

      let btn = new Button({
        label: "Start",
      })
        .loc(100, 200, level12)
        .tap(() => {
          animate();
        });
    };

    let proximityBtn = new Button({
      label: "Proximity",
    })
      .loc(100, 600, level12)
      .tap(() => {
        animate();
      });
    let similarityBtn = new Button({
      label: "Similarity",
    })
      .loc(100, 400, level12)
      .tap(() => {
        animate();
      });
    let continuityBtn = new Button({
      label: "Continuity",
    })
      .loc(1100, 600, level12)
      .tap(() => {
        animate();
      });
    let commonFateBtn = new Button({
      label: "Common fate",
    })
      .loc(1100, 400, level12)
      .tap(() => {
        animate();
      });
    let commonRegionBtn = new Button({
      label: "Common region",
    })
      .loc(1100, 200, level12)
      .tap(() => {
        animate();
      });

    createLevel11Lattice();

    // functionality: I have an array of principles. I have a function that get a random number. The number will the index to choose a random principle.
    // I will make as many blobs as needed for the initial lattice. The number of the blobs will remain throughout. Each blob will have the same amount of alternatives as the number of principles.
    // The animate function will recieve the random index and will accordingly animate to the matching alternative blob, and to its matching position on the screen.
    // There will also be a var that contains the currently presented principle in order to check the users submitted answer.

    // === END ANIMATION GAME === //

    // === LEVEL 10 === //

    let currentNecklace = 1;

    let necklace = new Blob({
      interactive: false,
      borderColor: white,
      borderWidth: 4,
      radius: 250,
    }).loc(700, 400, level10);


    xPos = [450, 700, 950, 700];
    yPos = [400, 150, 400, 650];
    let melodyDots = [];

    const createMelodyDots = (melody, color) => {
      for (let i = 0; i < melody.sounds.length; i++) {
        let dot = new Circle({
          color: color,
          radius: 20,
        }).loc(melody.cords[i].x, melody.cords[i].y, level10);
        melodyDots.push(dot);
      }
    };
    createMelodyDots(melody1, red);

    const animateMelody = (melody, dots) => {
      let counter = 0;
      dots[counter].animate({
        props: { scale: 1.5 },
        rewind: true,
        time: 0.1,
      });
      function inner() {
        window.setTimeout(() => {
          dots[counter + 1].animate({
            props: { scale: 1.5 },
            rewind: true,
            time: 0.1,
          });
          counter++;
          if (counter < melody.sounds.length - 1) {
            inner();
          }
        }, (melody.sounds[counter + 1].x - melody.sounds[counter].x) * 10);
      }
      inner();
    };

    const removeDrawings = () => {
      // if(stage.children.length > 1){
      //   for(let i=0; i<stage.children.length; i++){
      //     stage.children.pop()
      //     stage.update()
      //   }
      // }
      for (let i = 0; i < drawings.length; i++) {
        drawings[i].removeFrom();
      }
      drawings = [];
      stage.update();
    };

    const removeDots = () => {
      for (let i = 0; i < melodyDots.length; i++) {
        melodyDots[i].removeFrom();
      }
      melodyDots = [];
      stage.update();
    };

    const nextNecklace = () => {
      switch (currentNecklace) {
        case 2:
          createMelodyDots(melody2, blue);
          break;
        case 3:
          createMelodyDots(melody3, yellow);
          break;
        case 4:
          createMelodyDots(melody4, green);
          break;
        case 5:
          createMelodyDots(melody5, red);
          break;
        case 6:
          createMelodyDots(melody6, blue);
          break;
        case 7:
          createMelodyDots(melody7, yellow);
          break;
        case 8:
          createMelodyDots(melody8, green);
          break;
        case 9:
        // zimCanvas.style.display = "none";
        // modalInstructions.textContent =
        // "That the end of the currently developed app. Next, will be a video that summarizes the auditory grouping principles and discussing the morotiraclly-imposed grouping principles. Following this video will be the motorically-imposed groupings part.";
        // level0.style.display = "flex";
        //   // introVideo.src =
        //   //   "../src/assets/videos/Transition visual to auditory.mp4";
        //   introVideo.src = "https://www.youtube.com/embed?v=vOO6-w-MrmA";
      }
    };

    const playLabelLevel10 = new Label({
      text:"Play",
      size:30,
      italic:true,
      color: black
   });
    let playBtnLevel10 = new Button({
      label: playLabelLevel10,
      width:190,
      height:60,
      backgroundColor:"#4477CE",
      rollBackgroundColor:"#1D5D9B",
      borderRaius:8,
      shadowColor:"grey",
    })
      .loc(150, 220, level10)
      .tap(() => {
        if (playingCompleted) {
          switch (currentNecklace) {
            case 1:
              playMelody(melody1.sounds);
              animateMelody(melody1, melodyDots);

              break;
            case 2:
              playMelody(melody2.sounds);
              animateMelody(melody2, melodyDots);
              break;
            case 3:
              playMelody(melody3.sounds);
              animateMelody(melody3, melodyDots);
              break;
            case 4:
              playMelody(melody4.sounds);
              animateMelody(melody4, melodyDots);
              break;
            case 5:
              playMelody(melody5.sounds);
              animateMelody(melody5, melodyDots);
              break;
            case 6:
              playMelody(melody6.sounds);
              animateMelody(melody6, melodyDots);
              break;
            case 7:
              playMelody(melody7.sounds);
              animateMelody(melody7, melodyDots);
              break;
            case 8:
              playMelody(melody8.sounds);
              animateMelody(melody8, melodyDots);
              break;
          }
        }
      });

      const drawLabelLevel10 = new Label({
        text:"Draw",
        size:30,
        italic:true,
        color: black
     });
    let drawBtn = new Button({
      label: drawLabelLevel10,
      width:190,
      height:60,
      backgroundColor:"#F2D388",
      rollBackgroundColor:"#DAC0A3",
      borderRaius:8,
      shadowColor:"grey",
    })
      .loc(150, 370, level10)
      .tap(() => {
        if (playingCompleted) {
          drawBtn.backgroundColor === purple
            ? (drawBtn.backgroundColor = "#F2D388")
            : (drawBtn.backgroundColor = purple);
          drawingEnabled = !drawingEnabled;
        }
      });

      const redrawLabelLevel10 = new Label({
        text:"Redraw",
        size:30,
        italic:true,
        color: black
     });
      new Button({
        label: redrawLabelLevel10,
        width:190,
        height:60,
        backgroundColor:"#F2D388",
        rollBackgroundColor:"#DAC0A3",
        borderRaius:8,
        shadowColor:"grey",
      })
        .loc(150, 520, level10)
        .tap(() => {
          selectedGroups = [];
          redraw();
        });

    const sort2dArr = (arr) => {
      arr.sort(sortFunction);

      function sortFunction(a, b) {
        if (a[0] === b[0]) {
          return 0;
        } else {
          return a[0] < b[0] ? -1 : 1;
        }
      }
      return arr;
    };

    let checkAnswer = (answer, possibleAnswer) => {
      let x = true;
      const sortedAnswer = sort2dArr(answer)
      // check length of higher level array
      if (sortedAnswer.length !== possibleAnswer.length) {
        x = false;
        return x
      }
      //check lengths of inner arrays
      for (let i = 0; i < sortedAnswer.length; i++) {
        if (sortedAnswer[i].length !== possibleAnswer[i].length) {
          x = false;
          return x
        }
      }

      // iterate through higher level array
      for (let i = 0; i < sortedAnswer.length; i++) {
        //iterate through inner arrays and compare their elemets
        for (let j = 0; j < sortedAnswer[i].length; j++) {
          if (sortedAnswer[i][j] != possibleAnswer[i][j]) {
            x = false;
          }
        }
      }
      return x;
    };

    const checkAllAnswers = () => {
      let index;
      let relevantOption;
      let answer // this answer is used when we do not find an existing possible answer
      let selectedGroupsWithoutEmptyArray = removeEmptyArrays(selectedGroups)  //Remove empty subarrays

      for (let option = 0; option < necklaceAnswers.length; option++) {
        if (checkAnswer(selectedGroupsWithoutEmptyArray, necklaceAnswers[option].points)) {
          index = option;
          relevantOption = necklaceAnswers[option];
        }
      }
      if(!index) {
        // Index is underfined is the submitted answer does not match to any of the existing possible answers
        answer = formatArrayTo1d(selectedGroupsWithoutEmptyArray)
      }
      return { index: index, option: relevantOption, answer: answer };
    };

    const getTextLevel10 = async (index, option, answer) => {
      let principle, percentage, text;
      if (index !== undefined && option !== undefined) {
        principle = option.principle;
        percentage = (
          (option.timesChosen /
            necklacesDocuments[currentNecklace - 1].numAnswersSubmitted) *
          100
        ).toFixed(2);

        //update database
        await updateDocument(
          "necklaces",
          necklacesDocuments[currentNecklace - 1].id,
          {
            numAnswersSubmitted:
              necklacesDocuments[currentNecklace - 1].numAnswersSubmitted + 1,
          }
        );
        await updateDocument("level12Answers", option.id, {
          timesChosen: option.timesChosen + 1,
        });

        text = `${percentage}% of the users have reported to experience the same grouping intuition as you submitted. You goruping intuition confirms the Gestalt principle of ${principle}.`;
      } else {

        if(answer.length && submittedForLevel < level){
        // add document to database with new answer
        const newAnswer = {
          answerClass: null, 
          necklace: currentNecklace,
          points: answer,
          principle: null, 
          timesChosen: 1
        }
        await createDocument("level12Answers", newAnswer)
        } else {
          console.error("Couldn't save new answer'")
        }

        text =
          "Your grouping intuition matches 0% of the previously submitted reports.";
      }
      return text;
    };

    const getCurrentMelody = () => {
      switch (currentNecklace) {
        case 1:
          return melody1;
          break;
        case 2:
          return melody2;
          break;
        case 3:
          return melody3;
          break;
        case 4:
          return melody4;
          break;
        case 5:
          return melody5;
        case 6:
          return melody6;
        case 7:
          return melody7;
        case 8:
          return melody8;
      }
    };

    const goToNextLevel = async (nextLevel) => {
      pages.go(nextLevel);
      if (level < 5) {
        shape.removeFrom(stage);
        stage.update();
      }
      level++;
      relevantAnswers = await getDocumentsByQuery("answers", "level", level);
      setTimeout(() => {
        if (level === 5) {
          modalInstructionsText.textContent =
            "Select a group that you perceive by clicking on the elements with the cursor. Submit you selection by pressing the 'Enter' key.";
        }
        modalInstructions.style.display = "block";
      }, 1000);
    };

    //Move to the next level functionlity
    nextLevelBtn.addEventListener("click", async () => {
        modalLevel1.style.display = "none";
      switch (level) {
        case 1:
          await goToNextLevel(level2);
          break;
        case 2:
          await goToNextLevel(level3);
          break;
        case 3:
          await goToNextLevel(level4);
          break;
        case 4:
          await goToNextLevel(level5);
          break;
        case 5:
          await goToNextLevel(level6);
          break;
        case 6:
          await goToNextLevel(level7);
          break;
        case 7:
          selectedSquiggles = [];
          await goToNextLevel(level8);
          break;
        case 8:
          await goToNextLevel(level9);
          break;
        case 9:
          level = 9.5;
          zimCanvas.style.display = "none";
          level0.style.display = "flex";
          introVideo.src = "https://www.youtube.com/embed/vOO6-w-MrmA";
          break;
        case 10:
          if (currentNecklace === 8) {
            zimCanvas.style.display = "none";
            level0.style.display = "flex";
            startBtn.textContent = "Go to chapter 6"
            introVideo.src = "https://www.youtube.com/embed/HGaO7Ccs4q8";
          } else {
            selectedGroups = [];
            removeDrawings();
            removeDots();
            currentNecklace++;
            await getNecklaceAnswers(currentNecklace);
            nextNecklace();
            drawBtn.backgroundColor = "#F2D388";
            level10.title.label.text = `Level 10.${currentNecklace}`
            stage.update();
          }
      }
    });
    stage.update();
  },
  null,
  true
);
