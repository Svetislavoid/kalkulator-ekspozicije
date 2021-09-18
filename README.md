# Exposure time calculator

Live preview: https://svetislavoid.github.io/kalkulator-ekspozicije/

![Exposure time calculator](/img/exposureTimeCalculator.png)

## About the calculator

This calculator is made primarily for planning observations at the [Astronomical Station Vidojevica](http://vidojevica.aob.rs/) [(Astronomical Observatory of Belgrade)](http://aob.rs/). By filling up the form on the left and clicking on the 'Calculate' button, exposure time needed in order to achive wanted signal-to-noise ratio (S/N) is calculated. If, for the given parameters, exposure time is calculated to be less than 0.01s, calculator will not show any result and the graph will not be drawn.

## How to use

In the form on the left, instruments currently available at the AS Vidojevica can be choosen. Total throughput over all reflective and refractive optical surfaces in the telescope along with the transmission of the choosen filter should be calculated separately and entered in the 'Total transparency' field. The atmosphere transmission coefficient should also be calculated independently of the calculator and entered in the 'Sky transparency' field.

Calculator can also be used with some custom instruments and options, and not only those listed in the dropdown menus. In order to do that, choose 'Custom' option from the dropdown menu. Pop-up window will appear asking for custom instrument parameters.

When using custom telescope, telescope effective area can be omitted, in which case a default value of 100% will be used.

When using custom CCD, to get the best results enter quantum efficiency of the CCD at wavelength that corresponds to the mean wavelength of a filter that is going to be used.

## Calculations

Calculator uses the following equation to calculate signal-to-noise ratio (SNR):

![Signal to noise ratio](/img/snr.png)

From this equation we get an expression for exposure time:

![Exposure time](/img/exposure.png)

where S<sub>dc</sub> and S<sub>ro</sub> are camera dark current and read out noise values, respectively.

Counts from the object, counts from the sky and number of pixels in the aperture are calculated as:

![Counts from the object](/img/objectSignal.png)
![Counts from the sky](/img/skySignal.png)
![Number of pixels in the aperture](/img/pixelNo.png)

where

![Camera resolution](/img/scale.png)

is camera resolution.

## Telescopes

| Telescope            | Diameter (m) | Focal length (m) | Effective area coefficient |
| :---                 | :----:       | :----:           | :----:                     |
| Cassegrain           | 0.6          | 6                | 1                          |
| Nasmyth (Milanković) | 1.4          | 11.2             | 1                          |

## CCDs

| CCD              | Dark current (e<sup>-</sup>/pixel/sec) | Read-out noise (e<sup>-</sup>) | Pixel size (&mu;m)|
| :---             | :----:                                 | :----:                         | :----:            |
| Apogee U42       | 1                                      | 10                             | 13.5              |
| Apogee E47       | 0.1                                    | 10                             | 13                |
| ANDOR iKon-L 936 | 0.00040                                | 7                              | 13.5              |
| ANDOR iXon 897   | 0.00030                                | 5.3                            | 16                |
| SBIG ST10XME     | 0.5                                    | 8.8                            | 6.8               |

## Quantum efficiency of CCDs

| Wavelength (nm) | Apogee U42 (%) | Apogee E47 (%) | ANDOR iKon-L 936 (%) | ANDOR iXon 897 (%) | SBIG ST10XME (%) |
| :---            | :----:         | :----:         | :----:               | :----:             | :----:           |
| 300             | 8              | 10             | 9                    | 12                 | 5                |
| 320             | 12             | 14             | 12                   | 14                 | 20               |
| 340             | 15             | 18             | 18                   | 20                 | 33               |
| 360             | 26             | 24             | 24                   | 25                 | 40               |
| 380             | 38             | 40             | 42                   | 46                 | 55               |
| 400             | 53             | 57             | 58                   | 57                 | 60               |
| 420             | 65             | 67             | 68                   | 67                 | 59               |
| 440             | 74             | 74             | 75                   | 77                 | 60               |
| 460             | 82             | 82             | 84                   | 84                 | 64               |
| 480             | 88             | 88             | 90                   | 90                 | 67               |
| 500             | 90             | 93             | 95                   | 94                 | 67               |
| 520             | 91             | 95             | 96                   | 96                 | 73               |
| 540             | 92             | 96             | 97                   | 97                 | 81               |
| 560             | 93             | 96             | 98                   | 97                 | 85               |
| 580             | 93             | 96             | 97                   | 97                 | 87               |
| 600             | 92             | 96             | 97                   | 97                 | 85               |
| 620             | 92             | 95             | 96                   | 96                 | 86               |
| 640             | 91             | 94             | 95                   | 95                 | 86               |
| 660             | 90             | 93             | 94                   | 94                 | 85               |
| 680             | 89             | 92             | 93                   | 93                 | 81               |
| 700             | 87             | 90             | 92                   | 92                 | 78               |
| 720             | 85             | 88             | 90                   | 89                 | 75               |
| 740             | 82             | 85             | 90                   | 86                 | 68               |
| 760             | 78             | 82             | 87                   | 84                 | 63               |
| 780             | 75             | 77             | 81                   | 82                 | 57               |
| 800             | 70             | 73             | 77                   | 77                 | 54               |
| 820             | 67             | 67             | 73                   | 73                 | 52               |
| 840             | 60             | 60             | 69                   | 68                 | 46               |
| 860             | 54             | 54             | 64                   | 60                 | 38               |
| 880             | 48             | 47             | 54                   | 55                 | 33               |
| 900             | 41             | 38             | 47                   | 48                 | 30               |
| 920             | 37             | 32             | 40                   | 40                 | 25               |
| 940             | 31             | 25             | 35                   | 33                 | 19               |
| 960             | 26             | 20             | 27                   | 27                 | 15               |
| 980             | 20             | 14             | 20                   | 19                 | 8                |
| 1000            | 16             | 10             | 14                   | 14                 | 7                |

## Bands

| Band                | Wavelength (&#8491;) | Bandwidth (&#8491;) | Flux (J) | Flux (photons) | Extinction coefficient (mag/airmass) |
| :---                | :----:               | :----:              | :----:   | :----:         | :----:                               |
| B                   | 4450                 | 940                 | 4260     | 1445           | 0.4                                  |
| V                   | 5510                 | 880                 | 3640     | 997            | 0.2                                  |
| R                   | 6580                 | 1380                | 3080     | 706            | 0.1                                  |
| I                   | 8060                 | 1490                | 2550     | 477            | 0.08                                 |
| L                   | 35000                | 4720                | 280      | 12             | 0                                    |
| H<sub>&alpha;</sub> | 6563                 | 50                  | 3631     | 835            | 0                                    |
| Red-continuum       | 6452                 | 50                  | 3631     | 849            | 0                                    |
| [SII]               | 6718                 | 35                  | 3631     | 816            | 0                                    |
