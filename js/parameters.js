    options: {
      usePeakQE: false
    },
    graph: {
      xOffset: 25,
      yOffset: 20,
      upLimitX: 0,
      upLimitY: 0,
      broj_podeokaX: 0,
      broj_podeokaY: 0,
      dataPointsNo: 200,
      podeokX: 45,
      podeokY: 45,
      drawn: false
    },
    eqParams: {
      sig: 0,
      sky: 0,
      dc: 0,
      ro: 0,
      qe: 0,
      wavelength: 0,
      bandwidth: 0,
      fluxPh: 0,
      extinctCoeff: 0,
      airmass: 0,
      totalTransparency: 0,
      pxSize: 0,
      reducer: 1,
      binning: 1,
      focalLength: 0,
      area: 0,
      mag: 0,
      skyMag: 0,
      snr: 0,
      n: 0,
      res: 0,
      exposure: 0
    },
    telescope: {
      cassegrain: {
        diameter: 0.6,
        focalLength: 6,
        effectiveAreaCoef: 1
      },
      nasmyth: {
        diameter: 1.4,
        focalLength: 11.2,
        effectiveAreaCoef: 1
      },
      custom: {
        diameter: 0,
        focalLength: 0,
        effectiveAreaCoef: 1
      }
    },
    camera: {
      iXon897: {
        dc: 0.00030,
        ro: 5.3,
        pxSize: 16e-6,
        qe: {
          '0': 0.97, // peak QE
          '300': 0.12,
          '320': 0.14,
          '340': 0.2,
          '360': 0.25,
          '380': 0.46,
          '400': 0.57,
          '420': 0.67,
          '440': 0.77,
          '460': 0.84,
          '480': 0.9,
          '500': 0.94,
          '520': 0.96,
          '540': 0.97,
          '560': 0.97,
          '580': 0.97,
          '600': 0.97,
          '620': 0.96,
          '640': 0.95,
          '660': 0.94,
          '680': 0.93,
          '700': 0.92,
          '720': 0.89,
          '740': 0.86,
          '760': 0.84,
          '780': 0.82,
          '800': 0.77,
          '820': 0.73,
          '840': 0.68,
          '860': 0.6,
          '880': 0.55,
          '900': 0.48,
          '920': 0.4,
          '940': 0.33,
          '960': 0.27,
          '980': 0.19,
          '1000': 0.14
        }
      },
      iKonL936: {
        dc: 0.000059,
        ro: 2.9,
        pxSize: 13.5e-6,
        qe: {
          '0': 0.97, // peak QE
          '300': 0.1,
          '320': 0.13,
          '340': 0.19,
          '360': 0.24,
          '380': 0.45,
          '400': 0.58,
          '420': 0.65,
          '440': 0.75,
          '460': 0.83,
          '480': 0.9,
          '500': 0.95,
          '520': 0.96,
          '540': 0.97,
          '560': 0.97,
          '580': 0.97,
          '600': 0.96,
          '620': 0.96,
          '640': 0.95,
          '660': 0.94,
          '680': 0.93,
          '700': 0.91,
          '720': 0.9,
          '740': 0.87,
          '760': 0.84,
          '780': 0.8,
          '800': 0.76,
          '820': 0.74,
          '840': 0.67,
          '860': 0.6,
          '880': 0.53,
          '900': 0.47,
          '920': 0.41,
          '940': 0.33,
          '960': 0.25,
          '980': 0.18,
          '1000': 0.13
        }
      },
      sbigstxl6303e: {
        dc: 0.5,
        ro: 15,
        pxSize: 9,
        qe: {
          '0': 0.68, // peak QE
          '300': 0.62,
          '320': 0.62,
          '340': 0.62,
          '360': 0.62,
          '380': 0.62,
          '400': 0.62,
          '420': 0.62,
          '440': 0.62,
          '460': 0.62,
          '480': 0.62,
          '500': 0.62,
          '520': 0.62,
          '540': 0.62,
          '560': 0.62,
          '580': 0.62,
          '600': 0.62,
          '620': 0.62,
          '640': 0.62,
          '660': 0.62,
          '680': 0.62,
          '700': 0.62,
          '720': 0.62,
          '740': 0.62,
          '760': 0.62,
          '780': 0.62,
          '800': 0.62,
          '820': 0.62,
          '840': 0.62,
          '860': 0.62,
          '880': 0.62,
          '900': 0.62,
          '920': 0.62,
          '940': 0.62,
          '960': 0.62,
          '980': 0.62,
          '1000': 0.62
        }
      },
      ProLinePL23042: {
        dc: 0.2,
        ro: 13,
        pxSize: 15,
        qe: {
          '0': 0.93, // peak QE
          '300': 0.08,
          '320': 0.12,
          '340': 0.15,
          '360': 0.25,
          '380': 0.4,
          '400': 0.53,
          '420': 0.63,
          '440': 0.73,
          '460': 0.82,
          '480': 0.88,
          '500': 0.91,
          '520': 0.92,
          '540': 0.93,
          '560': 0.93,
          '580': 0.93,
          '600': 0.93,
          '620': 0.92,
          '640': 0.91,
          '660': 0.91,
          '680': 0.9,
          '700': 0.88,
          '720': 0.85,
          '740': 0.81,
          '760': 0.78,
          '780': 0.74,
          '800': 0.7,
          '820': 0.66,
          '840': 0.6,
          '860': 0.55,
          '880': 0.48,
          '900': 0.41,
          '920': 0.31,
          '940': 0.22,
          '960': 0.19,
          '980': 0.16,
          '1000': 0.1
        }
      },
      custom: {
        dc: 0,
        ro: 0,
        pxSize: 0,
        qe: {
          '0': 0 // peak QE
        }
      }
    },
    band: {
      'B': {
        wavelength: 4450,
        bandwidth: 760,
        fluxJY: 4260,
        fluxPh: 1444.762247191,
        extinctCoeff: 0.4   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'V': {
        wavelength: 5510,
        bandwidth: 960,
        fluxJY: 3640,
        fluxPh: 997.0032667877,
        extinctCoeff: 0.2   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'R': {
        wavelength: 6580,
        bandwidth: 1030,
        fluxJY: 3080,
        fluxPh: 706.4340425532,
        extinctCoeff: 0.1   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'I': {
        wavelength: 8060,
        bandwidth: 2830,
        fluxJY: 2550,
        fluxPh: 477.476426799,
        extinctCoeff: 0.08   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'L': {
        wavelength: 35000,
        bandwidth: 2770,
        fluxJY: 280,
        fluxPh: 12.07364926,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      'Ha': {
        wavelength: 6563,
        bandwidth: 65,
        fluxJY: 3631,
        fluxPh: 834.9729635,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      'Red-continuum': {
        wavelength: 6452,
        bandwidth: 90,
        fluxJY: 3631,
        fluxPh: 849.3378115,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      '[SII]': {
        wavelength: 6718,
        bandwidth: 65,
        fluxJY: 3631,
        fluxPh: 815.708181,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      'G': {
        wavelength: 4770,
        bandwidth: 1450,
        fluxJY: 3631,
        fluxPh: 1149.436059,
        extinctCoeff: 0
      },
      'R': {
        wavelength: 6231,
        bandwidth: 1300,
        fluxJY: 3631,
        fluxPh: 879.924571,
        extinctCoeff: 0
      },
      'I': {
        wavelength: 7625,
        bandwidth: 1500,
        fluxJY: 3631,
        fluxPh: 719.057049,
        extinctCoeff: 0
      },
      'ZS': {
        wavelength: 8930,
        bandwidth: 980,
        fluxJY: 3631,
        fluxPh: 613.976484,
        extinctCoeff: 0
      },
      'Y': {
        wavelength: 10200,
        bandwidth: 1060,
        fluxJY: 3631,
        fluxPh: 537.530392,
        extinctCoeff: 0
      },
      'custom': {
        wavelength: 0,
        bandwidth: 0,
        fluxJY: 0,
        fluxPh: 0,
        extinctCoeff: 0
      }
    },
