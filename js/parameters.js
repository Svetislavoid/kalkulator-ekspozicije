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
      skyTransparency: 0,
      totalTransparency: 0,
      pxSize: 0,
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
      apogeeU42: {
        dc: 1,
        ro: 10,
        qe: 0.9,
        pxSize: 13.5e-6
      },
      apogeeE47: {
        dc: 0.1,
        ro: 10,
        qe: 0.96,
        pxSize: 13e-6
      },
      iKonL: {
        dc: null,
        ro: null,
        qe: 0.95,
        pxSize: 13.5e-6
      },
      iXon897: {
        dc: null,
        ro: null,
        qe: 0.925,
        pxSize: 16e-6
      },
      sbigst10xme: {
        dc: 0.5,
        ro: 8.8,
        qe: 0.85,
        pxSize: 6.8e-6
      },
      custom: {
        dc: 0,
        ro: 0,
        qe: 0,
        pxSize: 0
      }
    },
    band: {
      'B': {
        wavelength: 4450,
        bandwidth: 940,
        fluxJY: 4260,
        fluxPh: 1444.762247191
      },
      'V': {
        wavelength: 5510,
        bandwidth: 880,
        fluxJY: 3640,
        fluxPh: 997.0032667877
      },
      'R': {
        wavelength: 6580,
        bandwidth: 1380,
        fluxJY: 3080,
        fluxPh: 706.4340425532
      },
      'I': {
        wavelength: 8060,
        bandwidth: 1490,
        fluxJY: 2550,
        fluxPh: 477.476426799
      },
      'L': {
        wavelength: 35000,
        bandwidth: 4720,
        fluxJY: 280,
        fluxPh: 12.07364926
      },
      'Ha': {
        wavelength: 6563,
        bandwidth: 50,
        fluxJY: 0,
        fluxPh: 0
      },
      'Red-continuum': {
        wavelength: 6452,
        bandwidth: 50,
        fluxJY: 0,
        fluxPh: 0
      },
      '[SII]': {
        wavelength: 6718,
        bandwidth: 35,
        fluxJY: 0,
        fluxPh: 0
      },
      'custom': {
        wavelength: 0,
        bandwidth: 0,
        fluxJY: 0,
        fluxPh: 0
      }
    },
