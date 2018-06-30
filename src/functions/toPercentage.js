export default function toPercentage(number, decimals) {
  return (number * 100).toFixed(decimals) + "%";
}
