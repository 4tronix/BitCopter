﻿/**
  * Enumeration of servos
  */
enum Servos
{
    FL_Hip,
    FL_Knee,
    RL_Hip,
    RL_Knee,
    RR_Hip,
    RR_Knee,
    FR_Hip,
    FR_Knee,
    Head,
    Tail
}

/**
  * Enumeration of limbs
  */
enum Limbs
{
    FrontLeft,
    RearLeft,
    RearRight,
    FrontRight
}

/**
  * Enumeration of servo enable states
  */
enum States
{
    Enable,
    Disable
}

/**
  * Enumeration of directions.
  */
enum RBRobotDirection
{
    //% block="left"
    Left,
    //% block="right"
    Right
}


/**
 * Custom blocks
 */

//% weight=10 color=#e7660b icon="\uf1cd"
namespace BitCopter
{
    let PCA = 0x40;	// i2c address of 4tronix Animoid servo controller
    let EEROM = 0x50;	// i2c address of EEROM
    let initI2C = false;
    let SERVOS = 0x06; // first servo address for start byte low
    let lLower = 57;	// distance from servo shaft to tip of leg/foot
    let lUpper = 46;	// distance between servo shafts
    let lLower2 = lLower * lLower;	// no point in doing this every time
    let lUpper2 = lUpper * lUpper;
    let gait: number[][][] = [];	// array of foot positions for each foot and each of 16 Beats
    let upDown: number[] = [];		// array of Up and down beat numbers for each foot
    let gInit = false;
    let radTOdeg = 180 / Math.PI;
    let servoOffset: number[] = [];

    let nBeats = 16;	// number of beats in a cycle
    let _height = 50;	// default standing height of lowered legs
    let _raised = 40;	// default height of raised legs
    let _stride = 80;	// total distance moved in one cycle
    let _offset = 20;	// forward-most point of leg
    let _delay = 20;	// ms to pause at end of each beat

    // Helper functions

    /**
      * Enable/Disable Servos
      *
      * @param state Select Enabled or Disabled
      */
    //% blockId="enableServos" block="%state all 10 servos"
    //% weight=90
    export function enableServos(state: States): void
    {
        pins.digitalWritePin(DigitalPin.P16, state);
    }



}