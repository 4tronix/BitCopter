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
namespace bitcopter
{
    let leds: neopixel.Strip;
    let ledCount = 4;

    /**
      * Rotate selected motor at speed.
      * @param speed speed of motor between 0 and 1023. eg: 600
      */
    //% subcategory=Motors
    //% group=Motors
    //% blockId="rotate_motor" block="rotate %motor| motor at speed %speed"
    //% speed.min=0 speed.max=1023
    //% weight=110
    export function rotate(motor: BCMotor, speed: number): void
    {
        motor(motor, speed);
    }


    function motor(motor: BCMotor, speed: number): void
    {
        motorPin = AnalogPin.P12;
        switch (motor)
        {
            case BCMotor.FR: MotorPin = AnalogPin.P13; break;
            case BCMotor.RR: MotorPin = AnalogPin.P14; break;
            case BCMotor.RL: MotorPin = AnalogPin.P15; break;
        }
        pins.analogWritePin(motorPin, speed);
    }

    /**
    * Read height from sonar module
    *
    * @param unit desired conversion unit
    */
    //% subcategory=Sensors
    //% group=Sensors
    //% blockId="height_sonar" block="read sonar as %unit"
    //% weight=90
    export function sonar(unit: BCPingUnit): number
    {
        // send pulse
        let trig = DigitalPin.P15;
        let echo = trig;
        let maxCmDistance = 500;
        let d=10;
        pins.setPull(trig, PinPullMode.PullNone);
        for (let x=0; x<10; x++)
        {
            pins.digitalWritePin(trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(trig, 1);
            control.waitMicros(10);
            pins.digitalWritePin(trig, 0);
            // read pulse
            d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
            if (d>0)
                break;
        }
        switch (unit)
        {
            case BCPingUnit.Centimeters: return d / 58;
            case BCPingUnit.Inches: return d / 148;
            default: return d;
        }
    }

    function neo(): neopixel.Strip
    {
        if (!leds)
        {
            leds = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB);
            leds.setBrightness(40);
        }
        return leds;
    }

    /**
      * Sets all pixels to a given colour
      *
      * @param rgb RGB colour of the pixel
      */
    //% subcategory=leds
    //% group=leds
    //% blockId="cubebit_set_color" block="set all pixels to %rgb=rb_colours"
    //% weight=90
    export function setColor(rgb: number): void
    {
        neo().showColor(rgb);
    }

    /**
     * Set a pixel to a given colour (using colour names).
     *
     * @param ID location of the pixel in the cube from 0
     * @param rgb RGB color of the LED
     */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_set_pixel_color" block="set pixel color at %ID|to %rgb=rb_colours"
    //% weight=85
    export function setPixel(ID: number, rgb: number): void
    {
        neo().setPixelColor(ID, rgb);
    }

    /**
     * Convert from RGB values to colour number
     *
     * @param red Red value of the LED 0:255
     * @param green Green value of the LED 0:255
     * @param blue Blue value of the LED 0:255
     */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_convertRGB" block="convert from red %red| green %green| blue %bblue"
    //% weight=55
    export function convertRGB(r: number, g: number, b: number): number
    {
        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
    }

    /**
      * Show pixels
      */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_show" block="show Led Bar changes"
    //% weight=95
    export function ledsShow(): void
    {
        neo().show();
    }

    /**
      * Clear leds.
      */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_clear" block="clear all pixels"
    //% weight=80
    export function ledsClear(): void
    {
        neo().clear();
    }

    /**
      * Shows a rainbow pattern on all pixels
      */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_rainbow" block="set Led Bar rainbow"
    //% weight=75
    export function ledsRainbow(): void
    {
        neo().showRainbow(1, 360);
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_shift" block="shift pixels"
    //% weight=65
    export function ledsShift(): void
    {
        neo().shift(1);
    }

    /**
     * Rotate LEDs forward.
     */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_rotate" block="rotate pixels"
    //% weight=70
    export function ledsRotate(): void
    {
        neo().rotate(1);
    }

    /**
     * Set the brightness of the Leds. Note this only applies to future writes to the strip.
     * @param brightness a measure of LED brightness in 0-255. eg: 40
     */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_brightness" block="set Led Bar brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=92
    export function ledsBrightness(brightness: number): void
    {
        neo().setBrightness(brightness);
    }

    /**
      * Gets numeric value of colour
      *
      * @param color Standard RGB Led Colours
      */
    //% subcategory=leds
    //% group=leds
    //% blockId="leds_get_colour" block=%color
    //% weight=60
    export function RBColours(color: RBColors): number
    {
        return color;
    }

}