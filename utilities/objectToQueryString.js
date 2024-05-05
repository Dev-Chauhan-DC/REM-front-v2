const objectToQueryString = (obj) => {

  const entry = Object.entries(obj)
  var string = ""
  for (let i = 0; i < entry.length; i++) {
    if (entry[i][1] === null) {
      continue;
    } else if (typeof (entry[i][1]) === "object" && entry[i][1].length > 0) {
      const arrayStr = entry[i][1].join(',')
      string = string + entry[i][0] + "=" + arrayStr + "&"
    }
    else if (typeof (entry[i][1]) === "string" && entry[i][1].includes("-")) {
      let parts = entry[i][1].split("-");
      if (parts.length === 2 && parts[0].trim() !== "" && parts[1].trim() !== "") {

        string = string + entry[i][0] + "=" + entry[i][1] + "&"

      }
    } else if (typeof (entry[i][1]) === "string" && entry[i][1].length === 1 && typeof (parseInt(entry[i][1])) === "number" && parseInt(entry[i][1]) > 0) {
      string = string + entry[i][0] + "=" + entry[i][1] + "&"
    }


  }


  if (string.length > 2) {
    string = "?" + string
  }
  if (string[string.length - 1] === "&") {
    let array = string.split('')
    array.pop()
    string = array.join("")

  }
  return string


}


export default objectToQueryString
