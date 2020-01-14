// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {

  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show Loader
  document.getElementById('loading').style.display = 'block';

  // Display for 2 seconds
  setTimeout(calculateResults, 1000);


  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // console.log('calculating...');

  // Grab UI Vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  // Amount is value but will turn to decimal with parseFloat()
  const principle = parseFloat(amount.value);

  // Calculated interest
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;

  // Calculated Payments
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  // Check to see if method is finite #

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Numbers are incorrect, Please check numbers')
    console.log('please check numbers...');

  }


}

// Show Error
function showError(error) {

  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create div
  const errorDiv = document.createElement('div');

  // Get Element (where message will display in html)
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading');

  // Add class (string is BS code for error)
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000)
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}

