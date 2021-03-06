// === PART I === FUNDAMENTAL GESTALT PRINCIPLES === //

//Set the canvas using ZIM.js
const frame = new Frame(FIT, 1424, 768);
frame.on(
  "ready",
  () => {
    const stage = frame.stage;
    let stageW = frame.width;
    let stageH = frame.height;
    let drawingEnabled = false;
    let playingCompleted = true;
    let drawings=[];
    // shape for the pen
    let shape;
    // array to store the coordinates of the line drawn by the user
    let lineCords = [];
    //track the levels progress
    let level = 12;
    // initialize the var that contains the element id's of the elements selected by the user
    let selectedPoints;
    //For level 12
    let selectedGroups=[];

    // static possible answers.Will be replaced with a dynamic one in a database, once the backend will be developed. 
    let staticAnswers = [
      {
        level:1, 
        numAnswersSubmitted: 10,
        answers:[
        {
          answer: [112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'proximity',
          principle: 'Proximity' 
        },
        {
          answer: [160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'proximity',
          principle: 'Proximity' 
        },
        {
          answer: [112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 
            160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206],
          timesChosen: 0,
          percentage: 0,
          answerClass: undefined,
          principle: undefined
        }
      
      ]

    },
    {
      level: 2,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer:  [208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'similarity',
          principle: 'Similarity'
        },
        { 
          answer: [240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'similarity',
          principle: 'Similarity'
        },
        {
          answer: [208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238,
             240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270],
            timesChosen: 2,
            percentage: 20,
            answerClass: undefined,
            principle: 'Proximity'
        }
        
      ],
    },
    {
      level: 3,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326, 328, 330, 332, 334],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'similarity',
          principle: 'Similarity'
        },
        { 
          answer: [272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'similarity',
          principle: 'Similarity'
        },
        {
          answer: [272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302,
             304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326, 328, 330, 332, 334],
            timesChosen: 2,
            percentage: 20,
            answerClass: undefined,
            principle: 'Proximity'
        }
        
      ],
    },
    {
      level: 4,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [336, 338, 340, 342, 344, 346, 348, 364],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'continuity',
          principle: 'Continuity'
        },
        { 
          answer: [350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376, 378],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'similarity',
          principle: 'Similarity'
        },
        {
          answer: [336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376, 378],
            timesChosen: 1,
            percentage: 10,
            answerClass: undefined,
            principle: 'Proximity'
        },
        {
          answer: [336, 338, 340, 342, 344, 346, 348, 364, 366, 368, 370, 372, 374, 376, 378],
          timesChosen: 1,
          percentage: 10,
          answerClass: 'lShape',
          principle: 'Continuity'
      },
      {
        answer: [336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362, 364],
        timesChosen: 1,
        percentage: 10,
        answerClass: 'lShape',
        principle: 'Continuity'
    }
        
        
      ],
    },
    {
      level: 5,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [386, 388, 390, 392, 394, 396],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'continuity',
          principle: 'Continuity'
        },
        { 
          answer: [396, 398, 400, 402, 404, 406],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'continuity',
          principle: 'Continuity'
        },
        {
          answer: [406, 408, 410, 412, 414, 416],
            timesChosen: 9,
            percentage: 90,
            answerClass: 'continuity',
            principle: 'Continuity'
        },
        {
          answer: [416, 418, 420, 422, 424, 426],
          timesChosen: 9,
          percentage: 90,
          answerClass: 'continuity',
          principle: 'Continuity'
        },
        {
          answer:  [426, 428, 430, 432, 434, 436],
          timesChosen: 9,
          percentage: 90,
          answerClass: 'continuity',
          principle: 'Continuity'
        },
        {
          answer: [436, 438, 440, 442, 444, 446],
          timesChosen: 9,
          percentage: 90,
          answerClass: 'continuity',
          principle: 'Continuity'
        },
        {
          answer: [386, 388, 390, 392, 394, 396, 398, 400, 402, 404, 406, 408, 410, 412, 414, 416, 418, 420, 
            422, 424, 426, 428, 430, 432, 434, 436, 438, 440, 442, 444, 446],
            timesChosen: 1,
            percentage: 10,
            answerClass: 'hierarchy-continuity',
            principle: 'Continuity'
        }
        
      ],
    },
    {
      level: 6,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [486, 488],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'common-region',
          principle: 'Common region'
        },
        { 
          answer: [522, 524],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'common-region',
          principle: 'Common region'
        },
        {
          answer: [558, 560],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'common-region',
          principle: 'Common region'
        },
        {
          answer: [594, 596],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'common-region',
          principle: 'Common region'
        }
        
      ],
    },
    {
      level: 7,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [614, 643],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'parallelism',
          principle: 'Parallelism'
        },
        { 
          answer: [682, 721],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'parallelism',
          principle: 'Parallelism'
        },
        {
          answer: [760, 799],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'parallelism',
          principle: 'Parallelism'
        },        
      ],
    },
    {
      level: 8,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [842, 883],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'symmetry',
          principle: 'Symmetry'
        },
        { 
          answer: [922, 961],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'symmetry',
          principle: 'Symmetry'
        },
        {
          answer: [1000, 1039],
          timesChosen: 10,
          percentage: 100,
          answerClass: 'symmetry',
          principle: 'Symmetry'
        },        
      ],
    },
    {
      level: 9,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [1084, 1086, 1088, 1090, 1092, 1094, 1096],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'similarity2',
          principle: 'Similarity'
        },
        { 
          answer: [1098, 1100, 1102, 1104, 1106, 1108, 1110],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'similarity2',
          principle: 'Similarity'
        },
        {
          answer: [1084, 1086, 1088, 1090, 1092, 1094, 1096, 1098, 1100, 1102, 1104, 1106, 1108, 1110],
          timesChosen: 2,
          percentage: 20,
          answerClass: 'hierarchy-continuity2',
          principle: 'Continuity'
        },        
      ],
    },
    {
      level: 12,
      necklace: 1,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2], [3,4]],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'proximity3',
          principle: 'Proximity in pitch'
        },         
      ],
    },
    {
      level: 12,
      necklace: 2,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[5,6], [7,8]],
          timesChosen: 8,
          percentage: 80,
          answerClass: 'proximity4',
          principle: 'Proximity in time'
        },
         
      ],
    },
    {
      level: 12,
      necklace: 3,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2,3,4], [5,6,7,8]],
          timesChosen: 5,
          percentage: 50,
          answerClass: undefined,
          principle: 'Prarallelism'
        },
         
      ],
    },
    {
      level: 12,
      necklace: 3,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2,3], [4,5,6,7,8]],
          timesChosen: 5,
          percentage: 50,
          answerClass: undefined,
          principle: 'Proximity'
        },
         
      ],
    },
    {
      level: 12,
      necklace: 4,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2,3,4,5], [6,7,8]],
          timesChosen: 5,
          percentage: 50,
          answerClass: undefined,
          principle: 'Similarity in timbre'
        },
         
      ],
    },
    {
      level: 12,
      necklace: 5,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2],[3,4]],
          timesChosen: 10,
          percentage: 100,
          answerClass: undefined,
          principle: 'Change (dynamics)'
        },
         
      ],
    },
    {
      level: 12,
      necklace: 6,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2,3],[4,5,6],[7,8,9]],
          timesChosen: 10,
          percentage: 100,
          answerClass: undefined,
          principle: 'Symmetry'
        },
         
      ],
    },
    {
      level: 12,
      necklace: 7,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2,3,4],[5,6,7]],
          timesChosen: 10,
          percentage: 100,
          answerClass: undefined,
          principle: 'Change (register)'
        },
         
      ],
    },
    {
      level: 12,
      necklace: 8,
      numAnswersSubmitted: 10,
      answers: [
        {
          answer: [[1,2],[3,4,5,6,7]],
          timesChosen: 10,
          percentage: 100,
          answerClass: undefined,
          principle: 'Change (length)'
        },
         
      ],
    },
    ];
      
    const modalTexts = [
      {
        level: 1,
        text: "Your intuitive choice here confirms the Gestalt principle of PROXIMITY. According to this principle, the human mind, on the one hand, groups elements that are located in high high proximity from one another, and on the other, form a 'boundary' between elements the are relatively far from one another."
      },
      {
        level: 2, 
        text: "Your intuitive choice here confirms the Gestalt principle of SIMILARITY. According to this principle, the human mind, on the one hand, groups elements that are similar to each other. Similarity, however, have various categories. In our case, the elements you perceived as belonging to the same group, are similar to each other in color. Additionally, a gorup boundary is formed at points of dissimalirity, as your intuition has confirmed."
      },
      {
        level: 3,
         text: "Which Gestalt principle would you think your intuition has just confirmed?",
         options:[
           {
           correct: true,
           btnText: "Similarity in shape",
         },
         {
           correct: false,
          btnText: "Proximity"
        },
        {
        correct: false,
        btnText: "Similarity in color"
      },
      {
        correct: false,
        btnText: "Continuity"
      },
        ]
        },
      { 
        level: 4,
        text: "Your intuitive choice here confirms the Gestalt principle of CONTINUITY. According to this principle, the human mind groups elements that seem to form a continuious line, and interprets a group-boundary once this line is interrupted."
      },
      {
        level: 5,
         text: "Which Gestalt principle would you think your intuition has just confirmed?",
         options:[
           {
           correct: false,
           btnText: "Similarity in shape",
         },
         {
           correct: false,
          btnText: "Proximity"
        },
        {
        correct: false,
        btnText: "Similarity in color"
      },
      {
        correct: true,
        btnText: "Continuity"
      },
        ]
        },
        {
          level: 6,
          text: 'Your intuitive choice here confirms the Gestalt principle of COMMON REGION. According to this principle, the human mind groups elements that are located within the same region. In our case, the region is delineated by the red circles. Note, the principle of "common region" is in conflict with the principle of "proximity", and, in fact, overrides it. This means, that our intuition is a result of interactions between multiple Gestalt principles. In some cases, the involved principles reinforce one another, and in other, they contradict.'
        },
        {
          level: 7,
          text: 'Your intuitive choice here confirms the Gestalt principle of PARALLELISM. According to this principle, the human mind groups elements that are parallel to each other.'
        },
        {
          level: 8,
          text: 'What principle would you think supports your intuition?',
          options:[
            {
            correct: false,
            btnText: "Proximity",
          },
          {
            correct: false,
           btnText: "Parallelism"
         },
         {
         correct: true,
         btnText: "Symmetry"
       },
       {
         correct: true,
         btnText: "Continuity"
       },
         ]
        },
        {
          level:9,
          text:"In this example you could see that Gestalt principles form multiple hierarchical levels. While that principle of similarity in color forms two the two lower level groups, which with the support of the principle of continuity, form another higher-level-group. The fact the this higher-level group has meaning for us (the letter 'G'), only reinforces our perception of it.",
          question: "In the next example we have nultiple groups. Select the one that contains the most elements."
        }
    ]

    const arrayEquals=(a, b) =>{
      return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    }

    const getResponseText = (selectedPoints)=>{
      let relevantOptions = staticAnswers.find(obj=> obj.level == level);
      let principle;
      let percentage
      console.log(selectedPoints)
      let index;
      let text;
      if(!selectedPoints.length) {
        text = "You have not selected any points. Try again"
        return text
      }

      for(let i=0; i<relevantOptions.answers.length; i++){
        if(arrayEquals(relevantOptions.answers[i].answer, selectedPoints)){
          index = i;
        }
      }

      if(index!==undefined){
        principle = relevantOptions.answers[index].principle;
        percentage = (relevantOptions.answers[index].timesChosen / relevantOptions.numAnswersSubmitted *100).toFixed(2);

        relevantOptions.numAnswersSubmitted++; 
        relevantOptions.answers[index].timesChosen ++
        text = `${percentage}% of the users have reported to experience the same grouping intuition as you submitted. You goruping intuition confirms the Gestalt principle of ${principle}.`;
      }else{
        text= 'Your grouping intuition matches 0% of the previously submitted reports.';
      }
      return text
    }

    //get dom elements
    const modalLevel1 = document.querySelector(".modal-level-1");
    const nextLevelBtn = document.querySelector(".next-level-btn");
    const modalTextContainer = document.querySelector(".modal-body");
    const modalFooter = document.querySelector(".modal-footer");
    const cursor = document.querySelector(".cursor");

    // When the user answers correctly, he gets explanations about his/her intuition. This function matches the explanations to the current level.
    function matchModalTextToLevel(level, selectedPoints){
      modalTextContainer.textContent = getResponseText(selectedPoints)
      modalLevel1.style.display = "block";
    }

   // customizing the cursor
    document.addEventListener("mousemove", e=>{
      cursor.setAttribute("style", "top: " + (e.pageY-15) + "px; left: " + (e.pageX-12) + "px")
    });

    document.addEventListener("click", ()=>{
      cursor.classList.add('expand');
      setTimeout(()=>{
        cursor.classList.remove('expand');
      },500)
    })

    // Create the levels pages
    let level1 = new Page(stageW, stageH, black).cur('none');
    level1.title = new Label({text: "Level 1", color:white}).loc(100, 100, level1);

    let level2 = new Page(stageW, stageH, black).cur('none');
    level2.title = new Label({text: "Level 2", color:white}).loc(100, 100, level2);

    let level3 = new Page(stageW, stageH, black).cur('none');
    level3.title = new Label({text: "Level 3", color:white}).loc(100, 100, level3);

    let level4 = new Page(stageW, stageH, black).cur('none');
    level4.title = new Label({text: "Level 4", color:white}).loc(100, 100, level4);

    let level5 = new Page(stageW, stageH, black).cur('none');
    level5.title = new Label({text: "Level 5", color:white}).loc(100, 100, level5);

    let level6 = new Page(stageW, stageH, black).cur('none');
    level6.title = new Label({text: "Level 6", color:white}).loc(100, 100, level6);

    let level7 = new Page(stageW, stageH, black).cur('none');
    level7.title = new Label({text: "Level 7", color:white}).loc(100, 100, level7);

    let level8 = new Page(stageW, stageH, black).cur('none');
    level8.title = new Label({text: "Level 8", color:white}).loc(100, 100, level8);

    let level9 = new Page(stageW, stageH, black).cur('none');
    level9.title = new Label({text: "Level 9", color:white}).loc(100, 100, level9);

    let level10 = new Page(stageW, stageH, black).cur('grab');
    level10.title = new Label({text: "Level 10", color:white}).loc(100, 100, level10);

    let level11 = new Page(stageW, stageH, black).cur('grab');
    level11.title = new Label({text: "Level 11", color:white}).loc(100, 100, level11);

    let level12 = new Page(stageW, stageH, black).cur('grab');
    level12.title = new Label({text: "Level 12", color:white}).loc(100, 100, level12);

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
    level11.name = "level 12";

    let pages = new Pages({
      pages: [
        { page: level12 },
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

   
    //set up the dynamic drawing functionality
    let ticker;
    const dampX = new Damp(null, 0.1);
    const dampY = new Damp(null, 0.1);
    let getUpdatingPenCords;

    const getCurrentPenCords = function () {
      lineCords.push({
        x: frame.mouseX.toFixed(),
        y: frame.mouseY.toFixed(),
      });
      console.log(lineCords);
    };

    stage.on("stagemousedown", () => {
      if (level > 0 && level < 5) {
        draw()
      }
      if(level === 12 && drawingEnabled){
        draw();
      }
    });

    const draw = ()=>{
      console.log("level is between range");
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
    }

      
    stage.on("stagemouseup", () => {
      if (level > 0 && level < 5 || drawingEnabled) {
          Ticker.remove(ticker);

          clearInterval(getUpdatingPenCords);
          drawings.push(shape)
          console.log(drawings);
          switch (level) {
            case 1:
            selectedPoints = getSelectedPoints(level1DotsCords, lineCords)
          matchModalTextToLevel(level, selectedPoints)
              break;
            case 2:
               selectedPoints = getSelectedPoints(level2DotsCords, lineCords)
               matchModalTextToLevel(level, selectedPoints)
              break;
            case 3:
              selectedPoints = getSelectedPoints(level3DotsCords, lineCords)
              matchModalTextToLevel(level, selectedPoints)         
                 break;
             case 4:
              selectedPoints = getSelectedPoints(level4DotsCords, lineCords)
              matchModalTextToLevel(level, selectedPoints)  
             case 12:
               let currentMelody = getCurrentMelody()
               selectedPoints= getSelectedPoints(currentMelody, lineCords)   
               selectedGroups.push(selectedPoints);
               break;
              defualt: return;
          }

      }
    });

    //algorithm that checks if a point is in a polygon based on the raycast algo.
    const inside = (point, vs) =>{      
      let x = point[0], y = point[1];
      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          let xi = vs[i][0], yi = vs[i][1];
          let xj = vs[j][0], yj = vs[j][1];
          
          let intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect)inside = !inside;
      
      }
      return inside;
  };

  // Get rid of duplicated arrays in the multi-dimensional line cords array
  const multiDimensionalUnique=(arr)=> {
    let uniques = [];
    let itemsFound = {};
    for(let i = 0, l = arr.length; i < l; i++) {
        let stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

// The line cords are initially recieved as an array with objects. This function removes the objects and sets each point in an array. All the points are then stored in a 
// higher level array, returning a two-dimensional array of the line cords.
  const convertToArr = (lineCords) =>{
    let arr=[]
    for(let i=0; i < lineCords.length; i++){
      arr.push([Number(lineCords[i].x), Number(lineCords[i].y)])
    }

    return arr;
  }
  
  //A function that utilizes all utility functions and returns an array with the dots selected by the user
  const getSelectedPoints = (latticeDots, lineCords)=>{
    let cords = convertToArr(lineCords);
    let cordsWithoutDuplicates = multiDimensionalUnique(cords);
    let selectedPoints = []
    for(let i = 0;  i< latticeDots.cords.length; i++){
     let pointInCircle = inside([latticeDots.cords[i].x, latticeDots.cords[i].y], cordsWithoutDuplicates)
     if(pointInCircle){
       console.log('point inside')
       selectedPoints.push(latticeDots.cords[i].id)
     } 
    }
    return selectedPoints
  }
 

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
            levelDotsCords.cords.push({x:Xstart, y:Ystart, id: rect.id})
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
  
        console.log(levelDotsCords);
      }
    let dots=[]
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
            })
              .loc(Xstart, Ystart, level);
              levelDotsCords.cords.push({x:Xstart, y:Ystart, id: circle.id})
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

        console.log(levelDotsCords);
      }

    // === LEVEL 1 PROXIMITY === //

    let level1LatticeCords = [];
    let level1DotsCords = {name: 'level1', cords:[]};

    // args: beginning x position, beginning y position, number of rows, munber of cols, gap magnitude (step),color,level,levelLatticeCords
    createLattice(250, 300, 6, 4, 50, green, level1, level1LatticeCords, level1DotsCords);
    createLattice(600, 200, 6, 4, 50, green, level1, level1LatticeCords, level1DotsCords);

    // === LEVEL 2 SIMILARITY-COLOR === //

    let level2LatticeCords = [];
    let level2DotsCords = {name: 'level2', cords:[]};

    createLattice(430, 400, 4, 4, 50, blue, level2, level2LatticeCords,level2DotsCords);
    createLattice(430, 200, 4, 4, 50, yellow, level2, level2LatticeCords,level2DotsCords);

    // === LEVEL 3 SIMILARITY-SHAPE === //

    let level3LatticeCords = [];
    let level3DotsCords = {name: 'level3', cords:[]};

    createSquareLattice(530, 300, 4, 4, 50, blue, level3, level3LatticeCords,level3DotsCords);
    createLattice(340, 310, 4, 4, 50, blue, level3, level3LatticeCords, level3DotsCords);

    // === LEVEL 4 CONTINUITY === //
    let level4LatticeCords = [];
    let level4DotsCords = {name: 'level4', cords:[]};

    createLattice(700, 150, 7, 1, 50, red, level4,level4LatticeCords,level4DotsCords )
    createLattice(350, 500, 1, 15, 50, red, level4,level4LatticeCords,level4DotsCords )

    new Button({
      label: "SUBMIT",
    })
      .loc(430, 600, level4)
      .tap(()=> {
        for(let i=0; i< dots.length; i++){
          dots[i].id == 372? dots[i].color = blue : red
        }
        stage.update();
      });


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
        .tap(()=>{
          level5Button.color= blue;
          if(!userSelectedbtns.includes(level5Button.id))userSelectedbtns.push(level5Button.id);
          stage.update();
          console.log(userSelectedbtns)
        })

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
            .tap(()=>{
              level5Button.color= blue;
              if(!userSelectedbtns.includes(level5Button.id))userSelectedbtns.push(level5Button.id);
              stage.update();
              console.log(userSelectedbtns)
            })
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


      new Button({
        label: "SUBMIT",
      })
        .loc(400, 650, level5)
        .tap(()=> {
          let sorted = userSelectedbtns.sort((a,b) => {
            return a -b
          })
          matchModalTextToLevel(level, sorted) 
        });

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
            color: yellow
          }).loc(level6DotXpos, 400, level6).cur()
          .tap(()=>{
            dot.color = red;
            level6SelectedDots.push(dot.id);
            stage.update();
          })

          level6DotXpos += level6DotStep;
        }
        level6Xpos += level6Step;
        level6DotXpos -= 50;
      }

      new Button({
        label: "SUBMIT",
      })
        .loc(400, 600, level6)
        .tap(function () {
          let sorted = level6SelectedDots.sort((a,b) => {
            return a -b
          })
          matchModalTextToLevel(level, sorted)
        });
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
    function createSquiggles(
      num,
      levelPoints,
      yPos,
      xPos,
      pageNum,
    ) {
      for (let i = 0; i < num; i++) {
        let squiggle = new Squiggle({
          interactive: false,
          color: red,
          thickness: 5,
          points: levelPoints[i],
        })
          .loc(xPos[i], yPos, pageNum)
          .cur()
          .tap(()=>{
            squiggle.color = blue;
          squiggle.thickness = 10;
          console.log(squiggle.id);
          if (!selectedSquiggles.includes(squiggle.id))
            selectedSquiggles.push(squiggle.id);
          stage.update();
          })
        squiggles.push(squiggle);
      }
    }
    createSquiggles(
      6,
      level7Points,
      yPosLevel7,
      xPosLevel7,
      level7,
    );


    // a button to submit the user's answer and fire the checkSelection method of the CheckArrays class
    new Button({
      label: "SUBMIT",
    })
      .loc(400, 600, level7)
      .tap(()=> {

        let sorted = selectedSquiggles.sort((a,b) => {
          return a -b
        })
        matchModalTextToLevel(level,sorted)
      });

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
    createSquiggles(
      6,
      level8Points,
      yPosLevel8,
      xPosLevel8,
      level8,
    );

    new Button({
      label: "SUBMIT",
    })
      .loc(430, 600, level8)
      .tap(()=> {
        let sorted = selectedSquiggles.sort((a,b) => {
          return a -b
        })
        matchModalTextToLevel(level,sorted)
      });

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
    const createEventsForRects=()=> {
      rects.forEach((rect) => {
        rect.on("click", (e) => {
          rect.animate({
            props:{
              color: red
            }
          })
          stage.update();
          if (!selectedRects.includes(rect.id)) selectedRects.push(rect.id);
        });
      });
    }
    createEventsForRects();

    new Button({
      label: "SUBMIT",
    })
      .loc(400, 670, level9)
      .tap(()=> {
        let sorted = selectedRects.sort((a,b) => {
          return a -b
        })
        matchModalTextToLevel(level,sorted)
      });


   // === LEVEL 11 COMPOSE === //
    
    //create stave:
    new Line({length:1300, color:white}).loc(50, 300, level11);
    new Line({length:1300, color:white}).loc(50, 350, level11);
    new Line({length:1300, color:white}).loc(50, 400, level11);
    new Line({length:1300, color:white}).loc(50, 450, level11);
    new Line({length:1300, color:white}).loc(50, 500, level11);

    // the clef is a custome made squggle with the following points:
    let clefPoints = 
    [[116.4,157.9,0,0,-39.9,-39.6,39.9,39.6],
    [120.6,-130,0,0,-24.3,-5.8,13.9,3.3],
    [103.6,-12.7,0,0,49.8,-38.1,-20.7,15.9],
    [73.4,33.6,0,0,3.4,-14.1,-2.4,10.1,"straight"],
    [88.6,74.5,0,0,-12,-8.2,43.1,29.4,"straight"],
    [184.2,24.5,0,0,5.8,54.5,-5.8,-54.5],
    [120.7,40.3,0,0,-33.1,-26.7,42.8,34.5,"straight"]];
    

    // create a trebble clef for the stave, using the above points
   let clef = new Squiggle({
     points:clefPoints,
     color: orange,
     interactive: false
   }).loc(-10,410, level11);

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
       level11.children.filter((child, index) => index >=11)
       //map through these notes and return their coordinates
       .map(child => {
         return {x: child.x.toFixed(), y: child.y.toFixed()}
       })
       // sort them from lowest x value to higher, as melody is played from left to right
       .sort((a,b) => {
         return a.x -b.x
       })
       // Play back the sorted melody
       playMelody(circles);
     }
       );
 
       function playMelody(notes){
        let counter = 0
        playingCompleted = false;
        //determine which sound it is based on the note's location on the y axis
         determineAudioSrc(notes[counter].y, notes[counter].synth, notes[counter+1].vol)
        //If the melody has more than one note
        if(notes.length > 1){
          //a recursive function to immitate a loop with setTimeout with a dynamic delay.
           function inner(){
                window.setTimeout(()=> {
                  determineAudioSrc(notes[counter+1].y, notes[counter+1].synth, notes[counter+1].vol)
                  counter++
                  if(counter < notes.length-1){
                    inner();
                  }else {
                    // drawingEnabled = true
                    playingCompleted = true
                  }
                  // the delay is determined by the distance on the x axis between two consequtive sounds
                } , (notes[counter+1].x - notes[counter].x) *10)
          }
            inner()
        }
      }

       const synth = new Tone.Synth().toDestination();
       const amSynth = new Tone.AMSynth().toDestination();


       function determineAudioSrc(y, synth, vol){
         if(y <= 531 && y >=520){
           console.log("note d");
           return synth.triggerAttackRelease("D4", "16n", undefined, vol);
         }else if(y<= 521 && y >=495 ){
           console.log("note e");
           return synth.triggerAttackRelease("E4", "16n", undefined, vol);
         }else if(y<=494 && y>=470){
           console.log("note f");
           return synth.triggerAttackRelease("F4", "16n", undefined, vol);
         }else if(y<=469 && y>=448){
           console.log("note g");
           return synth.triggerAttackRelease("G4", "16n", undefined, vol);
         }else if(y<=447 && y>=415){
           console.log("note a");
           return synth.triggerAttackRelease("A4", "16n", undefined, vol);
         }else if(y<=414 && y>=397){
           console.log("note b");
           return synth.triggerAttackRelease("B4", "16n", undefined, vol);
         }else if(y<=396 && y>=364){
           console.log("note c2");
           return synth.triggerAttackRelease("C5", "16n", undefined, vol);
         }else if(y<=363 && y>=343){
           console.log("note d2");
           return synth.triggerAttackRelease("D5", "16n", undefined, vol);
         }else if(y<=342 && y>=319){
           console.log("note e2");
           return synth.triggerAttackRelease("E5", "16n", undefined, vol);
         }else if(y<=318 && y>= 295){
           console.log("note f2");
           return synth.triggerAttackRelease("F5", "16n", undefined, vol);
         }else if(y<=294 && y>=272){
           console.log("note g2");
           return synth.triggerAttackRelease("G5", "16n", undefined, vol);
         }
         
       }

       function checkTimeProx(notes){
        let TimeProxBoundaries = [];
         if(notes.length >= 3){
          for(let i=0; i<notes.length-2; i++){
            if((notes[i+1].x - notes[i].x) * 2 < (notes[i+2].x - notes[i+1].x)){
              TimeProxBoundaries.push({boundary_after_note: i+2, size: notes[i+2].x - notes[i+1].x });
            }
          }
          console.log(TimeProxBoundaries)
          return TimeProxBoundaries
          //remember to empty TimeProxBoundaries after feedback to user
         }
        }

        function checkPitchProx(notes){
          console.log("pitch prox")
          let PitchProxBoundaries = [];
          if(notes.length >= 3){
            for(let i=0; i<notes.length-2; i++){
              if((notes[i].y - notes[i+1].y) * 2 < (notes[i+1].y - notes[i+2].y)){
                PitchProxBoundaries.push({boundary_after_note: i+2, size: notes[i+1].y - notes[i+2].y });
              }
            }
            console.log(PitchProxBoundaries)
            return PitchProxBoundaries
            //remember to empty PitchProxBoundaries after feedback to user
           }
         }

       new Button({
         label: "Check"
       }).loc(800,700, level11).tap(function(){
        checkPitchProx(circles);
        checkTimeProx(circles);
      })

       // let focusedNote;
       let newNote;
  let addNote = new Button({
    label: "ADD NOTE"
  }).loc(800,600, level11).tap(function(){
     newNote = new Circle({
     color: yellow,
     radius: 15
    }).loc(800, 550, level11).drag()
    stage.update();
  })


  let note = new Circle({
   color: yellow,
   radius: 15,
   interactive: false
 }).loc(100, 100, level11).drag()

 note.on('dblclick', ()=>{
   console.log("double");
   note.removeFrom(level11);
   stage.update();
 })


 // === LEVEL 11 ANIMATION GAME === //
let gestaltPrinciples = ['proximity', 'similarity', 'continuity'];
let currentlyCorrect = gestaltPrinciples[1];

let columns= [600,650,700,750];
let rows = [300,350,400,450];
let elements = []

let blobPoints=[[-10,-10,0,0,0,0,0,0,"mirror"],[10,-10,0,0,0,0,0,0,"mirror"],[10,10,0,0,0,0,0,0,"mirror"],[-10,10,0,0,0,0,0,0,"mirror"]];
let trianglePoints= [[0,-10,0,0,0,0,0,0,"mirror"],[8.7,5,0,0,0,0,0,0,"mirror"],[-8.7,5,0,0,0,0,0,0,"mirror"],[-8.7,5,0,0,0,0,0,0,"mirror"]];
let paddlePoints = [[-10.3,-100,0,0,-53.1,1,53.1,-1,"mirror"],[18,-4.1,0,0,46.1,-43.8,-46.1,43.8,"mirror"],[-8.2,104.1,0,0,50,0,-50,0,"mirror"],[-39.5,-2.1,0,0,46.1,40.8,-46.1,-40.8,"mirror"]];
let hourGlassPoints = [[10,-10,0,0,0,0,0,0,"mirror"],[-10,-10,0,0,0,0,0,0,"mirror"],[10,10,0,0,0,0,0,0,"mirror"],[-10,10,0,0,0,0,0,0,"mirror"]];
let region1Points=[[4.4,-94.5,0,0,-29.6,59.5,29.6,-59.5,"mirror"],[179.1,9.3,0,0,0,-50,0,50,"mirror"],[2.9,126.3,0,0,50,0,-50,0,"mirror"],[-161.1,10,0,0,-18.3,39,18.3,-39,"mirror"]];
let region2Points= [[-62.8,-141.2,0,0,-59.8,63.4,59.8,-63.4,"mirror"],[143.1,-49.1,0,0,0,-50,0,50,"mirror"],[0,100,0,0,50,0,-50,0,"mirror"],[-76.4,23.6,0,0,-18.3,39,18.3,-39,"mirror"]];
let region3Points= [[-62.8,-141.2,0,0,-59.8,63.4,59.8,-63.4,"mirror"],[143.1,-49.1,0,0,-16.5,-67.5,16.5,67.5,"mirror"],[159.6,138,0,0,50,0,-50,0,"mirror"],[-153.3,48,0,0,17.7,58.5,-17.7,-58.5,"mirror"]];


let square = new Blob({
  points: blobPoints,
  interactive: false
});
let triangle = new Blob({
  points:trianglePoints,
  interactive: false
})
let paddle = new Blob({
points:paddlePoints,
interactive: false
})
let hourGlass = new Blob({
  points: hourGlassPoints,
  interactive: false
})
let region1 = new Blob({
  points: region1Points,
  interactive: false
})
let region2 = new Blob({
  points: region2Points,
  interactive: false
})
let region3 = new Blob({
  points: region3Points,
  interactive: false
})


let animations=[
  {
    name: 'proximity1',
    x:[600, 600, 600, 600,650, 650, 650, 650,750, 750, 750, 750,800, 800, 800, 800],
    y:[300,350,400,450,300,350,400,450,300,350,400,450,300,350,400,450],
    shape: [square, square,square, square,square, square,square,square,square,square,square,square,square,square,square,square],
    color:[green, green, green, green, green, green, green, green,green, green, green, green, green, green, green, green],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'proximity2',
    x:[400, 430, 460, 550,600, 710, 730, 750,770, 830, 860, 890,920, 1050, 1100, 1150],
    y:[500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500],
    shape: [hourGlass, triangle,square, hourGlass,triangle, hourGlass,square,triangle,square,square,triangle,square,hourGlass,square,triangle,square],
    color:[green, red, green, yellow, green, green, blue, green,green, yellow, green, green, red, blue, green, blue],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'similarity1',
    x:[600, 600, 600, 600,650, 650, 650, 650,700, 700, 700, 700,750, 750, 750, 750],
    y:[300,350,400,450,300,350,400,450,300,350,400,450,300,350,400,450],
    shape: [square, square,square, square,square, square,square,square,square,square,square,square,square,square,square,square],
    color:[green, blue, blue, green, green, blue, blue, green,green, blue, blue, green, green, blue, blue, green],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'common region1',
    x:[500, 730, 750, 650, 690, 700, 730, 740, 570, 670, 550, 500, 700, 600, 750, 700],
    y:[350, 240, 510, 380, 400, 320, 450, 290, 350, 450, 430, 380, 500, 400, 420, 270],
    shape: [region1, region2,region3, hourGlass,square, square,triangle,square,square,square,square,hourGlass,square,hourGlass,hourGlass,hourGlass],
    color:[yellow, blue, green, blue, orange, orange, red, yellow, red, blue, blue, orange, red, red, orange, orange],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'proximity3',
    x:[600, 600, 600, 600,670, 670, 670, 670,730, 730, 730, 730,780, 780, 780, 780],
    y:[300,350,400,450,300,350,400,450,400,450,500,550,400,450,500,550],
    shape: [square, triangle,square, square,square, square,triangle,square,square,triangle,square,square,square,square,triangle,square],
    color:[green, green, yellow, yellow, green, green, yellow, yellow,yellow, yellow, green, green, yellow, yellow, green, green],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'common region2',
    x:[550, 730, 450, 500, 550, 700, 590, 740, 570, 600, 630, 680, 720, 675, 740, 700],
    y:[450, 290, 510, 510, 490, 320, 450, 290, 370, 410, 380, 360, 245, 500, 220, 280],
    shape: [region1, region2,square, hourGlass,square, hourGlass,triangle,square,hourGlass,square,hourGlass,triangle,square,triangle,hourGlass,triangle],
    color:[yellow, blue, green, blue, orange, orange, red, yellow, red, blue, blue, yellow, red, red, orange, green],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'similarity2',
    x:[600, 600, 600, 600,650, 650, 650, 650,700, 700, 700, 700,750, 750, 750, 750],
    y:[300,350,400,450,300,350,400,450,300,350,400,450,300,350,400,450],
    shape: [triangle, triangle,square, square,triangle, triangle,square,square,triangle,triangle,square,square,triangle,triangle,square,square],
    color:[green, green, green, green, green, green, green, green,green, green, green, green, green, green, green, green],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'similarity3',
    x:[600, 600, 600, 600,650, 650, 650, 650,700, 700, 700, 700,750, 750, 750, 750],
    y:[300,350,400,450,300,350,400,450,300,350,400,450,300,350,400,450],
    shape: [square, hourGlass,hourGlass, square,square, hourGlass,hourGlass,square,square,hourGlass,hourGlass,square,square,hourGlass,hourGlass,square],
    color:[blue, blue, blue, blue, blue, blue, yellow, yellow,red, red, yellow, yellow, red, red, yellow, yellow],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'continuity1',
    x:[600, 650, 700, 750,800, 850, 900,900, 600, 650, 700,700, 670, 630, 670,710],
    y:[300,340,380,400,380,340,300,300,400,450,500,550,600,650,680,690],
    shape: [hourGlass, hourGlass,hourGlass, hourGlass,hourGlass, hourGlass,hourGlass,hourGlass,hourGlass,hourGlass,hourGlass,hourGlass,hourGlass,hourGlass,hourGlass,hourGlass],
    color:[yellow, yellow, yellow, yellow, yellow, yellow, yellow, yellow,yellow, yellow, yellow, yellow, yellow, yellow, yellow, yellow],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: 'continuity2',
    x:[310, 380, 450,520,590, 660,730, 800, 660,730, 800, 870, 940,1010, 1080, 1150],
    y:[470,470,470,470,470,470,470,470,500,500,500,500,500,500,500,500],
    shape: [hourGlass, hourGlass,hourGlass, hourGlass,hourGlass, triangle,triangle,triangle,square,square,square,hourGlass,hourGlass,hourGlass,hourGlass,hourGlass],
    color:[yellow, yellow, yellow, yellow, yellow, red, red, red,blue, blue, blue, yellow, yellow, yellow, yellow, yellow],
    scale:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },


];
let previous;
const getRandom = ()=>{
 let random = Math.floor(Math.random()*9)
 if(random ===previous){
   return getRandom()
 }else{
   return random
 }
}

const animate = ()=>{
  let random = getRandom()
  previous = random
  console.log(random)
  elements.forEach((element, i)=>{
    element.animate({
      props:{
        x: animations[random].x[i],
        y:animations[random].y[i],
        shape: animations[random].shape[i],
        color: animations[random].color[i]
        // x: animations[4].x[i],
        // y:animations[4].y[i],
        // shape: animations[4].shape[i],
        // color: animations[4].color[i],
        // scale: animations[4].scale[i]
      }
    })
  })
}

let createLevel11Lattice = ()=>{
  for(let column = 0; column<columns.length; column++){
    for(let row = 0; row<rows.length; row++){
      let element = new Blob({
        points: blobPoints,
        interactive: false
      }).loc(columns[column],rows[row], level10);
      elements.push(element);
    }
  }

  let btn = new Button({
    label:"Start"
  }).loc(100,200,level10).tap(()=>{
    animate()
  })
}

let proximityBtn =new Button({
  label:"Proximity"
}).loc(100,600,level10).tap(()=>{
  animate()
})
let similarityBtn = new Button({
  label:"Similarity"
}).loc(100,400,level10).tap(()=>{
  animate()
})
let continuityBtn = new Button({
  label:"Continuity"
}).loc(1100,600,level10).tap(()=>{
  animate()
})
let commonFateBtn = new Button({
  label:"Common fate"
}).loc(1100,400,level10).tap(()=>{
  animate()
})
let commonRegionBtn = new Button({
  label:"Common region"
}).loc(1100,200,level10).tap(()=>{
  animate()
})



createLevel11Lattice();

 // functionality: I have an array of principles. I have a function that get a random number. The number will the index to choose a random principle. 
 // I will make as many blobs as needed for the initial lattice. The number of the blobs will remain throughout. Each blob will have the same amount of alternatives as the number of principles.
 // The animate function will recieve the random index and will accordingly animate to the matching alternative blob, and to its matching position on the screen. 
 // There will also be a var that contains the currently presented principle in order to check the users submitted answer.

 // === END ANIMATION GAME === //

 // === LEVEL 12 === //

 let currentNecklace = 1;

let necklace = new Blob({
  interactive: false,
  borderColor: white,
  borderWidth: 4,
  radius: 250
}).loc(700,400,level12)

const defaultVol = 0.7;

  //Prox in pitch
  let melody1 ={ 
    sounds:[
      {x: 100, y: 525, synth: synth, vol:defaultVol},
      {x: 200, y: 525, synth: synth, vol:defaultVol},
      {x: 300, y: 425, synth: synth, vol:defaultVol},
      {x: 400, y: 425, synth: synth, vol:defaultVol},
    ],
    cords:[
      { x: 450, y:400, id:1},
      { x: 700, y: 150, id:2},
      { x: 950, y:400, id:3},
      { x:700, y:650, id:4},
    ]
  }
  

  //Prox in time
  let melody2 ={ 
    sounds:[
      {x: 100, y: 525, synth: synth , vol:defaultVol},
      {x: 150, y: 525, synth: synth , vol:defaultVol},
      {x: 350, y: 525, synth: synth , vol:defaultVol},
      {x: 400, y: 525, synth: synth , vol:defaultVol},
    ],
    cords:[
      { x: 450, y:400, id:5},
      { x: 700, y: 150, id:6},
      { x: 950, y:400, id:7},
      { x:700, y:650, id:8},
    ]
  }

  let melody3 ={ 
    sounds:[
      {x: 100, y: 450,  synth: synth, vol:defaultVol},
      {x: 200, y: 450,  synth: synth, vol:defaultVol},
      {x: 250, y: 500,  synth: synth, vol:defaultVol},
      {x: 350, y: 500,  synth: synth, vol:defaultVol},
      {x: 400, y: 475,  synth: synth, vol:defaultVol},
      {x: 500, y: 475,  synth: synth, vol:defaultVol},
      {x: 550, y: 525,  synth: synth, vol:defaultVol},
      {x: 650, y: 525,  synth: synth, vol:defaultVol},
    ],
    cords:[
      {x: 700, y:150, id:1},
      { x: 870, y: 230, id:2},
      { x: 950, y:400, id:3},
      {x:870, y:570, id:4},
      { x:700, y:650, id:5},
      { x:530, y:570, id:6},
      {x:450, y:400, id:7},
      {x:530, y:230, id:8},
    ]
  }

  let melody4 ={ 
    sounds:[
      {x: 100, y: 525,  synth: synth, vol:defaultVol},
      {x: 175, y: 500,  synth: synth, vol:defaultVol},
      {x: 250, y: 475,  synth: synth, vol:defaultVol},
      {x: 325, y: 450,  synth: synth, vol:defaultVol},
      {x: 400, y: 425,  synth: synth, vol:defaultVol},
      {x: 475, y: 400,  synth: amSynth, vol:defaultVol},
      {x: 550, y: 375,  synth: amSynth, vol:defaultVol},
      {x: 625, y: 350,  synth: amSynth, vol:defaultVol},
    ],
    cords:[
      {x: 700, y:150, id:1},
      { x: 870, y: 230, id:2},
      { x: 950, y:400, id:3},
      {x:870, y:570, id:4},
      { x:700, y:650, id:5},
      { x:530, y:570, id:6},
      {x:450, y:400, id:7},
      {x:530, y:230, id:8},
    ]
  }

  let melody5 ={ 
    sounds:[
      {x: 100, y: 525, synth: synth, vol: defaultVol},
      {x: 200, y: 525, synth: synth, vol: defaultVol},
      {x: 300, y: 525, synth: synth, vol: 1.4},
      {x: 400, y: 525, synth: synth, vol: 1.4},
    ],
    cords:[
      { x: 450, y:400, id:1},
      { x: 700, y: 150, id:2},
      { x: 950, y:400, id:3},
      { x:700, y:650, id:4},
    ]
  }

  let melody6 ={ 
    sounds:[
      {x: 100, y: 500,  synth: synth, vol:defaultVol},
      {x: 175, y: 400,  synth: synth, vol:defaultVol},
      {x: 250, y: 400,  synth: synth, vol:defaultVol},
      {x: 325, y: 500,  synth: synth, vol:defaultVol},
      {x: 400, y: 400,  synth: synth, vol:defaultVol},
      {x: 475, y: 400,  synth: synth, vol:defaultVol},
      {x: 550, y: 500,  synth: synth, vol:defaultVol},
      {x: 625, y: 400,  synth: synth, vol:defaultVol},
      {x: 700, y: 400,  synth: synth, vol:defaultVol},
    ],
    cords:[
      { x: 460, y:460, id:1},
      { x: 470, y: 300, id:2},
      { x: 580, y:185, id:3},
      { x: 770, y:165, id:4},
      { x: 900, y:270, id:5},
      { x: 940, y: 450, id:6},
      { x: 855, y:585, id:7},
      { x:700, y:650, id:8},
      { x:550, y:590, id:9},
    ]
  }

  let melody7 ={ 
    sounds:[
      {x: 100, y: 325,  synth: synth, vol:defaultVol},
      {x: 130, y: 300,  synth: synth, vol:defaultVol},
      {x: 160, y: 280,  synth: synth, vol:defaultVol},
      {x: 190, y: 300,  synth: synth, vol:defaultVol},
      {x: 220, y: 525,  synth: synth, vol:defaultVol},
      {x: 250, y: 525,  synth: synth, vol:defaultVol},
      {x: 280, y: 500,  synth: synth, vol:defaultVol},

    ],
    cords:[
      { x: 560, y:600, id:1},
      { x: 455, y: 450, id:2},
      { x: 510, y:250, id:3},
      { x: 700, y:150, id:4},
      { x: 900, y:260, id:5},
      { x: 940, y: 460, id:6},
      { x: 810, y:620, id:7},
    ]
  }
  let melody8 ={ 
    sounds:[
      {x: 100, y: 475,  synth: synth, vol:defaultVol},
      {x: 160, y: 450,  synth: synth, vol:defaultVol},
      {x: 220, y: 425,  synth: synth, vol:defaultVol},
      {x: 250, y: 450,  synth: synth, vol:defaultVol},
      {x: 280, y: 425,  synth: synth, vol:defaultVol},
      {x: 310, y: 400,  synth: synth, vol:defaultVol},
      {x: 340, y: 375,  synth: synth, vol:defaultVol},

    ],
    cords:[
      { x: 900, y:260, id:1},
      { x: 940, y: 460, id:2},
      { x: 810, y:620, id:3},
      { x: 560, y:600, id:4},
      { x: 455, y: 450, id:5},
      { x: 510, y:250, id:6},
      { x: 700, y:150, id:7},

    ]
  }
 
 

xPos = [450,700,950, 700];
yPos=[400, 150, 400, 650 ]
let melodyDots = [];

const createMelodyDots = (melody, color)=>{
  for(let i=0; i<melody.sounds.length; i++){
    let dot = new Circle({
      color: color,
      radius:20
    }).loc(melody.cords[i].x,melody.cords[i].y, level12)
    melodyDots.push(dot)
  }
  }
  createMelodyDots(melody1, red)

  const animateMelody = (melody, dots)=>{
    let counter = 0;
    dots[counter].animate({
      props:{scale:1.5},
      rewind:true,
      time: .1
    })
    function inner(){
      window.setTimeout(()=>{
        dots[counter+1].animate({
            props:{scale:1.5},
            rewind:true,
            time: .1
          })
          counter++;
          if(counter < melody.sounds.length-1){
            inner();
          }
          // console.log(melody[counter+1].x - melody[counter].x)
      }, (melody.sounds[counter+1].x - melody.sounds[counter].x)*10);
    }
    inner()
  }

  const removeDrawings = ()=>{
    // if(stage.children.length > 1){
    //   for(let i=0; i<stage.children.length; i++){
    //     stage.children.pop()
    //     stage.update()
    //   }
    // }
    console.log(drawings)
    for(let i=0; i<drawings.length; i++){
      drawings[i].removeFrom()
    }
    drawings = [];
    stage.update();

  }

  const removeDots = ()=>{
    console.log(melodyDots)
    for(let i=0; i<melodyDots.length; i++){
      melodyDots[i].removeFrom()
    }
    melodyDots=[]
    stage.update();
  }

  const nextNecklace = ()=>{
    switch(currentNecklace){
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
        createMelodyDots(melody5, red)  
        break;
      case 6: 
        createMelodyDots(melody6, blue)
        break;
       case 7: 
        createMelodyDots(melody7, yellow)
        break;
       case 8:
         createMelodyDots(melody8, green) 
    }
  }
  
let playBtnLevel12 = new Button({
  label: 'Play'
}).loc(200,200, level12)
.tap(()=>{
  if(playingCompleted){
  switch(currentNecklace){
    case 1:
        playMelody(melody1.sounds)
       animateMelody(melody1, melodyDots)

      break;
    case 2:
      playMelody(melody2.sounds)
      animateMelody(melody2,melodyDots)
      break;
    case 3:
      playMelody(melody3.sounds)
      animateMelody(melody3,melodyDots) 
      break;
    case 4:
      playMelody(melody4.sounds)
      animateMelody(melody4,melodyDots)  
      break;
    case 5:
      playMelody(melody5.sounds)
      animateMelody(melody5,melodyDots) 
      break;
    case 6:
      playMelody(melody6.sounds)
      animateMelody(melody6,melodyDots)     
      break;
    case 7:
      playMelody(melody7.sounds) 
      animateMelody(melody7,melodyDots)
      break; 
    case 8:
      playMelody(melody8.sounds)
      animateMelody(melody8,melodyDots)
      break;  
  }
}
})

let drawBtn = new Button({
  label: 'Draw'
}).loc(200,600, level12)
.tap(()=>{
if(playingCompleted){
  drawBtn.backgroundColor === purple ? drawBtn.backgroundColor = orange : drawBtn.backgroundColor = purple
  drawingEnabled = !drawingEnabled
}
console.log("Drawing: " + drawingEnabled)
})

const sort2dArr=(arr)=>{
  arr.sort(sortFunction);

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
  return arr
}


let checkAnswer = (answer, possibleAnswer)=>{
  let sortedAnswer = sort2dArr(answer)
  x = true
  // check length of higher level array
  if(sortedAnswer.length !== possibleAnswer.length){
    x = false
  }
  //check lengths of inner arrays
  for(let i = 0; i < sortedAnswer.length; i++){
    if(sortedAnswer[i].length !== possibleAnswer[i].length){
      x= false
    }
  }

  // iterate through higher level array
  for(let i = 0; i < sortedAnswer.length; i++){
    //iterate through inner arrays and compare their elemets
    for(let j = 0; j < sortedAnswer[i].length; j++){
      if(sortedAnswer[i][j]!= possibleAnswer[i][j]){ 
        x= false
      }
    }
  }
return x
}

const checkAllAnswers=()=>{
  let relevantOptions = staticAnswers.filter(answer => answer.necklace == currentNecklace);
  let index;
  let relevantOption;

  for(let option = 0; option < relevantOptions.length; option++){
  for(let i = 0; i < relevantOptions[option].answers.length; i++){  
    console.log(relevantOptions[option].answers[i].answer)
    console.log(selectedGroups)
    if(checkAnswer(selectedGroups ,relevantOptions[option].answers[i].answer)){
         index=i
         relevantOption = option
    }
  }
  }
  return {index: index, option: relevantOption}
}

const getTextLevel12 = (index, option)=>{
  let relevantOptions = staticAnswers.filter(answer => answer.necklace == currentNecklace);
  let principle, percentage;
  if(index!==undefined && option !== undefined){
    principle = relevantOptions[option].answers[index].principle;
    percentage = (relevantOptions[option].answers[index].timesChosen / relevantOptions[option].numAnswersSubmitted *100).toFixed(2);
    
    for(let i = 0; i < relevantOptions.length; i++){
      relevantOptions[i].numAnswersSubmitted++; 
    }

    relevantOptions[option].answers[index].timesChosen ++
    text = `${percentage}% of the users have reported to experience the same grouping intuition as you submitted. You goruping intuition confirms the Gestalt principle of ${principle}.`;
  }else{
    text= 'Your grouping intuition matches 0% of the previously submitted reports.';
  }
  return text
}



document.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'){
    drawingEnabled = false;
    const {index, option} = checkAllAnswers()
    modalTextContainer.textContent = getTextLevel12(index, option)
    modalLevel1.style.display="block"
  }
})

const getCurrentMelody = () => {
  switch(currentNecklace){
    case 1:
      return melody1
      break;
    case 2: 
      return melody2
      break;
    case 3: 
      return melody3
      break;    
    case 4: 
      return melody4  
      break;
    case 5: 
      return melody5  
    case 6: 
      return melody6 
    case 7: 
     return melody7 
     case 8: 
     return melody8  
  }
}



   //Move to the next level functionlity   
    nextLevelBtn.addEventListener("click", () => {
      modalLevel1.style.display = "none";
      switch (level) {
        case 1:
          pages.go(level2);
        shape.removeFrom(stage);
      stage.update();
        case 2:
          pages.go(level3);
          shape.removeFrom(stage);
          stage.update();
        case 3:
          pages.go(level4);
          shape.removeFrom(stage);
          stage.update();
        case 4:
          pages.go(level5);
          shape.removeFrom(stage);
          stage.update();
        case 5:
          pages.go(level6);
          break;
        case 6:
          pages.go(level7);
          break;
        case 7:
          selectedSquiggles = [];
          pages.go(level8);
          break;
        case 8:
          pages.go(level9);
          break;
        case 9:
          pages.go(level10);
          break;
        case 10:
          pages.go(level11);
          break;  
        case 12:
          selectedGroups = []
          removeDrawings()
          removeDots()
          currentNecklace++  
          nextNecklace()
          drawBtn.backgroundColor = orange 
          stage.update()
        
      }

      // level++;
      console.log("level: " + level);
    });

    stage.update();
  },
  null,
  true
);
