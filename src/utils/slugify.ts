function setDelimeter(delimeter: string) {
  if (delimeter == null) {
    return '-';
  }
  return delimeter;
}

function replaceAccents(str: string) {
  if (str && str.search(/[\xC0-\xFF]/g) > -1) {
    return str
      .replace(/[\xC0-\xC5]/g, 'A')
      .replace(/[\xC6]/g, 'AE')
      .replace(/[\xC7]/g, 'C')
      .replace(/[\xC8-\xCB]/g, 'E')
      .replace(/[\xCC-\xCF]/g, 'I')
      .replace(/[\xD0]/g, 'D')
      .replace(/[\xD1]/g, 'N')
      .replace(/[\xD2-\xD6\xD8]/g, 'O')
      .replace(/[\xD9-\xDC]/g, 'U')
      .replace(/[\xDD]/g, 'Y')
      .replace(/[\xDE]/g, 'P')
      .replace(/[\xE0-\xE5]/g, 'a')
      .replace(/[\xE6]/g, 'ae')
      .replace(/[\xE7]/g, 'c')
      .replace(/[\xE8-\xEB]/g, 'e')
      .replace(/[\xEC-\xEF]/g, 'i')
      .replace(/[\xF1]/g, 'n')
      .replace(/[\xF2-\xF6\xF8]/g, 'o')
      .replace(/[\xF9-\xFC]/g, 'u')
      .replace(/[\xFE]/g, 'p')
      .replace(/[\xFD\xFF]/g, 'y');
  }
  return str;
}

function removeNonWord(str: string) {
  return str && str.replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, '');
}

/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
export default function slugify(str: string, delimeter: string) {
  const getDelimeter = setDelimeter(delimeter);
  const withoutAccents = replaceAccents(str);
  const withoutNonWords = removeNonWord(withoutAccents);
  const trimmed = withoutNonWords.trim();

  return trimmed
    .replace(/ +/g, getDelimeter)
    .toLowerCase();
}
