// DD.MM.YYYY

type OptionType = {
  parseToInt?: boolean;
  utc?: boolean;
};

function formatDate(
  originalDateString: string | Date | number | null | undefined,
  option: OptionType = { parseToInt: true, utc: true },
): string {
  if (!originalDateString) return "-";

  if (option.parseToInt && typeof originalDateString === "string") {
    originalDateString = parseInt(originalDateString);
  }

  const date = new Date(originalDateString);

  let day, month, year;
  if (option.utc) {
    day = String(date.getUTCDate()).padStart(2, "0");
    month = String(date.getUTCMonth() + 1).padStart(2, "0");
    year = date.getUTCFullYear();
  } else {
    day = String(date.getDate()).padStart(2, "0");
    month = String(date.getMonth() + 1).padStart(2, "0");
    year = date.getFullYear();
  }

  return `${day}.${month}.${year}`;
}

export default formatDate;
