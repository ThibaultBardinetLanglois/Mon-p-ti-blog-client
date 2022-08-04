
export const dateCompare = (dateToCompare) => {
  console.log("DATE TO COMPARE =>", dateToCompare)
  dateToCompare = Date.parse(dateToCompare) / 1000
  console.log("DATE TO COMPARE timestamp =>", dateToCompare)
  let actualTimestamp = Date.now() / 1000,
    timeDifferenceInSeconds = actualTimestamp - dateToCompare

    console.log("Diference time =>", parseInt(timeDifferenceInSeconds))
  let d = Math.floor(timeDifferenceInSeconds / (3600*24)),
    h = Math.floor(timeDifferenceInSeconds % (3600*24) / 3600),
    m = Math.floor(timeDifferenceInSeconds % 3600 / 60),
    //s = Math.floor(timeDifferenceInSeconds % 60),
    daysCount = d > 0 ? d + (d === 1 ? " jour" : " jours") : "",
    hoursCount = h > 0 ? h + (h === 1 ? " heure" : " heures") : "",
    minutesCount = m > 0 ? m + (m === 1 ? " minute" : " minutes") : ""
    // sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : ""

  // If number of days exceed 28 we return the date
  if (parseInt(daysCount.split(" ")[0]) > 28) {
    dateToCompare = dateToCompare * 1000
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre"
    ]


    const newDate = new Date(dateToCompare),
      day = newDate.getDate(),
      month = months[newDate.getMonth()],
      year = newDate.getFullYear()

    return "le " + day + ' ' +  month + ' ' + year
  }

  // Else we return neither the number of days && hours , neither the number of hours and minutes, neither the minutes
  if (parseInt(daysCount.split(" ")[0]) <= 28 && parseInt(daysCount.split(" ")[0]) > 0) {
    console.log(`${daysCount} et ${hoursCount}`)
    return `user created at => ${daysCount} et ${hoursCount}`
  } else if (!parseInt(daysCount.split(" ")[0])  && parseInt(hoursCount.split(" ")[0]) > 0) {
    console.log(`user created at => ${hoursCount} et ${minutesCount}`)
    return `${hoursCount} et ${minutesCount}`
  } else if (!parseInt(hoursCount.split(" ")[0] && parseInt(minutesCount.split(" ")[0]) >= 0)) {
    console.log(`user created at => ${minutesCount}`)
    return `${minutesCount}`
  } 
}