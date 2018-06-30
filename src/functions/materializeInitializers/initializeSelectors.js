export default function InitializeSelectors() {
  let options = {};
  let elem = document.querySelectorAll("select");
  window.M.FormSelect.init(elem, options);
}
