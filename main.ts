/**
  * Enumeration of motors.
  */
enum BCMotor
{
    //% block="FrontLeft"
    FL,
    //% block="FrontRight"
    FR,
    //% block="RearLeft"
    RL,
    //% block="RearRight"
    RR
}

/**
  * Enumeration of directions.
  */
enum BCDirection
{
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="forward"
    Forward,
    //% block="reverse"
    Reverse
}

/**
 * Ping unit for sensor
 */
enum BCPingUnit
{
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches,
    //% block="μs"
    MicroSeconds
}

/**
 * Pre-Defined pixel colours
 */
enum BCColors
{
    //% block=red
    Red = 0xff0000,
    //% block=orange
    Orange = 0xffa500,
    //% block=yellow
    Yellow = 0xffff00,
    //% block=green
    Green = 0x00ff00,
    //% block=blue
    Blue = 0x0000ff,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xff00ff,
    //% block=white
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}

/**
 * Custom blocks
 */
/** //% weight=10 color=#0fbc11 icon="\uf1cd" */
//% weight=10 color=#e7660b icon="\uf1cd"
namespace BitCopter
{
    let leds: neopixel.Strip;
    let ledCount = 4;

    /**
      * Rotate selected motor at speed.
      * @param motor motor to control
      * @param speed speed of motor between 0 and 1023. eg: 600
      */
    //% subcategory=Motors
    //% group=Motors
    //% blockId="rotate_motor" block="rotate 04 %motor| motor at speed %speed"
    //% speed.min=0 speed.max=1023
    //% weight=110
    export function rotate(_motor: BCMotor, speed: number): void
    {
        motor(_motor, speed);
    }


    function motor(motor: BCMotor, speed: number): void
    {
        motorPin = AnalogPin.P12;
        pins.analogWritePin(motorPin, speed);
    }


}