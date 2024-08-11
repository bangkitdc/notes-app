// DD.MM.YYYY

type OptionType = {
  parseToInt?: boolean;
  simple?: boolean;
};

function formatDate(
  originalDateString: string | Date | number | null | undefined,
  option: OptionType = { parseToInt: true, simple: true },
): string {
  if (!originalDateString) return "-";

  if (option.parseToInt && typeof originalDateString === "string") {
    originalDateString = parseInt(originalDateString);
  }

  const date = new Date(originalDateString);

  if (option.simple) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } else {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    return `${monthNames[monthIndex]} ${day}, ${year} | ${hours}:${minutesStr} ${ampm}`;
  }
}

export default formatDate;
