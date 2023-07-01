module.exports.colorCoding = (rating, rank) => {
    if (rating < 1200 || rank === "newbie") return "#848192"; 
    if (rating < 1400 || rank === "pupil") return "#1a9453"; 
    if (rating < 1600 || rank === "specialist") return "#03a89e"; 
    if (rating < 1900 || rank === "expert") return "#1000ff"; 
    if (rating < 2100 || rank === "candidate master") return "#aa01aa"; 
    if (rating < 2300 || rank === "master") return "#ff8c00"; 
    if (rating < 2600 || rank === "grandmaster") return "#ff0500"; 
    if (rating < 3000 || rank === "international grandmaster") return "#ff3333"; 
    if (rating >= 3000 || rank === "legendary grandmaster") return "#ff0000"; 
}