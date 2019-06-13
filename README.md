# BitCopter Package for Microsoft Makecode

This library provides a Microsoft Makecode package for the 4tronx BitCopter. see
https://4tronix.co.uk/bitcopter/

## Driving the motors
The BitCopter has 4 motors, labelled 0 to 3 which can be driven individually at any speed from 0 to 1023.
The basic function `rotate(motor, speed)` enables individual direct control of each motor.
You can use the inbuilt names for the motors FL, FR, RL, RR (FrontLeft, RearRight, etc)

```blocks
// Turn Motor 1 at speed 600
BitCopter.rotate(1, 600);
```   

## Read sonar value

If you have mounted the optional sonar sensor for the BitCopter you can
also use the `BitCopter.sonar(..)` function to read the distance to obstacles.

```blocks
// Read sonar values
let v1 = BitCopter.sonar(BCPingUnit.MicroSeconds);
let v2 = BitCopter.sonar(BCPingUnit.Centimeters);
let v3 = BitCopter.sonar(BCPingUnit.Inches);
```

## NeoPixel helpers

The BitCopter also has 4 Smart RGB LEDs

```blocks
// Show all leds
BitCopter.setColor(neopixel.colors(NeoPixelColors.Red));
BitCopter.neoShow();

// Clear all leds
BitCopter.neoClear();
BitCopter.neoShow();

// Show led at position 1 (0 to 7)
BitCopter.setPixel(1, neopixel.colors(NeoPixelColors.Red));
BitCopter.neoShow();

// Show led rainbow
BitCopter.neoRainbow();
BitCopter.neoShow();

// Show led rainbow and shift
BitCopter.neoRainbow();
BitCopter.neoShift();
BitCopter.neoShow();

// Show led rainbow and rotate
BitCopter.neoRainbow();
BitCopter.neoRotate();
BitCopter.neoShow();

// Set brightness of leds (0 to 255)
BitCopter.neoBrightness(100);
BitCopter.neoShow();

// Start the scanner to run in the background at the speed and colour you choose
BitCopter.startScanner(BitCopter.RBColours(RBColors.Red), 100);
// and stop it with
BitCopter.stopScanner();

// Define your own colours using convertRGB(red, green, blue)
BitCopter.setColor(BitCopter.convertRGB(40, 50, 200));
BitCopter.neoShow();
```

## Supported targets

* for PXT/microbit

## License

MIT
