const generateAddonPrice = (actualPrice) => {
    let tenPercentOfActualPrice = (actualPrice / 100) * 10
    return parseFloat(actualPrice + tenPercentOfActualPrice).toFixed(2)
}

export { generateAddonPrice }