// The code is based on  "Adam Lapinski's" walk-through project "Moments"!
// https://github.com/Code-Institute-Solutions/moments

import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);

    return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;