function colourHex(temperature) {
  const colours = [
    { temp: 40, hex: "7f0000" },

    { temp: 39, hex: "930000" },
    { temp: 38, hex: "a80000" },
    { temp: 37, hex: "bc0000" },
    { temp: 36, hex: "d10000" },
    { temp: 35, hex: "e50000" },

    { temp: 34, hex: "e6100b" },
    { temp: 33, hex: "e72016" },
    { temp: 32, hex: "e93022" },
    { temp: 31, hex: "ea402d" },
    { temp: 30, hex: "eb5038" },

    { temp: 29, hex: "ec5536" },
    { temp: 28, hex: "ee5a35" },
    { temp: 27, hex: "ef6033" },
    { temp: 26, hex: "f16532" },
    { temp: 25, hex: "f26a30" },

    { temp: 24, hex: "f3702d" },
    { temp: 23, hex: "f47729" },
    { temp: 22, hex: "f47d26" },
    { temp: 21, hex: "f58422" },
    { temp: 20, hex: "f68a1f" },

    { temp: 19, hex: "f7931d" },
    { temp: 18, hex: "f89c1b" },
    { temp: 17, hex: "f9a41a" },
    { temp: 16, hex: "faad18" },
    { temp: 15, hex: "fbb616" },

    { temp: 14, hex: "f2bd1e" },
    { temp: 13, hex: "eac326" },
    { temp: 12, hex: "e1ca2e" },
    { temp: 11, hex: "d9d036" },
    { temp: 10, hex: "d0d73e" },

    { temp: 9, hex: "c6d54b" },
    { temp: 8, hex: "bcd358" },
    { temp: 7, hex: "b3d166" },
    { temp: 6, hex: "a9cf73" },
    { temp: 5, hex: "9fcd80" },

    { temp: 4, hex: "8fca96" },
    { temp: 3, hex: "80c7ac" },
    { temp: 2, hex: "70c5c1" },
    { temp: 1, hex: "61c2d7" },
    { temp: 0, hex: "51bfed" },

    { temp: -1, hex: "4dbaea" },
    { temp: -2, hex: "49b6e6" },
    { temp: -3, hex: "45b1e3" },
    { temp: -4, hex: "41acdf" },
    { temp: -5, hex: "3da8dc" },

    { temp: -6, hex: "39a3d9" },
    { temp: -7, hex: "359ed5" },
    { temp: -8, hex: "319ad2" },
    { temp: -9, hex: "2d95ce" },
    { temp: -10, hex: "2a91cb" },

    { temp: -11, hex: "268cc8" },
    { temp: -12, hex: "2287c4" },
    { temp: -13, hex: "1e83c1" },
    { temp: -14, hex: "1a7ebd" },
    { temp: -15, hex: "1679ba" },

    { temp: -16, hex: "1275b7" },
    { temp: -17, hex: "0e70b3" },
    { temp: -18, hex: "0a6bb0" },
    { temp: -19, hex: "0667ac" },
    { temp: -20, hex: "0262a9" },
  ];

  for (let i = 0; i < colours.length; i++) {
    if (temperature === colours[i].temp) return colours[i].hex;
    else if (temperature > 40) return colours[0].hex;
    else if (temperature < -20) return colours[60].hex;
  }
  return null;
}
export default colourHex;
