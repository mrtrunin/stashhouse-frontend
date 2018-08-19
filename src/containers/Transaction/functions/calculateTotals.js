const calculateTotals = transactionState => {
  let total_without_tax = 0;
  let tax = 0;
  let total_with_tax = 0;

  transactionState.products.forEach(product => {
    total_without_tax += product.price * product.quantity;
    tax += product.tax_rate * product.price * product.quantity;
    total_with_tax = total_without_tax + tax;
  });

  return {
    total_without_tax: total_without_tax,
    tax: tax,
    total_with_tax: total_with_tax
  };
};

export default calculateTotals;
