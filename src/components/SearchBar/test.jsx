/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 */
function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

const Home = () => {
  let [open, setOpen] = useState(false);
  const wrapperRef = useRef("menu");
  useClickOutside(wrapperRef, () => {
    setOpen(false);
  });

  return (
    <section>
      <h1>Feels good to be home!</h1>
      <div ref={wrapperRef}>
        <button className="secondary" onClick={() => setOpen(!open)}>
          Dropdown Toggle
        </button>

        {open && (
          <ul>
            <li>One</li>
            <li>Two</li>
          </ul>
        )}
      </div>
    </section>
  );
};
