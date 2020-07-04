const decodeGoEscapedString = (str) => {
  return decodeURI(str)
    .replace(/&#39;/gi, "'")
    .replace(/&#34/gi, '"')
    .replace(/";/gi, '"');
};

export default {
  decodeGoEscapedString,
};
