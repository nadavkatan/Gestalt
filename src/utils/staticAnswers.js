// static possible answers.Will be replaced with a dynamic one in a database, once the backend will be developed.
let staticAnswers = [
  {
    level: 1,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138,
          140, 142, 144, 146, 148, 150, 152, 154, 156, 158,
        ],
        timesChosen: 10,
        percentage: 100,
        answerClass: "proximity",
        principle: "Proximity",
      },
      {
        answer: [
          160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186,
          188, 190, 192, 194, 196, 198, 200, 202, 204, 206,
        ],
        timesChosen: 10,
        percentage: 100,
        answerClass: "proximity",
        principle: "Proximity",
      },
      {
        answer: [
          112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138,
          140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166,
          168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194,
          196, 198, 200, 202, 204, 206,
        ],
        timesChosen: 0,
        percentage: 0,
        answerClass: undefined,
        principle: undefined,
      },
    ],
  },
  {
    level: 2,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234,
          236, 238,
        ],
        timesChosen: 8,
        percentage: 80,
        answerClass: "similarity",
        principle: "Similarity",
      },
      {
        answer: [
          240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266,
          268, 270,
        ],
        timesChosen: 8,
        percentage: 80,
        answerClass: "similarity",
        principle: "Similarity",
      },
      {
        answer: [
          208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234,
          236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262,
          264, 266, 268, 270,
        ],
        timesChosen: 2,
        percentage: 20,
        answerClass: undefined,
        principle: "Proximity",
      },
    ],
  },
  {
    level: 3,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326, 328, 330,
          332, 334,
        ],
        timesChosen: 8,
        percentage: 80,
        answerClass: "similarity",
        principle: "Similarity",
      },
      {
        answer: [
          272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298,
          300, 302,
        ],
        timesChosen: 8,
        percentage: 80,
        answerClass: "similarity",
        principle: "Similarity",
      },
      {
        answer: [
          272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298,
          300, 302, 304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326,
          328, 330, 332, 334,
        ],
        timesChosen: 2,
        percentage: 20,
        answerClass: undefined,
        principle: "Proximity",
      },
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
        answerClass: "continuity",
        principle: "Continuity",
      },
      {
        answer: [
          350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376,
          378,
        ],
        timesChosen: 8,
        percentage: 80,
        answerClass: "similarity",
        principle: "Similarity",
      },
      {
        answer: [
          336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362,
          364, 366, 368, 370, 372, 374, 376, 378,
        ],
        timesChosen: 1,
        percentage: 10,
        answerClass: undefined,
        principle: "Proximity",
      },
      {
        answer: [
          336, 338, 340, 342, 344, 346, 348, 364, 366, 368, 370, 372, 374, 376,
          378,
        ],
        timesChosen: 1,
        percentage: 10,
        answerClass: "lShape",
        principle: "Continuity",
      },
      {
        answer: [
          336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362,
          364,
        ],
        timesChosen: 1,
        percentage: 10,
        answerClass: "lShape",
        principle: "Continuity",
      },
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
        answerClass: "continuity",
        principle: "Continuity",
      },
      {
        answer: [396, 398, 400, 402, 404, 406],
        timesChosen: 8,
        percentage: 80,
        answerClass: "continuity",
        principle: "Continuity",
      },
      {
        answer: [406, 408, 410, 412, 414, 416],
        timesChosen: 9,
        percentage: 90,
        answerClass: "continuity",
        principle: "Continuity",
      },
      {
        answer: [416, 418, 420, 422, 424, 426],
        timesChosen: 9,
        percentage: 90,
        answerClass: "continuity",
        principle: "Continuity",
      },
      {
        answer: [426, 428, 430, 432, 434, 436],
        timesChosen: 9,
        percentage: 90,
        answerClass: "continuity",
        principle: "Continuity",
      },
      {
        answer: [436, 438, 440, 442, 444, 446],
        timesChosen: 9,
        percentage: 90,
        answerClass: "continuity",
        principle: "Continuity",
      },
      {
        answer: [
          386, 388, 390, 392, 394, 396, 398, 400, 402, 404, 406, 408, 410, 412,
          414, 416, 418, 420, 422, 424, 426, 428, 430, 432, 434, 436, 438, 440,
          442, 444, 446,
        ],
        timesChosen: 1,
        percentage: 10,
        answerClass: "hierarchy-continuity",
        principle: "Continuity",
      },
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
        answerClass: "common-region",
        principle: "Common region",
      },
      {
        answer: [522, 524],
        timesChosen: 10,
        percentage: 100,
        answerClass: "common-region",
        principle: "Common region",
      },
      {
        answer: [558, 560],
        timesChosen: 10,
        percentage: 100,
        answerClass: "common-region",
        principle: "Common region",
      },
      {
        answer: [594, 596],
        timesChosen: 10,
        percentage: 100,
        answerClass: "common-region",
        principle: "Common region",
      },
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
        answerClass: "parallelism",
        principle: "Parallelism",
      },
      {
        answer: [682, 721],
        timesChosen: 10,
        percentage: 100,
        answerClass: "parallelism",
        principle: "Parallelism",
      },
      {
        answer: [760, 799],
        timesChosen: 10,
        percentage: 100,
        answerClass: "parallelism",
        principle: "Parallelism",
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
        answerClass: "symmetry",
        principle: "Symmetry",
      },
      {
        answer: [922, 961],
        timesChosen: 10,
        percentage: 100,
        answerClass: "symmetry",
        principle: "Symmetry",
      },
      {
        answer: [1000, 1039],
        timesChosen: 10,
        percentage: 100,
        answerClass: "symmetry",
        principle: "Symmetry",
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
        answerClass: "similarity2",
        principle: "Similarity",
      },
      {
        answer: [1098, 1100, 1102, 1104, 1106, 1108, 1110],
        timesChosen: 8,
        percentage: 80,
        answerClass: "similarity2",
        principle: "Similarity",
      },
      {
        answer: [
          1084, 1086, 1088, 1090, 1092, 1094, 1096, 1098, 1100, 1102, 1104,
          1106, 1108, 1110,
        ],
        timesChosen: 2,
        percentage: 20,
        answerClass: "hierarchy-continuity2",
        principle: "Continuity",
      },
    ],
  },
  {
    level: 12,
    necklace: 1,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2],
          [3, 4],
        ],
        timesChosen: 8,
        percentage: 80,
        answerClass: "proximity3",
        principle: "Proximity in pitch",
      },
    ],
  },
  {
    level: 12,
    necklace: 2,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [5, 6],
          [7, 8],
        ],
        timesChosen: 8,
        percentage: 80,
        answerClass: "proximity4",
        principle: "Proximity in time",
      },
    ],
  },
  {
    level: 12,
    necklace: 3,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
        ],
        timesChosen: 5,
        percentage: 50,
        answerClass: undefined,
        principle: "Parallelism",
      },
    ],
  },
  {
    level: 12,
    necklace: 3,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2, 3],
          [4, 5, 6, 7, 8],
        ],
        timesChosen: 5,
        percentage: 50,
        answerClass: undefined,
        principle: "Proximity",
      },
    ],
  },
  {
    level: 12,
    necklace: 4,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2, 3, 4, 5],
          [6, 7, 8],
        ],
        timesChosen: 5,
        percentage: 50,
        answerClass: undefined,
        principle: "Similarity in timbre",
      },
    ],
  },
  {
    level: 12,
    necklace: 5,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2],
          [3, 4],
        ],
        timesChosen: 10,
        percentage: 100,
        answerClass: undefined,
        principle: "Change (dynamics)",
      },
    ],
  },
  {
    level: 12,
    necklace: 6,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        timesChosen: 10,
        percentage: 100,
        answerClass: undefined,
        principle: "Symmetry",
      },
    ],
  },
  {
    level: 12,
    necklace: 7,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2, 3, 4],
          [5, 6, 7],
        ],
        timesChosen: 10,
        percentage: 100,
        answerClass: undefined,
        principle: "Change (register)",
      },
    ],
  },
  {
    level: 12,
    necklace: 8,
    numAnswersSubmitted: 10,
    answers: [
      {
        answer: [
          [1, 2],
          [3, 4, 5, 6, 7],
        ],
        timesChosen: 10,
        percentage: 100,
        answerClass: undefined,
        principle: "Change (length)",
      },
    ],
  },
];
