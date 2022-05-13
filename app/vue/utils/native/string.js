const escapeRegExp = (string) => string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.format = function () {
  return this.replace(/\n/g, '<br/>')
};

String.prototype.withoutAccent = function () {
  return this.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};

String.prototype.replaceAll = function (find, replace) {
  return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};
