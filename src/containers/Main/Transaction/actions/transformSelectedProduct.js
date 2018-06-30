const transformSelectedProduct = (
  selectedProduct,
  newPrice,
  newQuantity,
  newTaxRate
) => {
  let transformedProduct = {};
  transformedProduct.id = selectedProduct.id;
  transformedProduct.name = selectedProduct.name;
  transformedProduct.default_price = parseFloat(selectedProduct.default_price);
  transformedProduct.price = parseFloat(
    newPrice ? newPrice : selectedProduct.default_price
  );
  transformedProduct.quantity = parseInt(newQuantity ? newQuantity : 1, 10);
  transformedProduct.tax_rate = parseFloat(
    newTaxRate ? newTaxRate : selectedProduct.tax_rate
  );

  return transformedProduct;
};

export default transformSelectedProduct;
