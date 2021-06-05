
export const COLORS = {
    // base colors
    primary: "#FFE529", 
    secondary: "#cacfd9",   

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#eff2f5",
    gray: "#8b9097",

    green: "#66D59A",
    lightGreen: "#E6FEF0",

    lime: "#00BA63",
    emerald: "#2BC978",

    red: "#FF4134",
    lightRed: "#FFF1F0",

    purple: "#6B3CE9",
    lightpurple: "#F3EFFF",

    yellow: "#FFC664",
    lightyellow: "#FFF9EC",

    blue: "#5ACDFF",
    lightBlue: "#D4FCFF",
    
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    radius2: 30,
    padding: 24,
    padding2: 12,
    padding3: 10,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 18,
    h4: 16,
    h5: 10,
    h6: 8,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

};
export const FONTS = {
    largeTitle: { fontFamily: "Krub-Regular", fontSize: SIZES.largeTitle},
    h1: { fontFamily: "Prompt-Regular", fontSize: SIZES.h1  },
    h2: { fontFamily: "Prompt-Regular", fontSize: SIZES.h2 },
    h3: { fontFamily: "Prompt-Regular", fontSize: SIZES.h3 },
    h4: { fontFamily: "Prompt-Regular", fontSize: SIZES.h4 },
    h5: { fontFamily: "Prompt-Regular", fontSize: SIZES.h5 },
    h6: { fontFamily: "Prompt-Regular", fontSize: SIZES.h6 },

    home1: { fontFamily: "Krub-Regular", fontSize: SIZES.body1 },
    home2: { fontFamily: "Krub-Regular", fontSize: SIZES.body2 },
    home3: { fontFamily: "Krub-Regular", fontSize: SIZES.body3 },
    home4: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },

    body1: { fontFamily: "Prompt-Regular", fontSize: SIZES.body1 },
    body2: { fontFamily: "Prompt-Regular", fontSize: SIZES.body2 },
    body3: { fontFamily: "Prompt-Regular", fontSize: SIZES.body3 },
    body4: { fontFamily: "Prompt-Regular", fontSize: SIZES.body4 },

    bodyTitle: { fontFamily: "supermarket", fontSize: SIZES.body1 },
    bodyPost: { fontFamily: "supermarket", fontSize: SIZES.body3 },


    leftBar1: { fontFamily: "Krub-Regular", fontSize: SIZES.h2 },
    leftBar2: { fontFamily: "Krub-Regular", fontSize: SIZES.h3 },

    login: { fontFamily: "Krub-Regular", fontSize: SIZES.h3 },

    filter: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },
    Spacesfollow: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },

    LeaderBord: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },

    nav: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },

    name: { fontFamily: "Krub-Regular", fontSize: SIZES.body3 },
    time: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },
    score: { fontFamily: "Krub-Regular", fontSize: SIZES.body3 },

    title: { fontFamily: "Krub-Regular", fontSize: SIZES.h1 },
    title1: { fontFamily: "Krub-Regular", fontSize: SIZES.h3 },
    title2: { fontFamily: "Krub-Regular", fontSize: SIZES.h4 },
    body: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },
    tag: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },
    subject: { fontFamily: "Krub-Regular", fontSize: SIZES.body4 },
    post: { fontFamily: "Krub-Regular", fontSize: SIZES.h3 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
