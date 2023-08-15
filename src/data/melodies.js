const defaultVol = 0.7;
const synth = new Tone.Synth().toDestination();
const amSynth = new Tone.AMSynth().toDestination();
    //Prox in pitch
    export const melody1 = {
        sounds: [
          { x: 100, y: 525, synth: synth, vol: defaultVol },
          { x: 200, y: 525, synth: synth, vol: defaultVol },
          { x: 300, y: 425, synth: synth, vol: defaultVol },
          { x: 400, y: 425, synth: synth, vol: defaultVol },
        ],
        cords: [
          { x: 450, y: 400, id: 1 },
          { x: 700, y: 150, id: 2 },
          { x: 950, y: 400, id: 3 },
          { x: 700, y: 650, id: 4 },
        ],
      };
  
      //Prox in time
      export const melody2 = {
        sounds: [
          { x: 100, y: 525, synth: synth, vol: defaultVol },
          { x: 150, y: 525, synth: synth, vol: defaultVol },
          { x: 350, y: 525, synth: synth, vol: defaultVol },
          { x: 400, y: 525, synth: synth, vol: defaultVol },
        ],
        cords: [
          { x: 450, y: 400, id: 5 },
          { x: 700, y: 150, id: 6 },
          { x: 950, y: 400, id: 7 },
          { x: 700, y: 650, id: 8 },
        ],
      };
  
      export const melody3 = {
        sounds: [
          { x: 100, y: 450, synth: synth, vol: defaultVol },
          { x: 200, y: 450, synth: synth, vol: defaultVol },
          { x: 250, y: 500, synth: synth, vol: defaultVol },
          { x: 350, y: 500, synth: synth, vol: defaultVol },
          { x: 400, y: 475, synth: synth, vol: defaultVol },
          { x: 500, y: 475, synth: synth, vol: defaultVol },
          { x: 550, y: 525, synth: synth, vol: defaultVol },
          { x: 650, y: 525, synth: synth, vol: defaultVol },
        ],
        cords: [
          { x: 700, y: 150, id: 1 },
          { x: 870, y: 230, id: 2 },
          { x: 950, y: 400, id: 3 },
          { x: 870, y: 570, id: 4 },
          { x: 700, y: 650, id: 5 },
          { x: 530, y: 570, id: 6 },
          { x: 450, y: 400, id: 7 },
          { x: 530, y: 230, id: 8 },
        ],
      };
  
      export const melody4 = {
        sounds: [
          { x: 100, y: 525, synth: synth, vol: defaultVol },
          { x: 175, y: 500, synth: synth, vol: defaultVol },
          { x: 250, y: 475, synth: synth, vol: defaultVol },
          { x: 325, y: 450, synth: synth, vol: defaultVol },
          { x: 400, y: 425, synth: synth, vol: defaultVol },
          { x: 475, y: 400, synth: amSynth, vol: defaultVol },
          { x: 550, y: 375, synth: amSynth, vol: defaultVol },
          { x: 625, y: 350, synth: amSynth, vol: defaultVol },
        ],
        cords: [
          { x: 700, y: 150, id: 1 },
          { x: 870, y: 230, id: 2 },
          { x: 950, y: 400, id: 3 },
          { x: 870, y: 570, id: 4 },
          { x: 700, y: 650, id: 5 },
          { x: 530, y: 570, id: 6 },
          { x: 450, y: 400, id: 7 },
          { x: 530, y: 230, id: 8 },
        ],
      };
  
      export const melody5 = {
        sounds: [
          { x: 100, y: 525, synth: synth, vol: defaultVol },
          { x: 200, y: 525, synth: synth, vol: defaultVol },
          { x: 300, y: 525, synth: synth, vol: 1.4 },
          { x: 400, y: 525, synth: synth, vol: 1.4 },
        ],
        cords: [
          { x: 450, y: 400, id: 1 },
          { x: 700, y: 150, id: 2 },
          { x: 950, y: 400, id: 3 },
          { x: 700, y: 650, id: 4 },
        ],
      };
  
      export const melody6 = {
        sounds: [
          { x: 100, y: 500, synth: synth, vol: defaultVol },
          { x: 175, y: 400, synth: synth, vol: defaultVol },
          { x: 250, y: 400, synth: synth, vol: defaultVol },
          { x: 325, y: 500, synth: synth, vol: defaultVol },
          { x: 400, y: 400, synth: synth, vol: defaultVol },
          { x: 475, y: 400, synth: synth, vol: defaultVol },
          { x: 550, y: 500, synth: synth, vol: defaultVol },
          { x: 625, y: 400, synth: synth, vol: defaultVol },
          { x: 700, y: 400, synth: synth, vol: defaultVol },
        ],
        cords: [
          { x: 460, y: 460, id: 1 },
          { x: 470, y: 300, id: 2 },
          { x: 580, y: 185, id: 3 },
          { x: 770, y: 165, id: 4 },
          { x: 900, y: 270, id: 5 },
          { x: 940, y: 450, id: 6 },
          { x: 855, y: 585, id: 7 },
          { x: 700, y: 650, id: 8 },
          { x: 550, y: 590, id: 9 },
        ],
      };
  
      export const melody7 = {
        sounds: [
          { x: 100, y: 325, synth: synth, vol: defaultVol },
          { x: 130, y: 300, synth: synth, vol: defaultVol },
          { x: 160, y: 280, synth: synth, vol: defaultVol },
          { x: 190, y: 300, synth: synth, vol: defaultVol },
          { x: 220, y: 525, synth: synth, vol: defaultVol },
          { x: 250, y: 525, synth: synth, vol: defaultVol },
          { x: 280, y: 500, synth: synth, vol: defaultVol },
        ],
        cords: [
          { x: 560, y: 600, id: 1 },
          { x: 455, y: 450, id: 2 },
          { x: 510, y: 250, id: 3 },
          { x: 700, y: 150, id: 4 },
          { x: 900, y: 260, id: 5 },
          { x: 940, y: 460, id: 6 },
          { x: 810, y: 620, id: 7 },
        ],
      };

      export const melody8 = {
        sounds: [
          { x: 100, y: 475, synth: synth, vol: defaultVol },
          { x: 160, y: 450, synth: synth, vol: defaultVol },
          { x: 220, y: 425, synth: synth, vol: defaultVol },
          { x: 250, y: 450, synth: synth, vol: defaultVol },
          { x: 280, y: 425, synth: synth, vol: defaultVol },
          { x: 310, y: 400, synth: synth, vol: defaultVol },
          { x: 340, y: 375, synth: synth, vol: defaultVol },
        ],
        cords: [
          { x: 900, y: 260, id: 1 },
          { x: 940, y: 460, id: 2 },
          { x: 810, y: 620, id: 3 },
          { x: 560, y: 600, id: 4 },
          { x: 455, y: 450, id: 5 },
          { x: 510, y: 250, id: 6 },
          { x: 700, y: 150, id: 7 },
        ],
      };