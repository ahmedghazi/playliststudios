import React, { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import clsx from "clsx"

const SummaryDetailFramer = ({ onOpen, summary, detail }) => {
  const [expand, setExpand] = useState(false)

  const controls = useAnimation()
  const variants = {
    expanded: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  }

  useEffect(() => {
    if (expand) {
      controls.start("expanded")
    } else {
      controls.start("collapsed")
    }
  }, [expand, controls])

  useEffect(() => {
    onOpen(expand)
  }, [expand, onOpen])

  return (
    <div className="summary-detail">
      <div
        className="summary cursor-none"
        onClick={() => setExpand(!expand)}
        onKeyUp={() => setExpand(!expand)}
        tabIndex="-1"
        role="button"
      >
        <div className="pointer-events-none ">
          <div
            className={clsx(
              "icon-mark absolute top-1/2- top-3 transition-transform",
              expand ? "rotate-90" : "rotate-0"
            )}
          >
            <svg
              width="6"
              height="7"
              viewBox="0 0 6 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.14186e-06 0L0 7L6 3.5L2.14186e-06 0Z"
                fill={expand ? "black" : "#969696"}
              />
            </svg>
          </div>
          <div className="pl-1e-">{summary}</div>
        </div>
      </div>
      <div className="detail">
        <motion.div
          initial="collapsed"
          className="z-0 overflow-hidden"
          animate={controls}
          transition={{ duration: 0.3 }}
          variants={variants}
        >
          {detail}
        </motion.div>
      </div>
    </div>
  )
}

export default SummaryDetailFramer
