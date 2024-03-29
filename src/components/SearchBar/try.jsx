//!! check this : https://dev.to/aneeqakhan/throttling-and-debouncing-explained-1ocb
// wait for the user to stop typing in order to start the query

//in search jsx
// setSearchString from all products?

// on input
onchange = { handleSearch };

const [timeoutId, setTimeoutId] = useState(null);

function handleSearch(event) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  setTimeout(() => {
    // Like this setSearchString happen after a little delay
    let id = setSearchString(event.target.value);
  }, 500);
  setTimeoutId(id);
}
